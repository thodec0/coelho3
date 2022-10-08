const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint= Matter.Constraint;//cria a limitação
const Composite = Matter.Composite;//cria um conjunto
const Composites = Matter.Composites;
const Body = Matter.Body;
var engine, world;
var fundoimg;
var chao;
var corda;
var fruta;
var frutaimg;
var frutaconectada;
var botao;
var coelho;
var coelhoimg;
var coelhopiscando;
var coelhoeat;
var coelhosad;
var balao;
var vento;
var eat;
var sad;


function preload(){
  fundoimg=loadImage('background.png');
  frutaimg=loadImage('melon.png');
coelhoimg=loadImage('Rabbit-01.png');
coelhopiscando=loadAnimation('blink_1.png','blink_2.png','blink_3.png');
coelhoeat=loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
coelhosad=loadAnimation('sad_1.png','sad_2.png','sad_3 (1).png');
vento=loadSound('air.wav');
eat=loadSound('eating_sound.mp3');
sad=loadSound('sad.wav');
coelhoeat.looping=false;
coelhosad.looping=false;
}


function setup(){
  canvas = createCanvas(500, 700);
  engine = Engine.create();
  world = engine.world;
  var chaopropriedades={

    isStatic:true 

  } 
  var propriedadesdafruta={

frictionAir:0.007


  }
  chao=Bodies.rectangle(200,690,600,20,chaopropriedades);
  World.add(world,chao);
  corda=new Rope(7.5,{x:245,y:30})

 fruta=Bodies.circle(300,300,20,propriedadesdafruta) 
 World.add(world,fruta);


frutaconectada=new link(corda , fruta);

botao=createImg('cut_btn.png');
botao.position(220,30);
botao.size(50,50);
botao.mouseClicked(cortar);

balao=createImg('balloon.png');
balao.position(10,250);
balao.size(150,100);
balao.mouseClicked(assoprar);



coelho=createSprite(420,620,100,100);
coelhopiscando.frameDelay=15

coelho.addAnimation('coelhopiscando',coelhopiscando);
coelhoeat.frameDelay=15
coelho.addAnimation('coelhoeat',coelhoeat);
coelhosad.frameDelay=15
coelho.addAnimation('coelhosad',coelhosad);

coelho.changeAnimation('coelhopiscando');
coelho.scale=0.2;
}

function draw(){

  background(fundoimg);

  Engine.update(engine);
  rectMode(CENTER);
  rect(chao.position.x,chao.position.y,600,20);
 

corda.show()



  if(fruta!=null){
    imageMode (CENTER);
    image (frutaimg,fruta.position.x,fruta.position.y,70,70);
  }
 
if (colisao(fruta,coelho)=== true){
  coelho.changeAnimation('coelhoeat');
  eat.play()
}
if(fruta!=null&&fruta.position.y>=650){
  coelho.changeAnimation('coelhosad');
  fruta=null;
  sad.play();
}
if(fruta!=null&&fruta.position.x<0){
  coelho.changeAnimation('coelhosad');
  fruta=null;
  sad.play();
}
if(fruta!=null&&fruta.position.x>=500){
  coelho.changeAnimation('coelhosad');
  fruta=null;
  sad.play();
}



drawSprites();
}
 function cortar(){
corda.break();
frutaconectada.desconectar();
frutaconectada=null;

 }

 function assoprar (){

Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.08,y:0});
    
vento.play()
 }
 function colisao(body,sprite){
if(body!=null){
  var distancia;
  distancia=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
}
if (distancia<=80){
World.remove(engine.world,fruta);
fruta=null
return true
}
else{
  return false
}
 }