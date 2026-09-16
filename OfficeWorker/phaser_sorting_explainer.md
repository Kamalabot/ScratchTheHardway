# 🎓 Educational & Interactive Learning: Visual Sorting Algorithm Explorer

This document explains the architecture and implementation details of the **Visual Sorting Algorithm Explorer** built with **Phaser 3** (`phaser_sorting_explorer.html`).

---

## 💡 Overview & Learning Objectives

Standard DOM-based sorting visualizers rely on updating CSS height/transform properties directly on `<div>` elements. While functional, they can suffer from layout thrashing, frame drops, and awkward animation handling when elements cross paths during swaps.

By leveraging **Phaser 3**, we get:
1. **Hardware-Accelerated Rendering (WebGL/Canvas)**: Silky smooth 60 FPS transitions even with dozens of elements.
2. **First-class Tween Engine**: Built-in interpolation curves (`Cubic.out`, `Quad.out`, `yoyo`) for realistic arching swap physics.
3. **Compound Game Objects (`Containers`)**: Coupling rectangle graphics and text labels into unified movable entities.

---

## ⚙️ Core Phaser 3 Features Used

### 1. `Phaser.GameObjects.Graphics`
Instead of loading external image sprites, each array block is drawn programmatically on-the-fly using standard vectors:

```javascript
drawBarGraphic(graphics, width, height, color) {
  graphics.clear();
  
  // Dynamic rounded rectangle fill
  graphics.fillStyle(color, 0.85);
  graphics.fillRoundedRect(-width / 2, -height / 2, width, height, 6);

  // Subtle top border highlight
  graphics.lineStyle(2, 0xffffff, 0.3);
  graphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 6);
}
```

### 2. `Phaser.GameObjects.Container`
Each element in the sorting array is managed as a `Container` combining:
- A `Graphics` object (the vertical bar).
- A `Text` object (the numerical value label attached below the bar).

```javascript
const container = this.add.container(x, y);
container.add(barGraphic);
container.add(textLabel);
```
When moving or tweening the container, both the bar and its label move together effortlessly without manual recalculations.

### 3. Smooth Arching Tweens (`this.tweens.add`)
When swapping two array elements, standard linear movement can look flat. Phaser's Tween engine allows us to introduce a vertical arc during horizontal movement:

```javascript
// Arching swap tween
this.tweens.add({
  targets: barA,
  x: targetXA,
  y: barA.y - 25, // Lift element A upwards during swap
  duration: animSpeed * 0.5,
  ease: 'Quad.out',
  yoyo: true,     // Automatically returns Y position back to baseline
  onComplete: () => {
    barA.userData.index = j;
  }
});
```

---

## 🏗️ Architecture & State Machine

The visualizer decouples **Algorithm Logic** from **Rendering Execution** using ES6 JavaScript Generator Functions (`function*`).

```
┌───────────────────────────┐      yield op      ┌───────────────────────────┐
│ Generator Function        │ ─────────────────> │ Step Executor             │
│ (Bubble / Quick / Insert) │                    │ (Triggers Phaser Tweens) │
└───────────────────────────┘                    └───────────────────────────┘
                                                               │
                                                               ▼
                                                 ┌───────────────────────────┐
                                                 │ Phaser Canvas Update      │
                                                 │ (Color & Position Swaps)  │
                                                 └───────────────────────────┘
```

### Step Generator Example (Bubble Sort)
```javascript
function* bubbleSortGen() {
  const n = arrayValues.length;
  let arr = [...arrayValues];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // 1. Yield comparison state
      yield { type: 'compare', indices: [j, j + 1], msg: `Comparing ${arr[j]} & ${arr[j+1]}` };
      
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // 2. Yield swap state
        yield { type: 'swap', indices: [j, j + 1], msg: `Swapping elements` };
      }
    }
    // 3. Mark sorted element
    yield { type: 'sorted', indices: [n - 1 - i] };
  }
}
```

### Why Use Generators?
- **Step-by-step Execution**: Clicking **"Step"** simply calls `.next()` on the generator once.
- **Auto-Play Control**: Playing auto-advances when Phaser's `onComplete` tween callback fires.
- **Zero Callback Hell**: Algorithms remain pure, clean, and synchronous in code structure.

---

## 🎨 Color Coding Legend

- 🟦 **Default (`#38bdf8`)**: Unsorted idle state.
- 🟨 **Comparing (`#f59e0b`)**: Currently being compared by the algorithm.
- 🟪 **Pivot / Key (`#8b5cf6`)**: Target key or partition pivot (Quick / Selection / Insertion).
- 🌸 **Swapping (`#ec4899`)**: Active animation exchange.
- 🟩 **Sorted (`#10b981`)**: Confirmed final ordered placement.

---

## 🔊 Audio Synthesis (Web Audio API)
Each comparison or swap triggers pitch-modulated synthesized sine waves:
$$\text{Frequency} = 200 + (\text{Bar Value} \times 15) \text{ Hz}$$
Higher array values emit higher pitches, creating an intuitive auditory pattern during array sorting.

---

## 🚀 Running the Visualizer

Open [`phaser_sorting_explorer.html`](file:///d:/gitFolders/ScratchTheHardway/OfficeWorker/phaser_sorting_explorer.html) directly in any modern Web browser.

Controls include:
- **Algorithm Selector**: Switch between Bubble, Selection, Insertion, and Quick Sort.
- **Elements Slider**: Adjust array density from 8 to 32 items.
- **Speed Slider**: Accelerate or slow down tween transition speeds.
- **Play / Pause / Step / Shuffle**: Full playback control.
