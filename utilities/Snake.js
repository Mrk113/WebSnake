import Cell from "./Cell.js";

export default class Snake extends Cell {
    constructor(ctx, x, y, windowSize, grids) {
        super(ctx, x, y, windowSize, grids);
        this.body = []
    }

    draw() {
        this.ctx.fillStyle = "green";
        this.calcCords();
        let [x, y, height, width] = this.getCords();
        this.ctx.fillRect(x, y, height, width);

        this.body.forEach(part => {
            part.ctx.fillStyle = "green";
            part.calcCords();
            let [x, y, height, width] = part.getCords();
            part.ctx.fillRect(x, y, height, width);
        })
    }
    
    move(direction) {
        let row = this.row;
        let column = this.column;
        
        switch (direction) {
            case 0:
                this.row--;
                break;
            case 1:
                this.column--;
                break;
            case 2: 
                this.column++;
                break;
            case 3:
                this.row++;
                break;
        }


        this.body.forEach(part => {
            let newrow = part.row
            let newcolume = part.column
            part.row = row
            part.column = column
            row = newrow
            column = newcolume 
            part.draw()
        })
    }

    dead() {
        let dead = false 

        if (this.row == this.grids || this.row == -1 || this.column == this.grids || this.column == -1) {
            dead = true 
        }
        this.body.forEach(part => {
            if (part.row == this.row && part.column == this.column) {
                dead = true 
            }
        });

        return dead
    }

    offset(direction) {
        let offsetRow = 0;        
        let offsetColumn = 0;

        switch (direction) {
            case 0:
                offsetRow = 1
                break;
            case 1:
                offsetColumn = 1;
                break;
            case 2: 
                offsetColumn = -1;
                break;
            case 3:
                offsetRow = -1;
                break;
        }
        return [offsetRow, offsetColumn]
    }

    increaseSize(length, direction) {
        let [row, column] = this.offset(direction)

        for (let i = 0; i < length; i++) {
            let body = new Snake(this.ctx, this.row +row, this.column +column, this.windowSize, this.grids) 
            this.body.push(body)
        } 
    }
}