import Me from '~/components/home/Me.vue'
import NowPlaying from '~/components/home/NowPlaying.vue'
import Pokemon from '~/components/icon/Pokemon.vue'
import HumenTransfer from '~/components/icon/HumenTransfer.vue'
import Gamepad from '~/components/icon/Gamepad.vue'

import { type MenuItem } from '~/types/home-menu'
export const useHomeMeta = () => {
  return useState<MenuItem[]>('homeMeta', (): MenuItem[] => {
    return [
      {
        key: 'Me',
        component: Me,
        icon: Pokemon,
        active: true,
        enable: true,
        props: {},
      },
      {
        key: 'NowPlaying',
        component: NowPlaying,
        icon: HumenTransfer,
        active: false,
        enable: false,
        props: {},
      },
      {
        key: 'Game',
        component: 'Contact',
        icon: Gamepad,
        active: false,
        enable: false,
        props: {},
      },
    ]
  })
}
