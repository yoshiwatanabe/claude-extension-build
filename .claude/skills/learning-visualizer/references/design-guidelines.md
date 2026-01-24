# Design Guidelines

## Color System

### Primary Colors
- **Core/Important**: #2E86AB (Blue)
- **Supporting**: #A23B72 (Purple)
- **Optional**: #F18F01 (Orange)

### Status Colors
- **Complete**: #06A77D (Green)
- **In Progress**: #F4B860 (Yellow)
- **Locked**: #C94C4C (Red)
- **Optional**: #999999 (Gray)

### Difficulty Colors (1-5 scale)
- **1 (Easiest)**: #4ECDC4 (Teal)
- **2**: #44A08D (Green)
- **3 (Medium)**: #F4B860 (Yellow)
- **4**: #FF8C42 (Orange)
- **5 (Hardest)**: #C94C4C (Red)

---

## Typography

- **Title**: 24px, Bold, #1A1A1A
- **Subtitle**: 16px, Semi-bold, #333333
- **Node Labels**: 13px, Medium, #222222
- **Descriptions**: 12px, Regular, #555555
- **Metadata**: 11px, Regular, #999999

---

## Spacing & Layout

- **Node Padding**: 12px
- **Section Margin**: 20px
- **Diagram Height**: 500-600px (responsive)
- **Diagram Width**: Full viewport width

---

## Animation Guidelines

### Phase 1: Simple (Current)
- **Load**: Fade in 0.3s
- **Hover**: Color transition 0.2s, scale 1.05
- **Click**: Instant highlight, 0.3s color change

### Phase 2: Transition (Next)
- **Expand/Collapse**: Slide animation 0.4s
- **Filter**: Fade out 0.2s, fade in 0.2s
- **Path Highlight**: Gradient animation 0.6s

### Phase 3: Advanced (Future)
- **Step-through**: Timeline scrubber
- **Morph**: Diagram type transitions
- **Physics**: Force-directed node movement

---

## Interaction Patterns

### Hierarchy Tree
- **Hover**: Show full description, highlight parent chain
- **Click**: Toggle expand/collapse
- **Double-click**: Expand all children
- **Scroll**: Zoom in/out

### Flow Diagram
- **Hover**: Highlight connected path
- **Click**: Show detailed info panel
- **Play Button**: Animate flow from start to end
- **Pause**: Stop animation, show current step

### Network Graph
- **Hover**: Highlight node and direct connections
- **Click**: Pin node, show all connections
- **Drag**: Move pinned node
- **Double-click**: Unpin and repel

### Timeline
- **Hover**: Show event details
- **Click**: Scroll to specific event
- **Scroll**: Move through time
- **Zoom**: Toggle zoom levels

### Matrix
- **Hover**: Highlight row and show score details
- **Click**: Sort by column
- **Sort**: Reorganize rows
- **Filter**: Hide rows by score range

---

## Responsive Design

- **Mobile (<768px)**: Stack vertically, collapse complex elements
- **Tablet (768-1024px)**: Two-column layout if needed
- **Desktop (>1024px)**: Full-width interactive display

---

## Accessibility

- All colors have sufficient contrast (WCAG AA minimum)
- Hover states work for keyboard navigation
- Labels and descriptions are screen-reader friendly
- No critical information in color alone (always use text/icons too)

---

## Best Practices

1. **Start Simple**: Use basic colors and animations first
2. **Add Metadata Gradually**: Not every node needs full description
3. **Use Consistent Icons**: Same symbol means same thing across diagrams
4. **Grouping**: Visually group related concepts
5. **Progressive Disclosure**: Hide details until user hovers/clicks
6. **Loading Feedback**: Show progress for large diagrams

---

## CSS Conventions

```css
/* Node states */
.node { fill: #2E86AB; }
.node:hover { fill: #A23B72; opacity: 0.8; transform: scale(1.05); }
.node.active { fill: #06A77D; stroke: #000; stroke-width: 2px; }
.node.disabled { fill: #999999; opacity: 0.5; }

/* Animation classes */
.fade-in { animation: fadeIn 0.3s; }
.slide-down { animation: slideDown 0.4s; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

## Icon System (Optional)

- 📚 Learning/Education
- 🎯 Goal/Target
- ✅ Complete
- ⏳ In Progress
- 🔒 Locked
- ⚡ Important
- 🔗 Connection
- 📊 Data/Metric
- 🛠️ Tools/Skills
- 🎓 Knowledge
