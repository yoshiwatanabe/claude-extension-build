# Model Context Protocol (MCP) Examples

Working examples of MCP servers that extend Claude's capabilities.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that lets Claude connect to external data sources and tools. Think of MCPs as plugins that give Claude new abilities:

- Access databases
- Call APIs
- Read/write files securely
- Connect to external services
- Provide custom tools and resources

## How MCP Works

```
┌─────────┐          ┌────────────┐          ┌──────────────┐
│ Claude  │ ◄──MCP──►│ MCP Server │ ◄──────► │ External     │
│  Code   │          │  (Node.js) │          │ Data/Service │
└─────────┘          └────────────┘          └──────────────┘
```

1. You configure MCP servers in Claude's config
2. Claude Code starts the MCP server process
3. Claude can call tools/resources provided by the MCP
4. MCP server interacts with external systems
5. Results flow back to Claude

## MCP Server Structure

A basic MCP server needs:

```
my-mcp/
├── package.json       # Dependencies and scripts
├── index.js          # MCP server implementation
└── README.md         # Documentation
```

**index.js** implements:
- **Tools**: Functions Claude can call
- **Resources**: Data Claude can access
- **Prompts**: Templates for common tasks

## Installing These Examples

Each example has its own README with specific instructions, but generally:

```bash
# 1. Navigate to the MCP directory
cd mcps/filesystem-mcp

# 2. Install dependencies
npm install
```

**3. Create `.mcp.json` in your project root:**

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

**4. Restart Claude Code** in that project directory

**5. Test it** - In Claude Code: "List files in my home directory"

## Example MCPs

### 1. Filesystem MCP
**Purpose**: Secure file system access with sandboxing

**Tools provided:**
- `read_file`: Read file contents
- `write_file`: Write to files
- `list_directory`: List directory contents
- `search_files`: Find files by pattern

**Use cases:**
- Safe file operations
- Project file management
- Log file analysis

### 2. API MCP
**Purpose**: Integrate with REST APIs

**Tools provided:**
- `fetch_data`: GET requests
- `post_data`: POST requests
- `search_api`: Search endpoints

**Resources provided:**
- `api://status`: API health status
- `api://config`: API configuration

**Use cases:**
- GitHub integration
- Weather data
- Any REST API

### 3. Database MCP
**Purpose**: Query and update databases

**Tools provided:**
- `query`: Execute SQL queries
- `insert`: Add records
- `update`: Modify records
- `delete`: Remove records

**Resources provided:**
- `db://schema`: Database schema
- `db://tables`: Available tables

**Use cases:**
- Data analysis
- Database management
- Report generation

## Configuration

MCP servers are configured in a `.mcp.json` file in your project root:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${PWD}/path/to/index.js"],
      "env": {
        "API_KEY": "your-key-here",
        "DEBUG": "true"
      }
    }
  }
}
```

**Important:**
- Use `${PWD}` for project-relative paths
- Environment variables go in `env` object
- Server name must be unique
- Restart Claude Code after config changes
- Keep `.mcp.json` local to each project (don't use global configs)

## Creating Your Own MCP

### 1. Install the SDK

```bash
npm install @modelcontextprotocol/sdk
```

### 2. Basic Server Template

```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'my-mcp',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
    resources: {},
  }
});

// Add a tool
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'my_tool',
    description: 'What this tool does',
    inputSchema: {
      type: 'object',
      properties: {
        param: { type: 'string', description: 'Parameter description' }
      },
      required: ['param']
    }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'my_tool') {
    const result = doSomething(request.params.arguments.param);
    return { content: [{ type: 'text', text: result }] };
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 3. Add Resources (Optional)

```javascript
server.setRequestHandler('resources/list', async () => ({
  resources: [{
    uri: 'myapp://data',
    name: 'Data resource',
    mimeType: 'application/json'
  }]
}));

server.setRequestHandler('resources/read', async (request) => {
  if (request.params.uri === 'myapp://data') {
    return {
      contents: [{
        uri: request.params.uri,
        mimeType: 'application/json',
        text: JSON.stringify({ data: 'value' })
      }]
    };
  }
});
```

## Best Practices

### Security
- Validate all inputs
- Sandbox file system access
- Rate limit API calls
- Never expose secrets
- Use environment variables for config

### Error Handling
- Catch and report errors clearly
- Provide helpful error messages
- Don't crash on invalid input
- Log errors for debugging

### Performance
- Cache expensive operations
- Use async/await properly
- Limit response sizes
- Add timeouts for external calls

### Documentation
- Clear tool descriptions
- Document all parameters
- Provide usage examples
- Include error scenarios

## Debugging MCPs

### Enable Debug Logging

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/index.js"],
      "env": {
        "DEBUG": "mcp:*"
      }
    }
  }
}
```

### Test Standalone

```bash
# Run the MCP server directly
node index.js

# It should start without errors
# Press Ctrl+C to stop
```

### Check Logs

```bash
# Claude Code logs location
tail -f ~/.config/claude/logs/main.log
```

### Common Issues

1. **Server won't start**
   - Check absolute paths in config
   - Verify Node.js version (18+)
   - Check for syntax errors

2. **Tools not appearing**
   - Verify tools/list handler
   - Check tool schema format
   - Restart Claude Code

3. **Permission errors**
   - Check file permissions
   - Verify environment variables
   - Check sandboxing settings

## Learn More

- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)

## Next Steps

1. Try the filesystem-mcp example
2. Modify it to add new tools
3. Create your own MCP for your use case
4. Share your MCP with the community
