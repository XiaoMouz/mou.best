<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
<template>
    <footer class="border-t py-6 md:py-8">
        <div
            class="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center gap-4 text-center md:gap-6">
            <div class="space-y-2">
                <p class="text-sm text-muted-foreground">&copy; {{ currentYear }} XiaoMouz. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>