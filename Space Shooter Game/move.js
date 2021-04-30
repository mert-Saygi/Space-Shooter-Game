var square = document.getElementById('square');
square.setAttribute('draggable', false);
var scoreboard = document.getElementById('scoreboard');
var levelScore = document.getElementById('level');
var startButton = document.getElementById('start');
var x = 0; //alien ID counter
var score = 0;
var alienSpeed = 1500; //alien spawn speed control
var level = 0; // game level -1
var alive = true;
var leaderBoard = localStorage.getItem('scoreboard');
var highScore = document.getElementById('leaderboard');
highScore.innerHTML = "High Score: " + leaderBoard;
var enemy; //who are the aliens?
var bossMan; //who is the boss?
var missileView; //whose lasers are firing
var laserView; // whose lasers are firing
var b = 0; // burst counter
var bossPoint = 0; //boss ID counter
var rebels = 0; //allignment fixers
var bossHP = 5;
var myHP = 3;
var mymove;
var topM;
var leftM;

//boom sound
var boomSound = document.createElement('audio');
boomSound.src = 'boom.mp3';
boomSound.setAttribute("controls", "none");
boomSound.style.display = "none";
boomSound.volume = 0.4;
document.body.appendChild(boomSound);

//pew sound
var pewSound = document.createElement('audio');
pewSound.src = 'laser.mp3';
pewSound.setAttribute("controls", "none");
pewSound.style.display = "none";
pewSound.volume = 0.2;
document.body.appendChild(pewSound);

//game over sound
var gameOver = document.createElement('audio');
gameOver.src = 'over.mp3';
gameOver.setAttribute("controls", "none");
gameOver.style.display = "none";
gameOver.volume = 0.2;
document.body.appendChild(gameOver);

//background music
var backgroundMusic = document.createElement('audio');
backgroundMusic.src = 'background_music.mp3';
backgroundMusic.setAttribute("controls", "none");
backgroundMusic.style.display = "none";
backgroundMusic.volume = 0.15;
document.body.appendChild(backgroundMusic);

//laser sound
var laserSound = document.createElement('audio');
laserSound.src = 'pew.mp3';
laserSound.setAttribute("controls", "none");
laserSound.style.display = "none";
laserSound.volume = 0.2;
document.body.appendChild(laserSound);

//saberOn pewSound
var saberOn = document.createElement('audio');
saberOn.src = 'SaberOn.mp3';
saberOn.setAttribute("controls", "none");
saberOn.style.display = "none";
saberOn.volume = 0.2;
saberOn.currentTime = 0.5;
document.body.appendChild(saberOn);



//team selection for rebels
function rebelSelection(){
  document.getElementById('rebels').src = 'rebels.png';
  document.getElementById('empire').src = 'notEmpire.png';
  square.src = 'ship.png';
  enemy = 'alien.png';
  bossMan = 'empirBoss.png';
  backgroundMusic.currentTime=0;
  missileView = 'missile.png';
  laserView = 'laser.png';
  rebels = 0;
  saberOn.load();
  saberOn.play();
  startButton.addEventListener('click', function(){
    startGame()
  });
}

//team selection for empire
function empireSelection(){
  document.getElementById('rebels').src = 'notRebel.png';
  document.getElementById('empire').src = 'empire.png';
  enemy = 'reverseShip.png';
  square.src = 'alien.png';
  bossMan = 'rebelBoss.png';
  missileView = 'laser.png';
  laserView = 'missile.png';
  rebels = 3;
  saberOn.load();
  saberOn.play();
  backgroundMusic.currentTime=76.5;
  startButton.addEventListener('click', function(){
    startGame()
  });

}


//start button pressed
function startGame(){
  //change the view && start the music
  document.body.removeChild(document.getElementById('teamPick'));
  document.body.removeChild(document.getElementById('rebels'));
  document.body.removeChild(document.getElementById('empire'));
  levelScore.style.visibility = 'visible';
  levelScore.style.height = 'auto';
  square.style.visibility = 'visible';
  highScore.style.visibility = 'hidden';
  document.body.removeChild(startButton);
  document.body.style.cursor = 'none';
  backgroundMusic.play();

  //hide level display
  setTimeout(function(){
    levelScore.style.visibility = 'hidden';
  }, 2500);
  //have jet follow your mouse
  window.addEventListener("mousemove", function(event){
    //move the jet only if it is alive
    if (alive == true){

      square.style.top = String(event.y-50) + "px";
      square.style.left = String(event.x-50)+"px";
      //see if jet collides with aliens
      var alienColl = document.getElementsByClassName('alien');
      //get every alien specifically
      for(var i = 0; i<alienColl.length; i++){
        alienPos = alienColl[i];
      //check collision for each alien
        if (square.x < alienPos.x + alienPos.width-30 &&
            square.x + square.width-30 > alienPos.x &&
            square.y < alienPos.y + alienPos.height-30 &&
            square.y + square.height-30 > alienPos.y &&
          alive == true) {


            //explosion if collides
              var explosion = document.createElement("img");
              explosion.src = 'explosion.gif'+'?a='+Math.random();
              explosion.classList.add("explosion");
              document.body.appendChild(explosion);
              explosion.style.top = square.style.top;
              explosion.style.left = square.style.left;
              explosion.style.height = '100px';
              explosion.style.width = '100px';
              setTimeout(function(){
                document.body.removeChild(explosion);
              },700);
              boomSound.load();
              boomSound.play();
              backgroundMusic.pause();
              setTimeout(function(){
              gameOver.load();
              gameOver.play();
            }, 400);

              //kill jet
              square.style.left = '-200px';
              document.body.removeChild(square);
              alive = false;
              document.body.style.cursor = 'auto';

            setTimeout(function(){
              //clear the game after dela
              document.body.innerHTML = "";
              //game over message
              var gameOver = document.createElement('h1');
              gameOver.innerHTML = "Game over"
              gameOver.style.color = 'red';
              if(score > leaderBoard) {
                localStorage.setItem('scoreboard', score);
              }
              //restart button
              document.body.appendChild(gameOver);
              var restart = document.createElement('h1');
              restart.innerHTML = "Restart";
              restart.classList.add('restart');
              restart.addEventListener("click", function(){
                location.reload()
              });
              document.body.appendChild(restart);
              var finalScore = document.createElement('h1');
              finalScore.innerHTML = "Final Score: "+ score;
              finalScore.classList.add('finalScore');
              document.body.appendChild(finalScore);
            },2000);

            }
      }

      var bossColl = document.getElementsByClassName('boss');
      //get every alien specifically
      for(var g = 0; g<bossColl.length; g++){
        bossPos = bossColl[g];
      //check collision for each alien
        if (square.x < bossPos.x + bossPos.width-30 &&
            square.x + square.width-30 > bossPos.x &&
            square.y < bossPos.y + bossPos.height-30 &&
            square.y + square.height-30 > bossPos.y &&
          alive == true) {

            //explosion if collides
              var explosion = document.createElement("img");
              explosion.src = 'explosion.gif'+'?a='+Math.random();
              explosion.classList.add("bigExplosion");
              document.body.appendChild(explosion);
              explosion.style.top = square.style.top;
              explosion.style.left = square.style.left;
              setTimeout(function(){
                document.body.removeChild(explosion);
              },700);
              boomSound.load();
              boomSound.play();
              backgroundMusic.pause();
              setTimeout(function(){
              gameOver.load();
              gameOver.play();
            }, 400);

              //kill jet
              square.style.left = '-200px';
              bossPos.style.left = '-100px';
              bossPos.style.width = '10px';
              document.body.removeChild(square);
              alive = false;
              document.body.style.cursor = 'auto';

            setTimeout(function(){
              //clear the game after dela
              document.body.innerHTML = "";
              //game over message
              var gameOver = document.createElement('h1');
              gameOver.innerHTML = "Game over"
              gameOver.style.color = 'red';
              if(score > leaderBoard) {
                localStorage.setItem('scoreboard', score);
              }
              //restart button
              document.body.appendChild(gameOver);
              var restart = document.createElement('h1');
              restart.innerHTML = "Restart";
              restart.classList.add('restart');
              restart.addEventListener("click", function(){
                location.reload()
              });
              document.body.appendChild(restart);
              var finalScore = document.createElement('h1');
              finalScore.innerHTML = "Final Score: "+ score;
              finalScore.classList.add('finalScore');
              document.body.appendChild(finalScore);
            },2000);

            }
      }

    }
  });
  //fire a missle
  window.addEventListener("mousedown", function(event){
      if(alive==false){
        return;
      }
      //create the missle
      var missile = document.createElement("img");
      missile.setAttribute('draggable', false);
      missile.src = missileView;
      missile.classList.add("missile");
      document.body.appendChild(missile);
      pewSound.load();
      pewSound.play();
      //set the starting location of the missle
      missile.style.top = String(event.y-45)+"px";
      missile.style.left = String(event.x-10+rebels)+"px";

      //move missle
      function moveMissile(){
        setTimeout(function(){
          //move missle up by 5 pixels
          missile.style.top = String(parseInt(missile.style.top)-5)+"px";

          //array of aliens to check collision
          var alienColl = document.getElementsByClassName('alien');
          //get every alien specifically
          for(var i = 0; i<alienColl.length; i++){
            alienPos = alienColl[i];
          //check collision for each alien
            if (missile.x < alienPos.x + alienPos.width &&
                missile.x + missile.width > alienPos.x &&
                missile.y < alienPos.y + alienPos.height &&
                missile.y + missile.height > alienPos.y) {

                  //chose the alien that was hit
                  var alienSpec = document.getElementById('alien'+String(i));

                  //Create explosion
                  var explosion = document.createElement("img");
                  explosion.src = 'explosion.gif'+'?a='+Math.random();
                  explosion.classList.add("explosion");
                  document.body.appendChild(explosion);
                  explosion.style.top = alienSpec.style.top;
                  explosion.style.left = alienSpec.style.left;
                  setTimeout(function(){
                    document.body.removeChild(explosion);
                  },700);
                  boomSound.load();
                  boomSound.play();

                  //"kill" alien and remove missile
                  alienSpec.style.left = "-100px";
                  document.body.removeChild(missile);

                  //change score
                  score = score + 20;
                  scoreboard.innerHTML = "Score: "+ String(score);

                  //level up based on score
                  if (score % 300 == 0){
                    level++;
                    levelScore.innerHTML = "Level " + String(level+1);
                    levelScore.style.visibility = 'visible';
                    alienSpawn();
                    setTimeout(function(){
                      levelScore.style.visibility = 'hidden';
                    }, 2400);
                    alienSpeed = alienSpeed / 1.15;
                  }

                  //stop missle from moving
                  return;
                }
          }

          var bossColl = document.getElementsByClassName('boss');
          //get every alien specifically
          for(var g = 0; g<bossColl.length; g++){
            bossPos = bossColl[g];
          //check collision for each alien
            if (missile.x < bossPos.x + bossPos.width &&
                missile.x + missile.width > bossPos.x &&
                missile.y < bossPos.y + bossPos.height &&
                missile.y + missile.height > bossPos.y) {

                  //chose the alien that was hit
                  var bossSpec = document.getElementById('boss'+String(g));
                  if ( bossHP > 0) {
                    bossPos.src = bossMan.substring(0,9)+bossHP+".png";
                    bossHP=bossHP -1;
                    document.body.removeChild(missile);
                    bossSpec.style.top = String(Math.random()*170+25)+"px";
                    bossSpec.style.left = String(Math.random()*1250+25)+"px";
                    leftM = (Math.random()-0.5)*8;
                    topM = (Math.random()-0.5)*8;
                    console.log(topM);
                    return;
                } else {
                  clearInterval(mymove);
                  //Create explosion
                  var explosion = document.createElement("img");
                  explosion.src = 'explosion.gif'+'?a='+Math.random();
                  explosion.classList.add("bigExplosion");
                  document.body.appendChild(explosion);
                  explosion.style.top = bossSpec.style.top;
                  explosion.style.left = bossSpec.style.left;
                  setTimeout(function(){
                    document.body.removeChild(explosion);
                  },700);
                  boomSound.load();
                  boomSound.play();

                  //"kill" alien and remove missile
                  bossSpec.style.left = "-100px";
                  bossSpec.style.width = "10px";
                  document.body.removeChild(missile);

                  //change score
                  score = score + 80;
                  scoreboard.innerHTML = "Score: "+ String(score);
                  //level up based on score
                  if (score % 300 == 0){
                    level++;
                    levelScore.innerHTML = "Level " + String(level+1);
                    levelScore.style.visibility = 'visible';
                    setTimeout(function(){
                      levelScore.style.visibility = 'hidden';
                    }, 2500);
                    alienSpeed = alienSpeed / 1.15;
                  }
                  alienSpawn();
                  //stop missle from moving
                  return;
                }

                }
          }
          //move the missile until it reaches the top of the screen
          if (parseInt(missile.style.top) > 0){
            moveMissile();
          }
          else {
            document.body.removeChild(missile);
            return;
          }
        },10)
      }
      moveMissile();
  });
  function burst(alien){
    if(b < 4){
      setTimeout(function(){
        //check if game is still going on
        if (alive == true){
          //check if alien is alive
          if(parseInt(alien.style.left) < 0){
            return;
          }
          //create laser
          var laser = document.createElement("img");
          laser.src = laserView;
          laser.classList.add("laser");
          document.body.appendChild(laser);
          laserSound.load();
          laserSound.play();
          //set the starting location of the missle
          laser.style.top = String(alien.y+85)+"px";
          laser.style.left = String(alien.x+75)+"px";

          function moveLaser(){
            //move laser
            setTimeout(function(){
              laser.style.top = String(parseInt(laser.style.top)+5)+"px";
              //check if laser hits jet
              if(laser.x < square.x + square.width-17 &&
                  laser.x + laser.width-20 > square.x &&
                  laser.y < square.y + square.height-17 &&
                  laser.y + laser.height-20 > square.y){

                    //create explosion when hit
                    var explosion = document.createElement("img");
                    explosion.src = 'explosion.gif'+'?a='+Math.random();
                    explosion.classList.add("explosion");
                    document.body.appendChild(explosion);
                    explosion.style.top = square.style.top;
                    explosion.style.left = square.style.left;
                    explosion.style.height = '100px';
                    explosion.style.width = '100px';
                    document.body.removeChild(laser);
                    setTimeout(function(){
                      document.body.removeChild(explosion);
                    },700);
                    boomSound.load();
                    boomSound.play();
                    backgroundMusic.pause();
                    setTimeout(function(){
                    gameOver.load();
                    gameOver.play();
                  }, 400);
                    //kill jet
                    square.style.left = '-200px';
                    laser.style.left = '-100px';
                    alive = false;
                    document.body.style.cursor = 'auto';

                  setTimeout(function(){
                    //clear the game after delay
                    document.body.innerHTML = "";
                    //game over message
                    var gameOver = document.createElement('h1');
                    gameOver.innerHTML = "Game over"
                    gameOver.style.color = 'red';
                    document.body.appendChild(gameOver);
                    if(score > leaderBoard) {
                      localStorage.setItem('scoreboard', score);
                    }
                    //restart button
                    var restart = document.createElement('h1');
                    restart.classList.add('restart');
                    restart.innerHTML = "Restart";
                    restart.addEventListener("click", function(){
                      location.reload()
                    });
                    document.body.appendChild(restart);
                    var finalScore = document.createElement('h1');
                    finalScore.innerHTML = "Final Score: "+ score;
                    finalScore.classList.add('finalScore');
                    document.body.appendChild(finalScore);
                  },2000);

                }
                //delete laser after leaving screen
                if(parseInt(laser.style.top)> 720){
                  document.body.removeChild(laser);
                  return;
                }
              moveLaser();
            },15);
          }
          moveLaser();
          burst(alien);

        } else {
          //if jet is dead, end the lasers
          return;
        }
        b = b+1;
      }, 150);
    } else {

      bossFireBack(alien);
    }
  }
  function bossFireBack(alien){
    setTimeout(function(){
      b = 0;
      burst(alien);
    }, Math.random()*1800+200)

}
  function fireBack(alien){

  setTimeout(function(){
    //check if game is still going on
    if (alive == true){
      //check if alien is alive
      if(parseInt(alien.style.left) < 0){
        return;
      }
      //create laser
      var laser = document.createElement("img");
      laser.src = laserView;
      laser.classList.add("laser");
      document.body.appendChild(laser);
      laserSound.load();
      laserSound.play();
      //set the starting location of the missle
      laser.style.top = String(alien.y+45)+"px";
      laser.style.left = String(alien.x+28)+"px";

      function moveLaser(){
        //move laser
        setTimeout(function(){
          laser.style.top = String(parseInt(laser.style.top)+5)+"px";
          //check if laser hits jet
          if(laser.x < square.x + square.width-17 &&
              laser.x + laser.width-20 > square.x &&
              laser.y < square.y + square.height-17 &&
              laser.y + laser.height-20 > square.y){


                //create explosion when hit
                var explosion = document.createElement("img");
                explosion.src = 'explosion.gif'+'?a='+Math.random();
                explosion.classList.add("explosion");
                document.body.appendChild(explosion);
                explosion.style.top = square.style.top;
                explosion.style.left = square.style.left;
                explosion.style.height = '100px';
                explosion.style.width = '100px';
                document.body.removeChild(laser);
                setTimeout(function(){
                  document.body.removeChild(explosion);
                },700);
                boomSound.load();
                boomSound.play();
                backgroundMusic.pause();
                setTimeout(function(){
                gameOver.load();
                gameOver.play();
              }, 400);

                //kill jet
                square.style.left = '-200px';
                laser.style.left = '-100px';
                alive = false;
                document.body.style.cursor = 'auto';

              setTimeout(function(){
                //clear the game after delay
                document.body.innerHTML = "";
                //game over message
                var gameOver = document.createElement('h1');
                gameOver.innerHTML = "Game over"
                gameOver.style.color = 'red';
                document.body.appendChild(gameOver);
                if(score > leaderBoard) {
                  localStorage.setItem('scoreboard', score);
                }
                //restart button
                var restart = document.createElement('h1');
                restart.innerHTML = "Restart"
                restart.classList.add('restart');
                restart.addEventListener("click", function(){
                  location.reload()
                });
                document.body.appendChild(restart);
                var finalScore = document.createElement('h1');
                finalScore.innerHTML = "Final Score: "+ score;
                finalScore.classList.add('finalScore');
                document.body.appendChild(finalScore);
              },2000);

            }
            //delete laser after leaving screen
            if(parseInt(laser.style.top)> 800){
              document.body.removeChild(laser);
              return;
            }
          moveLaser();
        },15);
      }
      moveLaser();
      fireBack(alien);

    } else {
      //if jet is dead, end the lasers
      return;
    }

  }, Math.random()*3500+200)

}
  //Create randomly spawning aliens
  function alienSpawn(){
      //at 220 points, stop spawning the aliens and spawn the boss
      if((20*x + (level+1)*80) % 300 == 0){
        var bossColl = document.getElementsByClassName('boss');
        if (bossColl.length == (level+1)){
          return;
        }
        setTimeout(function(){
        var bossEnemy = document.createElement("img");
        bossEnemy.src = bossMan;
        bossEnemy.classList.add('boss');
        bossEnemy.id = "boss"+String(bossPoint);
        bossPoint++;
        document.body.appendChild(bossEnemy);
        bossEnemy.style.top = String(Math.random()*170+25)+"px";
        bossEnemy.style.left = String(Math.random()*1250+25)+"px";
        bossHP = 5;
        leftM = (Math.random()-0.5)*8;
        topM = (Math.random()-0.5)*8;
        function moveIt(){
          bossEnemy.style.top = parseInt(bossEnemy.style.top) + topM+'px';
          bossEnemy.style.left = parseInt(bossEnemy.style.left) + leftM+'px';
          if (parseInt(bossEnemy.style.top) > 250){
            topM = -topM;
          } else if (parseInt(bossEnemy.style.top) < 0){
            topM = -topM;
          }
          if (parseInt(bossEnemy.style.left) > 1275){
            leftM = -leftM;
          } else if (parseInt(bossEnemy.style.left) < 0){
            leftM = -leftM;
          }
        }
        mymove = setInterval(moveIt, 20);
        bossFireBack(bossEnemy);
        },Math.random()*alienSpeed+500);
        return;
      }
        setTimeout(function(){
          //check if game is going on
          if (alive == true){
          //create the alien
          var alien = document.createElement("img");
          alien.src = enemy;
          alien.classList.add('alien');
          //give alien a unique id
          alien.id = "alien"+String(x);
          x++;
          document.body.appendChild(alien);

          //give it a random position
          alien.style.top = String(Math.random()*170+150)+"px";
          alien.style.left = String(Math.random()*1250+50)+"px";

          //alien fires
          fireBack (alien);

          alienSpawn();
        } else {
          return;
        }
        },Math.random()*alienSpeed+500)

    }
  alienSpawn();
}
