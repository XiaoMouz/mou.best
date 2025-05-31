<template>
    <div class="animated-background" aria-hidden="true">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    </div>
</template>
<style scoped>
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.4;
    pointer-events: none;
}

.animated-background .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    transition: transform 3s ease-out;
}

.animated-background .blob-1 {
    @apply bg-primary/70 dark:bg-primary/30;
    width: 300px;
    height: 300px;
    top: 20%;
    left: 10%;
}

.animated-background .blob-2 {
    @apply bg-primary/65 dark:bg-primary/40;
    width: 400px;
    height: 400px;
    top: 60%;
    right: 15%;
}

.animated-background .blob-3 {
    @apply bg-primary/75 dark:bg-primary/45;
    width: 200px;
    height: 200px;
    top: 10%;
    right: 20%;
}
</style>