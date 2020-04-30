
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
var score=10;
var numOfEnemies=[5,10,15,20,25];
var enemiesLeft=numOfEnemies[wave-1];
var checkTick=0;
var enemyReleased=0;



function render(){
    drawMap();
    title();
    checkEndOfWave();
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
    context.fillText('Wave: '+wave+"/"+numOfEnemies.length, 450, 50);
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
    context.fillStyle = "black";
    context.fillRect(0, 0, 1250,700);
    map.forEach(element => element.create());
}

function generateEnemy(){    
    if(tick%(150-(diffucultyChoice*50))==0 && enemyReleased<numOfEnemies[wave-1]){
        var newEnemy=new Enemy(findStartPosition()[1]*sizeTile,findStartPosition()[0]*sizeTile+100,sizeTile, 
        Math.floor(Math.random()* (((2+(diffucultyChoice*3)+wave))%10) )  
        //0
       );
        newEnemy.matchAsset();
        enemies.push(newEnemy);
        enemyReleased++;
    }
    enemies.forEach(element => {
        if(!element.move()){
            health--;
            enemiesLeft--;
            enemies.splice(enemies.indexOf(element),1);
        }
    });
}

function getDistance(objectX,objectY,towerX,towerY){
    var toObjectX = objectX - towerX;
    var toObjectY = objectY - towerY;
    return Math.sqrt(toObjectX * toObjectX + toObjectY * toObjectY);
}



function shoot(delta){
    
         for(var i=0;i<projectiles.length;i++){
            if(projectiles[i].acquireEnemy(projectiles[i].target.x,projectiles[i].target.y,delta)==1){
                projectiles[i].target.virtualHealth-=projectiles[i].projectileDamage;
                if(projectiles[i].target.virtualHealth<=0){
                    enemiesLeft--;
                    money+= projectiles[i].target.reward;
                    moneyGained+= projectiles[i].target.reward;
                    if(soundsOn) enemyDeadSound.play();
                    enemies.splice(enemies.indexOf(projectiles[i].target),1);
                }
                projectiles.splice(i,1);
            }
         }

        if(tick%50==0){
            var temp;
            
                    towers.sort(function(a, b) {
                        return a.x - b.x;
                    });

                    for(temp=0;temp<enemies.length;temp++){
                        for(var j=0;j<towers.length;j++){

                            //urobit si lokalne pole,s tym ze dialka zodpoveda, priebezne sortit towery a zaroven pozerat ci uz nestrialaju


                            if(getDistance(enemies[temp].x,enemies[temp].y,towers[j].x,towers[j].y) <towers[j].range && enemies[temp].health>0){
                            var newProjectile=new Projectile(towers[j].x,towers[j].y,sizeTile,towers[j].identity,enemies[temp],towers[j].projectileSpeed,towers[j].projectileDamage);
                            towers[j].target=newProjectile;
                            projectiles.push(newProjectile);
                            console.log(newProjectile);
                            enemies[temp].health-=newProjectile.projectileDamage;
                            if(soundsOn) towerShotSound.play();
                            }
                        }
                    }
            }

    }

function generateTower(){
    var towerCounter=0;
   towers.forEach(element => {
        element.setRotation(element.target.x,element.target.y);
        towerCounter++;
        console.log("Prva pod");
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
        else backgroundMusic.stop();
        soundsOn=!soundsOn; 
    }
})
   


canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var posXMap =(mousePos.x-(mousePos.x%50));
    var posYMap= (mousePos.y-(mousePos.y%50));

    function getTower(){
        for(var i=0;i<towers.length;i++) if(towers[i].x == posXMap && towers[i].y==posYMap) return towers[i];
    }
    
    var newTurent=new Turent(posXMap,posYMap,sizeTile,choiceTower,0);
    newTurent.matchAsset();
    if(maps[mapChoice][(posYMap-100)/50][posXMap/50] == 0 && money-newTurent.price>=0){
        towers.push(newTurent);
        //newTurent.matchAsset();
        maps[mapChoice][(posYMap-100)/50][posXMap/50]=choiceTower+10;
        money-=newTurent.price;
        return;
    }

    
    var searchedTower=getTower();
    if(maps[mapChoice][(posYMap-100)/50][posXMap/50]>9 && money>=(searchedTower.price/2)){
        searchedTower.projectileSpeed+=(searchedTower.projectileSpeed/2);
        searchedTower.projectileDamage+=(searchedTower.projectileDamage/2);
        money-=searchedTower.price;
    }
    }, false);

