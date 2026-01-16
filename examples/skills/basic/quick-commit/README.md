# Quick Commit Skill

Creates well-formatted conventional commits automatically.

## What it does

1. Analyzes your git changes
2. Generates a conventional commit message
3. Asks for confirmation
4. Creates the commit

## Installation

```bash
cp -r skills/basic/quick-commit ~/.config/claude/skills/
```

## Usage

```
/quick-commit
```

## Example Interaction

```
User: /quick-commit

Claude:
I see you've changed:
- src/auth.js: Added login validation
- tests/auth.test.js: Added test coverage

Proposed commit:
feat(auth): add login validation

Added email format validation and password strength
checking to improve security.

Confirm? (yes/no)

User: yes

Claude: Commit created successfully!
```

## Learning Points

- **Git integration**: Uses Bash tool for git commands
- **Analysis**: Interprets diffs to understand changes
- **User interaction**: Asks for confirmation via AskUserQuestion
- **Format compliance**: Follows conventional commits spec
- **Permissions**: Uses allowedPrompts for git commands

## Conventional Commits Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

## Customization Ideas

- Add emoji to commit messages
- Support semantic versioning tags
- Auto-generate changelogs
- Check commit message length
- Validate branch naming

## Advanced Usage

Combine with other skills:
```
Run code-reviewer skill, then quick-commit
```

## Why Conventional Commits?

- **Consistency**: Standard format across team
- **Automation**: Enables automatic changelog generation
- **Clarity**: Clear commit history
- **Tooling**: Works with semantic versioning tools

## Next Steps

- Try modifying the commit format
- Add custom commit types for your project
- Integrate with PR creation workflow
