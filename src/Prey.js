export default class Prey {
    width = 20;
    height = 20;
    x;
    y;
    bodyColor = 'red';
    
    constructor() {
        this.generate();
    }

    draw = (context) => {
        context.save();
        context.fillStyle = this.bodyColor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }

    generate = () => {
        this.x = Math.floor((Math.random() * 480) + 5);
        this.y = Math.floor((Math.random() * 480) + 5);
    }
}