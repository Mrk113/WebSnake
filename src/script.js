import Cell from "./utilities/Cell.js"
import Snake from "./utilities/Snake.js"
import Apple from "./utilities/Apple.js";

const UP = 0;
const LEFT = 1;
const RIGHT = 2;
const DOWN = 3;

const windowSize = 1300;
const grids = 13;
const LENGTH = 3;
const SPEED = 30;

var cells = [];
var direction = RIGHT;

const gameWindow = document.getElementById("gameWindow");
gameWindow.setAttribute("width", windowSize);
gameWindow.setAttribute("height", windowSize);
const ctx = gameWindow.getContext("2d");

for (let i = 0; i < grids; i++) {
    for (let j = 0; j < grids; j++) {
        let cell = new Cell(ctx, i, j, windowSize, grids);
        cells.push(cell)
    }
}

function drawBoard() {
    cells.forEach(cell => {
        cell.draw()
    })
}

addEventListener("keydown", (event) => {
    if (event.key == 'w' && direction != DOWN) {
        direction = UP; 
    }
    else if (event.key == 'a' && direction != RIGHT) {
        direction = LEFT;
    }
    else if (event.key == 'd' && direction != LEFT) {
        direction = RIGHT;
    }
    else if (event.key == 's' && direction != UP) {
        direction = DOWN;
    }
})

let center = Math.floor(grids / 2)

let apple = new Apple(ctx, center, center + Math.round(center / 2), windowSize, grids) 

let time = 0;
function update() {
    
    if (time == SPEED) {
        if (apple.row == snake.row && apple.column == snake.column) {
                snake.increaseSize(1, direction)
                apple.respawn(snake)

        }
        snake.move(direction)
        time = 0;
    }
    if (!snake.dead()) {
        time++;
    }
}

function clear() {
    ctx.clearRect(0, 0, windowSize, windowSize);
}

let snake = new Snake(ctx, center, center, windowSize, grids)
snake.increaseSize(LENGTH - 1, direction)

function render() {
    //Draw Apple
    apple.draw()

    //Draw Snake
    snake.draw(ctx)

    //Render Board
    drawBoard();
}


function draw() {
    clear();
    update();
    render();


    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
