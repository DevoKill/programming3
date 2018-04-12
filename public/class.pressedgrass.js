class PressedGrass{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 1;
    }
    live(i) {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 1;
            var norGrass = new Grass(this.x, this.y);
            grasses.push(norGrass);
            pressedGrasses.splice(i, 1);
        }
        else {
            this.energy--;
        }
    }
} 