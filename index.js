var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var interval = 70;

canvas.width = 400;
canvas.height = 400;

const button = document.createElement('button');
button.innerHTML = 'Start Game';
button.classList.add('button-start')

// Positionnement du bouton sur le canvas
button.style.position = 'absolute';
button.style.left = (canvas.offsetWidth - button.offsetWidth) / 2 + canvas.offsetLeft + 'px';
button.style.top = (canvas.offsetHeight - button.offsetHeight) / 2 + canvas.offsetTop + 'px';

// Ajout du bouton au document
document.body.appendChild(button);

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#IUIUIU";
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}

var gridSize = 10;

var snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
];

var apple = generateApple();

var dx = 10;
var dy = 0;
var gameStarted = false;

let score = 0

function startGame() {
    document.querySelector('.button-start').style.display = "none"
    const isActive = document.querySelector('.active')
    const looserBlock = document.querySelector('.looser-block');
    if ( isActive ) {
        looserBlock.classList.remove('active');
    } 
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 },
    ];
    dx = 10;
    dy = 0;
    gameStarted = true;
    score = 0
    setTimeout(main, interval);
}

function moveSnake() {
    var snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };

    // si je mange la pomme tu fais pas pop enculé de ta mère
    if ( snakeHead.x === apple.x && snakeHead.y === apple.y ) {
        apple = generateApple()
        score++
    } else {
        snake.pop();
    }
    
    snake.unshift(snakeHead);
    
}

function gameOver() {
    const looserBlock = document.querySelector('.looser-block');
    looserBlock.classList.add('active');
    gameStarted = false;
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        gameOver();
    }
    for (var i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }
}

document.addEventListener("keydown", function (event) {
   
    if (event.keyCode === 37) {
        // gauche
        dx = -10;
        dy = 0;
    } else if (event.keyCode === 38) {
        // haut
        dx = 0;
        dy = -10;
    } else if (event.keyCode === 39) {
        // droite
        dx = 10;
        dy = 0;
    } else if (event.keyCode === 40) {
        // bas
        dx = 0;
        dy = 10;
    }
});



function main() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mettre à jour la position du serpent
    moveSnake();

    // Vérifier les collisions
    checkCollision();

    // Dessiner le serpent
    drawSnake();

    // Dessiner la pomme
    drawApple();

    generateApple();

    const ScoreTxt = document.querySelector('.score')
    ScoreTxt.innerHTML = '<p>Score: '+  score + '</p>'

    if (gameStarted) {
        // Répéter la boucle
        setTimeout(main, interval);
    }
}

// Création de la pomme

function drawApple() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(apple.x, apple.y, gridSize, gridSize);
    ctx.fill();
}

function generateApple() {
    return {
        x: Math.floor((Math.random() * canvas.width) / gridSize) * gridSize,
        y: Math.floor((Math.random() * canvas.height) / gridSize) * gridSize
    }
}

const reMatch = document.querySelector('.rematch')

reMatch.addEventListener("click", startGame)
button.addEventListener("click", startGame)