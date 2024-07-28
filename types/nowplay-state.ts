export enum NowPlayState {
  PENDING = 'PENDING',
  PLAYING = 'PLAYING',
  NOSTATUS = 'NOSTATUS',
  ERROR = 'ERROR',
  CUSTOM = 'CUSTOM',
}

export interface NowPlayingType {}

export interface NowPlaying {
  state: NowPlayState
  time: number
  duration: number
}
