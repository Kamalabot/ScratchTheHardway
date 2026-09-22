import Phaser from 'phaser';
import gsap from 'gsap';
import { sfx } from './audio.js';
import {
    VISUAL_TOKENS,
    createMemoryLocker,
    createIrregularDataBlob,
    createTypeToken,
    createALUGearbox,
    createLedgerPrinterHead,
    createTemplateStencil,
    createPickAndPlaceArm,
    createDOMShelfRack,
    createPedagogicalBanner
} from './visual_design_system.js';

// Helper to notify top-level scrubber
function updateScrubber() {
    if (typeof window.updateStudioScrubber === 'function') {
        window.updateStudioScrubber();
    }
}

// ============================================================================
// STAGE 1: THE INPUT DEPOT & TYPE FOUNDRY (1.5x SCALE)
// ============================================================================
export class SceneInputDepot extends Phaser.Scene {
    constructor() { super('SceneInputDepot'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        // 1. Terminal Console Window (Left) - Scaled 1.5x
        const termX = cx - 310;
        const termY = cy - 30;
        this.terminal = this.add.container(termX, termY);
        const termBg = this.add.rectangle(0, 0, 310, 240, 0x0a0f1d, 0.96);
        termBg.setStrokeStyle(2, 0x00f0ff, 0.75);

        const termHeader = this.add.rectangle(0, -102, 310, 36, 0x141d33, 1);
        const termTitle = this.add.text(-140, -111, 'INPUT STREAM // STDIN PORT', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00f0ff', fontStyle: 'bold'
        });

        this.line1 = this.add.text(-140, -70, '> name = input("Customer: ")', {
            fontFamily: 'JetBrains Mono', fontSize: '11.5px', color: '#6272a4'
        });
        this.line2 = this.add.text(-140, -42, '  RAW: "   Elena   \\n"', {
            fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#00f0ff', fontStyle: 'bold'
        }).setAlpha(0);

        this.line3 = this.add.text(-140, -14, '> price = float(input("Price: "))', {
            fontFamily: 'JetBrains Mono', fontSize: '11.5px', color: '#6272a4'
        });
        this.line4 = this.add.text(-140, 14, '  RAW: "  850.00  " -> 850.00', {
            fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#ffd600', fontStyle: 'bold'
        }).setAlpha(0);

        this.line5 = this.add.text(-140, 42, '> qty = int(input("Qty: "))', {
            fontFamily: 'JetBrains Mono', fontSize: '11.5px', color: '#6272a4'
        });
        this.line6 = this.add.text(-140, 70, '  RAW: "  003  " -> 3', {
            fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#ff3366', fontStyle: 'bold'
        }).setAlpha(0);

        // Terminal Ejection Port / Chute at the bottom
        const chute = this.add.rectangle(60, 126, 80, 24, 0x1e293b, 1);
        chute.setStrokeStyle(1.5, 0x00f0ff, 0.85);
        const chuteLabel = this.add.text(60, 126, 'DISPENSE CHUTE', {
            fontFamily: 'JetBrains Mono', fontSize: '7.5px', color: '#00f0ff', fontStyle: 'bold'
        }).setOrigin(0.5);
        const chuteNozzle = this.add.rectangle(60, 140, 48, 8, 0x00f0ff, 0.9);

        this.terminal.add([termBg, termHeader, termTitle, this.line1, this.line2, this.line3, this.line4, this.line5, this.line6, chute, chuteLabel, chuteNozzle]);

        // 2. Vibrating Ingestion Conveyor Track (Spans continuously from terminal chute to the die)
        const trackY = cy + 140;
        this.conveyor = this.add.container(cx + 20, trackY);
        const trackBed = this.add.rectangle(0, 0, 680, 32, 0x151c2e, 1);
        trackBed.setStrokeStyle(2, 0x334155, 1);

        for (let rx = -320; rx <= 320; rx += 32) {
            const roller = this.add.circle(rx, 0, 7, 0x334155);
            this.conveyor.add(roller);
        }
        const beltLabel = this.add.text(0, 28, 'VIBRATING CONVEYOR // RAW INGESTION TO DIE FOUNDRY', {
            fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#6272a4', letterSpacing: 1.5, fontStyle: 'bold'
        }).setOrigin(0.5);
        this.conveyor.add([trackBed, beltLabel]);

        // 3. Heavy Hydraulic Type Casting Die & Press (Center-Right)
        const pressX = cx + 120;
        const pressY = cy - 30;
        this.press = this.add.container(pressX, pressY);
        const pressFrame = this.add.rectangle(0, 0, 240, 220, 0x0f1524, 0.96);
        pressFrame.setStrokeStyle(2.5, 0xffaa00, 0.9);

        const pressLabel = this.add.text(0, -90, 'HYDRAULIC TYPE CASTING DIE', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ffaa00', fontStyle: 'bold', letterSpacing: 1
        }).setOrigin(0.5);

        // Hydraulic Ram Piston & Die Head
        this.ramPiston = this.add.rectangle(0, -20, 52, 100, 0x94a3b8, 1);
        this.ramPiston.setStrokeStyle(1.5, 0xcbd5e1, 1);
        
        // Die Head that literally descends and touches the data
        this.ramHead = this.add.rectangle(0, 42, 180, 32, 0xd97706, 1);
        this.ramHead.setStrokeStyle(2, 0xffd600, 1);
        this.ramHeadText = this.add.text(0, 42, 'RESHAPE & HARDEN DIE', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#000000', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.press.add([pressFrame, pressLabel, this.ramPiston, this.ramHead, this.ramHeadText]);

        // 4. Mis-shapen, Irregular Raw Data Blobs (Start at the Terminal Chute)
        const dropX = termX + 60; // Directly below the terminal dispenser chute
        this.blobStr = createIrregularDataBlob(this, dropX, trackY - 70, '"  Elena  "', 'string').setAlpha(0);
        this.blobFloat = createIrregularDataBlob(this, dropX, trackY - 70, '" 850.00 "', 'float').setAlpha(0);
        this.blobInt = createIrregularDataBlob(this, dropX, trackY - 70, '"  003  "', 'integer').setAlpha(0);

        // 5. Hardened, Polished Rectangular Type Tokens (Revealed at the Die position)
        this.tokenStr = createTypeToken(this, pressX, trackY - 30, '"Elena"', 'string').setAlpha(0);
        this.tokenFloat = createTypeToken(this, pressX, trackY - 30, '850.00', 'float').setAlpha(0);
        this.tokenInt = createTypeToken(this, pressX, trackY - 30, '3', 'integer').setAlpha(0);

        this.initTimeline(cx, cy, pressX, dropX, trackY);
    }

    initTimeline(cx, cy, pressX, dropX, trackY) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        // Reset all states for clean replay & scrub
        tl.call(() => {
            this.blobStr.setPosition(dropX, trackY - 70).setAlpha(0).setScale(1);
            this.blobFloat.setPosition(dropX, trackY - 70).setAlpha(0).setScale(1);
            this.blobInt.setPosition(dropX, trackY - 70).setAlpha(0).setScale(1);
            this.tokenStr.setPosition(pressX, trackY - 30).setAlpha(0);
            this.tokenFloat.setPosition(pressX, trackY - 30).setAlpha(0);
            this.tokenInt.setPosition(pressX, trackY - 30).setAlpha(0);
            this.line2.setAlpha(0);
            this.line4.setAlpha(0);
            this.line6.setAlpha(0);
        });

        // --- CYCLE 1: Customer String Ingestion & Casting ---
        tl.call(() => sfx.blip(850));
        tl.to(this.line2, { alpha: 1, duration: 0.3 });
        
        // Blob drops from the terminal dispenser chute onto the conveyor
        tl.call(() => sfx.whoosh());
        tl.to(this.blobStr, { alpha: 1, y: trackY - 30, duration: 0.35, ease: 'bounce.out' });

        // Irregular blob rolls along the conveyor track into the casting station
        tl.to(this.blobStr, { x: pressX, duration: 0.9, ease: 'power1.inOut' });

        // Hydraulic die descends and LITERALLY TOUCHES the top surface of the irregular blob
        tl.call(() => sfx.whoosh());
        // Distance: from pressY + 42 (cy + 12) down to trackY - 45 (cy + 95)
        tl.to([this.ramHead, this.ramHeadText], { y: 125, duration: 0.22, ease: 'power2.in' });
        tl.to(this.ramPiston, { y: 65, duration: 0.22, ease: 'power2.in' }, "<");

        // Literal physical compression & reshaping under the die
        tl.call(() => {
            sfx.clank();
            sfx.laser();
        });
        tl.to(this.blobStr, { scaleY: 0.4, scaleX: 1.2, duration: 0.12 });
        tl.to(this.blobStr, { alpha: 0, duration: 0.1 });
        tl.to(this.tokenStr, { alpha: 1, duration: 0.1 }, "<");

        // Die lifts up, revealing the crisp, polished rectangular token
        tl.to([this.ramHead, this.ramHeadText], { y: 42, duration: 0.28, ease: 'power2.out' });
        tl.to(this.ramPiston, { y: -20, duration: 0.28, ease: 'power2.out' }, "<");

        // Polished rectangular token rolls smoothly out to the right towards memory
        tl.to(this.tokenStr, { x: pressX + 220, duration: 0.7, ease: 'power1.out' });

        // --- CYCLE 2: Float Ingestion & Casting ---
        tl.call(() => sfx.blip(1050));
        tl.to(this.line4, { alpha: 1, duration: 0.3 });
        tl.call(() => sfx.whoosh());
        tl.to(this.blobFloat, { alpha: 1, y: trackY - 30, duration: 0.35, ease: 'bounce.out' });
        tl.to(this.blobFloat, { x: pressX, duration: 0.9, ease: 'power1.inOut' });

        tl.to([this.ramHead, this.ramHeadText], { y: 125, duration: 0.22, ease: 'power2.in' });
        tl.to(this.ramPiston, { y: 65, duration: 0.22, ease: 'power2.in' }, "<");
        tl.call(() => {
            sfx.clank();
            sfx.laser();
        });
        tl.to(this.blobFloat, { scaleY: 0.4, scaleX: 1.2, duration: 0.12 });
        tl.to(this.blobFloat, { alpha: 0, duration: 0.1 });
        tl.to(this.tokenFloat, { alpha: 1, duration: 0.1 }, "<");
        tl.to([this.ramHead, this.ramHeadText], { y: 42, duration: 0.28, ease: 'power2.out' });
        tl.to(this.ramPiston, { y: -20, duration: 0.28, ease: 'power2.out' }, "<");
        tl.to(this.tokenFloat, { x: pressX + 220, duration: 0.7, ease: 'power1.out' });

        // --- CYCLE 3: Integer Ingestion & Casting ---
        tl.call(() => sfx.blip(1250));
        tl.to(this.line6, { alpha: 1, duration: 0.3 });
        tl.call(() => sfx.whoosh());
        tl.to(this.blobInt, { alpha: 1, y: trackY - 30, duration: 0.35, ease: 'bounce.out' });
        tl.to(this.blobInt, { x: pressX, duration: 0.9, ease: 'power1.inOut' });

        tl.to([this.ramHead, this.ramHeadText], { y: 125, duration: 0.22, ease: 'power2.in' });
        tl.to(this.ramPiston, { y: 65, duration: 0.22, ease: 'power2.in' }, "<");
        tl.call(() => {
            sfx.clank();
            sfx.laser();
        });
        tl.to(this.blobInt, { scaleY: 0.4, scaleX: 1.2, duration: 0.12 });
        tl.to(this.blobInt, { alpha: 0, duration: 0.1 });
        tl.to(this.tokenInt, { alpha: 1, duration: 0.1 }, "<");
        tl.to([this.ramHead, this.ramHeadText], { y: 42, duration: 0.28, ease: 'power2.out' });
        tl.to(this.ramPiston, { y: -20, duration: 0.28, ease: 'power2.out' }, "<");
        tl.to(this.tokenInt, { x: pressX + 220, duration: 0.7, ease: 'power1.out' });
    }
}

// ============================================================================
// STAGE 2: THE VARIABLE MATRIX & ALU FORGE (1.5x SCALE)
// ============================================================================
export class SceneMemoryALU extends Phaser.Scene {
    constructor() { super('SceneMemoryALU'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        // 1. RAM Memory Bank (Left Column) - Scaled 1.5x
        this.lockers = [
            createMemoryLocker(this, cx - 270, cy - 135, 'customer', '"Elena"', 'string'),
            createMemoryLocker(this, cx - 270, cy - 45, 'price', '850.00', 'float'),
            createMemoryLocker(this, cx - 270, cy + 45, 'qty', '3', 'integer'),
            createMemoryLocker(this, cx - 270, cy + 135, 'total', '---', 'float')
        ];

        // 2. ALU Core (Right) - Scaled 1.5x
        this.alu = createALUGearbox(this, cx + 160, cy);

        // 3. Transport Pods (For pulling operands into ALU) - Scaled 1.5x
        this.podPrice = createTypeToken(this, cx - 270, cy - 45, '850.00', 'float').setAlpha(0);
        this.podQty = createTypeToken(this, cx - 270, cy + 45, '3', 'integer').setAlpha(0);
        this.podTotal = createTypeToken(this, cx + 160, cy, '2550.00', 'float').setAlpha(0);

        this.initTimeline(cx, cy);
    }

    initTimeline(cx, cy) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        // Flash initial RAM allocations
        tl.call(() => {
            sfx.blip(800);
            this.lockers[0].userData.flashHighlight();
            this.lockers[1].userData.flashHighlight();
            this.lockers[2].userData.flashHighlight();
        });
        tl.to({}, { duration: 0.6 });

        // Pull price & qty operands from RAM into ALU gear mouths
        tl.call(() => sfx.whoosh());
        tl.to(this.podPrice, { alpha: 1, x: cx + 90, y: cy - 20, duration: 0.8, ease: 'power2.inOut' });
        tl.to(this.podQty, { alpha: 1, x: cx + 230, y: cy - 20, duration: 0.8, ease: 'power2.inOut' }, "<");

        // ALU Gear crunch & calculation
        tl.call(() => {
            sfx.gearCrunch();
            this.alu.userData.spinGears(1.4);
            this.alu.userData.setReadout('COMPUTING: 850.00 × 3', '#ffd600');
        });
        tl.to({}, { duration: 1.2 });

        // ALU Ejects Product
        tl.call(() => {
            sfx.cachePing();
            this.alu.userData.setReadout('RESULT FORGED: 2550.00', '#00ff88');
            this.podPrice.setAlpha(0);
            this.podQty.setAlpha(0);
        });
        tl.to(this.podTotal, { alpha: 1, scale: 1.25, duration: 0.25, yoyo: true });

        // Route product back into 'total' RAM locker
        tl.call(() => sfx.whoosh());
        tl.to(this.podTotal, { x: cx - 270, y: cy + 135, duration: 0.9, ease: 'power2.inOut' });
        tl.call(() => {
            sfx.snap();
            this.lockers[3].userData.setValue('2550.00');
            this.lockers[3].userData.flashHighlight();
            this.podTotal.setAlpha(0);
        });
    }
}

// ============================================================================
// STAGE 3: THE DISK SCRIBE & LEDGER ARCHIVAL (1.5x SCALE)
// ============================================================================
export class SceneDiskPersistence extends Phaser.Scene {
    constructor() { super('SceneDiskPersistence'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        // 1. File Vault Door (Left) - Scaled 1.5x
        this.vault = this.add.container(cx - 300, cy - 20);
        const vaultDoor = this.add.rectangle(0, 0, 220, 290, 0x101626, 0.96);
        vaultDoor.setStrokeStyle(2.5, 0x00f0ff, 0.8);

        // Vault Radial Lock Wheel
        this.lockWheel = this.add.circle(0, -45, 38, 0x1e293b);
        this.lockWheel.setStrokeStyle(2.5, 0x00f0ff, 1);
        const spoke1 = this.add.rectangle(0, -45, 66, 6, 0x00f0ff);
        const spoke2 = this.add.rectangle(0, -45, 6, 66, 0x00f0ff);

        const fileNameTag = this.add.text(0, 48, 'orders.csv', {
            fontFamily: 'JetBrains Mono', fontSize: '16px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.lockStatus = this.add.text(0, 80, 'STATUS: LOCKED', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ff3366', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.vault.add([vaultDoor, this.lockWheel, spoke1, spoke2, fileNameTag, this.lockStatus]);

        // 2. Designated File Ledger Document Sheet (Center) - Bounded & Clear
        const sheetW = 480;
        const sheetH = 140;
        this.anvil = this.add.container(cx + 80, cy + 60);

        const sheetShadow = this.add.rectangle(4, 5, sheetW, sheetH, 0x000000, 0.55);
        const sheetBed = this.add.rectangle(0, 0, sheetW, sheetH, 0x0a0f1d, 0.98);
        sheetBed.setStrokeStyle(2, 0x334155, 1);

        // File Document Header Bar
        const sheetHeader = this.add.rectangle(0, -sheetH / 2 + 16, sheetW, 32, 0x151d33, 1);
        sheetHeader.setStrokeStyle(1, 0x1e293b, 1);
        const sheetTitle = this.add.text(-sheetW / 2 + 16, -sheetH / 2 + 10, 'orders.csv // APPEND BUFFER (flock: LOCKED)', {
            fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00f0ff', fontStyle: 'bold'
        });

        // Column Guide Headers
        const colHeaders = this.add.text(-sheetW / 2 + 16, -sheetH / 2 + 38, 'ORDER_ID   | CUSTOMER | PRODUCT | QTY | TOTAL', {
            fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#6272a4', fontStyle: 'bold'
        });

        // Content Line (Guaranteed to fit inside designated rectangle)
        this.ledgerText = this.add.text(-sheetW / 2 + 16, 8, '', {
            fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#00ff88', fontStyle: 'bold'
        });

        this.anvil.add([sheetShadow, sheetBed, sheetHeader, sheetTitle, colHeaders, this.ledgerText]);

        // 3. High-Clarity Scribe Print Carriage (Moving along guide rails cleanly above document sheet)
        this.scribe = createLedgerPrinterHead(this, cx + 80, cy - 85);

        // 4. Spinning Magnetic Platter & Laser Commit (Top Right)
        this.platter = this.add.container(cx + 260, cy - 140);
        const diskDisc = this.add.circle(0, 0, 52, 0x161e2e);
        diskDisc.setStrokeStyle(2, 0x00ff88, 0.85);
        const spindle = this.add.circle(0, 0, 10, 0x334155);
        this.laserTrack = this.add.circle(0, 0, 32, 0x00ff88, 0.35).setAlpha(0);

        const diskLabel = this.add.text(0, 66, 'NVMe SECTOR // FSYNC', {
            fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#6272a4', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.platter.add([diskDisc, spindle, this.laserTrack, diskLabel]);

        this.initTimeline(cx, cy, sheetTitle);
    }

    initTimeline(cx, cy, sheetTitle) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        // Reset ledger text to empty state on timeline start
        tl.call(() => {
            this.ledgerText.setText('');
        });

        // Unlock file with rotating lock wheel
        tl.call(() => sfx.whoosh());
        tl.to(this.lockWheel, { angle: 180, duration: 0.6, ease: 'power2.inOut' });
        tl.call(() => {
            sfx.clank();
            this.lockStatus.setText('STATUS: FILE_OPEN (flock)');
            this.lockStatus.setColor('#00ff88');
            sheetTitle.setText('orders.csv // APPEND BUFFER (flock: ACQUIRED)');
        });
        tl.to({}, { duration: 0.3 });

        // Exactly defined tokens: NO double commas, perfectly bounded inside sheet
        const tokens = ['ORD-9021', ',', 'Elena', ',', 'Sensor', ',', '3', ',', '$2550.00'];

        tokens.forEach((tok, idx) => {
            const carriageTargetX = -180 + (idx * 40);
            tl.to(this.scribe.userData.carriage, {
                x: carriageTargetX,
                duration: 0.16,
                ease: 'power1.out'
            });
            tl.call(() => {
                sfx.typewriterStamp();
                // Stateless slice: strictly slice tokens up to current index!
                const currentStr = tokens.slice(0, idx + 1).join('');
                this.ledgerText.setText(currentStr);
                this.scribe.userData.strike();
            });
            tl.to({}, { duration: 0.08 });
        });

        // Disk Platter Laser Commit (fsync)
        tl.call(() => {
            sfx.dbCommit();
            sfx.laser();
        });
        tl.to(this.laserTrack, { alpha: 1, scale: 1.25, duration: 0.45, yoyo: true, repeat: 1 });
        tl.to(this.platter, { angle: 360, duration: 1.3, ease: 'power2.out' }, "<");

        // Lock vault door shut
        tl.to(this.lockWheel, { angle: 0, duration: 0.5, ease: 'power2.inOut' });
        tl.call(() => {
            sfx.clank();
            this.lockStatus.setText('STATUS: COMMITTED (fsync ok)');
            this.lockStatus.setColor('#00f0ff');
            sheetTitle.setText('orders.csv // COMMITTED TO DISK SECTOR');
        });
    }
}

// ============================================================================
// STAGE 4: THE TEMPLATE WEAVING LOOM (1.5x SCALE MECHANICAL LOOM APPARATUS)
// ============================================================================
export class SceneTemplateEngine extends Phaser.Scene {
    constructor() { super('SceneTemplateEngine'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        // 1. Pedagogical Floating Narration Banner (Top)
        this.banner = createPedagogicalBanner(this, cx, cy - 210, 620, 42);
        this.banner.userData.setMessage('1. TEMPLATE LOOM: Mounting blueprint stencil with {{ placeholder }} sockets...');

        // 2. THE MECHANICAL WEAVING LOOM STRUCTURAL FRAME
        const loomW = 760;
        const loomH = 340;
        const loomY = cy + 30;
        this.loomFrame = this.add.container(cx, loomY);

        // Heavy Left & Right Vertical Loom Towers
        const leftTower = this.add.rectangle(-loomW / 2 + 18, 0, 36, loomH, 0x141d33, 1);
        leftTower.setStrokeStyle(2, 0x334155, 1);
        const rightTower = this.add.rectangle(loomW / 2 - 18, 0, 36, loomH, 0x141d33, 1);
        rightTower.setStrokeStyle(2, 0x334155, 1);

        // Overhead Heavy Gantry Rail Beam (where the pick-and-place arm travels)
        const gantryBeam = this.add.rectangle(0, -loomH / 2 + 18, loomW, 36, 0x0f172a, 1);
        gantryBeam.setStrokeStyle(2, 0x00f0ff, 0.85);

        // Rail gear tooth rack
        for (let gx = -loomW / 2 + 45; gx <= loomW / 2 - 45; gx += 24) {
            const rackTooth = this.add.rectangle(gx, -loomH / 2 + 18, 6, 16, 0x00f0ff, 0.4);
            this.loomFrame.add(rackTooth);
        }

        const loomTag = this.add.text(0, -loomH / 2 + 18, 'INDUSTRIAL TEMPLATE LOOM // HOT TYPESETTING GANTRY', {
            fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#00f0ff', fontStyle: 'bold', letterSpacing: 1.5
        }).setOrigin(0.5);

        this.loomFrame.add([leftTower, rightTower, gantryBeam, loomTag]);

        // 3. Central Template Bed / Blueprint Platen inside the Loom
        this.stencil = createTemplateStencil(this, cx + 50, cy + 50, 440, 230);
        this.slotCust = this.stencil.userData.addSocket(-40, -45, 'customer', 220, 34);
        this.slotItem = this.stencil.userData.addSocket(-40, 0, 'item', 220, 34);
        this.slotTotal = this.stencil.userData.addSocket(-40, 45, 'total_amount', 220, 34);

        // 4. Infeed RAM Variable Tray (Left inside Loom)
        const trayX = cx - 240;
        this.trayLabel = this.add.text(trayX, cy - 85, 'RAM INFEED', {
            fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#6272a4', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.varCust = createTypeToken(this, trayX, cy - 45, '"Elena"', 'string');
        this.varItem = createTypeToken(this, trayX, cy + 15, '"Sensor"', 'string');
        this.varTotal = createTypeToken(this, trayX, cy + 75, '$2550.00', 'float');

        // 5. Overhead Pick-and-Place Gantry Arm (Suspended from the Loom Rail)
        this.arm = createPickAndPlaceArm(this, trayX, cy - 130);

        // 6. Loom Thermal Fusion Roller Bar (Sweeps across the template bed)
        this.roller = this.add.rectangle(cx + 270, cy + 50, 18, 230, 0xff5500, 0.95);
        this.roller.setStrokeStyle(2.5, 0xffd600, 1);
        this.roller.setAlpha(0);

        this.initTimeline(cx, cy, trayX);
    }

    initTimeline(cx, cy, trayX) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        const targetSocketX = cx + 10;

        // Step 1: Pick and place Customer
        tl.call(() => {
            this.banner.userData.setMessage('2. GANTRY TROLLEY: Glides along rail, grabs "Elena" from RAM tray...');
            sfx.whoosh();
        });
        tl.to(this.arm, { x: trayX, duration: 0.35 });
        tl.call(() => {
            sfx.snap();
            this.arm.userData.extendRod(35);
        });
        tl.to(this.varCust, { y: cy - 90, duration: 0.35 });
        tl.to(this.arm, { x: targetSocketX, duration: 0.6, ease: 'power2.inOut' });
        tl.to(this.varCust, { x: targetSocketX, y: cy + 5, duration: 0.6, ease: 'power2.inOut' }, "<");
        tl.call(() => {
            sfx.snap();
            this.slotCust.fillValue('Elena');
            this.varCust.setAlpha(0);
        });

        // Step 2: Pick and place Item
        tl.call(() => {
            this.banner.userData.setMessage('3. INTERPOLATION: Picking "Quantum Sensor" -> Inserting into {{ item }} socket...');
            sfx.whoosh();
        });
        tl.to(this.arm, { x: trayX, duration: 0.45 });
        tl.call(() => {
            sfx.snap();
            this.arm.userData.extendRod(35);
        });
        tl.to(this.varItem, { y: cy - 90, duration: 0.35 });
        tl.to(this.arm, { x: targetSocketX, duration: 0.6, ease: 'power2.inOut' });
        tl.to(this.varItem, { x: targetSocketX, y: cy + 50, duration: 0.6, ease: 'power2.inOut' }, "<");
        tl.call(() => {
            sfx.snap();
            this.slotItem.fillValue('Quantum Sensor (x3)');
            this.varItem.setAlpha(0);
        });

        // Step 3: Pick and place Total
        tl.call(() => {
            this.banner.userData.setMessage('4. COMPUTATION: Picking forged $2,550.00 -> Inserting into {{ total }} socket...');
            sfx.whoosh();
        });
        tl.to(this.arm, { x: trayX, duration: 0.45 });
        tl.call(() => {
            sfx.snap();
            this.arm.userData.extendRod(35);
        });
        tl.to(this.varTotal, { y: cy - 90, duration: 0.35 });
        tl.to(this.arm, { x: targetSocketX, duration: 0.6, ease: 'power2.inOut' });
        tl.to(this.varTotal, { x: targetSocketX, y: cy + 95, duration: 0.6, ease: 'power2.inOut' }, "<");
        tl.call(() => {
            sfx.snap();
            this.slotTotal.fillValue('$2,550.00');
            this.varTotal.setAlpha(0);
        });

        // Step 4: Loom Thermal Fusion Roller Sweep (Welding HTML)
        tl.call(() => {
            this.banner.userData.setMessage('5. THERMAL WEAVING: Hot fusion roller permanently welds data into HTML document!', '#ffd600');
            sfx.laser();
            this.roller.setAlpha(1);
        });
        tl.to(this.arm, { y: cy - 180, duration: 0.35 });
        tl.to(this.roller, { x: cx - 170, duration: 1.1, ease: 'power2.inOut' });
        tl.call(() => sfx.cachePing());
        tl.to(this.stencil.userData.sheet, { fillColor: 0x092b5a, duration: 0.4 });
        tl.to(this.roller, { alpha: 0, duration: 0.3 });
    }
}

// ============================================================================
// STAGE 5: THE WIRE EXPRESS & DOM PAINTER (1.5x SCALE & DATA PUSH STREAM)
// ============================================================================
export class SceneBrowserDOM extends Phaser.Scene {
    constructor() { super('SceneBrowserDOM'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        // 1. Fiber Pneumatic Conduit (From Server on Left to Browser on Right) - Scaled 1.5x
        const conduit = this.add.graphics();
        conduit.lineStyle(8, 0x1e3a5f, 0.85);
        conduit.lineBetween(cx - 360, cy, cx - 180, cy);
        conduit.lineStyle(3, 0x38bdf8, 1);
        conduit.lineBetween(cx - 360, cy, cx - 180, cy);

        // Processor Push Engine Indicator
        this.cpuPushLabel = this.add.text(cx - 360, cy - 45, 'CPU DISPATCH >>\nPUSHING STREAM', {
            fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#00f0ff', fontStyle: 'bold'
        });

        // Transit Data Capsule
        this.capsule = this.add.container(cx - 360, cy);
        const capBody = this.add.rectangle(0, 0, 64, 28, 0x00f0ff, 0.95);
        capBody.setStrokeStyle(2, 0xffffff, 1);
        const capText = this.add.text(0, 0, 'HTML_DOC', {
            fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#000000', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.capsule.add([capBody, capText]);
        this.capsule.setAlpha(0);

        // Stream text tokens pushed by the processor directly into DOM shelf slots
        this.streamHeader = this.add.text(cx - 220, cy, '<header>', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00f0ff', fontStyle: 'bold'
        }).setAlpha(0);
        this.streamCust = this.add.text(cx - 220, cy, 'Elena Rostova', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ffd600', fontStyle: 'bold'
        }).setAlpha(0);
        this.streamItems = this.add.text(cx - 220, cy, 'Quantum Sensor x3', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00ff88', fontStyle: 'bold'
        }).setAlpha(0);
        this.streamTotal = this.add.text(cx - 220, cy, '$2,550.00 USD', {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ff3366', fontStyle: 'bold'
        }).setAlpha(0);

        // 2. Browser Viewport Shelf Chassis (Right) - Scaled 1.5x (510x360)
        this.browserRack = createDOMShelfRack(this, cx + 90, cy, 510, 360);

        // Shelves initially collapsed and 100% free of any information
        this.shelfHeader = this.browserRack.userData.addShelf(-70, 'header', 'CUSTOMER INVOICE', '', 0x00f0ff);
        this.shelfCust = this.browserRack.userData.addShelf(-18, 'div.client', 'CLIENT NAME', '', 0xffd600);
        this.shelfItems = this.browserRack.userData.addShelf(34, 'table.items', 'ORDERED ITEMS', '', 0x00ff88);
        this.shelfTotal = this.browserRack.userData.addShelf(86, 'footer.total', 'GRAND TOTAL DUE', '', 0xff3366);

        // Stamp badge for verified receipt
        this.paidStamp = this.add.container(cx + 240, cy + 65);
        const stampBg = this.add.rectangle(0, 0, 130, 42, 0x042f1a, 0.96);
        stampBg.setStrokeStyle(2.5, 0x00ff88, 1);
        const stampText = this.add.text(0, 0, '200 OK // PAID', {
            fontFamily: 'JetBrains Mono', fontSize: '12.5px', color: '#00ff88', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.paidStamp.add([stampBg, stampText]);
        this.paidStamp.setAlpha(0);

        this.initTimeline(cx, cy);
    }

    initTimeline(cx, cy) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        // Reset all DOM states so initially the DOM area is 100% free of information
        tl.call(() => {
            this.browserRack.userData.resetDOM();
            this.paidStamp.setAlpha(0);
            this.capsule.setPosition(cx - 360, cy).setAlpha(0);
            this.streamHeader.setPosition(cx - 220, cy).setAlpha(0);
            this.streamCust.setPosition(cx - 220, cy).setAlpha(0);
            this.streamItems.setPosition(cx - 220, cy).setAlpha(0);
            this.streamTotal.setPosition(cx - 220, cy).setAlpha(0);
            this.cpuPushLabel.setText('CPU DISPATCH >>\nPUSHING STREAM');
        });

        // Shoot HTML capsule through pneumatic fiber conduit
        tl.call(() => sfx.whoosh());
        tl.to(this.capsule, { alpha: 1, duration: 0.1 });
        tl.to(this.capsule, { x: cx - 180, duration: 0.65, ease: 'power2.inOut' });
        tl.to(this.capsule, { alpha: 0, duration: 0.15 });

        // Processor literally pushing each text token into its corresponding shelf slot!
        // Push 1: Header
        tl.call(() => sfx.whoosh());
        tl.to(this.streamHeader, { alpha: 1, x: cx - 10, y: cy - 70, duration: 0.35, ease: 'power2.out' });
        tl.call(() => {
            sfx.snap();
            this.shelfHeader.expandAndPopulate('#ORD-9021');
            this.streamHeader.setAlpha(0);
        });
        tl.to({}, { duration: 0.25 });

        // Push 2: Client
        tl.call(() => sfx.whoosh());
        tl.to(this.streamCust, { alpha: 1, x: cx - 10, y: cy - 18, duration: 0.35, ease: 'power2.out' });
        tl.call(() => {
            sfx.snap();
            this.shelfCust.expandAndPopulate('Elena Rostova');
            this.streamCust.setAlpha(0);
        });
        tl.to({}, { duration: 0.25 });

        // Push 3: Items
        tl.call(() => sfx.whoosh());
        tl.to(this.streamItems, { alpha: 1, x: cx - 10, y: cy + 34, duration: 0.35, ease: 'power2.out' });
        tl.call(() => {
            sfx.snap();
            this.shelfItems.expandAndPopulate('Quantum Sensor × 3');
            this.streamItems.setAlpha(0);
        });
        tl.to({}, { duration: 0.25 });

        // Push 4: Total
        tl.call(() => sfx.whoosh());
        tl.to(this.streamTotal, { alpha: 1, x: cx - 10, y: cy + 86, duration: 0.35, ease: 'power2.out' });
        tl.call(() => {
            sfx.snap();
            this.shelfTotal.expandAndPopulate('$2,550.00 USD');
            this.streamTotal.setAlpha(0);
        });
        tl.to({}, { duration: 0.35 });

        // Stamp 200 OK / PAID badge onto the formatted page
        tl.call(() => {
            sfx.cachePing();
            sfx.blip(1800);
        });
        tl.to(this.paidStamp, { alpha: 1, scale: 1.3, duration: 0.25, ease: 'back.out(2)' });
        tl.to(this.paidStamp, { scale: 1, duration: 0.15 });
    }
}
