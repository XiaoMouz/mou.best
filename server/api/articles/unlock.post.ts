import { useDatabase } from '~/server/database/client'
import { verifyPassword } from '~/server/utils/crypto'

export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const body = await readBody(event)

  const { slug, password } = body

  if (!slug || !password) {
    throw createError({
      statusCode: 400,
      message: 'Slug and password are required',
    })
  }

  try {
    // Find article by slug
    const article = await db.prepare(`
      SELECT
        id,
        slug,
        title,
        excerpt,
        content,
        password_hash,
        tags,
        date,
        read_time as readTime
      FROM encrypted_articles
      WHERE slug = ?
    `).get(slug)

    if (!article) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      })
    }

    // Verify password
    const isValid = await verifyPassword(password, article.password_hash as string)

    if (!isValid) {
      return {
        success: false,
        error: 'Incorrect password',
      }
    }

    // Return article content (excluding password_hash)
    return {
      success: true,
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        tags: article.tags ? JSON.parse(article.tags as string) : [],
        date: article.date,
        readTime: article.readTime,
      },
    }
  } catch (error: any) {
    console.error('Error unlocking article:', error)

    // Re-throw HTTP errors
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to unlock article',
    })
  }
})
