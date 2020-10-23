var monkey, monkey_running
var bananaImage, obstacleImage
var foodGroup, obstacleGroup
var score, score2;
var gameState=PLAY;
var PLAY=1
var END=0
var invisibleGround;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png")
}



function setup() {
  createCanvas(400, 400)
  monkey = createSprite(30, 350, 10, 10);
  monkey.addAnimation("monkey", monkey_running)
  monkey.scale = 0.09

  invisibleGround = createSprite(200, 360, 400, 10)
  invisibleGround.visible = false;
  score = 0
  score2 = 0

  foodGroup = new Group();
  obstacleGroup = new Group();
  
   gameState=PLAY;
}


function draw() {
  background("white")
  textSize(18)
  text("Score: " + score, 280, 50);
  text("Bananas: " + score2, 280, 80);

  score = score + Math.round(getFrameRate() / 60);
if(gameState === PLAY){
  
  if (keyDown("space") && monkey.y >= 150) {
    monkey.velocityY = -10
  }
  monkey.velocityY = monkey.velocityY + 0.4
  if (monkey.isTouching(foodGroup)){
    score2= score2+ 1
    foodGroup.destroyEach()
  }
  if (monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
} else if (gameState===END){
  obstacleGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);   
score=0; 
}
  monkey.collide(invisibleGround)
  food();
  obstacles();
  drawSprites();

}



function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(450, 320, 10, 10)
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.scale = 0.2;
    obstacle.velocityX = -4
    obstacle.lifetime = 120
    obstacleGroup.add(obstacle)
  }
}

function food() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(430, Math.round(random(120, 200)), 10, 10)
    banana.addImage("banana", bananaImage)
    banana.velocityX = -4;
    banana.scale = 0.08
    banana.lifetime = 110
    banana.setCollider("rectangle", 0, 0, banana.width, banana.height);
    foodGroup.add(banana);
  }
}
