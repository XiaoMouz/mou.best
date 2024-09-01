export interface NetTestNode {
  id: string
  title: string
  address: string
  description?: string
  serviceFrom?: string
  controledStatus?: 'up' | 'down' | 'unknown' | 'maintenance'
}
export interface RemoteNetTestResult {
  delay: number
  error: boolean
  status: 'up' | 'down' | 'unknown' | 'maintenance'
  time: number
}

export interface RemoteNetTestResults {
  id: string
  info: NetTestNode
  results: RemoteNetTestResult[]
}
