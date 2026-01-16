# Getting Started

Quick start guide for learning Claude Skills and MCPs.

## Prerequisites

Before you begin, make sure you have:

1. **Claude Code CLI** installed
   ```bash
   # Check if installed
   claude --version
   ```
   If not installed, visit: https://github.com/anthropics/claude-code

2. **Node.js 18+** (for MCP servers)
   ```bash
   # Check version
   node --version
   ```
   If not installed, visit: https://nodejs.org

3. **Basic understanding** of:
   - Command line / terminal
   - JavaScript/Node.js basics
   - Git (optional, for cloning)

**Windows Users:** This guide uses Unix-style commands. See [WINDOWS.md](WINDOWS.md) for Windows-specific instructions.

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yoshiwatanabe/claude-extension-build.git
cd claude-extension-build

# 2. Install MCP dependencies
cd .claude/mcps/filesystem-mcp && npm install && cd ../../..
cd .claude/mcps/database-mcp && npm install && npm run init-demo && cd ../../..

# 3. Start Claude Code in the project directory
claude

# That's it! Skills and MCPs are ready to use.
```

## How It Works

This repository uses **convention-based configuration**:

| Location | What It Does | Auto-Discovered? |
|----------|-------------|------------------|
| `.claude/skills/` | Active skills | ✅ Yes |
| `.claude/mcps/` | Active MCP servers | Via `.mcp.json` |
| `.mcp.json` | MCP configuration | ✅ Yes |
| `examples/` | Learning templates | Reference only |

Everything in `.claude/` is automatically available - no manual installation needed!

## Learning Path

### Part 1: Try the Skills (10 minutes)

Skills are already active! Just use them:

```bash
# 1. Hello World - Simple greeting
/hello-world

# 2. File Stats - Analyze any file
/file-stats README.md

# 3. Quick Commit - Create a git commit
/quick-commit

# 4. Code Reviewer - Review code quality
/code-reviewer .claude/mcps/filesystem-mcp/index.js

# 5. Test Generator - Generate unit tests
/test-generator .claude/mcps/filesystem-mcp/index.js
```

**What's happening:**
- Skills live in `.claude/skills/`
- Each has a `SKILL.md` file with YAML frontmatter
- Claude Code auto-discovers them on startup
- Call them with `/skill-name`

**Try it:** Open any skill's SKILL.md file to see how it works.

### Part 2: Try the MCPs (10 minutes)

MCPs are already configured! Just ask naturally:

```bash
# Filesystem MCP
"List files in the .claude directory"
"Read the file .claude/skills/hello-world/SKILL.md"
"Show me file info for README.md"

# Database MCP
"Show me all users in the database"
"How many posts are there?"
"Query the comments table"
```

**What's happening:**
- MCPs live in `.claude/mcps/`
- Configured in `.mcp.json` at project root
- Claude Code starts them on-demand
- Use them by asking naturally

**Try it:** Ask "List the MCP tools available" to see all capabilities.

### Part 3: Understand the Structure (20 minutes)

#### Active Skills (`.claude/skills/`)

Each skill has:
```
hello-world/
└── SKILL.md          # Main skill file with YAML frontmatter
```

**SKILL.md format:**
```markdown
---
name: skill-name
description: What it does and when to use it
---

# Skill Instructions

Step-by-step guidance for Claude...
```

**Key points:**
- `name` must match directory name
- `description` tells Claude when to use it
- Body contains instructions
- Can reference other files

#### Active MCPs (`.claude/mcps/`)

Each MCP has:
```
filesystem-mcp/
├── package.json      # Dependencies
├── index.js          # Server implementation
└── README.md         # Documentation
```

**Key points:**
- Each MCP is a Node.js server
- Communicates via stdin/stdout
- Provides tools and/or resources
- Started on-demand by Claude Code

#### Examples Directory (`examples/`)

Contains templates for learning:
- `examples/skills/` - Old format skills (prompt.md)
- `examples/mcps/` - Additional MCP examples

**Use cases:**
- Study different approaches
- Copy and modify for your needs
- Reference implementations

### Part 4: Create Your Own (30+ minutes)

#### Create a Custom Skill

1. **Create directory:**
   ```bash
   mkdir .claude/skills/my-skill
   ```

2. **Create SKILL.md:**
   ```markdown
   ---
   name: my-skill
   description: Does something useful when...
   ---

   # My Skill

   Instructions for Claude...
   ```

3. **Test it:**
   ```bash
   # Restart Claude Code, then:
   /my-skill
   ```

**Skill ideas:**
- Project-specific workflows
- Code generation templates
- Analysis tools
- Integration helpers

#### Create a Custom MCP

1. **Create directory:**
   ```bash
   mkdir .claude/mcps/my-mcp
   cd .claude/mcps/my-mcp
   npm init -y
   npm install @modelcontextprotocol/sdk
   ```

2. **Create index.js:** (see examples/mcps/ for templates)

3. **Add to .mcp.json:**
   ```json
   {
     "mcpServers": {
       "my-mcp": {
         "command": "node",
         "args": ["${PWD}/.claude/mcps/my-mcp/index.js"]
       }
     }
   }
   ```

4. **Restart Claude Code and test**

**MCP ideas:**
- Custom database access
- Internal API integration
- File format converters
- Data processors

## Next Steps

1. **Modify an existing skill** - Change hello-world to show different info
2. **Create a project-specific skill** - Automate something you do often
3. **Study MCP architecture** - Read the MCP server code
4. **Build a custom MCP** - Connect to your data

## Troubleshooting

### Skills not working?

- Check `.claude/skills/SKILL-NAME/SKILL.md` exists
- Verify YAML frontmatter is valid
- Restart Claude Code
- Check skill name matches directory name

### MCPs not working?

- Check `.mcp.json` paths are correct
- Run `npm install` in MCP directory
- Test MCP directly: `node .claude/mcps/MCPNAME/index.js`
- Restart Claude Code
- Check Claude Code logs

### Need help?

- Read [WINDOWS.md](WINDOWS.md) for Windows-specific issues
- Check the official [Agent Skills docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- Review [MCP documentation](https://modelcontextprotocol.io)
- Open an issue on GitHub

## Resources

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol)

---

Happy coding! 🚀
