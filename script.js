const character = document.getElementById("character");
const moveSpeed = 5;
let characterleftPosition = 50;
const screenWidth = (window.innerWidth)/2.25;
const characterWidth = character.clientWidth;

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
                        character.style.bottom = "-45px";
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
let ballPositionX = 50; // Initial X position of the ball
let ballPositionY = 50; // Initial Y position of the ball
let ballSpeedX = 2; // Horizontal speed of the ball
let ballSpeedY = 5; // Vertical speed of the ball

// Define the screen width and height
const screenWidth1 = window.innerWidth;
const screenHeight = window.innerHeight;

function updateBallPosition() {
    // Update ball's position
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;

    // Bounce the ball off the left and right edges of the screen
    if (ballPositionX + ball.offsetWidth >= screenWidth1 || ballPositionX <= 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballPositionY + ball.offsetHeight >= screenHeight || ballPositionY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    
    if (
        ballPositionY + ball.offsetHeight >= character.offsetTop &&
        ballPositionX + ball.offsetWidth >= character.offsetLeft &&
        ballPositionX <= character.offsetLeft + character.offsetWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    
    if (
        ballPositionY + ball.offsetHeight >= character1.offsetTop &&
        ballPositionX + ball.offsetWidth >= character1.offsetLeft &&
        ballPositionX <= character1.offsetLeft + character1.offsetWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }
    ball.style.left = ballPositionX + "px";
    ball.style.top = ballPositionY + "px";
    requestAnimationFrame(updateBallPosition);
}
updateBallPosition();














