# 📚 Learning Visualizer - Documentation Index

Welcome! Here's how to navigate the project.

---

## 🚀 START HERE

### **👉 [START_HERE.md](START_HERE.md)** ⭐
**For everyone** - Quick overview of what was built (5 min read)

---

## 📖 Documentation by Role

### 👤 I'm a **New User** (Want to generate diagrams)
1. [QUICK_START.md](QUICK_START.md) - Get started in 2 minutes
2. [examples/](examples/) - See working examples
3. [SKILL.md](SKILL.md) - How to use with Claude

### 👨‍💻 I'm a **Developer** (Want to understand the code)
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Architecture overview
2. [ARCHITECTURE.md](ARCHITECTURE.md) - System design & data flow
3. [README.md](README.md) - Complete technical reference
4. [scripts/generate.js](scripts/generate.js) - See the code

### 🎨 I'm a **Designer** (Want to customize visuals)
1. [references/design-guidelines.md](references/design-guidelines.md) - Color, typography, animations
2. [assets/styles.css](assets/styles.css) - CSS system
3. [diagrams/hierarchy/template.html](diagrams/hierarchy/template.html) - Example template

### 🏗️ I'm an **Architect** (Want to extend the system)
1. [ARCHITECTURE.md](ARCHITECTURE.md) - System design
2. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - How to add 6th type
3. [scripts/generate.js](scripts/generate.js) - Orchestration pattern

---

## 📚 All Documentation Files

### Core Documentation
| File | Purpose | Read Time |
|------|---------|-----------|
| [START_HERE.md](START_HERE.md) | Quick overview | 5 min |
| [QUICK_START.md](QUICK_START.md) | Get started in 2 minutes | 5 min |
| [SKILL.md](SKILL.md) | Main skill definition | 10 min |
| [README.md](README.md) | Complete documentation | 20 min |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Architecture overview | 15 min |

### Technical Documentation
| File | Purpose | Audience |
|------|---------|----------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, data flow | Developers, Architects |
| [FINAL_OVERVIEW.md](FINAL_OVERVIEW.md) | Complete overview, roadmap | Everyone |
| [references/diagram-types.md](references/diagram-types.md) | When to use each type | Content creators |
| [references/json-schemas.md](references/json-schemas.md) | Complete JSON contracts | Developers |
| [references/design-guidelines.md](references/design-guidelines.md) | Visual system | Designers |

---

## 🎯 The 5 Diagram Types

### 1️⃣ Hierarchy Tree
**For:** Prerequisites, taxonomies, skill trees, organizational structures
- **Example:** [examples/learning-path.json](examples/learning-path.json)
- **Generator:** [diagrams/hierarchy/generator.js](diagrams/hierarchy/generator.js)
- **Template:** [diagrams/hierarchy/template.html](diagrams/hierarchy/template.html)
- **Schema:** [diagrams/hierarchy/schema.json](diagrams/hierarchy/schema.json)

### 2️⃣ Flow Diagram
**For:** Algorithms, workflows, decision trees, pipelines
- **Example:** [examples/bash-pipes.json](examples/bash-pipes.json)
- **Generator:** [diagrams/flow/generator.js](diagrams/flow/generator.js)
- **Template:** [diagrams/flow/template.html](diagrams/flow/template.html)
- **Schema:** [diagrams/flow/schema.json](diagrams/flow/schema.json)

### 3️⃣ Network Graph
**For:** Concepts, dependencies, relationships, knowledge graphs
- **Example:** [examples/text-tools.json](examples/text-tools.json)
- **Generator:** [diagrams/network/generator.js](diagrams/network/generator.js)
- **Template:** [diagrams/network/template.html](diagrams/network/template.html)
- **Schema:** [diagrams/network/schema.json](diagrams/network/schema.json)

### 4️⃣ Timeline
**For:** Events, schedules, learning paths, historical progression
- **Example:** [examples/bash-roadmap.json](examples/bash-roadmap.json)
- **Generator:** [diagrams/timeline/generator.js](diagrams/timeline/generator.js)
- **Template:** [diagrams/timeline/template.html](diagrams/timeline/template.html)
- **Schema:** [diagrams/timeline/schema.json](diagrams/timeline/schema.json)

### 5️⃣ Matrix
**For:** Comparisons, assessments, feature tables, decision matrices
- **Example:** [examples/language-comparison.json](examples/language-comparison.json)
- **Generator:** [diagrams/matrix/generator.js](diagrams/matrix/generator.js)
- **Template:** [diagrams/matrix/template.html](diagrams/matrix/template.html)
- **Schema:** [diagrams/matrix/schema.json](diagrams/matrix/schema.json)

---

## 🛠️ Utility Scripts

| Script | Purpose |
|--------|---------|
| [scripts/generate.js](scripts/generate.js) | Main generator orchestrator - converts JSON to HTML |
| [scripts/validate.js](scripts/validate.js) | JSON validator - checks against schemas |

---

## 📁 Project Structure

```
learning-visualizer/
├── 📄 START_HERE.md             ← Read this first!
├── 📄 QUICK_START.md            ← Get started in 2 min
├── 📄 README.md                 ← Full documentation
├── 📄 SKILL.md                  ← Claude skill definition
├── 📄 PROJECT_SUMMARY.md        ← Architecture
├── 📄 ARCHITECTURE.md           ← System design
├── 📄 FINAL_OVERVIEW.md         ← Complete overview
├── 📚 references/
│   ├── diagram-types.md         ← When to use each type
│   ├── json-schemas.md          ← JSON contracts
│   └── design-guidelines.md     ← Colors, fonts, animations
├── 📊 diagrams/
│   ├── hierarchy/
│   ├── flow/
│   ├── network/
│   ├── timeline/
│   └── matrix/
├── 🔧 scripts/
│   ├── generate.js
│   └── validate.js
├── 💾 assets/
│   ├── styles.css
│   └── libs.json
└── 📋 examples/
    ├── learning-path.json
    ├── bash-pipes.json
    ├── text-tools.json
    ├── bash-roadmap.json
    └── language-comparison.json
```

---

## ⚡ Quick Commands

### Generate a diagram
```bash
node scripts/generate.js examples/learning-path.json output.html
```

### Validate JSON
```bash
node scripts/validate.js examples/learning-path.json
```

### Generate all examples
```bash
for f in examples/*.json; do node scripts/generate.js "$f" "${f%.json}.html"; done
```

---

## 🎓 Learning Path

### Beginner (30 min)
1. Read [START_HERE.md](START_HERE.md) (5 min)
2. Read [QUICK_START.md](QUICK_START.md) (5 min)
3. Run example (5 min)
4. Create your own diagram (15 min)

### Intermediate (1 hour)
1. Read [README.md](README.md) (20 min)
2. Study [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) (15 min)
3. Explore [diagrams/](diagrams/) structure (10 min)
4. Modify a template (15 min)

### Advanced (2+ hours)
1. Study [ARCHITECTURE.md](ARCHITECTURE.md) (20 min)
2. Review [scripts/generate.js](scripts/generate.js) (15 min)
3. Create new diagram type (1 hour)
4. Customize styling & animations (30+ min)

---

## ❓ FAQ

**Q: Where do I start?**  
A: Read [START_HERE.md](START_HERE.md), then [QUICK_START.md](QUICK_START.md)

**Q: How do I create a diagram?**  
A: See [QUICK_START.md](QUICK_START.md) - 2 minute guide with examples

**Q: What are the 5 diagram types?**  
A: See [references/diagram-types.md](references/diagram-types.md)

**Q: How do I validate JSON?**  
A: Run: `node scripts/validate.js your-file.json`

**Q: Can I customize the colors?**  
A: Yes, see [references/design-guidelines.md](references/design-guidelines.md)

**Q: How do I add a 6th diagram type?**  
A: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Extensibility section

**Q: Can I use this in production?**  
A: Yes! It's production-ready with error handling and validation

---

## 🚀 Next Steps

1. **Read** [START_HERE.md](START_HERE.md) (5 min)
2. **Try** Example: `node scripts/generate.js examples/learning-path.json`
3. **Create** Your first diagram (follow [QUICK_START.md](QUICK_START.md))
4. **Share** Your visualization with others
5. **Extend** The system as needed

---

## 📞 Support

- **Getting started?** → [QUICK_START.md](QUICK_START.md)
- **Need technical details?** → [README.md](README.md)
- **Want to understand the system?** → [ARCHITECTURE.md](ARCHITECTURE.md)
- **Looking for examples?** → [examples/](examples/)
- **JSON syntax questions?** → [references/json-schemas.md](references/json-schemas.md)
- **Want to customize design?** → [references/design-guidelines.md](references/design-guidelines.md)

---

## ✨ Ready?

**👉 [Start with START_HERE.md](START_HERE.md) →**

Create beautiful, interactive diagrams from structured knowledge! 🎉
