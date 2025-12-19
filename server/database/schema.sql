-- Encrypted Articles Table
CREATE TABLE IF NOT EXISTS encrypted_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  tags TEXT,                    -- JSON array
  date TEXT NOT NULL,
  read_time TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_encrypted_articles_slug ON encrypted_articles(slug);
