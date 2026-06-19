---
name: premium-liquid-glassmorphism
description: "Premium glassmorphism variables, dark mode styling utilities, HSL eye-care custom tokens, and glowing/neon effect setup for modern high-end frontend designs."
category: UI/Aesthetics
risk: safe
source: community
source_project: FAP-UI-ADVANCE
author: QuiNC & Antigravity
date_harvested: "2026-06-12"
tags: [css, tailwind, glassmorphism, eye-care, dark-mode]
dependencies: {}
---
# Premium Liquid Glassmorphism & Eye-Care HSL Dark Mode

This skill outlines design systems, theme customizer variables, and custom CSS classes designed to produce ultra-premium liquid glassmorphism UI components. It integrates a fine-tuned TikTok-style dark mode that minimizes eye strain via HSL colors.

## When to Use
- Building premium, modern SaaS landing pages or dashboard interfaces.
- Customizing dark themes to feel fresh and futuristic (e.g. using glowing gradients, neon cyan, and hot pink highlights).
- Creating complex card layouts requiring light-refraction glass board styling.

## Design Principles
1. **Glass Refraction**: Employs semi-transparent white borders (`rgba(255, 255, 255, 0.06)` for dark mode and `rgba(255, 255, 255, 0.8)` for light mode) to simulate light bending around elements.
2. **Backdrop Blurs**: Applies `backdrop-filter: blur(20px) saturate(140%)` to allow underlying ambient blobs to bleed through smoothly.
3. **Contrast Highlights**: Uses high-impact neon accents (e.g., `#25f4ee` neon cyan, `#fe2c55` neon pink) for interactive hovers and glow effects.
4. **Smooth Transitions**: Implements custom spring-like timing functions (`cubic-bezier(0.16, 1, 0.3, 1)`) for premium transitions.

## Code Template
- [liquid-glass.css](resources/liquid-glass.css) - Raw CSS declarations containing custom variables and glass classes.
