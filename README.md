# 21 Lutetia
###### A space trading game

  Lutetia is a game based around intergalactic trade and manufacturing within an asteroid belt. In the distant future, economic leftists enforce strict restrictions on Earth and the colonies, preventing large monopolies and profit margins to be retained by one corporation. Due to this, many fled the harsh restrictions and set up shop within the asteroid belt between Mars and Jupiter. 

  The companies that did flee the jurisdiction of the planetary governments profited insanely from the rich asteroids and all their harvest. While living off a planet did bring harsh struggles of their own, it did not distract many people coming to get rich, and quickly. Many trade companies, merchants, entrepreneurs.

  You play one of the few capitalists setting up shop on the asteroids. You have to create production lines, manage assets and products, and eventually sell the products on the markets available to you. You can purchase raw materials and process them, or just mine and harvest other resources and use them to make the finer products. At any stage you can buy, sell, or trade for other goods. Use station’s workshops to complete this goal.

## Core Game Mechanics (Game Mechanics Requirements): 
### - Space Stations and Workshops:
  Space stations will act as hubs for production and trade within your capitalistic empire. Within space stations, information about local trade prices, workshops, your imports and exports, as well as stats and facts about the station are available. Most interactions happen through space stations.

  Workshops are components of a space station. In workshops, jobs can be started to produce materials and products within a space station. These products are then deposited within the space station, and are left there until transported
#### Features: (Strikeout indicates not a priority)
* Use space stations as storage for your goods.
  * See in detail what is in the space station and what will be at the station 
* Move goods around, sell, and buy good from space stations.
* Harvest minerals or other raw materials from within a space station. (Food/Ore/Other)
* Craft goods at workshops through jobs (rented or purchased) within space stations.
* Purchase workshops within space stations.

### - Trade and Trade Lanes:
  Trade lanes are the highways of how resources are shipped around between stations. Trade lanes consist of a set of orders and instructions that dictate how ships should act within the route. Such instructions can consist of picking up or dropping off goods, refuelling, or special conditions if attacked by pirates or any other cosmological event, such as running out of fuel or air mid flight.
  
#### Features:
* Dictate a set of orders and instructions that are interpreted by spaceships within the trade lane
  * Move to destination.
    * At fast or safe directives.
  * Unload or load cargo at destination.
    * Depending on amount and what type of cargo (Percentage, fixed amount, fixed amount left)
  * Refuel at a destination.
  * ~~Conditional orders for space attacks, refuelling, distress beacons, etc,~~ .
* Add or remove ships from the trade route.
  * Of both military and civilian aspects.
  * Purchase directly into the line based on global supply
* See current information about what is where on the route (resources and ships).
* Edit the route.

### - Manufacturing and Crafting: 
  Manufacturing and Crafting is done as a process to take one ore more raw products as well as time, and produce that into one (or more) products when the process is completed. This happens through the workshop interface, though other minerals can be mined by specific ships while in space, or through the purchase or renting of areas on space stations. 
  
  Discovery within the crafting system also is produced in a dynamic way. You can purchase recipes to certain level items, or discover and improve upon the recipe for better products you can make. These better products can make better high tier products themselves, or sell for higher depending on the object. Discovering new products should come through in game context hints, hopefully.
  
#### Features:
* Craft new resources and items within workshops.
* Items can have levels of quality that allow them to be sold at different prices depending on the type and quality of item.
* ~~You can sell to certain factions (Earth/Mars/Jupiter's Moons)~~
* Sell and buy certain items to fill requirements where you cannot manufacture said items.
* Use a research tree and experimentation to discover new recipes for items.

### - Research
  As defined above, players can research new items through experimentation and educated guesses. They can also hire researchers to develop or discover these new resources.
  
#### Features:
* Hire people to research from institutes within Space Stations
* Purchase new material recipes from the market as well
* Experiment for finding new recipes
 
## UI Requirements:
### - Game Map:
The game map is an interactive visual representation of the space that the game takes place in. This consists of a graphical representation done within the PIXI.js engine, comprised primarily of sprites of asteroids, space stations, and details about current trade paths and other activities of space craft within the game setting.

#### Features:
* Drag and drop style game map that displays all relevant information
  * Space stations (WIP, basic sprites completed, 1 and 3 stations mostly done, 5 and asteroids to be  completed)
  * Trade lanes
  * Mining operations
* Click interactions with the space stations and other points of interest.
* Zoom in and out levels.

### - Game Menu:
This is where major interactions take place within the game. Through this menu, players can interact with trade lanes, space stations, and all other various objects of the game. This will be dynamic to the selected type of data being viewed, and hence will change with context.

####Features:
* Dynamic display of information dependant on type of object selected
* For Space Station: (On click of relevant information, modal or expansion of element should happen to provide more detail.)
  * Trade:
    * Imports (Both global and to your company)
    * Exports (See above)
    * Trade Prices (Modal)
    * Active trade routes (Switch to trade route view on selection of trade route in menu)
  * Workshops (Modal)
    * Current (and queued) Jobs
    * Your Jobs
    * Add new job (modal)
  * Research
    * Discovered Recipes
  * History of Space station
* For Trade Route:
  * Ships active in the route
  * Current cargo headed where
  * Rules and confines of the trade route
  * Other resources allocated (Defense ships) to the line
  * History of trade route
  
## Graphics Requirements:
### - For Space Stations / Game Map:
####Necessary metadata: 
* Size for a 1 x 1 tile: 25 x 25 px. 
* 'Size' of a pixel: 4 x 4 px. (Tiles are scaled up for cleaner zooms)
* Adjusted size of a tile: 100 x 100 px

####Space and Space Station Tile Assets:
* Empty Space (Complete-ish, more needed): [Empty Space](/docs/empty_space.png)
* Size 1 Station (Complete): [Size 1 Space Station](/docs/size_1.png)
* Size 3 Station (WIP):
* Size 5 Station:
* Asteroid Belt:

#### Trade Lane Tile Assets
* Trade lane (Tiling sprite):

  
