import {Arc, Rect, Image, Shape, SType} from '../shapes.lib';

export default class CGPainter {
    protected readonly context: CanvasRenderingContext2D;
    protected scaleCoeffs: {width: number, height: number};
    protected defaultScreenSizes: {height: number, width: number} = {height: 970, width: 1920};
    protected deviceScreenSizes: {height: number, width: number} = {height: window.innerHeight, width: window.innerWidth};
    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.windowResize();
        this.subscribeOnResize();
    }

    private windowResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.scaleCoeffs = { width: width / this.defaultScreenSizes.width, height: height / this.defaultScreenSizes.height };
    }

    private subscribeOnResize(): void {
        window.addEventListener('resize', () => {
            this.windowResize();
        });
    }

    private drawArc(arc: Arc): void {
        const size = arc.getShape();
        this.context.beginPath();
        this.context.arc(size.x, size.y, size.radius, size.startAngle, size.endAngle);
        this.context.stroke();
    }

    private drawRect(rect: Rect): void {
        const size = rect.getShape();
        this.context.beginPath();
        if (this.context.fillStyle) {
            this.context.fillStyle = size.fillColor;
            this.context.fillRect(size.x  * this.scaleCoeffs.width, size.y  * this.scaleCoeffs.height, size.width  * this.scaleCoeffs.width, size.height  * this.scaleCoeffs.height);
        } else {
            this.context.rect(size.x, size.y, size.width, size.height);
        }
        this.context.stroke();
    }

    private drawImage(image: Image): void {
        const size = image.getShape();
        const scaleFitNative = Math.min(window.innerWidth / this.defaultScreenSizes.width, window.innerHeight / this.defaultScreenSizes.height)
        // this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.beginPath();
        this.context.drawImage(size.image, size.x  * this.scaleCoeffs.width, size.y  * this.scaleCoeffs.height, size.width  * this.scaleCoeffs.width, size.height  * this.scaleCoeffs.height);
        this.context.stroke();
    }

    drawShape(shape: Shape): void {
        switch (shape.getType()) {
            case SType.arc:
                this.drawArc(shape as Arc);
                return;
            case SType.rect:
                this.drawRect(shape as Rect);
                return;
            case SType.image:
                this.drawImage(shape as Image);
                return;
        }
    }
}