import Phaser from 'phaser';

/**
 * ============================================================================
 * UNIVERSAL PROGRAMMING VISUAL DESIGN SYSTEM & COMPONENT FACTORY (1.5x SCALE)
 * ============================================================================
 * 
 * Standardizes visual representation, color coding, geometry, and motion
 * for computer science and software engineering concepts across all Phaser 
 * and GSAP animations.
 * 
 * Core Philosophy:
 * - High-DPI Procedural Vector Aesthetics (no blurry pixelated sprites)
 * - 1.5x Expanded Scale for high legibility, grand presentation, and clear physical mechanics
 * - Literal Physical Contact & Compression (Casting dies pressing onto irregular data)
 * - Word-wrapped, fitted typography in bounded rectangles
 * - Modular, Reusable Builders with comprehensive parameterization
 */

// ============================================================================
// 1. UNIVERSAL COLOR PALETTE & TYPE SYSTEM
// ============================================================================
export const VISUAL_TOKENS = {
    // Canvas & Frame Theme
    bg: {
        canvas: '#07090e',
        panel: 0x0c111e,
        panelBorder: 0x1e293b,
        gridLine: 0x161e2e,
        glowCyan: 0x00f0ff,
        glowAmber: 0xffaa00,
        glowMagenta: 0xff007f
    },

    // Standard Programming Data Types
    types: {
        string: {
            color: 0x00f0ff,       // Neon Cyan
            hexStr: '#00f0ff',
            bg: 0x06283d,
            label: 'STR',
            icon: '“abc”',
            metaphor: 'Flexible woven ribbon or cushioned crate holding variable-length UTF-8 text'
        },
        integer: {
            color: 0xff3366,       // Vivid Ruby / Carmine
            hexStr: '#ff3366',
            bg: 0x330814,
            label: 'INT',
            icon: '42',
            metaphor: 'Discrete solid cast-iron/ruby ingot with fixed 32/64-bit boundaries'
        },
        float: {
            color: 0xffd600,       // Radiant Gold
            hexStr: '#ffd600',
            bg: 0x332800,
            label: 'FLOAT',
            icon: '3.14',
            metaphor: 'Chiseled IEEE-754 gold bullion with fractional decimal divider notch'
        },
        boolean: {
            color: 0x00ff88,       // Phosphor Green
            hexStr: '#00ff88',
            bg: 0x042f1a,
            label: 'BOOL',
            icon: '⏻',
            metaphor: 'Bistable knife-switch or dual-state illuminated relay coil'
        },
        array: {
            color: 0x9d4edd,       // Royal Violet
            hexStr: '#9d4edd',
            bg: 0x220938,
            label: 'LIST[]',
            icon: '[..]',
            metaphor: 'Linked train wagons or segmented compartmentalized magazine'
        },
        object: {
            color: 0xff7700,       // Electric Orange
            hexStr: '#ff7700',
            bg: 0x331800,
            label: 'DICT{}',
            icon: '{k:v}',
            metaphor: 'Multi-drawer pigeonhole rack with hashed key slots'
        }
    },

    // Machine Hardware & Systems Layer
    hardware: {
        ram: {
            base: 0x111625,
            edge: 0x00f0ff,
            busWire: 0x00a8cc,
            addrText: '#6272a4'
        },
        alu: {
            brassDark: 0x785318,
            brassLight: 0xd4a342,
            gearTooth: 0x3e2c0e,
            spark: 0xfff3a8
        },
        disk: {
            platterMetal: 0x1e2638,
            trackGlow: 0x00ff88,
            stylusArm: 0x94a3b8,
            laserBeam: 0xff0055,
            vaultIron: 0x0f172a
        },
        template: {
            blueprintBg: 0x0b2545,
            blueprintLine: 0x134074,
            socketCutout: 0x8da9c4,
            thermalGlow: 0xff5500
        },
        network: {
            conduitGlass: 0x1e3a5f,
            packetCapsule: 0x38bdf8,
            pulseLight: 0x00ffff
        },
        dom: {
            shelfWoodDark: 0x141b2d,
            shelfRail: 0x334155,
            nodeBox: 0x1e293b,
            tagGold: 0xf59e0b,
            textLight: '#f8fafc'
        }
    }
};

// ============================================================================
// 2. PROCEDURAL VECTOR GRAPHIC BUILDERS (SCALED 1.5x)
// ============================================================================

/**
 * Creates a high-DPI RAM Memory Lockbox container (1.5x Scale).
 * Features: Outer chamfered shell, hex address badge, variable nameplate, and value receptacle.
 */
export function createMemoryLocker(scene, x, y, varName, initialVal, typeKey = 'string') {
    const typeInfo = VISUAL_TOKENS.types[typeKey] || VISUAL_TOKENS.types.string;
    const container = scene.add.container(x, y);

    const width = 260;   // 1.5x scale (was 175)
    const height = 76;   // 1.5x scale (was 54)

    // 1. Drop shadow
    const shadow = scene.add.rectangle(6, 6, width, height, 0x000000, 0.5);

    // 2. Main chassis body
    const body = scene.add.rectangle(0, 0, width, height, 0x0e1320, 0.96);
    body.setStrokeStyle(2, typeInfo.color, 0.75);

    // 3. Hex RAM Address Tag (Top Left)
    const randomAddr = '0x' + (0x7FFE00 + Math.floor(Math.random() * 0xFFF)).toString(16).toUpperCase();
    const addrTag = scene.add.text(-width / 2 + 12, -height / 2 + 8, randomAddr, {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: '#6272a4',
        fontStyle: 'bold'
    });

    // 4. Type Identifier Chip (Top Right)
    const typeChipBg = scene.add.rectangle(width / 2 - 32, -height / 2 + 14, 46, 18, typeInfo.color, 0.2);
    typeChipBg.setStrokeStyle(1.5, typeInfo.color, 0.9);
    const typeChipText = scene.add.text(width / 2 - 32, -height / 2 + 14, typeInfo.label, {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        color: typeInfo.hexStr,
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // 5. Variable Name & Value Display with Word Wrap & Padding
    const varLabel = scene.add.text(-width / 2 + 12, 10, varName, {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14px',
        color: '#94a3b8',
        fontStyle: 'bold'
    });

    const valDisplay = scene.add.text(width / 2 - 12, 8, String(initialVal), {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold',
        wordWrap: { width: width * 0.55, useAdvancedWrap: true }
    }).setOrigin(1, 0);

    // 6. Bus Connector Nodes (Top & Bottom Pips)
    const topPip = scene.add.circle(0, -height / 2, 4, typeInfo.color, 0.9);
    const bottomPip = scene.add.circle(0, height / 2, 4, typeInfo.color, 0.9);

    container.add([shadow, body, addrTag, typeChipBg, typeChipText, varLabel, valDisplay, topPip, bottomPip]);

    container.userData = {
        body,
        varLabel,
        valDisplay,
        typeInfo,
        width,
        height,
        setValue: (newVal) => {
            valDisplay.setText(String(newVal));
        },
        flashHighlight: (duration = 0.4) => {
            scene.tweens.add({
                targets: body,
                strokeColor: 0xffffff,
                fillColor: 0x1a263d,
                duration: duration * 500,
                yoyo: true,
                ease: 'power2.out'
            });
        }
    };

    return container;
}

/**
 * Creates an Irregular, Mis-shapen Raw Input Data Blob.
 * Used for data arriving from STDIN before casting die reshapes it.
 */
export function createIrregularDataBlob(scene, x, y, rawText, typeKey = 'string') {
    const typeInfo = VISUAL_TOKENS.types[typeKey] || VISUAL_TOKENS.types.string;
    const container = scene.add.container(x, y);

    const w = 150;
    const h = 54;

    // Draw an irregular, organic, jagged polygon
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x1a2233, 0.95);
    graphics.lineStyle(2.5, 0x64748b, 1);

    // Asymmetric rough polygon vertices (pure coordinate primitives)
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

    // Raw unparsed text (with spaces / messy quotes)
    const label = scene.add.text(0, 0, rawText, {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12.5px',
        color: '#94a3b8',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    const rawBadge = scene.add.text(0, -h/2 - 12, 'RAW // UNPARSED', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '8px',
        color: '#ff7700',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([graphics, label, rawBadge]);

    container.userData = {
        graphics,
        label,
        rawBadge,
        width: w,
        height: h
    };

    return container;
}

/**
 * Creates a Typed Physical Data Ingot / Crate (1.5x Scale).
 * Polished, usable rectangle of decided style produced after the casting die touches and reshapes.
 */
export function createTypeToken(scene, x, y, rawValue, typeKey = 'string') {
    const typeInfo = VISUAL_TOKENS.types[typeKey] || VISUAL_TOKENS.types.string;
    const container = scene.add.container(x, y);

    const w = 150;  // 1.5x scale (was 96)
    const h = 52;   // 1.5x scale (was 34)

    const shadow = scene.add.rectangle(3, 4, w, h, 0x000000, 0.45);
    const box = scene.add.rectangle(0, 0, w, h, typeInfo.bg, 0.95);
    box.setStrokeStyle(2, typeInfo.color, 0.95);

    // Rivet dots on corners
    const r1 = scene.add.circle(-w/2 + 6, -h/2 + 6, 2, typeInfo.color, 0.9);
    const r2 = scene.add.circle(w/2 - 6, -h/2 + 6, 2, typeInfo.color, 0.9);
    const r3 = scene.add.circle(-w/2 + 6, h/2 - 6, 2, typeInfo.color, 0.9);
    const r4 = scene.add.circle(w/2 - 6, h/2 - 6, 2, typeInfo.color, 0.9);

    const text = scene.add.text(0, 0, String(rawValue), {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14.5px',
        color: '#ffffff',
        fontStyle: 'bold',
        wordWrap: { width: w - 24, useAdvancedWrap: true }
    }).setOrigin(0.5);

    const castBadge = scene.add.text(0, -h/2 - 10, `TYPE: ${typeInfo.label}`, {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '8.5px',
        color: typeInfo.hexStr,
        fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([shadow, box, r1, r2, r3, r4, text, castBadge]);

    container.userData = {
        box,
        text,
        castBadge,
        typeInfo,
        width: w,
        height: h,
        setText: (t) => text.setText(String(t))
    };

    return container;
}

/**
 * Creates an animated mechanical ALU Gearbox (1.5x Scale).
 */
export function createALUGearbox(scene, x, y) {
    const container = scene.add.container(x, y);

    const frameW = 320;  // 1.5x scale (was 210)
    const frameH = 210;  // 1.5x scale (was 140)

    // Housing Frame
    const shadow = scene.add.rectangle(6, 7, frameW, frameH, 0x000000, 0.55);
    const frame = scene.add.rectangle(0, 0, frameW, frameH, 0x10141f, 0.96);
    frame.setStrokeStyle(2.5, 0xd4a342, 0.9); // Brass edge

    const title = scene.add.text(0, -frameH / 2 + 16, 'ALU CORE // ARITHMETIC MULTIPLIER', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: '#d4a342',
        letterSpacing: 2,
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Two Interlocking Procedural Gears (scaled up radius 48)
    const gearLeft = drawProceduralGear(scene, -65, 16, 48, 12, 0xd4a342);
    const gearRight = drawProceduralGear(scene, 65, 16, 48, 12, 0xa17424);

    // Center Electric Spark Chamber
    const arcChamber = scene.add.rectangle(0, 16, 56, 68, 0x060911, 0.92);
    arcChamber.setStrokeStyle(1.5, 0x00f0ff, 0.7);
    const operatorSign = scene.add.text(0, 16, '×', {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '36px',
        color: '#ffd600',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Dial readout at the bottom
    const readoutBg = scene.add.rectangle(0, frameH / 2 - 24, frameW - 48, 28, 0x07090e, 0.95);
    readoutBg.setStrokeStyle(1.5, 0x6272a4, 0.6);
    const readoutText = scene.add.text(0, frameH / 2 - 24, 'READY // AWAITING REGISTERS', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        color: '#00ff88',
        fontStyle: 'bold',
        wordWrap: { width: frameW - 60, useAdvancedWrap: true }
    }).setOrigin(0.5);

    container.add([shadow, frame, title, gearLeft, gearRight, arcChamber, operatorSign, readoutBg, readoutText]);

    container.userData = {
        gearLeft,
        gearRight,
        operatorSign,
        readoutText,
        width: frameW,
        height: frameH,
        spinGears: (duration = 1.2) => {
            scene.tweens.add({
                targets: gearLeft,
                angle: '+=360',
                duration: duration * 1000,
                ease: 'power1.inOut'
            });
            scene.tweens.add({
                targets: gearRight,
                angle: '-=360',
                duration: duration * 1000,
                ease: 'power1.inOut'
            });
            scene.tweens.add({
                targets: operatorSign,
                scale: 1.35,
                duration: 220,
                yoyo: true,
                repeat: 3
            });
        },
        setReadout: (text, color = '#00ff88') => {
            readoutText.setText(text);
            readoutText.setColor(color);
        }
    };

    return container;
}

function drawProceduralGear(scene, x, y, radius, teethCount, color) {
    const gearCont = scene.add.container(x, y);
    const graphics = scene.add.graphics();

    graphics.fillStyle(color, 0.95);
    graphics.fillCircle(0, 0, radius - 6);

    // Teeth
    const toothW = 11;
    for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2;
        const tx = Math.cos(angle) * (radius - 3);
        const ty = Math.sin(angle) * (radius - 3);
        graphics.fillCircle(tx, ty, toothW / 2);
    }

    // Center hub hole
    graphics.fillStyle(0x0a0e17, 1);
    graphics.fillCircle(0, 0, radius * 0.35);
    graphics.lineStyle(2, 0xffd600, 0.8);
    graphics.strokeCircle(0, 0, radius * 0.35);

    gearCont.add(graphics);
    return gearCont;
}

/**
 * Creates a High-Clarity Mechanical Ledger Carriage & Scribe (1.5x Scale).
 * Has clear mechanical components: guide rails, carriage chassis, solenoid needle,
 * impact hammer, and status LED to clearly show the literal work it is doing.
 */
export function createLedgerPrinterHead(scene, x, y) {
    const container = scene.add.container(x, y);

    // 1. Dual Heavy Guide Rails
    const railTop = scene.add.rectangle(0, -32, 420, 6, 0x334155, 1);
    const railBottom = scene.add.rectangle(0, 32, 420, 6, 0x334155, 1);

    // 2. Moving Scribe Carriage Body (1.5x Scale: 70x56)
    const carriage = scene.add.container(0, 0);
    const carBody = scene.add.rectangle(0, 0, 70, 56, 0x1e293b, 0.96);
    carBody.setStrokeStyle(2, 0x00f0ff, 0.9);

    // Scribe Status Header
    const carHeader = scene.add.rectangle(0, -18, 70, 16, 0x0f172a, 1);
    const carLabel = scene.add.text(0, -18, 'SCRIBE HEAD', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#00f0ff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Solenoid Impact Hammer Block & Needle
    const hammerBlock = scene.add.rectangle(0, 8, 22, 20, 0x475569, 1);
    const needle = scene.add.rectangle(0, 26, 8, 18, 0xff0055, 1);
    const impactCrosshair = scene.add.circle(0, 34, 4, 0x00ff88, 0.8);

    // Live State Status LED
    const statusLed = scene.add.circle(24, -18, 4, 0x00ff88, 1);

    carriage.add([carBody, carHeader, carLabel, hammerBlock, needle, impactCrosshair, statusLed]);
    container.add([railTop, railBottom, carriage]);

    container.userData = {
        carriage,
        needle,
        impactCrosshair,
        hammerBlock,
        statusLed,
        strike: (onImpact) => {
            // Mechanical hammer strikes down forcefully onto the paper tape
            scene.tweens.add({
                targets: [needle, impactCrosshair],
                y: '+=12',
                duration: 55,
                yoyo: true,
                ease: 'power2.in',
                onYoyo: () => {
                    if (onImpact) onImpact();
                }
            });
            scene.tweens.add({
                targets: hammerBlock,
                y: '+=6',
                duration: 55,
                yoyo: true,
                ease: 'power2.in'
            });
        }
    };

    return container;
}

/**
 * Creates an Architectural HTML Blueprint Frame with hollow stencil cutouts (1.5x Scale).
 */
export function createTemplateStencil(scene, x, y, width = 510, height = 330) {
    const container = scene.add.container(x, y);

    // Blueprint grid background
    const shadow = scene.add.rectangle(7, 7, width, height, 0x000000, 0.55);
    const sheet = scene.add.rectangle(0, 0, width, height, 0x071e3d, 0.94);
    sheet.setStrokeStyle(2, 0x278ea5, 0.9);

    // Header badge
    const header = scene.add.text(-width/2 + 18, -height/2 + 16, '<!DOCTYPE html> // TEMPLATE BLUEPRINT STENCIL', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        color: '#278ea5',
        fontStyle: 'bold'
    });

    // Decorative Blueprint grid lines
    const gridGfx = scene.add.graphics();
    gridGfx.lineStyle(1, 0x1f4287, 0.25);
    for (let lx = -width/2 + 25; lx < width/2; lx += 28) {
        gridGfx.lineBetween(lx, -height/2 + 36, lx, height/2 - 16);
    }
    for (let ly = -height/2 + 36; ly < height/2 - 16; ly += 28) {
        gridGfx.lineBetween(-width/2 + 18, ly, width/2 - 18, ly);
    }

    container.add([shadow, sheet, gridGfx, header]);

    container.userData = {
        sheet,
        width,
        height,
        addSocket: (sx, sy, label, socketW = 240, socketH = 40) => {
            const socketCont = scene.add.container(sx, sy);
            const slot = scene.add.rectangle(0, 0, socketW, socketH, 0x0a192f, 0.96);
            slot.setStrokeStyle(2, 0xffd600, 0.85);

            const tag = scene.add.text(0, 0, `{{ ${label} }}`, {
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px',
                color: '#ffd600',
                fontStyle: 'bold',
                wordWrap: { width: socketW - 20, useAdvancedWrap: true }
            }).setOrigin(0.5);

            socketCont.add([slot, tag]);
            container.add(socketCont);

            return {
                container: socketCont,
                slot,
                tag,
                fillValue: (val) => {
                    tag.setText(String(val));
                    tag.setColor('#00ff88');
                    slot.setStrokeStyle(2, 0x00ff88, 1);
                }
            };
        }
    };

    return container;
}

/**
 * Creates a Robotic Pick-and-Place Gantry Arm (1.5x Scale).
 */
export function createPickAndPlaceArm(scene, x, y) {
    const container = scene.add.container(x, y);

    // Gantry trolley carriage base with top rail wheels
    const wheelLeft = scene.add.circle(-18, -16, 6, 0x00f0ff);
    wheelLeft.setStrokeStyle(1.5, 0xffffff, 0.9);
    const wheelRight = scene.add.circle(18, -16, 6, 0x00f0ff);
    wheelRight.setStrokeStyle(1.5, 0xffffff, 0.9);

    const base = scene.add.rectangle(0, 0, 58, 28, 0x1e293b, 1);
    base.setStrokeStyle(1.5, 0x00f0ff, 0.9);

    const gantryLabel = scene.add.text(0, 0, 'GANTRY', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#00f0ff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Telescopic vertical rod
    const rod = scene.add.rectangle(0, 36, 9, 54, 0x64748b, 1);

    // Vacuum suction head / Gripper
    const suctionCup = scene.add.rectangle(0, 66, 38, 12, 0x00f0ff, 0.95);
    suctionCup.setStrokeStyle(1.5, 0xffffff, 1);

    container.add([wheelLeft, wheelRight, base, gantryLabel, rod, suctionCup]);

    container.userData = {
        base,
        rod,
        suctionCup,
        extendRod: (dist = 40) => {
            scene.tweens.add({
                targets: [rod],
                height: 54 + dist,
                y: 36 + dist / 2,
                duration: 250,
                yoyo: true,
                ease: 'power2.out'
            });
            scene.tweens.add({
                targets: [suctionCup],
                y: 66 + dist,
                duration: 250,
                yoyo: true,
                ease: 'power2.out'
            });
        }
    };

    return container;
}

/**
 * Creates a Modular Collapsible DOM Shelf Chassis (Browser DOM Rack) (1.5x Scale).
 */
export function createDOMShelfRack(scene, x, y, width = 510, height = 360) {
    const container = scene.add.container(x, y);

    // Browser Viewport Window Frame
    const shadow = scene.add.rectangle(6, 7, width, height, 0x000000, 0.55);
    const winBg = scene.add.rectangle(0, 0, width, height, 0x0b0f19, 0.97);
    winBg.setStrokeStyle(2, 0x38bdf8, 0.85);

    // Browser Title Bar
    const titleBar = scene.add.rectangle(0, -height / 2 + 18, width, 36, 0x151d2e, 1);
    titleBar.setStrokeStyle(1.5, 0x1e293b, 1);

    // Window Dots
    const dotR = scene.add.circle(-width / 2 + 18, -height / 2 + 18, 5, 0xff5f56);
    const dotY = scene.add.circle(-width / 2 + 34, -height / 2 + 18, 5, 0xffbd2e);
    const dotG = scene.add.circle(-width / 2 + 50, -height / 2 + 18, 5, 0x27c93f);

    // URL Address Field
    const urlBar = scene.add.rectangle(26, -height / 2 + 18, width - 140, 22, 0x07090e, 0.95);
    urlBar.setStrokeStyle(1, 0x334155, 0.8);
    const urlText = scene.add.text(-width/2 + 90, -height / 2 + 12, 'https://store.local/order/ORD-9021', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: '#94a3b8'
    });

    container.add([shadow, winBg, titleBar, dotR, dotY, dotG, urlBar, urlText]);

    // Shelves Container
    const shelfContainer = scene.add.container(0, 20);
    container.add(shelfContainer);

    // Initial Empty DOM State Placeholder
    const emptyPlaceholder = scene.add.text(0, 16, '<main id="dom-root">\n  <!-- EMPTY: AWAITING STREAM HYDRATION -->\n  [ NO DOM NODES INJECTED YET ]\n</main>', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        color: '#475569',
        fontStyle: 'italic',
        align: 'center',
        lineSpacing: 6
    }).setOrigin(0.5);
    container.add(emptyPlaceholder);

    const shelves = [];

    container.userData = {
        winBg,
        shelfContainer,
        emptyPlaceholder,
        shelves,
        width,
        height,
        resetDOM: () => {
            emptyPlaceholder.setAlpha(1);
            shelves.forEach(s => s.reset());
        },
        addShelf: (shelfY, tagStr, labelStr, valStr = '', color = 0x00f0ff) => {
            const rowW = width - 44;
            const rowH = 48; // 1.5x scale (was 34)

            const shelfCont = scene.add.container(0, shelfY);
            shelfCont.setAlpha(0); // Initially free of any information!

            const bg = scene.add.rectangle(0, 0, rowW, rowH, 0x111927, 0.92);
            bg.setStrokeStyle(1.5, color, 0.7);

            // DOM Tag Badge
            const tagText = scene.add.text(-rowW / 2 + 14, -8, `<${tagStr}>`, {
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: '#6272a4',
                fontStyle: 'bold'
            });

            const labelText = scene.add.text(-rowW / 2 + 86, -8, labelStr, {
                fontFamily: 'Outfit, sans-serif',
                fontSize: '14px',
                color: '#cbd5e1',
                fontStyle: '500'
            });

            const valText = scene.add.text(rowW / 2 - 16, -8, valStr, {
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '15px',
                color: '#ffffff',
                fontStyle: 'bold',
                wordWrap: { width: rowW * 0.45, useAdvancedWrap: true }
            }).setOrigin(1, 0);

            shelfCont.add([bg, tagText, labelText, valText]);
            shelfContainer.add(shelfCont);

            const shelfItem = {
                container: shelfCont,
                bg,
                valText,
                setValue: (v) => valText.setText(String(v)),
                reset: () => {
                    shelfCont.setAlpha(0);
                    shelfCont.setScale(0.85);
                    valText.setText('');
                },
                expandAndPopulate: (incomingValue) => {
                    emptyPlaceholder.setAlpha(0);
                    if (incomingValue !== undefined && incomingValue !== null) {
                        valText.setText(String(incomingValue));
                    }
                    shelfCont.setScale(0.85);
                    shelfCont.setAlpha(0);
                    scene.tweens.add({
                        targets: shelfCont,
                        scale: 1,
                        alpha: 1,
                        duration: 380,
                        ease: 'back.out(1.4)'
                    });
                },
                expandFromZero: () => {
                    emptyPlaceholder.setAlpha(0);
                    shelfCont.setScale(0.85);
                    shelfCont.setAlpha(0);
                    scene.tweens.add({
                        targets: shelfCont,
                        scale: 1,
                        alpha: 1,
                        duration: 380,
                        ease: 'back.out(1.4)'
                    });
                }
            };

            shelves.push(shelfItem);
            return shelfItem;
        }
    };

    return container;
}

/**
 * Creates a Pedagogical Floating Readout / Typewriter Narration Banner.
 * Pleasing, non-intrusive explanation of the computational work underway.
 */
export function createPedagogicalBanner(scene, x, y, width = 540, height = 44) {
    const container = scene.add.container(x, y);

    const shadow = scene.add.rectangle(3, 4, width, height, 0x000000, 0.4);
    const bg = scene.add.rectangle(0, 0, width, height, 0x0c111e, 0.92);
    bg.setStrokeStyle(1.5, 0x00f0ff, 0.6);

    const pulse = scene.add.circle(-width / 2 + 18, 0, 4, 0x00f0ff, 1);
    
    const text = scene.add.text(-width / 2 + 32, -8, '', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11.5px',
        color: '#e2e8f0',
        wordWrap: { width: width - 50, useAdvancedWrap: true }
    });

    container.add([shadow, bg, pulse, text]);

    container.userData = {
        bg,
        pulse,
        text,
        setMessage: (msg, color = '#00f0ff') => {
            const hex = typeof color === 'number' ? color : (color.startsWith('#') ? parseInt(color.replace('#', '0x'), 16) : 0x00f0ff);
            bg.setStrokeStyle(1.5, hex, 0.8);
            pulse.setFillStyle(hex);
            text.setText(msg);
            container.setAlpha(0);
            scene.tweens.add({
                targets: container,
                alpha: 1,
                duration: 250,
                ease: 'power2.out'
            });
        }
    };

    return container;
}
