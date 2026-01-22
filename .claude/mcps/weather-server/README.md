# Weather Server MCP

A Model Context Protocol (MCP) server that demonstrates integration with an external API to fetch weather data.

## Purpose

This MCP serves as an educational example of how to:
- Integrate external APIs with MCP servers
- Call anonymous APIs (no authentication required)
- Handle real-world API responses
- Provide tool interfaces for external functionality
- Format and present API data to Claude

## Features

- **Get Weather Data**: Fetch current weather and hourly forecasts for any global location
- **Free API**: Uses Open-Meteo API which requires no authentication
- **Proper Error Handling**: Validates coordinates and handles API errors gracefully

## Architecture

### External API Used

**Open-Meteo** (https://open-meteo.com)
- Free weather forecasting API
- No authentication required
- Provides current conditions and forecasts
- Global coverage

### Tools Available

#### `get_weather`

Get current weather and hourly forecast for a location.

**Parameters:**
- `latitude` (number, required): Location latitude (-90 to 90)
- `longitude` (number, required): Location longitude (-180 to 180)

**Returns:**
- Current temperature, wind speed, timezone
- Hourly forecast for the next 3 hours with temperature and humidity

**Example:**
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

## Implementation Details

### Node.js with MCP SDK

This server is implemented in JavaScript/Node.js using the official MCP SDK:

```bash
npm install
npm start
```

### Key Components

1. **Server Setup**: Uses `@modelcontextprotocol/sdk` for MCP protocol handling
2. **API Integration**: Uses `node-fetch` for making HTTP requests
3. **Request Handlers**:
   - `ListToolsRequestSchema`: Defines available tools
   - `CallToolRequestSchema`: Executes tools and calls external API

### API Request Flow

```
Claude → get_weather tool → index.js → Open-Meteo API → Formatted response → Claude
```

## Usage Examples

### Getting weather for San Francisco
```
Latitude: 37.7749
Longitude: -122.4194
```

### Getting weather for Tokyo
```
Latitude: 35.6762
Longitude: 139.6503
```

## Learning Points

This MCP demonstrates:
1. **External API Integration**: How to call anonymous HTTP APIs
2. **Error Handling**: Validating user input and handling API failures
3. **Data Formatting**: Presenting API responses in user-friendly format
4. **Asynchronous Operations**: Handling async API calls in Node.js

## Comparison with Python Version

The original Python implementation (`weather-server-py`) demonstrates the same functionality but using basic socket communication. This Node.js version uses:
- Official MCP SDK for better protocol compliance
- Standardized request/response handling
- Better integration with MCP ecosystem
- Easier dependency management with npm

## Development

### Dependencies
- `@modelcontextprotocol/sdk`: Official MCP protocol implementation
- `node-fetch`: HTTP client for making API requests

### File Structure
```
weather-server/
├── package.json       # Project metadata and dependencies
├── index.js          # Main MCP server implementation
└── README.md         # This file
```

## Notes

- No API key required for Open-Meteo API
- Free tier has generous rate limits
- All coordinates use decimal degrees format
- Times are returned in ISO 8601 format
- Data includes timezone-aware timestamps
