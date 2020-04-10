class Projectile{
    constructor(x, y,size,identity)
    {
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.speed = 1;
        this.rotation = 0;
        this.damage=0;
        this.identity=identity;
        this.matchAsset();
    }
    
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Projectile/projectile1.png"; this.speed=15; this.damage=10; break;
            case 1: this.image.src="./Assets/Projectile/projectile2.png"; this.speed=30; this.damage=30;break;
            case 2: this.image.src="./Assets/Projectile/projectile3.png"; this.speed=45; this.damage=100;break;
        }
    }
    acquireEnemy(objectX,objectY,delta){
        
        var toObjectX = objectX - this.x;
        var toObjectY = objectY - this.y;
        this.rotation = Math.atan2(toObjectY, toObjectX);
    
        // Normalize
        var toObjectLength = Math.sqrt(toObjectX * toObjectX + toObjectY * toObjectY);
        toObjectX = toObjectX / toObjectLength;
        toObjectY = toObjectY / toObjectLength;
    
        // Move towards the player
        this.x += (toObjectX * this.speed*delta);
        this.y += (toObjectY * this.speed*delta);
    

        if(toObjectLength<this.size/2){return 1;}
        else{
            context.save();
            context.translate(this.x+this.size/2,this.y+this.size/2);
            context.rotate(this.rotation+(90*Math.PI/180));
            context.drawImage(this.image,this.size/-2, this.size/-2);
            context.restore();
            return 0;
        }
    }

}