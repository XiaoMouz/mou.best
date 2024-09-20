import { defineConfig } from 'unocss'
import { presetIcons, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

import { presetTypography } from '@unocss/preset-typography'

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetTypography()],

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
      'black-shadow': '#00000080',
    },
    borderRadius: {
      xl: 'calc(var(--radius) + 4px)',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      'collapsible-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-collapsible-content-height)' },
      },
      'collapsible-up': {
        from: { height: 'var(--radix-collapsible-content-height)' },
        to: { height: '0' },
      },
      smoothBlink: {
        '0%, 40%, 100%': { opacity: '1' },
        '55%, 90%': { opacity: '0' },
      },
      slideInFromTop: {
        '0%': { transform: 'translateY(-100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'collapsible-down': 'collapsible-down 0.2s ease-in-out',
      'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      'smooth-blink': 'smoothBlink 1s linear infinite',
      'slide-in-from-top': 'slideInFromTop 0.5s ease-out',
    },
    backgroundImage: {
      'index-hero': "url('https://mou.best/images/banner.jpg')",
    },
  },
  transformers: [transformerDirectives()],
})
