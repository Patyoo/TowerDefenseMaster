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
        this.sheetWidth=0;

    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Animations/explosion.png"; break;
        }
    }
    move(){
            context.drawImage(this.image,this.sheetWidth,0,this.size,this.size,this.x,this.y,this.size,this.size);
            this.limit-=5;
            if(this.limit==60 || this.limit==30) this.sheetWidth+=50;
    }
}