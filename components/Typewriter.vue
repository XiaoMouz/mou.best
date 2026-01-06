<!--
Thanks component design from @unixzii/cyandev.io 
source: https://github.com/unixzii/cyandev.io/blob/main/src/components/typewriter.tsx
-->
<template>
  <ClientOnly>
    <div class="text-3xl text-muted-foreground md:text-4xl">
      <span class="color-blue">${</span>
      <div
        class="absolute color-green-600 dark:color-green w-0 h-0 overflow-hidden"
        role="marquee"
        aria-label="a description with typewriter effect"
      >
        {{ description }}
      </div>
      <div
        class="inline overflow-hidden px-1 color-green-600 dark:color-green"
        aria-hidden="true"
      >
        {{ content }}
      </div>
      <div
        class="inline-block w-2 text-4xl md:text-5xl font-bold text-black-700 dark:text-white-800 rounded-sm select-none"
        :class="{ 'animate-smooth-blink': isIdle }"
      >
        |
      </div>

      <span class="color-blue">}</span>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

enum Stage {
  Deleting,
  ReadyToInsert,
  Inserting,
  Idle,
}

class TypewriterState {
  private _current: string
  private _target: string
  private _commonPrefixLength: number
  private _stage: Stage

  constructor(from: string, to: string) {
    this._current = from
    this._target = to

    // Find common prefix
    let lastCommon = -1
    for (let i = 0; i < Math.min(from.length, to.length); ++i) {
      if (from[i] === to[i]) lastCommon = i
      else break
    }
    // Avoid trailing space in common prefix
    if (lastCommon >= 0 && to[lastCommon] === ' ') --lastCommon
    this._commonPrefixLength = lastCommon + 1
    this._stage = Stage.Deleting
  }

  get current() {
    return this._current
  }
  get target() {
    return this._target
  }
  get stage() {
    return this._stage
  }

  advance(): boolean {
    if (this._stage === Stage.Deleting) {
      if (this._current.length > this._commonPrefixLength) {
        this._current = this._current.slice(0, -1)
      } else {
        this._stage = Stage.ReadyToInsert
      }
      return true
    }
    if (this._stage === Stage.ReadyToInsert) {
      this._stage = Stage.Inserting
      return true
    }
    if (this._stage === Stage.Inserting) {
      if (this._current.length < this._target.length) {
        this._current += this._target[this._current.length]
      } else {
        this._stage = Stage.Idle
      }
      return true
    }
    return false
  }
}

function randomDelay(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default defineComponent({
  name: 'Typewriter',
  props: {
    words: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    const content = ref(props.words[0])
    const description = ref(props.words[0])
    const isIdle = ref(true)
    const isTyping = ref(false)
    let transition: TypewriterState | null = null
    let curIdx = 0
    let timeout: ReturnType<typeof setTimeout> | null = null

    function nextIdx() {
      return (curIdx + 1) % props.words.length
    }

    function runTypewriter() {
      if (!transition) {
        const from = props.words[curIdx]
        curIdx = nextIdx()
        const to = props.words[curIdx]
        transition = new TypewriterState(from, to)
        description.value = to
        isIdle.value = false
        isTyping.value = true
      }

      if (transition.stage === Stage.Idle) {
        isIdle.value = true
        content.value = transition.current
        isTyping.value = false
        transition = null
        timeout = setTimeout(runTypewriter, randomDelay(1500, 3000))
        return
      }

      if (transition.stage === Stage.Deleting) {
        isIdle.value = false
        timeout = setTimeout(runTypewriter, randomDelay(30, 50))
      } else if (transition.stage === Stage.ReadyToInsert) {
        isIdle.value = false
        timeout = setTimeout(runTypewriter, 200)
      } else if (transition.stage === Stage.Inserting) {
        isIdle.value = false
        timeout = setTimeout(runTypewriter, randomDelay(50, 100))
      }

      transition.advance()
      content.value = transition.current
    }

    onMounted(() => {
      runTypewriter()
    })

    onUnmounted(() => {
      if (timeout) clearTimeout(timeout)
    })

    return {
      content,
      description,
      isIdle,
      isTyping,
    }
  },
})
</script>

<style scoped>
.animate-smooth-blink {
  animation: smooth-blink 1s infinite;
}

@keyframes smooth-blink {
  0% {
    opacity: 1;
  }

  40% {
    opacity: 1;
  }

  55% {
    opacity: 0;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/** 一个背景闪烁动画 */
.animate-background-blink {
  animation: background-blink 0.8s linear;
  width: 100%;
  height: 100%;
}

@keyframes background-blink {
  0% {
    @apply text-foreground bg-primary/30 dark:bg-primary/90 rounded-md;
  }

  100% {
  }
}
</style>
