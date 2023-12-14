// Room Class
class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._item = "";
      this._visits = 0;
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

    get visits() {
      return this._visits;
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
  
    set visits(value) {
      this._visits = value;
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
      return `You found a ${this._name}!`;
    }
  }

// Character Class

class Character {
    constructor(name) {
        this._name = name,
        this._description = "",
        this._conversation = "",
        this._item = ""
        this._itemConvo = ""
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

    set itemConvo(value) {
      this._itemConvo = value;
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

    get itemConvo() {
      return this._itemConvo;
    }

    describe() {
      return `You found ${this._name}.`;
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
Hall.description = "There's graffiti all over the walls. To the north you can see outside, <u>freedom<u>"
LivingRoom.description = "Sleeping bodies are piled among the debris of last night"
Bathroom.description = "Jesus! It stinks in here!"
DiningRoom.description = "Hard to see anything beyond the piles of takeaway boxes"
GamesRoom.description = "A drunk man is passed out on the pool table"
MasterBedroom.description = "The mattress is hanging out of the window"
Parlour.description = "Looks like it might have survived the damage"
GuestBedroom.description = "There are clothes everywhere"

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
Dave.conversation = 'Dave: "Bleugh... find me my trousers... bleugh... and I\'ll give you yours back."'
Greg.conversation = 'Greg: "Yeah I\'ve got your phone. I was trying to order a kebab. Find me one and I\'ll give you your phone back"'
Jenny.conversation = 'Jenny: "I know where your wallet is, but I\'m dying. I need water. Get me some and I\'ll tell you where your wallet is"'

Dave.itemConvo = 'Dave: "Bleugh... you found my trousers... Here are yours... Send me the dry cleaning bill"'
Greg.itemConvo = 'Greg: "A kebab! You beauty. Can\'t believe how hard it is to order a kebab at 7am. Here\'s your phone"'
Jenny.itemConvo = 'Jenny: "Water! Precious giver of life! I didn\'t think I was going to make it. Here\'s your wallet"'

// Create items
const Phone = new Item("Phone");
const YourTrousers = new Item("Your Trousers");
const Kebab = new Item("Kebab");
const Beer = new Item("Beer");
const Water = new Item("Water");
const Wallet = new Item("Wallet");
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

let currentRoom = {};
let foundItems = []
let archivedItems = []
let archivedCharacters = []
let health = 100;

// Display room info
function displayRoomInfo(room) {
  let textContent = ""
  let bottomTextContent = ""

  if (room.character === "") {
      textContent = `You are in the ${room.name}. ${room.description}.`
  } else {
      textContent = `You are in the ${room.name}. ${room.description}. ${room.character.name} is here. ${room.character.description}`
      if (room.name === "bathroom" && foundItems.includes("Dave's trousers")) {
        bottomTextContent = `${room.character.itemConvo}`
        foundItems.push("Your Trousers")
        const index = foundItems.indexOf("Dave's trousers")
        if (index > -1) {
          foundItems.splice(index, 1)
        }
        updateItemsList();
      } 
      else if (room.name === "living room" && foundItems.includes("Kebab")) {
        bottomTextContent = `${room.character.itemConvo}`
        foundItems.push("Phone")
        const index = foundItems.indexOf("Kebab")
        if (index > -1) {
          foundItems.splice(index, 1)
        }
        updateItemsList();
      }
      else if (room.name === "master bedroom" && foundItems.includes("Water")) {
        bottomTextContent = `${room.character.itemConvo}`
        foundItems.push("Wallet")
        const index = foundItems.indexOf("Water")
        if (index > -1) {
          foundItems.splice(index, 1)
        }
        updateItemsList();
      }
      else {
        bottomTextContent = `${room.character.conversation}`
      }
  }

  if (room.item !== "" && !archivedItems.includes(room.item.name)) {
    const itemDescription = room.item.name;
    textContent += `<br><br>${room.item.describe()}`;
    foundItems.push(itemDescription);
    archivedItems.push(itemDescription)
    updateItemsList();
  }

  document.getElementById("text-area").innerHTML = textContent;
  document.getElementById("actions").innerHTML = bottomTextContent;
  document.getElementById("usertext").focus();
}

function updateItemsList() {
  const itemsListElement = document.getElementById("items-list")
  itemsListElement.innerHTML = foundItems.join("<br>")

if (foundItems.includes("Phone") && foundItems.includes("Wallet") && foundItems.includes("Your Trousers")) {
  alert("YOU WON. Harry managed to call an Uber and made it home")
}
}

// Start Game
function startGame() {
  let pageNumber = 1;
  currentRoom = Kitchen;
  startPage.classList.add('hidden');
  gamePage.classList.remove('hidden');
  document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
      let textArea = document.getElementById("text-area");
      let bottomTextArea = document.getElementById("actions")
      if (pageNumber === 1) {
        bottomTextArea.innerHTML = 'Harry: "God, where am I? I don\'t feel so good... I can\'t remember a thing from last night..."<br><br>"Hold on a second. Where\'s my phone? And my wallet. And... my trousers??"';
      } else if (pageNumber === 2) {
        textArea.innerHTML = "Harry needs to get home, but without his <u>phone</u>, <u>wallet</u> and <u>trousers</u> he can’t go anywhere. He thinks his friends will know where his stuff is. Will you help him find his friends and retrieve his items before his hangover gets the better of him? <br><br>Every time you move, Harry's health will drop. To move, type a direction into the input box and hit Enter.<br><br>Press SPACE to continue";
      } else if (pageNumber === 3) {
        displayRoomInfo(Kitchen);
      }

      pageNumber++;
    } else {
        console.log("that is not a valid command please try again");
    }
  });
}
// 


// Handle commands
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"]
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command)
        document.getElementById("usertext").value = ""
        currentRoom.visits++;
        console.log(currentRoom.name)
        console.log(currentRoom.visits)
        displayRoomInfo(currentRoom);
        health -= 5
        document.getElementById("health-score").innerHTML = health
        if (health === 0) {
          alert("GAME OVER. Harry died from his hangover")
          this.location.reload()
        }
      } 
      else {
        document.getElementById("usertext").value = ""
        alert("that is not a valid command please try again")
      }
    }
  });