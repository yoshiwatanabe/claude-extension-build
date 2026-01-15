#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

// Base API URL (can be configured via environment variable)
const BASE_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const API_KEY = process.env.API_KEY || '';

// Create MCP server
const server = new Server({
  name: 'api-mcp',
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
      name: 'api_get',
      description: 'Make a GET request to an API endpoint',
      inputSchema: {
        type: 'object',
        properties: {
          endpoint: {
            type: 'string',
            description: 'API endpoint path (e.g., "/users/1")'
          },
          headers: {
            type: 'object',
            description: 'Optional headers to include',
            additionalProperties: { type: 'string' }
          }
        },
        required: ['endpoint']
      }
    },
    {
      name: 'api_post',
      description: 'Make a POST request to an API endpoint',
      inputSchema: {
        type: 'object',
        properties: {
          endpoint: {
            type: 'string',
            description: 'API endpoint path'
          },
          data: {
            type: 'object',
            description: 'Data to send in the request body'
          },
          headers: {
            type: 'object',
            description: 'Optional headers to include',
            additionalProperties: { type: 'string' }
          }
        },
        required: ['endpoint', 'data']
      }
    },
    {
      name: 'api_put',
      description: 'Make a PUT request to an API endpoint',
      inputSchema: {
        type: 'object',
        properties: {
          endpoint: {
            type: 'string',
            description: 'API endpoint path'
          },
          data: {
            type: 'object',
            description: 'Data to send in the request body'
          }
        },
        required: ['endpoint', 'data']
      }
    },
    {
      name: 'api_delete',
      description: 'Make a DELETE request to an API endpoint',
      inputSchema: {
        type: 'object',
        properties: {
          endpoint: {
            type: 'string',
            description: 'API endpoint path'
          }
        },
        required: ['endpoint']
      }
    }
  ]
}));

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'api://config',
      name: 'API Configuration',
      mimeType: 'application/json',
      description: 'Current API configuration'
    },
    {
      uri: 'api://endpoints',
      name: 'Available Endpoints',
      mimeType: 'application/json',
      description: 'List of common API endpoints'
    }
  ]
}));

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'api://config') {
    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          baseUrl: BASE_URL,
          hasApiKey: !!API_KEY,
          defaultHeaders: {
            'Content-Type': 'application/json',
            'User-Agent': 'MCP-API-Client/1.0'
          }
        }, null, 2)
      }]
    };
  }

  if (uri === 'api://endpoints') {
    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          users: {
            list: '/users',
            get: '/users/{id}',
            create: '/users (POST)',
            update: '/users/{id} (PUT)',
            delete: '/users/{id} (DELETE)'
          },
          posts: {
            list: '/posts',
            get: '/posts/{id}',
            byUser: '/users/{id}/posts'
          },
          comments: {
            list: '/comments',
            get: '/comments/{id}',
            byPost: '/posts/{id}/comments'
          }
        }, null, 2)
      }]
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Helper function to make API requests
async function makeRequest(method, endpoint, data = null, customHeaders = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'MCP-API-Client/1.0',
    ...customHeaders
  };

  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  const options = {
    method,
    headers
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'api_get':
        result = await makeRequest('GET', args.endpoint, null, args.headers || {});
        break;

      case 'api_post':
        result = await makeRequest('POST', args.endpoint, args.data, args.headers || {});
        break;

      case 'api_put':
        result = await makeRequest('PUT', args.endpoint, args.data, args.headers || {});
        break;

      case 'api_delete':
        result = await makeRequest('DELETE', args.endpoint);
        break;

      default:
        return {
          content: [{
            type: 'text',
            text: `Unknown tool: ${name}`
          }],
          isError: true
        };
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
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

  console.error('API MCP server running');
  console.error('Base URL:', BASE_URL);
  console.error('API Key configured:', !!API_KEY);
}

main().catch(console.error);
