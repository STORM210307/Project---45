var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg,zombieGrp;
var fireball,fireballImg,fireballGrp;
var heart1, heart2, heart3;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  fireballImg = loadImage("assets/fireball.png")

  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  fireballGrp = new Group();
  zombieGrp = new Group();

  heart3 = createSprite(displayWidth-150, displayHeight - 720);
  heart3.addImage(heart3Img);
  heart3.scale = 0.3;

}

function draw() {
  background(0); 

  spawnZombie();

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){

  spawnFireballs();

  player.addImage(shooter_shooting)
  fireball.addImage(fireballImg)


}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}
for(var j = 0;j<zombieGrp.length;j++){

if(zombieGrp[j].isTouching(player)) { 
    
  zombieGrp[j].destroy();

  if(zombieGrp.length > 0) {
  heart3.addImage(heart2Img)
  }
  else{
    heart3.addImage(heart1Img)
  }
}

}

for(var i = 0;i<fireballGrp.length;i++){

  for(var j = 0;j<zombieGrp.length;j++){


  if(zombieGrp[j].isTouching(fireballGrp[i])) { 
    
    zombieGrp[j].destroy();
    fireballGrp[i].destroy();

  }
}

} 



drawSprites();

}

function spawnZombie() {

  if(frameCount%200===0) {
  zombie = createSprite(displayWidth/2+550,Math.round(random(300,600)), 50, 50);
  zombie.addImage(zombieImg)
  zombie.scale = 0.16;
  zombie.velocityX = -Math.round(random(1, 3))
  zombieGrp.add(zombie);
  }
 
}

 



function spawnFireballs() {

  fireball = createSprite(displayWidth-1080,displayHeight-324,10,10);
  fireball.scale = 0.05;
  fireball.velocityX = 10;
  fireball.y = player.y+24;

  fireballGrp.add(fireball);
}