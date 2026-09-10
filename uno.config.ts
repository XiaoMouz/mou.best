import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        lucide: () =>
          import('@iconify-json/lucide/icons.json').then((i) => i.default),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      accent: 'rgb(var(--accent))',
      // Material Design 3 color tokens
      background: 'rgb(var(--background))',
      'on-background': 'rgb(var(--on-background))',
      surface: 'rgb(var(--surface))',
      'surface-container': 'rgb(var(--surface-container))',
      'surface-container-high': 'rgb(var(--surface-container-high))',
      primary: 'rgb(var(--primary))',
      'on-primary': 'rgb(var(--on-primary))',
      'primary-container': 'rgb(var(--primary-container))',
      'on-primary-container': 'rgb(var(--on-primary-container))',
      secondary: 'rgb(var(--secondary))',
      'on-secondary': 'rgb(var(--on-secondary))',
      'secondary-container': 'rgb(var(--secondary-container))',
      'on-secondary-container': 'rgb(var(--on-secondary-container))',
      tertiary: 'rgb(var(--tertiary))',
      'tertiary-container': 'rgb(var(--tertiary-container))',
      outline: 'rgb(var(--outline))',
      'outline-variant': 'rgb(var(--outline-variant))',
      'on-surface': 'rgb(var(--on-background))',
      'on-surface-variant': 'rgb(var(--outline))',
    },
  },
})
