export default class Snake {
    width = 20;
    height = 20;
    bodyColor = 'black';
    headColor = 'green';
    blocks = [ {x: 220, y: 200}, {x: 210, y: 200}, {x: 200, y: 200} ];
    turnHead = {
        0: (val) => val - 5,
        1: (val) => val - 5,
        2: (val) => val + 5,
        3: (val) => val + 5
    }
    axis = { 0: 'x', 1: 'y', 2: 'x', 3: 'y' }

    draw = (context) => this.blocks.forEach((block, i) => this.drawSnake(context, block, i));

    drawSnake = (context, block, i ) => {
        context.save();
        context.fillStyle = i === 0 ? this.headColor : this.bodyColor;
        context.fillRect(block.x, block.y, this.width, this.height);
        context.restore();
    }

    bite = (prey) => this.isCrashed(this.blocks[0], prey);

    changePosition = (direction) => {
        for(let i = this.blocks.length - 1; i >= 0; i--) {
            if (i === 0) {
                this.blocks[i][this.axis[direction]] = this.turnHead[direction](this.blocks[i][this.axis[direction]]);
            } else {
                this.blocks[i].x = this.blocks[i - 1].x;
                this.blocks[i].y = this.blocks[i - 1].y;
            }
        }
    }

    dealWithBoundries = () => {
        if(this.blocks[0].x > 500) {
            this.blocks[0].x = 0;
        }
    
        if(this.blocks[0].x < 0) {
            this.blocks[0].x = 500;
        }
    
        if(this.blocks[0].y > 500) {
            this.blocks[0].y = 0;
        }
    
        if(this.blocks[0].y < 0) {
            this.blocks[0].y = 500;
        }
    }

    grow = (direction) => {
        let x1, y1;
        const growBy = 20;
        if (direction === 0) {
            x1 = this.blocks[0].x - growBy;
            y1 = this.blocks[0].y;
        } else if (direction === 1) {
            x1 = this.blocks[0].x;
            y1 = this.blocks[0].y - growBy;
        } else if (direction === 2) {
            x1 = this.blocks[0].x + growBy;
            y1 = this.blocks[0].y;
        } else if (direction === 3) {
            x1 = this.blocks[0].x ;
            y1 = this.blocks[0].y + growBy;
        }
        this.blocks.unshift({ x: x1, y: y1 });
    }

    isCrashed = (bl1, bl2, range = 15) => ((Math.abs(bl1.x - bl2.x) <= range) && (Math.abs(bl1.y - bl2.y) <= range));

    isGameOver = () => {
        for(let i = 1; i <= this.blocks.length - 1; i++ ) {
            if (this.isCrashed(this.blocks[0], this.blocks[i], 4)) {
                return true;
            }
        }
        return false;
    }

    move = (direction, context, prey) => {
        this.dealWithBoundries();
        this.changePosition(direction);
        this.draw(context);
    }
}