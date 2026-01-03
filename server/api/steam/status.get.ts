export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Get Steam API credentials from environment
  const STEAM_API_KEY = config.STEAM_API_KEY || process.env.STEAM_API_KEY
  const DEFAULT_STEAM_USER_ID =
    config.STEAM_USER_ID || process.env.STEAM_USER_ID

  // Get allowed Steam user IDs from environment (comma-separated)
  const ALLOWED_STEAM_USERS = (
    config.ALLOWED_STEAM_USERS ||
    process.env.ALLOWED_STEAM_USERS ||
    DEFAULT_STEAM_USER_ID ||
    ''
  )
    .split(',')
    .map((id: string) => id.trim())
    .filter(Boolean)

  // Get user ID from query parameter, fallback to default
  const query = getQuery(event)
  const requestedUserId = (query.userId as string) || DEFAULT_STEAM_USER_ID

  // Validate user ID is in whitelist
  if (!ALLOWED_STEAM_USERS.includes(requestedUserId)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Steam user ID not allowed',
    })
  }

  if (!STEAM_API_KEY || !requestedUserId) {
    console.warn('Steam API credentials not configured')
    return {
      isOnline: false,
      currentGame: null,
      profileUrl: `https://steamcommunity.com/profiles/${
        requestedUserId || ''
      }`,
    }
  }

  const STEAM_USER_ID = requestedUserId
  const CACHE_KEY = `steam:status:${STEAM_USER_ID}`
  const CACHE_TTL = 600 * 1000 // 10 minutes in milliseconds

  try {
    // Try to get from cache first
    const storage = useStorage('cache')
    const cached = await storage.getItem<{
      data: any
      timestamp: number
    }>(CACHE_KEY)

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data
    }

    // Fetch from Steam API
    // 1. Get player summaries to check online status
    const summaryUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_USER_ID}`
    const summaryResponse = await $fetch(summaryUrl)
    const playerData = summaryResponse?.response?.players?.[0]
    console.log('🚀 ~ playerData:', playerData)

    if (!playerData) {
      throw new Error('Failed to fetch player data')
    }

    // 2. Get recently played games
    const recentGamesUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&format=json`
    const recentGamesResponse = await $fetch(recentGamesUrl)
    const recentGames = recentGamesResponse?.response?.games || []

    // Check if player is currently in-game
    const isInGame = playerData.gameextrainfo !== undefined
    const currentGame = isInGame
      ? {
          name: playerData.gameextrainfo,
          appId: playerData.gameid,
          playTime: Math.round(
            (recentGames.find((g: any) => g.appid === playerData.gameid)
              ?.playtime_forever || 0) / 60
          ), // Convert minutes to hours
          artUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${playerData.gameid}/header.jpg`,
          details: playerData.gameserverip ? 'In Game' : 'Playing',
        }
      : recentGames.length > 0
      ? {
          name: recentGames[0].name,
          appId: recentGames[0].appid,
          playTime: Math.round(recentGames[0].playtime_forever / 60), // Convert minutes to hours
          artUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${recentGames[0].appid}/header.jpg`,
          details: 'Recently Played',
        }
      : null

    const result = {
      isOnline: playerData.personastate !== 0, // 0 = Offline
      currentGame,
      profileUrl:
        playerData.profileurl ||
        `https://steamcommunity.com/profiles/${STEAM_USER_ID}`,
    }

    // Cache the result with timestamp
    await storage.setItem(CACHE_KEY, {
      data: result,
      timestamp: Date.now(),
    })

    return result
  } catch (error) {
    console.error('Error fetching Steam status:', error)

    // Return mock data on error
    return {
      isOnline: false,
      currentGame: null,
      profileUrl: `https://steamcommunity.com/profiles/${STEAM_USER_ID}`,
    }
  }
})
