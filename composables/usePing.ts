export function usePing(address: string) {
  const pingStatus = ref<'up' | 'down' | 'pending'>('pending')
  const pingTime = ref<number | undefined>(undefined)

  async function ping() {
    pingStatus.value = 'pending'
    const start = new Date().getTime()
    try {
      await fetch(`http://${address}`, {
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      const end = new Date().getTime()
      pingStatus.value = 'up'
      pingTime.value = end - start
    } catch {
      pingStatus.value = 'down'
      pingTime.value = undefined
    }
  }

  return {
    pingStatus,
    pingTime,
    ping,
  }
}
