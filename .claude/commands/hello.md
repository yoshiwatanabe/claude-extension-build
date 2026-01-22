---
name: hello
description: Simple greeting command that demonstrates a basic command with no tools
argument-hint: "[--name NAME]"
allowed-tools: []
---

# Hello Command

This command provides a simple greeting, demonstrating the most basic command pattern with no tool usage.

## Purpose

Showcase a minimal command that:
- Takes optional user input (name)
- Generates a text response without tools
- Demonstrates pure instruction-based command execution

## Instructions

When this command is executed:

1. Check if the `--name` argument was provided
2. If name provided, greet the user personally: "Hello, [name]! Welcome to the Plugin Showcase."
3. If no name provided, give a generic greeting: "Hello! Welcome to the Plugin Showcase."
4. Add a brief explanation: "This is a demonstration of a simple command with no tool requirements."
5. Optionally mention other showcase commands they can try:
   - `/showcase:info` - Display system information
   - `/showcase:echo` - Echo a message or file content

## Argument Handling

- `--name NAME`: Optional. The user's name for personalized greeting
  - Example: `/showcase:hello --name Alice`
  - If not provided, use generic greeting

## Examples

**With name:**
```
User: /showcase:hello --name Alice
Response: Hello, Alice! Welcome to the Plugin Showcase.

This is a demonstration of a simple command with no tool requirements.

Try other showcase commands:
- /showcase:info - Display system information
- /showcase:echo - Echo a message or file content
```

**Without name:**
```
User: /showcase:hello
Response: Hello! Welcome to the Plugin Showcase.

This is a demonstration of a simple command with no tool requirements.

Try other showcase commands:
- /showcase:info - Display system information
- /showcase:echo - Echo a message or file content
```

## Educational Notes

This command demonstrates:
- **Minimal pattern**: No tools needed for simple text responses
- **Optional arguments**: How to handle optional user input
- **Pure instruction**: All logic handled through instructions, not tool execution
- **User guidance**: Pointing users to related functionality

Commands written FOR Claude (not TO the user) - these are instructions for Claude to follow.
