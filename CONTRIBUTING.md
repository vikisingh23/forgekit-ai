# Contributing

Thanks for your interest in contributing to the Agentic Dev Platform!

## How to Contribute

### Adding a New Agent
1. Create `agents/your-agent.md` with the agent prompt
2. Create `skills/your-skill/SKILL.md` with the skill entry point
3. If the agent needs MCP servers, add them to `.mcp.json`
4. Update README.md with the new agent

### Adding a New MCP Server
1. Verify the npm package exists: `npm view package-name version`
2. Add to `.mcp.json` using `npx -y` format (no local paths)
3. Test it works on Mac, Windows, and Linux

### Improving Existing Agents
1. Read the existing agent prompt in `agents/`
2. Make your changes — keep the same structure
3. Ensure no company-specific references (use generic terms)
4. Test with Claude Code or Kiro CLI

## Guidelines

- **No company-specific content** — keep everything generic and reusable
- **No secrets or tokens** — use `userConfig` or environment variables
- **Cross-platform** — must work on Windows, Mac, Linux
- **npx only** — MCP servers must use `npx -y`, no local file paths
- **Conventional commits** — `feat:`, `fix:`, `docs:`, `refactor:`

## Code of Conduct

Be respectful, constructive, and inclusive. We're all here to build better tools.
