
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
var soundsOn=0;

var choiceTower=0;

var health=20;
var money=100; //100
var moneyGained=0;
var wave=1;
var towersBuild=0;
var enemiesKilled=0;
var score=0;
var numOfEnemies=[5,10,15,20,25];
var enemiesLeft=numOfEnemies[wave-1];
var checkTick=0;
var enemyReleased=0;

var buttonY=10;
var musicOnButtonX=950;
var soundOnButtonX=1050;
var pauseButtonX=1150;
var animations=[];


function render(){
    drawMap();
    title();
    checkEndOfWave();
}

function update(delta){
    generateTower();
    generateEnemy(delta);
    shoot(delta);
    moveAnimations();
}

function title(){
    context.fillStyle = "#006B38";
    context.font = "40px Comic Sans MS";
    context.textAlign = "center";
    new StaticImages(20,10,sizeTile,0).create();
    new StaticImages(200,10,sizeTile,1).create();
    context.fillText(health, 100, 50);
    context.fillText(money, 290, 50);
    context.fillText('Wave: '+wave+"/"+numOfEnemies.length, 500, 50);
    context.fillText('Score: '+score, 750, 50);
    new StaticImages(musicOnButtonX,buttonY,sizeTile,3-musicOn).create();
    new StaticImages(soundOnButtonX,buttonY,sizeTile,5-soundsOn).create();
    new StaticImages(pauseButtonX,buttonY,sizeTile,6).create();
}

function generateMap(){
    for(var i=0;i<maps[mapChoice].length;i++){
        for(var j=0;j<maps[mapChoice][0].length;j++){
            map.push(new Tile(j*50,100+i*50,sizeTile,maps[mapChoice][i][j]));
        }
    }
}

function drawMap(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 1250,700);
    map.forEach(element => element.create());
}

function generateEnemy(){    
    if(tick%(150-(diffucultyChoice*50))==0 && enemyReleased<numOfEnemies[wave-1]){
        var newEnemy=new Enemy(findStartPosition()[1]*sizeTile,findStartPosition()[0]*sizeTile+100,sizeTile, 
        Math.floor(Math.random()* ((diffucultyChoice)+wave+2))  
       );
        newEnemy.matchAsset();
        enemies.push(newEnemy);
        enemyReleased++;
    }
    enemies.forEach(element => {
        if(!element.move()){
            health-=element.punishment;
            enemiesLeft--;
            enemies.splice(enemies.indexOf(element),1);
        }
        if(health<=0){
            canvas.hidden=true;
            state=0;
            saveToStorage();
            renderEndScreen();
            resetGameStats();
        }
    });
}

function moveAnimations(){
    animations.forEach(element => {
       element.move();
       if(element.limit==0) animations.splice(animations.indexOf(element),1);
    });
}

function shoot(delta){
         for(var i=0;i<projectiles.length;i++){
            if(projectiles[i].acquireEnemy(projectiles[i].target.x,projectiles[i].target.y,delta)==1){
                projectiles[i].target.virtualHealth-=projectiles[i].projectileDamage;
                if(projectiles[i].target.virtualHealth<=0){
                    enemiesLeft--;
                    score+=projectiles[i].target.reward;
                    money+= projectiles[i].target.reward;
                    moneyGained+= projectiles[i].target.reward;
                    if(soundsOn) enemyDeadSound.play();
                    animations.push(new Animation(projectiles[i].x,projectiles[i].y,sizeTile,1));
                    enemies.splice(enemies.indexOf(projectiles[i].target),1);
                }
                else animations.push(new Explosion(projectiles[i].x,projectiles[i].y,sizeTile/2,0));
                projectiles.splice(i,1);
            }
         }

            var temp;
                    for(temp=0;temp<enemies.length;temp++){
                        if(enemies[temp].health<=0) continue;
                        for(var j=0;j<towers.length;j++){
                            var towersDistances=[];
                            for(var i=0;i<towers.length;i++) towersDistances.push(getDistance(enemies[temp].x,enemies[temp].y,towers[i].x,towers[i].y));
                            var minIndex=getMinIndex(towersDistances,towers);
                            if(minIndex==-1) break;
                            if(getDistance(enemies[temp].x,enemies[temp].y,towers[minIndex].x,towers[minIndex].y) <=towers[minIndex].range && enemies[temp].health>0){
                            var newProjectile=new Projectile(towers[minIndex].x,towers[minIndex].y,sizeTile,towers[minIndex].identity,
                                                    enemies[temp],towers[minIndex].projectileSpeed,towers[minIndex].projectileDamage);
                            if(tick%towers[minIndex].reloadTime==0){
                                towers[minIndex].shooting=1;
                                towers[minIndex].target=newProjectile;
                                projectiles.push(newProjectile);
                                enemies[temp].health-=newProjectile.projectileDamage;
                                if(soundsOn) towerShotSound.play();
                            }
                            towers[minIndex].target=enemies[temp];
                            }
                        }
                    }

    }

function generateTower(){
    towers.forEach(element => {
        element.setRotation(element.target.x,element.target.y);
        element.shooting=0;
    });
}

function mainLoop(){
    if(state==1){
    var now= Date.now();
    delta=(now-time)/100;
    time=now;
    tick++;
    render();
    update(delta);
    requestAnimationFrame(mainLoop);
    }
}

window.onload = function(){   
    localStorage.clear();
     canvas.hidden=true;
     loadMusic();
     renderMenuScreen();
}

window.addEventListener("keyup",function name(e){
    if(e.keyCode==27 && state==1){
        canvas.hidden=true;
        state=0;
        pause=1;
        if(soundsOn)pauseSound.play();
        renderPauseScreen();
    }
    if(e.keyCode==49 && state==1) choiceTower=0;
    if(e.keyCode==50 && state==1) choiceTower=1;
    if(e.keyCode==51 && state==1) choiceTower=2;
    if(e.keyCode==77 && state==1){
        musicOn=!musicOn;
        if(musicOn) backgroundMusic.play();
        else backgroundMusic.stop();
        soundsOn=!soundsOn; 
    }
})
  
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var posXMap =(mousePos.x-(mousePos.x%50));
    var posYMap= (mousePos.y-(mousePos.y%50));

    if(mousePos.y>99){
        var newTurent=new Turent(posXMap,posYMap,sizeTile,choiceTower,0);
        newTurent.matchAsset();
        if(maps[mapChoice][(posYMap-100)/50][posXMap/50] == 0 && money-newTurent.price>=0){
            towers.push(newTurent);
            maps[mapChoice][(posYMap-100)/50][posXMap/50]=choiceTower+10;
            money-=newTurent.price;
            return;
        }
    
        var searchedTower=getTower(posXMap,posYMap);
        if(maps[mapChoice][(posYMap-100)/50][posXMap/50]>9 && money>=(searchedTower.price/2)){
            searchedTower.projectileSpeed+=(searchedTower.projectileSpeed/2);
            searchedTower.projectileDamage+=(searchedTower.projectileDamage/2);
            money-=searchedTower.price;
            animations.push(new Animation(posXMap,posYMap,sizeTile,0));
            return;
        }
    }
    else{
        if(mousePos.x>=musicOnButtonX && mousePos.x<=(musicOnButtonX+sizeTile) && mousePos.y>=buttonY && mousePos.y<=(buttonY+sizeTile)){
            musicOn=!musicOn;
            if(musicOn) backgroundMusic.play();
            else backgroundMusic.stop();
            return;
        }
        if(mousePos.x>=soundOnButtonX && mousePos.x<=(soundOnButtonX+sizeTile) && mousePos.y>=buttonY && mousePos.y<=(buttonY+sizeTile)){
            soundsOn=!soundsOn; 
            return;
        }
        if(mousePos.x>=pauseButtonX && mousePos.x<=(pauseButtonX+sizeTile) && mousePos.y>=buttonY && mousePos.y<=(buttonY+sizeTile)){
            canvas.hidden=true;
            state=0;
            pause=1;
            if(soundsOn)pauseSound.play();
            renderPauseScreen();
            return;
        }
    }
}, false);

