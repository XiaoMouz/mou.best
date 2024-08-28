import Me from '~/components/home/Me.vue'
import NowPlaying from '~/components/home/NowPlaying.vue'
import Pokemon from '~/components/icon/Pokemon.vue'
import HumenTransfer from '~/components/icon/HumenTransfer.vue'
import Gamepad from '~/components/icon/Gamepad.vue'
import type { MenuItem } from '~/types/home-menu'

export const useHomeMeta = () => {
  return useState<MenuItem[]>('homeMeta', (): MenuItem[] => {
    return [
      {
        key: 'Me',
        component: markRaw(Me),
        icon: markRaw(Pokemon),
        active: true,
        enable: true,
        props: {},
      },
      {
        key: 'NowPlaying',
        component: markRaw(NowPlaying),
        icon: markRaw(HumenTransfer),
        active: false,
        enable: true,
        props: {},
      },
      {
        key: 'Game',
        component: 'Contact',
        icon: markRaw(Gamepad),
        active: false,
        enable: false,
        props: {},
      },
    ]
  })
}
export const useHomeMetaIsReverse = () => {
  return useState<boolean>('homeMetaIsReverse', (): boolean => {
    return false
  })
}
