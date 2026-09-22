# 📘 Engineering Learnings & Technical Post-Mortem

This document records the architectural mistakes, missed design concepts, and exact code corrections made during the development of the **Phaser + GSAP Physical Automation Pipeline** (`phaser_visuals`).

---

## 📋 Summary of Issues & Resolutions

| # | Component | Issue / Error Encountered | Underlying Concept Missed | Correction Applied |
|---|---|---|---|---|
| **1** | Type Foundry (`visual_design_system.js`) | `Uncaught TypeError: Phaser.Geom.Point is not a constructor` | Bundled ES module API exposure & Graphics polygon internals | Replaced `fillPoints()` and point classes with pure Canvas path methods (`beginPath`, `moveTo`, `lineTo`, `closePath`, `fillPath`, `strokePath`) and plain `{ x, y }` objects. |
| **2** | Disk Persistence (`automation_scenes.js`) | Double commas (`ORD-9021,,Elena,,...`) on replay/scrub | Closure state mutation inside GSAP timeline callbacks | Replaced mutable closure accumulator (`assembled += tok`) with idempotent slice: `tokens.slice(0, idx + 1).join('')`. |
| **3** | Ledger Scribe (`automation_scenes.js`) | Dual guide rails overlapping top of `orders.csv` sheet | Container relative vs global coordinate math | Shifted `this.scribe` Y position from `cy - 30` to `cy - 85`, creating a clean 43px vertical clearance above the document. |
| **4** | DOM Viewport (`automation_scenes.js`) | Browser shelf displayed pre-filled text before packets arrived | Narrative lifecycle synchronization; failure to decouple creation from hydration | Initialized shelves with empty values (`''`) and `alpha: 0`; added `expandAndPopulate(incomingValue)` and `resetDOM()` to start 100% blank. |
| **5** | Ingestion Conveyor (`automation_scenes.js`) | Raw data blob dropped outside conveyor bed bounds | Container coordinate boundary math across sibling containers | Widened conveyor bed from 560px to 680px and shifted center to `cx + 20`, spanning continuously from `cx - 320` to `cx + 360` directly under the chute. |

---

## 1. The Geometry API & Polygon Constructor Failure

### 🚨 The Error
```text
visual_design_system.js:235 Uncaught TypeError: Phaser.Geom.Point is not a constructor
    at createIrregularDataBlob (visual_design_system.js:235:9)
    at SceneInputDepot.create (automation_scenes.js:118:24)
```

### 🧠 The Concept Missed
1. **ES Module Isolation**: In standard Vite modular builds (`import Phaser from 'phaser'`), Phaser's namespaces are not bound to the global `window.Phaser` object.
2. **Phaser Geometry Instantiation**: In many modular builds of Phaser 3/4, `Phaser.Geom.Point` is either an internal structure, a factory function, or not exposed as a constructor. Calling `new Phaser.Geom.Point(x, y)` crashes at runtime.
3. **Internal Dependencies of `graphics.fillPoints`**: Passing an array of objects to `graphics.fillPoints(points, true)` invokes Phaser's internal point handling, which may attempt to validate or instantiate point geometry.

### ❌ Problematic Code
```javascript
// BROKEN: Depended on Phaser.Geom.Point constructor and fillPoints
const points = [
    new Phaser.Geom.Point(-w/2 + 6, -h/2 + 10),
    new Phaser.Geom.Point(-10, -h/2 - 4),
    // ...
];
graphics.fillPoints(points, true);
graphics.strokePoints(points, true);
```

### ✅ Corrected Code
```javascript
// CORRECT: Pure coordinate primitives and standard Canvas Graphics path methods
const points = [
    { x: -w/2 + 8, y: -h/2 + 10 },
    { x: -12, y: -h/2 - 5 },
    { x: w/2 - 6, y: -h/2 + 6 },
    { x: w/2 + 14, y: 2 },
    { x: w/2 - 6, y: h/2 + 8 },
    { x: 10, y: h/2 + 5 },
    { x: -w/2 - 8, y: h/2 - 3 },
    { x: -w/2 + 6, y: -6 }
];

// Standard graphics path methods (100% constructor-independent)
graphics.beginPath();
graphics.moveTo(points[0].x, points[0].y);
for (let i = 1; i < points.length; i++) {
    graphics.lineTo(points[i].x, points[i].y);
}
graphics.closePath();
graphics.fillPath();
graphics.strokePath();
```

---

## 2. Stateful Mutation in Scrubbable GSAP Timelines (Double Comma Bug)

### 🚨 The Error
When typing tokens onto the ledger file, commas were duplicated:
```text
ORD-9021,,Elena,,Sensor,,3,,$2550.00
```
This error worsened whenever the user scrubbed backwards and replayed the timeline.

### 🧠 The Concept Missed
**Idempotence in Timeline Callbacks**:
A GSAP timeline is not a linear script; it is a bidirectional time-scrubbing engine. Any `.call()` or tween callback that mutates state across ticks will corrupt when scrubbed or restarted.
Declaring `let assembled = ''` outside the loop and doing `assembled += tok` in each tick persisted mutated state across replays.

### ❌ Problematic Code
```javascript
// BROKEN: Mutating accumulator in closure
let assembled = '';
tokens.forEach((tok, idx) => {
    tl.call(() => {
        assembled += tok; // Mutates accumulator on every scrub or replay!
        this.ledgerText.setText(assembled);
    });
});
```

### ✅ Corrected Code
```javascript
// CORRECT: Pure, stateless slice based on index
const tokens = ['ORD-9021', ',', 'Elena', ',', 'Sensor', ',', '3', ',', '$2550.00'];

tokens.forEach((tok, idx) => {
    tl.call(() => {
        sfx.typewriterStamp();
        // Deterministic slice: strictly slice tokens up to current index
        const currentStr = tokens.slice(0, idx + 1).join('');
        this.ledgerText.setText(currentStr);
        this.scribe.userData.strike();
    });
});
```

---

## 3. Spatial Boundary Collision Across Relative Containers

### 🚨 The Error
The dual guide rails of the scribe carriage overlapped directly onto the header bar of `orders.csv`.

### 🧠 The Concept Missed
**Local vs World Coordinate Offsets**:
- Scribe Head container: `cy - 30`. Rails were placed at local `y = -32` and `y = +32`.
  - World Y of lower rail = `(cy - 30) + 32 = cy + 2`.
- Document Sheet (`this.anvil`): `cy + 60`, with height = 140px (half-height = 70px).
  - World Y of top sheet edge = `(cy + 60) - 70 = cy - 10`.
- Because `cy + 2 > cy - 10`, the lower rail intersected 12px deep into the document header.

### ❌ Problematic Code
```javascript
// BROKEN: Overlapping coordinates
this.anvil = this.add.container(cx + 80, cy + 60);       // Top edge at cy - 10
this.scribe = createLedgerPrinterHead(this, cx + 80, cy - 30); // Rail at cy + 2 (Overlap!)
```

### ✅ Corrected Code
```javascript
// CORRECT: Shifted scribe head upward to cy - 85
this.anvil = this.add.container(cx + 80, cy + 60);       // Top edge at cy - 10
this.scribe = createLedgerPrinterHead(this, cx + 80, cy - 85); // Rail at cy - 53 (43px clearance!)
```

---

## 4. Premature Data Hydration in Narrative Stages

### 🚨 The Error
When switching to the DOM Placement stage, the browser viewport was already pre-filled with customer data before the data stream had traveled through the fiber conduit.

### 🧠 The Concept Missed
**Narrative Immersion & Zero-State Lifecycle**:
In educational simulations that demonstrate data transmission, the receiving system must start completely empty. Pre-populating DOM shelf nodes during scene creation breaks the visual metaphor of "code pushing data into the browser".

### ❌ Problematic Code
```javascript
// BROKEN: Populated immediately upon container construction
this.shelfHeader = this.browserRack.userData.addShelf(-70, 'header', 'CUSTOMER INVOICE', '#ORD-9021', 0x00f0ff);
this.shelfCust = this.browserRack.userData.addShelf(-18, 'div.client', 'CLIENT NAME', 'Elena Rostova', 0xffd600);
// Shelves were created with full data, visible immediately!
```

### ✅ Corrected Code
```javascript
// 1. Initialized with empty values and hidden alpha
this.shelfHeader = this.browserRack.userData.addShelf(-70, 'header', 'CUSTOMER INVOICE', '', 0x00f0ff);
this.shelfCust = this.browserRack.userData.addShelf(-18, 'div.client', 'CLIENT NAME', '', 0xffd600);
this.shelfItems = this.browserRack.userData.addShelf(34, 'table.items', 'ORDERED ITEMS', '', 0x00ff88);
this.shelfTotal = this.browserRack.userData.addShelf(86, 'footer.total', 'GRAND TOTAL DUE', '', 0xff3366);

// 2. Initial timeline reset clears all data and displays empty state placeholder
tl.call(() => {
    this.browserRack.userData.resetDOM();
    this.paidStamp.setAlpha(0);
});

// 3. Sequentially populated only when data packets physically arrive
tl.to(this.streamCust, { alpha: 1, x: cx - 10, y: cy - 18, duration: 0.35, ease: 'power2.out' });
tl.call(() => {
    sfx.snap();
    this.shelfCust.expandAndPopulate('Elena Rostova'); // Values dynamically injected here!
    this.streamCust.setAlpha(0);
});
```

---

## 5. Conveyor Bed Span & Chute Alignment

### 🚨 The Error
The raw data blob dropped straight down from the terminal's dispense chute into empty space, missing the conveyor track completely.

### 🧠 The Concept Missed
**Global Positioning of Sibling Systems**:
- Terminal console was centered at `termX = cx - 310`.
- Chute was at local `x = 60`, which translates to world X: `cx - 310 + 60 = cx - 250`.
- Conveyor was centered at `cx + 80` with a width of 560px (half-width = 280px).
  - Leftmost edge of conveyor = `cx + 80 - 280 = cx - 200`.
- The blob was dropping at `cx - 250`, which was 50px to the left of the conveyor bed!

### ❌ Problematic Code
```javascript
// BROKEN: Conveyor left edge stops at cx - 200, missing chute at cx - 250
this.conveyor = this.add.container(cx + 80, trackY);
const trackBed = this.add.rectangle(0, 0, 560, 32, 0x151c2e, 1);
```

### ✅ Corrected Code
```javascript
// CORRECT: Conveyor centered at cx + 20 with 680px width (left edge at cx - 320)
this.conveyor = this.add.container(cx + 20, trackY);
const trackBed = this.add.rectangle(0, 0, 680, 32, 0x151c2e, 1);
// Drop point cx - 250 is now safely centered on the conveyor bed!
```

---

## 💡 Key Takeaways for Future Animations
1. **Always use standard canvas drawing primitives** (`beginPath`, `moveTo`, `lineTo`, `closePath`, `fillPath`, `strokePath`) for custom polygon shapes in Phaser instead of engine-specific geometry constructors.
2. **Never mutate external state variables inside GSAP timeline callbacks**. Keep all string construction, visibility updates, and progress calculations strictly deterministic using pure functions and array slices.
3. **Calculate container boundaries in world coordinates** before positioning sibling elements to prevent spatial gaps or visual collisions.
4. **Decouple structure creation from data hydration** in interactive UI animations so that zero-state / awaiting-stream visuals can be presented accurately before data arrival.
5. **Maintain strict modularity via dedicated subsystem files**: When introducing new architectural domains (e.g., ORM & Relational DB), implement fresh design system factories (`orm_design_system.js`) and scene modules (`orm_scenes.js`) rather than bloating existing files. This prevents accidental regressions in previously stabilized stages.
