<script setup lang="ts">
import { Lock, Unlock } from 'lucide-vue-next'

const props = defineProps<{
  slug: string
  title: string
}>()

const emit = defineEmits<{
  unlocked: [article: any]
}>()

const password = ref('')
const error = ref('')
const loading = ref(false)

const { unlockArticle } = useEncryptedArticles()

const handleUnlock = async () => {
  if (!password.value.trim()) {
    error.value = 'Please enter a password'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await unlockArticle(props.slug, password.value)

    if (result.success) {
      emit('unlocked', result)
      password.value = ''
    } else {
      error.value = result.error || 'Incorrect password'
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to unlock article'
  } finally {
    loading.value = false
  }
}

const handleKeypress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleUnlock()
  }
}
</script>

<template>
  <div class="password-unlock-container">
    <div class="unlock-card">
      <div class="lock-icon">
        <Lock :size="48" />
      </div>

      <h2 class="unlock-title">{{ title }}</h2>
      <p class="unlock-description">
        This article is password protected. Enter the password to unlock.
      </p>

      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          class="password-input"
          :disabled="loading"
          @keypress="handleKeypress"
        >
        <button
          class="unlock-button"
          :disabled="loading || !password.trim()"
          @click="handleUnlock"
        >
          <Unlock v-if="!loading" :size="20" />
          <span v-if="loading">Unlocking...</span>
          <span v-else>Unlock</span>
        </button>
      </div>

      <p v-if="error" class="error-message">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.password-unlock-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.unlock-card {
  max-width: 28rem;
  width: 100%;
  padding: 2.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  text-align: center;
}

.lock-icon {
  display: inline-flex;
  padding: 1rem;
  background: var(--color-primary-alpha);
  border-radius: 50%;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.unlock-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.unlock-description {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.password-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background: var(--color-background);
  color: var(--color-text);
  transition: all 0.2s;
}

.password-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}

.password-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.unlock-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.unlock-button:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.unlock-button:active:not(:disabled) {
  transform: translateY(0);
}

.unlock-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: var(--color-error, #ef4444);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
