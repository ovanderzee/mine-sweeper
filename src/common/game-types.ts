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
  cell: CellState
  entry: CellStateEntry
}

export interface CellAction {
  type: GameActionType;
  payload: CellActionData;
}

export interface LoadAction {
  type: GameActionType;
  payload: string;
}

export interface SimpleAction {
  type: GameActionType;
}

export interface GameAction {
  type: GameActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
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
  level: number;
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
