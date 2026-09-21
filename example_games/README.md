# 📦 Box Inspector: Anomaly Walker (Phaser 3)

An interactive 2D arcade quality-control simulation game built using **Phaser 3**. Colorful standardized boxes move along an automated conveyor runway while an autonomous bipedal Inspector Bot paces across them. Exactly one box in every row possesses an out-of-spec anomaly (height or width discrepancy). Players must observe the row, track sensor telemetry, and flag the anomalous box before it clears the inspection line.

---

## 🎮 How to Play

### Controls
| Input | Action |
| :--- | :--- |
| <kbd>SPACE</kbd> or Click **🚨 FLAG ANOMALY** | Flag the box currently under the Inspector Bot's scanner beam |
| **Direct Click** on any Box | Manually flag any suspicious box on the conveyor immediately |
| <kbd>P</kbd> or **Pause Button** | Pause / Resume game run |
| <kbd>M</kbd> or **Audio Button** | Toggle Web Audio synthesizer sounds (Mute / Unmute) |
| <kbd>R</kbd> | Restart the run from Round 1 |
| <kbd>↑</kbd> / <kbd>↓</kbd> or **Speed Buttons** | Adjust walking pace (0.6x, 1.0x, 1.5x, 2.0x) |

### Core Gameplay Mechanics
1. **Conveyor Row Generation**: Each round, 8 vibrant boxes with unique colors (Coral Rose, Cyber Cyan, Amber Gold, Emerald Jade, Royal Violet, etc.) are deployed on the conveyor.
2. **The Out-of-Size Anomaly**: One box in each sequence has an out-of-tolerance dimension:
   - **Rounds 1–3 (Coarse Tolerance)**: ±40% to ±50% size variation (easy visual identification).
   - **Rounds 4–6 (Medium Tolerance)**: ±25% to ±30% size variation.
   - **Rounds 7+ (Precision Tolerance)**: Subtle ±15% to ±16% discrepancy requiring keen observation and HUD sensor readings.
3. **Automated Walking & Scanning**: The bipedal bot steps automatically across the boxes, bobbing smoothly to each box's surface height while projecting an animated downward scanner cone.
4. **Scoring & Multipliers**:
   - **Verified Defect**: +150 Base PTS + Streak Bonus (consecutive detections build a multiplier).
   - **False Alarm**: -50 PTS penalty, streak reset to 0, and loss of 1 shield.
   - **Missed Defect**: If an anomaly escapes unflagged off the conveyor, 1 shield is lost and the siren sounds.
   - **Shields**: Players start with 3 shields. Running out of shields halts the line.

---

## 🚀 Running the Game Locally

The game is completely sovereign and self-contained with zero build steps or npm installations needed. A local copy of `phaser.min.js` is bundled directly alongside the HTML file.

### Windows (Command Prompt / DOS)
Open the game directly in your default browser:

```cmd
start example_games\box_inspector.html
```

Or serve via Python's built-in HTTP server:

```cmd
python -m http.server 8080
```
Then navigate to: `http://localhost:8080/example_games/box_inspector.html`

---

## 🛠️ Open Source Software Audit & Disclosures

### 1. Phaser 3 Game Engine
* **Tool Name:** Phaser
* **Open Source Status:** Open Source (MIT License). Repository: [github.com/phaserjs/phaser](https://github.com/phaserjs/phaser)
* **Active Development Status:** Actively Maintained. Latest release: **v4.2.1 ("Giedi")** in July 2026 / v3.88.x LTS branches with active commits in 2024–2026 by Photon Storm and community contributors.

---

## 💎 Sovereign QOL & Homelab Tools (Quality of Life Gems)

### Tool 1: LivereloadX
* **Tool Name:** LiveReloadX
* **Usage Intro:** A lightweight, sovereign local web server with built-in livereload functionality that automatically refreshes browser tabs upon file modification.
* **The Layman Problem Solved:** Eliminates the frustration of manually pressing F5 or Ctrl+R in the browser every time you edit an HTML, CSS, or Phaser JavaScript file.
* **Open Source Status:** Open Source (MIT License). Repository: [github.com/nitoyon/livereloadx](https://github.com/nitoyon/livereloadx)
* **Active Development Status:** Actively maintained community fork and stable npm utility.

### Tool 2: PocketBase
* **Tool Name:** PocketBase
* **Usage Intro:** An open-source single-binary backend consisting of embedded SQLite with realtime subscriptions, built-in auth, and file storage.
* **The Layman Problem Solved:** Provides an instant, zero-configuration local backend for persisting game high-scores, user settings, and leaderboards without having to spin up complex cloud databases.
* **Open Source Status:** Open Source (MIT License). Repository: [github.com/pocketbase/pocketbase](https://github.com/pocketbase/pocketbase)
* **Active Development Status:** Actively Maintained. Frequent weekly/monthly commits with over 45k GitHub stars.

### Tool 3: Leshy SpriteSheet Tool
* **Tool Name:** Leshy SpriteSheet Tool
* **Usage Intro:** A browser-first, offline-capable sprite packer and atlas generator designed specifically for 2D engines like Phaser, PixiJS, and Godot.
* **The Layman Problem Solved:** Automatically bundles individual PNG sprite frames into a unified compact spritesheet and exports Phaser-compatible JSON texture atlases without installing heavy desktop applications.
* **Open Source Status:** Free Web & Self-Hostable Offline Tool ([leshylabs.com/apps/sstool](https://www.leshylabs.com/apps/sstool/)).
* **Active Development Status:** Actively maintained stable utility for indie game developers.

### Tool 4: Jfxr
* **Tool Name:** Jfxr Sound Synthesizer
* **Usage Intro:** A sovereign, browser-based chiptune and procedural sound generator inspired by sfxr, allowing direct export of WAV audio and custom synth presets.
* **The Layman Problem Solved:** Allows developers to craft retro 8-bit/16-bit sound effects (jumps, laser sweeps, alarms, coin chimes) without needing audio editing software like Audacity or commercial DAW plugins.
* **Open Source Status:** Open Source (MIT License). Repository: [github.com/ttencate/jfxr](https://github.com/ttencate/jfxr)
* **Active Development Status:** Stable, community-curated open-source tool.
