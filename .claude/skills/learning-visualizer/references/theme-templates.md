# Visual Theme Templates

This document provides the HTML/CSS templates and styling patterns for each visual theme supported by the Learning Visualizer.

---

## Theme Overview

| Theme | Best For | Key Colors | Fonts | Aesthetic |
|-------|----------|------------|-------|-----------|
| **classic** | Academic, formal education, traditional business | Soft gradients, blues, purples | Segoe UI, system fonts | Original design with gentle animations |
| **modern** | Default, professional, contemporary | Indigo primary (#6366f1), slate grays | Inter, clean sans-serif | Glass morphism, flat design, dark mode |
| **scifi** | Tech, programming, cybersecurity, systems | Neon cyan (#00f2ff), magenta (#ff00ff), lime (#39ff14) | JetBrains Mono, Orbitron | Cyber-grid, HUD elements, futuristic |
| **wabisabi** | Japanese culture, minimalism, philosophy, nature | Earth tones, aizome (#1e3a5f), akane (#b1352b) | Noto Serif JP, Shippori Mincho | Paper texture, zen minimalism |

---

## Modern Theme (DEFAULT)

### Color Palette
```css
:root {
    --primary: #6366f1;
    --background-light: #f8fafc;
    --background-dark: #0f172a;
    --surface-light: #ffffff;
    --surface-dark: #1e293b;
}
```

### Key Features
- Glass morphism effects with backdrop-blur
- Inter font family for modern readability
- Material Symbols Outlined icons
- Smooth transitions and clean borders
- Full dark mode support via `class="dark"`
- Professional, contemporary aesthetic

### HTML Template Structure
```html
<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>[Diagram Title]</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#6366f1",
                        "background-light": "#f8fafc",
                        "background-dark": "#0f172a",
                        "surface-light": "#ffffff",
                        "surface-dark": "#1e293b",
                    },
                    fontFamily: {
                        display: ["Inter", "sans-serif"],
                    },
                },
            },
        };
    </script>
    <style>
        .glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .dark .glass {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body class="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
    <!-- Content here -->
</body>
</html>
```

### Design Guidelines
- Use `glass` class for floating panels
- Rounded corners with `rounded-xl` or `rounded-2xl`
- Border colors: `border-slate-200 dark:border-slate-800`
- Text colors: `text-slate-900 dark:text-slate-100`
- Hover states with smooth transitions
- Material icons for UI elements

---

## Scifi Theme

### Color Palette
```css
:root {
    --bg-deep: #050b14;
    --bg-panel: rgba(10, 20, 35, 0.85);
    --neon-cyan: #00f2ff;
    --neon-magenta: #ff00ff;
    --neon-lime: #39ff14;
    --grid-color: rgba(0, 242, 255, 0.05);
}
```

### Key Features
- Cyber-grid background with animated scanlines
- Neon glow effects on all elements
- HUD-style borders with corner accents
- Animated data flows and radar sweeps
- JetBrains Mono (monospace) + Orbitron (headings)
- Dark-only theme with high-tech aesthetic

### HTML Template Structure
```html
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>[Diagram Title]</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
    <style type="text/tailwindcss">
        :root {
            --bg-deep: #050b14;
            --bg-panel: rgba(10, 20, 35, 0.85);
            --neon-cyan: #00f2ff;
            --neon-magenta: #ff00ff;
            --neon-lime: #39ff14;
        }
        body {
            font-family: 'JetBrains Mono', monospace;
            background-color: var(--bg-deep);
        }
        .heading-font {
            font-family: 'Orbitron', sans-serif;
        }
        .cyber-grid {
            background-image: 
                linear-gradient(var(--grid-color) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
            background-size: 50px 50px;
        }
        .hud-border {
            border: 1px solid rgba(0, 242, 255, 0.3);
            position: relative;
        }
        .hud-border::before, .hud-border::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-color: var(--neon-cyan);
            border-style: solid;
        }
        .hud-border::before {
            top: -2px;
            left: -2px;
            border-width: 2px 0 0 2px;
        }
        .hud-border::after {
            bottom: -2px;
            right: -2px;
            border-width: 0 2px 2px 0;
        }
        .glow-cyan { filter: drop-shadow(0 0 6px var(--neon-cyan)); }
        .glow-magenta { filter: drop-shadow(0 0 6px var(--neon-magenta)); }
        .glow-lime { filter: drop-shadow(0 0 6px var(--neon-lime)); }
        .scanline {
            width: 100%;
            height: 2px;
            background: rgba(0, 242, 255, 0.1);
            position: absolute;
            animation: scan 4s linear infinite;
        }
        @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
        }
    </style>
</head>
<body class="overflow-hidden h-screen w-screen">
    <div class="cyber-grid absolute inset-0">
        <div class="scanline"></div>
        <!-- Content here -->
    </div>
</body>
</html>
```

### Design Guidelines
- All text UPPERCASE with letter-spacing
- Use `hud-border` class for panels
- Nodes as rectangles with dual-layer fills
- Text in heading-font (Orbitron) for titles
- Animated elements: scanlines, data-flow, radar-sweep
- Color coding: cyan (client), magenta (core), lime (server)

---

## Wabisabi Theme

### Color Palette
```css
:root {
    --washi-base: #F9F7F2;
    --aizome: #1e3a5f;      /* indigo blue */
    --akane: #b1352b;        /* madder red */
    --enji: #6b2426;         /* dark red */
    --uguisu: #6b705c;       /* nightingale green */
    --sumi: #2d2d2d;         /* ink black */
    --wood: #d7c9b1;         /* wood tone */
    --panel-bg: #FFFFFF;
}
```

### Key Features
- Washi paper texture overlay
- Muted, earth-tone colors from Japanese traditional palette
- Noto Serif JP font for authentic Japanese typography
- Minimalist, zen-inspired layout
- Vertical text orientation options
- Subtle shadows, no harsh borders

### HTML Template Structure
```html
<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>[Diagram Title]</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;500;700&family=Shippori+Mincho:wght@400;500;600&display=swap" rel="stylesheet"/>
    <style type="text/tailwindcss">
        :root {
            --washi-base: #F9F7F2;
            --aizome: #1e3a5f;
            --akane: #b1352b;
            --sumi: #2d2d2d;
            --panel-bg: #FFFFFF;
        }
        body {
            font-family: "Shippori Mincho", serif;
            background-color: var(--washi-base);
        }
        .zen-panel {
            background-color: var(--panel-bg);
            border: 1px solid rgba(45, 45, 45, 0.15);
            box-shadow: none;
        }
        .washi-texture {
            position: fixed;
            inset: 0;
            pointer-events: none;
            opacity: 0.03;
            background-image: url([texture-url]);
            background-repeat: repeat;
        }
        .fuda-node {
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .fuda-node:hover {
            transform: translateY(-2px);
        }
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: upright;
            font-family: "Noto Serif JP", serif;
        }
    </style>
</head>
<body>
    <div class="washi-texture"></div>
    <!-- Content here -->
</body>
</html>
```

### Design Guidelines
- Soft, muted colors only
- Use `zen-panel` class for cards
- Minimal borders: `border-slate-300/30`
- Gentle animations with ease curves
- Consider vertical text for authentic feel
- Round corners: `rounded-lg` (never sharp)
- Subtle depth with minimal shadows

---

## Classic Theme

### Color Palette
```css
:root {
    --primary-color: #667eea;
    --primary-dark: #764ba2;
    --text-primary: #333;
    --bg-main: white;
    --bg-secondary: #fafafa;
    --border-color: #ddd;
}
```

### Key Features
- Original gradient-based design
- Soft purple/blue color scheme
- System fonts (Segoe UI, sans-serif)
- Traditional card-based layouts
- Smooth gradients and shadows
- Works well for academic content

### HTML Template Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>[Diagram Title]</title>
    <style>
        :root {
            --primary-color: #667eea;
            --primary-dark: #764ba2;
            --text-primary: #333;
            --bg-main: white;
            --bg-secondary: #fafafa;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Content here -->
    </div>
</body>
</html>
```

### Design Guidelines
- Gradient backgrounds common
- Card-based layouts with shadows
- Rounded corners (8-12px)
- Traditional color scheme
- Hover effects with scale transforms
- Status colors: green (complete), yellow (in-progress), gray (locked)

---

## Theme Application in JSON

When generating diagrams, include the theme in your JSON:

```json
{
  "type": "network",
  "theme": "scifi",
  "title": "System Architecture",
  "description": "Backend microservices topology",
  "nodes": [...]
}
```

The `theme` field should be one of: `"classic"`, `"modern"`, `"scifi"`, or `"wabisabi"`.

---

## Theme Selection Quick Reference

**Explicit user request?** → Use requested theme  
**Technology/programming?** → `scifi`  
**Japanese/zen/nature?** → `wabisabi`  
**Academic/formal?** → `classic`  
**Everything else or unclear?** → `modern` (default)
