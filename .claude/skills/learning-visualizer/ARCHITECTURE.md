# Architecture Diagram - Text Representation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLAUDE SKILL INTERFACE                       │
│  (User asks: "visualize: how grep works")                       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SKILL.md LOGIC                             │
│  1. Analyze request → identify structure type                   │
│  2. Select appropriate diagram type                             │
│  3. Construct JSON from knowledge                               │
│  4. Route to generator                                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│              scripts/generate.js (Orchestrator)                 │
│  - Detects diagram type from JSON                               │
│  - Routes to appropriate generator                              │
│  - Handles errors gracefully                                    │
└──┬──────────┬──────────┬──────────┬──────────┬──────────────────┘
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Hier │ │ Flow │ │ Net  │ │ Time │ │Matrix│
│ arch │ │      │ │work  │ │line  │ │      │
└──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘
   │        │        │        │        │
   │ Each generator does:     │        │
   │ 1. Read template.html    │        │
   │ 2. Replace __DIAGRAM_DATA__      │
   │ 3. Write output.html     │        │
   │                          │        │
   ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
┌─────────────────────────────────────────────────────────────────┐
│         OUTPUT: Interactive HTML Visualization                  │
│  - Single file (no dependencies)                                │
│  - Embedded CSS and JavaScript                                  │
│  - CDN-loaded visualization libraries                           │
│  - Works offline (after first load)                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

```
User Request
    │
    ├─→ [Analyze]
    │      ↓
    │   [Detect Type]
    │      ↓
    │   [Create JSON]
    │      ↓
    └─→ [JSON DATA]
           │
           ▼
    ┌──────────────────┐
    │ Validation       │  (Optional)
    │ (validate.js)    │  Check against schema
    └──────────────────┘
           │
           ▼
    ┌──────────────────────────────────────────┐
    │ Generation (generate.js)                 │
    │                                          │
    │ 1. Detect diagram.type from JSON        │
    │ 2. Load correct generator               │
    │ 3. Pass to generator                    │
    └────────┬─────────────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────────────┐
    │ Type-Specific Generator                 │
    │ (e.g., diagrams/hierarchy/generator.js) │
    │                                          │
    │ 1. Read template.html                   │
    │ 2. JSON stringify data                  │
    │ 3. Replace __DIAGRAM_DATA__             │
    │ 4. Write to file or return HTML         │
    └────────┬─────────────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────────────┐
    │ Template (e.g., hierarchy/template.html) │
    │                                          │
    │ HTML Structure:                          │
    │ - Header with title                      │
    │ - SVG/Canvas container                  │
    │ - const diagramData = __DIAGRAM_DATA__   │
    │ - JavaScript rendering code             │
    │ - CSS styling                           │
    │ - Legend and controls                   │
    └────────┬─────────────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────────────┐
    │ OUTPUT HTML FILE                        │
    │                                          │
    │ Structure:                               │
    │ ├─ HTML head                             │
    │ │  ├─ CDN script tags                    │
    │ │  └─ CSS styles                        │
    │ ├─ HTML body                             │
    │ │  ├─ Header                             │
    │ │  ├─ SVG/Canvas with id="diagram"      │
    │ │  └─ Tooltip div                       │
    │ └─ Script tag                            │
    │    ├─ const diagramData = {...}          │
    │    └─ Rendering logic                   │
    │                                          │
    │ Open in browser → Interactive viz       │
    └──────────────────────────────────────────┘
```

---

## 🗂️ Module Relationships

```
                    ┌─────────────────┐
                    │   SKILL.md      │
                    │  (User facing)  │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │ scripts/generate.js      │
              │ (Orchestrator)           │
              └──────────┬───────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    ┌───────────┐  ┌──────────┐  ┌─────────────┐
    │ Hierarchy │  │   Flow   │  │  Network    │
    │ Generator │  │Generator │  │ Generator   │
    └──┬────────┘  └──┬───────┘  └──┬──────────┘
       │               │              │
       ▼               ▼              ▼
    ┌───────────┐  ┌──────────┐  ┌─────────────┐
    │ Hierarchy │  │ Flow     │  │ Network     │
    │ Template  │  │ Template │  │ Template    │
    └───────────┘  └──────────┘  └─────────────┘
       │               │              │
       └───────────────┼──────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │ HTML Output Files    │
            │ (Browser ready)      │
            └──────────────────────┘

    schemas/ ──→ Validation (optional)
    assets/  ──→ Shared styling
    libs.json → CDN references
```

---

## 🔄 Generator Pattern (Repeated 5x)

Each diagram type follows same pattern:

```
diagrams/TYPE/
├── schema.json
│   └─ Defines JSON structure
│      ├─ Required fields
│      ├─ Field types
│      ├─ Enum values
│      └─ Validation rules
│
├── template.html
│   └─ Interactive visualization
│      ├─ <head>: CDN scripts, CSS
│      ├─ <body>: Containers, legend
│      ├─ <script>: 
│      │   ├─ const diagramData = __DIAGRAM_DATA__
│      │   ├─ Rendering logic (D3/Vis/SVG)
│      │   └─ Interaction handlers
│      └─ Styled with colors from design-guidelines.md
│
└── generator.js
    └─ Node.js converter
       ├─ Read template.html
       ├─ Validate input JSON
       ├─ Stringify JSON
       ├─ Replace __DIAGRAM_DATA__ token
       ├─ Write output.html (or return string)
       └─ Error handling & CLI support
```

---

## 🎯 Type Selection Logic

```
User Input Analysis
    │
    ├─ Has parent-child relationships?  ──→ HIERARCHY
    │
    ├─ Is it sequential steps/decisions? ──→ FLOW
    │
    ├─ Are things interconnected?  ──→ NETWORK
    │
    ├─ Is it temporal progression?  ──→ TIMELINE
    │
    ├─ Is it comparing options?  ──→ MATRIX
    │
    └─ Multiple aspects?  ──→ COMBINE (multiple diagrams)
```

---

## 📦 File Size Analysis

```
Total Project: ~42 files

Large files:
├─ hierarchy/template.html  (~500 lines, 15KB)  - D3.js based
├─ flow/template.html       (~300 lines, 10KB)  - SVG based
├─ network/template.html    (~150 lines, 8KB)   - Vis.js based
├─ timeline/template.html   (~180 lines, 7KB)   - Custom CSS
└─ matrix/template.html     (~150 lines, 8KB)   - HTML table

Output file size examples:
├─ Hierarchy with 10 nodes  ~50KB (includes D3.js CDN)
├─ Flow with 5 steps         ~40KB
├─ Network with 8 nodes      ~45KB (includes Vis.js CDN)
├─ Timeline with 6 events    ~35KB
└─ Matrix 5x5               ~30KB

(CDN libraries are loaded from CDN, not included in HTML)
```

---

## 🔐 Validation Pipeline

```
JSON Input
    │
    ├─→ Validation (optional)
    │   └─ scripts/validate.js
    │      ├─ Read schema
    │      ├─ Check required fields
    │      ├─ Validate types
    │      └─ Report errors
    │
    └─→ Generation
        ├─ Type detection
        ├─ Generator selection
        ├─ Data serialization
        ├─ Template rendering
        └─ Output creation
            
Success indicators:
✓ JSON matches schema
✓ All references exist
✓ No console errors
✓ HTML renders
✓ Interactions work
```

---

## 🌐 Browser Compatibility

```
Modern Browsers (2023+):
├─ Chrome/Chromium  ✓ Full support
├─ Firefox          ✓ Full support
├─ Safari           ✓ Full support
├─ Edge             ✓ Full support
└─ Mobile browsers  ✓ Responsive

Requirements:
├─ ES6+ JavaScript
├─ CSS Flexbox/Grid
├─ SVG support
└─ CDN access (for library loading)

Fallbacks:
├─ No JS? → Table layout visible
├─ Old browser? → Basic HTML
├─ No CDN? → Degrades gracefully
```

---

## 🚀 Deployment Architecture

```
Development
    ↓
    └─ Generate HTML from JSON
       └─ Output single .html file

Distribution
    ├─ Embed in web page
    ├─ Email to stakeholder
    ├─ Share as HTML file
    ├─ Host on any static server
    └─ No backend needed

Scaling
    ├─ Generate 10s of diagrams: No problem
    ├─ Generate 100s: Still fine (Node.js)
    ├─ Generate 1000s: Batch scripts
    └─ Real-time generation: Works great
```

---

This architecture ensures:

✅ **Modularity** - Each type independent
✅ **Scalability** - Easy to add types
✅ **Simplicity** - No complex dependencies
✅ **Maintainability** - Clear structure
✅ **Extensibility** - Easy to enhance
✅ **Reliability** - Validation built-in
✅ **Portability** - Works anywhere
