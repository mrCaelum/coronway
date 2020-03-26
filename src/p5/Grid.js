import Cell from '@/p5/Cell.js'

export default class Grid {
    constructor(sketch, cols, rows, width, height, params) {
        this.cols = cols
        this.rows = rows
        this.cells = [];
        this.width = width
        this.height = height

        this.cellWidth = (this.width / this.cols)
        this.cellHeight = (this.height / this.rows)

        this.cells = new Array(this.cols)
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(this.rows)
        }

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j] = new Cell(i * this.cellWidth, j * this.cellHeight, this.cellWidth, this.cellHeight, 'healthy')
            }
        }

        this.params = params

        this.distributeCells(params.infected, 'infected')
    }

    distributeCells(number, type) {

        let tmp = []
        let result = []

        for (let i = 0; i < this.rows * this.cols - number; i++) {
            tmp.push('healthy');
        }

        for (var i = 0; i < number; i++) {
            let index = Math.round(Math.random() * (tmp.length + 1));
            tmp.splice(index, 0, type);
        }

        for (let i = 0; i < this.rows; i++) {
            let row = tmp.slice(i * this.cols, (i + 1) * this.cols);
            result.push(row);
        }

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j].setType(result[j][i])
            }
        }

    }

    run(sketch, infected) {

        if (infected != this.params.infected) {
            this.distributeCells(infected, 'infected')
            this.params.infected = infected
        }

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.cells[i][j].type === 'healthy') {
                    this.cells[i][j].checkAround(sketch,
                        typeof this.cells[i][j - 1] !== 'undefined' ? this.cells[i][j - 1] : null,
                        typeof this.cells[i][j + 1] !== 'undefined' ? this.cells[i][j + 1] : null,
                        typeof this.cells[i - 1] !== 'undefined' ? this.cells[i - 1][j] : null,
                        typeof this.cells[i + 1] !== 'undefined' ? this.cells[i + 1][j] : null
                    )
                }
                this.cells[i][j].update(sketch)
                this.cells[i][j].render(sketch)
            }
        }

    }
}
