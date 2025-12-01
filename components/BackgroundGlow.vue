<script setup lang="ts">
const noiseStyle = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
}
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background transition-colors duration-300">
    <!-- Top Left Blob - Primary (Pastel Blue) -->
    <div class="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[100px] animate-blob opacity-10" />

    <!-- Center Right Blob - Tertiary (Pinkish) -->
    <div class="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-tertiary rounded-full blur-[120px] animate-blob animation-delay-2000 opacity-10" />

    <!-- Bottom Center Blob - Secondary (Slate/Blue-Grey) -->
    <div class="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-secondary rounded-full blur-[100px] animate-blob animation-delay-4000 opacity-10" />

    <!-- Noise Texture Overlay -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      :style="noiseStyle"
    />
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
