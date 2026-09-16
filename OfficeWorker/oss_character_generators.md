# 🛠️ Open-Source Character Builders & Sprite Pipelines for Phaser

This guide details the top **Open-Source Software (OSS) character generator tools** where you can customize 2D characters (body, clothing, hairstyles, accessories), export standardized spritesheets, and pull them directly into Phaser 3 games.

---

## 🌟 Top Open-Source Character Generator Ecosystems

### 1. Universal LPC Character Generator (Most Popular)
- **Live Generator**: [https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Generator/](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Generator/)
- **GitHub Repository**: `LiberatedPixelCopyright/LPC-Spritesheet-Character-Generator` (Open Source - GPL / CC-BY-SA)
- **Features**:
  - Customize body shape, skin tone, hairstyles, facial hair, clothing (suits, shirts, pants, robes), armor, and weapons.
  - Generates complete animation sets: 4-direction **Walk**, **Idle**, **Slash/Attack**, **Thrust**, **Spellcast**, and **Death/Hurt**.
  - **Output**: Standardized `64x64` pixel frame grid PNG.

#### How LPC Spritesheets Map to Phaser 3:
```
LPC Grid Layout (64x64 pixels per frame):
- Row 0 to 3   : Spellcast (Up, Left, Down, Right)
- Row 4 to 7   : Spear Thrust (Up, Left, Down, Right)
- Row 8 to 11  : Walk Cycle (Up, Left, Down, Right - 9 frames per row)
- Row 12 to 15 : Slash/Swing (Up, Left, Down, Right)
- Row 16 to 19 : Bow Shoot (Up, Left, Down, Right)
- Row 20       : Hurt / Fall Down
```

---

### 2. DragonBones (Modular Skeletal & Outfit Customization)
- **GitHub Repository**: Open Source Web Runtime for 2D Skeletal Animation
- **Features**:
  - Uses 2D skeletal bone rigging instead of static frame grids.
  - Allows **Runtime Outfit Swapping**: You can swap character clothes, suits, hair, or weapons live in JavaScript without re-downloading new images!
- **Phaser Integration**: Uses the `phaser-spine` or `DragonBonesPhaser` plugin.

---

### 3. Open-Source AI Sprite Generators (Local Automatic1111 / ComfyUI)
- **Tool**: Stable Diffusion + PixelArt ControlNet + Sprite-Sheet LoRA
- **Features**:
  - Generate custom themed spritesheets from text prompts (e.g. `"Top down cyberpunk office worker, walking 4 directions, pixel art spritesheet"`).
  - Open source model run local on GPU.

---

## 💻 Complete Phaser 3 Code: Loading & Playing LPC Generated Sprites

Here is a complete, production-ready Phaser 3 implementation for loading a character created with the **Universal LPC Generator**:

```javascript
class LPCCharacterScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LPCCharacterScene' });
  }

  preload() {
    // Load LPC Spritesheet (64x64 pixels per frame)
    this.load.spritesheet('lpc_hero', 'assets/custom_lpc_character.png', {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#090d16');

    // -------------------------------------------------------------
    // Define LPC Animation Sequences (Row 8-11: Walk Cycles)
    // -------------------------------------------------------------
    
    // Walk Up (Row 8: Frames 104-112)
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('lpc_hero', { start: 105, end: 112 }),
      frameRate: 10,
      repeat: -1
    });

    // Walk Left (Row 9: Frames 117-125)
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('lpc_hero', { start: 118, end: 125 }),
      frameRate: 10,
      repeat: -1
    });

    // Walk Down (Row 10: Frames 130-138)
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('lpc_hero', { start: 131, end: 138 }),
      frameRate: 10,
      repeat: -1
    });

    // Walk Right (Row 11: Frames 143-151)
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('lpc_hero', { start: 144, end: 151 }),
      frameRate: 10,
      repeat: -1
    });

    // -------------------------------------------------------------
    // Instantiate Player Character & Add Keyboard Controls
    // -------------------------------------------------------------
    this.player = this.physics.add.sprite(400, 300, 'lpc_hero', 130); // Default idle frame 130
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 160;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('walk-left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('walk-right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play('walk-up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play('walk-down', true);
    } else {
      this.player.anims.stop();
    }
  }
}
```

---

## 🛠️ Free Open-Source Texture Packers & Pipeline Utilities

When combining multiple individual character accessory icons or body parts into a single Phaser texture atlas:

1. **[Free Texture Packer (Open Source Web / Desktop)](https://free-tex-packer.com/)**
   - Drag & drop individual PNG frames to auto-generate Phaser 3 JSON Hash/Array texture atlases.
2. **[TexturePacker CLI (OSS Community Scripts)](https://github.com/codeandweb/texturepacker-exporter)**
   - Automates sprite packing via command line in build scripts.
