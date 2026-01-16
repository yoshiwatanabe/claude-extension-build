#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import Database from 'better-sqlite3';
import path from 'path';

// Database configuration
const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'demo.db');
let db;

try {
  db = new Database(DB_PATH, { readonly: false });
  console.error(`Connected to database: ${DB_PATH}`);
} catch (error) {
  console.error(`Failed to connect to database: ${error.message}`);
  process.exit(1);
}

// Create MCP server
const server = new Server({
  name: 'database-mcp',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
    resources: {}
  }
});

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'query',
      description: 'Execute a SELECT query on the database',
      inputSchema: {
        type: 'object',
        properties: {
          sql: {
            type: 'string',
            description: 'SQL SELECT query to execute'
          }
        },
        required: ['sql']
      }
    },
    {
      name: 'execute',
      description: 'Execute an INSERT, UPDATE, or DELETE statement',
      inputSchema: {
        type: 'object',
        properties: {
          sql: {
            type: 'string',
            description: 'SQL statement to execute'
          },
          params: {
            type: 'array',
            description: 'Parameters for prepared statement',
            items: { type: ['string', 'number', 'null'] }
          }
        },
        required: ['sql']
      }
    },
    {
      name: 'list_tables',
      description: 'List all tables in the database',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'describe_table',
      description: 'Get the schema of a specific table',
      inputSchema: {
        type: 'object',
        properties: {
          table: {
            type: 'string',
            description: 'Name of the table to describe'
          }
        },
        required: ['table']
      }
    },
    {
      name: 'create_table',
      description: 'Create a new table',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Table name'
          },
          schema: {
            type: 'string',
            description: 'SQL schema definition (e.g., "id INTEGER PRIMARY KEY, name TEXT")'
          }
        },
        required: ['name', 'schema']
      }
    }
  ]
}));

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'db://schema',
      name: 'Database Schema',
      mimeType: 'application/json',
      description: 'Complete database schema'
    },
    {
      uri: 'db://tables',
      name: 'Table List',
      mimeType: 'application/json',
      description: 'List of all tables'
    },
    {
      uri: 'db://stats',
      name: 'Database Statistics',
      mimeType: 'application/json',
      description: 'Database size and statistics'
    }
  ]
}));

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    if (uri === 'db://tables') {
      const tables = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      ).all();

      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(tables.map(t => t.name), null, 2)
        }]
      };
    }

    if (uri === 'db://schema') {
      const schema = {};
      const tables = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      ).all();

      for (const table of tables) {
        const columns = db.pragma(`table_info(${table.name})`);
        schema[table.name] = columns;
      }

      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(schema, null, 2)
        }]
      };
    }

    if (uri === 'db://stats') {
      const tables = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      ).all();

      const stats = {
        path: DB_PATH,
        tables: tables.length,
        tableStats: {}
      };

      for (const table of tables) {
        const count = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get();
        stats.tableStats[table.name] = { rows: count.count };
      }

      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(stats, null, 2)
        }]
      };
    }

    throw new Error(`Unknown resource: ${uri}`);
  } catch (error) {
    throw new Error(`Resource read failed: ${error.message}`);
  }
});

// Validate that query is safe (basic protection)
function validateQuery(sql) {
  const normalized = sql.toLowerCase().trim();

  // For SELECT queries, ensure they don't contain modification statements
  if (normalized.startsWith('select')) {
    if (normalized.includes('insert') || normalized.includes('update') ||
        normalized.includes('delete') || normalized.includes('drop') ||
        normalized.includes('alter') || normalized.includes('create')) {
      throw new Error('SELECT queries cannot contain modification statements');
    }
  }

  return true;
}

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'query': {
        validateQuery(args.sql);

        if (!args.sql.toLowerCase().trim().startsWith('select')) {
          return {
            content: [{
              type: 'text',
              text: 'Use the "execute" tool for non-SELECT statements'
            }],
            isError: true
          };
        }

        const results = db.prepare(args.sql).all();
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ results, count: results.length }, null, 2)
          }]
        };
      }

      case 'execute': {
        const stmt = db.prepare(args.sql);
        const info = args.params ? stmt.run(...args.params) : stmt.run();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              changes: info.changes,
              lastInsertRowid: info.lastInsertRowid
            }, null, 2)
          }]
        };
      }

      case 'list_tables': {
        const tables = db.prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        ).all();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(tables.map(t => t.name), null, 2)
          }]
        };
      }

      case 'describe_table': {
        const columns = db.pragma(`table_info(${args.table})`);
        const indexes = db.pragma(`index_list(${args.table})`);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ columns, indexes }, null, 2)
          }]
        };
      }

      case 'create_table': {
        db.prepare(`CREATE TABLE ${args.name} (${args.schema})`).run();

        return {
          content: [{
            type: 'text',
            text: `Table "${args.name}" created successfully`
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

// Cleanup on exit
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Database MCP server running');
  console.error('Database:', DB_PATH);
}

main().catch(console.error);
