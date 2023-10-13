const character = document.getElementById("character");
const net = document.getElementById("net");
const moveSpeed = 20;
let characterleftPosition = 60;
const screenWidth = (window.innerWidth) / 2.15;
const characterWidth = character.clientWidth;
let player1Score = 0;
let player2Score = 0;

const winningScore = 5;
let player1Name = prompt("Enter Player 1's Name:") || "Player 1"
let player2Name = prompt("Enter Player 2's Name:") || "Player 2";
const collisionsound = document.getElementById("collisionSound");
const jumpsound = document.getElementById("jump");
const pointersound = document.getElementById("point");
const headhitsound = document.getElementById("headsound");
const gameoverSound = document.getElementById("gameOver");
const gameSound = document.getElementById("fullgameSound");
function playjumpsound() {
    jumpsound.currentTime = 0;
    jumpsound.play();
}
function playcollisionsound() {
    collisionsound.currentTime = 0;
    collisionsound.play();
}
function playpointersound() {
    pointersound.currentTime = 0;
    pointersound.play();
}
function headsounds() {
    headhitsound.currentTime = 0;
    headhitsound.play();
}
function gameoversound() {
    gameoverSound.currentTime = 0;
    gameoverSound.play();
}
function moveCharacterForward() {
    if (characterleftPosition + characterWidth + moveSpeed <= screenWidth) {
        characterleftPosition += moveSpeed;
        character.style.left = characterleftPosition + "px";
    }
}
function moveCharacterBackward() {
    if (characterleftPosition - moveSpeed >= 0) {
        characterleftPosition -= moveSpeed;
        character.style.left = characterleftPosition + "px";
    }
}
let jumpHeight = 0;
let isJumping = false;
function movecharacterjump() {
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
document.addEventListener("keyup", function (event) {
    if (event.key === "w") {
        playjumpsound();
        movecharacterjump();

    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "d") {
        moveCharacterForward();
    } else if (event.key === "a") {
        moveCharacterBackward();
    }
});

const character1 = document.getElementById("character1");
let character1rightPosition = 60;
function moveCharacter1Forward() {
    if (character1rightPosition + characterWidth + moveSpeed <= screenWidth) {
        character1rightPosition += moveSpeed;
        character1.style.right = character1rightPosition + "px";
    }
}

function moveCharacter1Backward() {
    if (character1rightPosition - moveSpeed >= 0) {
        character1rightPosition -= moveSpeed;
        character1.style.right = character1rightPosition + "px";
    }
}
let jumpHeight1 = 0;
let isJumping1 = false;
function movecharacter1jump() {
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
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        moveCharacter1Forward();
    }
    else if (event.key === "ArrowRight") {
        moveCharacter1Backward();
    }
});
document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp") {
        playjumpsound();
        movecharacter1jump();
    }
});
const ball = document.getElementById("ball");
const initialBallSpeedX = 4;
const initialBallSpeedY = 4;
let ballSpeedX = 4; 
let ballSpeedY = 4; 
const screenWidth1 = window.innerWidth-20;
const screenHeight = window.innerHeight;


const minPositionX = 10;
const maxPositionX = screenWidth1;
let randomPositionX = Math.random() * (maxPositionX - minPositionX) + minPositionX;


let initialBallPositionX = randomPositionX;
const initialBallPositionY = 0;
let ballPositionX = initialBallPositionX; 
let ballPositionY = initialBallPositionY;

function updateBallPosition() {
    
    if (isGamePaused ) {
        return; 
    }
    
    
    const maxBallSpeed = 12;
    if (Math.abs(ballSpeedX) > maxBallSpeed) {
        ballSpeedX = maxBallSpeed * Math.sign(ballSpeedX);
    }
    if (Math.abs(ballSpeedY) > maxBallSpeed) {
        ballSpeedY = maxBallSpeed * Math.sign(ballSpeedY);
    }
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;

    if (ballPositionX + ball.offsetWidth >= screenWidth1) {
        ballSpeedX = -ballSpeedX;
        
        ballPositionX = ballPositionX-30;
    } else if (ballPositionX <= 0) {
        ballSpeedX = -ballSpeedX;
        ballPositionX = ballPositionX+30;
    }

    

    if (ballPositionX + ball.clientWidth >= screenWidth1 || ballPositionX <= 0) {
        ballSpeedX = -ballSpeedX ;}
    if (ballPositionY + ball.offsetHeight >= screenHeight || ballPositionY <= 0) {
        ballSpeedY = -ballSpeedY ;
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
            ballPositionY = character.offsetTop - ball.offsetHeight;
            headsounds();

        } else {
            const collisionPoint = character.offsetTop + character.clientHeight - ballPositionY;
            ballSpeedY = Math.abs(ballSpeedY) * 2 
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
            ballPositionY = character1.offsetTop - ball.offsetHeight+1;
            headsounds();
        } else {
            const collisionPoint = character1.offsetTop + character1.clientHeight - ballPositionY;
            ballSpeedY = Math.abs(ballSpeedY) * 2; 
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
          
            playcollisionsound();
            ballSpeedY = -Math.abs(ballSpeedY) * 1.5; 


        } else {
           
            playcollisionsound();
            ballSpeedY = Math.abs(ballSpeedY) * 1.5;
            

        }


        ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.2); 
    }
    function resetballposition() {
        randomPositionX = Math.random() * (maxPositionX - minPositionX) + minPositionX;
        initialBallPositionX = randomPositionX;
        ballPositionX = initialBallPositionX;
        ballPositionY = initialBallPositionY;
        ballSpeedX = initialBallSpeedX;
        ballSpeedY = initialBallSpeedY;

    }
    function resetgame() {
        player1Score = 0;
        player2Score = 0;
        
        resetballposition();
    }


    if (ballPositionY + ball.offsetHeight >= screenHeight) {

        if (ballPositionX < screenWidth1 / 2) {
            playpointersound();
            player2Score++;
            document.getElementById("player2Score").textContent = `${player2Name}: ${player2Score}`;
        } else {
            playpointersound();
            player1Score++;
            document.getElementById("player1Score").textContent = `${player1Name}: ${player1Score}`;
        }

      
            if (player1Score >= winningScore || player2Score >= winningScore) {
                gameoversound();
                let winner = "";
                if (player1Score > player2Score) {
                    winner = $(player1Name);
                } else {
                    winner = $(player2Name);
                }
                const playAgain = confirm(`${winner} wins! Do you want to play again?`);
                if (playAgain) {
                    resetgame();
                } else {
                    resetgame();
                }
            

        } else {
          
                resetballposition(); 
           
            
        }
    }
    ball.style.left = ballPositionX + "px";
    ball.style.top = ballPositionY + "px";
    requestAnimationFrame(updateBallPosition);
}
// 
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
let isGamePaused = true;

function toggleGameState() {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {
        pauseButton.textContent = "Resume";
        document.getElementById('character').hidden = true
        document.getElementById('character1').hidden = true

        gameSound.pause();
    } else {
        pauseButton.textContent = "Pause";
        document.getElementById('character').hidden = false
        document.getElementById('character1').hidden = false


        updateBallPosition();

        gameSound.play();
    }
}

startButton.addEventListener("click", () => {
    if (isGamePaused) {
        toggleGameState();
        gameoversound();
        gameSound.play();
        document.getElementById("player1Score").textContent = $(player1Name);
        document.getElementById("player2Score").textContent = $(player2Name);
        
        
    }
});


function resetgames() {
    player1Score = 0;
    player2Score = 0;
    document.getElementById("player1Score").textContent = $(player1Name);
    document.getElementById("player2Score").textContent = $(player2Name);
    randomPositionX = Math.random() * (maxPositionX - minPositionX) + minPositionX ;
    initialBallPositionX = randomPositionX;
    ballPositionX = initialBallPositionX;
    ballPositionY = initialBallPositionY;
    ballSpeedX = initialBallSpeedX;
    ballSpeedY = initialBallSpeedY;
    gameoversound();
    updatePlayerNames();
  

    
}
resetButton.addEventListener("click", resetgames);

pauseButton.addEventListener("click", toggleGameState);


resetgames();

