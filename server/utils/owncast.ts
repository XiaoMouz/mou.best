export interface OwncastLiveState {
  title: string | null
  isLive: boolean
  currentStartedAt: string | null
  lastStartedAt: string | null
  lastEndedAt: string | null
  updatedAt: string | null
}

const OWNCAST_LIVE_STATE_KEY = 'owncast:live:state'

function getDefaultOwncastLiveState(): OwncastLiveState {
  return {
    title: null,
    isLive: false,
    currentStartedAt: null,
    lastStartedAt: null,
    lastEndedAt: null,
    updatedAt: null,
  }
}

function normalizeOwncastLiveState(
  state?: Partial<OwncastLiveState> | null,
): OwncastLiveState {
  const defaults = getDefaultOwncastLiveState()

  return {
    title: state?.title ?? defaults.title,
    isLive: state?.isLive ?? defaults.isLive,
    currentStartedAt: state?.currentStartedAt ?? defaults.currentStartedAt,
    lastStartedAt: state?.lastStartedAt ?? defaults.lastStartedAt,
    lastEndedAt: state?.lastEndedAt ?? defaults.lastEndedAt,
    updatedAt: state?.updatedAt ?? defaults.updatedAt,
  }
}

export function resolveOwncastTitle(
  nextTitle?: string | null,
  fallback?: string | null,
): string | null {
  const normalizedTitle = nextTitle?.trim()
  if (normalizedTitle) {
    return normalizedTitle
  }

  return fallback ?? null
}

export async function readOwncastLiveState() {
  const storage = useStorage('cache')
  const state = await storage.getItem<OwncastLiveState>(OWNCAST_LIVE_STATE_KEY)

  return normalizeOwncastLiveState(state)
}

export async function writeOwncastLiveState(state: OwncastLiveState) {
  const normalizedState = normalizeOwncastLiveState(state)

  const storage = useStorage('cache')
  await storage.setItem(OWNCAST_LIVE_STATE_KEY, normalizedState)
}
