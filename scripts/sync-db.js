import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../data.sqlite');

if (!fs.existsSync(dbPath)) {
  console.log('No data.sqlite found. Skipping sync.');
  process.exit(0);
}

const db = new DatabaseSync(dbPath);

// Fetch skills
const skillsStmt = db.prepare('SELECT * FROM skills');
const skillsRows = skillsStmt.all();

const skillsData = skillsRows.map(row => ({
  id: row.id,
  name: row.name,
  repoUrl: row.repoUrl,
  description: row.description,
  tags: JSON.parse(row.tags),
  author: row.author,
  addedAt: row.addedAt,
  category: row.category,
  rating: row.rating,
  downloads: row.downloads,
  env: row.env,
  verified: row.verified === 1
}));

fs.writeFileSync(
  path.resolve(__dirname, '../src/data/skills.json'),
  JSON.stringify(skillsData, null, 2),
  'utf-8'
);

// Fetch bundles
const bundlesStmt = db.prepare('SELECT * FROM bundles');
const bundlesRows = bundlesStmt.all();

const bundlesData = bundlesRows.map(row => ({
  id: row.id,
  name: row.name,
  icon: row.icon,
  description: row.description,
  industry: row.industry,
  difficulty: row.difficulty,
  skillIds: JSON.parse(row.skillIds),
  highlights: JSON.parse(row.highlights),
  color: row.color
}));

fs.writeFileSync(
  path.resolve(__dirname, '../src/data/bundles.json'),
  JSON.stringify(bundlesData, null, 2),
  'utf-8'
);

console.log('Successfully synced data.sqlite to JSON files.');
db.close();
