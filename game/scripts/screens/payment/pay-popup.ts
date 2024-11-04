import {CG} from '../../../../src/CG';
import { PopUpsIds } from './cfg/config';
import { GameScreen, State } from '../../levels-config';

const MONEY_PATH = '../game/assets/payment/money/'

enum GameMoney {
    fifty = '50',
    hundred = '100',
    twoHundred = '200',
    fiveHundred = '500',
    thousand = '1000',
    twoThousand = '2000',
    fiveThousand = '5000',
    one = '1',
    two = '2',
    five = '5',
    ten = '10'
}

let MONEY_STATES = {
    '1': false,
    '2': false,
    '5': false,
    '10': false,
    '50': false,
    '100': false,
    '200': false,
    '500': false,
    '1000': false,
    '2000': false,
    '5000': false
};

let currentMoney = 0;

const levelAssets = [
    CG.Assets.createAsset('../game/assets/level-1/targets.png').setName('done'),
    CG.Assets.createAsset(MONEY_PATH +  '1.png').setName(GameMoney.one),
    CG.Assets.createAsset(MONEY_PATH +  '2.png').setName(GameMoney.two),
    CG.Assets.createAsset(MONEY_PATH +  '5.png').setName(GameMoney.five),
    CG.Assets.createAsset(MONEY_PATH +  '10.png').setName(GameMoney.ten),
    CG.Assets.createAsset(MONEY_PATH +  '50.png').setName(GameMoney.fifty),
    CG.Assets.createAsset(MONEY_PATH +  '100.png').setName(GameMoney.hundred),
    CG.Assets.createAsset(MONEY_PATH +  '200.png').setName(GameMoney.twoHundred),
    CG.Assets.createAsset(MONEY_PATH +  '500.png').setName(GameMoney.fiveHundred),
    CG.Assets.createAsset(MONEY_PATH +  '1000.png').setName(GameMoney.thousand),
    CG.Assets.createAsset(MONEY_PATH +  '2000.png').setName(GameMoney.twoThousand),
    CG.Assets.createAsset(MONEY_PATH +  '5000.png').setName(GameMoney.fiveThousand)
];

function createMoneyRow(x: number, y: number, assetsNames: string[], S, margin, size) {
    const result = [];
    for (const name of assetsNames) {
        result.push(
            CG.Shapes.Image({
                hash: 12200 + +name,
                image: S.getAsset(name).image(),
                x: x + (result.length * (size * S.getAsset(name).widthToHeight() + margin)),
                y: y,
                radius: 20,
                height: size,
                width: size * S.getAsset(name).widthToHeight()
            }).setDraggable(true).setName(name).addEventListener(CG.consts.ECEvents.drag, (c, meta) => {
                MONEY_STATES[meta.shape.getName()] = null;
            })
        );
    }
    return result;
}

function checkGivenMoney(target: number) {
    let count = 0;
    for (const key in MONEY_STATES) {
        if (MONEY_STATES[key]) {
            count += +key;
        }
    }
    return count === target;
}

const popUps = CG.Scenes.createPopUp(PopUpsIds.pay).addAssets([...levelAssets,
    CG.Assets.createAsset('../game/assets/payment/change.png').setName('hint')]).addShapes((S) => [
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
        x: 1040,
        y: 450,
        radius: 20,
        height: 300,
        width: 350
    }).addEventListener(CG.consts.ECEvents.dragend, (c, meta) => {
        if (!meta.shape) return;
        MONEY_STATES[meta.shape.getName()] = true;
        if (checkGivenMoney(3755)) {
            meta.canvasObject.hidePopUp(PopUpsIds.pay);
            popUps.reload();
            MONEY_STATES = {
                '1': false,
                '2': false,
                '5': false,
                '10': false,
                '50': false,
                '100': false,
                '200': false,
                '500': false,
                '1000': false,
                '2000': false,
                '5000': false
            };

            if (State.resultTonal === 0) {
                meta.canvasObject.drawScene(GameScreen.level2Good);
            }

            if (State.resultTonal < 3 && State.resultTonal>0) {
                meta.canvasObject.drawScene(GameScreen.level2Normal);
            }

            if (State.resultTonal > 2) {
                meta.canvasObject.drawScene(GameScreen.level2Bad);
            }
        }
    }).setTarget(true),
    ...createMoneyRow(515, 450, [GameMoney.fiveThousand, GameMoney.twoThousand, GameMoney.thousand], S, 20,80),
    ...createMoneyRow(515, 550, [GameMoney.fiveHundred, GameMoney.twoHundred, GameMoney.hundred], S, 20,80),
    ...createMoneyRow(515, 650, [GameMoney.fifty], S, 20,80),
    ...createMoneyRow(700, 650, [GameMoney.ten, GameMoney.five, GameMoney.two, GameMoney.one], S, 20, 80)
]);

export {
    popUps as payPopUp
};
