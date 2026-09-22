# Walkthrough: Unified Visual Architecture Studio

## Overview
The Visual Architecture Studio features three complete, interactive visual curriculums accessible via the **Module Switcher** in the top navigation bar:

```
[ 📦 1. FILE PACKAGING ]   |   [ 🗄️ 2. DATABASE & TRANSIT ]   |   [ ⚡ 3. SCRIPT AUTOMATION ]
```

---

## Visual Architecture Modules

### Module 1: File Packaging & Formats
* **01 JSON**: In-memory heap nodes drawn into the Serializer Bus and formatted with elastic braces.
* **02 BINARY / PNG**: Memory hex grid scanned by laser sweep, flipping hex bytes into 24-bit RGB phosphor pixels.
* **03 VECTOR / PDF**: Cartesian coordinate plane with animated plotter crosshair computing cubic Bézier curves (de Casteljau's algorithm).
* **04 ZIP ARCHIVE**: Multi-file tree compressed in hydraulic clamps into a crystallized `.zip` module, with click-to-explode physics decompression.
* **05 PLC / CAD**: Ladder logic sensor registers (%IX0.0, %IW2) serialized into an OPC-UA telemetry frame with CRC16 validation.

### Module 2: Database & API Transit
* **01 INGESTION**: Client registration form packed into HTTP/2 TLS packet, travelling across network hops into the API Gateway.
* **02 DB TABLES**: Relational table `users` with Write-Ahead Log (WAL) commit and B-Tree indexed row insertion.
* **03 CACHE RAM**: In-memory Redis key-value slots showing 0.1ms RAM vs 15ms NVMe Disk latency, with interactive lookup triggers.
* **04 API TRANSIT**: Client `GET /users/usr_94a2` query resolving from cache in 0.2ms and returning back across the wire.
* **05 ASYNC SAAS**: Background event queue decoupling transactional mailers (envelope flyout) and Stripe billing webhooks.

### Module 3: Script Automation & Physical Data Labors
* **01 INPUT / TYPES**: Vibrating conveyor receiving raw text inputs from STDIN (`input()`), with hydraulic casting dies and optical calipers smelting text into strict typed ingots (Cyan String Crate, Gold Float Bullion, Ruby Int Ingot).
* **02 MEMORY / ALU**: Pneumatic chutes depositing variables into addressed silicon RAM lockers (`0x7FFE...`), followed by high-torque clockwork brass gears grinding out multiplication (`total = price * qty`) with electric arcing and dial readouts.
* **03 DISK SCRIBE**: Overcoming storage friction: radial file vault latch unlocking (`flock()`), unspooling perpetual CSV ledger tape, stepping typewriter print-head punching delimiters, and a spinning platter committing magnetic sectors (`fsync()`).
* **04 TEMPLATE LOOM**: Translucent HTML blueprint chassis with hollow stencil sockets (`{{ customer }}`, `{{ total }}`), articulated robotic pick-and-place gantry arms inserting live RAM variables, and a glowing thermal fusion roller welding the page.
* **05 BROWSER DOM**: Dispatching compiled HTML capsules through a pneumatic fiber conduit into the client browser, where a modular chassis of collapsible/expandable DOM shelves (`<header>`, `<table>`, `<tr>`, `<td>`) unpacks into a crisp, hyper-legible formatted receipt with a "200 OK // PAID" verification stamp.

---

## Universal Programming Visual Design System

To ensure all programming concepts remain consistent, reusable, and mathematically vector-sharp across all present and future modules, refer to:
- **Design Tokens & Procedural Component Builders**: [visual_design_system.js](file:///d:/gitFolders/ScratchTheHardway/phaser_visuals/visual_design_system.js)
- **Metaphor & Physical Mechanics Catalog**: [PROGRAMMING_VISUAL_METAPHORS.md](file:///d:/gitFolders/ScratchTheHardway/phaser_visuals/PROGRAMMING_VISUAL_METAPHORS.md)

---

## Running the Application Locally

```cmd
cd d:\gitFolders\ScratchTheHardway\phaser_visuals
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## Manual Verification Checklist for Module 3
1. **Top Bar Navigation**:
   - Verify `[ ⚡ 3. SCRIPT AUTOMATION ]` button glows with electric amber/gold when active.
   - Verify tabs update to: `01 INPUT/TYPES`, `02 MEMORY/ALU`, `03 DISK SCRIBE`, `04 TEMPLATE LOOM`, `05 BROWSER DOM`.
2. **Stage 1 (Input & Type Casting)**:
   - Observe the live STDIN terminal prompt.
   - Confirm raw text crates roll down the vibrating conveyor track and get stamped by the hydraulic die into typed tokens.
3. **Stage 2 (Memory & ALU)**:
   - Confirm RAM lockers highlight at addresses `0x7FFE...`.
   - Watch the brass gears rotate and compute `850.00 × 3 = 2550.00`, routing the product into the `total` locker.
4. **Stage 3 (Disk Scribe)**:
   - Watch the radial vault door unlatch.
   - Observe the typewriter carriage scribe stepping character-by-character along the ledger tape, followed by the spinning magnetic platter commit.
5. **Stage 4 (Template Loom)**:
   - Watch the robotic gantry arm pick values from RAM and insert them into the `{{ ... }}` blueprint stencil sockets.
   - Observe the thermal fusion roller sweep and weld the HTML document.
6. **Stage 5 (Browser DOM)**:
   - Watch the capsule transit through the fiber tube.
   - Observe the DOM shelves cascading open to reveal the styled invoice receipt with the "200 OK // PAID" stamp.
7. **Controls**:
   - Test the GSAP timeline scrubber, 0.5x / 1x / 2x speed buttons, replay, and pause/play.
   - Test the synthesized audio toggle.
