import {CG} from '../../../../src/CG';
import { PopUpsIds } from './cfg/config';

const levelAssets = [
    CG.Assets.createAsset('../game/assets/level-2/wrong.png').setName('wrong'),
    CG.Assets.createAsset('../game/assets/all/got.png').setName('done')
];
const levelScene = CG.Scenes.createPopUp(PopUpsIds.wrong).addAssets(levelAssets).addShapes((S) => [
    CG.Shapes.Image({
        hash: 12000,
        image: S.getAsset('wrong').image(),
        x: 700 - 350 * S.getAsset(`wrong`).widthToHeight() / 2,
        y: 485 - 350,
        radius: 20,
        height: 700,
        width: 700 * S.getAsset(`wrong`).widthToHeight()
    }),
    CG.Shapes.Rect({
        hash: 11999,
        x: 0,
        y: 0,
        radius: 0,
        height: 970,
        width: 1920,
        fillColor: '#cccccca6'
    }).addEventListener(CG.consts.ECEvents.click, () => {return;}),
    CG.Shapes.Image({
        hash: 12001,
        image: S.getAsset('done').image(),
        x: 800,
        y: 620,
        radius: 20,
        height: 100,
        width: 100 * S.getAsset('done').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (c, _) => {
        _.canvasObject.hidePopUp(PopUpsIds.wrong);
    }),
]);

export {
    levelScene as level2Wrong
};