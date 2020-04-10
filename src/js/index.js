 //import { Enemy } from './Objects/Enemy';


// const game = new Game();

// game.start();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var main;
var map=[];
var enemies=[];
var towers=[];
var projectiles=[];

var tick=0;
var state=0;
var read=0;

var time;
var delta;
var map1;
var map2;
var map3;
var maps=[map1,map2,map3];
var sizeTile=50;

var mapChoice=0;
var diffucultyChoice=0;
var musicOn=0;
var soundsOn=1;

var choiceTower=0;

var health=20;
var money=1000; //100
var moneyGained=100;
var wave=1;
var towersBuild=0;
var enemiesKilled=0;
var score=10;
var maxWave=20;



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
    context.fillText('Wave: '+wave+"/"+maxWave, 600, 50);
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
    
    if(tick%50==0){
        enemies.push(new Enemy(0,100,sizeTile,0));
    }
    enemies.forEach(element => element.move(delta));
}

function shoot(delta){

        var counter=0;
        for(var i=0;i<projectiles.length;i++){
            var counter=0;
            var totalDamage=0;
            var j=0;
            while(i!=j){
                totalDamage+=projectiles[j].damage;
                if(totalDamage>=enemies[counter].health){
                    counter++;
                }
                j++;
            }
            if(projectiles[i].acquireEnemy(enemies[counter].x,enemies[counter].y,delta)==1){
                console.log("Hit");
                money+=enemies[counter].reward;
                moneyGained+=enemies[counter].reward;
                if(soundsOn) enemyDeadSound.play();
                projectiles.splice(i,1); 
                enemies.splice(counter,1);
            }

        }

        if(tick%100==0){
            var temp;
            for(var j=0;j<towers.length;j++){
                    for(temp=0;temp<enemies.length;temp++) if(enemies[temp].health>0){
                        var newProjectile=new Projectile(towers[j].x,towers[j].y,sizeTile,towers[j].identity);
                        projectiles.push(newProjectile);
                        enemies[temp].health-=newProjectile.damage;
                        if(soundsOn) towerShotSound.play();
                        console.log("bum");
                        break;
                        }
                    }
            }


    }

function generateTower(){
    var towerCounter=0;
   towers.forEach(element => {
    if(towerCounter<enemies.length){
        
        element.setRotation(enemies[towerCounter].x,enemies[towerCounter].y);
        towerCounter++;
    }
    else element.setRotation(0,0);
    });
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
    localStorage.clear();
     canvas.hidden=true;
     loadMusic();
    // renderMenuScreen();

      renderMapScreen();
    //  

   
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
        saveToStorage();
        resetGameStats();
        renderEndScreen();
    }
    if(e.keyCode==87 && state==1){
        canvas.hidden=true;
        state=0;
        saveToStorage();
        resetGameStats();
        renderWinScreen();
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
    if(e.keyCode==77 && state==1){
        musicOn=!musicOn;
        if(musicOn) backgroundMusic.play();
        if(!musicOn) backgroundMusic.stop();
        soundsOn=!soundsOn; 
    }

})
   


canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message);  

    var newTurent=new Turent((mousePos.x-(mousePos.x%50)),(mousePos.y-(mousePos.y%50)),sizeTile,choiceTower);
    if(maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50] == 0 && money>=newTurent.price){
        towers.push(newTurent);
        maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50]=choiceTower+10;
        money-=newTurent.price;
        moneyGained+=newTurent.price;
        console.log("Stavitel")
    }
    console.log(maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50]);
    }, false);

