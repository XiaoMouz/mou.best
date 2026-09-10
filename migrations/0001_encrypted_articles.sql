CREATE TABLE IF NOT EXISTS encrypted_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  tags TEXT,
  date TEXT NOT NULL,
  read_time TEXT,
  image TEXT,
  image_alt TEXT,
  theme TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_encrypted_articles_slug
  ON encrypted_articles(slug);

INSERT OR IGNORE INTO encrypted_articles
  (slug, title, excerpt, content, password_hash, tags, date, read_time)
VALUES
  (
    'typescript-',
    'TypeScript 高级类型技巧',
    '掌握 TypeScript 中的高级类型技巧，提升代码质量和开发效率。',
    '# TypeScript 高级类型技巧

掌握 TypeScript 中的高级类型技巧，提升代码质量和开发效率。

<!-- Add full content here -->',
    '$2b$10$pBSYFSyhr/XYZkzcRC4UP.mhTxYNI3rRfopRy.KsM.1gbGYUfIlEm',
    '["Development"]',
    'Sep 15, 2023',
    '6 min read'
  ),
  (
    'webgl-',
    'WebGL 性能优化实战',
    '从实战角度出发，分享 WebGL 应用的性能优化技巧和最佳实践。',
    '# WebGL 性能优化实战

从实战角度出发，分享 WebGL 应用的性能优化技巧和最佳实践。

<!-- Add full content here -->',
    '$2b$10$XnzJNZBce9INcpcMnd6r9OJIU1pN229OMWGVIT.qfQQzsX/1KUVd6',
    '["Graphics"]',
    'Aug 30, 2023',
    '10 min read'
  );
