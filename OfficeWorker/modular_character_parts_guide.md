# 🎭 Modular Face Parts, Outfits & Avatar Asset Repositories

This guide lists the top **Open-Source (CC0 / MIT / CC-BY)** modular asset libraries where **face parts** (eyes, eyebrows, mouths, glasses, hair) and **body outfits** (suits, shirts, jackets, pants, shoes) are provided as separate, stackable PNG/SVG layers.

---

## 📦 Top Modular Character Part Repositories

### 1. Universal LPC Raw Modular Spritesheet Parts (2D Pixel Art)
- **GitHub Directory**: [https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Generator/tree/master/spritesheets](https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Generator/tree/master/spritesheets)
- **License**: CC-BY-SA / GPL
- **Raw PNG Parts Included**:
  - `body/` — Male, female, child bodies in 8 skin tones.
  - `eyes/` — 12+ eye styles and colors (blue, green, brown, red).
  - `hair/` — 60+ hairstyles (short, long, ponytail, afro, mohawk, braids).
  - `head/` — Beards, moustaches, glasses, masks, hats, helmets.
  - `torso/` — Business suits, jackets, dress shirts, vests, hoodies, armor.
  - `legs/` — Dress pants, jeans, skirts, shorts.
  - `feet/` — Leather shoes, boots, sneakers, sandals.

---

### 2. Open Peeps (Hand-Drawn Vector & Raster Library)
- **Website**: [https://www.openpeeps.com/](https://www.openpeeps.com/)
- **License**: **CC0 (100% Free Public Domain)**
- **Features**:
  - Over **584,000+ possible character combinations**.
  - Separate modular layers for **Faces** (expressions, eyes, smiles, glasses), **Hairstyles**, **Torsos** (business suits, hoodies, jackets), and **Standing/Sitting Poses**.
  - Available as SVG, PNG, and Figma/Sketch component libraries.

---

### 3. Avataaars (Clean Modern Vector Avatar Parts)
- **Website**: [https://avataaars.com/](https://avataaars.com/)
- **GitHub Repository**: `fangpenlin/avataaars`
- **License**: MIT
- **Modular Parts**:
  - **Top/Hair**: 30+ hair options (Curly, Straight, Dreads, Hat, Turban).
  - **Accessories**: Glasses, Sunglasses, Eyepatch.
  - **Facial Hair**: Beards, Moustaches.
  - **Eyes & Eyebrows**: Surprised, Happy, Wink, Serious, Sad.
  - **Mouth**: Smile, Laugh, Neutral, Tongue out.
  - **Clothes**: Blazer, Sweater, Graphic Shirt, Overall, Hoodie.

---

### 4. DiceBear Open-Source Avatar Engine
- **Website**: [https://www.dicebear.com/](https://www.dicebear.com/)
- **GitHub Repository**: `dicebear/dicebear`
- **License**: MIT / CC0
- **Features**:
  - Generates modular SVG characters on-the-fly via JavaScript code or REST API.
  - Includes 20+ art styles (*Adventurer*, *Lorelei*, *Bottts*, *Personas*, *Micah*).
  - Allows programmatically combining specific `eyes`, `mouth`, `hair`, `clothing`, and `accessories`.

```javascript
// Example: Programmatically fetching a custom modular avatar SVG
const avatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?' +
  'hair=shortCombover&clothing=blazerAndShirt&eyes=happy&mouth=smile';
```

---

### 5. Kenney.nl Modular Character Parts
- **Website**: [https://kenney.nl/assets/toon-characters-1](https://kenney.nl/assets/toon-characters-1)
- **License**: **CC0 (Public Domain)**
- **Features**:
  - Contains separate vector and PNG files for heads, eyes, mouths, bodies, arms, and legs.
  - Ideal for rigging top-down or side-scrolling modular sprites.

---

## 🛠️ How to Stack & Combine Modular Parts in JavaScript

In Phaser 3 or HTML5 Canvas, you can stack modular layers dynamically into a single `Container` or render them onto a Canvas texture:

```javascript
class ModularCharacterScene extends Phaser.Scene {
  preload() {
    // Load individual modular layer PNGs
    this.load.image('layer_body', 'assets/parts/body_male.png');
    this.load.image('layer_eyes', 'assets/parts/eyes_blue.png');
    this.load.image('layer_hair', 'assets/parts/hair_combover.png');
    this.load.image('layer_suit', 'assets/parts/suit_cyan.png');
  }

  create() {
    // Stack modular parts in a Phaser Container (Bottom to Top)
    const character = this.add.container(400, 300);

    const body = this.add.image(0, 0, 'layer_body');
    const eyes = this.add.image(0, 0, 'layer_eyes');
    const suit = this.add.image(0, 0, 'layer_suit');
    const hair = this.add.image(0, 0, 'layer_hair');

    // Add layers in z-index order
    character.add([body, eyes, suit, hair]);
  }
}
```
