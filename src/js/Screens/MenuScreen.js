function renderMenuScreen(){
    main = document.createElement("div");
    main.className="flex-container";

    var logoDiv=document.createElement("div");
    logoDiv.className="logoDiv";
    var logo = document.createElement("IMG");
    logo.setAttribute("src", "./Assets/TDlogo.jpg");
    logo.className="logo";
    logoDiv.appendChild(logo);

    var startDiv=document.createElement("div");
    startDiv.className="clickDiv";
    startDiv.textContent="Start";

    var optionsDiv=document.createElement("div");
    optionsDiv.className="clickDiv";
    optionsDiv.textContent="Options";
    optionsDiv.addEventListener("click",function(){
     main.remove();
     if(soundsOn) menuSelectSound.play();
    renderOptionScreen();
    });

    var quitDiv=document.createElement("div");
    quitDiv.className="clickDiv";
    quitDiv.textContent="Quit";
    quitDiv.addEventListener("click",function(){    
        if(soundsOn) menuSelectSound.play();
        window.location.replace("https://www.fiit.stuba.sk");
    });

    main.appendChild(logoDiv);
    main.appendChild(startDiv); 
    main.appendChild(optionsDiv);
    main.appendChild(quitDiv);
    document.body.appendChild(main);

    startDiv.addEventListener("click",function(){
        main.remove();
        if(soundsOn) menuSelectSound.play();
        if(read==0) renderInstructionScreen();
        else{
            read=1;
           renderMapScreen();
        }
    });
}