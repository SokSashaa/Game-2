import DOMLocator from './Locator';
import CGPainter from './painter';
import {IPoint} from '../../interface/locator.interfaces';
import {ICanvasOptions, IEventMeta} from '../../interface/canvas.interfaces';
import {ECEvents, Shape} from '../shapes.lib';
import {ECScenesController} from '../scene/ScenesController';
import {ECScene, ECPopUp} from '../scenes.lib';

interface ObjectMap {
    [key: number]: Shape;
}

interface MousePressedData {
    isPressed: boolean;
    shape: Shape
}

const LOCATOR = DOMLocator;

/**
 * CGLib canvas.
 */
export class Canvas {
    private CanvasDOMElement: HTMLCanvasElement = null;
    private Painter: CGPainter = null;
    protected readonly DOM: Document = null;
    protected readonly sceneController = new ECScenesController();
    protected objects: ObjectMap = {};
    protected mousePressedData: MousePressedData = {
        isPressed: false,
        shape: null
    };
    private _lastPoints: IPoint = {x: null, y: null}
    private _options = null;

    constructor(document: Document, options?: ICanvasOptions) {
        this.DOM = document;
        if (options.selector) {
            this.CanvasDOMElement = this._initFromSelector(options.selector);
            this.Painter = new CGPainter(this.getContext2D());
        }

        if (options.events) {
            this._subscribeOnClick(options.events[0].handler);
            this._subscribeOnMouseOver(options.events[1].handler);
            this._subscribeOnMouseDown();
            this._subscribeOnMouseUp();
            this._subscribeOnDoubleClick();
            this._subscribeOnWindowResize();
            this._options = options;
        }

        this.startPainter();
        this.setCanvasScale();
    }

    /**
     * Init reference on existing canvas with custom selector.
     * @param selector - css selector for target canvas
     * @private
     */
    private _initFromSelector(selector: string): HTMLCanvasElement {
        return this.DOM.querySelector(selector);
    }

    /**
     * Creates subscription on click event.
     * @param handler - custom callback function.
     * @private
     */
    private _subscribeOnClick(handler: (coordinates: IPoint, eventMeta: IEventMeta) => any): void {
        this.CanvasDOMElement.addEventListener('click', (event) => {
            if (!LOCATOR.isCrossing(event, this.CanvasDOMElement)) return;

            const coordinates: IPoint = LOCATOR.getCanvasCoordinates(event, this.CanvasDOMElement);
            coordinates.x = coordinates.x * (1920 / window.innerWidth)
            coordinates.y = coordinates.y * (970 / window.innerHeight)
            const crossedShapes = [];

            for (const hash of Object.keys(this.objects)) {
                const shape = this.objects[hash];
                const size = shape.getShape();
                
                if ( (size.x <= coordinates.x && size.x + size.width >= coordinates.x) &&
                     (size.y <= coordinates.y && size.y + size.height >= coordinates.y)) {
                        crossedShapes.push(shape);
                     }
            }

            let eventListenersShapes = [];


            crossedShapes.forEach((shape: Shape) => {
                shape.getEventListeners().forEach((listener) => {
                    if (listener.type === ECEvents.click) {
                        eventListenersShapes.push(shape);
                    }
                });
            });

            eventListenersShapes = eventListenersShapes.sort((a, b) => {
                if (a.getHash() > b.getHash()) {
                    return 1
                }
                if (a.getHash() < b.getHash()) {
                    return -1
                }
                return 0
            });

            if (eventListenersShapes.length) {
                eventListenersShapes[eventListenersShapes.length - 1].getEventListeners().forEach((listener) => {
                    if (listener.type === ECEvents.click) {
                        listener.handler(coordinates, {
                            event,
                            canvasObject: this,
                            shape: eventListenersShapes[eventListenersShapes.length - 1]
                        });
                    }
                });
            }

            handler(coordinates, {
                    event,
                    target: this.CanvasDOMElement,
                    shapes:crossedShapes
                });
        });
    }

    /**
     * Creates subscription on click event.
     * @param handler - custom callback function.
     * @private
     */
    private _subscribeOnDoubleClick(): void {
        this.CanvasDOMElement.addEventListener('dblclick', (event) => {
            if (!LOCATOR.isCrossing(event, this.CanvasDOMElement)) return;

            const coordinates: IPoint = LOCATOR.getCanvasCoordinates(event, this.CanvasDOMElement);
            const crossedShapes = [];
            coordinates.x = coordinates.x * (1920 / window.innerWidth)
            coordinates.y = coordinates.y * (970 / window.innerHeight)

            for (const hash of Object.keys(this.objects)) {
                const shape = this.objects[hash];
                const size = shape.getShape();

                if ( (size.x <= coordinates.x && size.x + size.width >= coordinates.x) &&
                    (size.y <= coordinates.y && size.y + size.height >= coordinates.y)) {
                    crossedShapes.push(shape);
                }
            }

            crossedShapes.forEach((shape: Shape) => {
                shape.getEventListeners().forEach((listener) => {
                    if (listener.type === ECEvents.dblclick) {
                        listener.handler(coordinates, {
                            event,
                            canvasObject: this,
                            shape
                        });
                    }
                });
            });
        });
    }

    /**
     * Creates subscription on click event.
     * @param handler - custom callback function.
     * @private
     */
     private _subscribeOnMouseOver(handler: (coordinates: IPoint, eventMeta: IEventMeta) => any): void {
       const test = (event) => {
            if (!LOCATOR.isCrossing(event, this.CanvasDOMElement)) return;

            const coordinates: IPoint =  LOCATOR.getCanvasCoordinates(event, this.CanvasDOMElement);
            coordinates.x = coordinates.x * (1920 / window.innerWidth);
            coordinates.y = coordinates.y * (970 / window.innerHeight);

            this._lastPoints = {x: coordinates.x, y: coordinates.y};

            if (this.mousePressedData.isPressed && this.mousePressedData.shape) {
                this.mousePressedData.shape.getEventListeners().forEach(listener => {
                    if (listener.type === ECEvents.mouseover) {
                        listener.handler(coordinates, {
                            event,
                            canvasObject: this,
                            shape: this.mousePressedData.shape
                        });
                    }
                })
            }

            const shapes = [];
            handler(coordinates, {
                event,
                target: this.CanvasDOMElement,
                shapes
            });
        }
        window.addEventListener('mousemove', test);
        this.CanvasDOMElement.addEventListener('touchmove', test);
    }

    private _subscribeOnMouseDown(): void {
         const test = (event) => {
             if (!LOCATOR.isCrossing(event, this.CanvasDOMElement)) return;

             this.mousePressedData.isPressed = true;
             const coordinates: IPoint = LOCATOR.getCanvasCoordinates(event, this.CanvasDOMElement);
             coordinates.x = coordinates.x * (1920 / window.innerWidth)
             coordinates.y = coordinates.y * (970 / window.innerHeight)
             const crossedShapes = [];

             for (const hash of Object.keys(this.objects)) {
                 const shape = this.objects[hash];
                 const size = shape.getShape();

                 if ( (size.x <= coordinates.x && size.x + size.width >= coordinates.x) &&
                     (size.y <= coordinates.y && size.y + size.height >= coordinates.y)) {
                     crossedShapes.push(shape);
                 }
             }

             crossedShapes.forEach((shape: Shape) => {
                 if (shape.isDraggable()) {
                     this.mousePressedData.shape = shape;
                 }
             });
         };
        this.CanvasDOMElement.addEventListener('mousedown', test);
        this.CanvasDOMElement.addEventListener('touchstart', test);
    }

    private _subscribeOnMouseUp(): void {
         const test = (event, flag = false) => {
             // if (flag) {
             //     if (!LOCATOR.isCrossing(event, this.CanvasDOMElement)) return;
             // } else {
             //     if (!LOCATOR.isCrossing(event, this.CanvasDOMElement)) return;
             // }

             let coordinates: IPoint = null;
             if (!flag) {
                 coordinates = LOCATOR.getCanvasCoordinates(event, this.CanvasDOMElement);
                 coordinates.x = coordinates.x * (1920 / window.innerWidth)
                 coordinates.y = coordinates.y * (970 / window.innerHeight)
             } else {
                 coordinates = this._lastPoints;
             }

             const crossedShapes = [];

             for (const hash of Object.keys(this.objects)) {
                 const shape = this.objects[hash];
                 const size = shape.getShape();

                 if ( (size.x <= coordinates.x && size.x + size.width >= coordinates.x) &&
                     (size.y <= coordinates.y && size.y + size.height >= coordinates.y)) {
                     crossedShapes.push(shape);
                 }
             }

             crossedShapes.forEach((el) => {
                 if (el.isTarget()) {
                     el.getEventListeners().forEach((listener) => {
                         if (listener.type === ECEvents.dragend) {
                             listener.handler(coordinates, {event, canvasObject: this, shape: this.mousePressedData.shape});
                         }
                     });
                 }
             });

             this.mousePressedData.isPressed = false;
             this.mousePressedData.shape = null;
         };
        const touch = (event) => {
            test(event, true);
        }
        this.CanvasDOMElement.addEventListener('mouseup', test);
        this.CanvasDOMElement.addEventListener('touchend', touch);
    }

    /**
     * Checks if class has reference on canvas element.
     * @private
     */
    private _isExecutable(): boolean {
        return !!this.CanvasDOMElement;
    }

    /**
     * Get canvas 2DContext.
     * @private
     */
    private getContext2D(): CanvasRenderingContext2D {
        return this.CanvasDOMElement.getContext('2d');
    }

    private startPainter(): void {
        this.redrawShapes();
        requestAnimationFrame(this.startPainter.bind(this));
    }

    private redrawShapes(): void {
        this.getContext2D().clearRect(0, 0, this.CanvasDOMElement.width, this.CanvasDOMElement.height);
        for (const hash of Object.keys(this.objects)) {
            if (this.objects[hash]) {
                this.Painter.drawShape(this.objects[hash]);
            }
        }
    }

    private setCanvasScale(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.CanvasDOMElement.width = width;
        this.CanvasDOMElement.height = height;
        this.CanvasDOMElement.style.width = width + 'px';
        this.CanvasDOMElement.style.height = height + 'px';
    }

    protected _subscribeOnWindowResize(): void {
        window.addEventListener('resize', () => {
            // const width = window.innerWidth;
            // const height = window.innerHeight;
            // const cnv = document.createElement('canvas');
            // cnv.setAttribute('id', this.CanvasDOMElement.id);
            // cnv.setAttribute('height', height + 'px');
            // cnv.setAttribute('width', width + 'px');
            // document.getElementById(this.CanvasDOMElement.id).remove();
            // document.getElementById('test123').append(cnv);
            // this.CanvasDOMElement = document.getElementById('j3r901h390r') as any;
            // this.Painter = new CGPainter(this.getContext2D());
            // this._subscribeOnMouseOver(this._options.events[1].handler)
            this.setCanvasScale();
        });
    }

    draw(shape: Shape | Shape[]): void {
        if (Array.isArray(shape)) {
            for (const obj of shape) {
                this.draw(obj);
            }
        } else {
            this.objects[shape.getHash()] = shape;
        }
    }

    drawScene(sceneId: number): void {
        this.objects = {};
        if (this.sceneController.getScene(sceneId).isLoaded()) {
            this.objects = this.sceneController.getScene(sceneId).getShapes();
        } else {
            this.sceneController.loadScene(sceneId).then((scene) => {
                this.drawScene(scene.getId());
            });
        }
    }

    drawPopUp(popup: number): void {
        if (this.sceneController.getScene(popup).isLoaded()) {
            this.objects = Object.assign(this.objects, this.sceneController.getScene(popup).getShapes());
        } else {
            this.sceneController.loadScene(popup).then((scene) => {
                this.drawPopUp(scene.getId());
            });
        }
    }

    hidePopUp(popup: number): void {
        const keys = Object.keys((this.sceneController.getScene(popup) as ECPopUp).getEmptyScene());
        for (const key of keys) {
            delete this.objects[key];
        }
    }

    clearScene(): Canvas {
        this.objects = {};
        return this;
    }

    getObjects(): ObjectMap {
        return this.objects;
    }

    addScene(scene: ECScene): Canvas {
        this.sceneController.addScene(scene);
        return this;
    }

}