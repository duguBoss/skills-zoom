import express from 'express';
import cors from 'cors';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../data.sqlite');

// Ensure database exists
if (!fs.existsSync(dbPath)) {
  console.log('Creating data.sqlite from JSON data...');
  const initScript = path.resolve(__dirname, '../scripts/init-sqlite.js');
  await import('file://' + initScript);
}

const db = new DatabaseSync(dbPath);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Skills API ───────────────────────────────────────

app.get('/api/skills', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM skills ORDER BY addedAt DESC');
    const rows = stmt.all();
    const skills = rows.map(row => ({
      id: row.id,
      name: row.name,
      repoUrl: row.repoUrl,
      description: row.description,
      tags: JSON.parse(row.tags || '[]'),
      author: row.author,
      addedAt: row.addedAt,
      category: row.category,
      rating: row.rating,
      downloads: row.downloads,
      env: row.env,
      verified: row.verified === 1,
    }));
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/skills/:id', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM skills WHERE id = ?');
    const row = stmt.get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({
      success: true,
      data: {
        id: row.id,
        name: row.name,
        repoUrl: row.repoUrl,
        description: row.description,
        tags: JSON.parse(row.tags || '[]'),
        author: row.author,
        addedAt: row.addedAt,
        category: row.category,
        rating: row.rating,
        downloads: row.downloads,
        env: row.env,
        verified: row.verified === 1,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/skills', (req, res) => {
  try {
    const skill = req.body;
    const stmt = db.prepare(`
      INSERT INTO skills (id, name, repoUrl, description, tags, author, addedAt, category, rating, downloads, env, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      skill.id,
      skill.name,
      skill.repoUrl,
      skill.description || '',
      JSON.stringify(skill.tags || []),
      skill.author || '',
      skill.addedAt || new Date().toISOString().slice(0, 10),
      skill.category || '',
      skill.rating || 0,
      skill.downloads || 0,
      skill.env || '',
      skill.verified ? 1 : 0
    );
    res.json({ success: true, message: 'Skill created' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/skills/:id', (req, res) => {
  try {
    const skill = req.body;
    const stmt = db.prepare(`
      UPDATE skills SET
        name = ?, repoUrl = ?, description = ?, tags = ?, author = ?,
        category = ?, rating = ?, downloads = ?, env = ?, verified = ?
      WHERE id = ?
    `);
    stmt.run(
      skill.name,
      skill.repoUrl,
      skill.description || '',
      JSON.stringify(skill.tags || []),
      skill.author || '',
      skill.category || '',
      skill.rating || 0,
      skill.downloads || 0,
      skill.env || '',
      skill.verified ? 1 : 0,
      req.params.id
    );
    res.json({ success: true, message: 'Skill updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/skills/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM skills WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Bundles API ──────────────────────────────────────

app.get('/api/bundles', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM bundles ORDER BY name');
    const rows = stmt.all();
    const bundles = rows.map(row => ({
      id: row.id,
      name: row.name,
      icon: row.icon,
      description: row.description,
      industry: row.industry,
      difficulty: row.difficulty,
      skillIds: JSON.parse(row.skillIds || '[]'),
      highlights: JSON.parse(row.highlights || '[]'),
      color: row.color,
    }));
    res.json({ success: true, data: bundles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/bundles/:id', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM bundles WHERE id = ?');
    const row = stmt.get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({
      success: true,
      data: {
        id: row.id,
        name: row.name,
        icon: row.icon,
        description: row.description,
        industry: row.industry,
        difficulty: row.difficulty,
        skillIds: JSON.parse(row.skillIds || '[]'),
        highlights: JSON.parse(row.highlights || '[]'),
        color: row.color,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/bundles', (req, res) => {
  try {
    const bundle = req.body;
    const stmt = db.prepare(`
      INSERT INTO bundles (id, name, icon, description, industry, difficulty, skillIds, highlights, color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      bundle.id,
      bundle.name,
      bundle.icon || '',
      bundle.description || '',
      bundle.industry || '',
      bundle.difficulty || '',
      JSON.stringify(bundle.skillIds || []),
      JSON.stringify(bundle.highlights || []),
      bundle.color || '#6366f1'
    );
    res.json({ success: true, message: 'Bundle created' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/bundles/:id', (req, res) => {
  try {
    const bundle = req.body;
    const stmt = db.prepare(`
      UPDATE bundles SET
        name = ?, icon = ?, description = ?, industry = ?, difficulty = ?,
        skillIds = ?, highlights = ?, color = ?
      WHERE id = ?
    `);
    stmt.run(
      bundle.name,
      bundle.icon || '',
      bundle.description || '',
      bundle.industry || '',
      bundle.difficulty || '',
      JSON.stringify(bundle.skillIds || []),
      JSON.stringify(bundle.highlights || []),
      bundle.color || '#6366f1',
      req.params.id
    );
    res.json({ success: true, message: 'Bundle updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/bundles/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM bundles WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true, message: 'Bundle deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Health check ─────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OK', db: dbPath });
});

app.listen(PORT, () => {
  console.log(`✅ Skills-Zoom API server running at http://localhost:${PORT}`);
  console.log(`📁 Database: ${dbPath}`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  GET    /api/health');
  console.log('  GET    /api/skills');
  console.log('  GET    /api/skills/:id');
  console.log('  POST   /api/skills');
  console.log('  PUT    /api/skills/:id');
  console.log('  DELETE /api/skills/:id');
  console.log('  GET    /api/bundles');
  console.log('  GET    /api/bundles/:id');
  console.log('  POST   /api/bundles');
  console.log('  PUT    /api/bundles/:id');
  console.log('  DELETE /api/bundles/:id');
});
