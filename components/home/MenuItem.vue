<script setup lang="ts">
import type { MenuItem } from '~/types/home-menu'

const menu = useHomeMeta()
const props = defineProps<{ item: MenuItem }>()
const isReverse = useHomeMetaIsReverse()
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
      'cursor-pointer hover:bg-gray-600 fill-gray-900 dark:fill-slate-100 dark:bg-[#00000030]':
        !props.item.active && props.item.enable,
      ' bg-gray-200 fill-slate-700 dark:bg-gray-800 dark:fill-slate-200':
        props.item.active,
      'cursor-not-allowed': !props.item.enable,
      'fill-gray-600 bg-gray-400 dark:fill-gray-800 dark:bg-gray-700':
        !props.item.enable,
    }"
    @click="changeToActive"
  >
    <component class="w-6 h-6" :is="item.icon" />
  </div>
</template>
