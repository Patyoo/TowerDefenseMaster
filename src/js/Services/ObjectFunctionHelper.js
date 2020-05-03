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
