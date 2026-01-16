# Project-Local .claude Directory

This directory contains project-specific Claude Code configuration.

## Current Structure

- `settings.local.json` - Project-local settings (MCP enables/disables)
- `skills/` - Project-local skills (testing auto-discovery)
- `mcps/` - Project-local MCP servers (testing organization)

## Testing Convention

Testing if Claude Code auto-discovers:
1. Skills in `.claude/skills/`
2. MCPs in `.claude/mcps/`
