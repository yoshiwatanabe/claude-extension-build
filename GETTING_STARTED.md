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

## Learning Path

Follow this recommended order for the best learning experience:

### Part 1: Claude Skills (30-45 minutes)

1. **Start Simple**
   - Read `skills/README.md`
   - Try `skills/basic/hello-world/`
   - Install and test it

2. **Get Practical**
   - Try `skills/basic/file-stats/`
   - Understand how it uses tools
   - Modify it to add new features

3. **Build Workflows**
   - Try `skills/basic/quick-commit/`
   - See how it integrates with git
   - Use it in a real project

4. **Advanced Patterns**
   - Study `skills/advanced/code-reviewer/`
   - Understand structured analysis
   - Try it on your own code

5. **Create Your Own**
   - Design a skill for your workflow
   - Write the `prompt.md`
   - Test and iterate

### Part 2: MCP Servers (1-2 hours)

1. **Understand MCPs**
   - Read `mcps/README.md`
   - Understand the architecture
   - Learn about tools vs resources

2. **Filesystem MCP**
   - Install `mcps/filesystem-mcp/`
   - Configure in Claude
   - Try file operations

3. **API MCP**
   - Install `mcps/api-mcp/`
   - Test with JSONPlaceholder
   - Try with a real API

4. **Database MCP**
   - Install `mcps/database-mcp/`
   - Create demo database
   - Run queries through Claude

5. **Build Your Own**
   - Identify a data source you need
   - Start with an MCP template
   - Implement custom tools

## Quick Setup

### Install All Dependencies

```bash
# From the root directory
npm run install:all
```

This installs dependencies for all MCP examples.

### Test MCP Servers

```bash
# Test each MCP server
npm run test:all
```

If all servers start without errors, you're ready!

## Installing a Skill

### Step 1: Choose a skill
```bash
cd skills/basic/hello-world
```

### Step 2: Copy to Claude's skills directory
```bash
# Create skills directory if it doesn't exist
mkdir -p ~/.config/claude/skills

# Copy the skill
cp -r . ~/.config/claude/skills/hello-world
```

### Step 3: Use it in Claude Code
```bash
claude
# Then type: /hello-world
```

## Configuring an MCP Server

### Step 1: Install dependencies
```bash
cd mcps/filesystem-mcp
npm install
```

### Step 2: Get the absolute path
```bash
pwd
# Copy this path
```

### Step 3: Create .mcp.json in your project root
```bash
# Create config file
nano .mcp.json
```

### Step 4: Add MCP configuration
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

### Step 5: Restart Claude Code in that directory
Close and reopen Claude Code for changes to take effect.

### Step 6: Test it
```bash
claude
# Then ask: "List files in my home directory"
```

## Example Session

Here's what a learning session might look like:

```bash
# Day 1: Skills (1 hour)
# 1. Install and try hello-world skill
cp -r skills/basic/hello-world ~/.config/claude/skills/
claude
> /hello-world

# 2. Try file-stats on real code
cp -r skills/basic/file-stats ~/.config/claude/skills/
> /file-stats package.json

# 3. Create a commit with quick-commit
cp -r skills/basic/quick-commit ~/.config/claude/skills/
# Make some changes to files
> /quick-commit

# Day 2: MCPs (2 hours)
# 1. Set up filesystem MCP
cd mcps/filesystem-mcp
npm install
# Add to config, restart Claude
> Claude, show me what's in my Downloads folder

# 2. Set up database MCP
cd mcps/database-mcp
npm install
npm run init-demo
# Add to config, restart Claude
> Claude, query all users from the database

# 3. Try API MCP with GitHub
cd mcps/api-mcp
npm install
# Configure with GitHub API in config
> Claude, get info about the anthropics/claude-code repo
```

## Common Issues

### Skill not showing up
- Check file location: `~/.config/claude/skills/skill-name/`
- Verify `prompt.md` exists
- Check file permissions
- Restart Claude Code

### MCP server not connecting
- Verify absolute path in config
- Check Node.js version: `node --version`
- Test server directly: `node index.js`
- Check Claude logs: `~/.config/claude/logs/`

### Permission errors (MCP)
- Check file permissions
- Verify paths are allowed (filesystem MCP)
- Check environment variables

## Tips for Success

1. **Start small**: Don't try to learn everything at once
2. **Experiment**: Modify examples to see what happens
3. **Read the code**: Understanding beats memorizing
4. **Build real things**: Use skills/MCPs for actual tasks
5. **Keep notes**: Document what you learn
6. **Share**: Teach others or contribute examples

## Next Steps After Completing Examples

1. **Combine Skills and MCPs**: Create a skill that uses an MCP
2. **Build for your workflow**: Identify repetitive tasks to automate
3. **Share your creations**: Publish your skills/MCPs
4. **Join the community**: Share and learn from others
5. **Contribute**: Improve these examples or add new ones

## Resources

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Claude API Docs](https://docs.anthropic.com)

## Getting Help

If you get stuck:

1. Check the README in the specific example directory
2. Review the main README files
3. Check Claude Code issues: https://github.com/anthropics/claude-code/issues
4. Ask Claude for help (it knows about Skills and MCPs!)

## Contributing

Found an issue or want to add an example? Contributions welcome!

1. Fork the repository
2. Create your example
3. Add documentation
4. Test thoroughly
5. Submit a pull request

Happy learning!
