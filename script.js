
const character = document.getElementById("character");
const net = document.getElementById("net");
const moveSpeed = 15;
let characterleftPosition = 50;
const screenWidth = (window.innerWidth)/2.25;
const characterWidth = character.clientWidth;
let player1Score = 0;
let player2Score = 0;
const winningScore = 10; // Adjust as needed

function moveCharacterForward() {
    if(characterleftPosition + characterWidth + moveSpeed <= screenWidth)
    {
    characterleftPosition += moveSpeed;
    character.style.left = characterleftPosition + "px";
    }
}

function moveCharacterBackward() {
    if (characterleftPosition - moveSpeed >= 0){
    characterleftPosition -= moveSpeed;
    character.style.left = characterleftPosition + "px";
    }
}

let jumpHeight = 0;
let isJumping = false;

function movecharacterjump(){
        isJumping = true;
        
        const jumpInterval = setInterval(() => {
            character.style.bottom = jumpHeight + "px";
            jumpHeight += 5;
            
            if (jumpHeight >= 100) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    character.style.bottom = jumpHeight + "px";
                    jumpHeight -= 5;
                    if (jumpHeight <= 0) {
                        character.style.bottom = "0px";
                        isJumping = false;
                        clearInterval(fallInterval);
                    }
                }, 5);
            }
        }, 5);
    }
document.addEventListener("keyup", function(event) {
    if(event.key==="ArrowUp"){
            movecharacterjump();
        
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        moveCharacterForward();
    } else if (event.key === "ArrowLeft") {
        moveCharacterBackward();
    }
});

const character1 = document.getElementById("character1");
let character1rightPosition = 50;
function moveCharacter1Forward() {
    if(character1rightPosition + characterWidth + moveSpeed <= screenWidth)
    {
    character1rightPosition += moveSpeed;
    character1.style.right = character1rightPosition + "px";
    }
}

function moveCharacter1Backward() {
    if (character1rightPosition - moveSpeed >= 0){
    character1rightPosition -= moveSpeed;
    character1.style.right = character1rightPosition + "px";
    }
}
let jumpHeight1=0;
let isJumping1 = false;
function movecharacter1jump(){
      isJumping1 = true;
    
    const jumpInterval1 = setInterval(() => {
        character1.style.bottom = jumpHeight1 + "px";
        jumpHeight1 += 5;
        
        if (jumpHeight1 >= 100) {
            clearInterval(jumpInterval1);
            const fallInterval1 = setInterval(() => {
                character1.style.bottom = jumpHeight1 + "px";
                jumpHeight1 -= 5;
                if (jumpHeight1 <= 0) {
                    character1.style.bottom = "0px";
                    isJumping1 = false;
                    clearInterval(fallInterval1);
                }
            }, 5);
        }
    }, 5);
}



document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
        moveCharacter1Forward();
    } 
    else if (event.key === "d") {
        moveCharacter1Backward();
    }

});
document.addEventListener("keyup", function(event) {
        if(event.key=== "w"){
                movecharacter1jump();    
        }
});

const ball = document.getElementById("ball");
const initialBallSpeedX = 4;
const initialBallSpeedY = 4;
let ballSpeedX = 4; 
let ballSpeedY = 4; 
const screenWidth1 = window.innerWidth;
const screenHeight = window.innerHeight;
const minPositionX=0;
const maxPositionX=screenWidth ;
const randomPositionX=Math.random() * (maxPositionX - minPositionX) + minPositionX;
let initialBallPositionX = randomPositionX;
const initialBallPositionY = 0;
let ballPositionX = initialBallPositionX; 
let ballPositionY = initialBallPositionY ;
function updateBallPosition() {
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;   
    if (ballPositionX + ball.offsetWidth > screenWidth1 || ballPositionX <= 0){
        ballSpeedX = -ballSpeedX;   
    }
    if (ballPositionY + ball.offsetHeight > screenHeight || ballPositionY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

if (
  ballPositionY + ball.offsetHeight >= character.offsetTop &&
  ballPositionY <= character.offsetTop + character.clientHeight &&
  ballPositionX + ball.offsetWidth >= character.offsetLeft &&
  ballPositionX <= character.offsetLeft + character.clientWidth
) {
  const ballCenterX = ballPositionX + ball.offsetWidth / 2;
  const characterCenterX = character.offsetLeft + character.clientWidth / 2;
  const direction = ballCenterX > characterCenterX ? 1 : -1;
  const characterTopHalf = character.offsetTop + character.clientHeight / 3;
  if (ballPositionY + ball.offsetHeight <= characterTopHalf) {
      ballSpeedY = -Math.abs(ballSpeedY); 
  }
   else {
      const collisionPoint = character.offsetTop + character.clientHeight - ballPositionY;
      ballSpeedY = Math.abs(ballSpeedY)*2; 
  }

  ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.3); 
}
  
  
  else if (
      ballPositionY + ball.offsetHeight >= character1.offsetTop &&
      ballPositionY <= character1.offsetTop + character1.clientHeight &&
      ballPositionX + ball.offsetWidth >= character1.offsetLeft &&
      ballPositionX <= character1.offsetLeft + character1.clientWidth
  ) {
      const ballCenterX = ballPositionX + ball.offsetWidth / 2;
      const character1CenterX = character1.offsetLeft + character1.clientWidth / 2;
      const direction = ballCenterX > character1CenterX ? 1 : -1;
  
      const character1TopHalf = character1.offsetTop + character1.clientHeight / 3;

  if (ballPositionY + ball.offsetHeight <= character1TopHalf) {
      const collisionPoint = ballPositionY + ball.offsetHeight - character1.offsetTop;
      ballSpeedY = -Math.abs(ballSpeedY); 
  } 
  else {
      const collisionPoint = character1.offsetTop + character1.clientHeight - ballPositionY;
      ballSpeedY = Math.abs(ballSpeedY)*1.2; 
  }

  ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.3);
  }
  else if (
      ballPositionY + ball.offsetHeight >= net.offsetTop &&
      ballPositionY <= net.offsetTop + net.clientHeight &&
      ballPositionX + ball.offsetWidth >= net.offsetLeft &&
      ballPositionX <= net.offsetLeft + net.clientWidth
  ) {
    
      const ballCenterX = ballPositionX + ball.offsetWidth / 2;
      const netCenterX = net.offsetLeft + net.clientWidth / 2;
      const direction = ballCenterX > netCenterX ? 1 : -1;
  
      const netTopHalf = net.offsetTop + net.clientHeight / 4;

  if (ballPositionY + ball.offsetHeight <= netTopHalf) {
  
      ballSpeedY = -Math.abs(ballSpeedY); 
  } 
  else {
     
      ballSpeedY = Math.abs(ballSpeedY)*1.2; 
  }

  ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.2); 
  }
  // Inside your collision detection code

// if (ballPositionY + ball.offsetHeight >= screenHeight) {
//   // Ball touches the ground, opponent gains one point
//   if (ballPositionX < screenWidth1 / 2) {
//       // Ball on player 1's side
//       player2Score++;
//       document.getElementById("player2Score").textContent = "Player 2: " + player2Score;
//   } else {
//       // Ball on player 2's side
//       player1Score++;
//       document.getElementById("player1Score").textContent = "Player 1: " + player1Score;
//   }

//   // Check if either player has reached the winning score
//   if (player1Score >= winningScore || player2Score >= winningScore) {
//       // One of the players has won, reset the game
//       player1Score = 0;
//       player2Score = 0;
//       document.getElementById("player1Score").textContent = "Player 1: 0";
//       document.getElementById("player2Score").textContent = "Player 2: 0";
      
//       // Reset the ball's position and speed to initial values
//       ballPositionX = initialBallPositionX;
//       ballPositionY = initialBallPositionY;
//       ballSpeedX = initialBallSpeedX;
//       ballSpeedY = initialBallSpeedY;
//   } 
//   else {
//       // Reset the ball's position to initial values
//       ballPositionX = initialBallPositionX;
//       ballPositionY = initialBallPositionY;
      
//       // Decrease the ball's speed to initial values
//       ballSpeedX = initialBallSpeedX;
//       ballSpeedY = initialBallSpeedY;
//   }
// }
  ball.style.left = ballPositionX + "px";
  ball.style.top = ballPositionY + "px";
  requestAnimationFrame(updateBallPosition);
}
updateBallPosition();















