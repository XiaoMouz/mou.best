export interface NetService {
  id: string
  app: string
  name: string
  linkTo: string
  address: string
  provide: string | undefined
  appAddress: string
  status: 'online' | 'offline' | 'maintenance' | 'expired' | 'error' | undefined
  description: string | undefined
  dueTimestamp: number | undefined
}
