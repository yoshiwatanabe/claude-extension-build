#!/usr/bin/env node
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'demo.db');

console.log('Creating demo database...');

const db = new Database(DB_PATH);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Insert sample data
const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
const insertPost = db.prepare('INSERT INTO posts (user_id, title, content, published) VALUES (?, ?, ?, ?)');
const insertComment = db.prepare('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)');

// Sample users
const users = [
  ['Alice Johnson', 'alice@example.com'],
  ['Bob Smith', 'bob@example.com'],
  ['Carol Davis', 'carol@example.com']
];

const userIds = [];
for (const user of users) {
  const result = insertUser.run(...user);
  userIds.push(result.lastInsertRowid);
}

// Sample posts
const posts = [
  [userIds[0], 'Getting Started with MCP', 'Model Context Protocol is amazing...', 1],
  [userIds[0], 'Building Custom Tools', 'Here\'s how to build your own MCP server...', 1],
  [userIds[1], 'Database Integration', 'Connecting Claude to databases...', 1],
  [userIds[2], 'Best Practices', 'Tips for working with Claude Code...', 0]
];

const postIds = [];
for (const post of posts) {
  const result = insertPost.run(...post);
  postIds.push(result.lastInsertRowid);
}

// Sample comments
const comments = [
  [postIds[0], userIds[1], 'Great introduction!'],
  [postIds[0], userIds[2], 'Very helpful, thanks!'],
  [postIds[1], userIds[2], 'Looking forward to trying this.'],
  [postIds[2], userIds[0], 'Excellent guide!']
];

for (const comment of comments) {
  insertComment.run(...comment);
}

console.log('Demo database created successfully!');
console.log('Location:', DB_PATH);
console.log('\nDatabase contents:');
console.log(`- ${userIds.length} users`);
console.log(`- ${postIds.length} posts`);
console.log(`- ${comments.length} comments`);

db.close();
