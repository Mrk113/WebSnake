export default class Cell {
    constructor(ctx, row, column, windowSize, grids) {
        this.ctx = ctx;
        this.row = row;
        this.column = column;
        this.windowSize = windowSize;
        this.grids = grids;
    }

    calcCords() {
       let length = this.windowSize / this.grids;
       this.x = length * this.column;
       this.y = this.row * length;
       this.height = length;
    }

    draw() {
        this.calcCords();
        let [x, y, lenght, width] = this.getCords()
        this.ctx.strokeRect(x, y, lenght, width);
    }

    getCords() {
        return [this.x, this.y, this.height, this.height]
    }
}

