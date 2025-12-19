import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

let _db: ReturnType<typeof createDatabase> | null = null

export function useDatabase() {
  if (_db) {
    return _db
  }

  const dataDir = process.env.NUXT_DATA_DIR || join(process.cwd(), '.data')
  const dbPath = join(dataDir, 'articles.db')

  _db = createDatabase(
    sqlite({
      name: dbPath,
    })
  )

  // Initialize schema
  const schemaPath = join(process.cwd(), 'server/database/schema.sql')
  const schema = readFileSync(schemaPath, 'utf-8')

  // Execute schema
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  for (const statement of statements) {
    _db.exec(statement)
  }

  return _db
}
