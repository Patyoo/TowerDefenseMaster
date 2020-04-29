class Projectile{
    constructor(x, y,size,identity,target,projectileSpeed,projectileDamage)
    {
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.projectileSpeed=projectileSpeed;
        this.projectileDamage=projectileDamage;
        this.rotation=0;
        this.identity=identity;
        this.target=target;
        this.matchAsset();
    }
    
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Projectile/projectile1.png";break;
            case 1: this.image.src="./Assets/Projectile/projectile2.png";break;
            case 2: this.image.src="./Assets/Projectile/projectile3.png";break;
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
        this.x += (toObjectX * this.projectileSpeed*delta);
        this.y += (toObjectY * this.projectileSpeed*delta);
    

        if(toObjectLength<this.size/2) return 1;
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