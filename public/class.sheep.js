
class Sheep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 3;
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    cho(ch) {
        this.stanalNorKordinatner();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
            if(norVandak0){
                matrix[this.y][this.x] = 0;
                matrix[norVandak0[1]][norVandak0[0]] = 2;
                this.x = norVandak0[0];
                this.y = norVandak0[1];
                for (var i in upgradedGrasses) {
                    if (upgradedGrasses[i].x == norVandak0[0] && upgradedGrasses[i].y == norVandak0[1]) {
                        upgradedGrasses.splice(i, 1);
                    }
                }
                this.energy+=2;
            }
            else if(norVandak1){
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
                this.energy+=0.5;
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
class PressedGrass{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 1;
    }
    live(i){
        if(this.energy <= 0){
            matrix[this.y][this.x] = 1;
            var norGrass = new Grass(this.x, this.y);
            grasses.push(norGrass);
            pressedGrasses.splice(i, 1);
        }
        else{
            this.energy--;
        }
    }
} 