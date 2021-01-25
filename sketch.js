//Create variables here
var dog, happyDog;
var Foodobj, foodStock, food, food_img;;
var dogImg, happyDogImg;
var feed, AddFood, position;
var database;
var feedTime, lastFeed;
var bg_img;
var FoodRemaining = 90;
var changegameState, readgameState;
var gameState = "hungry";
var bedroom_img, garden_img, washroom_img, saddog_img;
function preload() {
  //load images here;
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("Happy.png");
  food_img = loadImage("milk.png");
  //bedroom_img = loadImage("Bed Room.png");
  garden_img = loadImage("Garden.png");
  washroom_img = loadImage("Wash Room.png");
  saddog_img = loadImage("lazy.png");
}

function setup() {
  createCanvas(1000, 800);
  database = firebase.database();
  //take foodStock value from database.
  foodStoke = database.ref('food');
  foodStoke.on("value", readStoke);
  //take lastfed time from database.
  feedTime = database.ref('feedTime');
  feedTime.on("value", function (data) {
    lastFeed = data.val();
  })
  //create food.
  food = createSprite(620, 360, 50, 50);
  food.addImage("food", food_img);
  food.scale = 0.10;
  //create feed button.
  feed = createButton("FEED THE DOG");
  feed.position(500, 50);
  feed.mousePressed(FeedDog);
  //create addFood button.
  AddFood = createButton("ADD FOOD");
  AddFood.position(610, 50);
  AddFood.mousePressed(Addfood);
  //create dog sprite.
  dog = createSprite(800, 300, 50, 50);
  dog.addImage("dg", dogImg);
  dog.scale = 0.3;
  //create foodobject.
  Foodobj = new Food();
  //read gameState from the database.
  readgameState = database.ref('gameState');
  readgameState.on("value", function (data) {
    gameState = data.val();
  })
}



function draw() {
  //set bg color.
  background(color(46, 139, 87));
  //display foodobj.
  Foodobj.display();

  if (food.x > 700) {
    food.x = 710;
  }
  //set the game.
  if (gameState != "hungry") {
    feed.hide();
    AddFood.hide();
    dog.remove();
  } else {
    feed.show();
    AddFood.show();
    dog.addImage("dg", dogImg);
  }
  //change the bg.
  currentTime = hour();
  if (currentTime === (lastFeed + 1)) {
    update("playing");
    Foodobj.garden();
  } else if (currentTime === (lastFeed + 2)) {
    update("sleeping");
    Foodobj.bedroom();
  } else if (currentTime > (lastFeed + 2) < currentTime <= (lastFeed + 4)) {
    update("bathing");
    Foodobj.washroom();
  } else {
    update("Hungry");
    Foodobj.display();
  }

  drawSprites();
  //text lastfed time.
  fill(255, 255, 254);
  textSize(15);
  fill("white")
  stroke("black");
  if (lastFeed >= 12) {
    text("Last Feed : " + lastFeed % 12 + "PM", 20, 50);
  }
  else if (lastFeed === 0) {
    text("Last Feed : 12 AM", 20, 50)
  }
  else {
    text("Last Feed : " + lastFeed + "AM", 20, 50);
  }
  //text foodremaining,
  fill("white");
  textSize(15);
  text("Food Remaining : " + FoodRemaining, 20, 35);



}
//read stock function.
function readStoke(data) {
  position = data.val();
  Foodobj.updateFoodStock(position);
}
//write stock
function writeStoke(x) {
  if (x > 0) {
    x = x - 1;
  }
  else {
    x = 0;
  }
  database.ref('/').set(
    { 'foodReamining': x })
}
//function to feed the dog.
function FeedDog() {
  dog.addImage("dg", happyDogImg);
  food.velocityX = 1;
  FoodRemaining = FoodRemaining - 1;
  Foodobj.updateFoodStock(Foodobj.getFoodStock() - 1);
  database.ref('/').update({
    foodReamining: Foodobj.getFoodStock(),
    feedTime: hour(),
    gameState: "hungry"
  })
}
//function to addFood.
function Addfood() {
  dog.addImage("dg", dogImg);
  food.x = 620;
  FoodRemaining = FoodRemaining + 1;
  position++;
  database.ref('/').update({
    'foodReamining': position

  })
}
//function to update gaemState.
function update(state) {
  database.ref('/').update({
    gameState: state
  })
}
