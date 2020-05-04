class StaticImages{
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
            case 0: this.image.src="./Assets/hearth.png";break;
            case 1: this.image.src="./Assets/money.png";break;
            case 2: this.image.src="./Assets/musicOnButton.png";break;
            case 3: this.image.src="./Assets/musicOffButton.png";break;
            case 4: this.image.src="./Assets/soundOnButton.png";break;
            case 5: this.image.src="./Assets/soundOffButton.png";break;
            case 6: this.image.src="./Assets/pauseButton.png";break;
        }
    }
    create(){
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}