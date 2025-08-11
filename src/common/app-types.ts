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

export type AppSubConfig = {
  BOARD_SIZE?: number;
  FONT_SIZE?: number;
  GAME_LEVEL?: number;
  LANGUAGE?: Languages;
  MAX_SCORES?: number;
  MINE_COUNT?: number;
  PLAYER_NAME?: string;
  CLOCK_TYPE?: ClockTypes;
}

export interface AppCheckConfig {
  BOARD_SIZE: number;
  GAME_LEVEL: number;
}

export interface AppConfig {
  BOARD_SIZE: number;
  FONT_SIZE: number;
  GAME_LEVEL: number;
  LANGUAGE: Languages;
  MAX_SCORES: number;
  MINE_COUNT: number;
  PLAYER_NAME: string;
  CLOCK_TYPE: ClockTypes;
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
  text: Translation,
  configure: (changesObject?: AppSubConfig) => void
}

export type Primitive = string | number | boolean

export interface InputRange {
  min: number,
  max: number,
}

export enum ClockTypes {
  NONE = '',
  ANALOG = 'analog',
  DIGITAL = 'digital',
}
