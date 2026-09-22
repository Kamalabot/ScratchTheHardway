import Phaser from 'phaser';

/**
 * Web Client-Server & HTTP REST Design System (High-DPI / High-Clarity)
 * Procedural vector graphics visualizing:
 * - Client Browser Terminal with fetch() call, headers, and dedicated Request JSON Builder
 * - Bi-directional Fiber Network Conduit with Serializer / Deserializer Transceivers
 * - Serialized Byte Stream particles demonstrating wire serialization
 * - High-contrast HTTP Request and Response Packet Capsules
 * - Server Router Chassis featuring enlarged Python/FastAPI route decorators (@app.get/post/put/delete)
 *   and controller handler functions
 * - Live Mini Database Table Vault showing real-time SQL row operations
 */

export const HTTP_TOKENS = {
    methods: {
        GET:    { bg: 0x0284c7, stroke: 0x38bdf8, text: '#38bdf8', label: 'GET REQ' },
        POST:   { bg: 0x059669, stroke: 0x34d399, text: '#34d399', label: 'POST REQ' },
        PUT:    { bg: 0xd97706, stroke: 0xfbbf24, text: '#fbbf24', label: 'PUT REQ' },
        DELETE: { bg: 0xdc2626, stroke: 0xf87171, text: '#f87171', label: 'DEL REQ' }
    },
    status: {
        s200: { bg: 0x064e3b, stroke: 0x10b981, text: '#34d399', code: '200 OK' },
        s201: { bg: 0x064e3b, stroke: 0x10b981, text: '#34d399', code: '201 CREATED' },
        s204: { bg: 0x1e293b, stroke: 0x94a3b8, text: '#cbd5e1', code: '204 NO CONTENT' },
        s404: { bg: 0x450a0a, stroke: 0xef4444, text: '#f87171', code: '404 NOT FOUND' }
    }
};

/**
 * 1. Creates a Large, High-Clarity Client Browser Console (Left Station)
 * Shows client JavaScript fetch() call, headers, and dedicated Request JSON Payload Builder.
 */
export function createClientConsole(scene, x, y, config = {}) {
    const container = scene.add.container(x, y);

    const w = 410;
    const h = 320;

    const shadow = scene.add.rectangle(6, 8, w, h, 0x000000, 0.65);
    const body = scene.add.rectangle(0, 0, w, h, 0x08101e, 0.98);
    body.setStrokeStyle(2, 0x38bdf8, 0.95);

    // Browser Header Bar with window controls
    const header = scene.add.rectangle(0, -h / 2 + 18, w, 36, 0x14223d, 1);
    const dotR = scene.add.circle(-w / 2 + 18, -h / 2 + 18, 5, 0xff5f56);
    const dotY = scene.add.circle(-w / 2 + 32, -h / 2 + 18, 5, 0xffbd2e);
    const dotG = scene.add.circle(-w / 2 + 46, -h / 2 + 18, 5, 0x27c93f);

    const title = scene.add.text(-w / 2 + 64, -h / 2 + 9, 'CLIENT // BROWSER JAVASCRIPT RUNTIME', {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#38bdf8', fontStyle: 'bold'
    });

    // Client JavaScript Snippet Callout
    const codeBox = scene.add.rectangle(0, -54, w - 24, 92, 0x040813, 0.96);
    codeBox.setStrokeStyle(1.5, 0x1e293b, 1);

    const funcTag = scene.add.text(-w / 2 + 20, -92, config.clientTitle || 'dispatch_request.js', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#6272a4', fontStyle: 'bold'
    });

    const codeLine1 = scene.add.text(-w / 2 + 20, -75, config.line1 || 'const res = await fetch(', {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#f8fafc',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });
    const codeLine2 = scene.add.text(-w / 2 + 20, -56, config.line2 || '"/api/v1/orders/1042", {', {
        fontFamily: 'JetBrains Mono', fontSize: '11.5px', color: '#00f0ff', fontStyle: 'bold',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });
    const codeLine3 = scene.add.text(-w / 2 + 20, -37, config.line3 || '  method: "GET", headers: { ... }', {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ffd600',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });
    const codeLine4 = scene.add.text(-w / 2 + 20, -18, config.line4 || '});', {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#94a3b8',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });

    // Request Packaging & JSON Build Bay (Generously sized)
    const stagingBg = scene.add.rectangle(0, 64, w - 24, 116, 0x0c1424, 0.96);
    stagingBg.setStrokeStyle(1.5, 0x334155, 1);

    // Staging Bay Header Tag
    const stagingTag = scene.add.rectangle(-w / 2 + 105, 16, 174, 20, 0x1e293b, 1);
    const stagingLabel = scene.add.text(-w / 2 + 105, 16, 'REQUEST JSON BUILDER', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#38bdf8', fontStyle: 'bold'
    }).setOrigin(0.5);

    const headerText = scene.add.text(-w / 2 + 20, 32, config.headerText || 'Headers: [Accept: application/json]', {
        fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#94a3b8', fontStyle: 'bold',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });

    // JSON Payload Display Crate
    const bodyCrateBg = scene.add.rectangle(0, 78, w - 36, 52, 0x060d1a, 1);
    bodyCrateBg.setStrokeStyle(1.5, 0x0284c7, 0.9);

    const bodyPreview = scene.add.text(-w / 2 + 24, 58, config.bodyPreview || '[Empty Body // URL Path Param Only]', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#38bdf8', fontStyle: 'bold',
        wordWrap: { width: w - 48, useAdvancedWrap: true }
    });

    // Footer Status Readout
    const footer = scene.add.text(0, h / 2 - 14, config.initialStatus || 'READY: CLICK TRIGGER TO DISPATCH', {
        fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#38bdf8', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([
        shadow, body, header, dotR, dotY, dotG, title,
        codeBox, funcTag, codeLine1, codeLine2, codeLine3, codeLine4,
        stagingBg, stagingTag, stagingLabel, headerText,
        bodyCrateBg, bodyPreview, footer
    ]);

    container.userData = {
        codeBox,
        footer,
        codeLine1,
        codeLine2,
        codeLine3,
        codeLine4,
        headerText,
        bodyPreview,
        bodyCrateBg,
        stagingBg,
        setStatus: (text, color = '#38bdf8') => {
            footer.setText(text);
            footer.setColor(color);
        },
        setBuilderState: (headerStr, bodyStr, color = '#38bdf8') => {
            if (headerStr !== undefined && headerStr !== null) headerText.setText(headerStr);
            if (bodyStr !== undefined && bodyStr !== null) {
                bodyPreview.setText(bodyStr);
                bodyPreview.setColor(color);
            }
        },
        highlightFetch: (duration = 0.5) => {
            scene.tweens.add({
                targets: codeBox,
                alpha: 0.5,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        },
        flashBuildBay: (color = 0x38bdf8, duration = 0.6) => {
            bodyCrateBg.setStrokeStyle(2, color, 1);
            scene.tweens.add({
                targets: bodyCrateBg,
                scaleX: 1.03,
                scaleY: 1.05,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        }
    };

    return container;
}

/**
 * 2. Creates a Bi-directional Network Conduit with Serialization Transceivers
 * Features Client Serialization Gate (TX), Server Deserialization Gate (RX), and telemetry.
 */
export function createNetworkFiberConduit(scene, x, y, width = 280) {
    const container = scene.add.container(x, y);

    const h = 76;

    const tubeShadow = scene.add.rectangle(0, 4, width, h, 0x000000, 0.55);
    const tubeGlass = scene.add.rectangle(0, 0, width, h, 0x061124, 0.92);
    tubeGlass.setStrokeStyle(2, 0x1e3a8a, 0.95);

    // Left Serialization Transceiver (Client TX)
    const txGate = scene.add.rectangle(-width / 2 + 20, 0, 28, h - 8, 0x0f1d38, 1);
    txGate.setStrokeStyle(1.5, 0x38bdf8, 1);
    const txLabel = scene.add.text(-width / 2 + 20, 0, 'TX\nSER', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#38bdf8', fontStyle: 'bold', align: 'center'
    }).setOrigin(0.5);

    // Right Deserialization Transceiver (Server RX)
    const rxGate = scene.add.rectangle(width / 2 - 20, 0, 28, h - 8, 0x0f2a20, 1);
    rxGate.setStrokeStyle(1.5, 0x10b981, 1);
    const rxLabel = scene.add.text(width / 2 - 20, 0, 'RX\nDES', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#34d399', fontStyle: 'bold', align: 'center'
    }).setOrigin(0.5);

    // Center Core Light Guide Track
    const fiberCore = scene.add.rectangle(0, 0, width - 68, 5, 0x00f0ff, 0.65);

    // Directional Labels
    const reqArrow = scene.add.text(-width / 2 + 42, -h / 2 + 11, 'REQUEST -> (SERIALIZED STREAM)', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#38bdf8', fontStyle: 'bold'
    });
    const resArrow = scene.add.text(width / 2 - 42, h / 2 - 20, '<- RESPONSE (JSON STREAM)', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#34d399', fontStyle: 'bold'
    }).setOrigin(1, 0);

    // Protocol & TLS 1.3 Badge
    const tlsBadge = scene.add.rectangle(0, 0, 106, 22, 0x091020, 0.95);
    tlsBadge.setStrokeStyle(1, 0x10b981, 0.9);
    const tlsText = scene.add.text(0, 0, 'TLS 1.3 // HTTP/2', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#34d399', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Telemetry Status
    const rttText = scene.add.text(0, -h / 2 - 11, 'NETWORK WIRE: SERIALIZED BYTES IN TRANSIT', {
        fontFamily: 'JetBrains Mono', fontSize: '8.5px', color: '#6272a4', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([
        tubeShadow, tubeGlass, txGate, txLabel, rxGate, rxLabel,
        fiberCore, reqArrow, resArrow, tlsBadge, tlsText, rttText
    ]);

    container.userData = {
        rttText,
        txGate,
        rxGate,
        fiberCore,
        pulseCore: (color = 0x00f0ff, duration = 0.8) => {
            fiberCore.setFillStyle(color, 0.95);
            scene.tweens.add({
                targets: fiberCore,
                alpha: 0.25,
                duration: duration * 1000,
                yoyo: true,
                repeat: 2
            });
        },
        flashTX: (duration = 0.5) => {
            scene.tweens.add({
                targets: txGate,
                alpha: 0.3,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        },
        flashRX: (duration = 0.5) => {
            scene.tweens.add({
                targets: rxGate,
                alpha: 0.3,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        }
    };

    return container;
}

/**
 * 3. Creates an Animated Serialized Byte Stream Pulse Chain
 * Spawns physical serialized byte stream blocks traveling along the wire to show wire serialization in transit!
 */
export function createSerializedByteStream(scene, startX, startY, endX, endY, color = 0x00f0ff, tokens = null) {
    const streamTokens = tokens || ['0x7B', '"data"', '0x3A', '"val"', '0x7D'];
    const container = scene.add.container(startX, startY);

    const blocks = [];
    const spacing = 32;
    for (let i = 0; i < streamTokens.length; i++) {
        const b = scene.add.container(i * spacing, 0);
        const rect = scene.add.rectangle(0, 0, 28, 18, 0x07152b, 0.98);
        rect.setStrokeStyle(1.5, color, 0.95);
        const txt = scene.add.text(0, 0, streamTokens[i], {
            fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
        b.add([rect, txt]);
        blocks.push(b);
        container.add(b);
    }

    container.userData = {
        blocks,
        animateAcross: (duration = 3.0, onComplete) => {
            scene.tweens.add({
                targets: container,
                x: endX,
                y: endY,
                duration: duration * 1000,
                ease: 'power1.inOut',
                onComplete: () => {
                    container.destroy();
                    if (onComplete) onComplete();
                }
            });
        }
    };

    return container;
}

/**
 * 4. Creates an HTTP Request or Response Packet Capsule (Clearly Named & Sized - 260x56)
 */
export function createHttpPacketCapsule(scene, x, y, verb = 'GET', path = '/api/v1/orders/1042', isResponse = false) {
    const container = scene.add.container(x, y);

    const w = 260;
    const h = 56;

    const tok = HTTP_TOKENS.methods[verb] || HTTP_TOKENS.methods.GET;

    // Glowing aura during motion
    const glow = scene.add.circle(0, 0, 52, tok.stroke, 0.35).setAlpha(0);

    // Outer Heavy Frame
    const shell = scene.add.rectangle(0, 0, w, h, 0x070e1b, 0.98);
    shell.setStrokeStyle(2, tok.stroke, 1);

    // Left Method / Status Notch
    const badgeBg = scene.add.rectangle(-w / 2 + 35, 0, 64, h - 6, tok.bg, 1);
    const badgeText = scene.add.text(-w / 2 + 35, 0, isResponse ? '200 OK' : verb, {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Right Explicit Packet Name & Path (Spacious 170px width)
    const packetTypeLabel = scene.add.text(-w / 2 + 76, -14, isResponse ? 'HTTP RESPONSE PACKET' : 'HTTP REQUEST PACKET', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: isResponse ? '#34d399' : '#38bdf8', fontStyle: 'bold'
    });

    const pathText = scene.add.text(-w / 2 + 76, 1, path, {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#ffffff', fontStyle: 'bold',
        wordWrap: { width: 172, useAdvancedWrap: true }
    });

    const subTag = scene.add.text(-w / 2 + 76, 17, isResponse ? 'STATUS: 200 OK // SERIALIZED JSON' : 'CONTENT: SERIALIZED UTF-8 BYTES', {
        fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#94a3b8', fontStyle: 'bold',
        wordWrap: { width: 172, useAdvancedWrap: true }
    });

    container.add([glow, shell, badgeBg, badgeText, packetTypeLabel, pathText, subTag]);

    container.userData = {
        shell,
        badgeBg,
        badgeText,
        packetTypeLabel,
        pathText,
        subTag,
        glow,
        pulseGlow: (duration = 0.6) => {
            glow.setAlpha(0.6);
            scene.tweens.add({
                targets: glow,
                scale: 1.4,
                alpha: 0,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        },
        transformToResponse: (statusCode = '200 OK', statusColor = 0x10b981, statusPayload = '{"id": 1042, "status": "OK"}') => {
            shell.setStrokeStyle(2, statusColor, 1);
            badgeBg.setFillStyle(statusColor, 1);
            badgeText.setText(statusCode);
            packetTypeLabel.setText('HTTP RESPONSE PACKET');
            packetTypeLabel.setColor('#34d399');
            pathText.setText(statusPayload);
            pathText.setColor('#a7f3d0');
            subTag.setText(`STATUS: ${statusCode} // JSON BODY`);
        }
    };

    return container;
}

/**
 * 5. Creates the Enlarged Server API Router Chassis (Right Station - 410x320)
 * Clearly highlights the Python Route Decorator (@app.get) and Controller Handler Function.
 */
export function createServerRouterChassis(scene, x, y, config = {}) {
    const container = scene.add.container(x, y);

    const w = 410;
    const h = 320;

    const shadow = scene.add.rectangle(6, 8, w, h, 0x000000, 0.65);
    const body = scene.add.rectangle(0, 0, w, h, 0x08101e, 0.98);
    body.setStrokeStyle(2, 0x10b981, 0.95);

    // Server Header Bar with Linux/FastAPI server tag
    const header = scene.add.rectangle(0, -h / 2 + 18, w, 36, 0x064e3b, 1);
    const title = scene.add.text(-w / 2 + 16, -h / 2 + 9, 'SERVER API // FASTAPI + SQLALCHEMY ORM', {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#34d399', fontStyle: 'bold'
    });
    const portTag = scene.add.text(w / 2 - 16, -h / 2 + 9, 'HOST: 0.0.0.0:8000', {
        fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#a7f3d0'
    }).setOrigin(1, 0);

    // 1. Python Route Decorator Box (Prominent & Sharp)
    const decBox = scene.add.rectangle(0, -66, w - 24, 68, 0x05261d, 0.96);
    decBox.setStrokeStyle(2, 0x10b981, 0.9);

    const decLabel = scene.add.text(-w / 2 + 20, -92, 'PYTHON ROUTE DECORATOR (PATH MATCH GATE):', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#34d399', fontStyle: 'bold'
    });

    const decText = scene.add.text(-w / 2 + 20, -72, config.decorator || '@app.get("/api/v1/orders/{order_id}")', {
        fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#a7f3d0', fontStyle: 'bold',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });

    // 2. Controller Handler Function Callout (Enlarged & Sharp)
    const funcBox = scene.add.rectangle(0, 18, w - 24, 86, 0x0e172a, 0.96);
    funcBox.setStrokeStyle(1.5, 0x334155, 1);

    const funcLabel = scene.add.text(-w / 2 + 20, -18, 'CONTROLLER HANDLER FUNCTION:', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#94a3b8', fontStyle: 'bold'
    });

    const funcSig = scene.add.text(-w / 2 + 20, -1, config.funcSig || 'async def get_order(order_id: int, db: Session):', {
        fontFamily: 'JetBrains Mono', fontSize: '11.5px', color: '#38bdf8', fontStyle: 'bold',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });

    const funcBody = scene.add.text(-w / 2 + 20, 22, config.funcBody || 'order = db.query(Order).get(order_id)', {
        fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ffd600',
        wordWrap: { width: w - 44, useAdvancedWrap: true }
    });

    // 3. Database Dispatch Indicator Bar
    const dbBar = scene.add.rectangle(0, 88, w - 24, 46, 0x111c30, 1);
    dbBar.setStrokeStyle(1.5, 0x38bdf8, 0.85);

    const dbIcon = scene.add.text(-w / 2 + 18, 79, '🗄️', { fontSize: '14px' });
    const dbAction = scene.add.text(-w / 2 + 44, 78, config.dbAction || 'ORM: SELECT * FROM orders WHERE id = 1042;', {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#38bdf8', fontStyle: 'bold',
        wordWrap: { width: w - 74, useAdvancedWrap: true }
    });

    // Status Footer
    const footer = scene.add.text(0, h / 2 - 14, config.serverStatus || 'LISTENING: HTTP/2 ACTIVE ON PORT 8000', {
        fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#34d399', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([
        shadow, body, header, title, portTag,
        decBox, decLabel, decText,
        funcBox, funcLabel, funcSig, funcBody,
        dbBar, dbIcon, dbAction, footer
    ]);

    container.userData = {
        decBox,
        decText,
        funcBox,
        funcSig,
        funcBody,
        dbAction,
        footer,
        setServerStatus: (text, color = '#34d399') => {
            footer.setText(text);
            footer.setColor(color);
        },
        flashDecorator: (duration = 0.6) => {
            scene.tweens.add({
                targets: decBox,
                alpha: 0.3,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        },
        flashHandler: (duration = 0.6) => {
            scene.tweens.add({
                targets: funcBox,
                alpha: 0.3,
                duration: duration * 1000,
                yoyo: true,
                repeat: 1
            });
        }
    };

    return container;
}

/**
 * 6. Creates an Enlarged, High-Clarity Mini Database Vault (Right-Bottom Station - 410x120)
 * Displays live row contents with large 11.5px bold monospace text.
 */
export function createMiniDatabaseVault(scene, x, y, tableName = 'orders', initialRows = []) {
    const container = scene.add.container(x, y);

    const w = 410;
    const h = 120;

    const shadow = scene.add.rectangle(4, 5, w, h, 0x000000, 0.55);
    const body = scene.add.rectangle(0, 0, w, h, 0x0b111e, 0.98);
    body.setStrokeStyle(1.5, 0x38bdf8, 0.85);

    // Header Bar
    const header = scene.add.rectangle(0, -h / 2 + 14, w, 28, 0x142038, 1);
    const title = scene.add.text(-w / 2 + 14, -h / 2 + 7, `RELATIONAL TABLE: ${tableName.toUpperCase()}`, {
        fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#38bdf8', fontStyle: 'bold'
    });

    const btree = scene.add.text(w / 2 - 14, -h / 2 + 7, 'B-TREE PK INDEX', {
        fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#f59e0b', fontStyle: 'bold'
    }).setOrigin(1, 0);

    // Row Slots (Max 2 rows displayed)
    const rowSlots = [];
    const rowsCont = scene.add.container(0, 0);

    for (let r = 0; r < 2; r++) {
        const ry = -h / 2 + 44 + (r * 34);
        const rowBg = scene.add.rectangle(0, ry, w - 24, 30, 0x111927, 0.9);
        rowBg.setStrokeStyle(1, 0x1e293b, 1);

        const initialTxt = initialRows[r] || '[ EMPTY SLOT // READY ]';
        const rowText = scene.add.text(-w / 2 + 18, ry - 7, initialTxt, {
            fontFamily: 'JetBrains Mono', fontSize: '11px',
            color: initialRows[r] ? '#ffffff' : '#475569',
            fontStyle: initialRows[r] ? 'bold' : 'italic',
            wordWrap: { width: w - 44, useAdvancedWrap: true }
        });

        rowSlots.push({ rowBg, rowText });
        rowsCont.add([rowBg, rowText]);
    }

    container.add([shadow, body, header, title, btree, rowsCont]);

    container.userData = {
        rowSlots,
        setRow: (idx, text, color = '#ffffff') => {
            if (idx >= 0 && idx < rowSlots.length) {
                rowSlots[idx].rowText.setText(text);
                rowSlots[idx].rowText.setColor(color);
                rowSlots[idx].rowText.setFontStyle('bold');
            }
        },
        highlightRow: (idx, color = 0x10b981) => {
            if (idx >= 0 && idx < rowSlots.length) {
                rowSlots[idx].rowBg.setStrokeStyle(2, color, 1);
                scene.tweens.add({
                    targets: rowSlots[idx].rowBg,
                    scaleX: 1.03,
                    duration: 250,
                    yoyo: true,
                    repeat: 1
                });
            }
        },
        clearRow: (idx, placeholder = '[ DELETED // SLOT FREED ]') => {
            if (idx >= 0 && idx < rowSlots.length) {
                rowSlots[idx].rowText.setText(placeholder);
                rowSlots[idx].rowText.setColor('#ef4444');
                rowSlots[idx].rowText.setFontStyle('italic');
                rowSlots[idx].rowBg.setStrokeStyle(1.5, 0xef4444, 0.8);
            }
        }
    };

    return container;
}
