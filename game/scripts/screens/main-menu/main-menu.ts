import {CG} from '../../../../src/CG';
import { GameScreen, State } from '../../levels-config';
import { PopUpsIds } from './cfg/config';

const mainMenuAssets = [
    CG.Assets.createAsset('../game/assets/menu/background.png').setName('back'),
    CG.Assets.createAsset('../game/assets/menu/sign.png').setName('sign'),
    CG.Assets.createAsset('../game/assets/menu/continue-pack.png').setName('continuePack'),
    CG.Assets.createAsset('../game/assets/menu/rules-pack.png').setName('rulesPack'),
    CG.Assets.createAsset('../game/assets/menu/start-pack.png').setName('startPack'),
    CG.Assets.createAsset('../game/assets/menu/exit.png').setName('exitBtn')
];
const mainMenuScene = CG.Scenes.createScene(GameScreen.mainMenu).addAssets(mainMenuAssets).addShapes((S) => [
    CG.Shapes.Image({
        hash: 1,
        image: S.getAsset('back').image(),
        x: 0,
        y: 0,
        radius: 20,
        height: 970,
        width: 1920
    }),
    CG.Shapes.Image({
        image: S.getAsset('sign').image(),
        x: 75,
        y: 120,
        radius: 20,
        height: 750,
        width: 750 * S.getAsset('sign').widthToHeight()
    }),
    CG.Shapes.Image({
        image: S.getAsset('continuePack').image(),
        x: 500,
        y: 420,
        radius: 20,
        height: 500,
        width: 500 * S.getAsset('continuePack').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
        if (State.lastSceneId !== null) {
            M.canvasObject.drawScene(State.lastSceneId);
        }
    }),
    CG.Shapes.Image({
        image: S.getAsset('rulesPack').image(),
        x: 840,
        y: 420,
        radius: 20,
        height: 500,
        width: 500 * S.getAsset('rulesPack').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (c, meta) => {
        meta.canvasObject.drawPopUp(PopUpsIds.gameRules);
    }),
    CG.Shapes.Image({
        image: S.getAsset('startPack').image(),
        x: 1150,
        y: 420,
        radius: 20,
        height: 500,
        width: 500 * S.getAsset('startPack').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (coords, meta) => {
        meta.canvasObject.drawPopUp(PopUpsIds.characterSelect);
    }),
    CG.Shapes.Image({
        image: S.getAsset('exitBtn').image(),
        x: 1350,
        y: 20,
        radius: 20,
        height: 160,
        width: 160 * S.getAsset('exitBtn').widthToHeight()
    }).setName('exitBtn').addEventListener(CG.consts.ECEvents.click, () => {
        (window as any).testStat.gameEnd();
    })
]);


export {
    mainMenuScene
};
