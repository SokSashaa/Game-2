import {Canvas} from './CG/canvas/Canvas';
import {arc as Arc, image as Image, rect as Rect, SType, ECEvents} from './CG/shapes.lib';
import {CGCanvasListenEvents as Events, ICanvasOptions} from './interface/canvas.interfaces';
import { ImageLoader, createScene } from './CG/utils.lib';

import { ECScenes as Scenes } from './CG/scenes.lib';
import { ECAssets as Assets } from './CG/assets.lib';

function init(document: Document, options?: ICanvasOptions): Canvas {
    return new Canvas(document, options);
}

const CG = {
    Canvas: {
        init,
        Events
    },
    Shapes: {
        Arc,
        Image,
        Rect,
        SType
    },
    Scenes,
    Assets,
    Utils: {
        ImageLoader,
        createScene
    },
    consts: {
        ECEvents
    }
};

export {
    CG
};
