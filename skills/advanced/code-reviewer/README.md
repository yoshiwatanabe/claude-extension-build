# Code Reviewer Skill

Professional code review automation with prioritized feedback.

## What it does

Performs comprehensive code reviews checking:
- Code quality and style
- Potential bugs
- Security vulnerabilities
- Performance issues
- Best practices
- Error handling
- Documentation

## Installation

```bash
cp -r skills/advanced/code-reviewer ~/.config/claude/skills/
```

## Usage

### Review a single file:
```
/code-reviewer src/auth.js
```

### Review a directory:
```
/code-reviewer src/
```

### Let it ask:
```
/code-reviewer
```

## Example Output

```
## Code Review: src/auth.js

### Strengths
- Clear function naming
- Good separation of concerns
- Comprehensive input validation

### Issues Found

#### Critical (P0)
- Line 45: SQL injection vulnerability in login query
  Fix: Use parameterized queries instead of string concatenation

- Line 78: Passwords logged in plaintext
  Fix: Remove password from log statements

#### Important (P1)
- Line 23: No rate limiting on login endpoint
  Suggestion: Add rate limiting to prevent brute force attacks

- Line 91: Error messages reveal user existence
  Fix: Use generic "invalid credentials" message

#### Suggestions (P2)
- Consider adding JSDoc comments for public functions
- Extract magic numbers to named constants
- Add unit tests for edge cases

### Recommendations
1. Fix critical security issues immediately
2. Add rate limiting before deploying
3. Review error handling patterns across codebase
4. Consider security audit for authentication flow
```

## Learning Points

- **Structured analysis**: Systematic code evaluation
- **Prioritization**: Critical vs. nice-to-have issues
- **Security focus**: Checks OWASP top 10
- **Actionable feedback**: Specific fixes, not vague complaints
- **Model selection**: Uses Sonnet for better analysis

## Review Checklist

The skill checks:

**Security:**
- [ ] SQL injection
- [ ] XSS vulnerabilities
- [ ] Authentication issues
- [ ] Authorization flaws
- [ ] Data exposure
- [ ] Insecure dependencies

**Quality:**
- [ ] Error handling
- [ ] Edge cases
- [ ] Code duplication
- [ ] Complexity
- [ ] Naming clarity
- [ ] Documentation

**Performance:**
- [ ] Inefficient algorithms
- [ ] Memory leaks
- [ ] Unnecessary operations
- [ ] Database query optimization

## Customization Ideas

- Add language-specific linters
- Integrate with git diff for PR reviews
- Generate issue tickets automatically
- Track metrics over time
- Custom rule sets per project

## Best Practices

**For reviewers:**
- Be specific and constructive
- Provide context for suggestions
- Distinguish requirements from preferences
- Acknowledge good code

**For reviewees:**
- Don't take it personally
- Ask questions if unclear
- Push back on incorrect feedback
- Learn from patterns

## Integration Examples

### PR Review Workflow:
```bash
# Review changed files in current PR
/code-reviewer $(git diff --name-only main)
```

### Pre-commit Hook:
```bash
# Review staged files before committing
/code-reviewer $(git diff --cached --name-only)
```

## Next Steps

- Try reviewing your own code
- Compare with ESLint/TSLint output
- Customize the review criteria
- Build a PR review skill that combines this with git
