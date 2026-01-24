# Learning Visualizer - Claude Skill

A well-structured Claude Skill that converts structured knowledge into beautiful, interactive diagrams. Supports 5 core diagram types with clean JSON contracts, modular templates, and Node.js generators.

## 📁 Project Structure

```
learning-visualizer/
├── SKILL.md                           # Main skill definition
├── references/
│   ├── diagram-types.md              # Detailed documentation for each diagram type
│   ├── json-schemas.md               # Complete JSON contracts
│   └── design-guidelines.md          # Color schemes, typography, animations
├── diagrams/
│   ├── hierarchy/                    # Hierarchy Tree (parent-child relationships)
│   │   ├── schema.json               # JSON schema validation
│   │   ├── template.html             # HTML visualization template
│   │   └── generator.js              # Node.js generator script
│   ├── flow/                         # Flow Diagram (sequences, algorithms)
│   │   ├── schema.json
│   │   ├── template.html
│   │   └── generator.js
│   ├── network/                      # Network Graph (interconnected concepts)
│   │   ├── schema.json
│   │   ├── template.html
│   │   └── generator.js
│   ├── timeline/                     # Timeline (temporal sequences)
│   │   ├── schema.json
│   │   ├── template.html
│   │   └── generator.js
│   └── matrix/                       # Matrix (feature comparisons)
│       ├── schema.json
│       ├── template.html
│       └── generator.js
├── scripts/
│   ├── generate.js                   # Main orchestrator (detects type, routes to generator)
│   └── validate.js                   # JSON validator against schemas
├── assets/
│   ├── styles.css                    # Shared CSS utilities
│   └── libs.json                     # CDN library references
└── examples/
    ├── bash-pipes.json               # Flow diagram example
    ├── learning-path.json            # Hierarchy example
    ├── language-comparison.json      # Matrix example
    ├── text-tools.json               # Network example
    └── bash-roadmap.json             # Timeline example
```

## 🎯 5 Core Diagram Types

### 1. **Hierarchy Tree** 🌳
**Use for:** Parent-child relationships, taxonomies, prerequisites, skill trees

- File system structures
- Organizational charts
- Learning prerequisite chains
- Decision trees

**Example:** [learning-path.json](examples/learning-path.json)

### 2. **Flow Diagram** ⚡
**Use for:** Sequential processes, algorithms, workflows

- Algorithm flowcharts
- Data transformation pipelines
- Conditional logic paths
- System workflows

**Example:** [bash-pipes.json](examples/bash-pipes.json)

### 3. **Network Graph** 🌐
**Use for:** Interconnected concepts, dependencies, relationships

- Technology dependencies
- Concept maps
- Command relationships
- Knowledge networks

**Example:** [text-tools.json](examples/text-tools.json)

### 4. **Timeline** 📅
**Use for:** Temporal progression, milestones, learning roadmaps

- Project phases
- Learning schedules
- Historical progression
- Career paths

**Example:** [bash-roadmap.json](examples/bash-roadmap.json)

### 5. **Matrix** 📊
**Use for:** Feature comparisons, assessments, decision matrices

- Language feature comparison
- Skill assessments
- Pricing tier comparison
- SWOT analysis

**Example:** [language-comparison.json](examples/language-comparison.json)

## 🚀 Quick Start

### Generate a Diagram from JSON

```bash
# Using main orchestrator (auto-detects type)
node scripts/generate.js examples/learning-path.json output.html

# Or use specific generator
node diagrams/hierarchy/generator.js examples/learning-path.json output.html
```

### Validate JSON Against Schema

```bash
node scripts/validate.js examples/learning-path.json
```

## 📋 Each Diagram Unit Contains

### `schema.json`
- JSON Schema for validation
- Defines required fields, types, enums
- Ensures data quality before rendering

### `template.html`
- Standalone HTML visualization
- Embedded CSS and JavaScript
- No external file dependencies
- Uses `__DIAGRAM_DATA__` placeholder for JSON injection
- CDN-loaded libraries (D3.js, Vis.js, Mermaid.js)

### `generator.js`
- Node.js script that converts JSON → HTML
- Reads template
- Injects JSON data
- Writes output or returns HTML string
- CLI support with error handling

## 🎨 Design System

### Color Scheme
```json
{
  "primary": "#2E86AB",      // Blue - Core concepts
  "secondary": "#A23B72",    // Purple - Secondary
  "accent": "#F18F01",       // Orange - Highlights
  "success": "#06A77D",      // Green - Complete
  "warning": "#F4B860",      // Yellow - In Progress
  "danger": "#C94C4C",       // Red - Locked/Error
  "info": "#4ECDC4"         // Teal - Info
}
```

### Animations (Phase 1: Simple)
- Fade in on load (0.3s)
- Hover effects (0.2s color transition)
- Click interactions (instant, with 0.3s feedback)

### Future Phases
- Phase 2: Slide/expand animations
- Phase 3: Physics-based interactions, timeline scrubbing

## 📝 Creating a New Diagram

### Step 1: Prepare JSON Data
```json
{
  "type": "hierarchy",
  "title": "Your Diagram Title",
  "description": "Brief description",
  "root": { /* ... */ },
  "nodes": [ /* ... */ ]
}
```

Refer to `references/json-schemas.md` for exact format.

### Step 2: Validate
```bash
node scripts/validate.js your-diagram.json
```

### Step 3: Generate
```bash
node scripts/generate.js your-diagram.json output.html
```

### Step 4: View
Open `output.html` in a browser.

## 🔧 Development Notes

### Adding a New Diagram Type (Future)

1. Create `diagrams/newtype/` directory
2. Add `schema.json` with validation rules
3. Create `template.html` with `__DIAGRAM_DATA__` placeholder
4. Create `generator.js` following the pattern
5. Add to `scripts/generate.js` orchestrator
6. Add example to `examples/`

### Updating Templates

- Keep `__DIAGRAM_DATA__` placeholder intact
- Use CDN libraries (no local dependencies)
- Include responsive design
- Add hover tooltips for accessibility

### Expanding Animations

- Edit templates for animation classes
- Use CSS transitions (0.2s-0.6s range)
- Add easing functions for natural feel
- Test on slow devices

## 📚 Reference Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill definition, triggers, response format |
| `references/diagram-types.md` | When to use each diagram type, examples |
| `references/json-schemas.md` | Complete JSON contracts for all types |
| `references/design-guidelines.md` | Color system, typography, animations, best practices |
| `assets/libs.json` | CDN library versions and references |

## ✅ Testing Examples

All examples are validated and can be rendered:

```bash
# Validate all examples
for f in examples/*.json; do node scripts/validate.js "$f"; done

# Generate all examples
for f in examples/*.json; do node scripts/generate.js "$f" "${f%.json}.html"; done
```

## 🎓 Use Cases

### For Learning

- **Skill Trees**: Hierarchy diagram showing prerequisites
- **Learning Roadmaps**: Timeline showing progression
- **Concept Maps**: Network showing relationships
- **Feature Comparisons**: Matrix for choosing tools

### For Teams

- **Process Flows**: Flow diagrams for workflows
- **Architecture**: Network for system relationships
- **Timelines**: Project phases and milestones
- **Assessments**: Matrix for skill evaluation

### For Documentation

- **Taxonomies**: Hierarchy of categories
- **Comparisons**: Feature matrices
- **Relationships**: Network graphs of components
- **Schedules**: Timeline of releases

## 🚀 Next Steps

1. **Integrate with Claude**: Add skill to Claude Code workspace
2. **Test Examples**: Generate and review all example diagrams
3. **Expand Animations**: Add Phase 2 transition effects
4. **Add Export**: PDF/PNG export capability
5. **Interactivity**: Step-through, filtering, zooming
6. **Mobile**: Responsive design improvements

## 📄 License

Part of the Claude Skills ecosystem.
