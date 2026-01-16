# Claude Code Project-Local Conventions

## What We Know

### ✅ Confirmed Working

1. **`.mcp.json` at project root**
   - Defines MCP servers
   - Claude Code reads this automatically

2. **`.claude/settings.local.json`**
   - Project-local settings
   - Contains `enabledMcpjsonServers` array
   - Already recognized by Claude Code

### ❓ Needs Testing

1. **`.claude/skills/` - Skill Auto-Discovery**
   - Test if skills here are automatically available
   - Traditional location: `~/.config/claude/skills/` (global)
   - Question: Does Claude check `.claude/skills/` in project?

2. **`.claude/mcps/` - MCP Organization**
   - MCPs can be anywhere (just update `.mcp.json` paths)
   - Question: Is there a convention for organizing in `.claude/mcps/`?

## Proposed Project Structure

```
claude-extension-build/
├── .mcp.json                    # MCP server definitions
├── .gitignore
├── README.md
├── GETTING_STARTED.md
├── WINDOWS.md
├── .claude/                     # Project-local Claude directory
│   ├── settings.local.json      # Project settings
│   ├── skills/                  # Project-local skills
│   │   ├── hello-world/
│   │   ├── file-stats/
│   │   └── quick-commit/
│   └── mcps/                    # Project-local MCPs
│       ├── filesystem-mcp/
│       ├── database-mcp/
│       └── api-mcp/
├── skills/                      # Example skills (templates for learning)
│   ├── README.md
│   └── ...
└── mcps/                        # Example MCPs (templates for learning)
    ├── README.md
    └── ...
```

## Testing Plan

To test if `.claude/skills/` is auto-discovered:

1. Restart Claude Code session
2. Check if skill is available (e.g., try `/hello-world` command)
3. Check with: Can I use the hello-world skill?

## Benefits of `.claude/` Organization

1. **Clear Separation**
   - `.claude/` = Active, project-specific tools
   - Root folders = Examples/templates for learning

2. **Follows Convention**
   - Similar to `.vscode/`, `.github/` conventions
   - Recognized by Claude Code (settings.local.json proves this)

3. **Portable**
   - Everything in one place
   - Git clone + npm install = ready
   - No global installations needed

4. **Organized**
   - All Claude-specific config in one directory
   - Easy to `.gitignore` or include as needed

## Migration Steps (If Conventions Work)

1. **Move MCPs to `.claude/mcps/`**
   ```bash
   mv mcps/filesystem-mcp .claude/mcps/
   mv mcps/database-mcp .claude/mcps/
   mv mcps/api-mcp .claude/mcps/
   ```

2. **Update `.mcp.json` paths**
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "node",
         "args": ["${PWD}/.claude/mcps/filesystem-mcp/index.js"]
       }
     }
   }
   ```

3. **Copy skills to `.claude/skills/`**
   ```bash
   cp -r skills/basic/* .claude/skills/
   cp -r skills/advanced/* .claude/skills/
   ```

4. **Keep original folders as examples**
   - `skills/` becomes template gallery
   - `mcps/` becomes template gallery
   - Add README explaining they're examples

5. **Test and verify**
   - Restart Claude Code
   - Test MCPs still work
   - Test if skills are available

## Current Status

- ✅ `.claude/settings.local.json` exists and works
- ✅ `.claude/skills/hello-world/` copied for testing
- ⏳ Needs restart to test skill auto-discovery
- ⏳ Need to decide on MCP reorganization
