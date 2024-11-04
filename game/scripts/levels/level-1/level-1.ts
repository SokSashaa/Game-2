import { CG } from '../../../../src/CG'
import { GameScreen, Levels, State } from '../../levels-config'
import { PopUpsIds, Bottles, Cakes, Packs } from './cfg/config'

State.resultTonal = 0

let globalScene = null
const ITEMS_SIZE = 100
const PRODUCT_PATH = '../game/assets/level-1/products/'
const PRODUCTS_NAMES = [
  Cakes.pinkCake,
  Cakes.brownCake,
  Cakes.orangeCake,
  Cakes.greenCake,
  Packs.blueCruasans,
  Packs.redCruasans,
  Packs.cookies,
  Packs.whiteNuts,
  Packs.yellowNuts,
  Bottles.redBottle,
  Bottles.blueBottle,
  Bottles.orangeBottle,
  Bottles.yellowBottle,
]

const ALLOWED_PRODUCTS = [
  Bottles.redBottle,
  Bottles.yellowBottle,
  Bottles.orangeBottle,
]
const PICKED_PRODUCTS = []
const CHECKS_PRODUCTS = {
  'bottle-red': 3001,
  'bottle-yellow': 3002,
  'bottle-orange': 3003,
}

const PRODUCTS_ASSETS = [
  CG.Assets.createAsset(PRODUCT_PATH + Bottles.blueBottle + '.png').setName(
    Bottles.blueBottle
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Bottles.orangeBottle + '.png').setName(
    Bottles.orangeBottle
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Bottles.redBottle + '.png').setName(
    Bottles.redBottle
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Bottles.yellowBottle + '.png').setName(
    Bottles.yellowBottle
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Cakes.orangeCake + '.png').setName(
    Cakes.orangeCake
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Cakes.brownCake + '.png').setName(
    Cakes.brownCake
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Cakes.pinkCake + '.png').setName(
    Cakes.pinkCake
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Cakes.greenCake + '.png').setName(
    Cakes.greenCake
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Packs.cookies + '.png').setName(
    Packs.cookies
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Packs.blueCruasans + '.png').setName(
    Packs.blueCruasans
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Packs.redCruasans + '.png').setName(
    Packs.redCruasans
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Packs.whiteNuts + '.png').setName(
    Packs.whiteNuts
  ),
  CG.Assets.createAsset(PRODUCT_PATH + Packs.yellowNuts + '.png').setName(
    Packs.yellowNuts
  ),
]

const LEVEL_ASSETS = [
  CG.Assets.createAsset('../game/assets/level-1/back.png').setName(
    'levelBackground'
  ),
  CG.Assets.createAsset('../game/assets/level-1/menu-btn.png').setName(
    'levelMenuButton'
  ),
  CG.Assets.createAsset('../game/assets/level-1/hint.png').setName('levelHint'),
  CG.Assets.createAsset('../game/assets/level-1/targets.png').setName(
    'levelTargets'
  ),
  CG.Assets.createAsset('../game/assets/level-1/cart.png').setName('levelCart'),
  CG.Assets.createAsset('../game/assets/level-1/shelf.png').setName(
    'levelShelf'
  ),
  CG.Assets.createAsset('../game/assets/level-1/test.png').setName('levelTest'),
  CG.Assets.createAsset('../game/assets/character/done.png').setName('done'),
  CG.Assets.createAsset('../game/assets/level-1/check.png').setName('check'),
  ...PRODUCTS_ASSETS,
]

/**
 * Получить фигуру-подложку списка покупок.
 * @param scene - объект сцены
 * @param x - начальный x
 * @param width - ширина подложки
 */
function createTargetsList(scene, x: number, width: number) {
  return CG.Shapes.Image({
    hash: 3,
    image: scene.getAsset('levelTargets').image(),
    x: x,
    y: 810,
    radius: 0,
    height: 180,
    width,
  })
}

/**
 * Получить фигуры-элементы списка покупок.
 * @param scene - объект сцены
 * @param products - список разрешённых продуктов.
 */
function createTargetsListItems(scene, products: string[]) {
  const productsShapes = []
  const margin = 80
  const widthAll = products.length * (ITEMS_SIZE + margin) + margin
  const startX = 975 - (widthAll / 2 - margin)
  products.forEach((product) => {
    const shapeX = startX + (productsShapes.length * ITEMS_SIZE + margin)
    productsShapes.push(
      CG.Shapes.Image({
        image: scene.getAsset(product).image(),
        x: shapeX,
        y: 845,
        radius: 0,
        height: ITEMS_SIZE,
        width: ITEMS_SIZE * scene.getAsset(product).widthToHeight(),
      })
    )
  })
  const hashes = [3001, 3002, 3003]
  ;[...productsShapes].forEach((shape, index) => {
    productsShapes.push(
      CG.Shapes.Image({
        hash: hashes[index],
        image: scene.getAsset('check').image(),
        x: shape.getShape().x - 20,
        y: 910,
        radius: 0,
        height: 0,
        width: 40 * scene.getAsset('check').widthToHeight(),
      })
    )
  })
  return { productsShapes, x: startX - margin, width: widthAll }
}

/**
 * Создать все необходимые элементы для отрисовки списка покупок.
 * @param scene - объект сцены
 * @param products - список разрешённых продуктов
 */
function createHintsList(scene, products: string[]) {
  const listMeta = createTargetsListItems(scene, products)
  const listItems = listMeta.productsShapes
  listItems.push(createTargetsList(scene, listMeta.x, listMeta.width))
  globalScene = scene
  return listItems
}

function itemClickHandler(_, M) {
  const index = ALLOWED_PRODUCTS.indexOf(M.shape.getName())
  if (index !== -1) {
    ALLOWED_PRODUCTS[index] = null
    PICKED_PRODUCTS.push(M.shape.getName())
    ;(M.shape as any).update({ x: 200, y: 740 })
    globalScene.updateShape(CHECKS_PRODUCTS[M.shape.getName()], { height: 40 })
  } else {
    M.canvasObject.drawPopUp(PopUpsIds.hint)
  }

  if (PICKED_PRODUCTS.length === ALLOWED_PRODUCTS.length) {
    ;(levelScene.getShapes()[30] as any).update({ x: 1800 })
  }
}

function getRandomProductName(): string {
  return PRODUCTS_NAMES[Math.floor(Math.random() * (PRODUCTS_NAMES.length + 1))]
}

/**
 * Сгенерировать ряд элементов.
 * @param S - объект сцены
 * @param y - высота по y
 * @param x - отступ справа по x
 * @param margin - отсуп между предметами
 * @param name - название продукта
 * @param count - кол-во продуктов
 */
function createElements(S, y, x, margin, name, count = 4) {
  let result = []
  for (let i = 0; i < count; i++) {
    result.push(
      CG.Shapes.Image({
        image: S.getAsset(name).image(),
        x: x + (result.length * ITEMS_SIZE + margin),
        y,
        radius: 0,
        height: ITEMS_SIZE,
        width: ITEMS_SIZE * S.getAsset(name).widthToHeight(),
      })
        .addEventListener(CG.consts.ECEvents.click, (_, M) => {
          itemClickHandler(_, M)
        })
        .setName(name)
    )
  }
  return result
}

const levelScene = CG.Scenes.createScene(Levels.one)
  .addAssets(LEVEL_ASSETS)
  .addShapes((S) => [
    CG.Shapes.Image({
      hash: 1,
      image: S.getAsset('levelBackground').image(),
      x: 0,
      y: 0,
      radius: 20,
      height: 970,
      width: 1920,
    }),
    CG.Shapes.Image({
      image: S.getAsset('levelMenuButton').image(),
      x: 20,
      y: 0,
      radius: 20,
      height: 160,
      width: 160 * S.getAsset('levelMenuButton').widthToHeight(),
    }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
      M.canvasObject.drawScene(GameScreen.mainMenu)
      State.lastSceneId = Levels.one
    }),
    CG.Shapes.Image({
      hash: 17,
      image: S.getAsset('levelHint').image(),
      x: 1350,
      y: 20,
      radius: 20,
      height: 160,
      width: 160 * S.getAsset('levelHint').widthToHeight(),
    }).addEventListener(CG.consts.ECEvents.click, (_, M) => {
      M.canvasObject.drawPopUp(PopUpsIds.hint)
    }),
    CG.Shapes.Image({
      hash: 20,
      image: S.getAsset('levelCart').image(),
      x: 45,
      y: 650,
      radius: 20,
      height: 300,
      width: 300 * S.getAsset('levelCart').widthToHeight(),
    }),
    CG.Shapes.Image({
      hash: 2,
      image: S.getAsset('levelShelf').image(),
      x: 975 - 800,
      y: 200,
      radius: 20,
      height: 600,
      width: 1600,
    }),
    CG.Shapes.Image({
      hash: 30,
      image: S.getAsset('done').image(),
      x: 1920,
      y: 840,
      radius: 20,
      height: 100,
      width: 100 * S.getAsset('done').widthToHeight(),
    })
      .setName('level1Done')
      .addEventListener(CG.consts.ECEvents.click, (_, M) => {
        M.canvasObject.drawScene(GameScreen.payment)
        levelScene.reload()
      }),
    ...createHintsList(S, ALLOWED_PRODUCTS),
    ...createElements(S, 510, 250, 30, Packs.cookies),
    ...createElements(S, 510, 700, 20, Bottles.blueBottle, 2),
    ...createElements(S, 510, 920, 20, Bottles.orangeBottle),
    ...createElements(S, 510, 1300, 30, Packs.redCruasans, 3),
    ...createElements(S, 385, 270, 10, Bottles.yellowBottle, 7),
    ...createElements(S, 385, 950, 10, Packs.whiteNuts),
    ...createElements(S, 385, 1375, 10, Packs.yellowNuts, 3),
    ...createElements(S, 230, 250, 5, Bottles.redBottle, 5),
    ...createElements(S, 230, 700, 15, Packs.blueCruasans, 10),
  ])

export { levelScene }
