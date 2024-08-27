<!--
Thanks component design from @unixzii/cyandev.io 
source: https://github.com/unixzii/cyandev.io/blob/main/src/components/typewriter.tsx
-->
<template>
  <div class="text-lg md:text-lg">
    <div
      class="absolute w-0 h-0 overflow-hidden"
      role="marquee"
      aria-label="a description with typewriter effect"
    >
      {{ description }}
    </div>
    <div class="inline overflow-hidden" aria-hidden="true">
      {{ content }}
    </div>
    <div
      class="inline-block w-2 ml-0.5 bg-caret font-bold text-blue-400 rounded-sm select-none"
      :class="{ 'animate-smooth-blink': idle }"
    >
      |
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'

enum TypewriterTransitionStage {
  Deleting = 0,
  ReadyToInsert = 1,
  Inserting = 2,
  Idle = 3,
}

class TypewriterTransitionState {
  private _current: string
  private _target: string
  private _commonPrefixLength: number
  private _stage: TypewriterTransitionStage

  constructor(from: string, to: string) {
    this._current = from
    this._target = to

    // Find the common prefix.
    const walkLength = Math.min(from.length, to.length)
    let lastCommonIndex = -1
    for (let index = 0; index < walkLength; ++index) {
      if (from[index] === to[index]) {
        lastCommonIndex = index
      } else {
        break
      }
    }
    if (lastCommonIndex >= 0 && to[lastCommonIndex] === ' ') {
      --lastCommonIndex
    }
    this._commonPrefixLength = lastCommonIndex + 1

    this._stage = TypewriterTransitionStage.Deleting
  }

  get current(): string {
    return this._current
  }

  get target(): string {
    return this._target
  }

  get stage(): TypewriterTransitionStage {
    return this._stage
  }

  advance(): boolean {
    const stage = this._stage
    if (stage == TypewriterTransitionStage.Deleting) {
      this._advanceDeleting()
    } else if (stage == TypewriterTransitionStage.ReadyToInsert) {
      this._stage = TypewriterTransitionStage.Inserting
    } else if (stage == TypewriterTransitionStage.Inserting) {
      this._advanceAdding()
    } else {
      return false
    }
    return true
  }

  private _advanceDeleting() {
    if (this._current.length > this._commonPrefixLength) {
      this._current = this._current.slice(0, -1)
    } else {
      this._stage = TypewriterTransitionStage.ReadyToInsert
    }
  }

  private _advanceAdding() {
    if (this._current.length < this._target.length) {
      this._current += this._target[this._current.length]
    } else {
      this._stage = TypewriterTransitionStage.Idle
    }
  }
}

function rangedRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  name: 'Typewriter',
  props: {
    snippets: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    const currentString = ref(props.snippets[0])
    const targetString = ref(props.snippets[0])
    const idle = ref(true)
    const delay = ref(1000)
    const transition = ref<TypewriterTransitionState | null>(null)
    const index = ref(0)

    const update = () => {
      const currentIndex = index.value
      const nextIndex = (currentIndex + 1) % props.snippets.length

      // todo:令人恶心的 if，但是不是很想改
      if (transition.value?.stage === TypewriterTransitionStage.Idle) {
        delay.value = rangedRandom(1500, 3000)
        idle.value = true
      } else {
        if (!transition.value) {
          delay.value = rangedRandom(30, 50)
          idle.value = true
        } else {
          if (transition.value.stage === TypewriterTransitionStage.Inserting) {
            delay.value = rangedRandom(50, 100)
            idle.value = false
          } else if (
            transition.value.stage === TypewriterTransitionStage.ReadyToInsert
          ) {
            delay.value = 200
            idle.value = false
          }
        }
      }

      if (!transition.value) {
        transition.value = new TypewriterTransitionState(
          props.snippets[currentIndex],
          props.snippets[nextIndex]
        )
        index.value = nextIndex
      }

      const running = transition.value.advance()
      currentString.value = transition.value.current
      targetString.value = transition.value.target

      if (!running) {
        transition.value = null // Release for the next one
      }
      startTyping()
    }

    const startTyping = () => {
      const { isPending, start, stop } = useTimeoutFn(() => {
        update()
        stop()
      }, delay.value)

      start()
    }

    onMounted(() => {
      startTyping()
    })

    return {
      content: currentString,
      description: targetString,
      idle,
    }
  },
}
</script>

<style scoped></style>
