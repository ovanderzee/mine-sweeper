const defaultVariables = {
  BOARD_SIZE: 6,
  GAME_LEVEL: 3,
  PLAYER_NAME: '',
}

/**
 * BOARD_SIZE
 * width and height of gameboard, hence BOARD_SIZE^2 cells on board
 */

/**
 * GAME_LEVEL
 * mines per 30 cells:
 * 2 = 1 mine / 15 cells
 * 3 = 1 mine / 10 cells
 * 4 = 1 mine / 7.5 cells
 * 5 = 1 mine / 6 cells
 * 6 = 1 mine / 5 cells
 * 7 = 1 mine / 4.3 cells
 */

const storedVariables = JSON.parse(localStorage.getItem('mijnenveger')) || {}

const gameVariables = { ...defaultVariables, ...storedVariables }

const { BOARD_SIZE, GAME_LEVEL, PLAYER_NAME } = gameVariables

const OVERLAY_ELEMENT = document.getElementById('overlay')

export { BOARD_SIZE, GAME_LEVEL, PLAYER_NAME, OVERLAY_ELEMENT }
