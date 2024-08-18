export interface NetTestNode {
  title: string
  address: string
  description: string | undefined
  serviceFrom: string
  serverSideStatus: 'up' | 'down' | 'unknown' | undefined
}
