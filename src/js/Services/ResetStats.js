function resetGameStats(){
    health=20;
    money=100;
    moneyGained=0;
    wave=1;
    towersBuild=0;
    enemiesKilled=0;
    score=0;
    map=[];
    enemies=[];
    towers=[];
    projectiles=[];
    animations=[];
    tick=0;
    enemiesLeft=numOfEnemies[wave];
    checkTick=0;
    enemyReleased=0;
    
    for(var i=0;i<maps[mapChoice].length;i++){
        for(var j=0;j<maps[mapChoice][0].length;j++) if(maps[mapChoice][i][j]>9) maps[mapChoice][i][j]=0;
    }
}