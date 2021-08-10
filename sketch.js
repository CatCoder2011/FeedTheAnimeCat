const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var FISH_WEIGHT;
var link;
var ANIME_HISS;
var DOUBLE_FISH_WEIGHT;
var brocolli_png;
var ADORBS_ANIME_HISS;
var image_Back;
var BANNANA;
var blink;
var eat;
var cry;
function preload() 
{
 ANIME_HISS = loadImage("images.png");
 DOUBLE_FISH_WEIGHT = loadImage("fish.png");
 BUTTON = loadImage("Button_cat.jpeg");
 blink = loadAnimation("Blinking_Cat1.jpg","Blinking_Cat2.jpg","Blinking_Cat3.jpg","Blinking_Cat4.jpg");
 eat = loadAnimation("Eating_Cat1.jpg","Eating_Cat2.jpg","Eating_Cat3.jpg","ating_CaEt4.jpg","Eating_Cat5.jpg");
 cry = loadAnimation("Crying_Cat1.jpg","Crying_Cat2.jpg","Crying_Cat3.jpg","Crying_Cat4.jpg","Crying_Cat5.jpg");
 blink.playing = true;
 eat.playing = true;
 eat.looping = false;
 cry.looping = false;
}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay = 20;
  eat.frameDelay = 20
  cry.frameDelay = 20;
  ground = new Ground(200,690,600,20);
  rope = new Rope(10,{x:250,y:50});
  FISH_WEIGHT = Bodies.circle(300,300,19,{density:0.001});
  Matter.Composite.add(rope.body, FISH_WEIGHT);
  link = new Link(rope, FISH_WEIGHT);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  ADORBS_ANIME_HISS = createSprite(250,620,100,100);
  ADORBS_ANIME_HISS.addAnimation("blinking",blink);
  ADORBS_ANIME_HISS.addAnimation("eating",eat);
  ADORBS_ANIME_HISS.addAnimation("crying",cry);
  ADORBS_ANIME_HISS.changeAnimation("blinking");
  ADORBS_ANIME_HISS.scale = 0.5;
  BANNANA = createImg("Button_cat.jpeg");
  BANNANA.position(220,30);
  BANNANA.size(100,100);
  BANNANA.mouseClicked(drop);
}

function draw() 
{
  background("black");
  ground.show();
  rope.show();
  if(FISH_WEIGHT!=null){
  image(DOUBLE_FISH_WEIGHT,FISH_WEIGHT.position.x, FISH_WEIGHT.position.y,60,60);
  }
  if(collide(FISH_WEIGHT,ADORBS_ANIME_HISS)==true)
  {
    ADORBS_ANIME_HISS.changeAnimation('eating');
    
  }
   
  if(collide(FISH_WEIGHT,ground.body)==true )
  {
    ADORBS_ANIME_HISS.changeAnimation('crying');
   }
  Engine.update(engine);
  drawSprites();

 
   
}
function drop(){
  rope.break();
  link.Detach();
  link = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}