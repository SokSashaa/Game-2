import { CG } from '../../../../src/CG'
import { PopUpsIds } from './cfg/config'
import { GameScreen } from '../../levels-config'

const LEVEL_ASSETS = [
  CG.Assets.createAsset('../game/assets/character/done.png').setName('done'),
]

// Планировался переиспользуемый компонент всплывающих окон, но по факту монолитный компонент предложения выбрать персонажа
function createPopUp(id: number, assetHintSource: string, redirectId?: number) {
  return (
    CG.Scenes.createPopUp(id)
      .addAssets([
        ...LEVEL_ASSETS,
        CG.Assets.createAsset(assetHintSource).setName('hint'),
      ])
      // Доска с подсказкой
      .addShapes((S) => [
        CG.Shapes.Image({
          hash: 12000,
          image: S.getAsset('hint').image(),
          x: 700 - (350 * S.getAsset(`hint`).widthToHeight()) / 2,
          y: 485 - 350,
          radius: 20,
          height: 700,
          width: 700 * S.getAsset(`hint`).widthToHeight(),
        }),
        //   Замылинный задний план
        CG.Shapes.Rect({
          hash: 11999,
          x: 0,
          y: 0,
          radius: 0,
          height: 970,
          width: 1920,
          fillColor: '#cccccca6',
        }).addEventListener(CG.consts.ECEvents.click, () => {
          return
        }),
        //   Кнопка "продолжить"
        CG.Shapes.Rect({
          hash: 12001,
          x: 800,
          y: 640,
          radius: 0,
          height: 100,
          width: 300,
          fillColor: 'transparent',
        }).addEventListener(CG.consts.ECEvents.click, (c, _) => {
          if (redirectId) {
            _.canvasObject.hidePopUp(id)
            _.canvasObject.drawScene(redirectId)
          } else {
            _.canvasObject.hidePopUp(id)
          }
        }),
      ])
  )
}

const popUps = [
  createPopUp(
    PopUpsIds.characterSelect,
    '../game/assets/menu/char-hint.png',
    GameScreen.characterSelect
  ),
]

export { popUps as mainMenuPopUps }
