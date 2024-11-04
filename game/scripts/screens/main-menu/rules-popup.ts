import {CG} from '../../../../src/CG';
import { PopUpsIds } from './cfg/config';
import { GameScreen } from '../../levels-config';
import {characterScene} from "../character-select";


let RULES_SHAPE = null;
let rulesPageCount = 1;
const RULES_ASSETS = {
    1: 'r1',
    2: 'r2',
    3: 'r3',
    4: 'r4',
    5: 'r5',
    6: 'r6'
};
const LEVEL_ASSETS = [
    CG.Assets.createAsset('../game/assets/menu/rules/r1.png').setName('r1'),
    CG.Assets.createAsset('../game/assets/menu/rules/r2.png').setName('r2'),
    CG.Assets.createAsset('../game/assets/menu/rules/r3.png').setName('r3'),
    CG.Assets.createAsset('../game/assets/menu/rules/r4.png').setName('r4'),
    CG.Assets.createAsset('../game/assets/menu/rules/r5.png').setName('r5'),
    CG.Assets.createAsset('../game/assets/menu/rules/r6.png').setName('r6'),
    CG.Assets.createAsset('../game/assets/menu/rules/arr_l.png').setName('arr_l'),
    CG.Assets.createAsset('../game/assets/menu/rules/arr_r.png').setName('arr_r'),
    CG.Assets.createAsset('../game/assets/menu/rules/close.png').setName('close')
];

function createShapeRules(S) {
    RULES_SHAPE = CG.Shapes.Image({
        hash: 12000,
        image: S.getAsset('r1').image(),
        x: 700 - 270 * S.getAsset(`r1`).widthToHeight() / 2,
        y: 485 - 350,
        radius: 20,
        height: 700,
        width: 700 * S.getAsset(`r1`).widthToHeight()
    });
    return RULES_SHAPE;
}

function updatePageCounter(flag = false): number {
    if (!flag) {
        if (rulesPageCount < 6) {
            rulesPageCount++;
        } else {
            rulesPageCount = 1;
        }
    } else {
        if (rulesPageCount > 1) {
            rulesPageCount--;
        } else {
            rulesPageCount = 6;
        }
    }


    return rulesPageCount;
}

function updateRules(pageCount) {
    popUps.updateShapeAsset(12000, RULES_ASSETS[pageCount]);
}

const popUps =  CG.Scenes.createPopUp(PopUpsIds.gameRules).addAssets([...LEVEL_ASSETS]).addShapes((S) => [
        createShapeRules(S),
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
            image: S.getAsset('arr_l').image(),
            x: 850,
            y: 710,
            radius: 20,
            height: 60,
            width: 60 * S.getAsset('arr_l').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (c, _) => {
            updateRules(updatePageCounter(true));
        }),
        CG.Shapes.Image({
            hash: 12002,
            image: S.getAsset('arr_r').image(),
            x: 980,
            y: 710,
            radius: 20,
            height: 60,
            width: 60 * S.getAsset('arr_r').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (c, _) => {
            updateRules(updatePageCounter());
        }),
        CG.Shapes.Image({
            hash: 12003,
            image: S.getAsset('close').image(),
            x: 1800,
            y: 20,
            radius: 20,
            height: 100,
            width: 100 * S.getAsset('close').widthToHeight()
        }).addEventListener(CG.consts.ECEvents.click, (c, meta) => {
            meta.canvasObject.hidePopUp(PopUpsIds.gameRules);
        })
    ]);


export {
    popUps as rulesPopUps
};