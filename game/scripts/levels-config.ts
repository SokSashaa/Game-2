enum GameScreen {
    mainMenu,
    characterSelect,
    levelRules,
    payment,
    results = 4,
    level1Rules,
    level2Rules,
    level1Results,
    level2Results,
    level2Good = 3000,
    level2Normal,
    level2Bad
}

enum Levels {
    one = 10,
    two,
    three
}

class GameState {
    lastSceneId: number = null;
    resultTonal: number = 0;
}

const State = new GameState();

export {
    GameScreen,
    Levels,
    State
};