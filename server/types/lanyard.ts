// Lanyard API Types
interface LanyardAssets {
  large_image?: string
  large_text?: string
  small_image?: string
  small_text?: string
}

interface LanyardTimestamps {
  start?: number
  end?: number
}

interface LanyardActivity {
  application_id?: string
  assets?: LanyardAssets
  buttons?: string[]
  created_at: number
  details?: string
  id: string
  name: string
  platform?: string
  session_id?: string
  state?: string
  status_display_type?: number
  timestamps?: LanyardTimestamps
  type: number // 0 = Playing, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom, 5 = Competing
  sync_id?: string // Spotify track ID
}

interface LanyardPrimaryGuild {
  badge: string
  identity_enabled: boolean
  identity_guild_id: string
  tag: string
}

interface LanyardDiscordUser {
  avatar: string
  avatar_decoration_data: Record<string, any>
  bot: boolean
  collectibles: Record<string, any>
  discriminator: string
  display_name: string
  display_name_styles: any
  global_name: string
  id: string
  primary_guild?: LanyardPrimaryGuild
  public_flags: number
  username: string
}

interface LanyardSpotify {
  track_id: string
  timestamps: {
    start: number
    end: number
  }
  song: string
  artist: string
  album_art_url: string
  album: string
}

interface LanyardData {
  kv: Record<string, string>
  discord_user: LanyardDiscordUser
  activities: LanyardActivity[]
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  active_on_discord_web: boolean
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_embedded: boolean
  listening_to_spotify: boolean
  spotify: LanyardSpotify | null
}

interface LanyardResponse {
  success: boolean
  data: LanyardData
}

export type {
  LanyardResponse,
  LanyardData,
  LanyardActivity,
  LanyardAssets,
  LanyardTimestamps,
  LanyardDiscordUser,
  LanyardSpotify,
}
