import Me from '~/components/Me.vue'
import NowPlaying from '~/components/NowPlaying.vue'

import Pokemon from '~/components/icon/Pokemon.vue'
import HumenTransfer from '~/components/icon/HumenTransfer.vue'
import Gamepad from '~/components/icon/Gamepad.vue'

import { type KeyName, type MenuItem } from '~/types/home-menu'
import type { Component } from 'vue'
import Blog from '~/components/home/Blog.vue'

const keyMap: Record<
  string,
  { component: Component; icon: String | Component }
> = {
  Me: {
    component: markRaw(Me),
    icon: markRaw(Pokemon),
  },
  NowPlaying: {
    component: markRaw(NowPlaying),
    icon: markRaw(HumenTransfer),
  },
  Game: {
    component: markRaw(NowPlaying),
    icon: markRaw(Gamepad),
  },
  Blog: {
    component: markRaw(Blog),
    icon: 'mdi:newspaper',
  },
}

export const useHomeMeta = () => {
  const homeMetaIsReverse = useState<boolean>(
    'homeMetaIsReverse',
    (): boolean => {
      return false
    }
  )
  const homeMeta = useState<MenuItem[]>('homeMeta', (): MenuItem[] => {
    return [
      {
        key: 'Me',
        active: true,
        enable: true,
        props: {},
      },
      {
        key: 'Blog',
        active: false,
        enable: true,
        props: {},
      },
    ]
  })

  const getComponent = (key: KeyName) => {
    return keyMap[key].component
  }
  const getIcon = (key: KeyName) => {
    return keyMap[key].icon
  }

  return { homeMeta, homeMetaIsReverse, getComponent, getIcon }
}
