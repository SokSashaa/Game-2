import { ECScene } from './Scene';

interface ECScenesMap {
    [key: number]: ECScene;
}

class ECScenesController {
    private readonly scenes: ECScenesMap = {};
    private activeScene: ECScene;

    private isIdExists(id: number): boolean {
        return !this.scenes[id];
    }

    addScene(scene: ECScene): void {
        if (this.isIdExists(scene.getId())) {
            this.scenes[scene.getId()] = scene;
        } else {
            console.warn('Такой id сцены уже существует');
        }
    }

    getScene(id: number): ECScene {
        this.activeScene = this.scenes[id];
        return this.getActive();
    }

    getActive(): ECScene {
        return this.activeScene;
    }

    async loadScene(id: number) {
        return await this.scenes[id].loadAssets();
    }
}

export {
    ECScenesController
};