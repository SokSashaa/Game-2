import {CG} from '../../../../src/CG';
import { Levels, GameScreen, State } from '../../levels-config';
import { PopUpsIds } from './cfg/config';

const SECOND_LEVEL_PATH = '../game/assets/level-2/';
const CARD_HASHS = [400, 401, 402, 403, 404, 405, 406, 407];
const TARGETS_HASHS = [500, 501, 502, 503, 504, 505, 506, 507];

let TARGET_STATE = {
    "card-1": null,
    "card-4": null,
    "card-7": null,
    "card-8": null,
    "card-3": null,
    "card-5": null,
    "card-2": null,
    "card-6": null
}

const CORRECT_STATE = {
    "card-1":'target-1',
    "card-4": 'target-3',
    "card-7": 'target-2',
    "card-8":'target-4',
    "card-3": 'target-5',
    "card-5": 'target-6',
    "card-2": 'target-7',
    "card-6": 'target-8'
}

function isStatesFull(): boolean {
    const stateKeys = Object.keys(TARGET_STATE);
    for (const key of stateKeys) {
        if (!TARGET_STATE[key]) {
            return false;
        }
    }
    return true;
}

function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function validateInput(): boolean {
    const stateKeys = Object.keys(TARGET_STATE);
    for (const key of stateKeys) {
        if (TARGET_STATE[key] !== CORRECT_STATE[key]) {
            return false;
        }
    }
    return true;
}

function createTargets(scene, yOffset, name ,count = 8) {
    let result = [];
    const width = 800 / 8;
    for (let i = 0; i < count; i++) {
        result.push(
            CG.Shapes.Image({
                hash: name === 'card-' ? TARGETS_HASHS[i] : CARD_HASHS[i],
                image: scene.getAsset(`${name}${i + 1}`).image(),
                x: result.length * 240 + 30,
                y: yOffset,
                radius: 20,
                height: 250,
                width: 250 * scene.getAsset(`${name}${i + 1}`).widthToHeight()
            })
                .setDraggable(name === 'card-')
                .addEventListener(CG.consts.ECEvents.dblclick, (coords, _) => {
                    const id = +_.shape.getName().split('-')[1];
                    _.canvasObject.drawPopUp(31 + id);
                })
                .setName(name + (i + 1)).addEventListener(CG.consts.ECEvents.dragend, function(coords, M) {
                    (M.shape as any).update({x: this.image.x, y: this.image.y});
                    TARGET_STATE[M.shape.getName()] = this.getName();
                    if (isStatesFull()) {
                        doneBtn.update({x: 1800});
                    } else {
                        doneBtn.update({x: 1920});
                    }
                })
                .setTarget(name === 'target-')
                .addEventListener(CG.consts.ECEvents.drag, (coords, M) => {
                    TARGET_STATE[M.shape.getName()] = null;
                    if (isStatesFull()) {
                        doneBtn.update({x: 1800});
                    } else {
                        doneBtn.update({x: 1920});
                    }
                })
        );
    }
    return result;
}

function createDoneBtn(S) {
    doneBtn = CG.Shapes.Image({
        hash: 30,
        image: S.getAsset('done').image(),
        x: 1920,
        y: 840,
        radius: 20,
        height: 100,
        width: 100 * S.getAsset('done').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (_ ,M) => {
        if (validateInput()) {
            M.canvasObject.drawScene(GameScreen.level1Results);
            levelScene.reload();
            TARGET_STATE = {
                "card-1": null,
                "card-4": null,
                "card-7": null,
                "card-8": null,
                "card-3": null,
                "card-5": null,
                "card-2": null,
                "card-6": null
            }
        } else {
            M.canvasObject.drawPopUp(PopUpsIds.wrong);
        }
    });
    return doneBtn;
}

let doneBtn = null;

const LEVEL_ASSETS = [
    CG.Assets.createAsset('../game/assets/level-1/back.png').setName('levelBackground'),
    CG.Assets.createAsset('../game/assets/level-1/menu-btn.png').setName('levelMenuButton'),
    CG.Assets.createAsset('../game/assets/level-1/hint.png').setName('levelHint'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c1.png').setName('card-1'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c2.png').setName('card-2'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c3.png').setName('card-3'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c4.png').setName('card-4'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c5.png').setName('card-5'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c6.png').setName('card-6'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c7.png').setName('card-7'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'c8.png').setName('card-8'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-1.png').setName('target-1'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-2.png').setName('target-2'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-3.png').setName('target-3'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-4.png').setName('target-4'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-5.png').setName('target-5'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-6.png').setName('target-6'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-7.png').setName('target-7'),
    CG.Assets.createAsset(SECOND_LEVEL_PATH + 'target-8.png').setName('target-8'),
    CG.Assets.createAsset('../game/assets/character/done.png').setName('done')
];
const levelScene = CG.Scenes.createScene(Levels.two).addAssets(LEVEL_ASSETS).addShapes((S) => [
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
        hash: 3,
        image: S.getAsset('levelMenuButton').image(),
        x: 20,
        y: 0,
        radius: 20,
        height: 160,
        width: 160 * S.getAsset('levelMenuButton').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
        M.canvasObject.drawScene(GameScreen.mainMenu);
        State.lastSceneId = Levels.two;
    }),
    CG.Shapes.Image({
        hash: 2,
        image: S.getAsset('levelHint').image(),
        x: 1350,
        y: 20,
        radius: 20,
        height: 160,
        width: 160 * S.getAsset('levelHint').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (C, M) => {
        M.canvasObject.drawPopUp(31);
    }),
    createDoneBtn(S),
    ...createTargets(S, 560, 'target-'),
    ...createTargets(S, 220, 'card-')
]);

export {
    levelScene
};