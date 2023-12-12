// Room Class
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
      return this._character;
    }

    get item() {
        return this._item;
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

    set item(value) {
        this._item = value;
    }
  

    describe() {
      return `You are in the ${this._name}. ${this._description}.`;
    }
  
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = `The ${room._name} is to the ${direction}`;
        details.push(text);
      }
      return details;
    }
  
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

// Item Class

class Item {
    constructor(name) {
        this._name = name
    }
  
    set name(value) {
      this._name = value;
    }
  
    get name() {
      return this._name;
    }
  
    describe() {
      return `You found a ${this._name}.`;
    }
  }

// Character Class

class Character {
    constructor(name) {
        this._name = name,
        this._description = "",
        this._conversation = "",
        this._item = ""
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

    set item(value) {
        this._item = value;
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

    get items() {
        return this._item;
    }
    describe() {
      return `You have found ${this._name}.`;
    }
  
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
Kitchen.description = "There's empty bottles and rubbish everywhere"
Hall.description = "There's explicit graffiti all over the walls. To the north you can see outside."
LivingRoom.description = "Sleeping bodies are piled among the debris of last night."
Bathroom.description = "Jesus! It stinks in here!"
DiningRoom.description = "Hard to see anything beyond the piles of takeaway boxes."
GamesRoom.description = "A drunk man is passed out on the pool table."
MasterBedroom.description = "The mattress is hanging out of the window."
Parlour.description = "Looks like it might have survived the damage."
GuestBedroom.description = "There are clothes everywhere."

// Create characters
const Dave = new Character("Dave");
const Greg = new Character("Greg");
const Jenny = new Character("Jenny");

// Add characters to rooms
LivingRoom.character = Greg
Bathroom.character = Dave
MasterBedroom.character = Jenny

// Create character descriptions
Dave.description = "Dave is throwing up in the toilet. He appears to be wearing your trousers."
Greg.description = "Greg is wearing sunglasses and nothing else."
Jenny.description = "Jenny is lying on top of the mattress."

// Create character dialogue
Dave.conversation = "Find me my trousers and I'll give you yours back."
Greg.conversation = "Yeah I've got your phone. I was trying to order a kebab. Find me one and I'll give you your phone back"
Jenny.conversation = "I know where your wallet is, but I'm dying. I need water. Get me some and I'll tell you where your wallet"

// Create items
const Phone = new Item("phone");
const YourTrousers = new Item("your trousers");
const Kebab = new Item("kebab");
const Beer = new Item("beer");
const Water = new Item("water");
const Wallet = new Item("wallet");
const DavesTrousers = new Item("Dave's trousers");

// Assign items to characters
Greg.item = Phone
Dave.item = YourTrousers
Jenny.item = Wallet

// Assign other items to rooms
DiningRoom.item = Kebab
Kitchen.item = Beer
GamesRoom.item = Water
GuestBedroom.item = DavesTrousers

const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-container');

// Display room info
function displayRoomInfo(room) {
    if (room.character === "") {
        textContent = `You are in the ${room.name}. ${room.description}.`
    } else {
        textContent = `You are in the ${room.name}. ${room.description}. ${room.character} is here. ${room.character} is ${room.character.description}`
    }

    document.getElementById("text-area").innerHTML = textContent;
    document.getElementById("usertext").focus();
}


// Start Game
function startGame() {
    startPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        document.getElementById("text-area").innerHTML = "";
        document.getElementById("text-area").innerHTML = '"God, where am I? I don\'t feel so good... I can\'t remember a thing from last night..."<br><br>"Hold on a second. Where\'s my phone? And my wallet. And... my trousers??"';
      } else {
          console.log("that is not a valid command please try again");
      }
    });
  }
// 

// Handle commands
// document.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       command = document.getElementById("usertext").value;
//       const directions = ["north", "south", "east", "west"]
//       if (directions.includes(command.toLowerCase())) {
//         currentRoom = currentRoom.move(command)
//         document.getElementById("usertext").value = ""
//         displayRoomInfo(currentRoom);
//       } else {
//         document.getElementById("usertext").value = ""
//         alert("that is not a valid command please try again")
//       }

//     }
//   });