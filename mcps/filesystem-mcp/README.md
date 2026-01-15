# Filesystem MCP Server

A secure MCP server that provides sandboxed file system access to Claude.

## Features

- Read and write files
- List directory contents
- Create directories
- Delete files
- Get file information
- Sandboxed to allowed directories only

## Security

This MCP implements sandboxing to prevent unauthorized file access. By default, it only allows access to:
- Your home directory (`$HOME`)
- `/tmp` directory
- Current working directory

You can modify `ALLOWED_DIRS` in `index.js` to customize allowed paths.

## Installation

```bash
# Install dependencies
npm install

# Test the server
npm start
# (Press Ctrl+C to stop)
```

## Configuration

Create a `.mcp.json` file in your project root:

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

Then restart Claude Code in that project directory.

## Usage Examples

### Read a file
```
Claude, read my README.md file
```

### Write a file
```
Create a file called test.txt with the content "Hello World"
```

### List directory
```
What files are in my home directory?
```

### Get file info
```
Show me details about my package.json file
```

### Create directory
```
Create a new directory called "projects" in my home folder
```

## Available Tools

### read_file
Reads the contents of a file.

**Parameters:**
- `path` (string): Path to the file

**Example:**
```javascript
{
  "path": "/home/user/document.txt"
}
```

### write_file
Writes content to a file.

**Parameters:**
- `path` (string): Path to the file
- `content` (string): Content to write

**Example:**
```javascript
{
  "path": "/home/user/notes.txt",
  "content": "My notes here"
}
```

### list_directory
Lists contents of a directory.

**Parameters:**
- `path` (string): Path to the directory

**Returns:** JSON array of entries with name, type, isDirectory, isFile

### create_directory
Creates a new directory (including parent directories if needed).

**Parameters:**
- `path` (string): Path to create

### delete_file
Deletes a file.

**Parameters:**
- `path` (string): Path to the file to delete

**Warning:** This permanently deletes files!

### get_file_info
Gets detailed information about a file.

**Parameters:**
- `path` (string): Path to the file

**Returns:** JSON object with size, dates, permissions, type

## Customization

### Add More Allowed Directories

Edit `index.js`:
```javascript
const ALLOWED_DIRS = [
  process.env.HOME,
  '/tmp',
  process.cwd(),
  '/path/to/your/project'  // Add your path here
];
```

### Add File Search Tool

Add this tool to the tools list:
```javascript
{
  name: 'search_files',
  description: 'Search for files by name pattern',
  inputSchema: {
    type: 'object',
    properties: {
      directory: { type: 'string', description: 'Directory to search' },
      pattern: { type: 'string', description: 'Pattern to match (e.g., "*.js")' }
    },
    required: ['directory', 'pattern']
  }
}
```

Then implement the handler in the switch statement.

### Add File Watching

You could extend this to watch files for changes and notify Claude when they change.

## Troubleshooting

### Server won't start
- Check Node.js version: `node --version` (need 18+)
- Verify dependencies: `npm install`
- Check for syntax errors in index.js

### Permission denied errors
- Check if path is in `ALLOWED_DIRS`
- Verify file permissions: `ls -la <file>`
- Make sure Claude Code has file access

### Changes not reflected
- Restart Claude Code after config changes
- Check config file syntax (valid JSON)
- Verify absolute path in config

## Learning Points

- **MCP Server Structure**: See how tools are defined and handled
- **Security**: Sandboxing implementation for safe file access
- **Error Handling**: Proper error messages and validation
- **Async Operations**: Using async/await with file system
- **Tool Schema**: Input validation using JSON Schema

## Next Steps

- Add more file operations (copy, move, rename)
- Implement file watching
- Add glob pattern support for file search
- Create file backup before overwriting
- Add file size limits for safety
