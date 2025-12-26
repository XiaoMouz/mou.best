import type { LanyardResponse } from '~/server/types/lanyard'

interface CachedMusicData {
  data: Result
  timestamp: number
}

type Result = {
  isPlaying: boolean
  track: {
    name: string
    artist: string
    albumArt?: string
    url?: string
    platform?: string
  } | null
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Get Discord User ID from environment
  const DISCORD_USER_ID =
    config.NUXT_DISCORD_USER_ID || process.env.DISCORD_USER_ID

  if (!DISCORD_USER_ID) {
    console.warn('Discord User ID not configured')
    return {
      isPlaying: false,
      track: null,
    }
  }

  const CACHE_KEY = 'discord:music'
  const CACHE_TTL = 60 // 1 minute in seconds

  try {
    // Try to get from cache first
    const storage = useStorage('cache')
    const cached = await storage.getItem<CachedMusicData>(CACHE_KEY)

    if (cached) {
      const now = Date.now()
      const age = (now - cached.timestamp) / 1000 // Convert to seconds

      if (age < CACHE_TTL) {
        return cached.data
      }
      // If expired, continue to fetch new data
    }

    // Fetch from Lanyard API
    const lanyardUrl = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
    const response: LanyardResponse = await $fetch(lanyardUrl)

    if (!response.success || !response.data) {
      throw new Error('Failed to fetch Discord presence data')
    }

    const presence = response.data
    console.log('🚀 ~ presence:', presence)

    // Check for music activity (type 2 = "Listening")
    // Supports Spotify, NetEase Cloud Music, Apple Music, YouTube Music, etc.
    const musicActivity = presence.activities?.find(
      (activity) => activity.type === 2
    )

    let result
    if (musicActivity) {
      // Handle different music platforms
      const platformName = musicActivity.name
      let albumArt = undefined
      let trackUrl = undefined

      // Spotify
      if (platformName === 'Spotify' && musicActivity.sync_id) {
        trackUrl = `https://open.spotify.com/track/${musicActivity.sync_id}`
        if (musicActivity.assets?.large_image) {
          albumArt = `https://i.scdn.co/image/${musicActivity.assets.large_image.replace(
            'spotify:',
            ''
          )}`
        }
      }
      // NetEase Cloud Music & other platforms with custom RPC
      else if (musicActivity.name.includes('Music')) {
        // Check if it's a Music Presence proxy URL or external asset
        if (musicActivity?.assets?.large_image?.startsWith('mp:external/')) {
          // Music Presence external URL format
          albumArt = `https://cdn.discordapp.com/external/${musicActivity.assets.large_image.replace(
            'mp:external/',
            ''
          )}`
        } else if (musicActivity?.assets?.large_image?.startsWith('http')) {
          albumArt = musicActivity.assets.large_image
        }
      }

      result = {
        isPlaying: true,
        track: {
          name: musicActivity.details || musicActivity.name, // Song name
          artist: musicActivity.state || 'Unknown Artist', // Artist name
          albumArt,
          url: trackUrl,
          platform: platformName, // e.g., "Spotify", "NetEase Cloud Music"
        },
      }
    } else {
      result = {
        isPlaying: false,
        track: null,
      }
    }

    // Cache the result with timestamp
    await storage.setItem(
      CACHE_KEY,
      {
        data: result,
        timestamp: Date.now(),
      },
      { ttl: CACHE_TTL }
    )

    return result
  } catch (error) {
    console.error('Error fetching Discord music status:', error)

    // Return empty state on error
    return {
      isPlaying: false,
      track: null,
    }
  }
})
