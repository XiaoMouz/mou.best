import { createDatabase, type Database } from 'db0'
import cloudflareD1 from 'db0/connectors/cloudflare-d1'

let _db: Promise<Database> | null = null

export function useDatabase() {
  return (_db ??= createDatabaseForRuntime())
}

async function createDatabaseForRuntime() {
  if (!import.meta.dev) {
    return createDatabase(cloudflareD1({ bindingName: 'DB' }))
  }

  const [{ default: nodeSqlite }, { readFile }, { resolve }] =
    await Promise.all([
      import('db0/connectors/node-sqlite'),
      import('node:fs/promises'),
      import('node:path'),
    ])
  const db = createDatabase(nodeSqlite({ name: 'articles' }))
  const migration = await readFile(
    resolve(process.cwd(), 'migrations/0001_encrypted_articles.sql'),
    'utf8',
  )
  await db.exec(migration)
  return db
}
