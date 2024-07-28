<template>
  <section class="flex items-center justify-center gap-4">
    <a class="button" target="_blank" href="https://x.com/XiaoMouz"
      ><IconTwitter class="primary-fill button-icon"
    /></a>
    <a class="button" target="_blank" href="https://github.com/XiaoMouz">
      <IconGithub class="primary-fill button-icon" />
    </a>
    <a class="button" target="_blank" href="https://t.me/XiaoMouz"
      ><IconPaperPlane class="primary-fill button-icon" />
    </a>
    <a class="button" target="_blank" href="mailto:gxiaomouz@gmail.com"
      ><IconGmail class="primary-fill button-icon"
    /></a>
    <a class="button" target="_blank" href="https://m.mou.best/@XiaoMouz">
      <IconMastodon class="primary-fill button-icon" />
    </a>
    <a
      class="button"
      target="_blank"
      href="https://space.bilibili.com/64110204"
    >
      <IconBilibili class="primary-fill button-icon" />
    </a>
  </section>
</template>
<style scoped>
.button-icon {
  @apply align-middle size-5;
}
.button {
  @apply rounded-md size-8 flex items-center justify-center;
  transition-duration: 0.2s;
}

.button:hover {
  @apply bg-black bg-opacity-20;
}
@media (prefers-color-scheme: dark) {
  .button:hover {
    @apply bg-white bg-opacity-20;
  }
}

.primary-fill {
  @apply fill-current;
}
</style>
