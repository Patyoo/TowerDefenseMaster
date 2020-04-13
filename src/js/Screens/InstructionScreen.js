function renderInstructionScreen(){
    main = document.createElement("div");
    main.className="flex-container";

    var textDiv=document.createElement("div");
    textDiv.className="textInstructionDiv";
    textDiv.textContent="The goal is to survive waves of enemy characters by protecting our base. This goal is achieved by building towers, whicha are shooting at enemies, thereby achieving their destruction. The user must survive the waves with the number of life points that are given to me at the start of the game. During the game, the player gains money by neutralizing the enemies, which he can then use to strenghten his towers.";

    var PlacingLabel = document.createElement("p");
    PlacingLabel.className="textP";
    PlacingLabel.textContent="Placing towers: Mouse(left click)";

    var SelectingLabel = document.createElement("p");
    SelectingLabel.className="textP";
    SelectingLabel.textContent="Selecting type of tower: NumKeys 1,2,3";

    var MuteLabel = document.createElement("p");
    MuteLabel.className="textP";
    MuteLabel.textContent="Mute/Unmute sounds and audio: M";

    var ResumeDiv=document.createElement("div");
    ResumeDiv.className="clickDiv";
    ResumeDiv.textContent="Continue";
    ResumeDiv.addEventListener("click",function(){
        main.remove();
        if(soundsOn) menuSelectSound.play();
        read=1;
        renderMapScreen();
        console.log(read);
    });

    

    main.appendChild(textDiv);
    main.appendChild(PlacingLabel);
    main.appendChild(SelectingLabel);
    main.appendChild(MuteLabel);
    main.appendChild(ResumeDiv);
    

    document.body.appendChild(main);
    
    }