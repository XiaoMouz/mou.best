export interface NetService {
  id: string
  app: string
  name: string
  linkTo: string
  address: string
  provide?: string
  appAddress: string
  status?: 'online' | 'offline' | 'maintenance' | 'expired' | 'error'
  description?: string
  dueTimestamp?: number
}
