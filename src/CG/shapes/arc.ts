import {CGShape, ShapeType} from './shape';

interface ECArc {
    hash?: number;
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
}

class CGArc extends CGShape {
    private readonly shape: ECArc;
    type = ShapeType.arc;

    constructor(shape: ECArc) {
        super({
            x: shape.x,
            y: shape.y
        }, shape.hash);

        this.shape = shape;
    }

    getShape() {
        return this.shape;
    }
}

export {
    ECArc,
    CGArc
};