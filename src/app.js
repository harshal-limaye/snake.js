import Prey from './Prey';
import Snake from './Snake';

class App {
    ate = true;
    canvas;
    context;
    direction = 2;
    height = 500;
    interval;
    prey;
    score = 0;
    snake;
    width = 500;
    directions = { 37: 0, 38: 1, 39:2, 40:3 };

    constructor() {
        this.initCanvas();
        this.start();
        this.captureKeyEvents();
    }

    captureKeyEvents = () => {
        document.onkeydown = (event) => {
            if (this.isValidDirection(event.keyCode) && (this.directions[event.keyCode] || this.directions[event.keyCode] === 0)) {
                this.direction = this.directions[event.keyCode];   
            }
        }
    }

    isHunting = () => {
        if (this.snake.bite(this.prey)) {
            this.prey.generate();
            this.snake.grow(this.direction);
            this.score++;
        }
    }

    gameOver = () => {
        if (this.snake.isGameOver()) {
            clearInterval(this.interval);
            this.context.fillText('Game over!', 200, 250);
        }
    }

    isValidDirection = (keyCode) => {
        if (this.directions[keyCode] === this.direction) {
            return false;
        } else if ((this.directions[keyCode] === 0 && this.direction === 2) ||
            (this.directions[keyCode] === 2 && this.direction === 0)
        ) {
            return false;
        } else if ((this.directions[keyCode] === 1 && this.direction === 3) ||
            (this.directions[keyCode] === 3 && this.direction === 1)
        ) {
            return false;
        }

        return true;
    }

    initCanvas = () => {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.context.font = '24px Calibri';
    }

    moveSnake = () => {
        this.isHunting();
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillText('Score : ' + this.score, 400, 475);
        this.prey.draw(this.context);
        this.snake.move(this.direction, this.context, this.prey);
        this.gameOver();
    }

    start = () => {
        this.snake = new Snake();
        this.prey = new Prey();
        this.interval = setInterval(this.moveSnake, 20);
    }
}

new App();