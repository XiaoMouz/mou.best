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

export type ContentType = 'article' | 'note' | 'showcase'
export type Language = 'en' | 'zh'
export type AccessLevel = 'public' | 'locked' | 'private'

export interface ContentItem {
  id: number
  type: ContentType
  title: string
  excerpt: string
  date: string
  readTime?: string
  tags: string[]
  image?: string
  language: Language
  access?: AccessLevel
  allowSectionComments?: boolean
  allowGeneralComments?: boolean
  theme?: {
    primaryColor?: string
    backgroundColor?: string
    borderColor?: string
    fontFamily?: string
  }
  embeddedComponent?: Component
  body: Component | string | any
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
