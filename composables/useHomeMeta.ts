import Me from '~/components/home/Me.vue'
import NowPlaying from '~/components/home/NowPlaying.vue'
import Pokemon from '~/components/icon/Pokemon.vue'
import HumenTransfer from '~/components/icon/HumenTransfer.vue'
import Gamepad from '~/components/icon/Gamepad.vue'

import { type KeyName, type MenuItem } from '~/types/home-menu'

const keyMap: Record<string, { component: Component; icon: Component }> = {
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
        key: 'NowPlaying',
        active: false,
        enable: true,
        props: {},
      },
      {
        key: 'Game',
        active: false,
        enable: false,
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
