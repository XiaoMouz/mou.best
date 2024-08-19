export interface MenuItem {
  key: KeyName
  component: any
  icon: any
  active: boolean
  enable: boolean
  props: any
}

type KeyName = 'Me' | 'NowPlaying' | 'Game' | 'Blog' | 'About' | 'Contact'
