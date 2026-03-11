import {
  readOwncastLiveState,
  resolveOwncastTitle,
  writeOwncastLiveState,
} from '~/server/utils/owncast'

interface OwncastWebhookPayload {
  type?: string
  eventData?: {
    streamTitle?: string
    timestamp?: string
    status?: {
      lastConnectTime?: string | null
      lastDisconnectTime?: string | null
      streamTitle?: string
      online?: boolean
    }
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<OwncastWebhookPayload>(event)

  if (!body?.type || !body.eventData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Owncast webhook payload',
    })
  }

  const currentState = await readOwncastLiveState()
  const timestamp = body.eventData.timestamp || new Date().toISOString()
  const incomingTitle =
    body.eventData.streamTitle || body.eventData.status?.streamTitle
  const nextTitle = resolveOwncastTitle(incomingTitle, currentState.title)

  let nextState = {
    ...currentState,
    title: nextTitle,
    updatedAt: timestamp,
  }

  switch (body.type) {
    case 'STREAM_STARTED':
      nextState = {
        ...nextState,
        isLive: true,
        currentStartedAt: timestamp,
        lastStartedAt: timestamp,
        lastEndedAt: null,
      }
      break

    case 'STREAM_TITLE_UPDATED': {
      const isLive = body.eventData.status?.online ?? nextState.isLive
      const inferredStartedAt =
        nextState.currentStartedAt ||
        body.eventData.status?.lastConnectTime ||
        nextState.lastStartedAt

      nextState = {
        ...nextState,
        isLive,
        currentStartedAt: isLive ? inferredStartedAt : null,
        lastStartedAt: isLive
          ? inferredStartedAt || nextState.lastStartedAt
          : nextState.lastStartedAt,
        lastEndedAt: isLive
          ? null
          : body.eventData.status?.lastDisconnectTime || nextState.lastEndedAt,
      }
      break
    }

    case 'STREAM_STOPPED': {
      const lastStartedAt =
        nextState.currentStartedAt ||
        body.eventData.status?.lastConnectTime ||
        nextState.lastStartedAt

      nextState = {
        ...nextState,
        isLive: false,
        currentStartedAt: null,
        lastStartedAt,
        lastEndedAt: body.eventData.status?.lastDisconnectTime || timestamp,
      }
      break
    }

    default:
      return {
        success: true,
        ignored: true,
        eventType: body.type,
      }
  }

  await writeOwncastLiveState(nextState)

  return {
    success: true,
    eventType: body.type,
  }
})
