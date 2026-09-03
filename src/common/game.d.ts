export enum CellStateStage {
  HIDDEN = '',
  RELEASED = 'opened',
  TESTED = 'clicked',
}

export class CellStateEntry {
  stage?: CellStateStage;
  locked?: boolean;
  burst?: boolean;
  disabled?: boolean;
}

export class CellState extends CellStateEntry {
  fill!: number;
  row!: number;
  col!: number;
  mark?: number;
}

export enum GameActionType {
  LOAD = 'LOAD',
  PAUSE = 'PAUSE',
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
  blanks: number,
  pointers?: number,
  mines: number,
  level: number,
  mode?: PlayMode,
  effort: {
    least: number,
    most: number,
  }
}

export interface PlayScore {
  flags: number,
  remaining?: number,
  moves: number,
  duration: number,
}

export interface Signature {
  board: CellState[][],
  fill_frequency: number[],
  invalid_code: boolean,
  blank_pointer_ratio: number,
  blank_mine_ratio: number,
  pointer_mine_ratio: number,
  pointer_mark: number,
  pointer_avg: number,
  mine_mark: number,
  mine_avg: number,
}

export interface Relative {
  blanks: number,
  pointers: number,
  mines: number,
  least: number,
  moves: number,
  remaining?: number,
}

export interface ScoreCalc {
  efficiency: number,
  speed: number,
  points: number,
  pointsLessEffort?: number,
  pointsMoreSpeed?: number,
  pointsBoth?: number,
}

export interface BareScoreItem {
  [index]: string,
  code: string,
  date: number,
  user: string,
  game: GameScore,
  play: PlayScore,
  score: ScoreCalc,
}

export interface ScoreItem extends BareScoreItem {
  rank: number,
  signature: Signature,
  relative: Relative,
}

export type ScoreParam = keyof ScoreItem | keyof ScoreItem["game"] | keyof ScoreItem["game"]["effort"] | keyof ScoreItem["play"] | keyof ScoreItem["score"] | keyof ScoreItem["signature"]

export type FlatScore = Record<ScoreParam, number>

export type MarkScoreData = {
  param: ScoreParam;
  operate: string;
  quant: number;
}

export interface PageProps {
  onPause?: () => void;
  appearance?: string;
}
