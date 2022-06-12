//sonidos
var S_1,S_fase2;
var E_1 = "apagado",E_fase2 = "apagado";
var C_1;

//juego
var jugador,musica,cancion,E_cancion;
var jugadorImg;
var G_obstaculo,G_obstaculo2,G_obstaculo3,G_obstaculo4;
var flecha_derecha,flecha_izquierda,flecha_abajo,flecha_arriba;
var segundos = 0,tiempo_espera = 20,velocidad1 = -5,velocidad2 = 5;
var S_segundos1 = 0;
var S_obstaculos = 1;

var gameState = "pantalla principal";
function preload(){
  //sonidos
  S_1 = loadSound("./sonidos/fase1.mp3");

  //imagenes
  flecha_derecha = loadImage ("flecha_derecha.png");
  flecha_izquierda = loadImage ("flecha_izquierda.png");
  flecha_abajo = loadImage ("flecha_abajo.png");
  flecha_arriba = loadImage ("flecha_arriba.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);

  G_obstaculo = createGroup();
  G_obstaculo2 = createGroup();
  G_obstaculo3 = createGroup();
  G_obstaculo4 = createGroup();

  jugador = createSprite (width / 2, height / 2 ,width / 50,width / 50);
  jugador.shapeColor = "lime";

  //pantalla principal
  musica = createSprite(width - 20,0 + 20,20,20);
  musica.shapeColor = "white";

  //musica
  C_1 = createSprite (0 + 40,height / 2,20,20);
  C_1.shapeColor = "black";
}
function draw(){
  background ("gray");

  if (gameState === "indicaciones 1"){
    indicaciones_1();
  }
  if (gameState === "jugando_1"){
  nivel_1();
  }
  
  if (gameState === "indicaciones 2"){
    indicaciones_2();
  }
  if (gameState === "jugando_2"){
    nivel_2();
  }
  movimiento();
  accesos();
  sonidos_segundos();
  drawSprites();
}
function movimiento(){
  if (jugador.x < 0 || jugador.x > width){
    gameState = "final";
  }
  if (jugador.y < -15 || jugador.y > height + 15){
    gameState = "final";
  }
  
  if (keyDown ("W") || keyDown ("up_arrow")){
    jugador.y = jugador.y - 10;
  }
  if (keyDown ("S") || keyDown ("down_arrow")){
    jugador.y = jugador.y + 10
  }

  if (gameState === "jugando_2"){
    if (keyDown ("A") || keyDown ("up_arrow")){
      jugador.x = jugador.x - 10;
    }
    if (keyDown ("D") || keyDown ("down_arrow")){
      jugador.x = jugador.x + 10
    }
  }
  jugador.velocityX = 0;
  jugador.velocityY = 0;
console.log(gameState);
  jugador.collide (G_obstaculo);
  jugador.collide (G_obstaculo2);
  jugador.collide (G_obstaculo3);
  jugador.collide (G_obstaculo4);
}
function accesos(){
if (gameState === "pantalla principal"){
  if (mousePressedOver(musica) && segundos > 0){
    gameState = "musica";
    segundos = 0;
  }
  C_1.visible = false;
}
if (gameState === "musica"){
  if (mousePressedOver(musica) && segundos > 0){
    gameState = "pantalla principal";
    segundos = 0;
  }
  textSize(20);
  fill ("red");
  text ("presiona M para mutear la musica",0 + 20,0 + 100);
  fill ("green");
  text ("presiona P para REPRODUCIR la musica",0 + 20,0 + 140);
  C_1.visible = true;
}
if (keyDown ("1") && gameState === "pantalla principal"){
  gameState = "indicaciones 1";
}
}
function sonidos_segundos(){
//sonidos (on y off)
if (keyWentDown ("M") && E_1 === "prendido" && S_segundos1 > 0){
  S_1.pause();
  E_1 = "apagado";
  S_segundos1 = 0;
}
if (keyWentUp ("P") && E_1 === "apagado" && S_segundos1 > 0){
  S_1.play();
  E_1 = "prendido";
  S_segundos1 = 0;
}

//contador de segundos de musica
if (frameCount % 10 === 0){
  S_segundos1 = S_segundos1 + 1;
}

//contador de segundos
if (frameCount % 30 === 0){
  segundos = segundos + 1;
}
}
function indicaciones_1(){
  if (gameState === "indicaciones 1"){

//indicacion 1
if (S_obstaculos > 0 && S_obstaculos <= 4){
  var ind_1 = createSprite (width + 10,height / 2 - 10,20,20);
  ind_1.addImage (flecha_izquierda);
  ind_1.scale = 2;
  ind_1.velocityX = -10;
  ind_1.lifetime = 300;
}
//indicacion 2
  if (S_obstaculos >= 2 && S_obstaculos <= 4){
  var ind_2 = createSprite (0 - 10,height / 2 + 10,20,20);
  ind_2.addImage (flecha_derecha);
  ind_2.scale = 2;
  ind_2.velocityX = 10;
  ind_2.lifetime = 300;
  }

//indicacion 3
if (S_obstaculos >= 3 && S_obstaculos <= 4){
  var ind_3 = createSprite (width / 2,0 - 10,20,20);
  ind_3.addImage (flecha_abajo);
  ind_3.scale = 2;
  ind_3.velocityY = 10;
  ind_3.lifetime = 300;
  }

//indicacion 4
if (S_obstaculos === 4){
  var ind_4 = createSprite (width / 2,height + 10,20,20);
  ind_4.addImage (flecha_arriba);
  ind_4.scale = 2;
  ind_4.velocityY = -10;
  ind_4.lifetime = 300;
  }
  gameState = "jugando_1";
  }
}
function nivel_1(){

  //disminuye tiempo de aparicion
  if (tiempo_espera > 10){
  if (segundos >= 5){
    segundos = 0;
    tiempo_espera = tiempo_espera - 10;
  }
}
//aumenta velocidad
if (tiempo_espera === 10){
  if (segundos === 5){
    segundos = 0;
    velocidad1 = velocidad1 - 5;
    velocidad2 = velocidad2 + 5;
  }
}

//reinicia el tiempo y velocidad [desbloquea siguientes obstaculos]
if (velocidad1 < -20){
  tiempo_espera = 20;
  velocidad1 = -5;
  velocidad2 = 5;
  S_obstaculos = S_obstaculos + 1;
  gameState = "indicaciones 1";
}

//obstaculo 1
if (S_obstaculos > 0 && S_obstaculos <= 4){
if (frameCount % tiempo_espera === 0){
  var tamaño = Math.round (random (20,60));

  var obstaculo = createSprite (width + 10,random (10,height),tamaño,tamaño);
  obstaculo.shapeColor = "brown";
  obstaculo.velocityX = -5;
  obstaculo.lifetime = 300;

  G_obstaculo.add (obstaculo);

  obstaculo.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
  }
  G_obstaculo.setVelocityXEach(velocidad1);
}
//obstaculo 2
if (S_obstaculos >= 2 && S_obstaculos <= 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo2 = createSprite (0 - 10,random (10,height),tamaño,tamaño);
  obstaculo2.shapeColor = "brown";
  obstaculo2.velocityX = 5;
  obstaculo2.lifetime = 300;

  G_obstaculo2.add (obstaculo2);

  obstaculo2.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo2.setVelocityXEach(velocidad2);
}
//obstaculo 3
if (S_obstaculos >= 3 && S_obstaculos <= 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo3 = createSprite (random (10,width),0 - 10,tamaño,tamaño);
  obstaculo3.shapeColor = "brown";
  obstaculo3.velocityY = 5;
  obstaculo3.lifetime = 300;

  G_obstaculo3.add (obstaculo3);

  obstaculo3.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo3.setVelocityYEach(velocidad2);
}
//obstaculo 4
if (S_obstaculos === 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo4 = createSprite (random (10,width),height + 10,tamaño,tamaño);
  obstaculo4.shapeColor = "brown";
  obstaculo4.velocityY = -5;
  obstaculo4.lifetime = 300;

  G_obstaculo4.add (obstaculo4);

  obstaculo4.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo4.setVelocityYEach(velocidad1);
}
if (S_obstaculos === 5){
  gameState = "indicaciones 2";
}
}
function nivel_2(){
  fill ("white")
  text ("ESTAS EN EL NIVEL 2",width / 2, height / 2);
}
function indicaciones_2(){
  gameState = "jugando_2";
}