<script setup lang="ts">
import { Dices } from 'lucide-vue-next'

const prizes = ref([
  { id: 1, name: 'CDK Key #1', rarity: 'legendary', probability: 5 },
  { id: 2, name: 'CDK Key #2', rarity: 'epic', probability: 15 },
  { id: 3, name: 'CDK Key #3', rarity: 'rare', probability: 30 },
  { id: 4, name: 'Thank you for trying!', rarity: 'common', probability: 50 },
])

const isSpinning = ref(false)
const result = ref<typeof prizes.value[0] | null>(null)

const spin = () => {
  if (isSpinning.value) return

  isSpinning.value = true
  result.value = null

  // Simulate API call or random selection based on probability
  setTimeout(() => {
    const random = Math.random() * 100
    let cumulative = 0

    for (const prize of prizes.value) {
      cumulative += prize.probability
      if (random <= cumulative) {
        result.value = prize
        break
      }
    }

    isSpinning.value = false
  }, 2000)
}

const getRarityColor = (rarity: string) => {
  const colors = {
    legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    epic: 'bg-gradient-to-r from-purple-400 to-pink-500',
    rare: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    common: 'bg-gray-400',
  }
  return colors[rarity as keyof typeof colors] || colors.common
}
</script>

<template>
  <div class="prize-lottery not-prose my-8">
    <div class="lottery-container">
      <h3 class="text-2xl font-bold text-center mb-4">🎁 Prize Lottery</h3>

      <div class="prizes-list mb-6 space-y-2">
        <div
          v-for="prize in prizes"
          :key="prize.id"
          class="prize-item flex justify-between items-center p-3 rounded-lg bg-surface-container"
        >
          <span class="font-medium">{{ prize.name }}</span>
          <span
            class="px-3 py-1 rounded-full text-xs text-white"
            :class="getRarityColor(prize.rarity)"
          >
            {{ prize.probability }}%
          </span>
        </div>
      </div>

      <div class="text-center">
        <button
          class="spin-button px-8 py-4 rounded-xl font-bold text-white transition-all"
          :class="[
            isSpinning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-hover hover:scale-105',
          ]"
          :disabled="isSpinning"
          @click="spin"
        >
          <Dices
            :size="20"
            class="inline mr-2"
            :class="{ 'animate-spin': isSpinning }"
          />
          {{ isSpinning ? 'Spinning...' : 'Spin Now!' }}
        </button>
      </div>

      <div
        v-if="result"
        class="result-display mt-6 p-6 rounded-xl text-center animate-fade-in"
        :class="getRarityColor(result.rarity)"
      >
        <h4 class="text-white text-xl font-bold mb-2">🎉 You won!</h4>
        <p class="text-white text-2xl font-extrabold">{{ result.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lottery-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-surface-container);
  border-radius: 1rem;
  border: 1px solid var(--color-outline-variant);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
