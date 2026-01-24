---
name: learning-visualizer
description: Converts structured knowledge into interactive diagrams using 5 core visualization types
trigger: visualize
---

# 📊 Learning Visualizer

Convert structured knowledge into beautiful, interactive diagrams automatically.

## Trigger Keywords

This skill activates when the user says:
- `visualize:` followed by a topic or request
- `diagram:` to create a visual representation
- `map:` to show relationships and structure
- `chart:` to compare or sequence information

---

## Core Concept

The Learning Visualizer uses **5 core diagram types** that cover ~80% of knowledge visualization needs:

1. **Hierarchy Tree** - Taxonomies, file systems, skill levels
2. **Flow Diagram** - Algorithms, workflows, state machines
3. **Network Graph** - Concepts, dependencies, relationships
4. **Timeline** - Events, sequences, learning paths
5. **Matrix** - Comparisons, assessments, feature tables

---

## How to Respond

### Step 1: Analyze the Request
When user provides a topic, identify:
- What is the **structure** of this knowledge?
- What **relationships** exist?
- Is this primarily hierarchical, sequential, interconnected, temporal, or comparative?
- What **visual theme** would best suit the content?

### Step 2: Select Visual Theme
Choose from 4 available themes based on content and user preference:

**Theme Selection Logic:**

1. **User Explicitly Requests a Theme**
   - If user says "using [theme] style" or "in [theme] theme", ALWAYS use that theme
   - Example: "create a timeline of Japanese emperors using wabisabi style" → use wabisabi theme

2. **Content-Based Theme Selection** (when no explicit request):
   - **scifi** - Technology, programming, systems architecture, cyber security, networks, APIs, cloud infrastructure, data pipelines
   - **wabisabi** - Japanese culture, philosophy, history, art, nature, minimalism, zen concepts, traditional topics
   - **classic** - Academic subjects, formal education, business processes, traditional workflows
   - **modern** - DEFAULT for everything else, general topics, contemporary subjects, professional content

3. **Default Theme**
   - When unclear or ambiguous: **use modern** (it's the most versatile)
   - Modern theme is clean, professional, and works for any topic

**Theme Characteristics:**
- `classic` - Original design with soft gradients and traditional styling
- `modern` - Glass morphism, Inter font, clean professional look with dark mode support
- `scifi` - Cyber-grid, neon colors (cyan/magenta/lime), HUD elements, JetBrains Mono, Orbitron fonts
- `wabisabi` - Japanese aesthetics, washi paper texture, muted earth tones, Noto Serif JP font, zen minimalism

### Step 3: Select Diagram Type(s)
Use this decision tree:

```
Does it have a parent-child relationship?
  → YES: Use Hierarchy Tree

Is it a sequence of steps or decisions?
  → YES: Use Flow Diagram

Are there interconnected concepts/dependencies?
  → YES: Use Network Graph

Is it progression over time?
  → YES: Use Timeline

Is it comparing features/options across rows?
  → YES: Use Matrix
```

### Step 4: Generate JSON Data
Consult `references/json-schemas.md` for the exact format required.
Create a valid JSON structure matching the diagram type's schema.
**Important:** Include the `theme` field in your JSON based on your theme selection from Step 2.

### Step 5: Invoke Generator Script
Provide the JSON data to the user and explain:
- What diagram type was chosen and why
- **What visual theme was selected and why**
- What the visualization shows
- How to interact with it (hover, click, filter, etc.)
- Brief explanation of the structure

### Step 6: Output Interactive HTML
The generator script produces a standalone HTML file that includes:
- Embedded visualization
- CSS styling
- JavaScript for interactivity
- No external dependencies required (CDN-loaded libraries)

---

## Example: Bash Command Learning

**User Request:** "visualize: how grep works in a pipeline"

**Analysis:**
- This describes a **sequence of data transformations**
- Also shows **related commands and their relationships**
- Content is about **bash/programming** → select **scifi theme**

**Output:** Two diagrams (both generated from JSON with scifi theme)

1. **Flow Diagram** - Data flow through the pipeline (scifi theme)
2. **Network Diagram** - grep and related text-processing tools (scifi theme)

---

## Response Format

Your response should include:

```
## 📊 Diagram: [Title]

**Type:** [Hierarchy|Flow|Network|Timeline|Matrix]

**Theme:** [classic|modern|scifi|wabisabi]

**Why this theme:** [Brief explanation of theme selection - e.g., "Scifi theme chosen because content is about technical systems architecture" or "User explicitly requested wabisabi style"]

**What it shows:**
[Brief explanation of the visualization]

**How to interact:**
- [Interaction 1]
- [Interaction 2]
- [Interaction 3]

**JSON Data:**
\`\`\`json
[The complete JSON data structure]
\`\`\`

**Key Insights:**
- [Insight 1]
- [Insight 2]
```

---

## Reference Files

- `references/diagram-types.md` - Detailed info on each diagram type
- `references/json-schemas.md` - Exact JSON contracts for each type
- `references/theme-templates.md` - **Visual theme templates and styling patterns for all 4 themes**
- `references/design-guidelines.md` - Styling and animation best practices
- `diagrams/[type]/schema.json` - Individual schema files
- `scripts/generate.js` - Main generator orchestrator
- `examples/` - Example JSON data files

---

## Implementation Notes

- **Generator Scripts**: Each diagram type has a Node.js script that converts JSON → HTML
- **No External APIs**: All visualizations use client-side JavaScript libraries (Vis.js, D3.js, Mermaid.js)
- **Incremental Enhancement**: Start simple, add animations and interactivity iteratively
- **Composable**: One JSON input can generate multiple coordinated diagrams
- **Exportable**: Generated HTML files are portable and shareable
- **Theme System**: All visualizations support customizable themes with color palettes, fonts, and styles

---

## Guidelines

1. **Always validate** the JSON against the schema
2. **Always explain** why you chose that diagram type
3. **Always explain** why you chose that visual theme
4. **Always include metadata** (difficulty, completion status, etc.)
5. **Keep it simple** - start with core data, add complexity iteratively
6. **Use descriptions** - hover tooltips make diagrams educational
7. **Respect user theme requests** - if user says "using X style", ALWAYS use that theme
8. **Default to modern** - when theme is unclear, use modern theme

---

## Theme Selection Examples

**Example 1: Explicit Request**
- User: "create a timeline of 20th century Japanese emperors using wabisabi style"
- Theme: **wabisabi** (user explicitly requested it)
- Type: timeline

**Example 2: Content-Based (Technology)**
- User: "visualize: microservices architecture with API gateway"
- Theme: **scifi** (technical systems architecture)
- Type: network

**Example 3: Content-Based (Japanese Culture)**
- User: "diagram: zen garden design principles"
- Theme: **wabisabi** (Japanese traditional topic)
- Type: hierarchy

**Example 4: Default (Unclear)**
- User: "show me a comparison of different learning methods"
- Theme: **modern** (general topic, use default)
- Type: matrix

**Example 5: Academic**
- User: "create a flowchart for the scientific method"
- Theme: **classic** (formal academic process)
- Type: flow

---

## Theme System (Legacy - for backward compatibility)

All generated diagrams should include a customizable theme system that allows users to personalize the visualization appearance.

### Required Components

**1. CSS Variables (`:root`)**
Define theme properties using CSS custom properties:
```css
:root {
    --primary-color: #667eea;
    --primary-dark: #764ba2;
    --text-primary: #333;
    --text-secondary: #555;
    --text-light: white;
    --bg-main: white;
    --bg-secondary: #fafafa;
    --bg-tertiary: #f5f5f5;
    --bg-accent: #f0f4ff;
    --border-color: #ddd;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --font-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

**2. Theme Definitions**
Provide at least 5 pre-built themes:
- **Default** - Original design
- **Dark Mode** - Dark background, light text
- **Light Mode** - Bright, professional
- **Ocean** - Blue palette
- **Forest** - Green palette
- Additional themes based on diagram context

**3. Theme Selector UI**
Add a dropdown in the controls section:
```html
<div class="theme-selector">
    <label for="themeSelect">🎨 Theme:</label>
    <select id="themeSelect" onchange="applyTheme(this.value)">
        <option value="default">Default</option>
        <option value="dark">Dark Mode</option>
        <!-- more themes -->
    </select>
</div>
```

**4. Theme Switching Logic**
```javascript
const themes = {
    default: {
        primaryColor: '#667eea',
        primaryDark: '#764ba2',
        // ... all theme properties
    },
    dark: { /* dark theme values */ }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    // ... set all properties
    localStorage.setItem('preferredTheme', themeName);
}
```

**5. Persistence**
Save and restore user's theme preference:
```javascript
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('preferredTheme') || 'default';
    document.getElementById('themeSelect').value = savedTheme;
    applyTheme(savedTheme);
});
```

### Theme Properties

Every theme should define:
- **Colors**: Primary, secondary, text (light/dark), backgrounds (main/secondary/tertiary/accent)
- **Borders**: Color, width, radius
- **Typography**: Font family, sizes
- **Effects**: Shadows, transitions
- **Spacing**: Margins, padding (optional, can use defaults)

### Adding Custom Themes

Users can add their own themes by:
1. Adding a new entry to the `themes` object
2. Adding an option to the theme selector
3. All CSS uses variables, so changes apply instantly
