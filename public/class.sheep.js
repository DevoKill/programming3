
class Sheep extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 3;
    }
    cho(ch) {
        this.stanalNorKordinatner();
        return super.cho(ch);
    }
    move() {
        var norVandak = random(this.cho(0));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1];
            matrix[this.y][this.x] = 2;
        }
        this.energy--;
    }
    utel() {
        var norVandak0 = random(this.cho(7));
        var norVandak1 = random(this.cho(1));
        var norVandak2 = random(this.cho(5));
        if (norVandak0 || norVandak1 || norVandak2) {
            if (norVandak0) {
                matrix[this.y][this.x] = 0;
                matrix[norVandak0[1]][norVandak0[0]] = 2;
                this.x = norVandak0[0];
                this.y = norVandak0[1];
                for (var i in upgradedGrasses) {
                    if (upgradedGrasses[i].x == norVandak0[0] && upgradedGrasses[i].y == norVandak0[1]) {
                        upgradedGrasses.splice(i, 1);
                    }
                }
                this.energy += 2;
            }
            else if (norVandak1) {
                matrix[this.y][this.x] = 0;
                matrix[norVandak1[1]][norVandak1[0]] = 2;
                this.x = norVandak1[0];
                this.y = norVandak1[1];
                for (var i in grasses) {
                    if (grasses[i].x == norVandak1[0] && grasses[i].y == norVandak1[1]) {
                        grasses.splice(i, 1);
                    }
                }
                this.energy++;
            }
            else if (norVandak2) {
                matrix[this.y][this.x] = 0;
                matrix[norVandak2[1]][norVandak2[0]] = 2;
                this.x = norVandak2[0];
                this.y = norVandak2[1];
                for (var i in pressedGrasses) {
                    if (pressedGrasses[i].x == norVandak2[0] && pressedGrasses[i].y == norVandak2[1]) {
                        pressedGrasses.splice(i, 1);
                    }
                }
                this.energy += 0.5;
            }
        }
        else {
            this.move();
        }
    }
    bazmanal() {
        var norVandak = random(this.cho(0));
        if (norVandak) {
            sheeps.push(new Sheep(norVandak[0], norVandak[1]));
            matrix[norVandak[1]][norVandak[0]] = 2;
            this.energy = 1;
        }
    }
    die() {
        for (var i in sheeps) {
            if (sheeps[i].x == this.x && sheeps[i].y == this.y) {
                sheeps.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}