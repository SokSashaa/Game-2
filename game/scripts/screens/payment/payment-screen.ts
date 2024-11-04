import {CG} from '../../../../src/CG';
import { GameScreen, State } from '../../levels-config';
import {PopUpsIds} from './cfg/config';

const VALUES = {
    'hi1': 1,
    'hi2': 2,
    'hi3': 0,
    'no1': 1,
    'no2': 2,
    'no3': 0,
    'y1': 1,
    'y2': 2,
    'y3': 0
}


const ASSETS_PATH = '../game/assets/payment/';
const FIRST_DIALOG_PATH = ASSETS_PATH + '1/', FIRST_ANSWERS_LIST = ['hi1', 'hi2', 'hi3'], firstW = 'w1';
const SECOND_DIALOG_PATH = ASSETS_PATH + '2/', SECOND_ANSWERS_LIST = ['no1', 'no2', 'no3'], secondW = 'w2';
const THIRD_DIALOG_PATH = ASSETS_PATH + '3/', THIRD_ANSWERS_LIST = ['y1', 'y2', 'y3'], thirdW = 'w3';

const FIRST_DIALOG_ASSETS = [
    CG.Assets.createAsset(FIRST_DIALOG_PATH + 'hi1.png').setName(FIRST_ANSWERS_LIST[0]),
    CG.Assets.createAsset(FIRST_DIALOG_PATH + 'hi2.png').setName(FIRST_ANSWERS_LIST[1]),
    CG.Assets.createAsset(FIRST_DIALOG_PATH + 'hi3.png').setName(FIRST_ANSWERS_LIST[2]),
    CG.Assets.createAsset(FIRST_DIALOG_PATH + 'w.png').setName(firstW)
];

const SECOND_DIALOG_ASSETS = [
    CG.Assets.createAsset(SECOND_DIALOG_PATH + 'no1.png').setName(SECOND_ANSWERS_LIST[0]),
    CG.Assets.createAsset(SECOND_DIALOG_PATH + 'no2.png').setName(SECOND_ANSWERS_LIST[1]),
    CG.Assets.createAsset(SECOND_DIALOG_PATH + 'no3.png').setName(SECOND_ANSWERS_LIST[2]),
    CG.Assets.createAsset(SECOND_DIALOG_PATH + 'w.png').setName(secondW)
];

const THIRD_DIALOG_ASSETS = [
    CG.Assets.createAsset(THIRD_DIALOG_PATH + 'y1.png').setName(THIRD_ANSWERS_LIST[0]),
    CG.Assets.createAsset(THIRD_DIALOG_PATH + 'y2.png').setName(THIRD_ANSWERS_LIST[1]),
    CG.Assets.createAsset(THIRD_DIALOG_PATH + 'y3.png').setName(THIRD_ANSWERS_LIST[2]),
    CG.Assets.createAsset(THIRD_DIALOG_PATH + 'w.png').setName(thirdW)
];

const SCENE_ASSETS = [
    CG.Assets.createAsset('../game/assets/level-1/back.png').setName('levelBackground'),
    CG.Assets.createAsset('../game/assets/level-1/hint.png').setName('levelHint'),
    CG.Assets.createAsset(ASSETS_PATH + 'woman.png').setName('woman'),
    CG.Assets.createAsset(ASSETS_PATH + 'comp.png').setName('comp'),
    CG.Assets.createAsset(ASSETS_PATH + 'table.png').setName('table'),
    CG.Assets.createAsset('../game/assets/character/menu.png').setName('menu'),
    ...FIRST_DIALOG_ASSETS,
    ...SECOND_DIALOG_ASSETS,
    ...THIRD_DIALOG_ASSETS
];

/**
 * Вывести список вариантов ответов.
 * @param scene - объект сцены
 * @param list - список реплик
 */
function listAnswers(scene, list = ['hi1', 'hi2', 'hi3']) {
    let result = [];
    sceneGlobal = scene
    let startIndex = 22;
    for (const answer of list) {
        result.push(CG.Shapes.Image({
            hash: startIndex++,
            image: scene.getAsset(answer).image(),
            x: 70,
            y: 270 + result.length * (175 + 60),
            radius: 20,
            height: 175,
            width: 175 * scene.getAsset(answer).widthToHeight()
        }).setName(answer).addEventListener(CG.consts.ECEvents.click, (_, M) => {
            if (currentDialogStage < 3) {
                updateAnswers(getNextAnswersList(++currentDialogStage));
                console.log(M.shape.getName() + ' ' + VALUES[M.shape.getName()]);
                console.log(M.shape.getName() + ' ' +  VALUES[M.shape.getName()])
                console.log('промежуток до', State.resultTonal)
                State.resultTonal += VALUES[M.shape.getName()];
                console.log('промежуток после', State.resultTonal)
            } else {
                if (currentDialogStage === 3) {
                    M.canvasObject.drawPopUp(52);
                    console.log('Итог до', State.resultTonal)
                    State.resultTonal += VALUES[M.shape.getName()];
                    console.log('Итог после', State.resultTonal)
                    console.log(M.shape.getName() + ' ' + VALUES[M.shape.getName()]);
                    console.log(M.shape.getName() + ' ' +  VALUES[M.shape.getName()])
                    currentDialogStage = 1;
                    payScene.reload();
                }
            }
        }));
    }
    return result;
}

/**
 * Заменить реплики на другие
 * @param assetsNames - имя новых реплик
 */
function updateAnswers(assetsNames: [string, string, string, string]) {
    if (sceneGlobal) {
        [
            {hash: 22, asset: assetsNames[0]},
            {hash: 23, asset: assetsNames[1]},
            {hash: 24, asset: assetsNames[2]},
            {hash: 32, asset: assetsNames[3]}
        ].map(obj => {
            sceneGlobal.updateShapeAsset(obj.hash, obj.asset);
        });
    }
}

/**
 * Получить список следующиъх по порядку реплик.
 * @param stage - диалоговая стадия
 */
function getNextAnswersList(stage: number): [string, string, string, string] {
    switch (stage) {
        case 2:
            return [...SECOND_ANSWERS_LIST, secondW] as [string, string, string, string];
        case 3:
            return [...THIRD_ANSWERS_LIST, thirdW] as [string, string, string, string];
    }
}



let sceneGlobal = null;
let currentDialogStage = 1;

const payScene = CG.Scenes.createScene(GameScreen.payment).addAssets(SCENE_ASSETS).addShapes((scene) => [
    CG.Shapes.Image({
        hash: 1,
        image: scene.getAsset('levelBackground').image(),
        x: 0,
        y: 0,
        radius: 20,
        height: 970,
        width: 1920
    }),
    CG.Shapes.Image({
        image: scene.getAsset('menu').image(),
        x: 20,
        y: 20,
        radius: 20,
        height: 140,
        width: 140 * scene.getAsset('menu').widthToHeight()
    }).setName('menuButton').addEventListener(CG.consts.ECEvents.click, (coords, meta) => {
        meta.canvasObject.drawScene(GameScreen.mainMenu);
        State.lastSceneId = GameScreen.payment;
    }),
    CG.Shapes.Image({
        hash: 20,
        image: scene.getAsset('woman').image(),
        x: 950,
        y: 200,
        radius: 20,
        height: 900,
        width: 900 * scene.getAsset('woman').widthToHeight()
    }),
    CG.Shapes.Image({
        hash: 30,
        image: scene.getAsset('table').image(),
        x: 850,
        y: 708,
        radius: 20,
        height: 388,
        width: 388 * scene.getAsset('table').widthToHeight()
    }),
    CG.Shapes.Image({
        hash: 31,
        image: scene.getAsset('comp').image(),
        x: 1590,
        y: 388,
        radius: 20,
        height: 446,
        width: 446 * scene.getAsset('comp').widthToHeight()
    }),
    CG.Shapes.Image({
        hash: 32,
        image: scene.getAsset(firstW).image(),
        x: 600,
        y: 90,
        radius: 20,
        height: 175,
        width: 175 * scene.getAsset(firstW).widthToHeight()
    }),
    CG.Shapes.Image({
        hash: 17,
        image: scene.getAsset('levelHint').image(),
        x: 1350,
        y: 20,
        radius: 20,
        height: 160,
        width: 160 * scene.getAsset('levelHint').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
        M.canvasObject.drawPopUp(PopUpsIds.hint);
    }),
    ...listAnswers(scene)
]);

export {
    payScene
};
