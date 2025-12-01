import type { Component } from 'vue'

export interface SocialLink {
  icon: Component
  href: string
  label: string
}

export interface NavItem {
  id: string
  label: string
  icon: Component
  active?: boolean
  children?: NavItem[] // For dropdowns
}

export interface GameItem {
  id: string
  title: string
  description: string
  review: string
  rating: number // 0-10
  playtime: string
  storeLink: string
  bgImage: string
  charImage: string
  theme: {
    primary: string
    secondary: string
    font: string
    style: 'gta' | 'division' | 'cyberpunk' | 'warthunder' | 'eve'
  }
}

export interface MediaItem {
  id: string
  title: string
  category: 'anime' | 'movie' | 'tv' | 'music'
  description: string
  review: string
  rating: number // 0-10
  year: string
  image: string
  theme: {
    primary: string
    secondary: string
    font: string
    style: string
  }
}

export interface Friend {
  id: string
  name: string
  avatar: string
  bio: string
  location?: string
  tags?: string[]
  socials?: SocialLink[]
  steamId?: string
}

export interface ContentItem {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content?: any // Vue component or markdown content
  isLocked?: boolean
  unlockCode?: string
}

export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  replies?: Comment[]
}

// API Response Types
export interface SteamStatus {
  online: boolean
  currentGame?: {
    name: string
    appId: string
    playtime: number
    image: string
  }
  lastOnline?: string
}

export interface NowPlaying {
  isPlaying: boolean
  track?: {
    name: string
    artist: string
    album: string
    image: string
    url: string
  }
}
