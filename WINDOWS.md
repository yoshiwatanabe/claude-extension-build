# Windows Setup Guide

This guide covers Windows-specific setup for Claude Skills and MCP servers.

## Prerequisites

1. **Node.js 18+**
   - Download from: https://nodejs.org
   - Verify: `node --version` in PowerShell or Command Prompt

2. **Claude Code CLI**
   - Install following the official instructions
   - Verify: `claude --version`

3. **Git** (optional)
   - Download from: https://git-scm.com/download/win
   - For running npm scripts with Unix-style commands

## Key Differences from Linux/macOS

### 1. Configuration Paths

**Skills Directory:**
- Linux/macOS: `~/.config/claude/skills/`
- Windows: `%APPDATA%\Claude\skills\` (typically `C:\Users\YourName\AppData\Roaming\Claude\skills\`)

**Claude Config:**
- Linux/macOS: `~/.claude/settings.json`
- Windows: `%USERPROFILE%\.claude\settings.json` (typically `C:\Users\YourName\.claude\settings.json`)

### 2. MCP Configuration

The `.mcp.json` file works on Windows, but you need to use **absolute paths** instead of `${PWD}`:

**❌ Won't work on Windows:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["${PWD}/mcps/filesystem-mcp/index.js"]
    }
  }
}
```

**✅ Use absolute paths on Windows:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["C:\\Users\\YourName\\projects\\claude-extension-build\\mcps\\filesystem-mcp\\index.js"]
    }
  }
}
```

**Note:** Use double backslashes (`\\`) in JSON strings, or use forward slashes which also work on Windows:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/filesystem-mcp/index.js"]
    }
  }
}
```

### 3. Environment Variables

When setting environment variables in `.mcp.json`:

**Linux/macOS style:**
```bash
export DB_PATH="/path/to/database.db"
```

**Windows PowerShell:**
```powershell
$env:DB_PATH = "C:\path\to\database.db"
```

**Windows Command Prompt:**
```cmd
set DB_PATH=C:\path\to\database.db
```

**In `.mcp.json` (same for all platforms):**
```json
{
  "mcpServers": {
    "database": {
      "command": "node",
      "args": ["C:/path/to/mcps/database-mcp/index.js"],
      "env": {
        "DB_PATH": "C:/path/to/demo.db"
      }
    }
  }
}
```

## Installation Steps

### 1. Clone the Repository

```powershell
# Using PowerShell
cd C:\Users\YourName\projects
git clone https://github.com/yoshiwatanabe/claude-extension-build.git
cd claude-extension-build
```

### 2. Install Dependencies

```powershell
# Install all MCP dependencies
npm run install:all
```

### 3. Test MCP Servers

```powershell
# Test all servers
npm run test:all
```

### 4. Configure MCPs

Create `.mcp.json` in the project root with absolute paths:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/filesystem-mcp/index.js"]
    },
    "api": {
      "command": "node",
      "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/api-mcp/index.js"],
      "env": {
        "API_BASE_URL": "https://jsonplaceholder.typicode.com",
        "API_KEY": ""
      }
    },
    "database": {
      "command": "node",
      "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/database-mcp/index.js"],
      "env": {
        "DB_PATH": "C:/Users/YourName/projects/claude-extension-build/mcps/database-mcp/demo.db"
      }
    }
  }
}
```

**Important:** Replace `C:/Users/YourName/projects/claude-extension-build` with your actual path.

### 5. Install Skills

```powershell
# Create skills directory
New-Item -ItemType Directory -Force -Path "$env:APPDATA\Claude\skills"

# Copy a skill (example: hello-world)
Copy-Item -Recurse skills\basic\hello-world "$env:APPDATA\Claude\skills\hello-world"
```

### 6. Restart Claude Code

Close and reopen Claude Code in the project directory for changes to take effect.

## Getting Your Absolute Path

### PowerShell
```powershell
# Get current directory
Get-Location
# Output: C:\Users\YourName\projects\claude-extension-build

# Get full path to MCP
Join-Path (Get-Location) "mcps\filesystem-mcp\index.js"
# Output: C:\Users\YourName\projects\claude-extension-build\mcps\filesystem-mcp\index.js
```

### Command Prompt
```cmd
# Get current directory
cd
# Output: C:\Users\YourName\projects\claude-extension-build

# Get full path (manually construct)
echo %CD%\mcps\filesystem-mcp\index.js
```

## Testing on Windows

### Test MCP Server Directly

```powershell
# Navigate to MCP directory
cd mcps\filesystem-mcp

# Test the server
node index.js
# Should output: "Filesystem MCP server running"
# Press Ctrl+C to stop
```

### Test with Claude Code

```powershell
# Start Claude Code in project directory
cd C:\Users\YourName\projects\claude-extension-build
claude

# Then in Claude Code, try:
# "List files in my home directory"
# "Read the README.md file"
```

## Common Windows Issues

### 1. npm Scripts Fail

**Issue:** Scripts with Unix commands like `cd folder && command` fail.

**Solution:** Install Git for Windows (includes Git Bash) or use PowerShell.

### 2. Path Not Found

**Issue:** MCP server doesn't start, path errors in logs.

**Solution:**
- Verify absolute paths in `.mcp.json`
- Use forward slashes `/` or double backslashes `\\`
- Don't use `${PWD}` or other Unix variables

### 3. Permission Errors

**Issue:** File access denied errors.

**Solution:**
- Check file permissions
- Run Claude Code as Administrator (if needed)
- Verify paths are within allowed directories

### 4. Skills Not Showing Up

**Issue:** Skills don't appear after copying.

**Solution:**
- Check path: Should be `%APPDATA%\Claude\skills\skill-name\`
- Verify `prompt.md` exists in the skill directory
- Restart Claude Code

### 5. Line Ending Issues

**Issue:** Scripts fail due to CRLF vs LF line endings.

**Solution:** Git automatically handles this. If you edited files on Windows:
```powershell
# Configure Git to handle line endings
git config --global core.autocrlf true
```

## MCP Server Path Examples

### Filesystem MCP
```json
{
  "command": "node",
  "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/filesystem-mcp/index.js"]
}
```

### API MCP
```json
{
  "command": "node",
  "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/api-mcp/index.js"],
  "env": {
    "API_BASE_URL": "https://api.github.com",
    "API_KEY": "your_token_here"
  }
}
```

### Database MCP
```json
{
  "command": "node",
  "args": ["C:/Users/YourName/projects/claude-extension-build/mcps/database-mcp/index.js"],
  "env": {
    "DB_PATH": "C:/Users/YourName/projects/claude-extension-build/mcps/database-mcp/demo.db"
  }
}
```

## Tips for Windows Users

1. **Use PowerShell** - More powerful than Command Prompt, better for development
2. **Install Windows Terminal** - Better terminal experience with tabs
3. **Use forward slashes in JSON** - Easier than escaping backslashes
4. **Keep paths short** - Avoid deep nesting to prevent path length issues
5. **Use Git Bash** - If you prefer Unix-style commands

## Resources

- [Node.js for Windows](https://nodejs.org/en/download/)
- [Git for Windows](https://git-scm.com/download/win)
- [Windows Terminal](https://aka.ms/terminal)
- [PowerShell Documentation](https://docs.microsoft.com/powershell/)

## Getting Help

If you encounter Windows-specific issues:

1. Check the main README and GETTING_STARTED.md
2. Review this WINDOWS.md guide
3. Open an issue: https://github.com/yoshiwatanabe/claude-extension-build/issues
4. Include your Windows version and error messages
