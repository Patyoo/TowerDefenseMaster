 //import { Enemy } from './Objects/Enemy';


// const game = new Game();

// game.start();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var map=[];
var enemies=[];
var towers=[];
var projectiles=[];
var sizeTile=50;
var tick=0;
var main;
var state=0;
var read=0;
var health=20;
var money=100;
var wave=0;
var choiceTower=0;
var mapChoice=0;
var diffucultyChoice=0;
var musicOn=0;
var soundsOn=1;
var time;
var delta;
var map1;
var map2;
var map3;
var maps=[map1,map2,map3];


function render(){
    drawMap();
    title();

}
function update(delta){
    generateTower();
    generateEnemy(delta);
    shoot(delta);
}
function title()
{
    context.fillStyle = "red";
    context.font = "40px Comic Sans MS";
    context.textAlign = "center";
    context.fillText('Health: '+health, 200, 50);
    context.fillText('Wave: '+wave+"/"+wave, 600, 50);
    context.fillText('Money: '+money, 1000, 50);
}
function generateMap(){

    for(var i=0;i<maps[mapChoice].length;i++){
        for(var j=0;j<maps[mapChoice][0].length;j++){
            map.push(new Tile(j*50,100+i*50,sizeTile,maps[mapChoice][i][j]));
        }
    }

}

function drawMap(){
    context.clearRect(0, 0, 1250, 700);
    context.rect(0, 0, 1250,700);
    context.fillStyle = "black";
    context.fill();
    map.forEach(element => element.create());
}
function generateEnemy(){
    
    if(tick%100==0){
        enemies.push(new Enemy(0,100,sizeTile,0));
    }
    enemies.forEach(element => element.move(delta));
}

function shoot(delta){

    if(tick%100==0){

        towers.forEach(element => {
  
            if(projectiles.length<enemies.length){
                projectiles.push(new Projectile(element.x,element.y,sizeTile,element.identity));
                if(soundsOn) towerShotSound.play();
            }
        });
    }
    if(enemies.length>0){
    var counter=0;
    projectiles.forEach(element => {
       // console.log(element.x+" "+element.y);
        if(element.acquireEnemy(enemies[counter].x,enemies[counter].y,delta)==1){
            console.log("Hit");
            if(soundsOn) enemyDeadSound.play();
            projectiles.splice(counter,1); enemies.splice(0,1);
        }
        counter++;
    });
}
}

function generateTower(){
    towers.forEach(element => element.create());
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
function mainLoop(){

    if(state==1){
    requestAnimationFrame(mainLoop);
    var now= Date.now();
    delta=(now-time)/100;
    time=now;
    tick++;
    render();
    update(delta);
    }
}

window.onload = function(){   
     canvas.hidden=true;
     //renderMenuScreen();
     renderMapScreen();
     loadMusic();

    //  generateMap();
    //  state=1;
    //  mainLoop();
}

window.addEventListener("keyup",function name(e){

    if(e.keyCode==80 && state!=0){
        canvas.hidden=true;
        state=0;
        if(soundsOn)pauseSound.play();
        renderPauseScreen();
    }
    if(e.keyCode==27 && state==1){
        canvas.hidden=true;
        state=0;
        renderEndScreen();
    }
    if(e.keyCode==49 && state==1){
        choiceTower=0;
    }
    if(e.keyCode==50 && state==1){
        choiceTower=1;
    }
    if(e.keyCode==51 && state==1){
        choiceTower=2;
    }

})
   


canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message);  

    if(maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50] == 0 ){
        towers.push(new Turent((mousePos.x-(mousePos.x%50)),(mousePos.y-(mousePos.y%50)),sizeTile,choiceTower));
        maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50]=choiceTower+5;
        console.log("Stavitel")
    }

    console.log( ((mousePos.x-(mousePos.x%50))/50 ), ((mousePos.y-(mousePos.y%50))-100)/50 );
    console.log(maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50]);
    }, false);


