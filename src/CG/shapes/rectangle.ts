import {CGShape, ShapeType} from './shape';

interface ECRect {
    hash?: number;
    x: number;
    y: number;
    height: number;
    width: number;
    radius: number;
    fillColor?: string;
}

// interface ECRectShape {
//     height: RectHeight;
//     width: RectWidth;
//     radius: RectRadius;
// }

// type RectHeight = number;
// type RectWidth = number;
// type RectRadius = number;

class CGRect extends CGShape {
    private readonly shape: ECRect;

    constructor(rectOptions: ECRect) {
        super({
            x: rectOptions.x,
            y: rectOptions.y
        }, rectOptions.hash);

        this.type = ShapeType.rect;
        this.shape = rectOptions;
    }

    getShape(): ECRect {
        return this.shape;
    }
}

export {
    CGRect,
    ECRect
};