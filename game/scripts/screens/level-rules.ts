import {CG} from '../../../src/CG';
import { GameScreen, Levels, State } from '../levels-config';

function createLevelRulesScreen(id: number, assetsRulesName, levelCountSource, nexLvlId: number) {
    return CG.Scenes.createScene(id).addAssets([...levelRulesAssets,
        CG.Assets.createAsset(assetsRulesName).setName('rules'),
        CG.Assets.createAsset(levelCountSource).setName('lvl1')]).addShapes((S) => [
        CG.Shapes.Image({
            hash: 12,
            image: S.getAsset('back').image(),
            x: 0,
            y: 0,
            radius: 20,
            height: 970,
            width: 1920
        }),
        CG.Shapes.Image({
            hash: 13,
            image: S.getAsset('rules').image(),
            x: 100,
            y: 20,
            radius: 20,
            height: 750,
            width: 750 * S.getAsset('rules').widthToHeight()
        }),
        CG.Shapes.Image({
            hash: 14,
            image: S.getAsset('lvl1').image(),
            x: 870,
            y: 320,
            radius: 20,
            height: 650,
            width: 650 * S.getAsset('lvl1').widthToHeight()
        }),
        CG.Shapes.Image({
            hash: 15,
            image: S.getAsset('menu').image(),
            x: 40,
            y: 810,
            radius: 20,
            height: 140,
            width: 140 * S.getAsset('menu').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
            M.canvasObject.drawScene(GameScreen.mainMenu);
            State.lastSceneId = id;
        }),
        CG.Shapes.Image({
            hash: 16,
            image: S.getAsset('startRules').image(),
            x: 1700,
            y: 40,
            radius: 20,
            height: 200,
            width: 200 * S.getAsset('startRules').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
            M.canvasObject.drawScene(nexLvlId);
            (window as any).testStat.enterLevel({'answer_number': nexLvlId});
        })
    ]);
}

const levelRulesAssets = [
    CG.Assets.createAsset('../game/assets/menu/background.png').setName('back'),
    CG.Assets.createAsset('../game/assets/level-1/start.png').setName('startRules'),
    CG.Assets.createAsset('../game/assets/character/menu.png').setName('menu')
];

const scenes = [
    createLevelRulesScreen(GameScreen.level2Rules, '../game/assets/level-1/rules.png', '../game/assets/level-2/lvl2.png', Levels.one),
    createLevelRulesScreen(GameScreen.level1Rules, '../game/assets/level-2/rules.png', '../game/assets/level-1/lvl1.png', Levels.two),
];

export {
    scenes as levelsRulesScene
};