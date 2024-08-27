<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

definePageMeta({
  auth: false,
})

const menu = useHomeMeta()

const selected = ref(menu.value.find((item) => item.active === true)?.key)

const currentComponent = computed(() => {
  return menu.value.find((item) => item.active === true)?.component
})

const nestedProps = computed(() => {
  return menu.value.find((item) => item.active === true)?.props
})

const isReverse = useHomeMetaIsReverse()
const translateYout = computed(() => {
  return isReverse.value ? '-100%' : '100%'
})
const translateYin = computed(() => {
  return isReverse.value ? '100%' : '-100%'
})

const nextItem = () => {
  isReverse.value = false
  const index = menu.value.findIndex((item) => item.active === true)
  if (index < menu.value.length - 1) {
    if (!menu.value[index + 1].enable) return
    menu.value[index].active = false
    menu.value[index + 1].active = true
  }
}
const prevItem = () => {
  isReverse.value = true
  const index = menu.value.findIndex((item) => item.active === true)
  if (index > 0) {
    menu.value[index].active = false
    menu.value[index - 1].active = true
  }
}

onMounted(() => {
  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)

  var xDown: any = null
  var yDown: any = null

  function getTouches(evt: any) {
    return evt.touches || evt.originalEvent.touches
  }

  function handleTouchStart(evt: any) {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }

  function handleTouchMove(evt: any) {
    if (!xDown || !yDown) {
      return
    }

    var xUp = evt.touches[0].clientX
    var yUp = evt.touches[0].clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
    } else {
      if (yDiff > 0) {
        nextItem()
      } else {
        prevItem()
      }
    }

    xDown = null
    yDown = null
  }
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      nextItem()
    } else {
      prevItem()
    }
  })
})
</script>

<template>
  <HomeWelcome />
  <HomeMenu />
  <div class="relative bg-[#ffffff30] dark:bg-black-shadow w-full h-full">
    <div class="bg-inner"></div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <KeepAlive>
        <Transition class="absolute" name="fade">
          <component
            :is="currentComponent"
            :key="selected"
            v-bind="nestedProps"
          />
        </Transition>
      </KeepAlive>
    </div>
  </div>
  <div class="relative"></div>
</template>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

.bg-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(https://mou.best/images/banner.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(v-bind('translateYout'));
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(v-bind('translateYin'));
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
