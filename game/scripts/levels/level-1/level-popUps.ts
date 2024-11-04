import {CG} from '../../../../src/CG';
import { PopUpsIds } from './cfg/config';

const levelAssets = [
    CG.Assets.createAsset('../game/assets/all/got.png').setName('done')
];

function createPopUp(id: number, assetHintSource: string) {
    return CG.Scenes.createPopUp(id).addAssets([...levelAssets,
        CG.Assets.createAsset(assetHintSource).setName('hint')]).addShapes((S) => [
        CG.Shapes.Image({
            hash: 12000,
            image: S.getAsset('hint').image(),
            x: 700 - 350 * S.getAsset(`hint`).widthToHeight() / 2,
            y: 485 - 350,
            radius: 20,
            height: 700,
            width: 700 * S.getAsset(`hint`).widthToHeight()
        }),
        CG.Shapes.Rect({
            hash: 11999,
            x: 0,
            y: 0,
            radius: 0,
            height: 970,
            width: 1920,
            fillColor: '#cccccca6'
        }),
        CG.Shapes.Image({
            hash: 12001,
            image: S.getAsset('done').image(),
            x: 800,
            y: 670,
            radius: 20,
            height: 100,
            width: 100 * S.getAsset('done').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (c, _) => {
            _.canvasObject.hidePopUp(id);
        }),
    ]);
}

const popUps = [createPopUp(PopUpsIds.hint, '../game/assets/level-1/hints.png')];

export {
    popUps as level1Hints
};