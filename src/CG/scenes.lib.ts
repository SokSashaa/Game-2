import { ECScene, ECPopUp } from './scene/Scene';
import { ECScenesController } from './scene/ScenesController';

function createScene(id: number): ECScene {
    return new ECScene(id);
}

function createPopUp(id: number): ECPopUp {
    return new ECPopUp(id);
}

const ECScenes = {
    createScene,
    createPopUp
}

export {
    ECScenes,
    ECScene,
    ECPopUp,
    ECScenesController
};