import { ImageLoader } from './utils/image-loader';
import { ECScene } from './utils/scene';

function createScene(id: number) {
    return new ECScene(id);
}

export {
    ImageLoader,
    createScene
};