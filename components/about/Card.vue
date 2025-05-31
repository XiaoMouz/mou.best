<script setup lang="ts">
const props = defineProps<{
    title: string
    description: string
}>()
</script>

<template>
    <div class="animate-in">
        <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <div class="p-6 flex flex-row items-center  space-x-4">
                <div class="p-2 rounded-full flex items-center justify-center bg-primary/10">
                    <slot required />
                </div>
                <!-- a line -->
                <div class="w-px h-20 rotate-5 bg-border mx-4" />
                <div flex flex-col items-start gap-4>
                    <h3 class="text-xl font-bold">{{ title }}</h3>
                    <p class="text-muted-foreground">{{ description }}</p>
                </div>

            </div>
        </div>
    </div>
</template>