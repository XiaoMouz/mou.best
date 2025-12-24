---
title: "Advanced Article Features Demo"
excerpt: "Explore custom themes, interactive components, and beautiful headers in Nuxt Content"
date: "2025-12-19"
readTime: "10 min read"
tags: ["Tutorial", "Demo", "Features"]
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop"
imageAlt: "Abstract colorful gradient background"
theme:
  fontSize: "lg"
  fontFamily: "serif"
  lineHeight: "relaxed"
  primaryColor: "#6366f1"
---

# Advanced Article Features Demo

Welcome to the ultimate guide on customizing your articles! This article demonstrates all the advanced features you can use.

## 🎨 Custom Themes

This article uses a **custom theme** with:
- **Font Size**: Large (lg)
- **Font Family**: Serif
- **Line Height**: Relaxed
- **Primary Color**: Indigo (#6366f1)

You can customize these in the frontmatter of any article!

::Callout{type="info" title="Pro Tip"}
Use the `theme` object in your article's frontmatter to customize the reading experience for each article individually.
::

## 🎯 Interactive Components

### Framework Selector

Choose your favorite framework:

::FrameworkSelector
::

### Prize Lottery

Try your luck!

::PrizeLottery
::

## 💡 Callout Components

::Callout{type="success" title="Success"}
You've successfully learned how to use custom components!
::

::Callout{type="warning" title="Warning"}
Remember to install all required dependencies before using these components.
::

::Callout{type="error" title="Error"}
Don't forget to configure your content.config.ts file!
::

## 📸 Header Images

This article features a beautiful header image that displays both in the article list and at the top of the article page. You can set custom images using the `image` field in frontmatter.

## 📝 How to Use These Features

### 1. Custom Theme

Add a `theme` object to your frontmatter:

```yaml
---
title: "My Article"
theme:
  fontSize: "lg"          # sm, base, lg, xl
  fontFamily: "serif"     # sans, serif, mono, custom
  fontWeight: "medium"    # light, normal, medium, semibold, bold
  lineHeight: "relaxed"   # tight, normal, relaxed, loose
  primaryColor: "#6366f1"
  backgroundColor: "#f9fafb"
  textColor: "#1f2937"
---
```

### 2. Header Images

```yaml
---
image: "https://example.com/image.jpg"
imageAlt: "Image description"
---
```

### 3. Custom Components

Use MDC syntax to include custom components:

```markdown
::ComponentName{prop="value"}
Content here (optional)
::
```

### 4. Component Props

Each component accepts different props:

- **Callout**: `type` (info|success|warning|error), `title`
- **FrameworkSelector**: `frameworks` (array), `defaultFramework`
- **PrizeLottery**: No props required

## 🚀 Creating Your Own Components

Create components in `components/content/` directory:

```vue
<!-- components/content/MyComponent.vue -->
<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="my-component">
    <h3>{{ title }}</h3>
    <slot />
  </div>
</template>
```

Then use it in your articles:

```markdown
::MyComponent{title="Hello"}
This is the content!
::
```

## 🎉 Conclusion

With these features, you can create rich, interactive, and beautifully themed articles that engage your readers in unique ways!

::Callout{type="success" title="You're Ready!"}
Start creating amazing articles with custom themes, interactive components, and stunning visuals!
::
