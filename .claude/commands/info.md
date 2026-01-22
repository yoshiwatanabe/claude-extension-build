---
name: info
description: Display system information using the Bash tool
argument-hint: "[--verbose]"
allowed-tools: ["Bash"]
---

# Info Command

This command displays system information by executing bash commands, demonstrating how commands can use tools.

## Purpose

Showcase a command that:
- Uses the Bash tool for system interaction
- Gathers and formats information
- Demonstrates tool integration in commands
- Shows conditional detail levels with optional arguments

## Instructions

When this command is executed:

1. Use the Bash tool to gather system information:
   - Current date and time: `date`
   - Operating system: `uname -s`
   - Current user: `whoami`
   - Current working directory: `pwd`

2. If `--verbose` flag is provided, also gather:
   - OS version: `uname -r`
   - Hostname: `hostname`
   - Shell: `echo $SHELL`
   - Home directory: `echo $HOME`

3. Format the output clearly:
   - Use headers and separators
   - Present in a readable format
   - Group related information

4. Add a footer explaining this is a demonstration of tool usage in commands

## Argument Handling

- `--verbose`: Optional flag. When present, display additional system details
  - Example: `/showcase:info --verbose`
  - Without flag, show basic info only

## Examples

**Basic info:**
```
User: /showcase:info
Response:
=== System Information ===

Date & Time: Wed Jan 15 10:30:45 PST 2026
Operating System: Linux
User: ywatanabe
Working Directory: /home/ywatanabe/dev/claude-extension-build

This demonstrates a command using the Bash tool to gather system information.
Use --verbose flag for more details.
```

**Verbose info:**
```
User: /showcase:info --verbose
Response:
=== System Information (Verbose) ===

Basic Info:
  Date & Time: Wed Jan 15 10:30:45 PST 2026
  Operating System: Linux
  User: ywatanabe
  Working Directory: /home/ywatanabe/dev/claude-extension-build

Additional Details:
  OS Version: 5.15.146.1-microsoft-standard-WSL2
  Hostname: DESKTOP-ABC123
  Shell: /bin/bash
  Home Directory: /home/ywatanabe

This demonstrates a command using the Bash tool to gather system information.
```

## Tool Usage

**Allowed Tools:**
- `Bash`: For executing system commands

**Security Note:**
This command only executes safe, read-only system commands. Never execute user-provided commands directly.

## Educational Notes

This command demonstrates:
- **Tool integration**: How commands invoke tools (Bash)
- **Information gathering**: Collecting system data
- **Conditional execution**: Different behavior based on flags
- **Safe practices**: Only using pre-defined, safe commands
- **Output formatting**: Presenting data clearly

The `allowed-tools` frontmatter restricts which tools the command can use, enforcing security boundaries.
