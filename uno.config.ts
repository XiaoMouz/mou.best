import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  shortcuts: [],
  rules: [
    [
      'bg-linear-to-r',
      {
        'background-image':
          'linear-gradient(to right, var(--un-gradient-stops))',
      },
    ],
  ],
  theme: {
    colors: {
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      transparent: {
        background: 'var(--transparent-background)',
        foreground: 'var(--transparent-foreground)',
      },
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      destructive: {
        DEFAULT: 'var(--destructive)',
        foreground: 'var(--destructive-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'var(--popover-foreground)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
      outcard: {
        DEFAULT: 'var(--outcard)',
        foreground: 'var(--outcard-foreground)',
      },
    },
    borderRadius: {
      xl: 'calc(var(--radius) + 4px)',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
