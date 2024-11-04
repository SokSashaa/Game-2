import { ECAsset } from './image-loader';
import { Shape, Image } from '../shapes.lib';

class ECScene {
    private readonly id: number;
    private readonly assets: ECAsset[] = [];
    private readonly shapes: Shape[] = [];

    constructor(id?: number) {
        this.id = id;
    }

    addAsset(source: ECAsset): ECScene {
        this.assets.push(source);
        return this;
    }

    addAssets(sources: ECAsset[]): ECScene {
        this.assets.push(...sources);
        return this;
    }

    addShape(obj: Shape): ECScene {
        this.shapes.push(obj);
        return this;
    }

    addShapes(objs: Shape[]): ECScene {
        this.shapes.push(...objs);
        return this;
    }

    updateShape(hash: number, options: any): void {
        this.shapes.map(shape => {
            if (shape.getHash() === hash) {
                (shape as Image).update(options);
            }
        });
    }
}

export {
    ECScene
};