import { Shape, Image } from '../shapes.lib';
import { ECAsset } from '../assets.lib';
import { ECAssetsLoader } from '../assets.lib';
import { ECLoadedAsset } from '../assets/Asset';

type ShapesInitializer = (assets: ECScene) => Shape[];

interface AssetMap {
    [key: string]: ECLoadedAsset
}

interface ObjectsMap {
    [key: string]: Shape
}

class ECScene {
    protected readonly id: number;
    protected readonly assets: AssetMap = {};
    protected shapes: ObjectsMap = {};
    protected readonly loader = new ECAssetsLoader();
    protected shapesInitializeFunction: ShapesInitializer;
    protected loaded: boolean = false;
    protected active: boolean = false;

    constructor(id?: number) {
        this.id = id;
    }

    addAsset(source: ECAsset): ECScene {
        return this;
    }

    addAssets(sources: ECAsset[]): ECScene {
        this.loader.add(sources);
        return this;
    }

    addShapes(callback: ShapesInitializer): ECScene {
        this.shapesInitializeFunction = callback;
        return this;
    }

    getId(): number {
        return this.id;
    }

    getAsset(name: string): ECLoadedAsset {
        return this.assets[name];
    }

    getShapes(): ObjectsMap {
        return this.shapes;
    }

    isLoaded(): boolean {
        return this.loaded;
    }

    activate(): ECScene {
        this.active = true;
        return this;
    }

    deactivate(): ECScene {
        this.active = false;
        return this;
    }

    isActive(): boolean {
        return this.active;
    }

    reload(): ECScene {
        const shapes = this.shapesInitializeFunction(this);
        for (const shape of shapes) {
            this.shapes[shape.getHash()] = shape;
        }
        return this;
    }

    updateShape(hash: number, options): void {
        if (Object.keys(this.shapes).length && this.shapes[hash]) {
            (this.shapes[hash] as Image).update(options);
        }
    }

    updateShapeAsset(hash: number, assetName: string): void {
        if (Object.keys(this.shapes).length && this.shapes[hash]) {
            (this.shapes[hash] as Image).update({
                image: this.getAsset(assetName).image(),
                width: (this.shapes[hash] as Image).getShape().height * this.getAsset(assetName).widthToHeight()})
        }
    }

    async loadAssets(): Promise<ECScene> {
        const assests = await this.loader.load();
        for (const asset of assests) {
            this.assets[(asset as ECLoadedAsset).getName()] = (asset as ECLoadedAsset);
        }
        this.reload();
        this.loaded = true;
        return this;
    }
}


class ECPopUp extends ECScene {
    protected _options: any = {};

    constructor(id: number) {
        super(id);
    }

    getEmptyScene(): ObjectsMap {
        const res = {};
        for (const x of Object.keys(this.shapes)) {
            res[x] = null;
        }
        return res;
    }
}

export {
    ECScene,
    ECPopUp
};