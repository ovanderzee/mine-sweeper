import React from 'react'

// a translation is a one-deep grouped collection
export type Translation = Record<string, Record<string, string>>

export enum Languages {
  en = 'en',
  nl = 'nl',
}

export enum LanguageTranslation {
  en = 'English',
  nl = 'Nederlands',
}

export enum PlayMode {
  NORMAL = 'Normal',
  BARE = 'Bare',
  SHARP = 'Sharp',
}

export type AppSubConfig = {
  BOARD_SIZE?: number;
  GAME_LEVEL?: number;
  MINE_COUNT?: number;
  PLAY_MODE?: PlayMode;
  LANGUAGE?: Languages;
  FONT_SIZE?: number;
  PLAYER_NAME?: string;
  VERBOSE_BTN?: boolean;
}

export interface AppCheckConfig {
  BOARD_SIZE: number;
  GAME_LEVEL: number;
  MINE_COUNT?: number;
  PLAY_MODE?: PlayMode;
  LANGUAGE?: Languages;
  FONT_SIZE?: number;
  PLAYER_NAME?: string;
  VERBOSE_BTN?: boolean;
}

export interface AppConfig {
  BOARD_SIZE: number;
  GAME_LEVEL: number;
  MINE_COUNT: number;
  PLAY_MODE: PlayMode;
  LANGUAGE: Languages;
  FONT_SIZE: number;
  PLAYER_NAME: string;
  VERBOSE_BTN: boolean;
}

export enum BoardFit {
  NORMAL = 'normal',
  CONTAIN = 'contain',
  COVER = 'cover',
}

export type AppSubSession = {
  MAGNIFICATION?: number;
  BOARD_FIT?: BoardFit;
  ACTIVE_CELL_ID?: string;
}

export interface AppSession {
  MAGNIFICATION: number;
  BOARD_FIT: BoardFit;
  ACTIVE_CELL_ID?: string;
}

export interface PageState {
  render: React.ReactElement;
  config: AppConfig;
  text: Translation;
}

export interface PageContextProps {
  render: React.ReactElement | null,
  navigate: (component: React.ReactElement) => void,
  config: AppConfig,
  session: AppSession,
  text: Translation,
  configure: (changesObject?: AppSubConfig) => void
  updSession: (changesObject?: AppSubSession) => void
}

export type Primitive = string | number

export interface InputRange {
  min: number,
  max: number,
}

type ElementLike = HTMLElement | Element | null

type EventHandler = (event: Event) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Class = { new(...args: any[]): any; };

interface ScreenfullApi {
  isFullscreen: () => boolean;
  isFullscreenAble: () => boolean;
  addFullscreenChangeEvent: () => void;
  removeFullscreenChangeEvent: () => void;
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
}
