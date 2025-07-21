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
  "tZero": 0,
  "tShift": 0,
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
  "tZero": 1745517111606,
  "tShift": 1745517156730, // 45124ms later
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
  "tZero": 1745517111606,
  "tShift": 1745517342474, // 230868ms later
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
  "tZero": 1745517111606,
  "tShift": 1745517342474, // 3m 50s
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
  "tZero": 1745518136299,
  "tShift": 1745518137216, // 917ms later
  "rank": 21,
  "score": 5944,
  "mines": []
}

// more complicated 7x7/7 boards

export const blank18pct = {
  "stage": GameStages.NEW,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 1, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 1, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 1, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 3, "row": 3, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 3, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 3, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 4, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 4, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 4, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 6, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 6, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 6, "col": 6 }
    ]
  ],
  "tZero": 0,
  "tShift": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}

export const blank26pct = {
  "stage": GameStages.NEW,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 0, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 0, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 1, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 3, "row": 1, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 3, "row": 1, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 1, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 3, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 3, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 4, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 4, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 4, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 5, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 5, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 6, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 6, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 6, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 6, "col": 6 }
    ]
  ],
  "tZero": 0,
  "tShift": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}

// 5 regions of blanks
export const blank31pct = {
  "stage": GameStages.NEW,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 0, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 3, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 3, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 3, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 11, "row": 3, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 11, "row": 3, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 3, "row": 4, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 11, "row": 4, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 5, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 5, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 6, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 6, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 6, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 6 }
    ]
  ],
  "tZero": 0,
  "tShift": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}

export const blank41pct = {
  "stage": GameStages.NEW,
  "board": [
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 0, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 0, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 9, "row": 1, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 1, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 1, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 2, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 2, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 2, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 3, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 3, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 3, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 4, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 3, "row": 4, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 4, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 4, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 4, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 11, "row": 5, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 4, "row": 5, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 10, "row": 5, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 5, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 5, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 5, "col": 6 }
    ],
    [
      { "stage": CellStateStage.HIDDEN, "fill": 11, "row": 6, "col": 0 },
      { "stage": CellStateStage.HIDDEN, "fill": 12, "row": 6, "col": 1 },
      { "stage": CellStateStage.HIDDEN, "fill": 2, "row": 6, "col": 2 },
      { "stage": CellStateStage.HIDDEN, "fill": 1, "row": 6, "col": 3 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 4 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 5 },
      { "stage": CellStateStage.HIDDEN, "fill": 0, "row": 6, "col": 6 }
    ]
  ],
  "tZero": 0,
  "tShift": 0,
  "rank": 0,
  "score": 0,
  "mines": []
}
