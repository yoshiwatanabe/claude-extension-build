---
name: echo
description: Echo a message or file content, demonstrating argument handling and Read/Write tools
argument-hint: "[--message TEXT | --file PATH] [--output PATH]"
allowed-tools: ["Read", "Write"]
---

# Echo Command

This command echoes text or file content, optionally writing to a file. Demonstrates argument handling and file I/O tools.

## Purpose

Showcase a command that:
- Handles multiple argument patterns (message OR file)
- Uses Read tool to read files
- Uses Write tool to create files
- Demonstrates input validation
- Shows flexible command design

## Instructions

When this command is executed:

### Input Handling

1. Check which input argument is provided:
   - If `--message TEXT` provided: Use the provided text
   - If `--file PATH` provided: Use Read tool to read file contents
   - If both provided: Show error - only one input method allowed
   - If neither provided: Show error - input required

2. Validate input:
   - For `--message`: Ensure text is not empty
   - For `--file`: Ensure file exists and is readable (Read tool will error if not)

### Output Handling

3. Check output destination:
   - If `--output PATH` provided: Write to file using Write tool
   - If not provided: Display content directly to user

4. Format output appropriately:
   - For display: Add header explaining what's being echoed
   - For file: Write content directly without extra formatting

### Error Handling

5. Provide clear error messages for:
   - Missing input arguments
   - Conflicting arguments (both --message and --file)
   - File read failures
   - File write failures

6. Include usage examples in error messages

## Argument Handling

**Input (mutually exclusive):**
- `--message TEXT`: Text to echo
  - Example: `/showcase:echo --message "Hello, world!"`
- `--file PATH`: Path to file to read and echo
  - Example: `/showcase:echo --file /path/to/file.txt`

**Output (optional):**
- `--output PATH`: Path to write output to
  - Example: `/showcase:echo --message "Test" --output /tmp/output.txt`
  - If not provided, display to user

## Examples

**Echo message:**
```
User: /showcase:echo --message "Hello, world!"
Response:
=== Echo Output ===

Hello, world!

This demonstrates the echo command echoing a message.
```

**Echo file:**
```
User: /showcase:echo --file /home/user/test.txt
Response:
=== Echo Output (from /home/user/test.txt) ===

[File contents here]

This demonstrates the echo command reading and displaying file content.
```

**Echo to file:**
```
User: /showcase:echo --message "Save this" --output /tmp/saved.txt
Response:
=== File Written Successfully ===

Content written to: /tmp/saved.txt

Message: "Save this"

This demonstrates the echo command writing to a file.
```

**Error - no input:**
```
User: /showcase:echo
Response:
Error: Input required. Provide either --message or --file.

Usage:
  /showcase:echo --message "your text"
  /showcase:echo --file /path/to/file.txt
  /showcase:echo --message "text" --output /path/to/output.txt
```

**Error - both inputs:**
```
User: /showcase:echo --message "text" --file /path/file.txt
Response:
Error: Conflicting arguments. Provide either --message OR --file, not both.

Usage:
  /showcase:echo --message "your text"
  /showcase:echo --file /path/to/file.txt
```

## Tool Usage

**Allowed Tools:**
- `Read`: For reading file content when `--file` is provided
- `Write`: For writing output when `--output` is provided

**Tool Selection Logic:**
- Only use Read if `--file` provided
- Only use Write if `--output` provided
- No tools needed if just echoing message to user

## Educational Notes

This command demonstrates:
- **Argument patterns**: Mutually exclusive options, optional flags
- **Input validation**: Checking for required and conflicting arguments
- **Conditional tool use**: Only invoking tools when needed
- **File I/O**: Reading and writing files appropriately
- **Error handling**: Clear, helpful error messages with usage examples
- **Flexible design**: Multiple ways to use the same command

The command is designed FOR Claude to execute, not as a script for users to run directly.
