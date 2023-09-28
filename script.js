const canvas =  document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

const gridSize = 20;
const tileCount = 20;
const canvasSize = gridSize * tileCount;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 10 };
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = false;

document.getElementById("start-button").addEventListener("click", startGame);
document.addEventListener("keydown", changeDirection);

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    setInterval(gameLoop, 100);
}

function changeDirection(event) {
    if (!gameRunning) return;
    if (event.keyCode === 37 && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (event.keyCode === 38 && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (event.keyCode === 39 && dx !== 1) {
        dx = 1;
        dy = 0;
    } else if (event.keyCode === 40 && dy !== 1) {
        dx = 0;
        dy = 1;
    }    
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    if (
        snake[0].x < 0 ||
        snake[0].x >= tileCount ||
        snake[0].y < 0 ||
        snake[0].y >= tileCount ||
        checkCollision()
    ) {
        gameOver();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            generateFood();
            break;
        }
    }
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    snake.forEach(segment => {
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function gameOver() {
    clearInterval(gameLoop);
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvasSize / 2 - 80, canvasSize / 2);
}

function gameLoop() {
    update();
    draw();
}

generateFood();
const gameLoop = setInterval(gameLoop, 100);