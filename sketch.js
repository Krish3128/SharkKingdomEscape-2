var bg,bgImg;
var hook,hookImg;
var fish,fishImg;
var shark,sharkImg;
var Shark,SharkImg;
var life=7;
var score=0;
var serve=2;
var play=1;
var end=0
var gameState=serve;

function preload(){
 
 bgImg=loadImage("Photos/BG.jpg");
 fishImg=loadImage("Photos/Fish.png");
 hookImg=loadImage("Photos/Fish Hook.png");
 sharkImg=loadImage("Photos/SharkR-L.png");
 SharkImg=loadImage("Photos/SharkL-R.png");
 diamondImg=loadImage("Photos/Diamond.png");
 startImg=loadImage("Photos/Start.png");
 gameOverImg=loadImage("Photos/GameOver.png");
 restartImg=loadImage("Photos/Restart.png");
 cupImg=loadImage("Photos/WaterCup.png");
 diamondSound=loadSound("Musics/DiamondCollectSound.mp3");
 GameOverSound=loadSound("Musics/GameOverSound.wav");
 WinSound=loadSound("Musics/WinSound.mp3");
}
function setup(){
    createCanvas(windowWidth,windowHeight);

    bg=createSprite(650,550);
    bg.addImage(bgImg);
    bg.scale=2;

    fish=createSprite(650,550);
    fish.addImage(fishImg);
    fish.scale=0.3;
    fish.setCollider("rectangle",0,0,100,200);

    ground=createSprite(windowWidth/2,620,1500,10);
    ground.visible=false;

    sg1=new Group();
    sg2=new Group();
    sg3=new Group();
    sg4=new Group();
    sg5=new Group();
    hg=new Group();
    dg=new Group();

    start=createSprite(windowWidth/2,windowHeight/2);
    start.addImage(startImg);
    start.scale=0.3;
    start.visible=false;

    gameOver=createSprite(650,200);
    gameOver.addImage(gameOverImg);

    restart=createSprite(650,400);
    restart.addImage(restartImg);

    gameOver.scale=0.5;
    restart.scale=0.5;

    gameOver.visible=false;
    restart.visible=false;
    
    cup=createSprite(650,200);
    cup.addImage(cupImg);
    cup.scale=0.5;
    cup.visible=false;

    

   }

function draw (){

    background("darkblue");

    if(gameState===serve){
        fish.visible=false;
        start.visible=true;
    if(mousePressedOver(start)){
        gameState=play;
    }
    }
if(gameState===play){

    fish.collide(ground);

    bg.velocityX=-3;

if(bg.x<600){
    bg.x=650;
}

fish.visible=true;
start.visible=false;



if(keyDown("up")){
    fish.y=fish.y-6;
    fish.rotation=0;
    
}
if(keyDown("down")){
    fish.y=fish.y+6;
    fish.rotation=0;
   
}
if(keyDown("left")){
    fish.x=fish.x-6;
    fish.rotation=-90;
  
}
if(keyDown("right")){
    fish.x=fish.x+6;
    fish.rotation=-90;
   
}
if(sg1.isTouching(fish)){
  life=life-1;
  sg1[0].destroy();
}
if(sg2.isTouching(fish)){
    life=life-1;
    sg2[0].destroy();
}
if(sg3.isTouching(fish)){
    life=life-1;
    sg3[0].destroy();
}
if(sg4.isTouching(fish)){
    life=life-1;
    sg4[0].destroy();
}
 if(sg5.isTouching(fish)){
    life=life-1;
    sg5[0].destroy();
}
if(hg.isTouching(fish)){
    life=life-1;
    hg[0].destroy();
}
sg1.setColliderEach("rectangle",0,0,450,200);
sg2.setColliderEach("rectangle",0,0,350,150);
sg3.setColliderEach("rectangle",0,0,450,200);
sg4.setColliderEach("rectangle",0,0,350,150);
sg5.setColliderEach("rectangle",0,0,350,150);
hg.setColliderEach("rectangle",0,0,200,400);
dg.setColliderEach("rectangle",0,0,200,150);
//calling functions
Shark1();
Shark2();
Shark3();
Shark4();
Shark5();
Hook();
Diamond();

if(life===0){
    gameState=end;
}

if(dg.isTouching(fish)){
        score=score+2;
        dg[0].destroy();
        diamondSound.play();
   }

if(score===200){
    bg.velocityX=0;
    fish.velocityX=0;
    fish.velocityY=0;
    cup.visible=true;
    restart.visible=true;
    WinSound.play();
    sg1.setVelocityXEach(0);
    sg1.setLifetimeEach(-1);
    sg2.setVelocityXEach(0);
    sg2.setLifetimeEach(-1);
    sg3.setVelocityXEach(0);
    sg3.setLifetimeEach(-1);
    sg4.setVelocityXEach(0);
    sg4.setLifetimeEach(-1);
    sg5.setVelocityXEach(0);
    sg5.setLifetimeEach(-1);
    hg.setVelocityXEach(0);
    hg.setLifetimeEach(-1);
    dg.setLifetimeEach(-1);
    dg.destroyEach();
    if(mousePressedOver(restart)){
        Reset();
    }
}
if(fish.x<0){
    fish.x=1320;
}
if(fish.x>1320){
    fish.x=0;
}
}
    else if (gameState===end){
        bg.velocityX=0;
        fish.visible=false;
        gameOver.visible=true;
        restart.visible=true;
        fish.velocityX=0;
        fish.velocityY=0;
        GameOverSound.play();
        sg1.setVelocityXEach(0);
        sg1.setLifetimeEach(-1);
        sg2.setVelocityXEach(0);
        sg2.setLifetimeEach(-1);
        sg3.setVelocityXEach(0);
        sg3.setLifetimeEach(-1);
        sg4.setVelocityXEach(0);
        sg4.setLifetimeEach(-1);
        sg5.setVelocityXEach(0);
        sg5.setLifetimeEach(-1);
        hg.setVelocityXEach(0);
        hg.setLifetimeEach(-1);
        dg.setLifetimeEach(-1);
        dg.destroyEach();
        if(mousePressedOver(restart)){
            Reset();
        }
    }
    drawSprites();

    textSize(35);
    fill("white");
    text("LIFE :     ,  SCORE :   ",530,50);
    text(life, 640,50);
    text(score, 860,50);
} 
function Shark1(){
    if (World.frameCount % 100 == 0){
        var shark1= createSprite(1360,400,30,30);
        shark1.addImage(sharkImg);
        shark1.scale=0.5;
        shark1.velocityX=-12;
        sg1.add(shark1);
        return shark1;
    }
}
function Shark2(){
    if (World.frameCount % 110 == 0){
        var shark2= createSprite(0,300,30,30);
        shark2.addImage(SharkImg);
        shark2.scale=0.5;
        shark2.velocityX=12;
        sg2.add(shark2);
        return shark2;
    }
}
function Shark3(){
    if (World.frameCount % 120 == 0){
        var shark3= createSprite(1360,200,30,30);
        shark3.addImage(sharkImg);
        shark3.scale=0.5;
        shark3.velocityX=-12;
        sg3.add(shark3);
        return shark3;
    }
}
function Shark4(){
    if (World.frameCount % 90 == 0){
        var shark4= createSprite(0,100,30,30);
        shark4.addImage(SharkImg);
        shark4.scale=0.5;
        shark4.velocityX=12;
        sg4.add(shark4);
        return shark4;
    }
}
function Shark5(){
    if (World.frameCount % 80 == 0){
        var shark5= createSprite(0,500,30,30);
        shark5.addImage(SharkImg);
        shark5.scale=0.8;
        shark5.velocityX=12;
        sg5.add(shark5);
        return shark5;
    }
}
function Hook(){
    if (World.frameCount % 110 == 0){
        var hook= createSprite(1360,20,30,30);
        hook.addImage(hookImg);
        hook.scale=0.2;
        hook.velocityX=-7;
        hook.lifetime=190;
        hg.add(hook);
        return hook;
    }
}
function Diamond(){
    if (World.frameCount % 80 == 0){
        var diamond= createSprite(random(30,900),random(20,470),30,30);
        diamond.addImage(diamondImg);
        diamond.scale=0.2;
        diamond.lifetime=110;
        dg.add(diamond);
        return diamond;
    }
}
function Reset(){
    gameState=serve;
    gameOver.visible=false;
    restart.visible=false;
    cup.visible=false;
    sg1.destroyEach();
    sg2.destroyEach();
    sg3.destroyEach();
    sg4.destroyEach();
    sg5.destroyEach();
    hg.destroyEach();
    dg.destroyEach();
    life=7;
    score=0;
}