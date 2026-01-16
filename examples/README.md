# Examples

This directory contains example templates for learning. The **active** skills and MCPs are in `.claude/`.

## Directory Structure

```
examples/
├── skills/      # Skill templates (old format with prompt.md)
└── mcps/        # MCP templates (reference implementations)
```

## Active vs Examples

| Location | Purpose | Status |
|----------|---------|--------|
| `.claude/skills/` | Active skills (SKILL.md format) | ✅ Auto-discovered |
| `.claude/mcps/` | Active MCP servers | ✅ Configured in .mcp.json |
| `examples/skills/` | Learning templates | 📚 Reference only |
| `examples/mcps/` | Learning templates | 📚 Reference only |

## How to Use Examples

### Using Example Skills

Example skills use the old `prompt.md` format. To use them:

1. Convert to SKILL.md format with YAML frontmatter
2. Copy to `.claude/skills/`
3. Skills are auto-discovered by Claude Code

See `.claude/skills/` for converted examples.

### Using Example MCPs

Example MCPs are reference implementations:

1. Copy MCP directory to `.claude/mcps/`
2. Run `npm install` in the MCP directory
3. Add to `.mcp.json` configuration
4. Restart Claude Code

See `.claude/mcps/` for active MCPs.

## Why Examples are Separate

**Active code** (`.claude/`) vs **learning templates** (`examples/`):
- `.claude/` = What Claude Code uses (by convention)
- `examples/` = Templates to learn from and customize

This separation keeps the repository organized and makes it clear what's active vs what's for reference.
