const character = document.getElementById("character");
const moveSpeed = 5;
let characterleftPosition = 50;
const screenWidth = (window.innerWidth)/2.3;
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

document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
        moveCharacter1Forward();
    } 
    else if (event.key === "s") {
        moveCharacter1Backward();
    }
});








