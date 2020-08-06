var dog;
var dogSprite;
var happyDog;
var food;
var foodStock;
var database;

function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/happydogImg.png");
}

function setup() 
{
	createCanvas(500, 500);
  database = firebase.database();

  dogSprite = createSprite(250,350,25,25);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  ground = createSprite(100,485,850,100);
  ground.shapeColor = "darkred";
}


function draw() 
{  
  background("lightblue")
  
  if(keyWentDown(UP_ARROW))
  {
    writeStock(food);
    dogSprite.addImage(happyDog);
  }

  drawSprites();

  textSize(15);
  fill("black");
  text("FoodStock :" + food, 100, 250);
  text("Use the up arrow key to feed your dog.",125,50)
}

function readStock(data)
{
  food = data.val();
}

function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x-1;
  }

  database.ref('/').update
  (
   {
     Food : x
   }
  )
}
