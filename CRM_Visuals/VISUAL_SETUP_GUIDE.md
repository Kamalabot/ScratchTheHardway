# CRM Automation Pipeline: Visual Setup & Design Guide

This document outlines the visual architecture, color system, layer hierarchy, and animation hooks for the **CRM Visual Automation System** located in `CRM_Visuals/`.

---

## 1. Visual Aesthetic & Design Tokens ("Making Visuals POP")

To achieve a futuristic, state-of-the-art dashboard look, the visual layout utilizes a **Dark Cyber Glassmorphism** palette with neon glow accents.

### Color Palette Tokens
| Token Name | Hex Code | Purpose / Stage | Visual Accent |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#070b19` | Deep space background | Glass overlay grid |
| **Glass Card Fill** | `rgba(15, 23, 42, 0.75)` | Node backdrop containers | `stroke: rgba(255,255,255,0.15)` |
| **Lead Ingestion Node** | `#00f3ff` | Stage 1: Incoming Lead Radar | Cyan Neon Bloom |
| **Product Attach Node** | `#a855f7` | Stage 2: Product & Deal Config | Electric Purple Glow |
| **Invoice Paid Node** | `#f59e0b` | Stage 3: Instant Invoice & Payment | Radiant Gold / Amber |
| **After-Sales Node** | `#22c55e` | Stage 4: Onboarding & Service | Emerald Green Pulse |
| **Energy Conduit Line** | `#38bdf8` | Inter-stage data flow lines | Animated dash offset |

---

## 2. SVG Layer Architecture (Inkscape Compatible)

When editing or extending `crm_automation_pipeline.svg` in Inkscape or Illustrator, maintain the following semantic `<g>` group structure:

```
crm_automation_pipeline.svg
├── <defs>
│   ├── <filter id="cyan-glow">
│   ├── <filter id="purple-glow">
│   ├── <filter id="amber-glow">
│   ├── <filter id="emerald-glow">
│   └── <linearGradient id="...">
├── <style> (Standalone CSS Animations)
├── <g id="layer-background"> (Canvas rect + grid pattern)
├── <g id="layer-conduits"> (Flow lines connecting Stage 1 -> Stage 2 -> Stage 3 -> Stage 4)
├── <g id="layer-node-lead"> (Stage 1: Lead Ingestion Radar & Score Badge)
├── <g id="layer-node-product"> (Stage 2: Product Catalog & Deal Configurator)
├── <g id="layer-node-invoice"> (Stage 3: Invoice Verification & Payment Badge)
├── <g id="layer-node-service"> (Stage 4: CSAT Health Index & Service Loop)
└── <g id="layer-particles"> (Dynamic data packet circles)
```

---

## 3. Standalone CSS Animation Engine

The SVG includes self-contained CSS keyframe animations so that it animates seamlessly when embedded directly in standard browsers or `<img>` tags without requiring external scripts:

### Key Animations Included:
1. `@keyframes conduit-dash`: Animates `stroke-dashoffset` along pipeline lines to create traveling data pulses.
2. `@keyframes radar-sweep`: Rotates the radar beam in the Lead Ingestion stage.
3. `@keyframes pulse-badge`: Pulses node status indicators with neon bloom filters.
4. `@keyframes particle-flow`: Moves energy packets across pipeline coordinates.
5. `@keyframes checkmark-glow`: Creates a radiant burst effect when invoices transition to `PAID`.

---

## 4. JavaScript / GSAP Automation Hooks

For interactive web applications (e.g. `crm_pipeline.html`), elements can be targeted directly using clean semantic IDs:

```javascript
// Example: Triggering Invoice Payment Pulse in GSAP
const invoiceCheck = svg.querySelector('#invoice-paid-badge');
const serviceNode = svg.querySelector('#node-service');

gsap.timeline()
  .to('#conduit-stage-2-3', { stroke: '#f59e0b', opacity: 1, duration: 0.5 })
  .to(invoiceCheck, { scale: 1.2, filter: 'url(#amber-glow)', duration: 0.3, yoyo: true, repeat: 1 })
  .to('#conduit-stage-3-4', { stroke: '#22c55e', opacity: 1, duration: 0.5 });
```

---

## 5. File Inventory

- `crm_automation_pipeline.svg`: The master animated SVG vector artwork.
- `crm_pipeline.html`: Interactive Web simulation dashboard with real-time telemetry and deal lifecycle triggers.
- `VISUAL_SETUP_GUIDE.md`: This reference specification document.
