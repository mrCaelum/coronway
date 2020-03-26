import {Colors} from '@/p5/Colors.js'

export default class Cell {
    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = type

        this.stepSinceInfected = 0
        this.stepSinceCured = 0
        this.timesGotInfected = 0

        this.setColor()
    }

    setColor () {
        switch (this.type) {
            case 'healthy':
                this.color = Colors.green
            break
            case 'infected':
                this.color = Colors.red
            break
            case 'cured':
                this.color = Colors.blue
            break
            case 'dead':
                this.color = Colors.black
            break
            default:
                this.color = Colors.white
            break
        }
    }

    setType(type) {
        this.type = type
        this.setColor()
    }

    checkAround(sketch, left, right, top, bottom) {
        sketch

        let ratio = 0;

        if (this.type === 'healthy') {
            if (left && left.type === 'infected' && left.stepSinceInfected > 3) {
                ratio = ratio > 0 ? ratio * 5 : 0.02;
            }
            if (right && right.type === 'infected' && right.stepSinceInfected > 3) {
                ratio = ratio > 0 ? ratio * 5 : 0.02;
            }
            if (top && top.type === 'infected' && top.stepSinceInfected > 3) {
                ratio = ratio > 0 ? ratio * 5 : 0.02;
            }
            if (bottom && bottom.type === 'infected' && bottom.stepSinceInfected > 3) {
                ratio = ratio > 0 ? ratio * 5 : 0.02;
            }
            if (Math.random() < ratio) {
                this.setType('infected');
                this.timesGotInfected += 1;
            }
        }
    }

    update(sketch) {
        sketch

        if (this.type === 'cured') {
            this.stepSinceCured += 1;
            if (this.stepSinceCured > 100) {
                if (Math.random() <= (1 / this.timesGotInfected)) {
                    this.stepSinceCured = 0;
                    this.setType('healthy');
                }
            }
        }
        if (this.type === 'infected') {
            this.stepSinceInfected += 1
            if (this.stepSinceInfected > 4) {
                let rand = Math.random();
                let ratio = 0.5 - 1 / this.stepSinceInfected;
                let resistance = 1 - (1 / this.timesGotInfected);
                if (rand <= ratio / 800) {
                    this.setType('dead');
                } else if (rand <= ratio / 100 + resistance / 10) {
                    this.setType('cured');
                    this.stepSinceInfected = 0;
                }
            }
        }
    }

    render(sketch) {
        sketch.fill(this.color.r, this.color.g, this.color.b);
        sketch.rect(this.x, this.y, this.w, this.h);
    }

}
