function renderEndScreen(){
    var main = document.createElement("div");
    main.className="flex-container";

    var textDiv=document.createElement("div");
    textDiv.className="textDiv";
    textDiv.textContent="You have lost!";

    var RestartDiv=document.createElement("div");
    RestartDiv.className="clickDiv";
    RestartDiv.textContent="Restart";
    RestartDiv.addEventListener("click",function(){
        main.remove();
        if(soundsOn) menuSelectSound.play();
        canvas.hidden=false;
        state=1;
        generateMap();
        mainLoop();
        
    });

    var menuDiv=document.createElement("div");
    menuDiv.className="clickDiv";
    menuDiv.textContent="Menu";
    menuDiv.addEventListener("click",function(){
        main.remove();
        if(soundsOn) menuSelectSound.play();
        renderMenuScreen();
      
    });

    main.appendChild(textDiv);
    main.appendChild(RestartDiv);
    main.appendChild(menuDiv);

    document.body.appendChild(main);
    
    }