<script setup lang="ts">
const props = defineProps<{
  frameworks?: string[]
  defaultFramework?: string
}>()

const frameworks = props.frameworks || ['React', 'Vue', 'Angular', 'Svelte', 'Solid']
const selected = ref(props.defaultFramework || frameworks[0])

const getFrameworkColor = (framework: string) => {
  const colors: Record<string, string> = {
    React: 'bg-blue-500',
    Vue: 'bg-green-500',
    Angular: 'bg-red-500',
    Svelte: 'bg-orange-500',
    Solid: 'bg-purple-500',
  }
  return colors[framework] || 'bg-gray-500'
}
</script>

<template>
  <div class="framework-selector not-prose my-6">
    <div class="selector-container">
      <h4 class="text-lg font-semibold mb-3">Select your framework:</h4>

      <div class="frameworks-grid">
        <button
          v-for="framework in frameworks"
          :key="framework"
          class="framework-btn"
          :class="[
            getFrameworkColor(framework),
            selected === framework ? 'ring-4 ring-primary scale-105' : 'opacity-70',
          ]"
          @click="selected = framework"
        >
          {{ framework }}
        </button>
      </div>

      <div class="result mt-4 p-4 bg-primary-container rounded-lg text-center">
        <p class="text-sm text-on-primary-container">
          You selected: <span class="font-bold">{{ selected }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selector-container {
  padding: 1.5rem;
  background: var(--color-surface-container);
  border-radius: 0.75rem;
  border: 1px solid var(--color-outline-variant);
}

.frameworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.framework-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.framework-btn:hover {
  transform: translateY(-2px);
  opacity: 1 !important;
}
</style>
