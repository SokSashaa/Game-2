import {CG} from '../../../../src/CG';
import {PopUpsIds} from './cfg/config';

function getPopUp(id: number, assetName: string) {
    return CG.Scenes.createPopUp(id).addAssets(levelAssets).addShapes((S) => [
        CG.Shapes.Image({
            hash: 12000,
            image: S.getAsset(assetName).image(),
            x: 820 - 380 * S.getAsset(assetName).widthToHeight() / 2,
            y: 485 - 450,
            radius: 20,
            height: 760,
            width: 760 * S.getAsset(assetName).widthToHeight()
        }),
        CG.Shapes.Rect({
            hash: 11999,
            x: 0,
            y: 0,
            radius: 0,
            height: 970,
            width: 1920,
            fillColor: '#cccccca6'
        }).addEventListener(CG.consts.ECEvents.click, () => { return; }),
        CG.Shapes.Image({
            hash: 12001,
            image: S.getAsset('done').image(),
            x: 800,
            y: 840,
            radius: 20,
            height: 100,
            width: 100 * S.getAsset('done').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (c, _) => {
            _.canvasObject.hidePopUp(id);
        })
    ]);
}

const levelAssets = [
    CG.Assets.createAsset('../game/assets/level-2/c1.png').setName('card-1'),
    CG.Assets.createAsset('../game/assets/level-2/c2.png').setName('card-2'),
    CG.Assets.createAsset('../game/assets/level-2/c3.png').setName('card-3'),
    CG.Assets.createAsset('../game/assets/level-2/c4.png').setName('card-4'),
    CG.Assets.createAsset('../game/assets/level-2/c5.png').setName('card-5'),
    CG.Assets.createAsset('../game/assets/level-2/c6.png').setName('card-6'),
    CG.Assets.createAsset('../game/assets/level-2/c7.png').setName('card-7'),
    CG.Assets.createAsset('../game/assets/level-2/c8.png').setName('card-8'),
    CG.Assets.createAsset('../game/assets/all/got.png').setName('done')
];
const cardPopUps = [
    getPopUp(PopUpsIds.card1, 'card-1'),
    getPopUp(PopUpsIds.card2, 'card-2'),
    getPopUp(PopUpsIds.card3, 'card-3'),
    getPopUp(PopUpsIds.card4, 'card-4'),
    getPopUp(PopUpsIds.card5, 'card-5'),
    getPopUp(PopUpsIds.card6, 'card-6'),
    getPopUp(PopUpsIds.card7, 'card-7'),
    getPopUp(PopUpsIds.card8, 'card-8')
];

export {
    cardPopUps as level2PopUps
};