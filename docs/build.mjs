#!/usr/bin/env node
/**
 * Generates docs/index.html from agents/*.md and skills/
 * Run: node docs/build.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const AGENTS_DIR = join(import.meta.dirname, '..', 'agents');
const SKILLS_DIR = join(import.meta.dirname, '..', 'skills');

// Parse agent files
const agents = readdirSync(AGENTS_DIR)
  .filter(f => f.endsWith('.md'))
  .map(f => {
    const content = readFileSync(join(AGENTS_DIR, f), 'utf-8');
    const name = f.replace('.md', '');
    const title = content.match(/^#\s+(.+)/m)?.[1] || name;
    const firstPara = content.split('\n').filter(l => l && !l.startsWith('#') && !l.startsWith('---') && !l.startsWith('```'))[0] || '';
    
    // Categorize
    let category = 'other';
    if (name.includes('forge') && !name.includes('review')) category = 'generation';
    else if (name.includes('review')) category = 'review';
    else if (['debug','pr-review','scaffold','refactor','db-design','api-design','migrate','explain','changelog','deps-audit'].includes(name)) category = 'productivity';
    else if (['product-manager','devils-advocate','feature-pipeline','fullstack-orchestrator'].includes(name)) category = 'product';
    else if (['test-forge','sentinel','load-tester','ui-validator'].includes(name)) category = 'testing';
    else if (['devops','documentation','presentation-builder','video-creator','doc-generator','design-sync'].includes(name)) category = 'infra';
    
    // Detect stack
    let stack = 'all';
    if (name.includes('dotnet') || name === 'forge') stack = '.NET';
    else if (name.includes('nestjs')) stack = 'NestJS';
    else if (name.includes('django')) stack = 'Django';
    else if (name.includes('spring')) stack = 'Spring';
    else if (name.includes('react') && !name.includes('native')) stack = 'React';
    else if (name.includes('rn') || name.includes('native')) stack = 'React Native';
    else if (name.includes('flutter')) stack = 'Flutter';
    
    return { name, title: title.replace(/[*#]/g, '').trim(), description: firstPara.slice(0, 150), category, stack };
  });

const skills = readdirSync(SKILLS_DIR).filter(d => {
  try { return readFileSync(join(SKILLS_DIR, d, 'SKILL.md'), 'utf-8'); } catch { return false; }
});

const categories = {
  generation: { label: 'Code Generation', icon: '⚙️', color: '#4FC3F7' },
  review: { label: 'Code Review', icon: '🔍', color: '#F9A212' },
  productivity: { label: 'Developer Productivity', icon: '🛠️', color: '#4CAF50' },
  product: { label: 'Product & Planning', icon: '📋', color: '#9C27B0' },
  testing: { label: 'Testing & QA', icon: '🧪', color: '#EF5350' },
  infra: { label: 'Infrastructure & Docs', icon: '🏗️', color: '#FF9800' },
  other: { label: 'Other', icon: '📦', color: '#78909C' },
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NeuraForge AI — Agent Catalog</title>
<meta name="description" content="41 AI agents for end-to-end software development. Browse, search, and install.">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0f0c2e;color:#e0ddf5;font-family:Inter,system-ui,sans-serif;line-height:1.6}
a{color:#F9A212;text-decoration:none}
a:hover{text-decoration:underline}

.hero{text-align:center;padding:80px 20px 60px;background:linear-gradient(135deg,#0f0c2e,#1a1550,#2a1f6e)}
.hero h1{font-size:clamp(36px,5vw,56px);font-weight:800;color:#fff;margin-bottom:12px}
.hero h1 span{color:#F9A212}
.hero p{font-size:18px;color:#b8b5e0;margin-bottom:30px}
.stats{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;margin-bottom:30px}
.stat{text-align:center}
.stat-num{font-size:36px;font-weight:800;color:#fff}
.stat-label{font-size:12px;color:#F9A212;text-transform:uppercase;letter-spacing:2px}
.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn{padding:10px 24px;border-radius:8px;font-weight:600;font-size:14px;display:inline-block}
.btn-primary{background:#F9A212;color:#1A1744}
.btn-secondary{border:1px solid #F9A212;color:#F9A212}

.container{max-width:1100px;margin:0 auto;padding:40px 20px}

.search-bar{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap}
.search-bar input{flex:1;min-width:200px;padding:12px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:#fff;font-size:16px}
.search-bar input::placeholder{color:#6c63a0}
.search-bar input:focus{outline:none;border-color:#F9A212}

.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
.filter-btn{padding:6px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:#b8b5e0;cursor:pointer;font-size:13px;transition:all 0.2s}
.filter-btn:hover,.filter-btn.active{background:#F9A212;color:#1A1744;border-color:#F9A212}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;transition:all 0.2s;cursor:pointer}
.card:hover{border-color:#F9A212;transform:translateY(-2px)}
.card-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.card-icon{font-size:20px}
.card-name{font-size:16px;font-weight:700;color:#fff}
.card-stack{font-size:11px;padding:2px 8px;border-radius:4px;background:rgba(249,162,18,0.15);color:#F9A212}
.card-desc{font-size:13px;color:#8886b0;margin-top:8px}
.card-category{font-size:11px;color:#6c63a0;margin-top:8px}

.install{background:rgba(255,255,255,0.03);border-radius:12px;padding:30px;margin-top:40px;text-align:center}
.install h2{color:#fff;margin-bottom:16px}
.install code{display:block;background:rgba(0,0,0,0.3);padding:16px;border-radius:8px;font-family:'SF Mono',monospace;font-size:14px;color:#4caf50;margin:8px 0;text-align:left;max-width:500px;margin-left:auto;margin-right:auto}

.footer{text-align:center;padding:40px 20px;color:#6c63a0;font-size:14px}

@media(max-width:600px){.stats{gap:20px}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>

<div class="hero">
  <h1>Neura<span>Forge</span> AI</h1>
  <p>Describe a feature in plain English. Get code that follows enterprise patterns.</p>
  <div class="stats">
    <div class="stat"><div class="stat-num">${agents.length}</div><div class="stat-label">Agents</div></div>
    <div class="stat"><div class="stat-num">22</div><div class="stat-label">MCP Servers</div></div>
    <div class="stat"><div class="stat-num">${skills.length}</div><div class="stat-label">Skills</div></div>
    <div class="stat"><div class="stat-num">7</div><div class="stat-label">Stacks</div></div>
  </div>
  <div class="hero-actions">
    <a href="https://github.com/vikisingh23/neuraforge-ai" class="btn btn-primary">GitHub</a>
    <a href="https://github.com/vikisingh23/neuraforge-ai/blob/main/QUICKSTART.md" class="btn btn-secondary">Quickstart</a>
  </div>
</div>

<div class="container">
  <div class="search-bar">
    <input type="text" id="search" placeholder="Search agents... (e.g., debug, react, scaffold)">
  </div>
  
  <div class="filters">
    <button class="filter-btn active" data-filter="all">All</button>
    ${Object.entries(categories).map(([k, v]) => `<button class="filter-btn" data-filter="${k}">${v.icon} ${v.label}</button>`).join('\n    ')}
  </div>

  <div class="grid" id="agent-grid">
    ${agents.map(a => `<div class="card" data-category="${a.category}" data-name="${a.name}" data-stack="${a.stack}">
      <div class="card-header">
        <span class="card-icon">${categories[a.category]?.icon || '📦'}</span>
        <span class="card-name">${a.name}</span>
        ${a.stack !== 'all' ? `<span class="card-stack">${a.stack}</span>` : ''}
      </div>
      <div class="card-desc">${a.description}</div>
      <div class="card-category">${categories[a.category]?.label || 'Other'}</div>
    </div>`).join('\n    ')}
  </div>

  <div class="install">
    <h2>Get Started</h2>
    <p style="color:#b8b5e0;margin-bottom:16px">Two commands. Works with Claude Code, Cursor, Gemini CLI, and 9 more platforms.</p>
    <code>/plugin marketplace add vikisingh23/neuraforge-ai<br>/plugin install neuraforge-ai</code>
  </div>
</div>

<div class="footer">
  <p>NeuraForge AI · Apache 2.0 · <a href="https://github.com/vikisingh23/neuraforge-ai">GitHub</a></p>
</div>

<script>
const cards = document.querySelectorAll('.card');
const search = document.getElementById('search');
const filters = document.querySelectorAll('.filter-btn');

search.addEventListener('input', filter);
filters.forEach(btn => btn.addEventListener('click', (e) => {
  filters.forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  filter();
}));

function filter() {
  const q = search.value.toLowerCase();
  const cat = document.querySelector('.filter-btn.active').dataset.filter;
  cards.forEach(card => {
    const matchSearch = card.dataset.name.includes(q) || card.textContent.toLowerCase().includes(q);
    const matchCat = cat === 'all' || card.dataset.category === cat;
    card.style.display = matchSearch && matchCat ? '' : 'none';
  });
}
</script>
</body>
</html>`;

writeFileSync(join(import.meta.dirname, 'index.html'), html);
console.log("✅ Generated docs/index.html (" + agents.length + " agents, " + skills.length + " skills)");
