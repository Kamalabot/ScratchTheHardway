import Phaser from 'phaser';

/**
 * ORM & Relational Database Design System (1.5x Scale)
 * Modular visual components and physical machinery for Object-Relational Mapping,
 * Key minting, SQL query compilation, Normalization, and Relational Table storage.
 */

export const ORM_TOKENS = {
    colors: {
        pk: { bg: 0xf59e0b, stroke: 0xffd600, text: '#000000', label: 'PRIMARY KEY' },
        fk: { bg: 0x0284c7, stroke: 0x38bdf8, text: '#ffffff', label: 'FOREIGN KEY' },
        ts: { bg: 0x6b21a8, stroke: 0xc084fc, text: '#ffffff', label: 'TIMESTAMP' },
        sql: { bg: 0x064e3b, stroke: 0x10b981, text: '#34d399', label: 'SQL QUERY' },
        tableHeader: 0x1e293b,
        tableBody: 0x0f172a,
        tableBorder: 0x334155,
        tableBorderHighlight: 0x38bdf8,
        walActive: 0x10b981
    }
};

/**
 * 1. Creates a Python Model Inspection Tray (In-Memory Heap Object)
 * Displays the incoming Python Order instance with attribute sockets and pointer address.
 */
export function createPythonModelTray(scene, x, y) {
    const container = scene.add.container(x, y);

    const w = 270;
    const h = 180;

    // Outer Glass / Acrylic Housing
    const shadow = scene.add.rectangle(4, 6, w, h, 0x000000, 0.6);
    const body = scene.add.rectangle(0, 0, w, h, 0x0a101d, 0.95);
    body.setStrokeStyle(2, 0x38bdf8, 0.85);

    // Header Bar
    const header = scene.add.rectangle(0, -h / 2 + 16, w, 32, 0x142038, 1);
    const title = scene.add.text(-w / 2 + 14, -h / 2 + 8, 'PYTHON HEAP // INSTANCE: Order()', {
        fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#38bdf8', fontStyle: 'bold'
    });
    const addr = scene.add.text(w / 2 - 14, -h / 2 + 8, '0x7FFF_08A0', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#6272a4'
    }).setOrigin(1, 0);

    // Attribute Lines (Monospace)
    const attrCustomer = scene.add.text(-w / 2 + 16, -38, '.customer  = "Elena Rostova"', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#00f0ff'
    });
    const attrTotal = scene.add.text(-w / 2 + 16, -16, '.total     = 2550.00', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#ffd600'
    });
    const attrItem = scene.add.text(-w / 2 + 16, 6, '.item_sku  = "QS-900 (Qty: 3)"', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#ff3366'
    });
    const attrTime = scene.add.text(-w / 2 + 16, 28, '.created_at= datetime.utcnow()', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#c084fc'
    });

    // Scanner beam (sweeps across the object during inspection)
    const scanLine = scene.add.rectangle(0, -h / 2 + 32, w - 8, 3, 0x00f0ff, 0.85).setAlpha(0);

    // Status Footer
    const footer = scene.add.text(0, h / 2 - 16, 'STATUS: UNPERSISTED HEAP INSTANCE', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#f59e0b', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([shadow, body, header, title, addr, attrCustomer, attrTotal, attrItem, attrTime, scanLine, footer]);

    container.userData = {
        scanLine,
        footer,
        sweepScanner: (duration = 0.6) => {
            scanLine.setAlpha(1);
            scanLine.y = -h / 2 + 34;
            scene.tweens.add({
                targets: scanLine,
                y: h / 2 - 32,
                duration: duration * 1000,
                yoyo: true,
                ease: 'power2.inOut',
                onComplete: () => scanLine.setAlpha(0)
            });
        }
    };

    return container;
}

/**
 * 2. Creates a Solid Brass Primary Key (PK) Hexagonal Seal (1.5x Scale)
 * Represents an immutable, auto-incremented database table identifier.
 */
export function createPrimaryKeyBadge(scene, x, y, idText = '#PK_1042') {
    const container = scene.add.container(x, y);

    const w = 96;
    const h = 36;

    // Glowing highlight aura (activated during narrative key inspection)
    const aura = scene.add.circle(0, 0, 56, 0xffd600, 0.35).setAlpha(0);

    // Chamfered Hexagonal Polygon drawn with standard canvas paths
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xd97706, 1);
    graphics.lineStyle(2.5, 0xffd600, 1);

    const chamfer = 8;
    const points = [
        { x: -w/2 + chamfer, y: -h/2 },
        { x: w/2 - chamfer, y: -h/2 },
        { x: w/2, y: 0 },
        { x: w/2 - chamfer, y: h/2 },
        { x: -w/2 + chamfer, y: h/2 },
        { x: -w/2, y: 0 }
    ];

    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    // Auto-increment notch / gear tooth icon
    const notch = scene.add.rectangle(-w/2 + 10, 0, 4, 16, 0x000000, 0.45);

    const text = scene.add.text(4, 0, idText, {
        fontFamily: 'JetBrains Mono', fontSize: '11.5px', color: '#000000', fontStyle: 'bold'
    }).setOrigin(0.5);

    const subTag = scene.add.text(0, -h/2 - 8, 'PRIMARY KEY // IDENTITY', {
        fontFamily: 'JetBrains Mono', fontSize: '7.5px', color: '#ffd600', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([aura, graphics, notch, text, subTag]);

    container.userData = {
        text,
        aura,
        setId: (id) => text.setText(String(id)),
        pulseHighlight: (duration = 0.8) => {
            aura.setAlpha(0.6);
            scene.tweens.add({
                targets: aura,
                scale: 1.6,
                alpha: 0,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        }
    };

    return container;
}

/**
 * 3. Creates an Interlocking Foreign Key (FK) Mag-Lock Carabiner Shackle (1.5x Scale)
 * Represents a relational pointer bridging child records to a parent table.
 */
export function createForeignKeyShackle(scene, x, y, fkText = '#FK_CUST_42') {
    const container = scene.add.container(x, y);

    const w = 104;
    const h = 36;

    // Glowing highlight aura (activated during narrative key inspection)
    const aura = scene.add.circle(0, 0, 56, 0x38bdf8, 0.35).setAlpha(0);

    const body = scene.add.rectangle(0, 0, w, h, 0x0369a1, 1);
    body.setStrokeStyle(2, 0x38bdf8, 1);

    // Carabiner latch shackle ring on the left
    const shackleRing = scene.add.circle(-w/2 + 8, 0, 9, 0x0f172a);
    shackleRing.setStrokeStyle(2.5, 0x38bdf8, 1);

    const text = scene.add.text(10, 0, fkText, {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    const subTag = scene.add.text(0, -h/2 - 8, 'FOREIGN KEY // POINTER', {
        fontFamily: 'JetBrains Mono', fontSize: '7.5px', color: '#38bdf8', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([aura, body, shackleRing, text, subTag]);

    container.userData = {
        text,
        shackleRing,
        aura,
        setFk: (fk) => text.setText(String(fk)),
        pulseHighlight: (duration = 0.8) => {
            aura.setAlpha(0.6);
            scene.tweens.add({
                targets: aura,
                scale: 1.6,
                alpha: 0,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
            scene.tweens.add({
                targets: shackleRing,
                scale: 1.35,
                duration: 250,
                yoyo: true,
                repeat: 2
            });
        }
    };

    return container;
}

/**
 * 4. Creates a Precision Timestamp Chrono-Gear Capsule (1.5x Scale)
 * Visualizes datetime coercion into UTC ISO-8601 strings.
 */
export function createChronoCapsule(scene, x, y, timeStr = '2026-09-22T07:15:00Z') {
    const container = scene.add.container(x, y);

    const w = 150;
    const h = 32;

    const body = scene.add.rectangle(0, 0, w, h, 0x3b0764, 0.95);
    body.setStrokeStyle(1.5, 0xc084fc, 1);

    // Escapement clock cog icon on the left
    const cog = scene.add.circle(-w/2 + 14, 0, 7, 0x581c87);
    cog.setStrokeStyle(1.5, 0xc084fc, 1);
    const hand = scene.add.rectangle(-w/2 + 14, 0, 1, 8, 0xffffff);

    const text = scene.add.text(8, 0, timeStr, {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#f3e8ff', fontStyle: 'bold'
    }).setOrigin(0.5);

    const subTag = scene.add.text(0, -h/2 - 8, 'TIMESTAMP // ISO-8601', {
        fontFamily: 'JetBrains Mono', fontSize: '7.5px', color: '#c084fc', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([body, cog, hand, text, subTag]);

    container.userData = {
        text,
        hand,
        spinHand: () => {
            scene.tweens.add({
                targets: hand,
                angle: 360,
                duration: 800,
                repeat: -1
            });
        }
    };

    return container;
}

/**
 * 5. Creates the Heavy ORM SQL Compiler Press & Stamping Matrix
 * The central mechanical engine that takes decoupled tokens, injects parameters,
 * and stamps the compiled wire-level SQL query.
 */
export function createORMCompilerPress(scene, x, y) {
    const container = scene.add.container(x, y);

    const w = 360;
    const h = 260;

    // Heavy Industrial Frame
    const frameShadow = scene.add.rectangle(6, 8, w, h, 0x000000, 0.6);
    const frameBg = scene.add.rectangle(0, 0, w, h, 0x0c1424, 0.98);
    frameBg.setStrokeStyle(2, 0x10b981, 0.9);

    // Machine Header Bar
    const header = scene.add.rectangle(0, -h / 2 + 18, w, 36, 0x132338, 1);
    const title = scene.add.text(-w / 2 + 16, -h / 2 + 10, 'ORM COMPILER FOUNDRY // SQL COMPILER', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#10b981', fontStyle: 'bold'
    });
    const dialectBadge = scene.add.rectangle(w / 2 - 64, -h / 2 + 18, 100, 20, 0x064e3b, 1);
    dialectBadge.setStrokeStyle(1, 0x34d399, 1);
    const dialectText = scene.add.text(w / 2 - 64, -h / 2 + 18, 'POSTGRESQL', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#34d399', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Hydraulic Compression Pistons (Dual Column)
    const pistonLeft = scene.add.rectangle(-w / 2 + 36, -20, 28, 90, 0x334155, 1);
    pistonLeft.setStrokeStyle(1, 0x64748b, 1);
    const pistonRight = scene.add.rectangle(w / 2 - 36, -20, 28, 90, 0x334155, 1);
    pistonRight.setStrokeStyle(1, 0x64748b, 1);

    // Descending Die Head & Parameter Injection Ports
    const dieHead = scene.add.rectangle(0, 30, w - 110, 36, 0x164e63, 1);
    dieHead.setStrokeStyle(2, 0x06b6d4, 1);
    const dieText = scene.add.text(0, 30, 'PARAMETERIZED STAMP HEAD [$1, $2, $3, $4]', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // SQL Platen Bed at the bottom of the press
    const platenBed = scene.add.rectangle(0, 88, w - 40, 52, 0x022c22, 1);
    platenBed.setStrokeStyle(1.5, 0x10b981, 0.8);

    const platenLabel = scene.add.text(-w / 2 + 28, 68, 'WIRED SQL QUERY BUFFER:', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#34d399', fontStyle: 'bold'
    });

    // Dynamic Compiled SQL Statement Text
    const sqlText = scene.add.text(-w / 2 + 28, 88, '', {
        fontFamily: 'JetBrains Mono',
        fontSize: '9.5px',
        color: '#a7f3d0',
        fontStyle: 'bold',
        wordWrap: { width: w - 60, useAdvancedWrap: true }
    });

    container.add([
        frameShadow, frameBg, header, title, dialectBadge, dialectText,
        pistonLeft, pistonRight, dieHead, dieText,
        platenBed, platenLabel, sqlText
    ]);

    container.userData = {
        pistonLeft,
        pistonRight,
        dieHead,
        dieText,
        sqlText,
        stampSQL: (query, onImpact) => {
            // Deliberate, powerful mechanical descent onto the platen bed
            scene.tweens.add({
                targets: [dieHead, dieText],
                y: 65,
                duration: 600,
                hold: 500,
                yoyo: true,
                ease: 'power2.inOut',
                onYoyo: () => {
                    sqlText.setText(query);
                    if (onImpact) onImpact();
                }
            });
            scene.tweens.add({
                targets: [pistonLeft, pistonRight],
                y: 0,
                duration: 600,
                hold: 500,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    };

    return container;
}

/**
 * 6. Creates a Relational Database Table Matrix Vault (1.5x Scale)
 * Dual-tier heavy steel table structure showing rigid columns, row slots,
 * Primary/Foreign Key badges, and B-Tree commit indicators.
 */
export function createRelationalTableMatrix(scene, x, y, tableName, columns = [], maxRows = 2) {
    const container = scene.add.container(x, y);

    const w = 480;
    const h = 42 + (maxRows * 40) + 16;

    // Main Steel Chassis
    const shadow = scene.add.rectangle(4, 6, w, h, 0x000000, 0.6);
    const body = scene.add.rectangle(0, 0, w, h, 0x0a101d, 0.98);
    body.setStrokeStyle(2, 0x334155, 1);

    // Table Header Bar
    const header = scene.add.rectangle(0, -h / 2 + 16, w, 32, 0x141d33, 1);
    const title = scene.add.text(-w / 2 + 14, -h / 2 + 8, `RELATIONAL TABLE // ${tableName.toUpperCase()}`, {
        fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#38bdf8', fontStyle: 'bold'
    });

    const btreeLed = scene.add.circle(w / 2 - 20, -h / 2 + 16, 5, 0xf59e0b);
    const btreeLabel = scene.add.text(w / 2 - 32, -h / 2 + 9, 'B-TREE', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#6272a4'
    }).setOrigin(1, 0);

    // Column Headers
    const colY = -h / 2 + 38;
    const colHeaderCont = scene.add.container(0, colY);

    const colWidth = (w - 28) / columns.length;
    columns.forEach((col, i) => {
        const cx = -w / 2 + 14 + (i * colWidth);
        const colText = scene.add.text(cx, 0, col.name, {
            fontFamily: 'JetBrains Mono',
            fontSize: '9px',
            color: col.isPk ? '#f59e0b' : (col.isFk ? '#38bdf8' : '#94a3b8'),
            fontStyle: 'bold'
        });
        colHeaderCont.add(colText);
    });

    // Row Slots Container (Starts 100% empty)
    const rowSlots = [];
    const rowsCont = scene.add.container(0, 0);

    for (let r = 0; r < maxRows; r++) {
        const ry = -h / 2 + 66 + (r * 38);
        const rowBg = scene.add.rectangle(0, ry, w - 24, 32, 0x111927, 0.9);
        rowBg.setStrokeStyle(1, 0x1e293b, 1);

        // Dashed placeholder when empty
        const emptyLabel = scene.add.text(0, ry, `[ SLOT 0${r+1} // AWAITING TRANSACTION INSERT ]`, {
            fontFamily: 'JetBrains Mono', fontSize: '8.5px', color: '#334155', fontStyle: 'italic'
        }).setOrigin(0.5);

        const rowText = scene.add.text(-w / 2 + 18, ry - 6, '', {
            fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#ffffff', fontStyle: 'bold'
        });

        rowSlots.push({ rowBg, emptyLabel, rowText });
        rowsCont.add([rowBg, emptyLabel, rowText]);
    }

    container.add([shadow, body, header, title, btreeLed, btreeLabel, colHeaderCont, rowsCont]);

    container.userData = {
        body,
        btreeLed,
        rowSlots,
        width: w,
        height: h,
        resetTable: () => {
            btreeLed.setFillStyle(0xf59e0b);
            body.setStrokeStyle(2, 0x334155, 1);
            rowSlots.forEach(s => {
                s.emptyLabel.setAlpha(1);
                s.rowText.setText('');
                s.rowBg.setStrokeStyle(1, 0x1e293b, 1);
            });
        },
        insertRow: (rowIndex, formattedRowStr, isPkHit = true) => {
            if (rowIndex < 0 || rowIndex >= rowSlots.length) return;
            const slot = rowSlots[rowIndex];
            slot.emptyLabel.setAlpha(0);
            slot.rowText.setText(formattedRowStr);
            slot.rowBg.setStrokeStyle(1.5, 0x10b981, 1);

            if (isPkHit) {
                btreeLed.setFillStyle(0x10b981);
                scene.tweens.add({
                    targets: btreeLed,
                    scale: 1.5,
                    duration: 180,
                    yoyo: true,
                    repeat: 1
                });
            }
        }
    };

    return container;
}

/**
 * 7. Creates a Normalization / Denormalization Diverter Shunting Gantry
 * Shows how flat incoming data is split across normalized relational tables,
 * and optionally cached into a denormalized view.
 */
export function createNormalizationDiverter(scene, x, y) {
    const container = scene.add.container(x, y);

    const w = 240;
    const h = 110;

    const body = scene.add.rectangle(0, 0, w, h, 0x0e172a, 0.95);
    body.setStrokeStyle(1.5, 0xf43f5e, 0.85);

    const label = scene.add.text(0, -h / 2 + 14, 'SCHEMA DISPATCHER // NORMALIZER', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#f43f5e', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Diverter rail tracks
    const inTrack = scene.add.rectangle(-w / 2 + 25, 6, 50, 6, 0x334155);
    const normTrackUpper = scene.add.rectangle(w / 2 - 35, -20, 70, 6, 0x38bdf8);
    const normTrackLower = scene.add.rectangle(w / 2 - 35, 32, 70, 6, 0x10b981);

    // Motorized shunting gate arm
    const gateArm = scene.add.rectangle(-10, 6, 44, 8, 0xf43f5e);
    gateArm.setOrigin(0, 0.5);

    const statusText = scene.add.text(0, h / 2 - 14, 'GATE: SPLITTING PAYLOAD', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#cbd5e1'
    }).setOrigin(0.5);

    container.add([body, label, inTrack, normTrackUpper, normTrackLower, gateArm, statusText]);

    container.userData = {
        gateArm,
        statusText,
        shuntUpper: (onComplete) => {
            statusText.setText('DISPATCH: -> TABLE customers');
            scene.tweens.add({
                targets: gateArm,
                angle: -30,
                duration: 700,
                ease: 'power2.inOut',
                onComplete
            });
        },
        shuntLower: (onComplete) => {
            statusText.setText('DISPATCH: -> TABLE orders');
            scene.tweens.add({
                targets: gateArm,
                angle: 30,
                duration: 700,
                ease: 'power2.inOut',
                onComplete
            });
        },
        resetGate: () => {
            gateArm.setAngle(0);
            statusText.setText('GATE: READY (AWAITING DISPATCH)');
        }
    };

    return container;
}
