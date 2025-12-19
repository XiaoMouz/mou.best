import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'
import bcrypt from 'bcrypt'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Import content data
const contentDataPath = join(process.cwd(), 'data/content.ts')
const contentDataContent = readFileSync(contentDataPath, 'utf-8')

// Parse content data (simplified extraction)
const contentDataMatch = contentDataContent.match(/export const contentData[^=]*=\s*(\[[\s\S]*?\])/m)
if (!contentDataMatch) {
  console.error('Failed to parse contentData')
  process.exit(1)
}

// Evaluate the array (this is a simple eval, in production you'd use proper parser)
const contentData = eval(contentDataMatch[1])

console.log(`Found ${contentData.length} articles to migrate`)

// Setup database
const dataDir = join(process.cwd(), '.data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const dbPath = join(dataDir, 'articles.db')
const db = createDatabase(sqlite({ name: dbPath }))

// Initialize schema
const schemaPath = join(process.cwd(), 'server/database/schema.sql')
const schema = readFileSync(schemaPath, 'utf-8')
const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0)

for (const statement of statements) {
  db.exec(statement)
}

// Setup content directory
const contentDir = join(process.cwd(), 'content/articles')
if (!existsSync(contentDir)) {
  mkdirSync(contentDir, { recursive: true })
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// Helper function to create markdown frontmatter
function createMarkdownFile(article: any, slug: string): string {
  const frontmatter = `---
title: "${article.title}"
excerpt: "${article.excerpt}"
date: "${article.date}"
readTime: "${article.readTime}"
tags: ${JSON.stringify(article.tags || [article.category])}
---

# ${article.title}

${article.excerpt}

<!-- Add your article content here -->

This article was migrated from the old content system. Please add the full content.
`
  return frontmatter
}

// Migrate articles
async function migrateArticles() {
  let publicCount = 0
  let encryptedCount = 0

  for (const article of contentData) {
    const slug = generateSlug(article.title)

    if (article.isLocked) {
      // Migrate to encrypted database
      console.log(`Migrating encrypted article: ${article.title} (slug: ${slug})`)

      const passwordHash = await bcrypt.hash(article.unlockCode || 'default', 10)

      await db.prepare(`
        INSERT INTO encrypted_articles (slug, title, excerpt, content, password_hash, tags, date, read_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        slug,
        article.title,
        article.excerpt,
        `# ${article.title}\n\n${article.excerpt}\n\n<!-- Add full content here -->`,
        passwordHash,
        JSON.stringify(article.tags || [article.category]),
        article.date,
        article.readTime
      )

      console.log(`  ✓ Encrypted article created with password: "${article.unlockCode}"`)
      encryptedCount++
    } else {
      // Migrate to Nuxt Content markdown files
      console.log(`Migrating public article: ${article.title} (slug: ${slug})`)

      const markdownContent = createMarkdownFile(article, slug)
      const filePath = join(contentDir, `${slug}.md`)

      writeFileSync(filePath, markdownContent, 'utf-8')

      console.log(`  ✓ Markdown file created: ${filePath}`)
      publicCount++
    }
  }

  console.log('\n=== Migration Summary ===')
  console.log(`Public articles (Nuxt Content): ${publicCount}`)
  console.log(`Encrypted articles (Database): ${encryptedCount}`)
  console.log(`Total: ${contentData.length}`)
  console.log('\nMigration completed successfully!')
}

// Run migration
migrateArticles().catch(console.error)
