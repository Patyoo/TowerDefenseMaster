
function checkEndOfWave(){
    if(enemiesLeft==0 && checkTick==0) checkTick=tick+200;
    if(checkTick==tick) nextLevel();
}
function nextLevel() {
    tick=0;
    enemiesLeft=numOfEnemies[wave];
    wave++;
    checkTick=0;
    enemyReleased=0;
    if(wave==numOfEnemies.length+1){
    canvas.hidden=true;
    state=0;
    saveToStorage();
    renderWinScreen();
    resetGameStats();
    }
}
