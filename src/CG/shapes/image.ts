import {CGRect, ECRect} from './rectangle';
import {ECEvents, ShapeType} from './shape';
import {IPoint} from "../../interface/locator.interfaces";

interface ECImage {
    hash?: number;
    x: number;
    y: number;
    height: number;
    width: number;
    radius: number;
    image: HTMLImageElement;
}

interface ECNewImage {
    hash?: number;
    x?: number;
    y?: number;
    height?: number;
    width?: number;
    radius?: number;
    image?: HTMLImageElement;
}


class CGImage extends CGRect {
    private image: ECImage;
    private originalPos: IPoint = null;

    constructor(imageOptions: ECImage) {
        super(imageOptions as ECRect);
        this.type = ShapeType.image;
        this.image = imageOptions;
        this.originalPos = {x: imageOptions.x, y: imageOptions.y};
    }

    getShape(): ECImage {
        return this.image;
    }

    update(newSize: ECNewImage): CGImage {
        this.image = Object.assign(this.image, newSize);
        return this;
    }

    override setDraggable(value: boolean): CGImage {
        if (!value) return this;
        this.draggable = value;

        this.eventListeners.push({type: ECEvents.mouseover, handler: (coords, meta) => {
                this.update({x: coords.x - this.image.width / 2, y: coords.y - this.image.height / 2});
                this.eventListeners.forEach(el => {
                    if (el.type === ECEvents.drag) {
                        el.handler(coords, meta);
                    }
                });
            }});
        return this;
    }

    override setTarget(value: boolean): CGImage {
        if (!value) return this;
        this.target = value;
        const listener = this.eventListeners.filter((el) => {
            if (el.type === ECEvents.dragend) {
                return el;
            }
        });
        if (!listener.length) {
            this.eventListeners.push({type: ECEvents.dragend, handler: (coords, meta) => {
                    (meta.shape as CGImage).update({x: this.image.x, y: this.image.y});
                }});
        } else {
            this.eventListeners.map(el => {
                if (el.type === ECEvents.dragend) {
                    el.handler = el.handler.bind(this);
                }
            })
        }
        return this;
    }
}

export {
    CGImage,
    ECImage
};