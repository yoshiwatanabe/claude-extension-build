# Claude Skills & MCP Learning Repository

A collection of working examples to learn Claude Skills and Model Context Protocol (MCP) servers.

**Repository:** https://github.com/yoshiwatanabe/claude-extension-build

## Repository Structure

```
.
├── .claude/                     # Active Claude configuration (by convention)
│   ├── settings.local.json      # Project-local settings
│   ├── skills/                  # Active skills (auto-discovered)
│   │   ├── hello-world/
│   │   ├── file-stats/
│   │   ├── quick-commit/
│   │   ├── code-reviewer/
│   │   └── test-generator/
│   └── mcps/                    # Active MCP servers
│       ├── filesystem-mcp/
│       ├── api-mcp/
│       └── database-mcp/
├── .mcp.json                    # MCP configuration (points to .claude/mcps/)
├── examples/                    # Learning templates
│   ├── skills/                  # Skill examples (old format)
│   └── mcps/                    # MCP examples (reference)
└── README.md                    # This file
```

## What are Claude Skills?

Claude Skills are custom capabilities you can add to Claude Code. They're essentially mini-programs that:
- Add new slash commands (like `/commit`, `/review-pr`)
- Can use any Claude Code tools
- Are invoked with the Skill tool
- Live in `.claude/skills/` directory and are **auto-discovered by convention**

## What are MCPs?

Model Context Protocol (MCP) servers provide Claude with access to external data and tools:
- Connect to databases, APIs, filesystems, etc.
- Expose tools and resources to Claude
- Run as separate processes
- Configured in `.mcp.json` in your project root

## Getting Started

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yoshiwatanabe/claude-extension-build.git
cd claude-extension-build

# Install MCP dependencies
cd .claude/mcps/filesystem-mcp && npm install && cd ../../..
cd .claude/mcps/database-mcp && npm install && npm run init-demo && cd ../../..

# Start Claude Code in project directory
# Skills are auto-discovered from .claude/skills/
# MCPs are configured in .mcp.json
```

### Using Skills

Skills in `.claude/skills/` are automatically available:

```bash
# Try the hello-world skill
/hello-world

# Analyze a file
/file-stats README.md

# Create a git commit
/quick-commit

# Review code
/code-reviewer .claude/mcps/filesystem-mcp/index.js

# Generate tests
/test-generator .claude/mcps/filesystem-mcp/index.js
```

### Using MCPs

MCPs are already configured in `.mcp.json`. Just use them naturally:

```bash
# Filesystem MCP
"List files in my home directory"
"Read the README.md file"

# Database MCP
"Show me all users in the database"
"How many posts are there?"
```

## Prerequisites

- Claude Code CLI installed
- Node.js 18+ (for MCP servers)
- Basic understanding of JavaScript/TypeScript

**Windows Users:** See [WINDOWS.md](WINDOWS.md) for Windows-specific setup instructions.

## Learn More

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## Active Skills

All skills use SKILL.md format with YAML frontmatter and are located in `.claude/skills/`:

| Skill | Level | Description |
|-------|-------|-------------|
| hello-world | Basic | Simple greeting skill with date/time |
| file-stats | Basic | Analyzes file size, lines, complexity |
| quick-commit | Basic | Git commit helper with conventional commits |
| code-reviewer | Advanced | Automated code review patterns |
| test-generator | Advanced | Generates test cases for code |

## Active MCPs

All MCPs are located in `.claude/mcps/` and configured in `.mcp.json`:

| MCP | Description | Tools Provided |
|-----|-------------|----------------|
| filesystem-mcp | Secure file system access | read_file, write_file, list_directory, etc. |
| api-mcp | REST API integration | api_get, api_post, api_put, api_delete |
| database-mcp | SQLite database access | query, execute, list_tables, etc. |

## Examples Directory

The `examples/` directory contains learning templates in the old format. See [examples/README.md](examples/README.md) for how to use them.

## By Convention Architecture

This repository follows Claude Code conventions:

| Convention | What It Means |
|-----------|---------------|
| `.claude/` directory | Project-local Claude configuration |
| `.claude/skills/` | Skills are auto-discovered here |
| `.claude/skills/*/SKILL.md` | Skill format with YAML frontmatter |
| `.mcp.json` | MCP server configuration |
| `.claude/mcps/` | Organized location for MCP servers (convention) |

Everything "just works" after cloning - no manual installation needed.

## Contributing

This is a learning repository. Feel free to add your own examples or improve existing ones.

## License

MIT
