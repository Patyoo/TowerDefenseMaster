class Turent{
    constructor(x, y,size,identity,target){
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.identity=identity;
        this.rotation = 0;
        this.price;
        this.target=target;
        this.projectileSpeed;
        this.projectileDamage;
        this.range;
        this.shooting=0;
        this.reloadTime;
        this.radiusShownTime=60;
        this.turrentTick=0;
    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Turent/turent1.png";this.projectileSpeed=50;this.price=50;this.projectileDamage=10;this.range=150;this.reloadTime=50;break;
            case 1: this.image.src="./Assets/Turent/turent2.png";this.projectileSpeed=75;this.price=100;this.projectileDamage=20;this.range=200;this.reloadTime=40;break;
            case 2: this.image.src="./Assets/Turent/turent3.png";this.projectileSpeed=100;this.price=150;this.projectileDamage=30;this.range=250;this.reloadTime=30;break;
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
    }
    drawRadius(){
        this.turrentTick+=1;
        context.save();
        context.beginPath();
        context.arc(this.x+(this.size/2),this.y+(this.size/2), this.range, 0, 2 * Math.PI, false);
        context.lineWidth = 5;
        if(this.turrentTick % 10)context.strokeStyle = "white";
        else context.strokeStyle = "black";
        context.stroke();
        context.restore();
    }
}