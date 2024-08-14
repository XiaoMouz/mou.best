<script setup lang="ts">
definePageMeta({
  layout: 'service',
  middleware: 'auth',
})
</script>
<template>
  <div class="py-4 px-8 space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">Overview</h1>
    <div class="space-y-4">
      <div>
        <h1 class="text-xl font-bold tracking-tight">Network</h1>
        <span class="text-sm text-gray-500"
          >The network connection stands as the pivotal linchpin for accessing
          all services.</span
        >
      </div>
      <div class="flex flex-row">
        <ServiceNetworkCard
          title="Main node"
          description=" The main node is crucial to many services. If you cannot connect
              to it, it's very likely you won't be able to connect to other
              services either."
          address="api.mou.best"
          serverSideStatus="up"
        />
      </div>
    </div>
  </div>
</template>
