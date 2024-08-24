import type { Component } from 'vue'

export interface MenuItem {
  key: KeyName
  component: Component | string
  icon: Component
  active: boolean
  enable: boolean
  props: Component
}

type KeyName = 'Me' | 'NowPlaying' | 'Game' | 'Blog' | 'About' | 'Contact'
