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
  begin: number;
  // over:
  mines: CellState[];
  end: number;
  rank: number;
  score: number;
}

export interface ScoreItem {
  begin: number,
  duration: number,
  user: string,
  cells: number,
  mines: number,
  moves: number,
  score: number,
}
