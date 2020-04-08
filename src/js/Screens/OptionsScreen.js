function renderOptionScreen(){

    main = document.createElement("div");
    main.className="flex-container";

    var Statisticsabel = document.createElement("p");
    Statisticsabel.className="textP";
    Statisticsabel.textContent="Statistics";

    var SettingsDiv=document.createElement("div");
        SettingsDiv.className="towerInfoDiv";

            var TowersLabel = document.createElement("p");
            TowersLabel.className="textPColumn";
            TowersLabel.textContent="Settings";

            var AudioDiv=document.createElement("div");
            AudioDiv.className="infoDivColumn";
                var button1 = document.createElement("BUTTON");
                button1.className="buttonStyle";
                button1.innerHTML= musicOn ? "OFF" : "ON";
                button1.addEventListener("click",function(){
                    musicOn=!musicOn;
                    button1.innerHTML= musicOn ? "OFF" : "ON";
                    if(soundsOn) menuSelectSound.play();
                });
                var AudioLabel = document.createElement("p");
                AudioLabel.className="textPColumn";
                AudioLabel.textContent="Audio";
            
                AudioDiv.appendChild(AudioLabel);
                AudioDiv.appendChild(button1);

                var SoundDiv=document.createElement("div");
                SoundDiv.className="infoDivColumn";
                    var button2 = document.createElement("BUTTON");
                    button2.className="buttonStyle";
                    button2.innerHTML= soundsOn ? "OFF" : "ON";
                    button2.addEventListener("click",function(){
                        soundsOn=!soundsOn;
                        button2.innerHTML= soundsOn ? "OFF" : "ON";
                        if(soundsOn) menuSelectSound.play();
                    });
                    var SoundLabel = document.createElement("p");
                    SoundLabel.className="textPColumn";
                    SoundLabel.textContent="Sounds";
                
                    SoundDiv.appendChild(SoundLabel);
                    SoundDiv.appendChild(button2);

        SettingsDiv.appendChild(TowersLabel); 
        SettingsDiv.appendChild(AudioDiv);
        SettingsDiv.appendChild(SoundDiv);

        var playerStatsDiv=document.createElement("div");
        playerStatsDiv.className="playerStatsDiv";

            var EnemyDiv=document.createElement("div");
            EnemyDiv.className="infoDiv";
                var EnemyLabel = document.createElement("p");
                EnemyLabel.className="textP";
                EnemyLabel.textContent="Enemies killed:";
                var enemyValue = document.createElement("p");
                enemyValue.className="textP";
                enemyValue.textContent= localStorage.enemiesKilled || 0;
                EnemyDiv.appendChild(EnemyLabel);
                EnemyDiv.appendChild(enemyValue);

            var WaveDiv=document.createElement("div");
            WaveDiv.className="infoDiv";
                var WaveLabel = document.createElement("p");
                WaveLabel.className="textP";
                WaveLabel.textContent="Wave played:";
                var WaveValue = document.createElement("p");
                WaveValue.className="textP";
                WaveValue.textContent=localStorage.waves || 0;
            WaveDiv.appendChild(WaveLabel);
            WaveDiv.appendChild(WaveValue);

            var MoneyDiv=document.createElement("div");
            MoneyDiv.className="infoDiv";
                var MoneyLabel = document.createElement("p");
                MoneyLabel.className="textP";
                MoneyLabel.textContent="Money gained:";
                var MoneyValue = document.createElement("p");
                MoneyValue.className="textP";
                MoneyValue.textContent=localStorage.moneyGained || 0;
            MoneyDiv.appendChild(MoneyLabel);
            MoneyDiv.appendChild(MoneyValue);

        playerStatsDiv.appendChild(EnemyDiv);
        playerStatsDiv.appendChild(WaveDiv);
        playerStatsDiv.appendChild(MoneyDiv);

        var playerStatsDiv1=document.createElement("div");
        playerStatsDiv1.className="playerStatsDiv";

            var TowerDiv=document.createElement("div");
            TowerDiv.className="infoDiv";
                var TowerLabel = document.createElement("p");
                TowerLabel.className="textP";
                TowerLabel.textContent="Towers built:";
                var TowerValue = document.createElement("p");
                TowerValue.className="textP";
                TowerValue.textContent= localStorage.towerBuild || 0;
                TowerDiv.appendChild(TowerLabel);
                TowerDiv.appendChild(TowerValue);

            var Gamesdiv=document.createElement("div");
            Gamesdiv.className="infoDiv";
                var GameLabel = document.createElement("p");
                GameLabel.className="textP";
                GameLabel.textContent="Games started:";
                var GameValue = document.createElement("p");
                GameValue.className="textP";
                GameValue.textContent=localStorage.games || 0;
                Gamesdiv.appendChild(GameLabel);
                Gamesdiv.appendChild(GameValue);

            var ScoreDiv=document.createElement("div");
            ScoreDiv.className="infoDiv";
                var ScoreLabel = document.createElement("p");
                ScoreLabel.className="textP";
                ScoreLabel.textContent="Absolute score:";
                var ScoreValue = document.createElement("p");
                ScoreValue.className="textP";
                ScoreValue.textContent=localStorage.score || 0;
                ScoreDiv.appendChild(ScoreLabel);
                ScoreDiv.appendChild(ScoreValue);

        playerStatsDiv1.appendChild(TowerDiv);
        playerStatsDiv1.appendChild(Gamesdiv);
        playerStatsDiv1.appendChild(ScoreDiv);
        
        var menuDiv=document.createElement("div");
        menuDiv.className="clickDiv";
        menuDiv.textContent="Menu";
        menuDiv.addEventListener("click",function(){
                main.remove();
                if(soundsOn) menuSelectSound.play();
                renderMenuScreen(); 
                    });

    main.appendChild(SettingsDiv);
    main.appendChild(Statisticsabel);
    main.appendChild(playerStatsDiv);
    main.appendChild(playerStatsDiv1);
    main.appendChild(menuDiv);
    document.body.appendChild(main);

    }