class Explosion{
    constructor(x, y,size,identity){
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.identity=identity;
        this.matchAsset();
        this.limit=90;
    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Animations/explosion1.png"; break;
            case 1: this.image.src="./Assets/Animations/explosion2.png"; break;
            case 2: this.image.src="./Assets/Animations/explosion3.png"; break;
        }
    }
    move(){
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
            this.limit-=5;
            if(this.limit==30 || this.limit==60){
                this.identity+=1;
                this.matchAsset();
            }
    }
}