# Theme Usage Examples

This file contains example JSON structures for each theme to demonstrate proper usage.

## Example 1: Scifi Theme - System Architecture

```json
{
  "type": "network",
  "theme": "scifi",
  "title": "Microservices Architecture",
  "description": "Backend system topology with API gateway and service mesh",
  "nodes": [
    {
      "id": "gateway",
      "label": "API Gateway",
      "group": "core",
      "size": 20,
      "description": "Routes requests to backend services",
      "metadata": {
        "status": "complete",
        "importance": "core",
        "color": "#ff00ff"
      }
    },
    {
      "id": "auth",
      "label": "Auth Service",
      "group": "services",
      "size": 15,
      "description": "Handles authentication and authorization",
      "metadata": {
        "status": "complete",
        "importance": "core",
        "color": "#00f2ff"
      }
    },
    {
      "id": "user",
      "label": "User Service",
      "group": "services",
      "size": 15,
      "description": "Manages user data and profiles",
      "metadata": {
        "status": "in-progress",
        "importance": "core",
        "color": "#00f2ff"
      }
    },
    {
      "id": "cache",
      "label": "Redis Cache",
      "group": "data",
      "size": 12,
      "description": "In-memory caching layer",
      "metadata": {
        "status": "complete",
        "importance": "supporting",
        "color": "#39ff14"
      }
    }
  ],
  "edges": [
    {
      "from": "gateway",
      "to": "auth",
      "label": "authenticates",
      "type": "solid"
    },
    {
      "from": "gateway",
      "to": "user",
      "label": "routes",
      "type": "solid"
    },
    {
      "from": "auth",
      "to": "cache",
      "label": "caches tokens",
      "type": "dashed"
    },
    {
      "from": "user",
      "to": "cache",
      "label": "caches profiles",
      "type": "dashed"
    }
  ]
}
```

**Why scifi theme?** Technical systems architecture with networking components - perfect for cyber aesthetic.

---

## Example 2: Wabisabi Theme - Japanese History

```json
{
  "type": "timeline",
  "theme": "wabisabi",
  "title": "日本の元号: 20世紀の天皇",
  "description": "Timeline of Japanese emperors in the 20th century",
  "events": [
    {
      "id": "1",
      "date": "1912-07-30",
      "title": "明治時代終焉",
      "description": "Emperor Meiji passes, ending the Meiji era",
      "era": "Meiji",
      "metadata": {
        "importance": "core",
        "category": "era-change"
      }
    },
    {
      "id": "2",
      "date": "1912-07-30",
      "title": "大正時代開始",
      "description": "Emperor Taishō ascends, beginning the Taishō era",
      "era": "Taishō",
      "metadata": {
        "importance": "core",
        "category": "era-change"
      }
    },
    {
      "id": "3",
      "date": "1926-12-25",
      "title": "昭和時代開始",
      "description": "Emperor Shōwa (Hirohito) ascends, beginning the Shōwa era",
      "era": "Shōwa",
      "metadata": {
        "importance": "core",
        "category": "era-change"
      }
    },
    {
      "id": "4",
      "date": "1945-08-15",
      "title": "終戦",
      "description": "End of World War II, marking a major transition in Shōwa era",
      "era": "Shōwa",
      "metadata": {
        "importance": "core",
        "category": "historical-event"
      }
    },
    {
      "id": "5",
      "date": "1989-01-07",
      "title": "平成時代開始",
      "description": "Emperor Akihito ascends, beginning the Heisei era",
      "era": "Heisei",
      "metadata": {
        "importance": "core",
        "category": "era-change"
      }
    }
  ]
}
```

**Why wabisabi theme?** Japanese history and traditional era names - perfect for zen minimalist aesthetic with Japanese typography.

---

## Example 3: Modern Theme - Learning Resources Comparison

```json
{
  "type": "matrix",
  "theme": "modern",
  "title": "Online Learning Platforms Comparison",
  "description": "Feature comparison of popular educational platforms",
  "rows": [
    {
      "id": "coursera",
      "label": "Coursera",
      "description": "University-backed courses and degrees"
    },
    {
      "id": "udemy",
      "label": "Udemy",
      "description": "Marketplace for instructor-created courses"
    },
    {
      "id": "pluralsight",
      "label": "Pluralsight",
      "description": "Tech skills platform for developers"
    },
    {
      "id": "linkedin",
      "label": "LinkedIn Learning",
      "description": "Professional development and business skills"
    }
  ],
  "columns": [
    {
      "id": "price",
      "label": "Price",
      "description": "Cost model and pricing"
    },
    {
      "id": "content",
      "label": "Content Quality",
      "description": "Quality and depth of courses"
    },
    {
      "id": "cert",
      "label": "Certification",
      "description": "Recognized certificates or degrees"
    },
    {
      "id": "interactive",
      "label": "Interactive",
      "description": "Hands-on labs and projects"
    }
  ],
  "cells": [
    {
      "rowId": "coursera",
      "columnId": "price",
      "value": "$$-$$$",
      "rating": 3,
      "description": "Subscription or per-course, can be expensive"
    },
    {
      "rowId": "coursera",
      "columnId": "content",
      "value": "Excellent",
      "rating": 5,
      "description": "University-level content from top institutions"
    },
    {
      "rowId": "udemy",
      "columnId": "price",
      "value": "$-$$",
      "rating": 5,
      "description": "Very affordable with frequent sales"
    },
    {
      "rowId": "udemy",
      "columnId": "content",
      "value": "Variable",
      "rating": 3,
      "description": "Quality varies by instructor"
    },
    {
      "rowId": "pluralsight",
      "columnId": "interactive",
      "value": "Excellent",
      "rating": 5,
      "description": "Hands-on labs and skill assessments"
    },
    {
      "rowId": "linkedin",
      "columnId": "cert",
      "value": "Good",
      "rating": 4,
      "description": "Certificates displayed on LinkedIn profile"
    }
  ]
}
```

**Why modern theme?** General educational comparison - clean professional look works best, and it's the default.

---

## Example 4: Classic Theme - Scientific Method

```json
{
  "type": "flow",
  "theme": "classic",
  "title": "The Scientific Method",
  "description": "Step-by-step process for scientific inquiry",
  "nodes": [
    {
      "id": "1",
      "label": "Observation",
      "nodeType": "start",
      "description": "Make an observation about the natural world",
      "metadata": {
        "level": "beginner",
        "difficulty": 1
      }
    },
    {
      "id": "2",
      "label": "Question",
      "nodeType": "process",
      "description": "Formulate a question based on the observation",
      "metadata": {
        "level": "beginner",
        "difficulty": 1
      }
    },
    {
      "id": "3",
      "label": "Hypothesis",
      "nodeType": "process",
      "description": "Develop a testable hypothesis",
      "metadata": {
        "level": "intermediate",
        "difficulty": 2
      }
    },
    {
      "id": "4",
      "label": "Experiment",
      "nodeType": "process",
      "description": "Design and conduct experiment to test hypothesis",
      "metadata": {
        "level": "intermediate",
        "difficulty": 3
      }
    },
    {
      "id": "5",
      "label": "Analyze Data",
      "nodeType": "process",
      "description": "Collect and analyze experimental results",
      "metadata": {
        "level": "intermediate",
        "difficulty": 3
      }
    },
    {
      "id": "6",
      "label": "Hypothesis Supported?",
      "nodeType": "decision",
      "description": "Determine if data supports the hypothesis",
      "metadata": {
        "level": "intermediate",
        "difficulty": 2
      }
    },
    {
      "id": "7",
      "label": "Draw Conclusions",
      "nodeType": "process",
      "description": "Formulate conclusions based on results",
      "metadata": {
        "level": "advanced",
        "difficulty": 3
      }
    },
    {
      "id": "8",
      "label": "Report Findings",
      "nodeType": "end",
      "description": "Share results with scientific community",
      "metadata": {
        "level": "advanced",
        "difficulty": 2
      }
    },
    {
      "id": "9",
      "label": "Revise Hypothesis",
      "nodeType": "process",
      "description": "Modify hypothesis based on findings",
      "metadata": {
        "level": "intermediate",
        "difficulty": 2
      }
    }
  ],
  "edges": [
    {
      "from": "1",
      "to": "2",
      "label": "leads to"
    },
    {
      "from": "2",
      "to": "3",
      "label": "formulate"
    },
    {
      "from": "3",
      "to": "4",
      "label": "test with"
    },
    {
      "from": "4",
      "to": "5",
      "label": "produces"
    },
    {
      "from": "5",
      "to": "6",
      "label": "evaluate"
    },
    {
      "from": "6",
      "to": "7",
      "label": "yes"
    },
    {
      "from": "6",
      "to": "9",
      "label": "no"
    },
    {
      "from": "9",
      "to": "4",
      "label": "retest"
    },
    {
      "from": "7",
      "to": "8",
      "label": "publish"
    }
  ]
}
```

**Why classic theme?** Formal academic process taught in traditional education - classic theme provides the appropriate scholarly aesthetic.

---

## Example 5: Scifi Theme - Programming Language Evolution

```json
{
  "type": "hierarchy",
  "theme": "scifi",
  "title": "Programming Language Family Tree",
  "description": "Evolution and relationships of major programming languages",
  "root": {
    "id": "1",
    "label": "Assembly & Machine Code",
    "description": "Low-level programming foundation",
    "metadata": {
      "level": "beginner",
      "status": "complete",
      "difficulty": 5
    }
  },
  "nodes": [
    {
      "id": "2",
      "parentId": "1",
      "label": "C (1972)",
      "description": "Systems programming language that influenced most modern languages",
      "metadata": {
        "level": "intermediate",
        "status": "complete",
        "difficulty": 4
      }
    },
    {
      "id": "3",
      "parentId": "2",
      "label": "C++ (1985)",
      "description": "Object-oriented extension of C",
      "metadata": {
        "level": "intermediate",
        "status": "complete",
        "difficulty": 4
      }
    },
    {
      "id": "4",
      "parentId": "2",
      "label": "Objective-C (1984)",
      "description": "Apple's iOS/macOS language before Swift",
      "metadata": {
        "level": "intermediate",
        "status": "complete",
        "difficulty": 3
      }
    },
    {
      "id": "5",
      "parentId": "3",
      "label": "Java (1995)",
      "description": "Write once, run anywhere - enterprise standard",
      "metadata": {
        "level": "intermediate",
        "status": "complete",
        "difficulty": 3
      }
    },
    {
      "id": "6",
      "parentId": "5",
      "label": "Kotlin (2011)",
      "description": "Modern alternative to Java, Android's preferred language",
      "metadata": {
        "level": "intermediate",
        "status": "in-progress",
        "difficulty": 2
      }
    },
    {
      "id": "7",
      "parentId": "2",
      "label": "JavaScript (1995)",
      "description": "Web's scripting language",
      "metadata": {
        "level": "beginner",
        "status": "complete",
        "difficulty": 2
      }
    },
    {
      "id": "8",
      "parentId": "7",
      "label": "TypeScript (2012)",
      "description": "Typed superset of JavaScript",
      "metadata": {
        "level": "intermediate",
        "status": "complete",
        "difficulty": 3
      }
    }
  ]
}
```

**Why scifi theme?** Programming languages and technical evolution - cyber aesthetic fits the computational nature of the topic.

---

## Theme Selection Decision Tree

```
Does user explicitly request a theme?
  → YES: Use that theme (e.g., "using wabisabi style")
  → NO: Continue to content analysis

What is the content topic?
  → Technology/Programming/Systems → scifi
  → Japanese/Zen/Traditional → wabisabi
  → Academic/Formal/Scientific → classic
  → General/Contemporary/Professional → modern (DEFAULT)
  → Unclear → modern (DEFAULT)
```
