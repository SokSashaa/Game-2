import { IPoint } from '../../interface/locator.interfaces';
import {Canvas} from '../canvas/Canvas';

type ECEventHandler = (coordinates: IPoint, meta: ECEventMeta) => void;

interface ECShape {
    getCoordinates(): IPoint;
}

interface ECEventMeta {
    event: Event;
    canvasObject: Canvas;
    shape: CGShape;
}

interface ECEventListener {
    type: ECEvents;
    handler: ECEventHandler;
}

enum ECEvents {
    click = 'click',
    mousedown = 'mousedown',
    mouseover = 'mouseover',
    dragend = 'dragend',
    dblclick = 'dblclick',
    drag = 'drag'
}

enum ShapeType {
    arc,
    rect,
    image
}

class CGShape implements ECShape {
    protected readonly hash: number = Math.floor(Math.random() * (3000 - 100 + 1) + 100);
    protected type: ShapeType;
    protected coordinates: IPoint;
    private name: string;
    protected eventListeners: ECEventListener[] = [];
    protected draggable: boolean = false;
    protected target: boolean = false;

    constructor(coords: IPoint, hash: number = 0) {
        this.coordinates = coords;
        if (hash && hash > 0) {
            this.hash = hash;
        }
    }

    getHash(): number {
        return this.hash;
    }

    getType(): ShapeType {
        return this.type;
    }

    getCoordinates(): IPoint {
        return this.coordinates;
    }

    getShape(): void {
        return;
    }

    setName(name: string): CGShape {
        this.name = name;
        return this;
    }

    getName(): string {
        return this.name;
    }

    addEventListener(event: ECEvents, handler: ECEventHandler): CGShape {
        this.eventListeners.push({type: event, handler});
        return this;
    }

    getEventListeners(): ECEventListener[] {
        return this.eventListeners;
    }

    setDraggable(value: boolean): CGShape {
        return this;
    }

    setTarget(value: boolean): CGShape {
        return this;
    }

    isDraggable(): boolean {
        return this.draggable;
    }

    isTarget(): boolean {
        return this.target;
    }
}

export {
    CGShape,
    ShapeType,
    ECEvents
};