
class UpgradedGrass extends Creature{
    constructor(x, y){
        super(x, y);
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