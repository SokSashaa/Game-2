import {CG} from '../../../src/CG';
import { GameScreen } from '../levels-config';
let char = true;

/**
 * Смена картинки персонажа.
 * @param C - координаты клика
 * @param meta
 */
function changeCharacter(C, meta) {
    (characterScene.getShapes()[100] as any).update((char ? {image: characterScene.getAsset('char2').image()} : {image: characterScene.getAsset('char1').image()}));
    // meta.canvasObject.drawScene(GameScreen.s);
    char = !char;
}

const characterAssets = [
    CG.Assets.createAsset('../game/assets/character/menu.png').setName('menu'),
    CG.Assets.createAsset('../game/assets/character/border-top.png').setName('borderTop'),
    CG.Assets.createAsset('../game/assets/character/border-bottom.png').setName('borderBottom'),
    CG.Assets.createAsset('../game/assets/character/table.png').setName('table'),
    CG.Assets.createAsset('../game/assets/character/done.png').setName('done'),
    CG.Assets.createAsset('../game/assets/character/arr-right.png').setName('rightArrow'),
    CG.Assets.createAsset('../game/assets/character/arr-left.png').setName('leftArrow'),
    CG.Assets.createAsset('../game/assets/character/char1.png').setName('char1'),
    CG.Assets.createAsset('../game/assets/character/char2.png').setName('char2'),
    CG.Assets.createAsset('../game/assets/menu/background.png').setName('back'),
];
const characterScene = CG.Scenes.createScene(GameScreen.characterSelect).addAssets(characterAssets).addShapes((scene) => [
    CG.Shapes.Image({
        hash: 12,
        image: scene.getAsset('back').image(),
        x: 0,
        y: 0,
        radius: 0,
        height: 970,
        width: 1920
    }),
    CG.Shapes.Image({
        image: scene.getAsset('menu').image(),
        x: 20,
        y: 20,
        radius: 0,
        height: 140,
        width: 140 * scene.getAsset('menu').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (c, meta) => {
        meta.canvasObject.drawScene(GameScreen.mainMenu);
    }),
    CG.Shapes.Image({
        image: scene.getAsset('borderTop').image(),
        x: 520,
        y: 15,
        radius: 20,
        height: 430,
        width: 430 * scene.getAsset('borderTop').widthToHeight()
    }),
    CG.Shapes.Image({
        image: scene.getAsset('borderBottom').image(),
        x: 20,
        y: 700,
        radius: 20,
        height: 250,
        width: 250 * scene.getAsset('borderBottom').widthToHeight()
    }),
    CG.Shapes.Image({
        image: scene.getAsset('table').image(),
        x: 200,
        y: 180,
        radius: 20,
        height: 700,
        width: 700 * scene.getAsset('table').widthToHeight()
    }),
    CG.Shapes.Image({
        image: scene.getAsset('done').image(),
        x: 1800,
        y: 840,
        radius: 20,
        height: 100,
        width: 100 * scene.getAsset('done').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, (_, m) => {
        m.canvasObject.drawScene(GameScreen.level1Rules);
    }),
    CG.Shapes.Image({
        hash: 100,
        image: scene.getAsset('char1').image(),
        x: 1270,
        y: 200,
        radius: 20,
        height: 720,
        width: 720 * scene.getAsset('char1').widthToHeight()
    }),
    CG.Shapes.Image({
        image: scene.getAsset('rightArrow').image(),
        x: 1590,
        y: 450,
        radius: 20,
        height: 100,
        width: 100 * scene.getAsset('rightArrow').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, changeCharacter),
    CG.Shapes.Image({
        image: scene.getAsset('leftArrow').image(),
        x: 1090,
        y: 450,
        radius: 20,
        height: 100,
        width: 100 * scene.getAsset('leftArrow').widthToHeight()
    }).addEventListener(CG.consts.ECEvents.click, changeCharacter),
]);

export {
    characterScene
};