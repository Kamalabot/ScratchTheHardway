/**
 * Workday Visual Design System
 * Defines the physical metaphors and pure Canvas geometry for the Workday simulation.
 */

// Colors based on PROGRAMMING_VISUAL_METAPHORS.md with Workday specific additions
export const Colors = {
    VaultSteel: 0x38BDF8,
    VaultBg: 0x0F172A,
    ProdTenant: 0x00FF88, // Green
    ImplTenant: 0xF59E0B, // Amber
    EventHire: 0xFF3366,  // Ruby
    EventAbsence: 0x9D4EDD, // Purple
    GateSteel: 0x94A3B8,
    TextLight: '#00F0FF',
    TextAlert: '#FF3366',
    DenormCache: 0xF43F5E
};

/**
 * Creates a massive Tenant Data Vault structure.
 */
export function createTenantVault(scene, x, y, name, color) {
    const container = scene.add.container(x, y);
    const w = 510;
    const h = 300;
    
    const graphics = scene.add.graphics();
    graphics.lineStyle(4, color, 1);
    graphics.fillStyle(Colors.VaultBg, 0.9);
    
    // Draw rigid steel vault with chamfered corners using pure Canvas methods
    graphics.beginPath();
    graphics.moveTo(-w/2 + 20, -h/2);
    graphics.lineTo(w/2 - 20, -h/2);
    graphics.lineTo(w/2, -h/2 + 20);
    graphics.lineTo(w/2, h/2 - 20);
    graphics.lineTo(w/2 - 20, h/2);
    graphics.lineTo(-w/2 + 20, h/2);
    graphics.lineTo(-w/2, h/2 - 20);
    graphics.lineTo(-w/2, -h/2 + 20);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    const titleText = scene.add.text(0, -h/2 + 25, `TENANT: ${name}`, {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([graphics, titleText]);
    return container;
}

/**
 * Creates a Database Table representing the strict relational structure inside the vault.
 */
export function createDatabaseTable(scene, x, y, name, columns) {
    const container = scene.add.container(x, y);
    const w = 460;
    const h = 120 + (columns.length * 30);

    const graphics = scene.add.graphics();
    graphics.lineStyle(2, Colors.VaultSteel, 1);
    graphics.fillStyle(0x111625, 1);
    graphics.fillRect(-w/2, -h/2, w, h);
    graphics.strokeRect(-w/2, -h/2, w, h);

    const title = scene.add.text(0, -h/2 + 15, `TABLE: ${name}`, {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#38BDF8'
    }).setOrigin(0.5);
    container.add([graphics, title]);

    columns.forEach((col, i) => {
        const colY = -h/2 + 50 + (i * 30);
        graphics.lineBetween(-w/2, colY - 15, w/2, colY - 15);
        const text = scene.add.text(-w/2 + 10, colY, col, {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#A0AEC0'
        }).setOrigin(0, 0.5);
        container.add(text);
    });

    return container;
}

/**
 * Creates a Denormalized Cache drawer showing read-optimized flattened data.
 */
export function createDenormCache(scene, x, y, name) {
    const container = scene.add.container(x, y);
    const w = 460;
    const h = 80;

    const graphics = scene.add.graphics();
    graphics.lineStyle(3, Colors.DenormCache, 1);
    graphics.fillStyle(0x4C0519, 0.8);
    
    // Draw filing drawer
    graphics.beginPath();
    graphics.moveTo(-w/2, -h/2);
    graphics.lineTo(w/2, -h/2);
    graphics.lineTo(w/2 + 10, h/2);
    graphics.lineTo(-w/2 - 10, h/2);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    const text = scene.add.text(0, 0, `[CACHE] ${name}\nRead-Optimized Snapshot`, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#FFB6C1',
        align: 'center'
    }).setOrigin(0.5);

    container.add([graphics, text]);
    return container;
}

/**
 * Creates an ISG/ISU Security Gate.
 */
export function createISGGate(scene, x, y, label) {
    const container = scene.add.container(x, y);
    const w = 180;
    const h = 60;

    const graphics = scene.add.graphics();
    graphics.lineStyle(4, Colors.GateSteel, 1);
    graphics.fillStyle(0x1E2638, 1);
    graphics.fillRect(-w/2, -h/2, w, h);
    graphics.strokeRect(-w/2, -h/2, w, h);

    // The gate arm
    const arm = scene.add.rectangle(0, h/2, w + 40, 10, 0xFF3366).setOrigin(0.5, 0);

    const text = scene.add.text(0, 0, label, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([graphics, arm, text]);
    
    // Attach a method to open the gate
    container.openGate = () => {
        scene.tweens.add({
            targets: arm,
            angle: -90,
            duration: 500,
            ease: 'Back.easeOut'
        });
    };
    
    container.closeGate = () => {
        scene.tweens.add({
            targets: arm,
            angle: 0,
            duration: 300,
            ease: 'Power2.easeOut'
        });
    };

    return container;
}

/**
 * Creates an Event Capsule representing a workflow trigger.
 */
export function createEventCapsule(scene, x, y, label, color) {
    const container = scene.add.container(x, y);
    const w = 150;
    const h = 54;

    const graphics = scene.add.graphics();
    graphics.lineStyle(2, 0xffffff, 0.8);
    graphics.fillStyle(color, 0.9);
    
    // Hexagonal capsule
    graphics.beginPath();
    graphics.moveTo(-w/2 + 15, -h/2);
    graphics.lineTo(w/2 - 15, -h/2);
    graphics.lineTo(w/2, 0);
    graphics.lineTo(w/2 - 15, h/2);
    graphics.lineTo(-w/2 + 15, h/2);
    graphics.lineTo(-w/2, 0);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    const text = scene.add.text(0, 0, label, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([graphics, text]);
    return container;
}

/**
 * Draws a pneumatic track between two points.
 */
export function drawPneumaticTrack(scene, points) {
    const graphics = scene.add.graphics();
    graphics.lineStyle(12, 0x1E3A5F, 0.6); // Outer tube
    
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.strokePath();

    graphics.lineStyle(4, 0x38BDF8, 0.8); // Inner glowing rail
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.strokePath();
    
    return graphics;
}

/**
 * Creates an EIB Cargo Container (Forklift payload).
 * It starts closed, then splits open to reveal Tabular Data and SOAP payloads.
 */
export function createEIBCargoContainer(scene, x, y, label) {
    const container = scene.add.container(x, y);
    const w = 200;
    const h = 100;

    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0xF59E0B, 1);
    graphics.fillStyle(0x331800, 1);
    
    // Draw the container box
    graphics.fillRect(-w/2, -h/2, w, h);
    graphics.strokeRect(-w/2, -h/2, w, h);

    const text = scene.add.text(0, -10, `EIB CONTAINER\n${label}`, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#F59E0B',
        align: 'center'
    }).setOrigin(0.5);

    // Simulated hidden SOAP/XML data inside
    const hiddenData = scene.add.text(0, 20, '<soapenv:Envelope>\n  <ws:Worker_Data>\n...', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#00F0FF',
        align: 'center',
        alpha: 0
    }).setOrigin(0.5);

    container.add([graphics, text, hiddenData]);
    
    container.crackOpen = () => {
        scene.tweens.add({
            targets: text,
            alpha: 0,
            duration: 300
        });
        scene.tweens.add({
            targets: hiddenData,
            alpha: 1,
            y: 0,
            duration: 500,
            delay: 300
        });
        // Visually split the box
        scene.tweens.add({
            targets: container,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 500,
            ease: 'Back.easeOut'
        });
    };

    return container;
}

/**
 * Creates a Studio XML Forge (Java Execution Engine).
 */
export function createStudioXMLForge(scene, x, y) {
    const container = scene.add.container(x, y);
    const w = 240;
    const h = 140;

    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0x9D4EDD, 1);
    graphics.fillStyle(0x220938, 1);
    
    // Draw the forge anvil
    graphics.fillRect(-w/2, -h/2, w, h);
    graphics.strokeRect(-w/2, -h/2, w, h);

    const title = scene.add.text(0, -h/2 + 15, 'STUDIO: XML FORGE\n(Java Execution)', {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#C084FC',
        align: 'center'
    }).setOrigin(0.5);

    container.add([graphics, title]);
    return container;
}

/**
 * Creates a Payroll ALU Gearbox.
 */
export function createPayrollALU(scene, x, y) {
    const container = scene.add.container(x, y);
    const w = 320;
    const h = 210;

    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0xD4A342, 1);
    graphics.fillStyle(0x785318, 0.8);
    
    graphics.fillRect(-w/2, -h/2, w, h);
    graphics.strokeRect(-w/2, -h/2, w, h);

    const title = scene.add.text(0, 0, 'PAYROLL ALU\nCALCULATION ENGINE', {
        fontFamily: 'monospace',
        fontSize: '22px',
        color: '#FFD600',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([graphics, title]);
    return container;
}

/**
 * Creates an Armored Truck for Bank/SCM SFTP integration.
 */
export function createArmoredTruck(scene, x, y, label) {
    const container = scene.add.container(x, y);
    const w = 180;
    const h = 80;

    const graphics = scene.add.graphics();
    graphics.lineStyle(3, 0x94A3B8, 1);
    graphics.fillStyle(0x1E2638, 1);
    
    // Truck body
    graphics.beginPath();
    graphics.moveTo(-w/2, -h/2);
    graphics.lineTo(w/2 - 40, -h/2);
    graphics.lineTo(w/2, -h/2 + 30);
    graphics.lineTo(w/2, h/2);
    graphics.lineTo(-w/2, h/2);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    // Wheels
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(-w/2 + 30, h/2, 15);
    graphics.fillCircle(w/2 - 30, h/2, 15);

    const text = scene.add.text(0, -10, `SFTP TRUCK\n${label}`, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#38BDF8',
        align: 'center'
    }).setOrigin(0.5);

    container.add([graphics, text]);
    return container;
}
