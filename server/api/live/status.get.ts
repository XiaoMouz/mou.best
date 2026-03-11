import { readOwncastLiveState } from '~/server/utils/owncast'

export default defineEventHandler(async () => {
  const state = await readOwncastLiveState()

  if (state.isLive) {
    return {
      title: state.title,
      isLive: true,
      startedAt: state.currentStartedAt,
    }
  }

  return {
    title: state.title,
    isLive: false,
    lastStartedAt: state.lastStartedAt,
    lastEndedAt: state.lastEndedAt,
  }
})
