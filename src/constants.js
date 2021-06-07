const defaultVariables = {
  BOARD_SIZE: 6,
  GAME_LEVEL: 2,
  PLAYER_NAME: '',
}

const storedVariables = JSON.parse(localStorage.getItem('mijnenveger')) || {}

const gameVariables = { ...defaultVariables, ...storedVariables }

const { BOARD_SIZE, GAME_LEVEL, PLAYER_NAME } = gameVariables

const OVERLAY_ELEMENT = document.getElementById('overlay')

export { BOARD_SIZE, GAME_LEVEL, PLAYER_NAME, OVERLAY_ELEMENT }
