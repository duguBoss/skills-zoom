import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../data.sqlite');

// Remove existing db if it exists
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    repoUrl TEXT NOT NULL,
    description TEXT,
    tags TEXT,
    author TEXT,
    addedAt TEXT,
    category TEXT,
    rating REAL,
    downloads INTEGER,
    env TEXT,
    verified INTEGER
  );

  CREATE TABLE bundles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    industry TEXT,
    difficulty TEXT,
    skillIds TEXT,
    highlights TEXT,
    color TEXT
  );
`);

// Load current JSON data
const skillsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/skills.json'), 'utf-8'));
const bundlesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/bundles.json'), 'utf-8'));

// Insert skills
const insertSkill = db.prepare(`
  INSERT INTO skills (id, name, repoUrl, description, tags, author, addedAt, category, rating, downloads, env, verified)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const skill of skillsData) {
  insertSkill.run(
    skill.id,
    skill.name,
    skill.repoUrl,
    skill.description,
    JSON.stringify(skill.tags),
    skill.author,
    skill.addedAt,
    skill.category,
    skill.rating,
    skill.downloads,
    skill.env,
    skill.verified ? 1 : 0
  );
}

// Insert bundles
const insertBundle = db.prepare(`
  INSERT INTO bundles (id, name, icon, description, industry, difficulty, skillIds, highlights, color)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const bundle of bundlesData) {
  insertBundle.run(
    bundle.id,
    bundle.name,
    bundle.icon,
    bundle.description,
    bundle.industry,
    bundle.difficulty,
    JSON.stringify(bundle.skillIds),
    JSON.stringify(bundle.highlights),
    bundle.color
  );
}

console.log('Successfully created data.sqlite from JSON data.');
db.close();
