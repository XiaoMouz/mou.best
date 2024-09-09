<script setup lang="ts"></script>

<template>
  <NuxtLayout name="service">
    <main class="flex flex-row">
      <div class="gap-4 py-4">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Node</h2>
        <div class="space-y-1">
          <Button variant="secondary" class="w-full justify-start"
            >---------------------------</Button
          >
          <Button variant="ghost" class="w-full justify-start">Unkown</Button>
        </div>
      </div>
      <div>
        <slot />
      </div>
    </main>
  </NuxtLayout>
</template>
