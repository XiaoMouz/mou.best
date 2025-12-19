---
title: "Welcome to the New Article System"
excerpt: "Learn how to create public and encrypted articles with our new hybrid content system."
date: "2025-12-19"
readTime: "3 min read"
tags: ["Tutorial", "Getting Started"]
---

# Welcome to the New Article System

This is an example of a public article using Nuxt Content. You can write your content here using Markdown!

## Features

- **Public Articles**: Stored as `.md` files in `content/articles/`
- **Encrypted Articles**: Stored in SQLite database with password protection
- **Seamless Integration**: Both types display together in the articles list

## Writing Public Articles

Simply create a new `.md` file in `content/articles/` with frontmatter:

```markdown
---
title: "Your Article Title"
excerpt: "A short description"
date: "2025-12-19"
readTime: "5 min read"
tags: ["Tag1", "Tag2"]
---

Your content here...
\```

## Adding Encrypted Articles

Use the database directly or create a management interface to add encrypted articles with password protection.

## Next Steps

1. Visit the [articles page](/articles) to see all articles
2. Try unlocking an encrypted article with the password
3. Start writing your own content!

Enjoy writing!
