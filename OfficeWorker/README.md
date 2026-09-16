# 🏢 Autonomous Agent Office Visualizer & Simulation Engine

Welcome to the **OfficeWorker Simulation Project**! This project provides a full top-down visual floorplan and multi-agent activity simulation engine designed to showcase autonomous AI agents working, communicating, and handing off tasks across departments (Marketing, Sales, Finance, and Executive Audit).

---

## 🚀 Quick Start (How to Run)

Open **[office_plan_viewer.html](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/office_plan_viewer.html)** in any web browser. Use the top navigation tabs to toggle between:

1. ⚡ **Phaser 3 Engine** (`office_phaser_sim.html`) — **Recommended** production-grade WebGL engine.
2. 🏃 **Canvas2D Prototype** (`office_simulation.html`) — Lightweight standalone 2D canvas simulation.
3. 📐 **SVG Blueprint** (`office_plan_updated.svg`) — Architectural vector plan.

---

## 📚 Version History & Architectural Evolution

| Version                        | File                                                                                                   | Description                                                                                                                                                          | Technology          |
| :----------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| **V1: Initial Draft**    | [office_plan_draft.svg](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/office_plan_draft.svg)     | Raw SVG vector floorplan created in Inkscape containing basic desks, chairs, and potted plants.                                                                      | SVG / Inkscape      |
| **V2: Blueprint Vector** | [office_plan_updated.svg](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/office_plan_updated.svg) | Styled vector architecture showing department zones (Marketing, Sales, Finance), task packets, tool badges, and animated vector flow lines.                          | SVG / CSS Keyframes |
| **V3: Canvas2D Sim**     | [office_simulation.html](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/office_simulation.html)   | Canvas2D prototype with top-down character sprites, walking leg animations, directional facing, speech bubbles, and task carrying.                                   | HTML5 Canvas / JS   |
| **V4: Phaser 3 Engine**  | [office_phaser_sim.html](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/office_phaser_sim.html)   | **Production-grade Engine**. Built with Phaser 3.80 WebGL, tween interpolation, container hierarchy, idle auto-roaming, and non-blocking event state machines. | Phaser 3 / WebGL    |
| **V5: Unified Hub**      | [office_plan_viewer.html](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/office_plan_viewer.html) | Web portal containing interactive tab switcher to seamlessly test all visual versions.                                                                               | HTML / CSS / iFrame |
| **Edu Demo: Sorting**    | [phaser_sorting_explorer.html](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/phaser_sorting_explorer.html) | Interactive algorithm visualizer (Bubble, Selection, Insertion, Quick) with Phaser Graphics & Arching Tweens. Explainer: [phaser_sorting_explainer.md](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/phaser_sorting_explainer.md). | Phaser 3 / Tweens |
| **Digital Twin: Warehouse**| [phaser_warehouse_twin.html](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/phaser_warehouse_twin.html) | Warehouse Logistics Digital Twin with AGV Container agents, Waypoints, WebGL Particles & Bottlenecks. Explainer: [phaser_warehouse_explainer.md](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/phaser_warehouse_explainer.md). | Phaser 3 / WebGL Particles |

---

## ⚡ Why Phaser.js (Phaser 3) is Superior for Agent Animations

In early prototypes (Canvas2D/DOM), nested `setTimeout` callbacks or manual coordinate increments can stall or hold still if multiple events overlap or frame rates drop. **Phaser 3** resolves this entirely through:

### 1. Hardware-Accelerated WebGL Rendering

Phaser uses WebGL (with automatic 2D Canvas fallback) to render hundreds of sprites, speech bubbles, status rings, and tilemaps at a locked **60 FPS** without DOM layout thrashing or browser lag.

### 2. Built-in Tweens & Interpolation Engine (`this.tweens.add`)

Instead of manually calculating frame-by-frame velocity in a fragile loop, Phaser's tween engine manages spatial motion smoothly:

```javascript
this.scene.tweens.add({
  targets: this.agentContainer,
  x: targetX,
  y: targetY,
  duration: 1200,
  ease: 'Power1',
  onComplete: () => {
    // Non-blocking callback triggers next autonomous state Machine step!
    this.state = 'IDLE';
  }
});
```

### 3. Container Hierarchy (`Phaser.GameObjects.Container`)

In `office_phaser_sim.html` and `phaser_warehouse_twin.html`, each agent or AGV sprite is encapsulated in a single transform container holding:

* Drop shadow / status indicators
* Agent body, head graphics or AGV chassis
* Carried task folders / payload boxes
* Role labels & text tags
* Emitters & speech bubbles

Moving the container automatically moves all child visual elements in perfect synchronization!

### 4. Continuous Idle Auto-Roaming (Never Freezes!)

To prevent the simulation from looking static when no active tasks are in flight, agents possess an **Autonomous Micro-Roaming State**. Idle agents periodically walk to key waypoints, keeping the simulation alive 100% of the time.

---

## 🔌 Connecting Phaser 3 to Real LLM Multi-Agent Frameworks

You can connect `office_phaser_sim.html` directly to Python/Node.js multi-agent backends (e.g., **LangChain**, **AutoGen**, **CrewAI**, or **MetaGPT**) using WebSockets or REST webhooks.

### Architecture Diagram:

```
┌──────────────────────────────────────┐       WebSocket / Event-Source      ┌────────────────────────────────────────┐
│       Python Agent Backend           │ ─────────────────────────────────►  │     Phaser 3 Web Visualizer            │
│ (AutoGen / CrewAI / FastAPI)         │                                     │ (office_phaser_sim.html)               │
│                                      │  JSON: {                            │                                        │
│ 1. SDR Agent qualifies lead          │    "agentId": "sdr",                │ 1. Agent sprite walks to desk          │
│ 2. Architect Agent calls Vector DB   │    "action": "HANDOFF_TASK",        │ 2. Displays speech bubble              │
│ 3. AE Agent generates quote          │    "targetX": 740, "targetY": 320   │ 3. Hands physical task folder to next  │
└──────────────────────────────────────┘  }                                  └────────────────────────────────────────┘
```

### Example Backend Event Handler in JavaScript:

```javascript
const socket = new WebSocket('ws://localhost:8000/ws/agent-events');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const agent = sceneRef.agents[data.agentId];

  if (data.action === 'SAY') {
    agent.say(data.text);
  } else if (data.action === 'MOVE_TO') {
    agent.moveTo(data.x, data.y, 1200, () => {
      // Send confirmation back to backend LLM agent loop!
      socket.send(JSON.stringify({ status: 'ARRIVED', agentId: data.agentId }));
    });
  }
};
```

---

## 🎨 Sourcing & Importing Open Source (OSS) Asset Kits

To convert procedural sprites into full 16x16 or 32x32 pixel-art animated character sprites:

### Top Recommended Free & Open Source Packs:

1. **[LimeZu Modern Interiors / Office (itch.io - CC BY-SA)](https://limezu.itch.io/moderninteriors)**
   * Desks, computers, water coolers, coffee bars, plants, and 4-direction walking/sitting office worker spritesheets.
2. **[Kenney.nl Micro Urban & Furniture (CC0 Public Domain)](https://kenney.nl/assets)**
   * 100% free vector and tilemap office graphics with zero licensing restrictions.
3. **[Universal LPC Spritesheet Generator (GPL/CC-BY-SA)](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Generator/)**
   * Generate custom 4-direction walking character sheets with business suits, ties, and accessories.

### Loading Spritesheets in Phaser 3:

```javascript
function preload() {
  // Load 32x32 pixel sprite sheet with 4 walk directions
  this.load.spritesheet('office_worker', 'assets/limezu_worker.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create() {
  // Define animation sequences
  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('office_worker', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });

  // Attach to agent
  const sprite = this.add.sprite(0, 0, 'office_worker');
  sprite.play('walk-down');
}
```

---

## 📂 File Directory

```
ScratchTheHardway/OfficeWorker/
├── README.md                          <-- Complete documentation & architectural guide
├── asset_ideation_and_engine_comparison.md <-- Asset spec pipeline & Phaser vs PixiJS/Three.js/Godot comparison
├── programming_narrative_guide.md     <-- Cohesive story & technical narrative (Primitives -> OOP -> Swarms)
├── scratch_to_phaser_guide.md         <-- Scratch to Phaser JS block-by-block conversion guide
├── office_plan_viewer.html            <-- Main portal with tab switcher
├── office_phaser_sim.html             <-- Phaser 3 production simulation engine
├── phaser_sorting_explorer.html       <-- Visual Sorting Algorithm Explorer (Edu)
├── phaser_sorting_explainer.md        <-- Explainer for Sorting Explorer
├── phaser_warehouse_twin.html         <-- Warehouse Logistics Digital Twin (Systems)
├── phaser_warehouse_explainer.md      <-- Explainer for Warehouse Digital Twin
├── office_simulation.html             <-- Canvas2D prototype simulation
├── office_plan_updated.svg            <-- Detailed architectural blueprint SVG
└── office_plan_draft.svg              <-- Initial vector draft
```
