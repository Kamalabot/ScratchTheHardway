# Phaser.js Code Explanation

This guide breaks down the code for the two interactive Phaser examples we created: the **External Assets & Input** example and the **Feature Showcase** example.

---

## 1. External SVG & Mouse Input (`phaser_external_assets.html`)

This example demonstrates how to load an external file (your SVG blueprint) and apply interactive game mechanics (Point & Click movement, Drag & Drop) on top of it.

### A. Loading the External SVG
```javascript
preload() {
    this.load.svg('office_bg', 'office_plan_updated.svg', { width: 1400, height: 900 });
}
```
Phaser uses WebGL/Canvas, which are pixel-based (raster). When you load an SVG (which is vector-based), Phaser needs to rasterize it into a texture. By passing `{ width: 1400, height: 900 }`, we tell Phaser exactly what resolution to render the SVG at so it remains crisp and fits our canvas.

### B. Point & Click Movement
We want the agent to walk smoothly to wherever the user clicks, just like a strategy or tycoon game.
```javascript
this.input.on('pointerdown', (pointer) => {
    // 1. Calculate distance between agent and the click
    const distance = Phaser.Math.Distance.Between(this.agent.x, this.agent.y, pointer.x, pointer.y);
    
    // 2. Calculate duration to maintain a constant speed (Distance / Speed)
    const speed = 300; 
    const duration = (distance / speed) * 1000;

    // 3. Trigger the Tween
    this.moveTween = this.tweens.add({
        targets: this.agent,
        x: pointer.x,
        y: pointer.y,
        duration: duration,
        ease: 'Power1' // Provides a slight acceleration/deceleration curve
    });
});
```
Instead of writing complex math in an `update()` loop to move the agent pixel-by-pixel, we use a **Tween**. We calculate the time (`duration`) it should take based on the distance, ensuring the agent doesn't move faster during long trips and slower during short trips.

### C. Drag & Drop Mechanics
```javascript
// Enable interactivity and dragging on an object
folder.setInteractive({ cursor: 'pointer' });
this.input.setDraggable(folder);

// Global event: Update coordinates as the mouse moves
this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    gameObject.x = dragX;
    gameObject.y = dragY;
});
```
Phaser has a robust drag-and-drop API built-in. By flagging an object as draggable, Phaser fires global `dragstart`, `drag`, and `dragend` events. We simply update the object's `x` and `y` coordinates to match the `dragX` and `dragY` provided by the pointer.

---

## 2. Feature Showcase (`phaser_showcase.html`)

This example demonstrates Phaser's physics engine, particle systems, and continuous tweens without loading any external files (it generates its own graphics programmatically).

### A. Arcade Physics (Gravity & Collisions)
```javascript
// Add a dynamic bouncing ball
this.bouncingBall = this.physics.add.image(400, 100, 'ball');
this.bouncingBall.setBounce(0.9);
this.bouncingBall.setCollideWorldBounds(true);

// Add a static floor
this.floor = this.add.rectangle(400, 580, 800, 40, 0x334155);
this.physics.add.existing(this.floor, true); // The 'true' flag makes it static

// Tell the engine these two objects should collide
this.physics.add.collider(this.bouncingBall, this.floor);
```
Arcade physics automatically applies gravity (defined in the game `config`). 
*   **Dynamic Bodies** (the ball) are affected by gravity, velocity, and collisions.
*   **Static Bodies** (the floor) never move.
*   The `collider` function is the magic bridge: it tells the engine to prevent these two objects from passing through each other.

### B. Infinite Tweens (Spinning Box)
```javascript
this.tweens.add({
    targets: this.spinningBox,
    angle: 360, 
    duration: 2000,
    repeat: -1, // Infinite loop
    ease: 'Linear' // Constant speed, no acceleration
});
```
This tween rotates the box from its current angle to 360 degrees over 2 seconds. The `repeat: -1` flag tells it to loop forever. Using `ease: 'Linear'` ensures the rotation doesn't speed up or slow down at the start or end of the loop, resulting in a perfect continuous spin.

### C. Particle Systems & Pointer Tracking
```javascript
// Setup the emitter rules
this.emitter = this.add.particles(0, 0, 'particle', {
    speed: { min: -100, max: 100 },
    scale: { start: 1, end: 0 },
    lifespan: 1000,
    blendMode: 'ADD' // Creates a glowing effect
});

// Update emitter position when the mouse moves
this.input.on('pointermove', (pointer) => {
    this.emitter.setPosition(pointer.x, pointer.y);
});
```
Particle emitters generate lightweight visual effects. We configure rules (e.g., particles live for 1000ms, start at scale 1 and shrink to scale 0). By hooking into the `pointermove` event, we continuously update the emitter's origin to match the mouse cursor, creating a trailing effect.
