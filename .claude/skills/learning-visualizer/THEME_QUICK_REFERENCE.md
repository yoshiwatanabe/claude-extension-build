# Theme Selection Quick Reference Card

## 🎨 Choose the Right Theme

### When User Explicitly Requests
```
"...using [theme] style" → Use that theme ALWAYS
```

### When Content Determines

| If Topic is About... | Use Theme | Example |
|---------------------|-----------|---------|
| 💻 Tech, programming, systems, APIs, networks | **scifi** | Docker architecture, REST API flow |
| 🎌 Japanese culture, zen, philosophy, nature | **wabisabi** | Tea ceremony, haiku structure |
| 📚 Academic, formal education, science | **classic** | Scientific method, grammar rules |
| 📊 General, contemporary, professional | **modern** | Study techniques, business process |
| ❓ Unclear or ambiguous | **modern** | DEFAULT - works for everything |

---

## JSON Usage

```json
{
  "type": "network",
  "theme": "scifi",
  "title": "Your Title",
  "description": "Your description",
  ...
}
```

**Theme values:** `"classic"` | `"modern"` | `"scifi"` | `"wabisabi"`

---

## Quick Checks

### Is it about technology?
✅ APIs, servers, databases, code, networks, cloud, DevOps  
→ **scifi**

### Is it Japanese or zen-related?
✅ Japanese history, 和, 元号, zen, tea ceremony, haiku  
→ **wabisabi**

### Is it formal academic content?
✅ Scientific method, formal grammar, mathematical proofs  
→ **classic**

### Everything else?
✅ Business, learning, comparisons, general topics  
→ **modern** (DEFAULT)

---

## Response Template

```markdown
## 📊 Diagram: [Title]

**Type:** [hierarchy|flow|network|timeline|matrix]
**Theme:** [classic|modern|scifi|wabisabi]
**Why this theme:** [Brief 1-line explanation]

**What it shows:**
[Description]

**JSON Data:**
\```json
{
  "type": "...",
  "theme": "...",
  ...
}
\```
```

---

## Common Mistakes to Avoid

❌ Using wabisabi for all Asian topics (it's specifically Japanese aesthetic)  
✅ Use modern for general Asian topics, wabisabi only for Japanese

❌ Using scifi for all technical docs  
✅ Use classic for formal academic CS topics, scifi for systems/architecture

❌ Forgetting user's explicit request  
✅ "using X style" ALWAYS overrides content-based selection

❌ Using classic as default  
✅ **modern** is the default, not classic

---

## Theme Characteristics (Visual Cues)

**Modern** 🪟
- Glass morphism, blur effects
- Inter font, Material icons
- Indigo/slate colors
- Dark mode toggle

**Scifi** 🌐
- Neon cyan/magenta/lime
- Cyber-grid background
- HUD borders with corner accents
- JetBrains Mono, Orbitron fonts
- Animated scanlines

**Wabisabi** 🍃
- Earth tones (aizome, akane, sumi)
- Paper texture overlay
- Noto Serif JP font
- Minimalist, gentle shadows
- Optional vertical text

**Classic** 📖
- Soft purple/blue gradients
- Segoe UI font
- Traditional card layouts
- Rounded corners, box shadows
- Status color coding
