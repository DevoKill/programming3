var n = 25;
var side = 30;
var grasses = []; //lime grass
var sheeps = []; //yellow
var wolves = []; //grey
var eagles = []; //brown
var pressedGrasses = []; //lighter lime grass
var lakes = []; //lightblue
var upgradedGrasses = []; //green
//test

function randClasses(amount, type){
    for(i = 0; i < amount; i++){
        var randx = Math.round(Math.random()*(n-1));
        var randy = Math.round(Math.random()*(n-1));
        if(matrix[randy][randx] == 1 || matrix[randy][randx] == 0){
            matrix[randy][randx] = type;
        }  
        else{
            i--;
        }
    }
}

var matrix = [];
for (var y = 0; y < n; y++) {
    var arr = [];
    for (var x = 0; x < n; x++) {
        arr[x] = Math.floor(Math.random() * 2);
    }
    matrix[y] = arr;
}

//two bears in the corners
matrix[0][0] = 4;
matrix[0][n-1] = 4;

for(var a = 0; a < 4; a++){
    var x = Math.round(Math.random()*(n-5));
    var y = Math.round(Math.random()*(n-5));
    var directions = [
                [x, y],
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ];
    for(var i in directions){
        var found = [];
        for (var i in directions) {
            var x = directions[i][0];
            var y = directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 1 || matrix[y][x] == 0) {
                    found.push(directions[i]);
                    var d = Math.floor(Math.random() * 9)
                    if(d == 1){
                        matrix[y][x] = 6;
                    }
                }
            }
        }
    }
} 
randClasses(5, 2);
randClasses(3, 3);

function setup() {
    frameRate(20);
    createCanvas(n * side + 1, n * side + 1);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grasses.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var sheep = new Sheep(x, y);
                sheeps.push(sheep);
            }
            else if (matrix[y][x] == 3) {
                var wolf = new Wolf(x, y);
                wolves.push(wolf);
            }
            else if (matrix[y][x] == 4) {
                var eagle = new Eagle(x, y);
                eagles.push(eagle);
            }
            else if (matrix[y][x] == 5) {
                var pressedGrass = new PressedGrass(x, y);
                pressedGrasses.push(pressedGrass);
            } 
            else if (matrix[y][x] == 6) {
                var lake = new Lake(x, y);
                lakes.push(lake);
            }
            else if (matrix[y][x] == 7) {
                var upgradedGrass = new UpgradedGrass(x, y);
                upgradedGrasses.push(upgradedGrass);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('#46D62D');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('grey');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('brown');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('#9DE88F');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill('#5DADE2');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill('#269213');
                rect(x * side, y * side, side, side);
            }
            else {
                fill('lightyellow');
                rect(x * side, y * side, side, side);
            }
        }
    } 
    for (var i in grasses) {
        grasses[i].bazmanal();
    } 
    for (var i in pressedGrasses) {
        pressedGrasses[i].live(i);
    }
    for (var i in lakes) {
        lakes[i].live();
    }
    for (var i in upgradedGrasses) {
        upgradedGrasses[i].bazmanal(i);
    }  
    eagles[0].utel(1);
    eagles[1].utel(2); 
    for (var i in sheeps) {
        sheeps[i].utel();
        if (sheeps[i].energy <= 0) {
            sheeps[i].die();
        }
        else if (sheeps[i].energy >= 9) {
            sheeps[i].bazmanal();
        }
    }  
    for (var i in wolves) {
        wolves[i].utel();
        if (wolves[i].energy <= 0) {
            wolves[i].die();
        }
        else if (wolves[i].energy >= 100) {
           wolves[i].bazmanal();
        }
    } 
}