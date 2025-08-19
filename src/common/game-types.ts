export enum CellStateStage {
  HIDDEN = '',
  RELEASED = 'opened',
  TESTED = 'clicked',
}

export class CellStateEntry {
  stage?: CellStateStage;
  locked?: boolean;
}

export class CellState extends CellStateEntry {
  fill!: number;
  row!: number;
  col!: number;
  mark?: number;
}

export enum GameActionType {
  LOAD = 'LOAD',
  STORE = 'STORE',
  NEW = 'NEW',
  REPLAY = 'REPLAY',
  MOVE = 'MOVE',
  FLAG = 'FLAG',
  VICTORY = 'VICTORY',
  DEFEAT = 'DEFEAT',
}

export interface CellActionData {
  cell: CellState;
  entry: CellStateEntry;
}

export interface PayloadAction {
  type: GameActionType
  payload: string // stringified, LOAD: GameState, MOVE | FLAG: CellActionData
}

export interface GameAction {
  type: GameActionType
  payload?: string
}

export enum GameStages {
  NEW = 'game-new',
  PLAYING = 'game-playing',
  LOST = 'game-lost',
  WON = 'game-won'
}

export interface GameState {
  // new:
  board: CellState[][];
  stage: GameStages;
  // playing:
  tZero: number;
  tShift: number;
  // over:
  mines: CellState[];
  score: ScoreItem;
}

export interface GameScore {
  cells: number,
  mines: number,
  effort: {
    least: number,
    most: number,
  }
}

export interface PlayScore {
  moves: number,
  duration: number,
}

export interface ScoreCalc {
  efficiency: number,
  speed: number,
  points: number
}

export interface ScoreItem {
  code: string,
  date: number,
  user: string,
  rank: number,
  game: GameScore,
  play: PlayScore,
  score: ScoreCalc,
}
