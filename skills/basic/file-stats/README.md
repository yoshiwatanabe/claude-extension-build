# File Stats Skill

Analyzes files and provides detailed statistics.

## What it does

- Counts lines (total, non-empty, comments)
- Detects file type/language
- Estimates complexity
- Shows file size
- Presents results in a table

## Installation

```bash
cp -r skills/basic/file-stats ~/.config/claude/skills/
```

## Usage

### With file argument:
```
/file-stats src/index.js
```

### Without argument (will ask):
```
/file-stats
```

### Via Claude:
```
Analyze the complexity of my main.py file using file-stats
```

## Example Output

```
File: src/index.js

Statistics:
┌─────────────────┬────────┐
│ Metric          │ Value  │
├─────────────────┼────────┤
│ Total Lines     │ 245    │
│ Non-empty Lines │ 198    │
│ Comment Lines   │ 47     │
│ File Size       │ 8.2 KB │
│ Language        │ JavaScript │
│ Complexity      │ Moderate   │
└─────────────────┴────────┘
```

## Learning Points

- **Tool usage**: Uses Read tool to access files
- **Arguments**: Can accept parameters
- **Analysis**: Processes and interprets data
- **Formatting**: Presents results clearly
- **Error handling**: Gracefully handles missing files

## How it works

1. Receives file path as argument
2. Uses Read tool to get file contents
3. Analyzes the content:
   - Counts different line types
   - Detects language from extension/content
   - Estimates complexity from line count and structure
4. Formats results in a table

## Customization Ideas

- Add more metrics (functions, classes, imports)
- Support directory analysis
- Compare multiple files
- Add code quality warnings
- Export results to JSON

## Next Steps

Try modifying the prompt to:
- Detect specific patterns (TODO comments, console.logs)
- Calculate cyclomatic complexity
- Find potential issues
