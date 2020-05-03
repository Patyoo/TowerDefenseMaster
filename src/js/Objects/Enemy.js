class Enemy{
    constructor(x, y,size,identity){
        this.x = x;
        this.y = y;
        this.size=size;
        this.image = new Image;
        this.image.src="";
        this.speed = 5;
        this.identity=identity;
        this.health;
        this.reward;
        this.virtualHealth;
        this.direction; //0up 1down 2left 3right
        this.punishment=this.identity+1;
    }
    matchAsset(){
        switch(this.identity){
            case 0: this.image.src="./Assets/Enemy/blackCircle.png";this.health=10;this.virtualHealth=this.health;this.reward=5;break;
            case 1: this.image.src="./Assets/Enemy/blackSquare.png";this.health=15;this.virtualHealth=this.health;this.reward=8;break;
            case 2: this.image.src="./Assets/Enemy/blackTriangle.png";this.health=20;this.virtualHealth=this.health;this.reward=10;break;
            case 3: this.image.src="./Assets/Enemy/whiteCircle.png";this.health=30;this.virtualHealth=this.health;this.reward=15;break;
            case 4: this.image.src="./Assets/Enemy/whiteSquare.png";this.health=45;this.virtualHealth=this.health;this.reward=23;break;
            case 5: this.image.src="./Assets/Enemy/whiteTriangle.png";this.health=60;this.virtualHealth=this.health;this.reward=30;break;
            case 6: this.image.src="./Assets/Enemy/redCircle.png"; this.health=100;this.virtualHealth=this.health;this.reward=50;break;
            case 7: this.image.src="./Assets/Enemy/redSquare.png";this.health=125;this.virtualHealth=this.health;this.reward=63;break;
            case 8: this.image.src="./Assets/Enemy/redTriangle.png";this.health=150;this.virtualHealth=this.health;this.reward=75;break;
        }
    }
    move(){
        if(this.x==1200) return 0;

        if( maps[mapChoice][parseInt((this.y-100)/50)][parseInt((this.x+this.size+this.speed-1)/50)] == 2 && (Math.ceil(((this.y-100-sizeTile+1)/50)) == (this.y-100)/50) && this.direction!=2 ){
            this.x+=(this.speed);
            this.direction=3;
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
            return 1; 
        }

        if(maps[mapChoice][parseInt((this.y-100)/50)][parseInt((this.x-this.speed+1)/50)] == 2 &&  (Math.ceil(((this.y-100-sizeTile+1)/50)) == (this.y-100)/50) && this.x!=0 && this.direction!=3 ){
            this.x-=(this.speed);
            this.direction=2;
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
            return 1; 
        }

        if(maps[mapChoice][parseInt((this.y-100+this.size+this.speed-1)/50)][parseInt(this.x/50)] == 2 && (Math.ceil(((this.x-sizeTile+1)/50)) == (this.x)/50) && this.direction!=0 ){
            this.y+=(this.speed);
            this.direction=1;
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
            return 1;
        }
 
        if(maps[mapChoice][parseInt((this.y-100-this.speed+1)/50)][parseInt(this.x/50)] == 2  && (Math.ceil(((this.x-sizeTile+1)/50)) == (this.x)/50) && this.direction!=1 && this.y-100!=0){
            this.y-=(this.speed);
            this.direction=0;
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
            return 1;
        }
    }
}   