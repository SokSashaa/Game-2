import { IPoint } from '../../interface/locator.interfaces';
import { CGShape } from './shape';
import { CGImage } from './image';

interface ECShapeGroupOptions {
    x: number;
    y: number;
    hash: number;
}

interface ObjectsMap {
    [key: string]: CGShape
}

class ECShapesGroup extends CGShape {
    protected positionOrigin: IPoint;
    protected shapes: ObjectsMap = {};
    constructor(options: ECShapeGroupOptions) {
        super({x: options.x, y: options.y}, options.hash);
        this.positionOrigin = {x: options.x, y: options.y};
    }

    protected updateShapeData(shape: CGImage): CGImage {
        return shape.update({
            x: this.positionOrigin.x + shape.getShape().x,
            y: this.positionOrigin.y + shape.getShape().y
        });
    }

    addShapes(shapes: CGImage[]): ECShapesGroup {
        shapes.forEach((shape) => {
            this.shapes[shape.getHash()] = this.updateShapeData(shape);
        });
        return this;
    }

}

export {
    ECShapeGroupOptions,
    ECShapesGroup
}