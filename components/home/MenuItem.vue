<script setup lang="ts">
import type { MenuItem } from '~/types/home-menu'

const menu = useHomeMeta()
const props = defineProps<{ item: MenuItem }>()
console.log(props)
function changeToActive() {
  if (props.item.enable) {
    menu.value.forEach((item) => {
      item.active = false
    })
    props.item.active = true
  }
}
</script>
<template>
  <div
    class="p-2 rounded-full transition duration-300 ease-in-out"
    :class="{
      'cursor-pointer hover:bg-gray-600 fill-gray-900 dark:fill-slate-100':
        !props.item.active && props.item.enable,
      ' bg-gray-200 fill-slate-700 dark:bg-gray-900 dark:fill-slate-200':
        props.item.active,
      'cursor-not-allowed': !props.item.enable,
      'fill-gray-600 bg-gray-400 dark:fill-gray-800 dark:bg-gray-700':
        !props.item.enable,
    }"
    @click="changeToActive"
  >
    <component :is="item.icon" />
  </div>
</template>
