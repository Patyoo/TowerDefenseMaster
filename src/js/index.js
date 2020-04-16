
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
var pause=0;

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
var moneyGained=0;
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

function title(){
    context.fillStyle = "red";
    context.font = "40px Comic Sans MS";
    context.textAlign = "center";
    context.fillText('Health: '+health, 150, 50);
    context.fillText('Wave: '+wave+"/"+maxWave, 450, 50);
    context.fillText('Money: '+money, 750, 50);
    context.fillText('Score: '+score, 1100, 50);
}

function findStartPosition(){
    for(var i=0;i<maps[mapChoice].length;i++)
        for(var j=0;j<maps[mapChoice][0].length;j++)
            if(maps[mapChoice][i][j] == 2) return [i,j];
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
    if(tick%150==0 && enemies.length==0){
        enemies.push(new Enemy(findStartPosition()[1]*sizeTile,findStartPosition()[0]*sizeTile+100,sizeTile,0));
    }
    enemies.forEach(element => element.move(delta));
}

function shoot(delta){
         for(var i=0;i<projectiles.length;i++){
            if(projectiles[i].acquireEnemy(projectiles[i].target.x,projectiles[i].target.y,delta)==1){
                projectiles[i].target.virtualHealth-=projectiles[i].damage;
                if(projectiles[i].target.virtualHealth<=0){
                    money+= projectiles[i].target.reward;
                    moneyGained+= projectiles[i].target.reward;
                    if(soundsOn) enemyDeadSound.play();
                    enemies.splice(enemies.indexOf(projectiles[i].target),1);
                }
                projectiles.splice(i,1);
            }
         }

        if(tick%150==0){
            var temp;
            for(var j=0;j<towers.length;j++){
                    for(temp=0;temp<enemies.length;temp++) if(enemies[temp].health>0){
                        var newProjectile=new Projectile(towers[j].x,towers[j].y,sizeTile,towers[j].identity,enemies[temp]);
                        projectiles.push(newProjectile);
                        enemies[temp].health-=newProjectile.damage;
                        if(soundsOn) towerShotSound.play();
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
     renderMenuScreen();
      //renderMapScreen();
}

window.addEventListener("keyup",function name(e){

    if(e.keyCode==80 && state!=0){
        canvas.hidden=true;
        state=0;
        pause=1;
        if(soundsOn)pauseSound.play();
        renderPauseScreen();
    }
    if(e.keyCode==27 && state==1){
        canvas.hidden=true;
        state=0;
        saveToStorage();
        renderEndScreen();
        resetGameStats();
    }
    if(e.keyCode==87 && state==1){
        canvas.hidden=true;
        state=0;
        saveToStorage();
        renderWinScreen();
        resetGameStats();
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

    var newTurent=new Turent((mousePos.x-(mousePos.x%50)),(mousePos.y-(mousePos.y%50)),sizeTile,choiceTower);
    if(maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50] == 0 && money>=newTurent.price){
        towers.push(newTurent);
        maps[mapChoice][((mousePos.y-(mousePos.y%50))-100)/50][(mousePos.x-(mousePos.x%50))/50]=choiceTower+10;
        money-=newTurent.price;
        moneyGained+=newTurent.price;
    }
    }, false);

