#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Allowed directories for file operations (sandbox)
const ALLOWED_DIRS = [
  process.env.HOME,
  '/tmp',
  process.cwd()
];

// Check if path is within allowed directories
function isPathAllowed(filePath) {
  const absolutePath = path.resolve(filePath);
  return ALLOWED_DIRS.some(dir => absolutePath.startsWith(path.resolve(dir)));
}

// Create MCP server
const server = new Server({
  name: 'filesystem-mcp',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  }
});

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'read_file',
      description: 'Read contents of a file. Path must be within allowed directories.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the file to read'
          }
        },
        required: ['path']
      }
    },
    {
      name: 'write_file',
      description: 'Write content to a file. Creates file if it doesn\'t exist.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the file to write'
          },
          content: {
            type: 'string',
            description: 'Content to write to the file'
          }
        },
        required: ['path', 'content']
      }
    },
    {
      name: 'list_directory',
      description: 'List contents of a directory',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the directory to list'
          }
        },
        required: ['path']
      }
    },
    {
      name: 'create_directory',
      description: 'Create a new directory',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the directory to create'
          }
        },
        required: ['path']
      }
    },
    {
      name: 'delete_file',
      description: 'Delete a file',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the file to delete'
          }
        },
        required: ['path']
      }
    },
    {
      name: 'get_file_info',
      description: 'Get information about a file (size, modified time, etc.)',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the file'
          }
        },
        required: ['path']
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Security check
    if (!isPathAllowed(args.path)) {
      return {
        content: [{
          type: 'text',
          text: `Access denied: Path "${args.path}" is outside allowed directories`
        }],
        isError: true
      };
    }

    switch (name) {
      case 'read_file': {
        const content = await fs.readFile(args.path, 'utf-8');
        return {
          content: [{
            type: 'text',
            text: content
          }]
        };
      }

      case 'write_file': {
        await fs.writeFile(args.path, args.content, 'utf-8');
        return {
          content: [{
            type: 'text',
            text: `Successfully wrote to ${args.path}`
          }]
        };
      }

      case 'list_directory': {
        const entries = await fs.readdir(args.path, { withFileTypes: true });
        const formatted = entries.map(entry => ({
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : 'file',
          isDirectory: entry.isDirectory(),
          isFile: entry.isFile()
        }));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(formatted, null, 2)
          }]
        };
      }

      case 'create_directory': {
        await fs.mkdir(args.path, { recursive: true });
        return {
          content: [{
            type: 'text',
            text: `Successfully created directory ${args.path}`
          }]
        };
      }

      case 'delete_file': {
        await fs.unlink(args.path);
        return {
          content: [{
            type: 'text',
            text: `Successfully deleted ${args.path}`
          }]
        };
      }

      case 'get_file_info': {
        const stats = await fs.stat(args.path);
        const info = {
          size: stats.size,
          sizeFormatted: `${(stats.size / 1024).toFixed(2)} KB`,
          created: stats.birthtime,
          modified: stats.mtime,
          accessed: stats.atime,
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
          permissions: stats.mode.toString(8).slice(-3)
        };
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(info, null, 2)
          }]
        };
      }

      default:
        return {
          content: [{
            type: 'text',
            text: `Unknown tool: ${name}`
          }],
          isError: true
        };
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error.message}`
      }],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Filesystem MCP server running');
  console.error('Allowed directories:', ALLOWED_DIRS);
}

main().catch(console.error);
