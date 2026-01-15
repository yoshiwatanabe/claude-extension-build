# Claude Skills Examples

This directory contains working examples of Claude Skills you can use and learn from.

## What is a Claude Skill?

A Claude Skill is a custom capability you add to Claude Code. It's defined by:

1. **A directory** in `~/.config/claude/skills/` with your skill name
2. **A prompt.md file** containing instructions for Claude
3. **Optional metadata** in `skill.json` for configuration

## Skill Structure

```
~/.config/claude/skills/my-skill/
├── prompt.md        # Instructions for Claude (required)
├── skill.json       # Metadata and configuration (optional)
└── README.md        # Documentation (recommended)
```

## How Skills Work

When you invoke a skill:
1. User runs `/my-skill` or Claude invokes it via the Skill tool
2. Claude Code loads `prompt.md` and adds it to the conversation
3. Claude follows the instructions in prompt.md
4. Claude can use any available tools (Bash, Read, Edit, etc.)

## Installing These Examples

To use any example skill:

```bash
# 1. Copy the skill directory to your skills folder
cp -r skills/basic/hello-world ~/.config/claude/skills/

# 2. Use it in Claude Code
# In Claude Code, type: /hello-world
```

## Example Skills

### Basic Skills

- **hello-world**: Simplest possible skill, prints a greeting
- **file-stats**: Analyzes files and shows statistics
- **quick-commit**: Creates git commits with conventional commit format

### Advanced Skills

- **code-reviewer**: Performs automated code reviews
- **test-generator**: Generates unit tests for code

## Creating Your Own Skill

1. Create a directory in `~/.config/claude/skills/my-skill/`
2. Write `prompt.md` with clear instructions:

```markdown
You are a skill that helps users do X.

When invoked:
1. Do step 1
2. Do step 2
3. Return result

Important notes:
- Be specific about what to do
- Use available tools effectively
- Handle errors gracefully
```

3. Test it: `/my-skill`

## Best Practices

### Writing Good Prompts

- Be specific and clear
- Include examples if helpful
- Specify what tools to use
- Handle edge cases
- Define success criteria

### Skill Design

- Single responsibility: One skill, one job
- Composable: Skills should work together
- Documented: Include README and examples
- Tested: Verify behavior before publishing

## Skill Configuration (skill.json)

Optional metadata for your skill:

```json
{
  "name": "my-skill",
  "description": "What this skill does",
  "version": "1.0.0",
  "author": "Your Name",
  "model": "haiku",
  "allowedPrompts": [
    {
      "tool": "Bash",
      "prompt": "run tests"
    }
  ]
}
```

## Common Patterns

### Pattern 1: Analysis Skills
Read files → Analyze content → Report findings

### Pattern 2: Generator Skills
Get requirements → Generate code → Write files

### Pattern 3: Workflow Skills
Multiple steps → User confirmation → Execute

### Pattern 4: Integration Skills
Call external APIs → Process data → Update local files

## Debugging Skills

If a skill isn't working:
1. Check file location: `~/.config/claude/skills/skill-name/`
2. Verify `prompt.md` exists and has content
3. Check permissions: Files must be readable
4. Test with simple prompt first
5. Check Claude Code logs for errors

## Learn More

- [Claude Code Skills Documentation](https://github.com/anthropics/claude-code)
- [Agent SDK for advanced patterns](https://github.com/anthropics/claude-agent-sdk)
