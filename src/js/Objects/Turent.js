class Turent
{
    constructor(x, y,size,identity)
    {
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.identity=identity;
        this.rotation = 0;
        this.price=0;
        this.matchAsset();
    }

    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Turent/turent1.png"; this.price=50;break;
            case 1: this.image.src="./Assets/Turent/turent2.png"; this.price=250;break;
            case 2: this.image.src="./Assets/Turent/turent3.png"; this.price=1000;break;
        }
    }
    setRotation(objectX,objectY){

        var toObjectX = objectX - this.x;
        var toObjectY = objectY - this.y;
        this.rotation = Math.atan2(toObjectY, toObjectX);

         context.save();
            context.translate(this.x+this.size/2,this.y+this.size/2);
            context.rotate(this.rotation+(90*Math.PI/180));
            context.drawImage(this.image,this.size/-2, this.size/-2);
            context.restore();
            //context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}