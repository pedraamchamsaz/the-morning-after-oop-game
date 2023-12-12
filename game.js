class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._item = "";
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
    }
  
    set name(value) {
      this._name = value;
    }
  
    set description(value) {
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }
  
    /**
     * a method to produce friendly room description
     * @returns {string} description of the room
     */
    describe() {
      return `You are in the ${this._name}. ${this._description}.`;
    }
  
    /**
    * a method to add rooms to link rooms to this one
    * it does this by adding them to _linkedRooms
    * @param {string} direction the direction the other room is from this one
    * @param {object} roomToLink the room that is in that direction
    */
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    /**
     * a method to produce friendly description of linked rooms
     * @returns {array} descriptions of what rooms are in which direction
     */
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = `The ${room._name} is to the ${direction}`;
        details.push(text);
      }
      return details;
    }
  
    /**
     * a method to move the adventurer to a new room
     * @param {string} direction the direction in which to move
     * @returns {object} the room moved to 
     */
    //method to move to a new room
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("You can't go that way",);
        alert(`You are still in the ${this._name}`)
        return this;
      }
    }
  }

class Item {
    constructor(name) {
        this._name = name,
        this._description = ""
    }
  
    set name(value) {
      this._name = value;
    }
  
    set description(value) {
      this._description = value;
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    /**
     * a method to produce friendly item description
     * 
     * @returns {string} description of the item
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return `You found a ${this._name}. This ${this._description}`;
    }
  
  
  }
  
class Character {
    constructor(name) {
        this._name = name,
        this._description = ""
        this._conversation = ""
    }

    set name(value) {
      this._name = value;
    }
  
    set description(value) {
      this._description = value;
    }
  
    set conversation(value) {
      this._conversation = value;
    }

    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get conversation() {
      return this._conversation;
    }
    /**
     * a method to produce friendly character description
     * 
     * @returns {string} description of the character
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return `You have found ${this._name}.`;
    }
  
    /**
     * a method to produce friendly conversation text
     * 
     * @returns {string} the conversation text
     * @author Neil Bizzell
     * @version 1.0
     */
    converse() {
      return this._conversation;
    }
  }
  
// Rooms
const Kitchen = new Room("kitchen");
const Hall = new Room("hall");
const LivingRoom = new Room("living room");
const Bathroom = new Room("bathroom");
const DiningRoom = new Room("dining room");
const GamesRoom = new Room("games room");
const MasterBedroom = new Room("master bedroom");
const Parlour = new Room("parlour");
const GuestBedroom = new Room("guest bedroom");

// Link rooms
Kitchen.linkRoom("north", Hall);
Kitchen.linkRoom("south", Parlour);
Kitchen.linkRoom("east", GamesRoom);
Kitchen.linkRoom("west", DiningRoom);
LivingRoom.linkRoom("east", Hall);
LivingRoom.linkRoom("south", DiningRoom);
Hall.linkRoom("south", Kitchen);
Hall.linkRoom("west", LivingRoom);
Hall.linkRoom("east", Bathroom);
Bathroom.linkRoom("west", Hall);
Bathroom.linkRoom("south", GamesRoom);
GamesRoom.linkRoom("north", Bathroom);
GamesRoom.linkRoom("west", Kitchen);
GamesRoom.linkRoom("south", GuestBedroom);
DiningRoom.linkRoom("north", LivingRoom);
DiningRoom.linkRoom("east", Kitchen);
DiningRoom.linkRoom("south", MasterBedroom);
MasterBedroom.linkRoom("north", DiningRoom);
MasterBedroom.linkRoom("east", Parlour);
Parlour.linkRoom("west", MasterBedroom);
Parlour.linkRoom("north", Kitchen);
Parlour.linkRoom("east", GuestBedroom);
GuestBedroom.linkRoom("north", GamesRoom);
GuestBedroom.linkRoom("west", Parlour);

// Add room descriptions

Kitchen.description("There's empty bottles and rubbish everywhere.");
Hall.description("There's explicit graffiti all over the walls. To the north you can see outside.");
LivingRoom.description("Sleeping bodies are piled among the debris of last night.");
Bathroom.description("Jesus! It stinks in here!");
DiningRoom.description("Hard to see anything beyond the piles of takeaway boxes.")
GamesRoom.description("A drunk man is passed out on the pool table.")
MasterBedroom.description("The mattress is hanging out of the window.")
Parlour.description("Looks like it might have survived the damage.")
GuestBedroom.description("There are clothes everywhere.")


// Start Game
function startGame() {
    currentRoom = Kitchen;
    displayRoomInfo(currentRoom);
}

// Handle commands
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"]
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command)
        document.getElementById("usertext").value = ""
        displayRoomInfo(currentRoom);
      } else {
        document.getElementById("usertext").value = ""
        alert("that is not a valid command please try again")
      }

    }
  });