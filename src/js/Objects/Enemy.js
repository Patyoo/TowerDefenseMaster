class Enemy{
    constructor(x, y,size,identity)
    {
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.speed = 10;
        this.identity=identity;
        this.health=0;
        this.reward=0;
        this.virtualHealth=0;
        this.matchAsset();
    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Enemy/blackCircle.png"; this.health=15; this.virtualHealth=health; this.reward=2; break;
            case 1: this.image.src="./Assets/Enemy/blackSquare.png"; this.health=15;  this.virtualHealth=health;this.reward=3; break;
            case 2: this.image.src="./Assets/Enemy/blackTriangle.png"; this.health=20; this.virtualHealth=health; this.reward=5; break;
            case 3: this.image.src="./Assets/Enemy/whiteCircle.png"; this.health=30; this.virtualHealth=health; this.reward=8; break;
            case 4: this.image.src="./Assets/Enemy/whiteSquare.png"; this.health=45; this.virtualHealth=health; this.reward=12; break;
            case 5: this.image.src="./Assets/Enemy/whiteTriangle.png"; this.health=60; this.virtualHealth=health; this.reward=15; break;
            case 6: this.image.src="./Assets/Enemy/redCircle.png"; this.health=100; this.virtualHealth=health; this.reward=25; break;
            case 7: this.image.src="./Assets/Enemy/redSquare.png"; this.health=125; this.virtualHealth=health; this.reward=35; break;
            case 8: this.image.src="./Assets/Enemy/redTriangle.png"; this.health=150; this.virtualHealth=health; this.reward=45; break;
        }
    }
    move(delta){
        if((this.x + this.size) >= 1250 || (this.x) < 0 ) this.speed *= -1;
        this.x += (this.speed*delta);

        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}