#!/usr/bin/env python3
"""
RGB Color Mixer Utility

Mixes two RGB colors with optional ratio control.
Demonstrates how skills can include executable utilities.

Usage:
    python rgb_mixer.py --color1 255,0,0 --color2 0,255,0
    python rgb_mixer.py --color1 255,0,0 --color2 0,0,255 --ratio 0.7
    python rgb_mixer.py --color1 255,128,0 --color2 0,128,255 --format hex
"""

import argparse
import sys


def parse_rgb(color_str):
    """
    Parse RGB color string in format 'R,G,B' or 'R G B'.

    Args:
        color_str: String representation of RGB color

    Returns:
        Tuple of (R, G, B) integers

    Raises:
        ValueError: If format is invalid or values out of range
    """
    try:
        # Support both comma and space separated
        parts = color_str.replace(',', ' ').split()

        if len(parts) != 3:
            raise ValueError("RGB color must have exactly 3 components")

        r, g, b = map(int, parts)

        # Validate range
        for val, name in [(r, 'R'), (g, 'G'), (b, 'B')]:
            if not 0 <= val <= 255:
                raise ValueError(f"{name} value {val} out of range (0-255)")

        return (r, g, b)
    except ValueError as e:
        raise ValueError(f"Invalid RGB format '{color_str}': {e}")


def rgb_to_hex(r, g, b):
    """
    Convert RGB to hexadecimal color code.

    Args:
        r, g, b: Red, green, blue values (0-255)

    Returns:
        Hexadecimal color string (e.g., '#FF0000')
    """
    return f"#{r:02X}{g:02X}{b:02X}"


def mix_colors(color1, color2, ratio=0.5):
    """
    Mix two RGB colors with specified ratio.

    Args:
        color1: First color as (R, G, B) tuple
        color2: Second color as (R, G, B) tuple
        ratio: Mix ratio - 0.0 = all color2, 1.0 = all color1, 0.5 = equal mix

    Returns:
        Mixed color as (R, G, B) tuple
    """
    r1, g1, b1 = color1
    r2, g2, b2 = color2

    # Linear interpolation
    r_mixed = int(r1 * ratio + r2 * (1 - ratio))
    g_mixed = int(g1 * ratio + g2 * (1 - ratio))
    b_mixed = int(b1 * ratio + b2 * (1 - ratio))

    # Clamp to valid range
    r_mixed = max(0, min(255, r_mixed))
    g_mixed = max(0, min(255, g_mixed))
    b_mixed = max(0, min(255, b_mixed))

    return (r_mixed, g_mixed, b_mixed)


def format_color(rgb, format_type='both'):
    """
    Format RGB color for output.

    Args:
        rgb: Color as (R, G, B) tuple
        format_type: 'rgb', 'hex', or 'both'

    Returns:
        Formatted color string
    """
    r, g, b = rgb
    hex_color = rgb_to_hex(r, g, b)
    rgb_str = f"RGB({r}, {g}, {b})"

    if format_type == 'rgb':
        return rgb_str
    elif format_type == 'hex':
        return hex_color
    else:  # both
        return f"{rgb_str} - {hex_color}"


def main():
    parser = argparse.ArgumentParser(
        description='Mix two RGB colors with optional ratio',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --color1 255,0,0 --color2 0,255,0
  %(prog)s --color1 255,0,0 --color2 0,0,255 --ratio 0.7
  %(prog)s --color1 "255 128 0" --color2 "0 128 255" --format hex
        """
    )

    parser.add_argument(
        '--color1',
        required=True,
        help='First RGB color (format: R,G,B or "R G B")'
    )

    parser.add_argument(
        '--color2',
        required=True,
        help='Second RGB color (format: R,G,B or "R G B")'
    )

    parser.add_argument(
        '--ratio',
        type=float,
        default=0.5,
        help='Mix ratio (0.0-1.0, default: 0.5). 1.0 = all color1, 0.0 = all color2'
    )

    parser.add_argument(
        '--format',
        choices=['rgb', 'hex', 'both'],
        default='both',
        help='Output format (default: both)'
    )

    args = parser.parse_args()

    # Validate ratio
    if not 0.0 <= args.ratio <= 1.0:
        print(f"Error: Ratio must be between 0.0 and 1.0, got {args.ratio}", file=sys.stderr)
        return 1

    try:
        # Parse input colors
        color1 = parse_rgb(args.color1)
        color2 = parse_rgb(args.color2)

        # Mix colors
        mixed = mix_colors(color1, color2, args.ratio)

        # Output results
        print(f"Color 1: {format_color(color1, args.format)}")
        print(f"Color 2: {format_color(color2, args.format)}")

        ratio_percent = int(args.ratio * 100)
        print(f"Mixed ({ratio_percent}/{100-ratio_percent}): {format_color(mixed, args.format)}")

        return 0

    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
