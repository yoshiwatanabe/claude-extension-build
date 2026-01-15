# Hello World Skill

The simplest Claude Skill example to get you started.

## What it does

When invoked, this skill:
- Greets you warmly
- Shows current date/time
- Shows your working directory
- Gives a motivational message

## Installation

```bash
cp -r skills/basic/hello-world ~/.config/claude/skills/
```

## Usage

In Claude Code:
```
/hello-world
```

Or have Claude invoke it:
```
Please run the hello-world skill
```

## How it works

1. `prompt.md` contains instructions for Claude
2. When invoked, Claude receives these instructions
3. Claude follows them using available tools
4. Results are shown to you

## Learning Points

- **Minimal structure**: Just needs `prompt.md`
- **Tool usage**: Can use Bash, Read, etc.
- **Clear instructions**: Simple, specific prompt
- **No code needed**: Pure natural language

## Customization

Edit `prompt.md` to change the behavior:
- Add more information to show
- Change the greeting style
- Add emoji (if you want)
- Make it do something useful

## Next Steps

After understanding this skill, try:
- `file-stats`: More complex analysis
- `quick-commit`: Git integration
- Create your own skill from scratch
