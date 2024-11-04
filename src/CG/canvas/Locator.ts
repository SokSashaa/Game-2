import { IPoint } from '../../interface/locator.interfaces';

export default class DOMLocator {
    static isCrossing(event: Event, element: HTMLCanvasElement): boolean {
        const rect: DOMRect = element.getBoundingClientRect();
        const canvasSize = {
            width: element.width,
            height: element.height
        };

        const scroll = this.getScrollPosition();

        if ((event as MouseEvent).pageX || (event as MouseEvent).pageY) {
            return (Math.ceil(rect.y) + scroll.y <= (event as MouseEvent).pageY && (event as MouseEvent).pageY <= Math.ceil(rect.y) + scroll.y + canvasSize.height) &&
                (Math.ceil(rect.x) + scroll.x <= (event as MouseEvent).pageX && (event as MouseEvent).pageX <= Math.ceil(rect.x) + scroll.x + canvasSize.width);
        } else {
            return (Math.ceil(rect.y) + scroll.y <= (event as TouchEvent).touches[0].pageY && (event as TouchEvent).touches[0].pageY <= Math.ceil(rect.y) + scroll.y + canvasSize.height) &&
                (Math.ceil(rect.x) + scroll.x <= (event as TouchEvent).touches[0].pageX && (event as TouchEvent).touches[0].pageX <= Math.ceil(rect.x) + scroll.x + canvasSize.width);
        }
    }

    static getCanvasCoordinates(event: Event, canvas: HTMLCanvasElement): IPoint {
        const scroll = this.getScrollPosition();
        if ((event as MouseEvent).pageX || (event as MouseEvent).pageY) {
            return {
                x: (event as MouseEvent).pageX,
                y: (event as MouseEvent).pageY
            };
        } else {
            return {
                x: (event as TouchEvent).touches[0].pageX - Math.ceil(canvas.getBoundingClientRect().x) - scroll.x,
                y: (event as TouchEvent).touches[0].pageY - Math.ceil(canvas.getBoundingClientRect().y) - scroll.y
            };
        }

    }

    static getScrollPosition(): IPoint {
        return {
            x: Math.ceil(window.scrollX),
            y: Math.ceil(window.scrollY)
        };
    }
}