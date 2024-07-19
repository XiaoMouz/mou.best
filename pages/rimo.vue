<script setup lang="ts">
definePageMeta({
  auth: false,
})
const countdown = ref(0) //  max 6
const strokeDashoffset = ref(717) // max 717
const images = [
  '/image/dot1.jpg',
  '/image/dot2.jpg',
  '/image/dot3.jpg',
  '/image/dot4.jpg',
]
const imageUrl = ref(images[0])
const nextImageUrl = ref(images[1])
const index = ref(1)
const switching = ref(false)

const offsetScroll = ref(0)

onMounted(() => {
  countdown.value = 6
  strokeDashoffset.value = 0

  setInterval(() => {
    requestAnimationFrame(() => {
      countdown.value = 0
      strokeDashoffset.value = 717
    })
    loadNext()
  }, 6000)

  window.addEventListener('scroll', () => {
    offsetScroll.value = -window.scrollY
  })
})

function loadNext() {
  if (index.value + 1 === images.length) {
    index.value = 0
  }
  fetch(images[++index.value]).then(() => {
    requestAnimationFrame(() => {
      countdown.value = 6
      strokeDashoffset.value = 0
    })
  })
  new Promise((resolve) => {
    switching.value = true
    setTimeout(() => {
      switching.value = false
      resolve(switching)
    }, 1200)
  })
  requestAnimationFrame(() => {
    imageUrl.value = nextImageUrl.value
    nextImageUrl.value = images[index.value]
  })
}
</script>
<template>
  <main class="simulation-animation bg-gray-200">
    <section class="flex flex-col overflow-hidden">
      <div
        class="flex relative md:flex-row flex-col justify-between overflow-y-hidden bg-white"
      >
        <!-- Index-->
        <div
          class="relative simulation-animation overflow-hidden z-10"
          style="flex: 0 0 75%"
        >
          <div
            :class="
              switching
                ? `absolute push-in w-full h-full bg-blue-400`
                : `hidden`
            "
          ></div>
          <div>
            <img
              class="w-full object-cover object-center lg:h-[100vh] h-[80vh]"
              z-10
              :src="imageUrl"
            />
          </div>
        </div>

        <!-- Self Text -->
        <div style="flex: 0 0 25%" class="relative simulation-animation w-full">
          <div class="min-w-full">
            <div class="mt-[40%]">
              <div class="flex flex-row justify-center">
                <div class="text-3xl text-center select-none">
                  <span>你好呀</span>
                  <p>我是 RimoOvO</p>
                </div>
                <IconCat class="h-20 w-20" />
              </div>
            </div>
          </div>
        </div>
        <!-- Float Circle-->
        <div
          class="simulation-animation absolute bottom-[40vw] left-[6vw] md:right-[18%] md:bottom-[10%] md:left-[inherit] h-[32vw] w-[32vw] md:h-[16vw] md:w-[16vw] z-20"
          style="transition: all 0.6s"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="h-[32vw] w-[32vw] md:h-[16vw] md:w-[16vw] process-circle"
            >
              <svg
                id="indexSvg"
                data-name="indexSvg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 239.99 240.03"
                :style="`transition-duration: ${
                  countdown * 1000
                }ms; stroke-dashoffset:${strokeDashoffset}`"
              >
                <path
                  id="indexSvgPath"
                  data-name="indexSvgPath"
                  d="M121.52,6C179.07,6.73,234,53.32,234,120.34c0,63-51.91,113.43-112.44,113.69S6,187.66,6,120.21,60.78,6,121.61,6"
                  transform="translate(0)"
                  class="stroke-cyan-400 stroke-[13px]"
                  style="fill: none"
                ></path>
              </svg>
            </div>
          </div>
          <img
            class="rounded-full h-[32vw] w-[32vw] md:h-[16vw] md:w-[16vw]"
            :src="nextImageUrl"
          />
        </div>
        <!-- Background -->
        <div
          class="simulation-animation absolute bottom-[45vw] right-[6vw] md:right-2 md:bottom-[1%] md:left-[inherit] h-[32vw] w-[32vw] md:h-[16vw] md:w-[16vw] z-0"
          style="transition: transform 0.8s"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="420"
            height="420"
            viewBox="0 0 420 420"
            class="blur-sm absolute overflow-y-hidden max-w-full"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="0.5"
                x2="0.5"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop
                  offset="0"
                  class="gradientColor1"
                  stop-color="#ff3e81"
                  style="stop-color: #57c8fa !important"
                ></stop>
                <stop
                  offset="1"
                  class="gradientColor2"
                  stop-color="#ffde86"
                  style="stop-color: #a6f8b3 !important"
                ></stop>
              </linearGradient>
            </defs>
            <circle
              cx="180"
              cy="180"
              r="180"
              transform="translate(390 30) rotate(90)"
              lighting-color="#490209"
              fill="url(#linear-gradient)"
            ></circle>
          </svg>
        </div>
      </div>
    </section>
    <article class="flex flex-col bg-blue-400 relative simulation-animation">
      <div>
        <div class="flex flex-row pt-5 h-[100vh]">
          <div v-for="link in images">
            <img class="h-20 w-20 object-cover object-center" :src="link" />
          </div>
        </div>
      </div>
    </article>
  </main>
</template>
<style scoped>
.process-circle svg {
  fill: none;
  stroke-dasharray: 717;
  stroke-dashoffset: 717;
  transition-timing-function: linear;
}

/** 一个动画，将 div 从右向左推入 而后推出到左边并将位置固定至左边不可视区域 */
@keyframes push-in {
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.push-in {
  animation: push-in 1.2s;
}

/** 使用 matrix3d 做 transform动画，与 vue 的 offsetScroll 变量绑定 **/
.simulation-animation {
  transform: matrix3d(
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    v-bind(offsetScroll),
    0,
    1
  );

  transition: transform 0.3s;
}
ear-gradient#lin1 .gradientColor1 {
  stop-color: #57c8fa !important;
}
#linear-gradient1 {
  stop-color: #a6f8b3 !important;
}
</style>
