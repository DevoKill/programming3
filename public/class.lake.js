
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