<script setup lang="ts">
import type { MenuItem } from '~/types/home-menu'

const menu = useHomeMeta().homeMeta
const props = defineProps<{ item: MenuItem }>()
const icon = useHomeMeta().getIcon(props.item.key)
const isReverse = useHomeMeta().homeMetaIsReverse
function changeToActive() {
  if (props.item.enable) {
    const index = menu.value.findIndex((item) => item.active === true)
    menu.value.forEach((item) => {
      item.active = false
    })
    const targetIndex = menu.value.findIndex(
      (item) => item.key === props.item.key
    )

    if (index < targetIndex) {
      isReverse.value = false
    } else {
      isReverse.value = true
    }
    props.item.active = true
  }
}
</script>
<template>
  <div
    class="p-2 w-10 h-10 flex items-center justify-center rounded-full transition duration-300 ease-in-out"
    :class="{
      'cursor-pointer hover:bg-gray-400 fill-gray-900 dark:fill-gray-200  ':
        !props.item.active && props.item.enable,
      ' bg-gray-200 fill-slate-700 dark:bg-gray-800  dark:fill-gray-200 ':
        props.item.active,
      'cursor-not-allowed  fill-gray-400 dark:fill-gray-800 ':
        !props.item.enable,
    }"
    @click="changeToActive"
  >
    <Icon v-if="typeof icon === 'string'" :name="icon.toString()" />
    <component class="w-6 h-6" v-else :is="icon" />
  </div>
</template>
