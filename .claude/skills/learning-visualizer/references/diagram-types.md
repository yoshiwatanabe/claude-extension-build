# Diagram Types Reference

## Overview

Each diagram type is optimized for a specific knowledge structure. Choose based on the **relationships and hierarchy** of your content.

---

## 1. Hierarchy Tree

**Best for:** Parent-child relationships, classifications, organizational structures

**Examples:**
- File system directories
- Company organizational charts
- Skill progression (beginner → intermediate → advanced)
- Taxonomy classifications
- Decision trees with dependent outcomes
- Learning prerequisites

**Visual Characteristics:**
- Root node at top/center
- Branches downward (or radial)
- Clear parent-child connections
- Can collapse/expand branches

**Interaction Patterns:**
- Click to expand/collapse
- Hover for full descriptions
- Color-code by metadata (level, status, category)
- Filter by depth or criteria

**Best Library:** D3.js tree layout or custom SVG

---

## 2. Flow/Process Diagram

**Best for:** Sequential steps, conditional logic, workflows, algorithms

**Examples:**
- Algorithm flowcharts
- Pipeline data flow (cat → grep → sort → output)
- Decision trees with outcomes
- Software deployment pipelines
- Recipe steps
- State machines
- Git workflow (branch → commit → merge)

**Visual Characteristics:**
- Nodes represent steps/decisions
- Edges show flow direction
- Decision nodes have multiple outputs
- Can show loops and conditional paths

**Interaction Patterns:**
- Step-through animation (play/pause)
- Click nodes for detailed explanations
- Highlight execution paths
- Toggle between simplified/detailed views
- Show error paths separately

**Best Library:** Mermaid.js or custom SVG/Canvas

---

## 3. Network/Graph

**Best for:** Interconnected concepts, dependencies, relationships

**Examples:**
- Concept maps (how ideas relate)
- Technology dependencies (npm packages, system libraries)
- Knowledge graphs (Wikipedia links)
- Social networks
- Skill relationships
- Command relationships (grep, awk, sed as text-processing tools)

**Visual Characteristics:**
- Nodes float in space
- Links show relationships (directed or bidirectional)
- Nodes can be grouped by category
- Node size represents importance
- Link strength shows closeness

**Interaction Patterns:**
- Drag nodes to rearrange
- Click node to highlight all connected concepts
- Filter by relationship type
- Filter by importance level
- Zoom and pan
- Show/hide nodes

**Best Library:** Vis.js or Cytoscape.js

---

## 4. Timeline

**Best for:** Temporal progression, sequences, milestones

**Examples:**
- Learning roadmap (Q1 basics → Q2 advanced → Q3 mastery)
- Project phases and milestones
- Historical events
- Version release history
- Career progression
- Course curriculum
- Daily learning schedule

**Visual Characteristics:**
- Events arranged along time axis
- Milestones marked prominently
- Events can have duration
- Multiple tracks for parallel paths
- Color-coded by category

**Interaction Patterns:**
- Scroll/drag to move through time
- Click events for details
- Filter by category
- Zoom to time ranges
- Show parallel learning tracks
- Jump to milestones

**Best Library:** Vis.js Timeline or custom D3.js

---

## 5. Matrix/Comparison

**Best for:** Comparing features, scoring, assessments

**Examples:**
- Feature comparison table (Language A vs B vs C features)
- Skill assessment matrix (What I know/partially know/don't know)
- SWOT analysis
- Decision matrix (features vs options)
- Capability maps (projects vs technology stacks)
- Pricing tiers
- Ruby vs Python vs Node.js comparison

**Visual Characteristics:**
- Rows = items being compared
- Columns = features/criteria
- Cells = values (Yes/No/Score)
- Color intensity = strength of value
- Can weight columns by importance

**Interaction Patterns:**
- Sort by any column
- Filter rows
- Hover for detailed explanations
- Color-code by score ranges
- Toggle weighted vs unweighted views
- Show/hide low-importance items

**Best Library:** D3.js heatmap or custom HTML table with CSS

---

## Combination Strategies

Sometimes you need **multiple diagrams** to fully explain a concept:

### Example 1: Bash Piping
- **Flow Diagram** - How data moves through pipes
- **Network Diagram** - Which commands work together

### Example 2: Career Path
- **Hierarchy Tree** - Skill prerequisites
- **Timeline** - Learning schedule
- **Matrix** - Skill assessment progress

### Example 3: Technology Stack
- **Network Diagram** - How services communicate
- **Matrix** - Feature comparison of options
- **Hierarchy Tree** - Package dependencies

---

## Selection Checklist

```
Does it have required prerequisites or parent-child relationships?
  → Hierarchy Tree

Is it a step-by-step process or algorithm?
  → Flow Diagram

Are things interconnected in multiple ways?
  → Network Graph

Does it progress through time or phases?
  → Timeline

Are you comparing options across features?
  → Matrix
```
