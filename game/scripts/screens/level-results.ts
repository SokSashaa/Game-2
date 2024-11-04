import {CG} from '../../../src/CG';
import { GameScreen, Levels } from '../levels-config';

function createResultScreen(id: number, resultAssetSource: string, nextSceneId: number) {
    return CG.Scenes.createScene(id).addAssets([...resultsAssets,
        CG.Assets.createAsset(resultAssetSource).setName('results'),
    ]).addShapes((S) => [
        CG.Shapes.Image({
            hash: 1,
            image: S.getAsset('levelBackground').image(),
            x: 0,
            y: 0,
            radius: 20,
            height: 970,
            width: 1920
        }),
        CG.Shapes.Image({
            hash: 2,
            image: S.getAsset('results').image(),
            x: 700 - 350 * S.getAsset('results').widthToHeight() / 2,
            y: 485 - 350,
            radius: 20,
            height: 700,
            width: 700 * S.getAsset('results').widthToHeight()
        }),
        CG.Shapes.Image({
            hash: 3,
            image: S.getAsset('done').image(),
            x: 800,
            y: 620,
            radius: 20,
            height: 100,
            width: 100 * S.getAsset('done').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
            M.canvasObject.drawScene(nextSceneId);
        }),
        CG.Shapes.Image({
            hash: 4,
            image: S.getAsset('cookie').image(),
            x: 300,
            y: 500,
            radius: 20,
            height: 400,
            width: 400 * S.getAsset('cookie').widthToHeight()
        }),
    ]);
}

const resultsAssets = [
    CG.Assets.createAsset('../game/assets/level-1/back.png').setName('levelBackground'),
    CG.Assets.createAsset('../game/assets/all/good.png').setName('done'),
    CG.Assets.createAsset('../game/assets/all/cookie.png').setName('cookie')
];

const scenes = [
    createResultScreen(GameScreen.level1Results, '../game/assets/level-2/results.png', GameScreen.level2Rules),
    createResultScreen(GameScreen.level2Good, '../game/assets/payment/results/result_good.png', GameScreen.mainMenu),
    createResultScreen(GameScreen.level2Normal, '../game/assets/payment/results/results_normanl.png', GameScreen.mainMenu),
    createResultScreen(GameScreen.level2Bad, '../game/assets/payment/results/results_bad.png', GameScreen.mainMenu),
];

export {
    scenes as resultScenes
};