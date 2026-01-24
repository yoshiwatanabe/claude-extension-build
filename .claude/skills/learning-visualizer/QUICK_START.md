# Learning Visualizer - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Option 1: Generate an Example (Fastest)

```bash
cd .claude/skills/learning-visualizer

# Generate from existing example
node scripts/generate.js examples/learning-path.json output.html

# Open in browser
start output.html  # Windows
open output.html   # macOS
xdg-open output.html  # Linux
```

### Option 2: Create Your Own Diagram

#### Step 1: Write JSON Data

Create `my-diagram.json`:

```json
{
  "type": "hierarchy",
  "title": "My Learning Path",
  "description": "What I want to learn",
  "root": {
    "id": "root",
    "label": "JavaScript",
    "metadata": { "level": "beginner", "status": "in-progress" }
  },
  "nodes": [
    {
      "id": "1",
      "parentId": "root",
      "label": "Variables",
      "description": "Learn var, let, const",
      "metadata": { "status": "complete" }
    },
    {
      "id": "2",
      "parentId": "root",
      "label": "Functions",
      "description": "Function syntax and scope",
      "metadata": { "status": "in-progress" }
    }
  ]
}
```

#### Step 2: Validate

```bash
node scripts/validate.js my-diagram.json
```

Expected output:
```
✓ Valid hierarchy diagram
```

#### Step 3: Generate

```bash
node scripts/generate.js my-diagram.json my-diagram.html
```

#### Step 4: View

Open `my-diagram.html` in browser.

---

## 📋 JSON Quick Reference

### Hierarchy (Parent-Child)

```json
{
  "type": "hierarchy",
  "title": "Title",
  "root": { "id": "1", "label": "Root" },
  "nodes": [
    { "id": "2", "parentId": "1", "label": "Child" }
  ]
}
```

### Flow (Steps & Decisions)

```json
{
  "type": "flow",
  "title": "Title",
  "nodes": [
    { "id": "1", "label": "Start", "nodeType": "start" },
    { "id": "2", "label": "Process", "nodeType": "process" },
    { "id": "3", "label": "Decision", "nodeType": "decision" },
    { "id": "4", "label": "End", "nodeType": "end" }
  ],
  "edges": [
    { "from": "1", "to": "2", "label": "connection" }
  ]
}
```

### Network (Connections)

```json
{
  "type": "network",
  "title": "Title",
  "nodes": [
    { "id": "a", "label": "Node A", "group": "category" }
  ],
  "links": [
    { "source": "a", "target": "b", "type": "relates_to" }
  ]
}
```

### Timeline (Events)

```json
{
  "type": "timeline",
  "title": "Title",
  "events": [
    { "id": "1", "timestamp": "2024-01-15", "label": "Event", "description": "Details" }
  ],
  "milestones": [
    { "id": "m1", "timestamp": "2024-02-01", "label": "Milestone" }
  ]
}
```

### Matrix (Comparisons)

```json
{
  "type": "matrix",
  "title": "Title",
  "rows": [
    { "id": "r1", "label": "Item A" }
  ],
  "columns": [
    { "id": "c1", "label": "Feature 1", "weight": 2 }
  ],
  "cells": [
    { "row": "r1", "col": "c1", "value": "Yes", "score": 5 }
  ]
}
```

---

## 🎨 Status Colors

In metadata:

```json
"metadata": {
  "status": "complete|in-progress|locked|optional",
  "level": "beginner|intermediate|advanced",
  "difficulty": 1  // 1-5 scale
}
```

---

## 📂 Where to Put Files

```
learning-visualizer/
├── examples/           ← Add examples here
├── your-diagrams/      ← Create new folder for your diagrams
│   ├── diagram1.json
│   ├── diagram2.json
│   └── ...
└── output/             ← Generated HTML files
    ├── diagram1.html
    ├── diagram2.html
    └── ...
```

---

## 🔍 Debugging

### JSON Won't Validate?

```bash
node scripts/validate.js your-file.json
```

Check for:
- Missing required fields: `type`, `root`/`nodes`, etc.
- Wrong field names (case-sensitive!)
- Invalid enum values: use exact strings from schema
- Missing node references: all `parentId`, `from`/`to` must exist

### Can't Generate HTML?

```bash
node scripts/generate.js your-file.json output.html

# Or with specific generator
node diagrams/hierarchy/generator.js your-file.json output.html
```

Check for:
- File path is correct
- JSON is valid (validate first!)
- Output directory exists

### HTML Doesn't Look Right?

- Check browser console for JavaScript errors
- Make sure `__DIAGRAM_DATA__` placeholder was replaced
- Try different browser (test in Chrome first)
- Check file is properly saved UTF-8

---

## 🎯 Common Use Cases

### Create a Skill Tree

Use **Hierarchy**:
```json
{ "type": "hierarchy", "root": { ... }, "nodes": [ ... ] }
```

### Show Algorithm Steps

Use **Flow**:
```json
{ "type": "flow", "nodes": [ ... ], "edges": [ ... ] }
```

### Map Tech Stack

Use **Network**:
```json
{ "type": "network", "nodes": [ ... ], "links": [ ... ] }
```

### Show Learning Schedule

Use **Timeline**:
```json
{ "type": "timeline", "events": [ ... ] }
```

### Compare Tools/Languages

Use **Matrix**:
```json
{ "type": "matrix", "rows": [ ... ], "columns": [ ... ], "cells": [ ... ] }
```

---

## 📚 Learn More

- Full schema documentation: `references/json-schemas.md`
- When to use which diagram: `references/diagram-types.md`
- Design guidelines: `references/design-guidelines.md`
- Complete README: `README.md`
- Project summary: `PROJECT_SUMMARY.md`

---

## ✨ Pro Tips

1. **Start Simple**: Create minimal JSON first, add details later
2. **Use Metadata**: Add descriptions for hover tooltips
3. **Group Related Items**: Use `group` field in network diagrams
4. **Color Coding**: Status colors auto-apply based on metadata
5. **Reuse Examples**: Copy & modify existing examples
6. **Test Often**: Validate JSON before generating
7. **Keep Files Organized**: Folder structure matters

---

## 🆘 Need Help?

1. Check the **examples/** folder for your diagram type
2. Compare your JSON structure to the example
3. Validate with: `node scripts/validate.js file.json`
4. Read the schema: `references/json-schemas.md`
5. Review design guidelines: `references/design-guidelines.md`

---

## 🎉 You're Ready!

Pick an example, modify it, and generate your first diagram. Enjoy! 🚀
