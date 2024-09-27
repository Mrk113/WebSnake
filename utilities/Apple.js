import Cell from "./Cell.js";

export default class Apple extends Cell {
    randomInt() {
        return Math.floor(Math.random() * this.grids);
    }

    respawn(snake) {
        let unique = false;
        let x,y;
        while (!unique) {
            x = this.randomInt()
            y = this.randomInt()

            unique = !snake.body.some(part => part.row === x && part.column === y);
        }           
        this.row = x
        this.column = y

   }
    
    draw() {
        this.ctx.fillStyle = "red";
        this.calcCords();
        let [x, y, height, width] = this.getCords();
        this.ctx.fillRect(x, y, height, width);
    }

}