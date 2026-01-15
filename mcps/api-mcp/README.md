# API Integration MCP Server

Connect Claude to any REST API with this MCP server.

## Features

- GET, POST, PUT, DELETE requests
- Custom headers support
- API key authentication
- Resource endpoints for API documentation
- Configurable base URL
- Response formatting and error handling

## Installation

```bash
npm install
```

## Configuration

Create or add to `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "api": {
      "command": "node",
      "args": ["${PWD}/mcps/api-mcp/index.js"],
      "env": {
        "API_BASE_URL": "https://api.example.com",
        "API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Then restart Claude Code in that project directory.

**Environment Variables:**
- `API_BASE_URL`: Base URL for API requests (default: JSONPlaceholder demo API)
- `API_KEY`: Optional API key for authentication

## Usage Examples

### GET Request
```
Claude, fetch user with ID 1 from the API
```

### POST Request
```
Create a new user with name "John Doe" and email "john@example.com"
```

### Check API Configuration
```
Show me the current API configuration
```

### List Available Endpoints
```
What API endpoints are available?
```

## Available Tools

### api_get
Make a GET request to an API endpoint.

**Parameters:**
- `endpoint` (string): API endpoint path (e.g., "/users/1")
- `headers` (object, optional): Custom headers

**Example:**
```javascript
{
  "endpoint": "/users/1",
  "headers": {
    "Accept": "application/json"
  }
}
```

### api_post
Make a POST request to create new data.

**Parameters:**
- `endpoint` (string): API endpoint path
- `data` (object): Data to send
- `headers` (object, optional): Custom headers

**Example:**
```javascript
{
  "endpoint": "/users",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### api_put
Make a PUT request to update data.

**Parameters:**
- `endpoint` (string): API endpoint path
- `data` (object): Updated data

### api_delete
Make a DELETE request to remove data.

**Parameters:**
- `endpoint` (string): API endpoint path

## Available Resources

### api://config
View current API configuration including base URL and authentication status.

### api://endpoints
See a list of commonly used API endpoints (customizable).

## Default API (JSONPlaceholder)

By default, this MCP uses JSONPlaceholder, a free fake API for testing:

**Endpoints:**
- `/users` - User management
- `/posts` - Blog posts
- `/comments` - Comments
- `/albums` - Photo albums
- `/todos` - Todo items

**Example requests:**
- Get all users: `/users`
- Get user 1: `/users/1`
- Get user 1's posts: `/users/1/posts`
- Create post: POST to `/posts`

## Customization

### Change API Base URL

In your Claude config:
```json
{
  "env": {
    "API_BASE_URL": "https://api.github.com"
  }
}
```

### Add API Key Authentication

In your Claude config:
```json
{
  "env": {
    "API_KEY": "your-secret-key"
  }
}
```

The API key is automatically added as: `Authorization: Bearer <API_KEY>`

### Customize Available Endpoints

Edit the `api://endpoints` resource in `index.js`:
```javascript
if (uri === 'api://endpoints') {
  return {
    contents: [{
      uri,
      mimeType: 'application/json',
      text: JSON.stringify({
        // Your custom endpoints here
        repositories: {
          list: '/repos',
          get: '/repos/{owner}/{repo}'
        }
      }, null, 2)
    }]
  };
}
```

### Add Request Rate Limiting

Add this before the `makeRequest` function:
```javascript
const requestQueue = [];
const MAX_REQUESTS_PER_MINUTE = 60;

async function rateLimitedRequest(...args) {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;

  // Remove old requests
  while (requestQueue.length && requestQueue[0] < oneMinuteAgo) {
    requestQueue.shift();
  }

  if (requestQueue.length >= MAX_REQUESTS_PER_MINUTE) {
    throw new Error('Rate limit exceeded');
  }

  requestQueue.push(now);
  return makeRequest(...args);
}
```

## Real-World Examples

### GitHub API
```json
{
  "env": {
    "API_BASE_URL": "https://api.github.com",
    "API_KEY": "ghp_your_token_here"
  }
}
```

Usage:
```
Get information about the anthropics/claude-code repository
```

### Weather API
```json
{
  "env": {
    "API_BASE_URL": "https://api.openweathermap.org/data/2.5",
    "API_KEY": "your_openweather_key"
  }
}
```

Usage:
```
What's the current weather in San Francisco?
```

### Stripe API
```json
{
  "env": {
    "API_BASE_URL": "https://api.stripe.com/v1",
    "API_KEY": "sk_test_your_key"
  }
}
```

Usage:
```
List the last 10 customers from Stripe
```

## Troubleshooting

### CORS Errors
CORS doesn't apply to server-side requests. If you see CORS errors, the API itself might be blocking requests.

### Authentication Fails
- Verify API_KEY is correct
- Check if API requires different auth format
- Modify the Authorization header format in `makeRequest`

### Timeout Issues
Add timeout to fetch:
```javascript
const response = await fetch(url, {
  ...options,
  timeout: 10000  // 10 seconds
});
```

## Learning Points

- **HTTP Methods**: Proper use of GET, POST, PUT, DELETE
- **Resources**: Exposing API metadata to Claude
- **Environment Variables**: Configuration via env vars
- **Error Handling**: Graceful failure with useful messages
- **Headers**: Custom header support for flexibility

## Next Steps

- Add pagination support
- Implement caching for GET requests
- Add request/response logging
- Support file uploads
- Add GraphQL support
- Implement retry logic with exponential backoff
