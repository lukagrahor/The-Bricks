var prvic=0;
document.addEventListener('keyup', event => {
  if (event.code === 'Space'&&prvic==0) {
	prvic=1;
  var opomba=document.getElementById("opomba");
  opomba.style.display = 'none';
	drawIt();
  }
})
var zemlja = new Image();
zemlja.src = "slike/grassObrnjen.png";
var dirt = new Image();
dirt.src = "slike/dirt.png";
var kamen = new Image();
kamen.src = "slike/stone.png";
var kamenMined = new Image();
kamenMined.src = "slike/stoneMined.png";
var zelezo = new Image();
zelezo.src = "slike/iron.png";
var zelezoMined1 = new Image();
zelezoMined1.src = "slike/ironMined1.png";
var zelezoMined2 = new Image();
zelezoMined2.src = "slike/ironMined2.png";
var zlato = new Image();
zlato.src = "slike/gold.png";
var zlatoMined1 = new Image();
zlatoMined1.src = "slike/goldMined1.png";
var zlatoMined2 = new Image();
zlatoMined2.src = "slike/goldMined2.png";
var zlatoMined3 = new Image();
zlatoMined3.src = "slike/goldMined3.png";
var diamant = new Image();
diamant.src = "slike/diamond.png";
var diamantMined1 = new Image();
diamantMined1.src = "slike/diamondMined1.png";
var diamantMined2 = new Image();
diamantMined2.src = "slike/diamondMined2.png";
var diamantMined3 = new Image();
diamantMined3.src = "slike/diamondMined3.png";
var diamantMined4 = new Image();
diamantMined4.src = "slike/diamondMined4.png";
var les=new Image();
les.src="slike/plank.png";
var dx = 3;
var dy = 4;
function drawIt() {
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);  
var x = 350;
var y = 500;
function lahko(){
  klik.play();
  dx=2
  dy=3;
}
function srednje(){
  klik.play();
  dx=3
  dy=4;
}
function tezko(){
  klik.play();
  dx=9
  dy=10;
}
var WIDTH;
var HEIGHT;
var r=10;
var ctx;
var paddlex;
var paddlew;
var paddleh;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var tocke;
var stZeleza;
var tabZeleza=[0,0,0];
var zelezoJe=false;
var zelezoJe2=false;
var stZlata;
var tabZlata=[0,0,0];
var zlatoJe=false;
var zlatoJe2=false;
var stDiamantov;
var tabDiamantov=[0,0,0];
var diamantJe=false;
var diamantJe2=false;
//timer
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var start=true;
//stevilo dotikov
//preverjanje ali se zadene isti brick
var tabVr1=[0,0,0,0,0,0,0,0,0,0,0,0];
var tabVr2=[0,0,0,0,0,0,0,0,0,0,0,0];
var tabVr3=[0,0,0,0,0,0,0,0,0,0,0,0];
var razbij=1;
//zvok
var zvokZemlja = new sound("zvok/zemlja.mp3");
var zvokKamen = new sound("zvok/stoneBreaking.mp3");
var zvokKamenBreak = new sound("zvok/stoneBreak.mp3");
var gameOver = new sound("zvok/gameOver.mp3");
var plank =new sound("zvok/plank.mp3");
//za konec igre
var konecIgre=0;
var konec=document.getElementById('gameOver');
var zmaga=document.getElementById('zmaga');
var zmagovalec=0;
var vseTocke;
var klik=new Audio("zvok/click.mp3");
function init() {
	tocke = 0;
	$("#tocke").html(tocke);
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  sekunde = 0;
  izpisTimer = "00:00";
  intTimer = setInterval(timer, 1000);
  return setInterval(draw, 10);
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x,y,r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}
function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 15;
  paddlew = 90;
}
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function onKeyDown(evt) {
  if (evt.keyCode == 68)
rightDown = true;
  else if (evt.keyCode == 65) leftDown = true;
}

function onKeyUp(evt) {
  if(konecIgre==0){
    if (evt.keyCode == 68)
      rightDown = false;
    else if (evt.keyCode == 65)
      leftDown = false;
  }
}
function init_mouse() {
canvasMinX = $("canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH-39;
}

function onMouseMove(evt) {
  if(konecIgre==0){
    if (evt.pageX > canvasMinX+35 && evt.pageX < canvasMaxX) {
      paddlex = evt.pageX - canvasMinX-35;
    }
}
}
function initbricks() {
  NROWS = 5;
  NCOLS = 12;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 75;
  PADDING = 1;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}
function timer(){
  if(start==true){
  sekunde++;


  sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
  minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
  izpisTimer = minuteI + ":" + sekundeI;

  $("#cas").html(izpisTimer);
  }
  else{
  sekunde=0;
  //izpisTimer = "00:00";
  $("#cas").html(izpisTimer);
  }
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} 
function nakljucno(){
  var i;
  var j;
  var h;
  var preveri;
  vseTocke=24;//Toliko so vredne 2 vrstice zemlje
  stZeleza=Math.floor(Math.random() * 7) + 5;
  for(i=0;i<stZeleza;i++){
    tabZeleza[i]=Math.floor(Math.random() * 12) + 0;
  }
  for(i=0;i<tabZeleza.length;i++){//Zmanjsa moznost, da bi prislo do manjse kolicine železa
    preveri=tabZeleza[i];
    for(j=0;j<tabZeleza.length;j++){
      if(i!=j&&preveri==tabZeleza[j]){
        tabZeleza[j]=Math.floor(Math.random() * 12) + 0;
      }
      if(i+1==tabZeleza.length){
        for(h=0;h<tabZeleza.length-1;h++){
          if(preveri==tabZeleza[h]){
            tabZeleza[j]=Math.floor(Math.random() * 12) + 0;
          }
        }
      }
    }
  }
  vseTocke+=stZeleza*3+(12-stZeleza)*2;
  stZlata=Math.floor(Math.random() * 6) + 4;
  for(i=0;i<stZlata;i++){
    tabZlata[i]=Math.floor(Math.random() * 12) + 0;
  }
  for(i=0;i<tabZlata.length;i++){//Zmanjsa moznost, da bi prislo do manjse kolicine zlata
    preveri=tabZlata[i];
    for(j=0;j<tabZlata.length;j++){
      if(i!=j&&preveri==tabZlata[j]){
        tabZlata[j]=Math.floor(Math.random() * 12) + 0;
      }
      if(i+1==tabZlata.length){
        for(h=0;h<tabZlata.length-1;h++){
          if(preveri==tabZlata[h]){
            tabZlata[j]=Math.floor(Math.random() * 12) + 0;
          }
        }
      }
    }
  }
  vseTocke+=stZlata*4+(12-stZlata)*2;
  stDiamantov=Math.floor(Math.random() * 4) + 1;
  for(i=0;i<stDiamantov;i++){
    tabDiamantov[i]=Math.floor(Math.random() * 12) + 0;
  }
  for(i=0;i<tabDiamantov.length;i++){//Zmanjsa moznost, da bi prislo do manjse kolicine diamantov
    preveri=tabDiamantov[i];
    for(j=0;j<tabDiamantov.length;j++){
      if(i!=j&&preveri==tabDiamantov[j]){
        tabDiamantov[j]=Math.floor(Math.random() * 12) + 0;
      }
      if(i+1==tabDiamantov.length){
        for(h=0;h<tabDiamantov.length-1;h++){
          if(preveri==tabDiamantov[h]){
            tabDiamantov[j]=Math.floor(Math.random() * 12) + 0;
          }
        }
      }
    }
  }
  vseTocke+=stDiamantov*5+(12-stDiamantov)*2;
  console.log(vseTocke);
}
  $(document).mousemove(onMouseMove); 
function draw() {
  console.log(tocke);
  clear();
  circle(x, y, 10);
  if(rightDown){
	if((paddlex+paddlew) < WIDTH){
	paddlex += 5;
	}
	else{
		paddlex = WIDTH-paddlew;
	}
}
  else if(leftDown){
if(paddlex>0){
paddlex -=5;
}else{
paddlex=0;
}
}
ctx.drawImage(les,paddlex, HEIGHT-paddleh, paddlew, paddleh);
  //riši opeke
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
	  if (bricks[i][j] == 1 && i==0) {
          for(var p=0;p<stDiamantov;p++){
            if(j==tabDiamantov[p]){
              if(tabVr3[j]==0){
                ctx.drawImage(diamant, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr3[j]==1){
                ctx.drawImage(diamantMined1, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr3[j]==2){
                ctx.drawImage(diamantMined2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr3[j]==3){
                ctx.drawImage(diamantMined3, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr3[j]==4){
                ctx.drawImage(diamantMined4, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              diamantJe=true;
            }
          }
          if(diamantJe==false){
            if(tabVr3[j]==0){
                ctx.drawImage(kamen, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              if(tabVr3[j]==1){
                ctx.drawImage(kamenMined, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
          }
          diamantJe=false;
      }
	  if (bricks[i][j] == 1 && i==1) {
          for(var p=0;p<stZlata;p++){
            if(j==tabZlata[p]){
              if(tabVr2[j]==0){
                ctx.drawImage(zlato, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr2[j]==1){
                ctx.drawImage(zlatoMined1, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr2[j]==2){
                ctx.drawImage(zlatoMined2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr2[j]==3){
                ctx.drawImage(zlatoMined3, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              zlatoJe=true;
            }
          }
          if(zlatoJe==false){
            if(tabVr2[j]==0){
                ctx.drawImage(kamen, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              if(tabVr2[j]==1){
                ctx.drawImage(kamenMined, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
          }
          zlatoJe=false;
      }
      if (bricks[i][j] == 1 && i==2) {
          for(var p=0;p<stZeleza;p++){
            if(j==tabZeleza[p]){
              if(tabVr1[j]==0){
                ctx.drawImage(zelezo, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              if(tabVr1[j]==1){
                ctx.drawImage(zelezoMined1, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              else if(tabVr1[j]==2){
                ctx.drawImage(zelezoMined2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              zelezoJe=true;
            }
          }
          if(zelezoJe==false){
            if(tabVr1[j]==0){
                ctx.drawImage(kamen, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
              if(tabVr1[j]==1){
                ctx.drawImage(kamenMined, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
              }
          }
          zelezoJe=false;
      }
      if (bricks[i][j] == 1 && i==3) {
        ctx.drawImage(dirt, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      }
	  if (bricks[i][j] == 1 && i==4) {
        ctx.drawImage(zemlja, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      }
      
    }
  }
  rowheight = BRICKHEIGHT + PADDING + 1/2; //Preveri ali smo zadeli opeko
  colwidth = BRICKWIDTH + PADDING + 1/2;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
dy = -dy;
if(row==0){
  for(var t=0;t<stDiamantov;t++){
    if(col==tabDiamantov[t]){
      if(tabVr3[col]<5){
        if(tabVr3[col]==0){
          ctx.drawImage(diamantMined1, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        else if(tabVr3[col]==1){
          ctx.drawImage(diamantMined2, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        else if(tabVr3[col]==2){
          ctx.drawImage(diamantMined3, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        else if(tabVr3[col]>2&&tabVr3[col]<5){
          ctx.drawImage(diamantMined4, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        zvokKamen.play();
        tabVr3[col]+=razbij;
      }
        if(tabVr3[col]==5){
          tocke +=5;
          zvokKamenBreak.play();
          bricks[row][col] = 0;
        }
      diamantJe2=true;
    }
  }
  if(diamantJe2==false){
    if(tabVr3[col]==0){
      ctx.drawImage(kamenMined, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      zvokKamen.play();
      tabVr3[col]=1;
    }
    else if(tabVr3[col]==1){
      tocke +=2;
      zvokKamenBreak.play();
      bricks[row][col] = 0;
    }
  }
}
if(row==1){
  for(var t=0;t<stZlata;t++){
    if(col==tabZlata[t]){
      if(tabVr2[col]<4){
        if(tabVr2[col]==0){
          ctx.drawImage(zlatoMined1, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        else if(tabVr2[col]==1){
          ctx.drawImage(zlatoMined2, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        else if(tabVr2[col]>1&&tabVr2[col]<4){
          ctx.drawImage(zlatoMined3, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
          zvokKamen.play();
          tabVr2[col]+=razbij;
        }
        if(tabVr2[col]==4){
          tocke +=4;
          zvokKamenBreak.play();
          bricks[row][col] = 0;
        }
        zlatoJe2=true;
      }
    }
  if(zlatoJe2==false){
    if(tabVr2[col]==0){
      ctx.drawImage(kamenMined, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      zvokKamen.play();
      tabVr2[col]=1;
    }
    else if(tabVr2[col]==1){
      tocke +=2;
      zvokKamenBreak.play();
      bricks[row][col] = 0;
    }
  }
}
if(row==2){
  for(var t=0;t<stZeleza;t++){
    if(col==tabZeleza[t]){
      if(tabVr1[col]<3){
        if(tabVr1[col]==0){
          ctx.drawImage(zelezoMined1, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        else if(tabVr1[col]>0&&tabVr1[col]<3){
          ctx.drawImage(zelezoMined2, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        zvokKamen.play();
        tabVr1[col]+=razbij;
      }
      if (tabVr1[col]==3){
        tocke +=3;
        zvokKamenBreak.play();
        bricks[row][col] = 0;
      }
      zelezoJe2=true;
    }
  }
  if(zelezoJe2==false){
    if(tabVr1[col]==0){
      ctx.drawImage(kamenMined, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      zvokKamen.play();
      tabVr1[col]=1;
    }
    else if(tabVr1[col]==1){
      zvokKamenBreak.play();
      tocke +=2;
      bricks[row][col] = 0;
    }
  }
}
if(row>2){
  tocke += 1;
  zvokZemlja.play();
  bricks[row][col] = 0;
}
zelezoJe2=false;
zlatoJe2=false;
diamantJe2=false;
 //vrednost opeke
$("#tocke").html(tocke);
} 
   if (x + dx > WIDTH-r || x + dx < 0+r)
    dx = -dx;
  if (y + dy < 0+r)
    dy = -dy;
  else if (y + dy > HEIGHT -r+1) {
    start=false;
    if (x > paddlex && x < paddlex + paddlew){
  		dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
  		dy = -dy;
      start=true;
      plank.play();
	 }
  else if (y + dy > HEIGHT -r){
    if(zmagovalec==0){
      if(konecIgre==0)
        gameOver.play();
      konecIgre=1;
      konec.style.visibility = 'visible';
      document.getElementById("koncneTocke").innerHTML = "You've reached "+tocke+" points!";
    }
    return;
  }     
  }
  x += dx;
  y += dy;
  if(tocke>=vseTocke){
    konecIgre=1;
    zmagovalec=1;
    zmaga.style.visibility = 'visible';
    document.getElementById("zmagovalneTocke").innerHTML = "You've reached "+tocke+" points!";
    return;
  }
  function lahko(){
  klik.play();
  dx=2
  dy=3;
}
function srednje(){
  klik.play();
  dx=3
  dy=4;
}
function tezko(){
  klik.play();
  dx=9
  dy=10;
}
}

init();
init_paddle();
init_mouse();
initbricks();
nakljucno();
}
function lahko(){
  klik.play();
  dx=2
  dy=3;
}
function srednje(){
  klik.play();
  dx=3
  dy=4;
}
function tezko(){
  klik.play();
  dx=4
  dy=5;
}