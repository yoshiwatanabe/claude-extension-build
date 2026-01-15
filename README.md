# Claude Skills & MCP Learning Repository

A collection of working examples to learn Claude Skills and Model Context Protocol (MCP) servers.

**Repository:** https://github.com/yoshiwatanabe/claude-extension-build

## Repository Structure

```
.
├── skills/                  # Claude Skills examples
│   ├── basic/
│   │   ├── hello-world/     # Simple greeting skill
│   │   ├── file-stats/      # File analysis skill
│   │   └── quick-commit/    # Git commit helper
│   ├── advanced/
│   │   ├── code-reviewer/   # Automated code review
│   │   └── test-generator/  # Test generation skill
│   └── README.md            # Skills documentation
├── mcps/                    # MCP server examples
│   ├── filesystem-mcp/      # Secure file system access
│   ├── api-mcp/             # REST API integration
│   ├── database-mcp/        # SQLite database access
│   └── README.md            # MCP documentation
├── .mcp.json                # Local MCP configuration
└── README.md                # This file
```

## What are Claude Skills?

Claude Skills are custom capabilities you can add to Claude Code. They're essentially mini-programs that:
- Add new slash commands (like `/commit`, `/review-pr`)
- Can use any Claude Code tools
- Are invoked with the Skill tool
- Live in `~/.config/claude/skills/` directory

## What are MCPs?

Model Context Protocol (MCP) servers provide Claude with access to external data and tools:
- Connect to databases, APIs, filesystems, etc.
- Expose tools and resources to Claude
- Run as separate processes
- Configured in `.mcp.json` in your project root

## Getting Started

### Using the Skills Examples

1. Navigate to the `skills/` directory
2. Choose an example skill
3. Follow the installation instructions in each skill's README
4. Test the skill with Claude Code

### Using the MCP Examples

1. Navigate to the `mcps/` directory
2. Choose an MCP server example
3. Install dependencies: `npm install`
4. Add to `.mcp.json` in your project root
5. Restart Claude Code and test

## Prerequisites

- Claude Code CLI installed
- Node.js 18+ (for MCP servers)
- Basic understanding of JavaScript/TypeScript

**Windows Users:** See [WINDOWS.md](WINDOWS.md) for Windows-specific setup instructions.

## Learn More

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)

## Examples Included

### Skills

| Skill | Level | Description |
|-------|-------|-------------|
| hello-world | Basic | Simple greeting skill |
| file-stats | Basic | Analyzes file size, lines, complexity |
| quick-commit | Basic | Git commit helper with smart messages |
| code-reviewer | Advanced | Automated code review patterns |
| test-generator | Advanced | Generates test cases for code |

### MCPs

| MCP | Description | Tools Provided |
|-----|-------------|----------------|
| filesystem-mcp | Secure file system access | read_file, write_file, list_directory, etc. |
| api-mcp | REST API integration | api_get, api_post, api_put, api_delete |
| database-mcp | SQLite database access | query, execute, list_tables, etc. |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yoshiwatanabe/claude-extension-build.git
cd claude-extension-build

# Install all MCP dependencies
npm run install:all

# Test MCP servers
npm run test:all
```

## Contributing

This is a learning repository. Feel free to add your own examples or improve existing ones.

## License

MIT
