# 21 Lutetia
###### A space trading game

## To get running from source:
1. Unpack the zip to desired location. 
2. Change directory to the extracted folder, i.e. `cd C:\path\to\21_lutetia`
3. `npm install` installs all the necessary JS packages. 
4. `pip install -r requirements.txt` installs all necessary Python packages.
5. `webpack` bundles the code from source
6. `npm run start` runs the electron shell for the game

## Introduction

  Lutetia is a game based around intergalactic trade and manufacturing within an asteroid belt. In the distant future, economic leftists enforce strict restrictions on Earth and the colonies, preventing large monopolies and profit margins to be retained by one corporation. Due to this, many fled the harsh restrictions and set up shop within the asteroid belt between Mars and Jupiter. 

  The companies that did flee the jurisdiction of the planetary governments profited insanely from the rich asteroids and all their harvest. While living off a planet did bring harsh struggles of their own, it did not distract many people coming to get rich, and quickly. Many trade companies, merchants, entrepreneurs.

  You play one of the few capitalists setting up shop on the asteroids. You have to create production lines, manage assets and products, and eventually sell the products on the markets available to you. You can purchase raw materials and process them, or just mine and harvest other resources and use them to make the finer products. At any stage you can buy, sell, or trade for other goods. Use station’s workshops to complete this goal.

## Core Game Mechanics (Game Mechanics Requirements): 
### - Space Stations and Workshops:
  Space stations will act as hubs for production and trade within your capitalistic empire. Within space stations, information about local trade prices, workshops, your imports and exports, as well as stats and facts about the station are available. Most interactions happen through space stations.

  Workshops are components of a space station. In workshops, jobs can be started to produce materials and products within a space station. These products are then deposited within the space station, and are left there until transported
#### Features: 
(Strikeout indicates not a priority, Red blocks: Not in progress, Yellow: In progress, Green: Completed, Blue: Final Product)
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Use space stations as storage for your goods.
  * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) See in detail what is in the space station and what will be at the station 
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Move goods around, sell, and buy good from space stations.
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Harvest minerals or other raw materials from within a space station. (Food/Ore/Other)
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Craft goods at workshops through jobs (rented or purchased) within space stations.
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Purchase workshops within space stations.

### - Trade and Trade Lanes:
  Trade lanes are the highways of how resources are shipped around between stations. Trade lanes consist of a set of orders and instructions that dictate how ships should act within the route. Such instructions can consist of picking up or dropping off goods, refuelling, or special conditions if attacked by pirates or any other cosmological event, such as running out of fuel or air mid flight.
  
#### Features:
* Dictate a set of orders and instructions that are interpreted by spaceships within the trade lane
  * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Move to destination.
    * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) At fast or safe directives.
  * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Unload or load cargo at destination.
    * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Depending on amount and what type of cargo (Percentage, fixed amount, fixed amount left)
  * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Refuel at a destination.
  * ~~Conditional orders for space attacks, refuelling, distress beacons, etc,~~ .
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Add or remove ships from the trade route.
  * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Of both military and civilian aspects.
  * ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Purchase directly into the line based on global supply
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) See current information about what is where on the route (resources and ships).
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Edit the route.

### - Manufacturing and Crafting: 
  Manufacturing and Crafting is done as a process to take one ore more raw products as well as time, and produce that into one (or more) products when the process is completed. This happens through the workshop interface, though other minerals can be mined by specific ships while in space, or through the purchase or renting of areas on space stations. 
  
  Discovery within the crafting system also is produced in a dynamic way. You can purchase recipes to certain level items, or discover and improve upon the recipe for better products you can make. These better products can make better high tier products themselves, or sell for higher depending on the object. Discovering new products should come through in game context hints, hopefully.
  
#### Features:
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Craft new resources and items within workshops.
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Items can have levels of quality that allow them to be sold at different prices depending on the type and quality of item.
* ~~You can sell to certain factions (Earth/Mars/Jupiter's Moons)~~
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Sell and buy certain items to fill requirements where you cannot manufacture said items.
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Use a research tree and experimentation to discover new recipes for items.

### - Research
  As defined above, players can research new items through experimentation and educated guesses. They can also hire researchers to develop or discover these new resources.
  
#### Features:
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Hire people to research from institutes within Space Stations
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Purchase new material recipes from the market as well
* ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Experiment for finding new recipes
 
