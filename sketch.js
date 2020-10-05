//Create variables here
var dog,happyDog,database,foodS,foodStock;
var foodObj,feed,fedTime, lastFed,addFood;
var dogImg,happyDog,bedroomImg,gardenImg,washroomImg,gameState,readState;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");

}

function setup() {
  createCanvas(400,500);
  database = firebase.database();

  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  dog = createSprite(200,400,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;


  feed=createButton("Feed the dog");
  feed.position(500,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,100);
  addFood.mousePressed(addFoods);
}

function draw() {   

  currentTime=hour();  
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  } else{
    update("Hungry")
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{        
    feed.show();
    addFood.show();   
    dog.addImage(dogImg); 
  } 
  
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+" PM",60,65);
  } else if(lastFed==0){
    text("Last Feed:12 AM",60,65);
  } else{
    text("Last Feed:"+lastFed+" AM",60,65);
  }  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


  function feedDog(){    
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
    })
    dog.addImage(happyDog);
  }

  function addFoods(){
    //function to read food Stock    
    foodS++;
    database.ref('/').update({
      Food : foodS
    })
  }
  
  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }