# Database MCP Server

SQLite database access for Claude with safe query execution.

## Features

- Execute SQL queries (SELECT, INSERT, UPDATE, DELETE)
- List and describe tables
- View database schema
- Create tables
- Safe query validation
- Database statistics

## Installation

```bash
# Install dependencies
npm install

# Create demo database with sample data
npm run init-demo

# Test the server
npm start
```

## Demo Database

The demo database includes:
- **users**: Sample user accounts
- **posts**: Blog posts
- **comments**: Post comments

Run `npm run init-demo` to create it.

## Configuration

Create or add to `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "database": {
      "command": "node",
      "args": ["${PWD}/mcps/database-mcp/index.js"],
      "env": {
        "DB_PATH": "${PWD}/mcps/database-mcp/demo.db"
      }
    }
  }
}
```

Then restart Claude Code in that project directory.

**Environment Variables:**
- `DB_PATH`: Path to SQLite database file (default: demo.db in current directory)

## Usage Examples

### Query Data
```
Claude, show me all users in the database
```

### Complex Queries
```
Get all published posts with their author names, ordered by date
```

### Insert Data
```
Add a new user named "David Lee" with email "david@example.com"
```

### Table Information
```
What tables are in the database?
Show me the schema for the posts table
```

### Database Stats
```
How many records are in each table?
```

## Available Tools

### query
Execute SELECT queries.

**Parameters:**
- `sql` (string): SELECT query

**Example:**
```javascript
{
  "sql": "SELECT * FROM users WHERE id = 1"
}
```

### execute
Execute INSERT, UPDATE, or DELETE statements.

**Parameters:**
- `sql` (string): SQL statement
- `params` (array, optional): Parameters for prepared statements

**Example:**
```javascript
{
  "sql": "INSERT INTO users (name, email) VALUES (?, ?)",
  "params": ["John Doe", "john@example.com"]
}
```

### list_tables
List all tables in the database.

**Returns:** Array of table names

### describe_table
Get detailed schema information for a table.

**Parameters:**
- `table` (string): Table name

**Returns:** Column definitions and indexes

### create_table
Create a new table.

**Parameters:**
- `name` (string): Table name
- `schema` (string): Column definitions

**Example:**
```javascript
{
  "name": "products",
  "schema": "id INTEGER PRIMARY KEY, name TEXT, price REAL"
}
```

## Available Resources

### db://schema
Complete database schema for all tables.

### db://tables
List of all table names.

### db://stats
Database statistics including row counts.

## Example Queries

### Basic SELECT
```sql
SELECT * FROM users;
```

### JOIN Query
```sql
SELECT posts.title, users.name as author
FROM posts
JOIN users ON posts.user_id = users.id
WHERE posts.published = 1;
```

### Aggregation
```sql
SELECT user_id, COUNT(*) as post_count
FROM posts
GROUP BY user_id;
```

### INSERT with Auto-increment
```sql
INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane@example.com');
```

### UPDATE
```sql
UPDATE posts SET published = 1 WHERE id = 4;
```

### DELETE
```sql
DELETE FROM comments WHERE id = 1;
```

## Safety Features

- **Query Validation**: Basic SQL injection prevention
- **Prepared Statements**: Support for parameterized queries
- **Error Handling**: Graceful error messages
- **Read-only Option**: Can configure database as read-only

## Customization

### Use Your Own Database

Point to your existing SQLite database:
```json
{
  "env": {
    "DB_PATH": "/path/to/your/database.db"
  }
}
```

### Add Read-only Mode

In `index.js`, change:
```javascript
const db = new Database(DB_PATH, { readonly: true });
```

### Add Query Logging

Add before `server.setRequestHandler(CallToolRequestSchema...)`:
```javascript
const originalHandler = server.setRequestHandler;
server.setRequestHandler = function(...args) {
  if (args[0] === CallToolRequestSchema) {
    const originalCallback = args[1];
    args[1] = async (request) => {
      console.error('Query:', request.params.arguments);
      return originalCallback(request);
    };
  }
  return originalHandler.apply(this, args);
};
```

### Add Transaction Support

Add a new tool:
```javascript
{
  name: 'transaction',
  description: 'Execute multiple statements in a transaction',
  inputSchema: {
    type: 'object',
    properties: {
      statements: {
        type: 'array',
        items: { type: 'string' }
      }
    },
    required: ['statements']
  }
}
```

## Real-World Use Cases

### Data Analysis
```
Claude, analyze the posting patterns: how many posts per user and average comments?
```

### Report Generation
```
Generate a summary report of user activity including total posts and comments
```

### Data Migration
```
Create a new table 'tags' and migrate some data from posts
```

### Quality Checks
```
Find any users who have posts but no comments
```

## Supported Databases

This example uses SQLite, but you can adapt it for:
- **PostgreSQL**: Use `pg` package
- **MySQL**: Use `mysql2` package
- **MongoDB**: Use `mongodb` package

Just replace the Database import and query methods.

## Security Best Practices

1. **Use Prepared Statements**: Always use parameterized queries
2. **Validate Input**: Check table/column names
3. **Limit Permissions**: Use read-only when possible
4. **Audit Queries**: Log all database operations
5. **Sandbox**: Restrict database file location

## Troubleshooting

### Database locked error
SQLite doesn't handle concurrent writes well. Use a timeout:
```javascript
const db = new Database(DB_PATH, { timeout: 5000 });
```

### Table not found
```
Use the list_tables tool to see available tables
```

### Permission denied
Check file permissions on database file:
```bash
ls -la demo.db
chmod 644 demo.db
```

## Learning Points

- **SQL Execution**: Safe query handling with prepared statements
- **Schema Introspection**: Dynamic database exploration
- **Resources**: Exposing metadata through resource URIs
- **Error Handling**: Database-specific error handling
- **Connection Management**: Proper database lifecycle

## Next Steps

- Add support for other databases (PostgreSQL, MySQL)
- Implement query caching
- Add transaction support
- Build a schema migration tool
- Create data visualization capabilities
- Add backup/restore functionality
