const snake = document.getElementById("snake");
const food = document.getElementById("food");

let snakeX = 0;
let snakey = 0;
let foodX = 200;
let foodY = 200;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37) {
        snakeX -= 20;
    }
    else if (event.keyCode === 38) {
        snakeY -= 20;
    }
    else if (event.keyCode === 39) {
        snakeY -= 20;
    }
    else if (event.keyCode === 40) {
        snakeY -= 20;
    }

    updateGame();
}

function updateGame() {
    snake.style.left = snakeX + "px";
    snake.style.top = snakeY + "px";

    if (snakeX === foodX && snakeY === foodY) {
        score++;
        foodX = Math.floor(Math.random() * 20) * 20;
        foodY = Math.floor(Math.random() * 20) * 20;
        food.style.left = foodX + "px";
        food.style.left = foodY + "px";
    }
}