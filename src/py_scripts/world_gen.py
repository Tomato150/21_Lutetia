import math
import random

from src.py_scripts.data.world_gen import WORLD_GEN_METADATA


def get_random_station_size(size_5_stations_left):
    if not size_5_stations_left:
        return random.randint(0, 1) * 2 + 1
    return random.randint(0, 2) * 2 + 1


class Position:
    def __init__(self, array):
        self.x = array[0]
        self.y = array[1]

    def __getitem__(self, item):
        if isinstance(item, int):
            return [self.x, self.y][item]
        else:
            return {'x': self.x, 'y': self.y}[item]

    def __setitem__(self, key, value):
        if isinstance(key, int):
            [self.x, self.y][key] = value
        else:
            return {'x': self.x, 'y': self.y}[key]

    def __str__(self):
        return str([self.x, self.y])

    def __repr__(self):
        return str([self.x, self.y])


class SpaceStation:
    def __init__(self, x, y, size):
        self.pos = Position([x, y])
        self.size = size
        self.radius = int((self.size - 1) / 2)
        self.station_points = self.get_station_tiles()

    def get_station_tiles(self):
        list_of_points = []
        for x in range(self.pos.x - self.radius, self.pos.x + self.radius + 1):
            for y in range(self.pos.y - self.radius, self.pos.y + self.radius + 1):
                list_of_points.append(Position([x, y]))
        return list_of_points


class AsteroidField:
    def __init__(self, initial_point_x, initial_point_y, max_amount_of_points):
        self.initial_point = Position([initial_point_x, initial_point_y])
        self.__max_amount_of_points = max_amount_of_points

        self.__asteroid_points = [Position([initial_point_x, initial_point_y])]

    def gen_new_points(self, game_world_points, world_width, world_height):
        while len(self.__asteroid_points) < self.__max_amount_of_points:
            neighbour_points = self.__get_neighbour_points(game_world_points, world_width, world_height)
            if not neighbour_points:
                break

            new_point = random.choice(neighbour_points)

            if game_world_points[new_point.x][new_point.y] != WORLD_GEN_METADATA['EMPTY SPACE']:  # Overlaps another space station or
            # asteroid
                continue

            self.__asteroid_points.append(new_point)
            game_world_points[new_point.x][new_point.y] = WORLD_GEN_METADATA['ASTEROIDS']

    def __get_neighbour_points(self, game_world_points, world_width, world_height):
        neighbour_points = []
        for point in self.__asteroid_points:
            new_points = [
                Position([x, y])
                for x in range(max(point.x - 1, 0), min(point.x + 2, world_width))
                for y in range(max(point.y - 1, 0), min(point.y + 2, world_height))
                if (point.x != x or point.y != y)
            ]

            for new_point in new_points:
                for neighbour_point in neighbour_points:
                    if new_point.x == neighbour_point.x and new_point.y == neighbour_point.y:
                        break
                else:
                    neighbour_points.append(new_point)

        return neighbour_points


class GameWorld:
    def __init__(
        self,
        num_of_stations=5,
        max_amount_of_size_5_stations=3,
        num_of_asteroids=5,
        asteroid_sizes=10,
        world_width=100,
        world_height=50,
        world_padding=2  # space station size / 2 - 1 min
    ):
        self.__num_of_stations = num_of_stations
        self.__max_amount_of_size_5_stations = max_amount_of_size_5_stations
        self.__size_5_stations = 0
        self.__num_of_asteroids = num_of_asteroids
        self.__asteroid_field_max_size = asteroid_sizes
        self.world_width = world_width
        self.world_height = world_height
        self.__world_padding = world_padding

        self.__stations = []
        self.__asteroids = []
        self.game_map = {}

        for x in range(0, self.world_width):
            self.game_map[x] = {}
            for y in range(0, self.world_height):
                self.game_map[x][y] = WORLD_GEN_METADATA['EMPTY SPACE']

    def generate_game_world(self, return_data=True):
        self.__generate_stations()
        self.__generate_asteroids()
        if return_data:
            return self.game_map

    def __generate_stations(self):
        # self.__generate_base_station()
        self.__generate_random_stations()

    def __generate_base_station(self):
        half_x = math.floor(self.world_width / 2)
        half_y = math.floor(self.world_height / 2)
        base_station = SpaceStation(
            x=random.randint(half_x - self.__world_padding, half_x + self.__world_padding),
            y=random.randint(half_y - self.__world_padding, half_y + self.__world_padding),
            size=5
        )
        self.__add_station(base_station)

    def __generate_random_stations(self):
        break_amount = 0
        while len(self.__stations) < self.__num_of_stations and break_amount != 1000:
            x = random.randint(self.__world_padding, self.world_width - self.__world_padding)
            y = random.randint(self.__world_padding, self.world_height - self.__world_padding)
            size = get_random_station_size(self.__max_amount_of_size_5_stations - self.__size_5_stations)

            if self.__is_station_collision(x, y, size):
                break_amount += 1
            else:
                station = SpaceStation(x, y, size)
                self.__add_station(station)

    def __add_station(self, station):
        self.__stations.append(station)
        for point in station.station_points:
            self.game_map[point.x][point.y] = WORLD_GEN_METADATA['SPACE STATION']
        if station.size == 5:
            self.__size_5_stations += 1

    def __is_station_collision(self, x, y, size):
        padding = (int((size - 1) / 2) + self.__world_padding)

        for station in self.__stations:
            if station.pos.x in range(
                x - padding - station.radius,
                x + padding + 1 + station.radius
            ) and station.pos.y in range(
                y - padding - station.radius,
                y + padding + 1 + station.radius
            ):
                return True
        return False

    def __generate_asteroids(self):
        excluded_points = []
        for station in self.__stations:
            excluded_points.extend(station.station_points)

        break_amount = 0
        while len(self.__asteroids) < self.__num_of_asteroids and break_amount != 1000:
            rand_x = random.randint(0, self.world_width - 1)
            rand_y = random.randint(0, self.world_height - 1)
            if self.game_map[rand_x][rand_y] != WORLD_GEN_METADATA['EMPTY SPACE']:
                break_amount += 1
            else:
                asteroid_field = AsteroidField(
                    initial_point_x=rand_x,
                    initial_point_y=rand_y,
                    max_amount_of_points=random.randint(
                        int(self.__asteroid_field_max_size / 2),
                        self.__asteroid_field_max_size
                    )
                )
                self.__add_asteroid_field(asteroid_field)

    def __add_asteroid_field(self, asteroid_field):
        self.__asteroids.append(asteroid_field)
        self.game_map[asteroid_field.initial_point.x][asteroid_field.initial_point.y] = WORLD_GEN_METADATA['ASTEROIDS']
        asteroid_field.gen_new_points(self.game_map, self.world_width, self.world_height)

    def display_world(
        self,
        show_asteroids=True,
        show_stations=True
    ):
        string = ""
        for y in range(0, self.world_height):  # Y first due to the way the string is formatted.
            for x in range(0, self.world_width):
                tile_type = self.game_map[x][y]
                if not show_asteroids and tile_type == WORLD_GEN_METADATA['ASTEROIDS']:
                    string += ". "
                elif not show_stations and tile_type == WORLD_GEN_METADATA['SPACE STATION']:
                    string += ". "
                else:
                    string += WORLD_GEN_METADATA['REPRESENTATION'][tile_type] + " "

            string += '\n'
        print(string)
