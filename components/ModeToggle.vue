<script setup lang="ts">
const isDark = useDark()
</script>
<template>
    <div class="p-1 flex items-center rounded-lg">
        <button
            class="flex w-10 h-10 items-center justify-center rounded-lg dark:hover:bg-amber/50 hover:bg-foreground/30 transition duration-300 cursor-pointer  ease-in-out"
            @click="isDark ? (isDark = false) : (isDark = true)">
            <ClientOnly>
                <Transition name="fade">
                    <Icon name="mdi:weather-night" class="absolute w-5 h-5" v-if="isDark" />
                    <Icon name="mdi:weather-sunny" class="absolute w-5 h-5" v-else />
                </Transition>
            </ClientOnly>
        </button>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
