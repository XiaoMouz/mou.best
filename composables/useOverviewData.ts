import { ref, onMounted } from 'vue'
import { type NetService } from '~/types/overview/service-info'
import { type NetTestNode } from '~/types/overview/net-test-node'
import { type Database, type Tables } from '~/types/supabase.types'

export function useOverviewNetNode() {
  const netNodes = ref<NetTestNode[]>()

  async function fetchData() {
    const client = useSupabaseClient<Database>()
    const { data } = await client
      .from('datasources')
      .select('*')
      .eq('id', 1)
      .returns<Tables<'datasources'>[]>()

    if (!data) {
      console.log('No data available')
      return
    }

    if (data && data.length > 0 && data[0].content) {
      netNodes.value = JSON.parse(JSON.stringify(data[0].content))
    }
  }

  onMounted(fetchData)

  return {
    netNodes,
    fetchData
  }
}

export function useOverviewService() {
  const services = ref<NetService[]>()
  async function fetchData() {
    const client = useSupabaseClient<Database>()
    const { data } = await client
      .from('datasources')
      .select('*')
      .eq('id', 2)
      .returns<Tables<'datasources'>[]>()

    if (!data) {
      console.log('No data available')
      return
    }

    if (data && data.length > 0 && data[0].content) {
      services.value = JSON.parse(JSON.stringify(data[0].content))
    }
  }

  onMounted(fetchData)

  return {
    services,
    fetchData
  }
}
