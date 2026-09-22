import Phaser from 'phaser';
import gsap from 'gsap';
import { sfx } from './audio.js';
import { createPedagogicalBanner } from './visual_design_system.js';
import {
    createClientConsole,
    createNetworkFiberConduit,
    createHttpPacketCapsule,
    createSerializedByteStream,
    createServerRouterChassis,
    createMiniDatabaseVault
} from './web_client_server_design_system.js';

// Helper to notify top-level scrubber
function updateScrubber() {
    if (typeof window.updateStudioScrubber === 'function') {
        window.updateStudioScrubber();
    }
}

// ============================================================================
// 1. SCENE HTTP GET (READ & QUERY DB)
// ============================================================================
export class SceneHTTPGet extends Phaser.Scene {
    constructor() { super('SceneHTTPGet'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        this.banner = createPedagogicalBanner(this, cx, cy - 245, 820);

        // Station 1 (Left): Client Browser Runtime (410 x 320)
        const clientX = cx - 390;
        const clientY = cy - 40;
        this.client = createClientConsole(this, clientX, clientY, {
            clientTitle: 'fetch_order.js',
            line1: 'const res = await fetch("/api/v1/orders/1042", {',
            line2: '  method: "GET",',
            line3: '  headers: { "Accept": "application/json" }',
            line4: '});',
            headerText: 'Headers: [Accept: application/json, Host: api.store.io]',
            bodyPreview: '[ Empty Body // URL Path Param: id=1042 ]',
            initialStatus: 'READY: CLICK TRIGGER TO DISPATCH'
        });

        // Station 2 (Center): Network Fiber Conduit (280 x 76)
        const conduitX = cx;
        const conduitY = cy - 40;
        this.conduit = createNetworkFiberConduit(this, conduitX, conduitY, 280);

        // Station 3 (Right): Server API Router Chassis (410 x 320)
        const serverX = cx + 390;
        const serverY = cy - 75;
        this.server = createServerRouterChassis(this, serverX, serverY, {
            decorator: '@app.get("/api/v1/orders/{order_id}")',
            funcSig: 'async def get_order(order_id: int, db: Session):',
            funcBody: 'order = db.query(Order).get(order_id)\nreturn {"id": order.id, "total": order.total}',
            dbAction: 'ORM: SELECT * FROM orders WHERE id = 1042;',
            serverStatus: 'LISTENING: HTTP/2 ON PORT 8000'
        });

        // Station 4 (Right-Bottom): Mini Database Table Vault (410 x 120)
        this.db = createMiniDatabaseVault(this, serverX, cy + 145, 'orders', [
            '1042 (PK) | Elena Rostova | $2,550.00',
            '[ EMPTY SLOT // READY ]'
        ]);

        // HTTP Packet Capsule (260 x 56)
        this.packet = createHttpPacketCapsule(this, clientX + 70, clientY + 64, 'GET', '/api/v1/orders/1042', false).setAlpha(0);

        this.initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY);
    }

    initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => {
            this.banner.userData.setMessage('1. CLIENT: Initializing GET Request Builder for /api/v1/orders/1042', '#38bdf8');
            this.client.userData.setStatus('INIT: REQUEST BUILDER ACTIVE', '#38bdf8');
            this.client.userData.setBuilderState('Headers: [Pending...]', '[ Initializing Staging Crate... ]', '#94a3b8');
            this.server.userData.setServerStatus('LISTENING: HTTP/2 ON PORT 8000', '#34d399');
            this.packet.setPosition(clientX + 70, clientY + 64).setAlpha(0).setScale(1);
            this.db.userData.setRow(0, '1042 (PK) | Elena Rostova | $2,550.00');
        });
        tl.to({}, { duration: 1.5 });

        // Step 1A: Parse Path Param & Set Method
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('1A. PATH PARAM: Target order_id=1042 extracted into query destination', '#38bdf8');
            this.client.userData.setBuilderState('Path Param: [order_id = 1042]', 'Target Path: /api/v1/orders/1042', '#00f0ff');
            this.client.userData.highlightFetch(0.8);
        });
        tl.to({}, { duration: 1.8 });

        // Step 1B: Set HTTP Request Headers
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('1B. HTTP HEADERS: Setting Accept: application/json for content negotiation', '#38bdf8');
            this.client.userData.setBuilderState('Headers: [Accept: application/json, Host: api.store.io]', 'Target Path: /api/v1/orders/1042', '#38bdf8');
            this.client.userData.flashBuildBay(0x38bdf8, 0.6);
        });
        tl.to({}, { duration: 1.8 });

        // Step 1C: Validate Zero-Byte Body for GET
        tl.call(() => {
            sfx.laser();
            this.banner.userData.setMessage('1C. ZERO-BYTE BODY: GET request is read-only & idempotent -> 0-byte payload body', '#38bdf8');
            this.client.userData.setBuilderState('Headers: [Accept: application/json]', '[ Empty Request Body // URL Path Param Only ]', '#38bdf8');
            this.client.userData.setStatus('SEALED: HTTP REQUEST [GET /orders/1042]', '#00ff88');
        });
        tl.to({}, { duration: 1.8 });

        // Step 1D: Seal into HTTP REQUEST PACKET
        tl.call(() => {
            sfx.clank();
            this.banner.userData.setMessage('1D. PACKET SEALED: Formed HTTP REQUEST PACKET ready for network transmission', '#38bdf8');
        });
        tl.to(this.packet, { alpha: 1, scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 1.5 });

        // Step 2: Serialization at Client TX Gate & Network Transit
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashTX(0.8);
            this.conduit.userData.pulseCore(0x00f0ff, 1.2);
            this.banner.userData.setMessage('2. WIRE SERIALIZATION: Request headers encoded into raw UTF-8 byte stream frames', '#38bdf8');
            this.client.userData.setStatus('TX GATE: SERIALIZING UTF-8 STREAM', '#00ff88');

            const stream = createSerializedByteStream(
                this, clientX + 205, conduitY, serverX - 205, conduitY,
                0x00f0ff, ['GET', '/orders', '1042', 'HTTP/2', '0x0A']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX - 40, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: serverX - 100, y: serverY - 66, duration: 1.7, ease: 'power1.inOut' });

        // Step 3: Deserialization at Server RX Gate
        tl.call(() => {
            this.conduit.userData.flashRX(0.8);
            sfx.laser();
            this.banner.userData.setMessage('3. WIRE DESERIALIZATION: Server RX gate unpacks byte stream -> extracts path param 1042', '#34d399');
            this.server.userData.setServerStatus('RX GATE: 38 BYTES RECEIVED & DESERIALIZED', '#34d399');
        });
        tl.to({}, { duration: 2.0 });

        // Step 3B: Server Route Matcher (Python @app.get Decorator)
        tl.call(() => {
            sfx.cachePing();
            this.banner.userData.setMessage('3B. ROUTE MATCH: @app.get("/api/v1/orders/{order_id}") matches route path', '#34d399');
            this.server.userData.flashDecorator(1.0);
            this.server.userData.setServerStatus('MATCHED: @app.get -> def get_order(order_id=1042)', '#34d399');
        });
        tl.to({}, { duration: 2.2 });

        // Step 4: Controller Function executes & queries Database
        tl.call(() => {
            sfx.gearCrunch();
            this.server.userData.flashHandler(1.0);
            this.banner.userData.setMessage('4. HANDLER EXECUTION: def get_order() queries database session: db.query(Order).get(1042)', '#ffd600');
            this.db.userData.highlightRow(0, 0x38bdf8);
        });
        tl.to({}, { duration: 2.4 });

        // Step 5: Server builds HTTP Response JSON Payload
        tl.call(() => {
            sfx.snap();
            sfx.clank();
            this.banner.userData.setMessage('5. RESPONSE JSON BUILD: Server serializes Order row into JSON body & stamps 200 OK', '#10b981');
            this.packet.userData.transformToResponse('200 OK', 0x10b981, '{"id": 1042, "total": 2550.00}');
            this.packet.setPosition(serverX - 100, serverY + 18);
            this.packet.userData.pulseGlow(1.0);
        });
        tl.to(this.packet, { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 2.0 });

        // Step 6: Return Wire Transit with Serialized Response Stream (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashRX(0.8);
            this.conduit.userData.pulseCore(0x10b981, 1.2);
            this.banner.userData.setMessage('6. RETURN WIRE TRANSIT: HTTP 200 OK response serialized into return byte frames', '#34d399');

            const stream = createSerializedByteStream(
                this, serverX - 205, conduitY, clientX + 205, conduitY,
                0x10b981, ['200', 'OK', '0x7B', '"id":1042', '0x7D']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX, y: conduitY, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: clientX + 70, y: clientY + 64, duration: 1.7, ease: 'power1.inOut' });

        // Step 7: Client Deserializes Response & Updates DOM
        tl.to({}, { duration: 0.4 });
        tl.call(() => {
            sfx.dbCommit();
            this.conduit.userData.flashTX(0.6);
            this.banner.userData.setMessage('7. CLIENT DESERIALIZE: res.json() parsed! Order #1042 data mounted into browser DOM', '#10b981');
            this.client.userData.setStatus('SUCCESS: 200 OK (ORDER #1042 RENDERED)', '#00ff88');
            this.client.userData.setBuilderState('Response Status: 200 OK', 'Mounted: {"id": 1042, "total": 2550.00}', '#00ff88');
        });
        tl.to(this.packet, { alpha: 0, duration: 0.8 });
    }
}

// ============================================================================
// 2. SCENE HTTP POST (CREATE & INSERT ROW)
// ============================================================================
export class SceneHTTPPost extends Phaser.Scene {
    constructor() { super('SceneHTTPPost'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        this.banner = createPedagogicalBanner(this, cx, cy - 245, 820);

        const clientX = cx - 390;
        const clientY = cy - 40;
        this.client = createClientConsole(this, clientX, clientY, {
            clientTitle: 'create_order.js',
            line1: 'const res = await fetch("/api/v1/orders", {',
            line2: '  method: "POST", headers: { "Content-Type": "json" },',
            line3: '  body: JSON.stringify({ cust_id: 42, total: 2550 })',
            line4: '});',
            headerText: 'Headers: [Content-Type: application/json]',
            bodyPreview: '{"customer_id": 42, "total": 2550.00}',
            initialStatus: 'READY: CLICK TRIGGER TO DISPATCH'
        });

        const conduitX = cx;
        const conduitY = cy - 40;
        this.conduit = createNetworkFiberConduit(this, conduitX, conduitY, 280);

        const serverX = cx + 390;
        const serverY = cy - 75;
        this.server = createServerRouterChassis(this, serverX, serverY, {
            decorator: '@app.post("/api/v1/orders", status_code=201)',
            funcSig: 'async def create_order(payload: OrderCreate, db: Session):',
            funcBody: 'new_order = Order(**payload.dict())\ndb.add(new_order); db.commit(); return new_order',
            dbAction: 'ORM: INSERT INTO orders VALUES (1043, 42, 2550.00);',
            serverStatus: 'LISTENING: HTTP/2 ON PORT 8000'
        });

        this.db = createMiniDatabaseVault(this, serverX, cy + 145, 'orders', [
            '1042 (PK) | Elena Rostova | $2,550.00',
            '[ EMPTY SLOT // READY FOR INSERT ]'
        ]);

        this.packet = createHttpPacketCapsule(this, clientX + 70, clientY + 64, 'POST', '/api/v1/orders', false).setAlpha(0);

        this.initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY);
    }

    initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => {
            this.banner.userData.setMessage('1. CLIENT: Initializing POST Request Builder for /api/v1/orders', '#34d399');
            this.client.userData.setStatus('INIT: REQUEST BUILDER ACTIVE', '#34d399');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{ ...initializing JSON object... }', '#94a3b8');
            this.server.userData.setServerStatus('LISTENING: HTTP/2 ON PORT 8000', '#34d399');
            this.packet.setPosition(clientX + 70, clientY + 64).setAlpha(0).setScale(1);
            this.db.userData.setRow(1, '[ EMPTY SLOT // READY FOR INSERT ]', '#475569');
        });
        tl.to({}, { duration: 1.5 });

        // Step 1A: Attach Headers
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('1A. HTTP HEADERS: Setting Content-Type: application/json', '#34d399');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{ ...ready for fields... }', '#38bdf8');
            this.client.userData.highlightFetch(0.8);
        });
        tl.to({}, { duration: 1.8 });

        // Step 1B: Add Field 1 (customer_id: 42)
        tl.call(() => {
            sfx.laser();
            this.banner.userData.setMessage('1B. JSON FIELD: Inserter writes key-value -> "customer_id": 42', '#34d399');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{\n  "customer_id": 42\n}', '#34d399');
            this.client.userData.flashBuildBay(0x34d399, 0.6);
        });
        tl.to({}, { duration: 2.0 });

        // Step 1C: Add Field 2 (total: 2550.00)
        tl.call(() => {
            sfx.laser();
            this.banner.userData.setMessage('1C. JSON FIELD: Inserter writes key-value -> "total": 2550.00', '#34d399');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{\n  "customer_id": 42,\n  "total": 2550.00\n}', '#34d399');
            this.client.userData.flashBuildBay(0x34d399, 0.6);
        });
        tl.to({}, { duration: 2.0 });

        // Step 1D: JSON Stringify & Seal
        tl.call(() => {
            sfx.clank();
            this.banner.userData.setMessage('1D. JSON STRINGIFY: Payload serialized into UTF-8 text string (48 bytes)', '#00ff88');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', 'JSON: {"customer_id": 42, "total": 2550.00}', '#00ff88');
            this.client.userData.setStatus('SEALED: POST PAYLOAD READY (48 B)', '#00ff88');
        });
        tl.to(this.packet, { alpha: 1, scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 1.5 });

        // Step 2: Serialization at TX Gate & Network Transit (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashTX(0.8);
            this.conduit.userData.pulseCore(0x34d399, 1.2);
            this.banner.userData.setMessage('2. WIRE SERIALIZATION: JSON string encoded into UTF-8 stream & TLS 1.3 frames', '#34d399');
            this.client.userData.setStatus('TX GATE: ENCODING UTF-8 BYTES', '#00ff88');

            const stream = createSerializedByteStream(
                this, clientX + 205, conduitY, serverX - 205, conduitY,
                0x34d399, ['0x7B', '"cust_id"', '0x3A', '42', '0x7D']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX - 40, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: serverX - 100, y: serverY - 66, duration: 1.7, ease: 'power1.inOut' });

        // Step 3: Deserialization at Server RX Gate
        tl.call(() => {
            this.conduit.userData.flashRX(0.8);
            sfx.laser();
            this.banner.userData.setMessage('3. WIRE DESERIALIZATION: Server transceives byte frames -> reconstructs JSON object', '#34d399');
            this.server.userData.setServerStatus('RX GATE: 48 BYTES RECEIVED & DESERIALIZED', '#34d399');
        });
        tl.to({}, { duration: 2.0 });

        // Step 3B: Server Route Match & Pydantic Validation
        tl.call(() => {
            sfx.cachePing();
            this.banner.userData.setMessage('3B. ROUTE MATCH: @app.post("/api/v1/orders") triggers Pydantic schema validation', '#34d399');
            this.server.userData.flashDecorator(1.0);
            this.server.userData.setServerStatus('VALIDATING: OrderCreate schema verified', '#34d399');
        });
        tl.to({}, { duration: 2.2 });

        // Step 4: Controller inserts into DB & commits
        tl.call(() => {
            sfx.clank();
            sfx.dbCommit();
            this.server.userData.flashHandler(1.0);
            this.banner.userData.setMessage('4. DATABASE COMMIT: ORM generates Primary Key #1043 & inserts new row into disk', '#ffd600');
            this.db.userData.setRow(1, '1043 (PK) | Elena Rostova | $2,550.00 [NEW]', '#00ff88');
            this.db.userData.highlightRow(1, 0x10b981);
        });
        tl.to({}, { duration: 2.4 });

        // Step 5: Server builds HTTP 201 Created Response JSON
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('5. RESPONSE JSON BUILD: Server stamps 201 Created with Location: /orders/1043 header', '#10b981');
            this.packet.userData.transformToResponse('201 CREATED', 0x10b981, '{"id": 1043, "status": "CREATED"}');
            this.packet.setPosition(serverX - 100, serverY + 18);
            this.packet.userData.pulseGlow(1.0);
        });
        tl.to(this.packet, { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 2.0 });

        // Step 6: Return Wire Transit with Serialized Response (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashRX(0.8);
            this.conduit.userData.pulseCore(0x10b981, 1.2);
            this.banner.userData.setMessage('6. RETURN WIRE TRANSIT: 201 Created response serialized into wire stream', '#34d399');

            const stream = createSerializedByteStream(
                this, serverX - 205, conduitY, clientX + 205, conduitY,
                0x10b981, ['201', 'CREATED', '0x7B', '"id":1043', '0x7D']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX, y: conduitY, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: clientX + 70, y: clientY + 64, duration: 1.7, ease: 'power1.inOut' });

        // Step 7: Client Confirmation
        tl.to({}, { duration: 0.4 });
        tl.call(() => {
            sfx.laser();
            this.conduit.userData.flashTX(0.6);
            this.banner.userData.setMessage('7. CLIENT CONFIRMATION: 201 Created verified! Order #1043 mounted in client state', '#10b981');
            this.client.userData.setStatus('SUCCESS: 201 CREATED (ORDER #1043 SAVED)', '#00ff88');
            this.client.userData.setBuilderState('Response Status: 201 Created', 'Mounted: {"id": 1043, "status": "CREATED"}', '#00ff88');
        });
        tl.to(this.packet, { alpha: 0, duration: 0.8 });
    }
}

// ============================================================================
// 3. SCENE HTTP PUT (FULL REPLACE & MUTATE ROW)
// ============================================================================
export class SceneHTTPPut extends Phaser.Scene {
    constructor() { super('SceneHTTPPut'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        this.banner = createPedagogicalBanner(this, cx, cy - 245, 820);

        const clientX = cx - 390;
        const clientY = cy - 40;
        this.client = createClientConsole(this, clientX, clientY, {
            clientTitle: 'update_order.js',
            line1: 'const res = await fetch("/api/v1/orders/1042", {',
            line2: '  method: "PUT", headers: { "Content-Type": "json" },',
            line3: '  body: JSON.stringify({ total: 2890.00, status: "EXP" })',
            line4: '});',
            headerText: 'Headers: [Content-Type: application/json]',
            bodyPreview: '{"total": 2890.00, "status": "EXPEDITED"}',
            initialStatus: 'READY: CLICK TRIGGER TO DISPATCH'
        });

        const conduitX = cx;
        const conduitY = cy - 40;
        this.conduit = createNetworkFiberConduit(this, conduitX, conduitY, 280);

        const serverX = cx + 390;
        const serverY = cy - 75;
        this.server = createServerRouterChassis(this, serverX, serverY, {
            decorator: '@app.put("/api/v1/orders/{order_id}")',
            funcSig: 'async def update_order(order_id: int, p: OrderUpdate, db: Session):',
            funcBody: 'order.total = p.total; order.status = p.status\ndb.commit(); return order',
            dbAction: 'ORM: UPDATE orders SET total = 2890.00 WHERE id = 1042;',
            serverStatus: 'LISTENING: HTTP/2 ON PORT 8000'
        });

        this.db = createMiniDatabaseVault(this, serverX, cy + 145, 'orders', [
            '1042 (PK) | Elena Rostova | $2,550.00 [ORIGINAL]',
            '[ SLOT 02 // UNCHANGED ]'
        ]);

        this.packet = createHttpPacketCapsule(this, clientX + 70, clientY + 64, 'PUT', '/api/v1/orders/1042', false).setAlpha(0);

        this.initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY);
    }

    initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => {
            this.banner.userData.setMessage('1. CLIENT: Initializing PUT Replacement Builder for /api/v1/orders/1042', '#f59e0b');
            this.client.userData.setStatus('INIT: PUT REPLACEMENT BUILDER', '#f59e0b');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{ ...initiating replacement payload... }', '#94a3b8');
            this.server.userData.setServerStatus('LISTENING: HTTP/2 ON PORT 8000', '#34d399');
            this.packet.setPosition(clientX + 70, clientY + 64).setAlpha(0).setScale(1);
            this.db.userData.setRow(0, '1042 (PK) | Elena Rostova | $2,550.00 [ORIGINAL]');
        });
        tl.to({}, { duration: 1.5 });

        // Step 1A: Attach Headers
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('1A. HTTP HEADERS: Setting Content-Type: application/json for entity replacement', '#f59e0b');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{ ...ready for fields... }', '#f59e0b');
            this.client.userData.highlightFetch(0.8);
        });
        tl.to({}, { duration: 1.8 });

        // Step 1B: Add Replacement Field 1 (total: 2890.00)
        tl.call(() => {
            sfx.laser();
            this.banner.userData.setMessage('1B. JSON FIELD: Inserter writes updated field -> "total": 2890.00', '#f59e0b');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{\n  "total": 2890.00\n}', '#f59e0b');
            this.client.userData.flashBuildBay(0xf59e0b, 0.6);
        });
        tl.to({}, { duration: 2.0 });

        // Step 1C: Add Replacement Field 2 (status: "EXPEDITED")
        tl.call(() => {
            sfx.laser();
            this.banner.userData.setMessage('1C. JSON FIELD: Inserter writes updated field -> "status": "EXPEDITED"', '#f59e0b');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', '{\n  "total": 2890.00,\n  "status": "EXPEDITED"\n}', '#f59e0b');
            this.client.userData.flashBuildBay(0xf59e0b, 0.6);
        });
        tl.to({}, { duration: 2.0 });

        // Step 1D: JSON Stringify & Seal
        tl.call(() => {
            sfx.clank();
            this.banner.userData.setMessage('1D. JSON STRINGIFY: Replacement payload sealed ready for dispatch', '#fbbf24');
            this.client.userData.setBuilderState('Headers: [Content-Type: application/json]', 'JSON: {"total": 2890.00, "status": "EXP"}', '#fbbf24');
            this.client.userData.setStatus('SEALED: PUT PAYLOAD READY', '#fbbf24');
        });
        tl.to(this.packet, { alpha: 1, scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 1.5 });

        // Step 2: Serialization into Wire Stream (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashTX(0.8);
            this.conduit.userData.pulseCore(0xf59e0b, 1.2);
            this.banner.userData.setMessage('2. WIRE SERIALIZATION: PUT replacement payload serialized into network byte stream', '#f59e0b');
            this.client.userData.setStatus('TX GATE: ENCODING UTF-8 BYTES', '#fbbf24');

            const stream = createSerializedByteStream(
                this, clientX + 205, conduitY, serverX - 205, conduitY,
                0xf59e0b, ['0x7B', '"total"', '2890', '"status"', '0x7D']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX - 40, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: serverX - 100, y: serverY - 66, duration: 1.7, ease: 'power1.inOut' });

        // Step 3: Deserialization at Server RX Gate
        tl.call(() => {
            this.conduit.userData.flashRX(0.8);
            sfx.laser();
            this.banner.userData.setMessage('3. WIRE DESERIALIZATION: Server transceives byte frames -> reconstructs PUT replacement object', '#34d399');
            this.server.userData.setServerStatus('RX GATE: BYTES RECEIVED & DESERIALIZED', '#34d399');
        });
        tl.to({}, { duration: 2.0 });

        // Step 3B: Server Route Match
        tl.call(() => {
            sfx.cachePing();
            this.banner.userData.setMessage('3B. ROUTE MATCH: @app.put("/api/v1/orders/{order_id}") dispatches to update handler', '#34d399');
            this.server.userData.flashDecorator(1.0);
            this.server.userData.setServerStatus('MATCHED: @app.put -> def update_order()', '#34d399');
        });
        tl.to({}, { duration: 2.2 });

        // Step 4: DB Mutation
        tl.call(() => {
            sfx.clank();
            sfx.gearCrunch();
            this.server.userData.flashHandler(1.0);
            this.banner.userData.setMessage('4. DATABASE MUTATION: Row 1042 fields rewritten: total $2,890.00, status "EXPEDITED"', '#ffd600');
            this.db.userData.setRow(0, '1042 (PK) | Elena Rostova | $2,890.00 [EXPEDITED]', '#ffd600');
            this.db.userData.highlightRow(0, 0xf59e0b);
        });
        tl.to({}, { duration: 2.4 });

        // Step 5: Server builds HTTP Response JSON
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('5. RESPONSE JSON BUILD: Server returns 200 OK with mutated entity JSON body', '#10b981');
            this.packet.userData.transformToResponse('200 OK', 0x10b981, '{"id": 1042, "total": 2890.00}');
            this.packet.setPosition(serverX - 100, serverY + 18);
            this.packet.userData.pulseGlow(1.0);
        });
        tl.to(this.packet, { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 2.0 });

        // Step 6: Return Wire Transit (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashRX(0.8);
            this.conduit.userData.pulseCore(0x10b981, 1.2);
            this.banner.userData.setMessage('6. RETURN WIRE TRANSIT: 200 OK response encoded into network stream', '#34d399');

            const stream = createSerializedByteStream(
                this, serverX - 205, conduitY, clientX + 205, conduitY,
                0x10b981, ['200', 'OK', '0x7B', '"total"', '0x7D']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX, y: conduitY, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: clientX + 70, y: clientY + 64, duration: 1.7, ease: 'power1.inOut' });

        // Step 7: Client State Update
        tl.to({}, { duration: 0.4 });
        tl.call(() => {
            sfx.laser();
            this.conduit.userData.flashTX(0.6);
            this.banner.userData.setMessage('7. CLIENT UPDATE: Browser cache & DOM reflowed with updated $2,890.00 total', '#10b981');
            this.client.userData.setStatus('SUCCESS: 200 OK (UPDATED TO $2,890.00)', '#00ff88');
            this.client.userData.setBuilderState('Response Status: 200 OK', 'Mounted: {"id": 1042, "total": 2890.00}', '#00ff88');
        });
        tl.to(this.packet, { alpha: 0, duration: 0.8 });
    }
}

// ============================================================================
// 4. SCENE HTTP DELETE (AUTH, CONSTRAINT CHECK & PURGE)
// ============================================================================
export class SceneHTTPDelete extends Phaser.Scene {
    constructor() { super('SceneHTTPDelete'); }

    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.63;
        const cy = this.scale.height * 0.48;

        this.banner = createPedagogicalBanner(this, cx, cy - 245, 820);

        const clientX = cx - 390;
        const clientY = cy - 40;
        this.client = createClientConsole(this, clientX, clientY, {
            clientTitle: 'delete_order.js',
            line1: 'const res = await fetch("/api/v1/orders/1042", {',
            line2: '  method: "DELETE",',
            line3: '  headers: { "Authorization": "Bearer sec_tok99" }',
            line4: '});',
            headerText: 'Headers: [Authorization: Bearer sec_tok99]',
            bodyPreview: '[No Request Body // DELETE Intent in Method & Path]',
            initialStatus: 'READY: CLICK TRIGGER TO DISPATCH'
        });

        const conduitX = cx;
        const conduitY = cy - 40;
        this.conduit = createNetworkFiberConduit(this, conduitX, conduitY, 280);

        const serverX = cx + 390;
        const serverY = cy - 75;
        this.server = createServerRouterChassis(this, serverX, serverY, {
            decorator: '@app.delete("/api/v1/orders/{order_id}", status_code=204)',
            funcSig: 'async def delete_order(order_id: int, user = Depends(auth)):',
            funcBody: 'db.delete(order); db.commit()\n# Row evicted from database disk',
            dbAction: 'ORM: DELETE FROM orders WHERE id = 1042;',
            serverStatus: 'LISTENING: HTTP/2 ON PORT 8000'
        });

        this.db = createMiniDatabaseVault(this, serverX, cy + 145, 'orders', [
            '1042 (PK) | Elena Rostova | $2,550.00 [TARGET]',
            '[ SLOT 02 // UNTOUCHED ]'
        ]);

        this.packet = createHttpPacketCapsule(this, clientX + 70, clientY + 64, 'DELETE', '/api/v1/orders/1042', false).setAlpha(0);

        this.initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY);
    }

    initTimeline(cx, cy, clientX, clientY, conduitX, conduitY, serverX, serverY) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubber, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => {
            this.banner.userData.setMessage('1. CLIENT: Initializing DELETE Signal Builder for /api/v1/orders/1042', '#f43f5e');
            this.client.userData.setStatus('INIT: DELETE SIGNAL BUILDER', '#f43f5e');
            this.client.userData.setBuilderState('Headers: [Authorization: Bearer sec_tok99]', '{ ...preparing eviction signal... }', '#94a3b8');
            this.server.userData.setServerStatus('LISTENING: HTTP/2 ON PORT 8000', '#34d399');
            this.packet.setPosition(clientX + 70, clientY + 64).setAlpha(0).setScale(1);
            this.db.userData.setRow(0, '1042 (PK) | Elena Rostova | $2,550.00 [TARGET]');
        });
        tl.to({}, { duration: 1.5 });

        // Step 1A: Target ID Extraction
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('1A. TARGET ID: Identified eviction target order_id=1042', '#f43f5e');
            this.client.userData.setBuilderState('Target: Order #1042', 'Eviction Target: /api/v1/orders/1042', '#f87171');
            this.client.userData.highlightFetch(0.8);
        });
        tl.to({}, { duration: 1.8 });

        // Step 1B: Attach Bearer Authorization Header
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('1B. AUTH TOKEN: Attaching Bearer Authorization header for privileged deletion', '#f43f5e');
            this.client.userData.setBuilderState('Headers: [Authorization: Bearer sec_tok99]', 'Authorization: Admin Privileges Granted', '#f87171');
            this.client.userData.flashBuildBay(0xdc2626, 0.6);
        });
        tl.to({}, { duration: 1.8 });

        // Step 1C: Zero-Byte Payload for DELETE
        tl.call(() => {
            sfx.laser();
            this.banner.userData.setMessage('1C. ZERO-BYTE BODY: DELETE intent is in verb and headers -> 0-byte payload', '#f43f5e');
            this.client.userData.setBuilderState('Headers: [Authorization: Bearer sec_tok99]', '[ Empty Body // DELETE Signal Ready ]', '#f87171');
            this.client.userData.setStatus('SEALED: DELETE SIGNAL READY', '#f87171');
        });
        tl.to({}, { duration: 1.8 });

        // Step 1D: Seal into HTTP REQUEST PACKET
        tl.call(() => {
            sfx.clank();
            this.banner.userData.setMessage('1D. PACKET SEALED: Formed HTTP REQUEST PACKET [DELETE /orders/1042]', '#f43f5e');
        });
        tl.to(this.packet, { alpha: 1, scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 1.5 });

        // Step 2: Serialization into Wire Stream (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashTX(0.8);
            this.conduit.userData.pulseCore(0xdc2626, 1.2);
            this.banner.userData.setMessage('2. WIRE SERIALIZATION: DELETE signal serialized into network packet frames', '#f43f5e');
            this.client.userData.setStatus('TX GATE: ENCODING SIGNAL BYTES', '#f87171');

            const stream = createSerializedByteStream(
                this, clientX + 205, conduitY, serverX - 205, conduitY,
                0xdc2626, ['DELETE', '/orders', '1042', 'Bearer', '0x0A']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX - 40, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: serverX - 100, y: serverY - 66, duration: 1.7, ease: 'power1.inOut' });

        // Step 3: Deserialization at Server RX Gate
        tl.call(() => {
            this.conduit.userData.flashRX(0.8);
            sfx.laser();
            this.banner.userData.setMessage('3. WIRE DESERIALIZATION: Server receives byte frames -> unpacks DELETE intent and Auth token', '#34d399');
            this.server.userData.setServerStatus('RX GATE: SIGNAL RECEIVED & DESERIALIZED', '#34d399');
        });
        tl.to({}, { duration: 2.0 });

        // Step 3B: Server Route Match & Auth Verification
        tl.call(() => {
            sfx.cachePing();
            this.banner.userData.setMessage('3B. ROUTE MATCH: @app.delete("/api/v1/orders/{order_id}") verifies Bearer Token', '#34d399');
            this.server.userData.flashDecorator(1.0);
            this.server.userData.setServerStatus('AUTHORIZED: Token verified for admin user', '#34d399');
        });
        tl.to({}, { duration: 2.2 });

        // Step 4: DB Row Eviction
        tl.call(() => {
            sfx.clank();
            sfx.laser();
            this.server.userData.flashHandler(1.0);
            this.banner.userData.setMessage('4. DATABASE PURGE: Cascading check passes. DELETE FROM orders WHERE id=1042', '#ef4444');
            this.db.userData.clearRow(0, '[ DELETED // ROW PURGED FROM DISK ]');
        });
        tl.to({}, { duration: 2.4 });

        // Step 5: Server builds 204 No Content Response
        tl.call(() => {
            sfx.snap();
            this.banner.userData.setMessage('5. RESPONSE BUILDING: Server stamps 204 No Content (0-byte payload)', '#94a3b8');
            this.packet.userData.transformToResponse('204 NO CONTENT', 0x64748b, '[0-Byte Empty Body]');
            this.packet.setPosition(serverX - 100, serverY + 18);
            this.packet.userData.pulseGlow(1.0);
        });
        tl.to(this.packet, { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1 });
        tl.to({}, { duration: 2.0 });

        // Step 6: Return Wire Transit (Slow & Clear)
        tl.call(() => {
            sfx.whoosh();
            this.conduit.userData.flashRX(0.8);
            this.conduit.userData.pulseCore(0x94a3b8, 1.2);
            this.banner.userData.setMessage('6. RETURN WIRE TRANSIT: 204 No Content signal streams back across wire', '#94a3b8');

            const stream = createSerializedByteStream(
                this, serverX - 205, conduitY, clientX + 205, conduitY,
                0x94a3b8, ['204', 'NO_CONTENT', '0x00', '0-BYTE', '0x0A']
            );
            stream.userData.animateAcross(3.5);
        });
        tl.to(this.packet, { x: conduitX, y: conduitY, duration: 1.8, ease: 'power1.inOut' });
        tl.to(this.packet, { x: clientX + 70, y: clientY + 64, duration: 1.7, ease: 'power1.inOut' });

        // Step 7: Client Evicts Card from DOM
        tl.to({}, { duration: 0.4 });
        tl.call(() => {
            sfx.dbCommit();
            this.conduit.userData.flashTX(0.6);
            this.banner.userData.setMessage('7. CLIENT EVICTION: 204 No Content confirmed. Order #1042 dismantled from DOM', '#10b981');
            this.client.userData.setStatus('SUCCESS: 204 NO CONTENT (ROW EVICTED)', '#00ff88');
            this.client.userData.setBuilderState('Response Status: 204 No Content', '[ Order #1042 Evicted from DOM State ]', '#f87171');
        });
        tl.to(this.packet, { alpha: 0, duration: 0.8 });
    }
}
