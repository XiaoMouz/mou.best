import { ref } from 'vue'
import { type NetTestNode } from '~/types/overview/net-test-node'
import { type RemoteNetTestResults } from '~/types/overview/net-test-node'

export function useNetworkCardData(id: string) {
  const remoteTestResult = ref<RemoteNetTestResults | undefined>(undefined)

  async function fetchRemoteTest() {
    try {
      const response = await fetch(`https://api.mou.best/node/record/${id}`)
      const data = await response.json()
      remoteTestResult.value = data
    } catch (error) {
      console.error('Error fetching remote test data:', error)
    }
  }

  return {
    remoteTestResult,
    fetchRemoteTest
  }
}
