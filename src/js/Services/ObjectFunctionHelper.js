function getDistance(objectX,objectY,towerX,towerY){
    var toObjectX = objectX - towerX;
    var toObjectY = objectY - towerY;
    return Math.sqrt(toObjectX * toObjectX + toObjectY * toObjectY);
}
function getMinIndex(array,towers){
    var min=5000;
    var index=-1;
    for(var i=0;i<array.length;i++){
        if(array[i]<min && towers[i].shooting==0){
            index=i;
            min=array[i];
        }
    }
    return index;
}
function findStartPosition(){
    for(var i=0;i<maps[mapChoice].length;i++)
        for(var j=0;j<maps[mapChoice][0].length;j++)
            if(maps[mapChoice][i][j] == 2) return [i,j];
}
function getTower(posXMap,posYMap){
    for(var i=0;i<towers.length;i++) if(towers[i].x == posXMap && towers[i].y==posYMap) return towers[i];
}