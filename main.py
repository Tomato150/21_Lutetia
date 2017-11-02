from flask import *
import socket

import src.py_scripts.world_gen as world_gen
from src.py_scripts.data.world_gen import WORLD_GEN_METADATA

app = Flask(__name__)


@app.route('/get_world')
def get_world():
    world = world_gen.GameWorld(
        num_of_stations=20,
        max_amount_of_size_5_stations=4,
        num_of_asteroids=20,
        asteroid_sizes=40,
        world_width=100,
        world_height=100,
        world_padding=3
    )
    world.generate_game_world()
    world.display_world()
    metadata = WORLD_GEN_METADATA
    metadata.update({
        "WORLD WIDTH": world.world_width,
        "WORLD HEIGHT": world.world_height
    })

    return json.jsonify(
        world=world.game_map,
        world_metadata=metadata
    )


@app.route('/assets/<path:path>')
def get_assets(path):
    return send_from_directory('static/assets', path)


if __name__ == '__main__':
    print(" * Running on http://" + socket.gethostbyname(socket.gethostname()) + ":5000/")
    print(" * Running on http://localhost:5000/")
    app.run(
        debug=False,
        host='0.0.0.0',
    )
