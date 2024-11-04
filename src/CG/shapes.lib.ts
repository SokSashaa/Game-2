import {CGShape, ShapeType, ECEvents} from './shapes/shape';
import {CGArc as Arc, ECArc} from './shapes/arc';
import {CGImage as Image, ECImage} from './shapes/image';
import {CGRect as Rect, ECRect} from './shapes/rectangle';
import { ECShapesGroup as ShapeGroup, ECShapeGroupOptions } from './shapes/shapes-group';

function arc(options: ECArc): Arc {
    return new Arc(options);
}

function image(options: ECImage): Image {
    return new Image(options);
}

function rect(options: ECRect): Rect {
    return new Rect(options);
}

function group(options: ECShapeGroupOptions): ShapeGroup {
    return new ShapeGroup(options);
}

export {
    CGShape as Shape,
    Arc,
    Image,
    Rect,
    ShapeGroup,
    ShapeType as SType,
    ECEvents,
    arc,
    image,
    rect,
    group
}