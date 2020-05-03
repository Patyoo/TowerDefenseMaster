class Animation{
    constructor(x, y,size,identity){
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.identity=identity;
        this.matchAsset();
        this.limit=250;
    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Animations/plusIcon.png"; break;
            case 1: this.image.src="./Assets/Animations/coin.png"; break;
        }
    }
    move(){
            context.drawImage(this.image, this.x, this.y--, this.size, this.size);
            this.limit-=5;
    }
}