function renderMapScreen(){

    main = document.createElement("div");
    main.className="flex-container";

    var MapLabel = document.createElement("p");
    MapLabel.className="textP";
    MapLabel.textContent="Maps";

        var Mapdiv=document.createElement("div");
        Mapdiv.className="playerStatsDiv";

            var map1Div=document.createElement("div");
            map1Div.className="infoDiv";
            var button1 = document.createElement("BUTTON");
            button1.className="buttonMapStyle";
            button1.innerHTML="Map1";
            button1.style.color="#20639B";
            button1.addEventListener("click",function(){
                mapChoice=0;
                button1.style.color="#20639B";
                button2.style.color="#006B38";
                button3.style.color="#006B38";
                if(soundsOn) menuSelectSound.play();
            });
                map1Div.appendChild(button1);   

            var map2Div=document.createElement("div");
            map2Div.className="infoDiv";
            var button2 = document.createElement("BUTTON");
            button2.className="buttonMapStyle";
            button2.innerHTML="Map2";
            button2.addEventListener("click",function(){
                mapChoice=1;
                button1.style.color="#006B38";
                button2.style.color="#20639B";
                button3.style.color="#006B38";
                if(soundsOn) menuSelectSound.play();
            });
            map2Div.appendChild(button2);    
            
            var map3Div=document.createElement("div");
            map3Div.className="infoDiv";
            var button3 = document.createElement("BUTTON");
            button3.className="buttonMapStyle";
            button3.innerHTML="Map3";
            button3.addEventListener("click",function(){
                mapChoice=2;
                if(soundsOn) menuSelectSound.play();
                button1.style.color="#006B38";
                button2.style.color="#006B38";
                button3.style.color="#20639B";
            });
            map3Div.appendChild(button3);    

            Mapdiv.appendChild(map1Div);
            Mapdiv.appendChild(map2Div);
            Mapdiv.appendChild(map3Div);

            var DiffucultyLabel = document.createElement("p");
            DiffucultyLabel.className="textP";
            DiffucultyLabel.textContent="Diffuculty";

            var DifficultyDiv=document.createElement("div");
            DifficultyDiv.className="playerStatsDiv";
    
                var EasyDiv=document.createElement("div");
                EasyDiv.className="infoDiv";
                var button4 = document.createElement("BUTTON");
                button4.className="buttonMapStyle";
                button4.innerHTML="Easy";
                button4.style.color="#20639B";
                button4.addEventListener("click",function(){
                    diffucultyChoice=0;
                    button4.style.color="#20639B";
                    button5.style.color="#006B38";
                    button6.style.color="#006B38";
                    if(soundsOn) menuSelectSound.play();
                });
                EasyDiv.appendChild(button4);   
    
                var MediumDiv=document.createElement("div");
                MediumDiv.className="infoDiv";
                var button5 = document.createElement("BUTTON");
                button5.className="buttonMapStyle";
                button5.innerHTML="Medium";
                button5.addEventListener("click",function(){
                    diffucultyChoice=1;
                    if(soundsOn) menuSelectSound.play();
                    button4.style.color="#006B38";
                    button5.style.color="#20639B";
                    button6.style.color="#006B38";
                });
                MediumDiv.appendChild(button5);    
                
                var HardDiv=document.createElement("div");
                HardDiv.className="infoDiv";
                var button6 = document.createElement("BUTTON");
                button6.className="buttonMapStyle";
                button6.innerHTML="Hard";
                button6.addEventListener("click",function(){
                    diffucultyChoice=2;
                    if(soundsOn) menuSelectSound.play();
                    button4.style.color="#006B38";
                    button5.style.color="#006B38";
                    button6.style.color="#20639B";
                });
                HardDiv.appendChild(button6);    

                DifficultyDiv.appendChild(EasyDiv);
                DifficultyDiv.appendChild(MediumDiv);
                DifficultyDiv.appendChild(HardDiv);
        
        var menuDiv=document.createElement("div");
        menuDiv.className="clickDiv";
        menuDiv.textContent="Start";
        menuDiv.addEventListener("click",function(){
                main.remove();
                canvas.hidden=false;
                state=1;
                if(musicOn) backgroundMusic.play();
                if(soundsOn) menuSelectSound.play();
               time=Date.now();
                generateMap();
                mainLoop();
                    });

    main.appendChild(MapLabel);
    main.appendChild(Mapdiv);
    main.appendChild(DiffucultyLabel);
    main.appendChild(DifficultyDiv);
    main.appendChild(menuDiv);
    document.body.appendChild(main);

    }