import Phaser from 'phaser';
import gsap from 'gsap';
import { sfx } from './audio.js';
import { createPedagogicalBanner, createTypeToken } from './visual_design_system.js';
import {
    createPythonModelTray,
    createPrimaryKeyBadge,
    createForeignKeyShackle,
    createChronoCapsule,
    createORMCompilerPress,
    createRelationalTableMatrix,
    createNormalizationDiverter
} from './orm_design_system.js';

// Helper to notify top-level scrubber
function updateScrubber() {
    if (typeof window.updateStudioScrubber === 'function') {
        window.updateStudioScrubber();
    }
}

/**
 * SceneORMDatabaseEngine:
 * Comprehensive narrative animation showing how an in-memory Python object
 * is decoupled, primary/foreign keys are minted, SQL queries are compiled by the ORM,
 * normalized/denormalized via diverter gantry, and persisted into relational database tables.
 */
export class SceneORMDatabaseEngine extends Phaser.Scene {
    constructor() { super('SceneORMDatabaseEngine'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        // 1. Top Floating Pedagogical Narration Banner
        this.banner = createPedagogicalBanner(this, cx, cy - 240, 740);

        // 2. Station 1 (Left): Python Model Ingress & Heap Object
        const modelX = cx - 380;
        const modelY = cy - 65;
        this.modelTray = createPythonModelTray(this, modelX, modelY);

        // Modular Attributes that decouple from the Python object
        this.tokenCust = createTypeToken(this, modelX, modelY - 38, '"Elena"', 'string').setAlpha(0);
        this.tokenTotal = createTypeToken(this, modelX, modelY - 16, '2550.00', 'float').setAlpha(0);
        this.tokenItem = createTypeToken(this, modelX, modelY + 6, '"QS-900"', 'string').setAlpha(0);
        this.tokenTime = createChronoCapsule(this, modelX, modelY + 28, '2026-09-22T07:15Z').setAlpha(0);

        // 3. Station 2 (Center): ORM Compilation Foundry & SQL Stamping Press
        const pressX = cx - 80;
        const pressY = cy - 70;
        this.press = createORMCompilerPress(this, pressX, pressY);

        // Auto-increment Primary Key and Relational Foreign Key
        this.tokenPk = createPrimaryKeyBadge(this, pressX - 70, pressY - 45, '#PK_1042').setAlpha(0);
        this.tokenFk = createForeignKeyShackle(this, pressX + 70, pressY - 45, '#FK_CUST_42').setAlpha(0);

        // Floating Pedagogical Key Inspector HUD Card
        this.keyInspectorCard = this.add.container(pressX, pressY - 100).setAlpha(0);
        const kiBg = this.add.rectangle(0, 0, 340, 36, 0x070e1b, 0.98);
        kiBg.setStrokeStyle(1.5, 0xffd600, 1);
        const kiTitle = this.add.text(0, -7, '🔑 PRIMARY KEY // UNIQUE ROW IDENTITY', {
            fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#ffd600', fontStyle: 'bold'
        }).setOrigin(0.5);
        const kiSub = this.add.text(0, 7, 'Auto-generated #1042: Uniquely identifies this Order on disk', {
            fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#e2e8f0'
        }).setOrigin(0.5);
        this.keyInspectorCard.add([kiBg, kiTitle, kiSub]);
        this.keyInspectorCard.userData = { bg: kiBg, title: kiTitle, sub: kiSub };

        // 4. Station 3 (Center-Bottom): Normalization / Denormalization Diverter
        const divX = cx - 80;
        const divY = cy + 135;
        this.diverter = createNormalizationDiverter(this, divX, divY);

        // Denormalized read-cache snapshot card
        this.denormCard = this.add.container(divX + 60, divY + 34).setAlpha(0);
        const dCardBg = this.add.rectangle(0, 0, 150, 24, 0x1e1b4b, 1);
        dCardBg.setStrokeStyle(1.5, 0xa855f7, 0.85);
        const dCardText = this.add.text(0, 0, '[CACHE: order_summary]', {
            fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#e9d5ff', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.denormCard.add([dCardBg, dCardText]);

        // 5. Station 4 (Right): Relational Database Table Vaults (Stacked)
        const tableX = cx + 310;

        // Table A (Top): customers
        this.tableCust = createRelationalTableMatrix(this, tableX, cy - 75, 'customers', [
            { name: 'id [PK]', isPk: true },
            { name: 'name' },
            { name: 'created_at' }
        ], 1);

        // Table B (Bottom): orders
        this.tableOrders = createRelationalTableMatrix(this, tableX, cy + 85, 'orders', [
            { name: 'id [PK]', isPk: true },
            { name: 'customer_id [FK]', isFk: true },
            { name: 'total' },
            { name: 'created_at' }
        ], 1);

        // Foreign Key Constraint Tether Line & Padlock Badge
        this.tetherGraphics = this.add.graphics().setAlpha(0);
        this.constraintBadge = this.add.container(tableX - 90, cy + 5).setAlpha(0);
        const cBg = this.add.rectangle(0, 0, 160, 22, 0x082f49, 0.95);
        cBg.setStrokeStyle(1.5, 0x38bdf8, 1);
        const cText = this.add.text(0, 0, 'FK CONSTRAINT: VALIDATED', {
            fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#38bdf8', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.constraintBadge.add([cBg, cText]);

        // Transaction Commit Laser & Stamp
        this.walSweep = this.add.rectangle(tableX, cy + 5, 420, 4, 0x10b981, 0.9).setAlpha(0);
        this.commitBadge = this.add.container(tableX + 110, cy - 135).setAlpha(0);
        const commitBg = this.add.rectangle(0, 0, 140, 28, 0x064e3b, 0.95);
        commitBg.setStrokeStyle(2, 0x10b981, 1);
        const commitText = this.add.text(0, 0, '200 OK // COMMITTED', {
            fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#34d399', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.commitBadge.add([commitBg, commitText]);

        this.initTimeline(cx, cy, modelX, modelY, pressX, pressY, divX, divY, tableX);
    }

    initTimeline(cx, cy, modelX, modelY, pressX, pressY, divX, divY, tableX) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        // Reset all states for clean scrub/replay
        tl.call(() => {
            this.banner.userData.setMessage('1. INGRESS: Python Order() instance arrives on the heap (RAM 0x7FFF_08A0)', '#38bdf8');
            this.modelTray.userData.footer.setText('STATUS: UNPERSISTED HEAP INSTANCE').setColor('#f59e0b');
            this.tableCust.userData.resetTable();
            this.tableOrders.userData.resetTable();
            this.diverter.userData.resetGate();
            this.press.userData.sqlText.setText('');

            this.tokenCust.setPosition(modelX, modelY - 38).setAlpha(0);
            this.tokenTotal.setPosition(modelX, modelY - 16).setAlpha(0);
            this.tokenItem.setPosition(modelX, modelY + 6).setAlpha(0);
            this.tokenTime.setPosition(modelX, modelY + 28).setAlpha(0);

            this.tokenPk.setPosition(pressX - 70, pressY - 45).setAlpha(0).setScale(1);
            this.tokenFk.setPosition(pressX + 70, pressY - 45).setAlpha(0).setScale(1);
            this.keyInspectorCard.setAlpha(0);
            this.denormCard.setAlpha(0);
            this.tetherGraphics.clear().setAlpha(0);
            this.constraintBadge.setAlpha(0);
            this.walSweep.setAlpha(0);
            this.commitBadge.setAlpha(0);
        });

        // --- STEP 1: Laser Scan & Attribute Decoupling ---
        tl.to({}, { duration: 0.5 });
        tl.call(() => {
            sfx.laser();
            this.modelTray.userData.sweepScanner(1.0);
        });
        tl.to({}, { duration: 0.9 });
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('2. INSPECTION: Laser scanner decouples object attributes into typed tokens', '#00f0ff');
            this.modelTray.userData.footer.setText('STATUS: DESTRUCTURING ATTRIBUTES').setColor('#00f0ff');
        });

        // Attributes pop out of the Python object
        tl.to([this.tokenCust, this.tokenTotal, this.tokenItem, this.tokenTime], {
            alpha: 1,
            duration: 0.5,
            stagger: 0.12
        });

        // --- STEP 2: Tokens Glide into the ORM Compiler Foundry ---
        tl.to({}, { duration: 0.5 });
        tl.call(() => {
            sfx.whoosh();
            this.banner.userData.setMessage('3. INGESTION: Deconstructed values glide into the ORM Foundry staging chamber', '#38bdf8');
        });
        tl.to(this.tokenCust, { x: pressX - 100, y: pressY + 10, duration: 1.1, ease: 'power2.inOut' });
        tl.to(this.tokenTotal, { x: pressX, y: pressY + 10, duration: 1.1, ease: 'power2.inOut' }, "<");
        tl.to(this.tokenTime, { x: pressX + 100, y: pressY + 10, duration: 1.1, ease: 'power2.inOut' }, "<");
        tl.to(this.tokenItem, { alpha: 0, duration: 0.5 }, "<");

        // --- STEP 3A: PRIMARY KEY (PK) SPOTLIGHT & NARRATIVE HIGHLIGHT ---
        tl.to({}, { duration: 0.4 });
        tl.call(() => {
            sfx.clank();
            sfx.snap();
            this.banner.userData.setMessage('3A. PRIMARY KEY (PK): ORM mints unique immutable identity seal [#PK_1042]', '#ffd600');

            // Position PK center-stage inside the staging bay
            this.tokenPk.setPosition(pressX, pressY - 45).setAlpha(0).setScale(0.5);

            // Configure Key Inspector HUD Card for PK
            this.keyInspectorCard.userData.bg.setStrokeStyle(1.5, 0xffd600, 1);
            this.keyInspectorCard.userData.title.setText('🔑 PRIMARY KEY (PK) // IMMUTABLE RECORD IDENTIFIER').setColor('#ffd600');
            this.keyInspectorCard.userData.sub.setText('Auto-increment #1042: Guarantees unique entity identity for this order row');
        });

        // Spotlight Entrance: Scale up & reveal HUD
        tl.to(this.keyInspectorCard, { alpha: 1, duration: 0.35 });
        tl.to(this.tokenPk, { alpha: 1, scale: 1.5, duration: 0.6, ease: 'back.out(2)' }, "<");
        tl.call(() => {
            this.tokenPk.userData.pulseHighlight(0.9);
        });
        // Dwell 2.2 seconds so user clearly observes PK
        tl.to({}, { duration: 2.2 });

        // Glide PK into left stamping injection slot
        tl.call(() => sfx.whoosh());
        tl.to(this.tokenPk, { x: pressX - 70, y: pressY - 45, scale: 1.0, duration: 0.6, ease: 'power2.inOut' });

        // --- STEP 3B: FOREIGN KEY (FK) SPOTLIGHT & NARRATIVE HIGHLIGHT ---
        tl.to({}, { duration: 0.3 });
        tl.call(() => {
            sfx.gearCrunch();
            sfx.cachePing();
            this.banner.userData.setMessage('3B. FOREIGN KEY (FK): ORM resolves relation to parent customer [#FK_CUST_42 -> customers.id]', '#38bdf8');

            // Position FK center-stage inside the staging bay
            this.tokenFk.setPosition(pressX, pressY - 45).setAlpha(0).setScale(0.5);

            // Configure Key Inspector HUD Card for FK
            this.keyInspectorCard.userData.bg.setStrokeStyle(1.5, 0x38bdf8, 1);
            this.keyInspectorCard.userData.title.setText('🔗 FOREIGN KEY (FK) // RELATIONAL INTEGRITY POINTER').setColor('#38bdf8');
            this.keyInspectorCard.userData.sub.setText('Resolves customer_id = #42: Links order to Elena Rostova without duplicating data');
        });

        // Spotlight Entrance: Scale up & pulse shackle
        tl.to(this.tokenFk, { alpha: 1, scale: 1.5, duration: 0.6, ease: 'back.out(2)' });
        tl.call(() => {
            this.tokenFk.userData.pulseHighlight(0.9);
        });
        // Dwell 2.2 seconds so user clearly observes FK
        tl.to({}, { duration: 2.2 });

        // Glide FK into right stamping injection slot & fade HUD
        tl.call(() => sfx.whoosh());
        tl.to(this.tokenFk, { x: pressX + 70, y: pressY - 45, scale: 1.0, duration: 0.6, ease: 'power2.inOut' });
        tl.to(this.keyInspectorCard, { alpha: 0, duration: 0.4 }, "<");

        // --- STEP 3C: DUAL KEYS LOCKED INTO SQL DIE HEAD ---
        tl.to({}, { duration: 0.3 });
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('3C. KEYS LOCKED: Primary Key (#1042) & Foreign Key (#42) slotted into SQL die head', '#10b981');
        });
        tl.to([this.tokenPk, this.tokenFk], { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 0.8 });

        // --- STEP 3D: Hydraulic Press Stamps SQL Query ---
        tl.call(() => {
            this.banner.userData.setMessage('4. SQL COMPILATION: Stamping wire query with bound PK ($1=1042) and FK ($2=42)...', '#10b981');
            sfx.whoosh();
        });

        // Hydraulic Press Impact with deliberate mechanical stroke
        tl.to({}, { duration: 0.3 });
        tl.call(() => {
            sfx.clank();
            sfx.laser();
            this.press.userData.stampSQL("INSERT INTO orders (id, cust_id, total, ts) VALUES (1042, 42, 2550.00, '07:15Z') RETURNING id;");
        });
        // Allow time for 600ms descent + 500ms bed hold + 600ms rise + reading buffer
        tl.to({}, { duration: 2.2 });

        // --- STEP 4: Normalization Diverter Splits Stream ---
        tl.call(() => {
            sfx.whoosh();
            this.banner.userData.setMessage('5. NORMALIZATION: Diverter splits stream into normalized customer & order rows', '#f43f5e');
            this.diverter.userData.shuntUpper();
        });
        tl.to({}, { duration: 0.8 }); // Wait for 700ms upper gate rotation

        // Upper branch: Customer dispatches smoothly to customers table
        tl.to(this.tokenCust, { x: tableX - 90, y: cy - 75, duration: 1.2, ease: 'power2.inOut' });
        tl.call(() => {
            sfx.snap();
            this.tableCust.userData.insertRow(0, "42 (PK)   | Elena Rostova | 2026-09-22 07:15Z");
            this.tokenCust.setAlpha(0);
        });

        // Diverter shunts lower branch for order record
        tl.to({}, { duration: 0.6 });
        tl.call(() => {
            sfx.whoosh();
            this.diverter.userData.shuntLower();
        });
        tl.to({}, { duration: 0.8 }); // Wait for 700ms lower gate rotation

        tl.to([this.tokenPk, this.tokenFk, this.tokenTotal, this.tokenTime], {
            x: tableX - 60,
            y: cy + 85,
            duration: 1.2,
            ease: 'power2.inOut'
        });

        // Secondary denormalized cache dispatch
        tl.to(this.denormCard, { alpha: 1, duration: 0.5 }, "<");

        tl.call(() => {
            sfx.snap();
            this.tableOrders.userData.insertRow(0, "1042 (PK) | 42 (FK)        | $2,550.00   | 07:15Z");
            this.tokenPk.setAlpha(0);
            this.tokenFk.setAlpha(0);
            this.tokenTotal.setAlpha(0);
            this.tokenTime.setAlpha(0);
        });

        // --- STEP 5: Relational Foreign Key Constraint Check ---
        tl.to({}, { duration: 0.5 });
        tl.call(() => {
            sfx.cachePing();
            this.banner.userData.setMessage('6. RELATIONAL INTEGRITY: Linking orders.customer_id (FK #42) -> customers.id (PK #42)', '#38bdf8');

            // Draw glowing cyan relational constraint tether line
            this.tetherGraphics.clear();
            this.tetherGraphics.setAlpha(1);
            this.tetherGraphics.lineStyle(3, 0x38bdf8, 0.95);
            // From Table Orders FK column (cy + 85) up to Table Cust PK column (cy - 75)
            this.tetherGraphics.lineBetween(tableX - 120, cy + 85, tableX - 170, cy - 75);
        });
        tl.to(this.constraintBadge, { alpha: 1, scale: 1.1, duration: 0.35, yoyo: true, repeat: 1 });

        // --- STEP 6: WAL Commit & Flush ---
        tl.to({}, { duration: 0.6 });
        tl.call(() => {
            sfx.dbCommit();
            sfx.laser();
            this.banner.userData.setMessage('7. ACID COMMIT: Write-Ahead Log (WAL) syncs sectors to disk. Transaction committed!', '#10b981');
            this.modelTray.userData.footer.setText('STATUS: COMMITTED (SYNCED TO DISK)').setColor('#10b981');
        });
        tl.to(this.walSweep, { alpha: 1, scaleY: 2.5, duration: 0.35, yoyo: true, repeat: 1 });
        tl.to(this.commitBadge, { alpha: 1, scale: 1.25, duration: 0.35, ease: 'back.out(2)' });
        tl.to(this.commitBadge, { scale: 1, duration: 0.2 });
    }
}
