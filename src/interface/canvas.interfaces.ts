import { Shape } from '../CG/shapes.lib';
import { IPoint } from './locator.interfaces';

/**
 * Available canvas event listeners.
 */
enum CGCanvasListenEvents {
    /**
     * Canvas clicked.
     */
    click = 'click',
    mousemove = 'mousemove'
}

/**
 * Canvas event metadata.
 */
interface IEventMeta {
    /**
     * @cfg {Event} Native event object.
     */
    event: Event;

    /**
     * @cfg {HTMLCanvasElement} Canvas DOM element.
     */
    target: HTMLCanvasElement;

    /**
     * @cfg {Shape[]} Shapes, which was crossed in event.
     */
    shapes: Shape[];
}

/**
 * Options for declaring Canvas.
 */
interface ICanvasOptions {
    /**
     * @cfg {String} Query selector for canvas DOM element.
     */
    selector?: string;

    /**
     * @cfg {IEventListener[]} Array of event listeners.
     */
    events?: IEventListener[];
}

/**
 * Event listener.
 */
interface IEventListener {
    /**
     * @cfg{CGCanvasListenEvents} Event type.
     */
    type: CGCanvasListenEvents,

    /**
     * Callback function, which will be executed after event appears.
     * @param {IPoint} coordinates - canvas coordinates where event appeared.
     * @param {IEventMeta} eventMeta
     */
    handler: (coordinates: IPoint, eventMeta: IEventMeta) => any;
}

export {
    CGCanvasListenEvents,
    IEventMeta,
    ICanvasOptions,
    IEventListener
};