# Curriculum Walkthrough

## Completed Modules

### 1. Variables & Memory (Python/Pygame)
Introduced variables as labeled memory lockers, complete with raw memory addresses (e.g., `0x101`) to explain the difference between a variable's *name* and its *pointer/value*.

### 2. Output Syntax (Python/Pygame)
Deconstructed the `print("Hello!")` statement using leader lines and brackets to explain each component: the function name, parentheses (container), quotes, and the actual string data.

### 3. Data Structures Progression (Python/Pygame)
An interactive Pygame application demonstrating the "Packing Progression":
*   **Loose Variables:** Scattered memory, unloopable.
*   **Lists (`[]`):** Ordered train cars, loopable by index but lacking semantic meaning.
*   **Dictionaries (`{}`):** Labeled drawers (Key-Value pairs), solving the semantic problem but passive.
*   **Objects with Methods:** Active entities. Demonstrated by looping over a list of `InteractivePet` objects and triggering `.take_damage()` and `.heal()` visually on the whole party.

### 4. Advanced File Packing & Unpacking (Web / Phaser.js)
**We've upgraded from Pygame to a modern Web App architecture!** Using Vite and Phaser 3, the curriculum now supports smooth, physics-based animations with a beautiful HTML/CSS glassmorphic UI overlay.

*   **Stage 1: JSON Serialization:** Watch detached string nodes (`'name': 'Rex'`) dynamically tween and slam together between `{` and `}` braces as they are packed into a JSON string.
*   **Stage 2: Binary & Pictures:** A large hexadecimal grid of bytes (like `FF 00 00`) flips over smoothly in a scanline pattern to reveal colored pixels, proving images are just arrays of numbers!
*   **Stage 3: PDF Documents:** A vector coordinate plane is drawn on screen. When executed, a script physically "stamps" text strings and rectangles onto precise mathematical X/Y coordinates, demonstrating why PDFs never pixelate.
*   **Stage 4: ZIP Archives:** A rigid box sits on the screen. When clicked, Arcade Physics takes over—the box violently shakes and explodes, blasting its constituent files (XML blueprints, PNG textures, and JSON metadata) across the screen with simulated gravity and bounce.

> [!TIP]
> The Phaser web app is currently running in the background via Vite. If you navigate to `http://localhost:5173/` in your browser, you can click "Next Stage" to navigate the concepts and "Step Action >>" (or click the canvas directly) to trigger the spectacular data animations!
