# JSON Schemas for All Diagram Types

## Required Top-Level Fields

All diagram types must include these fields:

```json
{
  "type": "hierarchy|flow|network|timeline|matrix",
  "theme": "classic|modern|scifi|wabisabi",
  "title": "Diagram Title",
  "description": "Brief description of what this diagram shows"
}
```

**Theme Selection:**
- `classic` - Original design, academic/formal content
- `modern` - DEFAULT, clean professional look with dark mode
- `scifi` - Cyber/tech aesthetic with neon colors and HUD elements
- `wabisabi` - Japanese zen aesthetic with earth tones and paper texture

If `theme` is omitted, it defaults to `"modern"`.

---

## Shared Metadata Structure

All diagram types use this optional metadata for styling and behavior:

```json
{
  "metadata": {
    "level": "beginner|intermediate|advanced",
    "status": "complete|in-progress|locked|optional",
    "difficulty": 1-5,
    "importance": "core|supporting|optional",
    "category": "string",
    "color": "#hexcolor"
  }
}
```

---

## 1. Hierarchy Tree Schema

Used for parent-child relationships and classifications.

```json
{
  "type": "hierarchy",
  "theme": "modern",
  "title": "Skill Tree: JavaScript Fundamentals",
  "description": "Learning path for JavaScript basics",
  "root": {
    "id": "1",
    "label": "JavaScript Basics",
    "description": "Foundation of JavaScript",
    "metadata": {
      "level": "beginner",
      "status": "complete",
      "difficulty": 1
    }
  },
  "nodes": [
    {
      "id": "2",
      "parentId": "1",
      "label": "Variables & Types",
      "description": "var, let, const, and primitive types",
      "metadata": {
        "level": "beginner",
        "status": "complete",
        "difficulty": 1
      }
    },
    {
      "id": "3",
      "parentId": "1",
      "label": "Functions",
      "description": "Function declarations, expressions, arrow functions",
      "metadata": {
        "level": "beginner",
        "status": "in-progress",
        "difficulty": 2
      }
    },
    {
      "id": "4",
      "parentId": "3",
      "label": "Async Functions",
      "description": "async/await and promises",
      "metadata": {
        "level": "intermediate",
        "status": "locked",
        "difficulty": 3
      }
    }
  ]
}
```

**Required Fields:**
- `type`: "hierarchy"
- `theme`: "classic"|"modern"|"scifi"|"wabisabi" (optional, defaults to "modern")
- `root`: Root node object (id, label, description, metadata)
- `nodes`: Array of child nodes (id, parentId, label, description, metadata)

**Optional Fields:**
- `title`, `description`

---

## 2. Flow/Process Diagram Schema

Used for algorithms, workflows, and sequential processes.

```json
{
  "type": "flow",
  "theme": "scifi",
  "title": "Text Processing Pipeline",
  "description": "How data flows through grep and pipes",
  "nodes": [
    {
      "id": "1",
      "label": "cat file.txt",
      "nodeType": "start",
      "description": "Read file contents",
      "code": "cat file.txt",
      "metadata": {
        "difficulty": 1
      }
    },
    {
      "id": "2",
      "label": "Filter with grep",
      "nodeType": "process",
      "description": "Search for matching lines",
      "code": "grep 'pattern' file.txt",
      "metadata": {
        "difficulty": 2
      }
    },
    {
      "id": "3",
      "label": "Has matches?",
      "nodeType": "decision",
      "description": "Check if pattern found",
      "metadata": {
        "difficulty": 1
      }
    },
    {
      "id": "4",
      "label": "Sort output",
      "nodeType": "process",
      "description": "Sort matched lines",
      "code": "sort",
      "metadata": {
        "difficulty": 2
      }
    },
    {
      "id": "5",
      "label": "Save to file",
      "nodeType": "end",
      "description": "Write results",
      "code": "> output.txt",
      "metadata": {}
    }
  ],
  "edges": [
    {
      "from": "1",
      "to": "2",
      "label": "stdout → stdin",
      "weight": 1,
      "edgeType": "normal"
    },
    {
      "from": "2",
      "to": "3",
      "label": "matched lines",
      "edgeType": "normal"
    },
    {
      "from": "3",
      "to": "4",
      "label": "yes",
      "edgeType": "conditional"
    },
    {
      "from": "3",
      "to": "5",
      "label": "no",
      "edgeType": "error"
    },
    {
      "from": "4",
      "to": "5",
      "label": "sorted output",
      "edgeType": "normal"
    }
  ]
}
```

**Required Fields:**
- `type`: "flow"
- `nodes`: Array with id, label, nodeType, description, metadata
- `edges`: Array with from, to, label, edgeType

**Node Types:** start, process, decision, end

**Edge Types:** normal, conditional, error

---

## 3. Network/Graph Schema

Used for interconnected concepts and relationships.

```json
{
  "type": "network",
  "theme": "modern",
  "title": "Text Processing Commands",
  "description": "Relationships between grep, awk, sed, and more",
  "nodes": [
    {
      "id": "grep",
      "label": "grep",
      "group": "text-search",
      "size": 15,
      "description": "Search for patterns in text",
      "metadata": {
        "importance": "core",
        "difficulty": 2
      }
    },
    {
      "id": "awk",
      "label": "awk",
      "group": "text-processing",
      "size": 14,
      "description": "Text processing and field manipulation",
      "metadata": {
        "importance": "core",
        "difficulty": 3
      }
    },
    {
      "id": "sed",
      "label": "sed",
      "group": "text-processing",
      "size": 12,
      "description": "Stream editor for text transformation",
      "metadata": {
        "importance": "supporting",
        "difficulty": 3
      }
    },
    {
      "id": "pipe",
      "label": "|",
      "group": "operators",
      "size": 10,
      "description": "Pipe operator for command chaining",
      "metadata": {
        "importance": "core",
        "difficulty": 1
      }
    }
  ],
  "links": [
    {
      "source": "grep",
      "target": "awk",
      "type": "alternative_for",
      "strength": 0.7,
      "bidirectional": false,
      "description": "Can often replace each other"
    },
    {
      "source": "grep",
      "target": "pipe",
      "type": "commonly_used_with",
      "strength": 0.9,
      "bidirectional": true,
      "description": "Grep is typically piped"
    },
    {
      "source": "awk",
      "target": "sed",
      "type": "similar_to",
      "strength": 0.6,
      "bidirectional": true,
      "description": "Both are stream processors"
    }
  ]
}
```

**Required Fields:**
- `type`: "network"
- `nodes`: Array with id, label, group, size, description, metadata
- `links`: Array with source, target, type, strength, bidirectional

**Relationship Types:** depends_on, relates_to, conflicts_with, extends, alternative_for, commonly_used_with, similar_to

---

## 4. Timeline Schema

Used for temporal sequences and milestones.

```json
{
  "type": "timeline",
  "theme": "modern",
  "title": "JavaScript Learning Path",
  "description": "Timeline of learning milestones",
  "events": [
    {
      "id": "1",
      "timestamp": "2024-01-15",
      "label": "Start: Variables & Types",
      "description": "Learn about var, let, const",
      "duration": 7,
      "category": "fundamentals",
      "metadata": {
        "completed": true,
        "difficulty": 1
      }
    },
    {
      "id": "2",
      "timestamp": "2024-01-22",
      "label": "Functions & Scope",
      "description": "Function declarations, closures, scope",
      "duration": 14,
      "category": "fundamentals",
      "metadata": {
        "completed": true,
        "difficulty": 2
      }
    },
    {
      "id": "3",
      "timestamp": "2024-02-05",
      "label": "Objects & Arrays",
      "description": "Object literals, methods, array operations",
      "duration": 14,
      "category": "data-structures",
      "metadata": {
        "completed": false,
        "difficulty": 2
      }
    },
    {
      "id": "4",
      "timestamp": "2024-02-19",
      "label": "Async Programming",
      "description": "Promises, async/await, event loop",
      "duration": 21,
      "category": "advanced",
      "metadata": {
        "completed": false,
        "difficulty": 3
      }
    }
  ],
  "milestones": [
    {
      "id": "m1",
      "timestamp": "2024-01-31",
      "label": "Fundamentals Complete"
    },
    {
      "id": "m2",
      "timestamp": "2024-03-15",
      "label": "Intermediate Level"
    }
  ]
}
```

**Required Fields:**
- `type`: "timeline"
- `events`: Array with id, timestamp, label, description, duration, category, metadata

**Optional Fields:**
- `milestones`: Array with id, timestamp, label

---

## 5. Matrix Schema

Used for comparisons and assessments.

```json
{
  "type": "matrix",
  "theme": "modern",
  "title": "Programming Language Comparison",
  "description": "Feature comparison across languages",
  "rows": [
    {
      "id": "r1",
      "label": "Python",
      "description": "High-level, dynamic language"
    },
    {
      "id": "r2",
      "label": "JavaScript",
      "description": "Web and Node.js runtime"
    },
    {
      "id": "r3",
      "label": "Go",
      "description": "Compiled, concurrent language"
    }
  ],
  "columns": [
    {
      "id": "c1",
      "label": "Ease of Learning",
      "weight": 2,
      "description": "How easy to start"
    },
    {
      "id": "c2",
      "label": "Performance",
      "weight": 1,
      "description": "Execution speed"
    },
    {
      "id": "c3",
      "label": "Web Development",
      "weight": 1,
      "description": "Good for web apps"
    },
    {
      "id": "c4",
      "label": "Backend Systems",
      "weight": 2,
      "description": "Good for servers"
    }
  ],
  "cells": [
    {
      "row": "r1",
      "col": "c1",
      "value": "Excellent",
      "score": 5,
      "description": "Python's readable syntax makes it ideal for beginners",
      "metadata": {}
    },
    {
      "row": "r1",
      "col": "c2",
      "value": "Good",
      "score": 3,
      "description": "Python is slower than compiled languages"
    },
    {
      "row": "r2",
      "col": "c1",
      "value": "Good",
      "score": 4,
      "description": "Manageable for beginners, some async complexity"
    },
    {
      "row": "r2",
      "col": "c3",
      "value": "Excellent",
      "score": 5,
      "description": "Built for the web"
    },
    {
      "row": "r3",
      "col": "c2",
      "value": "Excellent",
      "score": 5,
      "description": "Compiled and optimized for speed"
    },
    {
      "row": "r3",
      "col": "c4",
      "value": "Excellent",
      "score": 5,
      "description": "Perfect for concurrent backend services"
    }
  ]
}
```

**Required Fields:**
- `type`: "matrix"
- `rows`: Array with id, label, description
- `columns`: Array with id, label, weight, description
- `cells`: Array with row, col, value, score, description

---

## Validation Rules

1. All IDs must be unique within the diagram
2. All references (parentId, from/to, row/col, source/target) must exist
3. Numeric fields (score, weight, difficulty) should be 1-5 range
4. Timestamps should be YYYY-MM-DD format
5. Metadata fields are optional but recommended
