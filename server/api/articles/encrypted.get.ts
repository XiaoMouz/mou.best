import { useDatabase } from '~/server/database/client'

export default defineEventHandler(async () => {
  const db = useDatabase()

  try {
    // Query all encrypted articles, excluding password_hash and content
    const articles = await db.prepare(`
      SELECT
        id,
        slug,
        title,
        excerpt,
        tags,
        date,
        read_time as readTime
      FROM encrypted_articles
      ORDER BY date DESC
    `).all()

    return {
      success: true,
      articles: articles.map(article => ({
        ...article,
        tags: article.tags ? JSON.parse(article.tags as string) : [],
        isEncrypted: true,
      })),
    }
  } catch (error) {
    console.error('Error fetching encrypted articles:', error)
    return {
      success: false,
      error: 'Failed to fetch encrypted articles',
      articles: [],
    }
  }
})
