import { GameState, GameStages, CellStateStage} from '../common/game-types'

// states comply to microConfig

export const newGameState: GameState = {
  "stage": GameStages.NEW,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 0, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 2 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 1, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 2 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 2, "col": 2 }
    ]
  ],
  "begin": 0,
  "end": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}

export const playingGameState: GameState = {
  "stage": GameStages.PLAYING,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 0, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 0, "col": 1 },
      { "stage": CellStateStage.TESTED, "fill": 0, "row": 0, "col": 2 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 2, "row": 1, "col": 1 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 1, "col": 2 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 2, "col": 2 }
    ]
  ],
  "begin": 1745517111606,
  "end": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}

export const lostGameState: GameState = {
  "stage": GameStages.LOST,
  "board": [
    [
      { "stage": CellStateStage.TESTED, "fill": 9, "row": 0, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 0, "col": 1 },
      { "stage": CellStateStage.RELEASED, "fill": 0, "row": 0, "col": 2 }
    ],
    [
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 1, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 2, "row": 1, "col": 1 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 1, "col": 2 }
    ],
    [
      { "stage": CellStateStage.RELEASED, "fill": 0, "row": 2, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 2, "col": 1 },
      { "stage": CellStateStage.TESTED, "fill": 9, "row": 2, "col": 2 }
    ]
  ],
  "begin": 1745517111606,
  "end": 1745517111607,
  "rank": 0,
  "score": 0,
  "mines": []
}

export const decidedGameState: GameState = {
  "stage": GameStages.PLAYING,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 0, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 0, "col": 1 },
      { "stage": CellStateStage.TESTED, "fill": 0, "row": 0, "col": 2 }
    ],
    [
      { "stage": CellStateStage.TESTED, "fill": 1, "row": 1, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 2, "row": 1, "col": 1 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 1, "col": 2 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 2, "col": 2, locked: true }
    ]
  ],
  "begin": 1745517111606,
  "end": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}

export const wonGameState: GameState = {
  "stage": GameStages.WON,
  "board": [
    [
      { "stage": CellStateStage.RELEASED, "fill": 9, "row": 0, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 0, "col": 1 },
      { "stage": CellStateStage.TESTED, "fill": 0, "row": 0, "col": 2 }
    ],
    [
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 1, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 2, "row": 1, "col": 1 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 1, "col": 2 }
    ],
    [
      { "stage": CellStateStage.TESTED, "fill": 0, "row": 2, "col": 0 },
      { "stage": CellStateStage.RELEASED, "fill": 1, "row": 2, "col": 1 },
      { "stage": CellStateStage.RELEASED, "fill": 9, "row": 2, "col": 2 }
    ]
  ],
  "begin": 1745518136299,
  "end": 1745518137216,
  "rank": 21,
  "score": 5944,
  "mines": []
}
