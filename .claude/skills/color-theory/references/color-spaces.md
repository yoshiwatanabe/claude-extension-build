# Color Spaces Reference

Detailed explanation of different color space models beyond RGB.

## RGB (Red, Green, Blue)

**Type:** Additive
**Range:** R: 0-255, G: 0-255, B: 0-255
**Usage:** Digital displays, web, screens

**Advantages:**
- Direct hardware representation
- Simple to understand
- Widely supported

**Disadvantages:**
- Not perceptually uniform
- Difficult to adjust brightness/saturation independently
- Not intuitive for color selection

## HSL (Hue, Saturation, Lightness)

**Type:** Cylindrical
**Range:** H: 0-360°, S: 0-100%, L: 0-100%

**Components:**
- **Hue**: Color angle on wheel (0° red, 120° green, 240° blue)
- **Saturation**: Color intensity (0% gray, 100% full color)
- **Lightness**: Brightness (0% black, 50% pure color, 100% white)

**Advantages:**
- Intuitive for humans
- Easy to create tints/shades
- Simple color adjustments
- Good for color picker interfaces

**Disadvantages:**
- Not perceptually uniform
- Brightness perception varies by hue

**Conversion from RGB:**
```
max = max(R, G, B)
min = min(R, G, B)
delta = max - min

L = (max + min) / 2

if delta == 0:
    H = 0
    S = 0
else:
    S = delta / (1 - |2L - 1|)

    if max == R:
        H = 60° × (((G - B) / delta) mod 6)
    elif max == G:
        H = 60° × (((B - R) / delta) + 2)
    elif max == B:
        H = 60° × (((R - G) / delta) + 4)
```

**Common Uses:**
- CSS `hsl()` function
- Image editing software
- Color pickers
- Programmatic color generation

## HSV / HSB (Hue, Saturation, Value/Brightness)

**Type:** Cylindrical
**Range:** H: 0-360°, S: 0-100%, V/B: 0-100%

**Components:**
- **Hue**: Color angle (same as HSL)
- **Saturation**: Color purity (0% white, 100% pure color)
- **Value/Brightness**: How bright (0% black, 100% full brightness)

**Advantages:**
- Intuitive color selection
- Common in design software
- Matches artistic intuition well

**Disadvantages:**
- Not perceptually uniform
- Can produce colors too bright for some applications

**Difference from HSL:**
- HSL lightness at 50% = pure color
- HSV value at 100% = pure color (unless S = 0)
- HSL more symmetric, HSV matches painter's model better

**Common Uses:**
- Photoshop, GIMP color pickers
- Digital art software
- Color selection tools

## LAB (Lightness, A, B)

**Type:** Perceptually uniform
**Range:** L: 0-100, A: -128 to +127, B: -128 to +127

**Components:**
- **L (Lightness)**: 0 = black, 100 = white
- **A**: Green (-) to Red (+)
- **B**: Blue (-) to Yellow (+)

**Advantages:**
- Perceptually uniform (equal distances = equal perceived difference)
- Device-independent
- Separates luminance from chromatic content
- Best for color difference calculations

**Disadvantages:**
- Complex calculations
- Not intuitive for selection
- Some valid LAB values can't be displayed in RGB

**Common Uses:**
- Professional color correction
- Color difference calculations (Delta E)
- Print production
- Scientific applications

## CMYK (Cyan, Magenta, Yellow, Key/Black)

**Type:** Subtractive
**Range:** C: 0-100%, M: 0-100%, Y: 0-100%, K: 0-100%

**Advantages:**
- Matches printing process
- Industry standard for print

**Disadvantages:**
- Device-dependent (printer-specific)
- Limited gamut vs RGB
- Conversion from RGB lossy

**Conversion from RGB (simple):**
```
K = 1 - max(R, G, B)
C = (1 - R - K) / (1 - K)
M = (1 - G - K) / (1 - K)
Y = (1 - B - K) / (1 - K)
```

**Common Uses:**
- Professional printing
- Print design
- Publishing

## Hexadecimal

**Type:** RGB encoding
**Format:** #RRGGBB or #RGB

**Examples:**
- `#FF0000` = RGB(255, 0, 0) = Red
- `#F00` = #FF0000 (shorthand)
- `#80808080` = #808080 with 50% alpha (RGBA)

**Advantages:**
- Compact representation
- Web standard
- Easy to share

**Disadvantages:**
- Not human-readable
- Requires conversion for adjustments

## Color Space Comparison

| Space | Perceptual | Intuitive | Device Independent | Use Case |
|-------|------------|-----------|-------------------|----------|
| RGB | No | Medium | No | Screens, web |
| HSL | No | Yes | No | Color selection |
| HSV | No | Yes | No | Design software |
| LAB | Yes | No | Yes | Color science |
| CMYK | No | No | No | Printing |

## Gamut

**Definition:** Range of colors a color space or device can represent.

**Relationships:**
- LAB has largest theoretical gamut
- RGB varies by color space (sRGB, Adobe RGB, ProPhoto RGB)
- CMYK has smaller gamut than RGB
- Not all LAB colors can be displayed or printed

**sRGB:**
- Standard RGB color space for web
- Smaller gamut, but widely compatible
- Default for most devices

**Adobe RGB:**
- Wider gamut than sRGB
- More greens and cyans
- Used in professional photography

**ProPhoto RGB:**
- Very wide gamut
- Includes colors beyond human vision
- Used in high-end photo editing

## Conversion Tips

### RGB to HSL
Use when you need intuitive adjustments (brightness, saturation) on RGB colors.

### HSL to RGB
Use when generating colors programmatically with specific properties.

### RGB to LAB
Use for accurate color difference calculations or professional color work.

### RGB to CMYK
Always use color profiles for accurate printing. Simple formulas are approximations.

### Between Color Spaces
- Direct conversions can lose information
- Use ICC color profiles for professional work
- Consider gamut mapping for out-of-gamut colors

## Programming Examples

### Python (using colorsys)
```python
import colorsys

# RGB to HSL
r, g, b = 255, 128, 0  # Orange
r_norm, g_norm, b_norm = r/255, g/255, b/255
h, l, s = colorsys.rgb_to_hls(r_norm, g_norm, b_norm)
h_deg = h * 360

# HSL to RGB
r, g, b = colorsys.hls_to_rgb(h, l, s)
r, g, b = int(r*255), int(g*255), int(b*255)

# RGB to HSV
h, s, v = colorsys.rgb_to_hsv(r_norm, g_norm, b_norm)
```

### JavaScript
```javascript
// RGB to Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
```

### CSS
```css
/* All represent the same color */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 1.0);
color: hsl(0, 100%, 50%);
color: hsla(0, 100%, 50%, 1.0);
color: #FF0000;
color: #F00;
color: red;
```

## Perceptual Uniformity

**Problem:** Equal numerical differences don't mean equal perceived differences.

**Example:**
- RGB(0,0,0) to RGB(10,10,10): Barely noticeable
- RGB(120,120,120) to RGB(130,130,130): More noticeable
- Same numerical difference, different perception

**Solution:** Use LAB color space for:
- Color difference calculations
- Perceptually uniform gradients
- Color matching algorithms

**Delta E (ΔE):** Measure of color difference in LAB
- ΔE < 1: Not perceptible to human eye
- ΔE 1-2: Perceptible through close observation
- ΔE 2-10: Perceptible at a glance
- ΔE 11-49: Colors seem more similar than opposite
- ΔE > 100: Colors are exact opposites

## Best Practices

### For Web Design
- Use HSL for color adjustments
- Store in RGB/Hex for rendering
- Test in sRGB color space

### For Print
- Work in CMYK with proper color profiles
- Convert from RGB late in the process
- Account for gamut differences

### For Color Science
- Use LAB for calculations
- Convert to target space for display
- Consider perceptual uniformity

### For Design Software
- HSV/HSL for color selection
- RGB for pixel manipulation
- LAB for advanced operations

This reference provides deep technical detail about color spaces for when basic color theory isn't sufficient.
