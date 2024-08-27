<script setup lang="ts">
import { type NetTestNode } from '~/types/overview/net-test-node'
import { type Database, type Tables } from '~/types/supabase.types'
import NetworkCard from '~/components/service/NetworkCard.vue'

definePageMeta({
  layout: 'service',
  middleware: 'auth',
})
const { netNodes } = useOverviewNetNode()

const { services } = useOverviewService()

</script>
<template>
  <div class="py-4 px-8 space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">Overview</h1>
    <div class="flex flex-col xl:flex-col flex-wrap gap-12">
      <div class="space-y-4">
        <h1 class="text-xl font-bold tracking-tight">Network</h1>
        <span class="text-sm text-gray-500"
          >The network connection stands as the pivotal linchpin for accessing
          all services.</span
        >
        <ClientOnly>
          <div
            class="flex flex-col md:flex-row flex-nowrap md:space-x-6"
            v-if="netNodes"
          >
            <NetworkCard
              class="mt-4 md:mt-0"
              v-for="network in netNodes"
              :key="network.id"
              v-bind="network"
            />
          </div>
          <div v-else>
            <div class="flex flex-col md:flex-row flex-nowrap md:space-x-6">
              <ServicePendingCard class="mt-4 md:mt-0" v-for="n in 4" />
            </div>
          </div>
        </ClientOnly>
      </div>
      <div class="space-y-4">
        <h1 class="text-xl font-bold tracking-tight">Service</h1>
        <span class="text-sm text-gray-500"
          >Here are the services that have been deployed. You can check their
          statuses here.</span
        >
        <ClientOnly>
          <div>
            <div class="flex flex-col md:flex-row flex-nowrap md:space-x-6">
              <ServiceCard v-if="services" class="mt-4 md:mt-0" v-for="service in services" :key="service.id" v-bind="service" />
              <ServicePendingCard v-else v-for="n in 4" />
            </div>
          </div>
        </ClientOnly>
      </div>
      
      <div class="space-y-4">
        <h1 class="text-xl font-bold tracking-tight">Proxy</h1>
        <span class="text-sm text-gray-500"
          >Here is the information from the proxy providers. You can check the
          usage and remaining balance.</span>
        <ClientOnly> 
          <div>
            <div class="flex flex-col md:flex-row flex-nowrap md:space-x-6">
              <!-- <ServicePendingCard class="mt-4 md:mt-0" v-for="n in 4" /> -->
               <WorkingOnProgree/>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
