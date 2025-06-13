<script setup lang="ts">
</script>

<template>
    <div
        class="rounded-lg bg-card hover:border-primary/50 duration-300 border border-transparent text-card-foreground overflow-hidden  shadow-md hover:shadow-2xl hover:shadow-primary/20  transition-all duration-300 hover:-translate-y-1">
        <div class="relative overflow-hidden">
            <div
                class="w-full h-48 sm:h-56 object-cover transition-transform duration-300 animate-pulse bg-black/15 dark:bg-white/15 group-hover:scale-105">
            </div>
            <div class="absolute top-4 left-4">
                <div
                    class="inline-flex items-center rounded-full border w-12 h-5 px-2.5 py-0.5 text-xs font-semibold duration-300 animate-pulse bg-black/30 dark:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent">
                </div>
            </div>
        </div>
        <div class="flex flex-col space-y-1.5 p-6 pb-2">
            <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div class="flex items-center gap-1">
                    <Icon name="mdi:calendar-outline" size-4 />
                    <div
                        class="inline-flex items-center rounded-full border w-20 h-4 px-2.5 py-0.5 text-xs font-semibold duration-300 animate-pulse bg-black/30 dark:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent">
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <Icon name="mdi:clock-outline" size-4 />
                    <div
                        class="inline-flex items-center rounded-full border w-16 h-4 px-2.5 py-0.5 text-xs font-semibold duration-300 animate-pulse bg-black/30 dark:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent">
                    </div>
                </div>
            </div>
            <h3
                class="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                <div
                    class="inline-flex items-center rounded-xl border w-24 h-8 px-2 py-0.5 text-xs font-semibold duration-300 animate-pulse bg-black/40 dark:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent">
                </div>
            </h3>
        </div>
        <div class="p-6 pt-0 inline-flex flex-col gap-2 w-full">
            <div
                class="inline-flex items-center rounded-xl border w-full h-4 px-2 py-0.5 text-xs font-semibold duration-300 animate-pulse bg-black/35 dark:bg-white/35 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent">
            </div>
            <div
                class="inline-flex items-center rounded-xl border w-full h-4 px-2 py-0.5 text-xs font-semibold duration-300 animate-pulse bg-black/35 dark:bg-white/35 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent">
            </div>
        </div>
    </div>
</template>