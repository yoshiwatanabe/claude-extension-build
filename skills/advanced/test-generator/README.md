# Test Generator Skill

Automatically generates comprehensive unit tests for your code.

## What it does

- Analyzes source code
- Identifies functions/methods to test
- Detects testing framework
- Generates complete test files
- Includes edge cases and error scenarios
- Follows testing best practices

## Installation

```bash
cp -r skills/advanced/test-generator ~/.config/claude/skills/
```

## Usage

### Generate tests for a file:
```
/test-generator src/calculator.js
```

### Let it ask:
```
/test-generator
```

## Example

**Source file (calculator.js):**
```javascript
export function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  return a + b;
}

export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}
```

**Generated test (calculator.test.js):**
```javascript
import { add, divide } from './calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });

    it('should throw error for non-number arguments', () => {
      expect(() => add('2', 3)).toThrow('Arguments must be numbers');
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should handle division resulting in decimals', () => {
      expect(divide(5, 2)).toBe(2.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});
```

## Learning Points

- **Code analysis**: Understands code structure and behavior
- **Framework detection**: Adapts to your testing setup
- **Best practices**: Follows AAA pattern and testing conventions
- **Edge cases**: Doesn't just test happy paths
- **File creation**: Uses Write tool to create test files

## Testing Patterns

### AAA Pattern (Arrange-Act-Assert)
```javascript
it('should do something', () => {
  // Arrange: Set up test data
  const input = { id: 1, name: 'Test' };

  // Act: Execute the function
  const result = processData(input);

  // Assert: Verify the result
  expect(result.success).toBe(true);
});
```

### Mocking Dependencies
```javascript
it('should call external API', async () => {
  // Mock the fetch function
  const mockFetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ data: 'test' })
  });
  global.fetch = mockFetch;

  await fetchData('endpoint');

  expect(mockFetch).toHaveBeenCalledWith('endpoint');
});
```

## Supported Frameworks

- **JavaScript**: Jest, Mocha, Vitest, Jasmine
- **Python**: pytest, unittest
- **Go**: testing package
- **TypeScript**: Same as JavaScript with types

## Customization Ideas

- Add integration test generation
- Generate test data factories
- Create snapshot tests
- Add performance benchmarks
- Generate property-based tests

## Best Practices

**Good tests are:**
- **Fast**: Run quickly
- **Independent**: Don't depend on other tests
- **Repeatable**: Same result every time
- **Self-validating**: Clear pass/fail
- **Timely**: Written with/before code

**Test coverage:**
- Happy path (normal usage)
- Edge cases (boundaries, empty, null)
- Error cases (invalid input, failures)
- Integration points (external dependencies)

## Integration Examples

### TDD Workflow:
```
1. /test-generator src/feature.js
2. Run tests (they fail)
3. Implement feature
4. Tests pass
```

### CI/CD Integration:
```bash
# Generate tests for new files
/test-generator $(git diff --name-only --diff-filter=A)
```

## Next Steps

- Generate tests for your most complex module
- Compare generated tests to hand-written ones
- Customize for your project's testing patterns
- Add to your development workflow
