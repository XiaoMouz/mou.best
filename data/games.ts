import type { GameItem } from '~/types'

export const gamesData: GameItem[] = [
  {
    id: 'gta5',
    title: "Grand Theft Auto V",
    description: "Experience the ultimate open-world adventure in Los Santos. A satirical reimagining of modern Southern California, covering mountains, deserts, and the urban sprawl.",
    review: "A technical masterpiece that defined a generation. The narrative weaving between three protagonists offers a unique perspective on the chaotic world, though the satire sometimes feels too cynical. The physics engine remains unmatched.",
    rating: 9.5,
    playtime: "1,200h",
    storeLink: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/",
    bgImage: "https://images.unsplash.com/photo-1596484552885-6bb04b77f9c2?q=80&w=2070&auto=format&fit=crop", // LA/Urban vibe
    charImage: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png", // Box art proxy
    theme: {
      primary: '#569332', // GTA HUD Green
      secondary: '#000000',
      font: 'font-sans',
      style: 'gta'
    }
  },
  {
    id: 'division',
    title: "The Division",
    description: "A devastating pandemic sweeps through New York City, and one by one, basic services fail. You are part of the Division, an autonomous unit of tactical agents.",
    review: "The atmosphere of a snowy, desolate NYC is hauntingly beautiful. The UI design (diegetic holographic interface) is the gold standard for AR in games. The gameplay loop is satisfying, though the endgame can feel repetitive.",
    rating: 8.8,
    playtime: "450h",
    storeLink: "https://store.steampowered.com/app/365590/Tom_Clancys_The_Division/",
    bgImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop", // Snowy City vibe
    charImage: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop", // Tactical gear / Gas mask proxy
    theme: {
      primary: '#ff9600', // The Division Orange
      secondary: '#1a1a1a',
      font: 'font-mono',
      style: 'division'
    }
  }
]
