const bgMusic = document.getElementById('bg-music');
const button = document.getElementsByClassName("button-64");
// document.querySelector('.button-64').addEventListener('click', function(){
//   startGame();
// });  //same as the below line
button[0].addEventListener('click', function(){
  startGame();
  bgMusic.play();
});


let scoreElement = document.getElementById("score-value")
let timeElement = document.getElementById("time-value")
let score = 0
let time_left = 60
let player = document.getElementById("player");
let gameBoard = document.getElementById("game-board");
// Define an array of target colors that the player needs to catch and an array of avoid colors that the player needs to avoid.
const targetColor = ["lavender", "blue", "green"]
const avoidColor = ["red", "yellow", "orange"]
const allColor = targetColor.concat(avoidColor);
//Implement a function to generate a random color from the target and avoid colors.
function randomColor() {
  const randomId = Math.floor(Math.random() * allColor.length)
  return allColor[randomId]
}


function createFallingObject() {
  let fallingObject = document.createElement("div");
  fallingObject.className = "falling_objects";
  fallingObject.style.backgroundColor = randomColor();
  fallingObject.style.left = Math.floor(Math.random() * (gameBoard.offsetWidth - fallingObject.offsetWidth)) + 'px'; // Random horizontal position
  gameBoard.appendChild(fallingObject);
  return fallingObject;
}
createFallingObject();

// Move the falling objects vertically

function moveFallingObjects() {
  var objects = document.getElementsByClassName('falling_objects');
  for(var i = 0; i < objects.length; i++) {
    var fallingObject = objects[i];
    var objectsTop = parseInt(window.getComputedStyle(fallingObject).getPropertyValue('top')); //string to Int
    
    if(objectsTop >= gameBoard.offsetHeight - player.offsetHeight){
      CatchCheck();
      
    }

    if(objectsTop >= gameBoard.offsetHeight) {
        gameBoard.removeChild(fallingObject);
    }
    else{
      fallingObject.style.top = (objectsTop + 10) + 'px';
    }
    
  }
}

//check if catch the suitable colors or not?
function CatchCheck(){
  
  var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  var fallingObjects = document.getElementsByClassName('falling_objects');
  for(var i = 0; i < fallingObjects.length; i++){
   var fallingObject = fallingObjects[i];
  //  var objectTop = parseInt(window.getComputedStyle(fallingObject).getPropertyValue('top'));
   var objectLeft = parseInt(window.getComputedStyle(fallingObject).getPropertyValue('left'));
   
   if(playerLeft >= objectLeft - player.offsetWidth && playerLeft <= objectLeft + fallingObject.offsetWidth)
   {   
    

      if(targetColor.includes(fallingObject.style.backgroundColor)){
        score+=1;
        scoreElement.innerHTML = score;
      }
      else{
        score -= 1;
        scoreElement.innerHTML = score;
      }
      gameBoard.removeChild(fallingObject);
      
   }
   
  }
}


//Handle arrow key presses to move the character horizontally.
document.addEventListener("keydown", function (event) {
  if (event.key === 'ArrowLeft') {
    movePlayer(-10);
  }
  if (event.key === 'ArrowRight') {
    movePlayer(10);
  }
  
});
function movePlayer(offset){
  var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  var gameBoardWidth = gameBoard.offsetWidth;
  var playerWidth = player.offsetWidth ;
  var newLeft = playerLeft + offset;
  if(newLeft >= 0 && newLeft <= gameBoardWidth - playerWidth){
    player.style.left = newLeft + 'px';

  }
  else if(newLeft > gameBoardWidth - playerWidth){
    player.style.left = (gameBoardWidth - playerWidth) + 'px';
  }
  else if(newLeft < 0){
    player.style.left = 0 + 'px';
  }
}


//
function startGame(){
  time_left = 60; //for re-start
  score = 0;
  timeElement.innerHTML = time_left;
  scoreElement.innerHTML = score;
  timer = setInterval(function(){
    time_left--;
    timeElement.innerHTML = time_left;
    if(time_left === 0){
      clearInterval(timer);
      clearInterval(create);
      clearInterval(falling);
      EndGame();
    }
  }, 1000);
  
  create = setInterval(createFallingObject, 1000);
  falling = setInterval(moveFallingObjects,100);

}

function EndGame(){
  alert('Game Over! Final Score: ' + score);
  //clear all remain falling objects
  var objects = document.getElementsByClassName('falling_objects');
  while(objects.length > 0){
    gameBoard.removeChild(objects[0]);
  }
}

