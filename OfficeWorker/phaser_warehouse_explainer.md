# ⚙️ Systems, Simulations & Digital Twins: Warehouse Logistics Digital Twin

This document details the architecture and implementation of the **Warehouse Logistics Digital Twin** built with **Phaser 3** (`phaser_warehouse_twin.html`).

---

## 💡 Overview & Purpose

In modern smart factories and fulfillment centers, thousands of **Automated Guided Vehicles (AGVs)** and Autonomous Mobile Robots (AMRs) navigate complex warehouse environments. Visualizing this stream of telemetry data in real-time requires high performance:
- Standard DOM components (React/Vue `div` tags) suffer performance degradation when animating dozens or hundreds of independent moving agents and particle streams.
- **Phaser 3** leverages hardware-accelerated **WebGL batch rendering**, maintaining 60 FPS while managing complex agent states, dynamic pathing, particle emitters, and live HUD telemetry overlays.

---

## 🛠️ Core Phaser 3 Concepts Implemented

### 1. Multi-layer Compound Agents (`Phaser.GameObjects.Container`)
Each AGV robot is instantiated as a `Phaser.GameObjects.Container`. Instead of managing multiple individual elements separately, the container bundles:
1. **Chassis Graphic**: Vector rectangle with directional triangle indicator.
2. **Payload Box Graphic**: Visible only when carrying cargo.
3. **Label Tag**: Text displaying the AGV unit identifier (e.g. `AGV-01`).

```javascript
const agvContainer = this.add.container(startPoint.x, startPoint.y);

// Add child layers inside container space
agvContainer.add(chassisGraphic);
agvContainer.add(labelTag);
agvContainer.add(cargoBoxGraphic);

// Moving or rotating the container automatically updates all children!
agvContainer.setRotation(angle);
```

### 2. WebGL Particle Systems (`ParticleEmitter`)
Phaser's particle engine provides high-performance visual feedback:

1. **AGV Exhaust Energy Trails**:
   Attached directly to moving AGVs using the `follow: agvContainer` parameter.
   ```javascript
   this.add.particles(0, 0, 'particle_dot', {
     speed: 10,
     scale: { start: 0.8, end: 0 },
     alpha: { start: 0.5, end: 0 },
     lifespan: 400,
     blendMode: 'ADD',
     follow: agvContainer // Locks emitter position to AGV container
   });
   ```

2. **Traffic Bottleneck Heatmap Alert**:
   Located at the Central Sorting Hub intersection. When traffic congestion is triggered, a high-frequency glowing particle emitter activates to signal high-risk traffic zones visually.

### 3. Programmatic Texture Generation
To avoid CORS issues and external image loading dependencies, all particle textures are created in `preload()` using Phaser's `make.graphics()` API:

```javascript
preload() {
  const graphics = this.make.graphics({ x: 0, y: 0, add: false });
  graphics.fillStyle(0xffffff, 1);
  graphics.fillCircle(4, 4, 4);
  graphics.generateTexture('particle_dot', 8, 8);
}
```

---

## 🗺️ Pathfinding & AGV Lifecycle State Machine

AGVs iterate through predetermined warehouse waypoint routes:
$$\text{Inbound Dock} \longrightarrow \text{Storage Aisle} \longrightarrow \text{Sorting Hub} \longrightarrow \text{Outbound Dock} \longrightarrow \text{Charge Bay}$$

```
                ┌────────────────┐
                │   INBOUND DOCK │  (Status: LOADING, Payload = True)
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │ STORAGE AISLES │
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │  SORTING HUB   │  (Bottleneck hazard check)
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │ OUTBOUND DOCK  │  (Status: UNLOADING, Payload = False, Parcels++)
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │  CHARGE BAY    │  (Status: CHARGING, Battery = 100%)
                └────────────────┘
```

### Rotation & Movement Calculation
Before moving between waypoints, the AGV container smooth-rotates to match the directional vector of travel:

```javascript
const angle = Phaser.Math.Angle.Between(current.x, current.y, target.x, target.y);
agv.container.setRotation(angle);
```

---

## 📊 Live Telemetry & Control Dashboard

The HTML layout couples the Phaser WebGL viewport with a real-time HUD built with modern CSS grid:

- **Active AGVs**: Real-time fleet count.
- **Parcels Moved**: Incremented whenever an AGV completes a drop-off at an Outbound Dock.
- **Congestion Risk**: Dynamic metric updated when intersection bottlenecks are simulated.
- **Fleet Telemetry List**: Monitored via a recurring Phaser timer event (`this.time.addEvent`), reflecting individual AGV battery levels and state flags (`MOVING`, `LOADING`, `UNLOADING`, `CHARGING`).

---

## 🚀 Running the Digital Twin Simulation

Open [`phaser_warehouse_twin.html`](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/phaser_warehouse_twin.html) in your browser.

Interactive actions include:
- 📦 **Dispatch New Order Batch**: Simulates bulk incoming orders and flashes camera viewport.
- ⚠️ **Simulate Intersection Bottleneck**: Slows down AGVs passing through the central hub and triggers glowing red warning particles.
- 🤖 **Deploy Additional AGV**: Dynamically spawns new AGVs into the live simulation.
- ⏸️ **Pause / Resume Sim**: Freezes all active tweens and timers.
