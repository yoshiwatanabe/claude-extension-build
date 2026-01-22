#!/usr/bin/env node
/**
 * Weather Server - MCP with external API integration
 * 
 * Demonstrates an MCP server that integrates with an external API (Open-Meteo)
 * using proper JSON-RPC 2.0 protocol. Provides current weather and forecast
 * data for any location.
 * 
 * Educational Example: Shows how MCP servers handle real API integration
 * with proper protocol implementation and error handling.
 * 
 * Uses Open-Meteo API which requires no authentication and is free to use.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

// Open-Meteo API base URL (free, no authentication needed)
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Create MCP server
const server = new Server({
  name: 'weather-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

/**
 * Fetch weather data from Open-Meteo API
 */
async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,wind_speed_10m,weather_code',
    hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
    timezone: 'auto'
  });

  try {
    const response = await fetch(`${WEATHER_API_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

/**
 * Format weather data for display
 */
function formatWeather(data) {
  const current = data.current || {};
  const location = `(${data.latitude}, ${data.longitude})`;

  let result = `Current Weather at ${location}:\n`;
  result += `- Temperature: ${current.temperature_2m ?? 'N/A'}°C\n`;
  result += `- Wind Speed: ${current.wind_speed_10m ?? 'N/A'} km/h\n`;
  result += `- Timezone: ${data.timezone ?? 'N/A'}\n`;

  // Add hourly forecast for next 3 hours
  const hourly = data.hourly || {};
  if (hourly.time && hourly.time.length > 0) {
    const times = hourly.time.slice(0, 3);
    const temps = hourly.temperature_2m || [];
    const humidity = hourly.relative_humidity_2m || [];

    result += '\nNext 3 hours forecast:\n';
    times.forEach((time, i) => {
      const temp = temps[i] ?? 'N/A';
      const hum = humidity[i] ?? 'N/A';
      result += `  ${time}: ${temp}°C, ${hum}% humidity\n`;
    });
  }

  return result;
}

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_weather',
      description: 'Get current weather and hourly forecast for a location using coordinates',
      inputSchema: {
        type: 'object',
        properties: {
          latitude: {
            type: 'number',
            description: 'Latitude of the location (-90 to 90)',
            minimum: -90,
            maximum: 90
          },
          longitude: {
            type: 'number',
            description: 'Longitude of the location (-180 to 180)',
            minimum: -180,
            maximum: 180
          }
        },
        required: ['latitude', 'longitude']
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'get_weather') {
      const { latitude, longitude } = args;

      if (latitude === undefined || longitude === undefined) {
        return {
          content: [{
            type: 'text',
            text: 'Error: Missing required parameters. Please provide latitude and longitude.'
          }],
          isError: true
        };
      }

      if (latitude < -90 || latitude > 90) {
        return {
          content: [{
            type: 'text',
            text: 'Error: Latitude must be between -90 and 90'
          }],
          isError: true
        };
      }

      if (longitude < -180 || longitude > 180) {
        return {
          content: [{
            type: 'text',
            text: 'Error: Longitude must be between -180 and 180'
          }],
          isError: true
        };
      }

      const data = await getWeather(latitude, longitude);
      const formatted = formatWeather(data);

      return {
        content: [{
          type: 'text',
          text: formatted
        }]
      };
    }

    return {
      content: [{
        type: 'text',
        text: `Unknown tool: ${name}`
      }],
      isError: true
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
  try {
    console.error('Weather MCP: Initializing...');
    const transport = new StdioServerTransport();
    console.error('Weather MCP: Transport created');

    await server.connect(transport);
    console.error('Weather MCP: Connected');
    console.error('Weather MCP server running');
    console.error('Using Open-Meteo API (free, no authentication)');
    console.error('API URL: https://api.open-meteo.com/v1/forecast');
  } catch (error) {
    console.error('Weather MCP initialization error:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Weather MCP fatal error:', error);
  process.exit(1);
});
