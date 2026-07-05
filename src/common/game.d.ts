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
  mines: number,
  level?: number,
  playMode?: PlayMode, // backwards compatibility
  mode?: PlayMode,
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
}

export type ScoreParam = keyof ScoreItem | keyof ScoreItem["game"] | keyof ScoreItem["play"] | keyof ScoreItem["score"]

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
