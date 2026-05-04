#!/usr/bin/env node

/**
 * NeuraForge AI — Cross-platform installer
 * Works on Windows, Mac, Linux
 * 
 * Usage: npx neuraforge-ai-setup
 *    or: node install.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const REPO = 'https://github.com/vikisingh23/neuraforge-ai';
const CLONE_DIR = join(homedir(), '.neuraforge-ai');

const log = (msg) => console.log(`\x1b[34m⚒️  ${msg}\x1b[0m`);
const ok = (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`);
const warn = (msg) => console.log(`\x1b[33m⚠️  ${msg}\x1b[0m`);

function detect() {
  const checks = [
    ['claude', 'claude'],
    ['cursor', 'cursor'],
    ['gemini', 'gemini'],
    ['codex', 'codex'],
    ['kiro', 'kiro-cli'],
    ['opencode', 'opencode'],
  ];
  for (const [name, cmd] of checks) {
    try {
      execSync(`${cmd} --version`, { stdio: 'ignore' });
      return name;
    } catch {}
  }
  // Check by directory
  if (existsSync(join(homedir(), '.cursor'))) return 'cursor';
  if (existsSync(join(homedir(), '.gemini'))) return 'gemini';
  return 'unknown';
}

function cloneRepo() {
  if (existsSync(CLONE_DIR)) {
    log('Updating NeuraForge AI...');
    execSync(`git -C "${CLONE_DIR}" pull --quiet`, { stdio: 'inherit' });
  } else {
    log('Downloading NeuraForge AI...');
    execSync(`git clone --depth 1 ${REPO} "${CLONE_DIR}"`, { stdio: 'inherit' });
  }
}

function copyFiles(files) {
  for (const f of files) {
    const src = join(CLONE_DIR, f);
    const dst = join(process.cwd(), f);
    if (existsSync(src)) {
      const dir = join(dst, '..');
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      try {
        execSync(`cp -r "${src}" "${dst}"`, { stdio: 'ignore' });
      } catch {
        // Windows fallback
        execSync(`xcopy "${src}" "${dst}" /E /I /Y /Q`, { stdio: 'ignore' });
      }
      ok(f);
    }
  }
}

// Main
log('NeuraForge AI Installer');
console.log('');

const platform = process.argv[2] || detect();
log(`Platform: ${platform}`);
console.log('');

cloneRepo();
console.log('');

const common = ['AGENTS.md', 'agents', 'rules'];

switch (platform) {
  case 'claude':
    log('Configuring for Claude Code...');
    console.log('Run in Claude Code:');
    console.log('  /plugin marketplace add vikisingh23/neuraforge-ai');
    console.log('  /plugin install neuraforge-ai');
    break;

  case 'cursor':
    log('Configuring for Cursor...');
    copyFiles([...common, '.cursor']);
    ok('Cursor rules + MCP servers configured. Restart Cursor.');
    break;

  case 'gemini':
    log('Configuring for Gemini CLI...');
    copyFiles([...common, '.gemini', 'GEMINI.md']);
    ok('Gemini CLI configured.');
    break;

  case 'codex':
  case 'opencode':
  case 'kiro':
  case 'copilot':
    log(`Configuring for ${platform}...`);
    copyFiles(common);
    ok(`${platform} configured. AGENTS.md will be auto-discovered.`);
    break;

  default:
    warn('Platform not detected. Installing universal config...');
    copyFiles([...common, '.mcp.json']);
    ok('AGENTS.md + agents + rules + MCP config installed.');
    console.log('');
    console.log('Or specify: node install.mjs [claude|cursor|gemini|codex|kiro|copilot|opencode]');
}

console.log('');
ok('40 agents · 22 MCP servers · 35 skills · 7 stacks');
console.log(`Docs: ${REPO}`);
