class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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

    bazmanal() {
        this.multiply++;
        var norVandak = random(this.cho(0));
        if (this.multiply >= 5 && norVandak) {
            var norGrass = new Grass(norVandak[0], norVandak[1]);
            grasses.push(norGrass);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }
}
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
class Wolf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 50;
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x - 1, this.y + 2],
            [this.x, this.y - 2],
            [this.x, this.y - 1],
            [this.x, this.y],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2]
        ];
    }
    secondHalf(){
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
        var found = [];
        if(ch == 3){
            this.secondHalf();
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == ch) {
                        found.push(this.directions[i]);
                    }
                }
                return found;
            }
        }

        this.stanalNorKordinatner();
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
        if(this.energy > 100){
            this.energy = 100;
        }
        var norVandak = random(this.cho(1));
        if(norVandak){
            for (var i in grasses) {
                if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                    grasses.splice(i, 1);
                }
            }
            var norGrass = new PressedGrass(this.x, this.y);
            pressedGrasses.push(norGrass); 
            matrix[this.y][this.x] = 5; 
            /*
            var norGrass = new Grass(this.x, this.y);
            grasses.push(norGrass); 
            matrix[this.y][this.x] = 1; 
            */
            this.svaboda = 1;
            this.x = norVandak[0];
            this.y = norVandak[1];
            matrix[this.y][this.x] = 3;
        }
        else{
            var norVandak = random(this.cho(0));
            matrix[this.y][this.x] = 0;
        }
        this.energy--;
    }

    utel() {
        var norVandak = random(this.cho(2));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.x = norVandak[0];
            this.y = norVandak[1];
            for (var i in sheeps) {
                if (sheeps[i].x == this.x && sheeps[i].y == this.y) {
                    sheeps.splice(i, 1);
                }
            }
            this.energy+=25;
        }
        else {
            this.move();
        }
    }

    bazmanal() {
        var norVandak = random(this.cho(1));
        var secondHalf = random(this.cho(3));
        if (norVandak && secondHalf) {
            wolves.push(new Wolf(norVandak[0], norVandak[1]));
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.energy = 100;
        }
        var norVandak = random(this.cho(0));
         if (norVandak && secondHalf) {
            wolves.push(new Wolf(norVandak[0], norVandak[1]));
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.energy = 25;
        }
    }

    die() {
        for (var i in wolves) {
            if (wolves[i].x == this.x && wolves[i].y == this.y) {
                if(this.svaboda == 1){
                    var norGrass = new Grass(wolves[i].y, wolves[i].x);
                    grasses.push(norGrass);
                    matrix[wolves[i].y][wolves[i].x] = 1;
                }
                else{
                    matrix[wolves[i].y][wolves[i].x] = 0;
                }
                wolves.splice(i, 1);
            }
        }
    }
}
class Lake{
    constructor(x, y) {
        this.x = x;
        this.y = y ;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x + 2, this.y],
            [this.x, this.y + 2]
        ];
    }
    cho(ch) {
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
    live(){
        var norVandak = random(this.cho(1));
        if(norVandak){
            for (var i in grasses) {
                if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                    var norGrass = new UpgradedGrass(grasses[i].x, grasses[i].y);
                    upgradedGrasses.push(norGrass);
                    matrix[norVandak[1]][norVandak[0]] = 7;
                    grasses.splice(i, 1);
                    break;
                }
                
            }
        }
    }
}
class UpgradedGrass{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    bazmanal() {
        var norVandak = random(this.cho(0));
        if (norVandak) {
            var norGrass = new Grass(norVandak[0], norVandak[1]);
            grasses.push(norGrass);
            matrix[norVandak[1]][norVandak[0]] = 1;
        }
    }
}
class Eagle{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }
    cordinates(){
        if(this.b == 2){
            for(var i = n - 1; i >= 0; i--){
                var d = [];
                d.push(this.y+i, this.x-i);
                this.directions.push(d);
            }
        }
        if(this.b == 1){
            for(var i = 0; i <= n-1; i++){
                var d = [];
                d.push(this.y+i, this.x+i);
                this.directions.push(d);
            }
        }
    }
    cho(ch) {
        this.cordinates();
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

    utel(s) {
        this.b = s;
        if(wolves.length >= 5){
            var norVandak = random(this.cho(3));
        }
        if(sheeps.length >= 14){
            var norVandak2 = random(this.cho(2));
        }
        if (norVandak) {
            matrix[norVandak[1]][norVandak[0]] = 4;
            matrix[this.y][this.x] = 0;
            for (var i in wolves) {
                if (wolves[i].x == norVandak[0] && wolves[i].y == norVandak[1]) {
                    wolves.splice(i, 1);
                    break;
                }
            }
            this.x = norVandak[0];
            this.y = norVandak[1];
        }
        else if(norVandak2) {
            matrix[norVandak2[1]][norVandak2[0]] = 4;
            matrix[this.y][this.x] = 0;
            for (var i in sheeps) {
                if (sheeps[i].x == norVandak2[0] && sheeps[i].y == norVandak2[1]) {
                    sheeps.splice(i, 1);
                    break;
                }
            }
            this.x = norVandak2[0];
            this.y = norVandak2[1];
        }
    }
}