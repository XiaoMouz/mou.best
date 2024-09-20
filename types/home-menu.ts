import type { Component, ComponentPropsOptions } from 'vue'

export interface MenuItem {
  key: KeyName
  active: boolean
  enable: boolean
  props: ComponentPropsOptions
}

export type KeyName =
  | 'Me'
  | 'NowPlaying'
  | 'Game'
  | 'Blog'
  | 'About'
  | 'Contact'
