---
name: canvas-ambient-spark-effects
description: "A dual-canvas ambient effect system featuring pulsing stardust/fireflies, mouse-trail particles, interactive coordinate water-ripples, and coordinate-burst stardust physics."
category: UI/Visuals
risk: safe
source: community
source_project: quinc-fptu/1st-June
author: Antigravity
date_harvested: "2026-06-12"
tags: [canvas, ambient, visual-effects, particles, animation]
dependencies: {}
---
# Canvas Ambient & Spark Effects System

A lightweight, performant dual-canvas visual effects system to enhance webpage atmosphere. It features slow-drifting background stardust (or fireflies), mouse-trail sparks, water-ripple expanding rings upon page clicks, and coordinate-burst particle physics.

## When to Use
- Adding rich, premium ambient depth to landing pages or intros.
- Providing visual touch/click feedback in high-end aesthetic portfolios.
- Setting up magical or healing atmospheres (such as Lofi players or dream diaries).

## Features & Mechanics
1. **Pulsing Background Stardust**: Particles drift continuously with slow velocities, wrapping around boundaries, and pulsing their opacity periodically.
2. **Interactive Coordinate Burst**: Generates burst particle physics from any given absolute screen coordinate (perfect for syncing with other page actions).
3. **Pulsing Ripple Expansion**: Renders elegant dissolving rings from click events to create a liquid/ripple feedback.
4. **Mouse Trail Sparkles**: Smooth pastel particles tracking mouse movement.

## Pitfalls & Gotchas
- **Overlay Interaction Block**: Make sure the container canvas has `pointer-events: none` so user interactions can pass through to buttons/inputs beneath.
- **Color Format Interpolation**: If customizing the ripple color, ensure you pass solid HSL or RGB formats, as the runtime code appends opacity dynamically using string replacement.

## Templates & Code Files
- [ambient-canvas.js](resources/ambient-canvas.js) - The core ambient effects orchestration class.
