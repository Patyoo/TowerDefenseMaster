function saveToStorage(){
    if(typeof(Storage) !== "undifined"){
    if(localStorage.games){
        localStorage.enemiesKilled= Number(localStorage.enemiesKilled)+enemiesKilled;
        localStorage.waves= Number(localStorage.waves)+wave;
        localStorage.moneyGained= Number(localStorage.moneyGained)+moneyGained;
        localStorage.towerBuild= Number(localStorage.towerBuild)+towersBuild;
        localStorage.games= Number(localStorage.games)+1;
        localStorage.score= Number(localStorage.score)+score;
    }
    else{
        localStorage.enemiesKilled=enemiesKilled;
        localStorage.waves=wave;
        localStorage.moneyGained=moneyGained;
        localStorage.towerBuild= towersBuild;
        localStorage.games=1;
        localStorage.score=score;
     }
    }
}

