class Tile{
    constructor(x, y,size,identity){
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.identity=identity;
        this.matchAsset();
    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Tile/tileBuild.png"; break;
            case 1: this.image.src="./Assets/Tile/tileDestination.png"; break;
            case 2: this.image.src="./Assets/Tile/tileRoad.png"; break;
        }
    }
    create(){
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}