//Create variables here
var dog;
var happydog;
var database;
var foodS;
var foodStock;
var x = 0;
var fedTime, lastFed;

function preload(){
  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(600, 500);
  
  dog = createSprite(500,300);
  dog.addImage(dogimg);
  dog.scale = 0.4;
  database = firebase.database();
 // foodStock = database.ref();
  database.ref('Food').on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
   feed.mousePressed(feedDog)

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

}


function draw() {  
  background(46, 139, 87);

  drawSprites();
  //add styles here

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogimg1);
  }*/

  textSize(20)
  fill("white")
  text("food remaining: " + x, 100,50);

  fill(255, 255, 254);
  textSize(15);

  if(lastFed >= 12){
    text("last Feed: " + lastFed%12 + "PM", 350, 30);
  }else if(lastFed === 0){
    text("last Feed: 12AM" , 350, 30)
  }else{
    text("last Feed: " + lastFed + "AM", 350, 30)
  }

  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
     lastFed = data.val();
  })
}

function readStock(data){
   x = data.val()
}

function writeStock(){
 if(x>0){
   x--} 
  database.ref('/').update({
    food : x
  })
}

function feedDog(){
  dog.addImage(dogimg1);
  x--
  database.ref('/').update({
  Food : x,  
    FeedTime: hour()
  })
}

function addFoods(){
 x++
 
 database.ref('/').update({
   Food: x
 })

}




