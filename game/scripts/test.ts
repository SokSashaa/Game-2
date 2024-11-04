import {CG} from '../../src/CG';
import {ICanvasOptions} from '../../src/interface/canvas.interfaces';
import {payScene, characterScene, mainMenuScene, levelsRulesScene, resultScenes, paymentPopUps, mainMenuPopUps, rulesPopUps, payPopUp} from './screens.lib';
import { level1, level2, level2PopUps, level2Hint, level2Wrong, level1Hints } from './levels.lib';

import {arrowPicture} from './assets';


window.addEventListener('DOMContentLoaded', () => {

    CG.Utils.ImageLoader.loadAssets(arrowPicture).then(assets => {

        function canvasClickHandler(coords, meta): void {
            return;
        }
    
        const gameCursor = CG.Shapes.Image({
            image: assets.arrow.image,
            x: 0,
            y: 0,
            height: 40,
            width: 40 * assets.arrow.widthToHeight,
            radius: 20,
            hash: 999999
        });

        const canvasOptions: ICanvasOptions = {
            selector: '#j3r901h390r',
            events: [{
                type: CG.Canvas.Events.click,
                handler: canvasClickHandler
            }, {
                type: CG.Canvas.Events.mousemove,
                handler: (coordinates, meta) => {
                    canvas.draw(gameCursor.update({x: coordinates.x, y: coordinates.y}));
                }
            }]
        };

        const canvas = CG.Canvas.init(document, canvasOptions);
        canvas.addScene(payScene)
            .addScene(characterScene)
            .addScene(mainMenuScene)
            .addScene(level1)
            .addScene(level2)
            .addScene(level2Hint)
            .addScene(level2Wrong);

        for (const popUp of level2PopUps) {
            canvas.addScene(popUp);
        }

        for (const scene of [...levelsRulesScene, ...resultScenes, ...level1Hints, ...paymentPopUps, ...mainMenuPopUps, rulesPopUps, payPopUp]) {
            canvas.addScene(scene);
        }

        canvas.drawPopUp(mainMenuScene.getId());

        (window as any).testCanvas = canvas;
        //@ts-ignore
        (window as any).testStat = new StatRecord({
            'levels_names': ['1 уровень', '2 уровень', '3 уровень']
        }).gameStart();
    });
});