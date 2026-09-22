import Phaser from 'phaser';
import gsap from 'gsap';
import { sfx } from './audio.js';
import {
    SceneInputDepot,
    SceneMemoryALU,
    SceneDiskPersistence,
    SceneTemplateEngine,
    SceneBrowserDOM
} from './automation_scenes.js';

// ============================================================================
// MODULE 1: FILE PACKAGING & FORMATS DATA
// ============================================================================
const PACKAGING_STAGES = [
    {
        badge: "STAGE 01 // SERIALIZATION",
        title: "Structured Data (JSON)",
        subtitle: "Serializing volatile in-memory heap dictionaries into persistent UTF-8 text streams.",
        stats: { s1: "142 B", s2: "UTF-8 TEXT", s3: "KEY-VALUE" },
        fileTitle: "serialize_json.py",
        code: `<span class="token-keyword">import</span> json

<span class="token-comment"># 1. In-Memory Heap Dictionary</span>
character_data = {
    <span class="token-string">"name"</span>: <span class="token-string">"Atlas"</span>,
    <span class="token-string">"level"</span>: <span class="token-num">42</span>,
    <span class="token-string">"hp"</span>: <span class="token-num">100.0</span>,
    <span class="token-string">"skills"</span>: [<span class="token-string">"dash"</span>, <span class="token-string">"shield"</span>]
}

<span class="token-comment"># 2. Serialize to byte-safe string</span>
serialized = json.dumps(character_data, indent=<span class="token-num">2</span>)
<span class="token-keyword">with</span> open(<span class="token-string">"save.json"</span>, <span class="token-string">"w"</span>) <span class="token-keyword">as</span> f:
    f.write(serialized)`,
        takeaway: "RAM stores data in fragmented memory pointers. JSON serializes these pointers into a universal, human-readable string ready for disk or network transport.",
        tip: "Watch the memory objects flow through the Tokenizer Bus and fuse into a structured JSON string!"
    },
    {
        badge: "STAGE 02 // RASTER GRAPHICS",
        title: "Binary & Raster Images (.png / .bin)",
        subtitle: "How raw hexadecimal bytes on disk translate directly into glowing RGB screen pixels.",
        stats: { s1: "768 B", s2: "RAW BINARY", s3: "RASTER GRID" },
        fileTitle: "raster_decode.py",
        code: `<span class="token-comment"># Read raw 24-bit RGB bytes from disk</span>
<span class="token-keyword">with</span> open(<span class="token-string">"icon.bin"</span>, <span class="token-string">"rb"</span>) <span class="token-keyword">as</span> f:
    raw_bytes = f.read()

<span class="token-comment"># Unpack 3 bytes per pixel: [R, G, B]</span>
pixels = []
<span class="token-keyword">for</span> i <span class="token-keyword">in</span> range(<span class="token-num">0</span>, len(raw_bytes), <span class="token-num">3</span>):
    r, g, b = raw_bytes[i:i+<span class="token-num">3</span>]
    pixels.append((r, g, b))
    DisplayEngine.set_pixel(x, y, r, g, b)`,
        takeaway: "Images aren't magic pictures on disk—they are continuous arrays of binary numbers where every 3 or 4 bytes dictate the Red, Green, and Blue intensity of a pixel.",
        tip: "Hover over any glowing pixel to inspect its hexadecimal address and 24-bit RGB channel breakdown!"
    },
    {
        badge: "STAGE 03 // VECTOR GRAPHICS",
        title: "Vector Geometry & PDFs (.pdf / .svg)",
        subtitle: "Why vector documents never pixelate: math equations rendered in real-time.",
        stats: { s1: "2.4 KB", s2: "POSTSCRIPT", s3: "VECTOR CANVAS" },
        fileTitle: "generate_pdf.py",
        code: `<span class="token-comment"># PDFs store mathematical drawing commands</span>
canvas.set_stroke_color(<span class="token-num">0.0</span>, <span class="token-num">0.94</span>, <span class="token-num">1.0</span>)
canvas.set_line_width(<span class="token-num">3</span>)

<span class="token-comment"># Cubic Bézier curve: P0 -> P1 -> P2 -> P3</span>
canvas.move_to(<span class="token-num">100</span>, <span class="token-num">200</span>)
canvas.curve_to(<span class="token-num">180</span>, <span class="token-num">320</span>, <span class="token-num">320</span>, <span class="token-num">80</span>, <span class="token-num">400</span>, <span class="token-num">200</span>)
canvas.draw_text(<span class="token-num">120</span>, <span class="token-num">240</span>, <span class="token-string">"VECTOR_RESOLUTION_INDEPENDENT"</span>)`,
        takeaway: "Unlike raster images made of fixed pixels, PDFs use mathematical vectors and Bézier curves. When you zoom in 10,000%, the math recalculates dynamically with zero blur.",
        tip: "Observe the laser plotter head calculating cubic Bézier formulas in real time!"
    },
    {
        badge: "STAGE 04 // ARCHIVES & DEFLATE",
        title: "ZIP Archives & Compression (.zip / .docx)",
        subtitle: "The LZ77 & Huffman DEFLATE pipeline: replacing duplicate data with pointer tokens.",
        stats: { s1: "48% RATIO", s2: "LZ77 / HUFFMAN", s3: "COMPRESSED PK" },
        fileTitle: "deflate_archive.py",
        code: `<span class="token-keyword">import</span> zipfile

<span class="token-comment"># Modern file formats (.docx, .apk) are ZIP containers</span>
<span class="token-keyword">with</span> zipfile.ZipFile(<span class="token-string">"project_bundle.zip"</span>, <span class="token-string">"w"</span>) <span class="token-keyword">as</span> z:
    z.write(<span class="token-string">"script.py"</span>, compress_type=zipfile.ZIP_DEFLATED)
    z.write(<span class="token-string">"assets.png"</span>, compress_type=zipfile.ZIP_DEFLATED)
    z.write(<span class="token-string">"config.xml"</span>, compress_type=zipfile.ZIP_DEFLATED)

<span class="token-comment"># DEFLATE scans for repeating patterns & compresses</span>`,
        takeaway: "Many modern file formats (DOCX, APK, CAD packages) are secretly ZIP containers holding XML, JSON, and raw media compressed via the DEFLATE algorithm.",
        tip: "Click the compressed ZIP container to trigger high-velocity explosive decompression!"
    },
    {
        badge: "STAGE 05 // INDUSTRIAL PACKAGES",
        title: "PLC Telemetry & CAD Packages (.step / OPC-UA)",
        subtitle: "How industrial automation controllers and CAD engines package sensor rungs & 3D solid models.",
        stats: { s1: "512 B / FRAME", s2: "MODBUS / B-REP", s3: "CRC-CHECKED" },
        fileTitle: "plc_telemetry.py",
        code: `<span class="token-comment"># Industrial frame serialization with CRC16</span>
frame = bytearray()
frame.append(<span class="token-num">0xAA</span>)  <span class="token-comment"># Start Delimiter</span>
frame.extend(pack_tag(<span class="token-string">"%IW0"</span>, sensor_temp_val))
frame.extend(pack_coil(<span class="token-string">"%QX0.1"</span>, motor_active))

<span class="token-comment"># Cyclic Redundancy Check (CRC16) for safety</span>
checksum = calculate_crc16(frame)
frame.extend(checksum)
IndustrialBus.transmit(frame)`,
        takeaway: "Factory automation and engineering systems cannot afford corruption. They pack sensor tags and 3D Boundary Representation (B-Rep) geometry into strictly verified binary packets with CRC checks.",
        tip: "Watch the PLC sensor registers encode into an industrial telemetry frame with real-time CRC verification!"
    }
];

// ============================================================================
// MODULE 2: DATABASE & API TRANSIT DATA
// ============================================================================
const DATABASE_STAGES = [
    {
        badge: "STAGE 01 // INGESTION & TRANSIT",
        title: "Frontend Ingestion & Transit",
        subtitle: "How client user actions serialize into network packets and traverse gateways.",
        stats: { s1: "482 B", s2: "HTTP/2 TLS", s3: "REST / JSON" },
        fileTitle: "client_dispatch.js",
        code: `<span class="token-comment">// 1. User submits registration on Frontend</span>
<span class="token-keyword">const</span> payload = {
    name: <span class="token-string">"Elena Rostova"</span>,
    email: <span class="token-string">"elena@startup.io"</span>,
    tier: <span class="token-string">"Enterprise SaaS"</span>
};

<span class="token-comment">// 2. Transit across network through API Gateway</span>
<span class="token-keyword">const</span> response = <span class="token-keyword">await</span> fetch(<span class="token-string">"https://api.system.io/v1/signup"</span>, {
    method: <span class="token-string">"POST"</span>,
    headers: { <span class="token-string">"Content-Type"</span>: <span class="token-string">"application/json"</span> },
    body: JSON.stringify(payload)
});`,
        takeaway: "The frontend client converts user inputs into a structured JSON payload, wraps it in TLS encryption, and streams it across physical network hops to the API Gateway.",
        tip: "Watch the encrypted packet travel along the fiber network into the API controller!"
    },
    {
        badge: "STAGE 02 // DATABASE TABLES",
        title: "Database Schema & Table Inserts",
        subtitle: "How relational engines write rows to disk pages with Write-Ahead Logging (WAL).",
        stats: { s1: "8 KB PAGE", s2: "B-TREE INDEX", s3: "SQL / RELATIONAL" },
        fileTitle: "schema_insert.sql",
        code: `<span class="token-comment">-- 1. Insert row into 'users' table</span>
<span class="token-keyword">INSERT INTO</span> users (id, email, tier, created_at)
<span class="token-keyword">VALUES</span> (
    <span class="token-func">gen_random_uuid</span>(),
    <span class="token-string">'elena@startup.io'</span>,
    <span class="token-string">'Enterprise'</span>,
    <span class="token-func">NOW</span>()
) <span class="token-keyword">RETURNING</span> id;

<span class="token-comment">-- 2. Write-Ahead Log (WAL) committed to disk</span>
<span class="token-comment">-- 3. B-Tree primary key index updated</span>`,
        takeaway: "Databases do not write directly to fragile files. They first append an immutable log entry to the Write-Ahead Log (WAL) for crash recovery, then slot the row into indexed disk pages.",
        tip: "Notice the WAL buffer commit flash before the row slots into the table!"
    },
    {
        badge: "STAGE 03 // CACHING LAYER",
        title: "In-Memory Caching (Redis / RAM)",
        subtitle: "Bridging the speed gap: 0.1ms RAM access vs 15ms Disk query latency.",
        stats: { s1: "1.2 MB RAM", s2: "KEY-VALUE", s3: "REDIS IN-MEMORY" },
        fileTitle: "cache_manager.py",
        code: `<span class="token-comment"># Check high-speed in-memory cache first</span>
cached_user = redis_client.get(<span class="token-string">"user:usr_94a2"</span>)

<span class="token-keyword">if</span> cached_user:
    <span class="token-keyword">return</span> json.loads(cached_user)  <span class="token-comment"># 0.1ms Cache Hit!</span>

<span class="token-comment"># On Cache Miss: Query SQL DB and populate cache</span>
user = db.query(User).filter_by(id=<span class="token-string">"usr_94a2"</span>).first()
redis_client.setex(<span class="token-string">"user:usr_94a2"</span>, <span class="token-num">3600</span>, json.dumps(user))`,
        takeaway: "In-memory stores keep frequently queried data directly in fast RAM chips. This prevents millions of repetitive queries from overwhelming the physical database disk.",
        tip: "Click the 'TEST CACHE HIT' and 'TEST CACHE MISS' buttons to compare latency speeds!"
    },
    {
        badge: "STAGE 04 // API QUERY TRANSIT",
        title: "API Query Transit & Return Loop",
        subtitle: "Serving high-speed client read queries through cached network paths.",
        stats: { s1: "260 B", s2: "GZIP COMPRESSED", s3: "REST / CACHE HIT" },
        fileTitle: "query_transit.py",
        code: `<span class="token-comment"># Client issues GET query</span>
<span class="token-keyword">@router.get</span>(<span class="token-string">"/v1/users/{user_id}"</span>)
<span class="token-keyword">async def</span> get_user(user_id: <span class="token-string">str</span>):
    <span class="token-comment"># Instant resolution from Cache</span>
    data = <span class="token-keyword">await</span> cache.fetch(user_id)
    <span class="token-keyword">return</span> {
        <span class="token-string">"status"</span>: <span class="token-string">"success"</span>,
        <span class="token-string">"user"</span>: data,
        <span class="token-string">"source"</span>: <span class="token-string">"in_memory_cache"</span>
    }`,
        takeaway: "When client applications query an API, the gateway routes to cache first. A cache hit instantly streams the response back across the network wire with near-zero compute overhead.",
        tip: "Follow the green query packet as it resolves from cache and streams back to the client."
    },
    {
        badge: "STAGE 05 // ASYNC SERVICES",
        title: "Async Queues & Third-Party SaaS",
        subtitle: "Decoupling heavy tasks: Transactional Mailers, Billing webhooks, and Worker queues.",
        stats: { s1: "3 TASKS", s2: "AMQP / PUB-SUB", s3: "CELERY / REDIS" },
        fileTitle: "event_worker.py",
        code: `<span class="token-comment"># Decouple heavy jobs to background worker queue</span>
task_queue.dispatch(<span class="token-string">"user.signup_event"</span>, {
    <span class="token-string">"email"</span>: user.email,
    <span class="token-string">"plan"</span>: user.tier
})

<span class="token-comment"># Worker 1: Dispatch transactional Welcome Email</span>
email_service.send_template(<span class="token-string">"welcome.html"</span>, user.email)

<span class="token-comment"># Worker 2: Trigger Stripe SaaS subscription sync</span>
saas_billing.create_customer(user.id, plan=<span class="token-string">"Enterprise"</span>)`,
        takeaway: "The user should never wait for third-party APIs like Stripe or SendGrid to reply. The API enqueues a background message and returns immediately, while async workers handle emails and billing.",
        tip: "Observe the event worker queue firing transactional emails and SaaS billing webhooks in parallel!"
    }
];

// ============================================================================
// MODULE 3: SCRIPT AUTOMATION & DATA LABORS
// ============================================================================
const AUTOMATION_STAGES = [
    {
        badge: "STAGE 01 // DATA INGRESS & CASTING",
        title: "Input Stream & Type Casting",
        subtitle: "How raw keyboard character streams are measured, parsed, and stamped into typed binary tokens.",
        stats: { s1: "3 TOKENS", s2: "ASCII / IEEE-754", s3: "TYPE FOUNDRY" },
        fileTitle: "input_ingress.py",
        code: `<span class="token-comment"># 1. Ingest raw character streams from STDIN</span>
raw_name = input(<span class="token-string">"Enter customer name: "</span>)   <span class="token-comment"># "Elena"</span>
price_str = input(<span class="token-string">"Enter item price: "</span>)      <span class="token-comment"># "850.00"</span>
qty_str = input(<span class="token-string">"Enter item quantity: "</span>)     <span class="token-comment"># "3"</span>

<span class="token-comment"># 2. Type Foundry: Parse &amp; Cast raw strings</span>
customer_name = str(raw_name)         <span class="token-comment"># UTF-8 text crate</span>
unit_price = float(price_str)         <span class="token-comment"># IEEE-754 64-bit float</span>
quantity = int(qty_str)               <span class="token-comment"># 32-bit integer ingot</span>`,
        takeaway: "User input arrives as raw, untyped ASCII/UTF-8 character bytes. The interpreter must parse and smelt text into strict binary representations (integers, floats) before any arithmetic can execute.",
        tip: "Watch the vibrating conveyor carry loose text blocks into the hydraulic type foundry press!"
    },
    {
        badge: "STAGE 02 // MEMORY MATRIX & ALU FORGE",
        title: "Variable Slots & ALU Arithmetic",
        subtitle: "Allocating physical RAM address lockers and grinding mechanical arithmetic gears to calculate totals.",
        stats: { s1: "4 REGISTERS", s2: "0x7FFE_4A00", s3: "ALU CLOCKWORK" },
        fileTitle: "memory_alu.py",
        code: `<span class="token-comment"># 1. Reserve addressed slots in RAM bank</span>
customer = <span class="token-string">"Elena"</span>        <span class="token-comment"># Lockbox at 0x7FFE_4A00</span>
price = <span class="token-num">850.00</span>           <span class="token-comment"># Lockbox at 0x7FFE_4A18</span>
qty = <span class="token-num">3</span>                  <span class="token-comment"># Lockbox at 0x7FFE_4A20</span>

<span class="token-comment"># 2. ALU Core physically calculates product</span>
<span class="token-comment"># Multiplication cascades through logic gates</span>
total = price * qty      <span class="token-comment"># 850.00 * 3 = 2550.00</span>
order_id = <span class="token-string">"ORD-9021"</span>    <span class="token-comment"># Allocated in 12ns</span>`,
        takeaway: "Variables are physical memory lockers in silicon. Arithmetic (price * qty) isn't abstract thought—it physically cycles hardware ALU multiplier circuits to forge new values and deposit them into target address lockers.",
        tip: "Observe the ALU brass gears meshing together with electric sparks to forge the final order total!"
    },
    {
        badge: "STAGE 03 // DISK SCRIBE & PERSISTENCE",
        title: "File Archival & Carriage Scribe",
        subtitle: "Overcoming storage friction: acquiring OS locks, unspooling CSV ledger tape, and burning magnetic platters.",
        stats: { s1: "54 B / ROW", s2: "FLOCK / FSYNC", s3: "NVMe PERSIST" },
        fileTitle: "ledger_append.py",
        code: `<span class="token-comment"># 1. Acquire OS file lock &amp; open write buffer</span>
<span class="token-keyword">with</span> open(<span class="token-string">"orders.csv"</span>, <span class="token-string">"a"</span>, encoding=<span class="token-string">"utf-8"</span>) <span class="token-keyword">as</span> f:
    <span class="token-comment"># 2. Format row with comma delimiters</span>
    row = f<span class="token-string">"{order_id},{customer},{item},{qty},{total}\\n"</span>
    
    <span class="token-comment"># 3. Mechanical carriage scribe writes row</span>
    f.write(row)
    
    <span class="token-comment"># 4. Atomic disk commit flush</span>
    f.flush() <span class="token-comment"># Commits volatile RAM to non-volatile disk</span>`,
        takeaway: "RAM memory is volatile and vanishes when power cuts. Storing to disk requires overcoming physical friction: file locking (flock), carriage buffer formatting with delimiters, and committing sectors to NVMe/magnetic platters.",
        tip: "Watch the typewriter carriage scribe step character-by-character along the ledger tape, followed by the laser platter burn!"
    },
    {
        badge: "STAGE 04 // TEMPLATE WEAVING LOOM",
        title: "Blueprint Stencil & Variable Interpolation",
        subtitle: "How template engines (Jinja2/Django) act as industrial hot-typesetting looms to assemble HTML documents.",
        stats: { s1: "1.2 KB", s2: "JINJA2 / SSR", s3: "THERMAL WELD" },
        fileTitle: "render_template.py",
        code: `<span class="token-keyword">from</span> jinja2 <span class="token-keyword">import</span> Template
<span class="token-keyword">with</span> open(<span class="token-string">"invoice_receipt.html"</span>) <span class="token-keyword">as</span> f:
    template = Template(f.read())

<span class="token-comment"># Robotic pick-and-place: inject RAM variables</span>
rendered_html = template.render(
    customer=customer,     <span class="token-comment"># -&gt; &lt;div&gt;Elena&lt;/div&gt;</span>
    item=<span class="token-string">"Quantum Sensor"</span>,  <span class="token-comment"># -&gt; &lt;span&gt;Sensor&lt;/span&gt;</span>
    total=f<span class="token-string">"$\\{total:,.2f\\}"</span> <span class="token-comment"># -&gt; &lt;b&gt;$2,550.00&lt;/b&gt;</span>
)`,
        takeaway: "Web pages are not static files. Template engines act like hot-typesetting printing presses, pulling dynamic variable ingots from RAM and stamping them into hollow blueprint sockets ({{ var }}), then thermally welding them into clean HTML.",
        tip: "Watch the overhead robotic gantry arm pick values from RAM, snap them into the blueprint stencil, and sweep the thermal fusion bar!"
    },
    {
        badge: "STAGE 05 // WIRE EXPRESS & DOM PAINTER",
        title: "Network Transit & DOM Shelf Chassis",
        subtitle: "Shooting data capsules across fiber pipes and unfolding hierarchical DOM shelves inside the client browser.",
        stats: { s1: "200 OK", s2: "HTTP/2 CONDUIT", s3: "DOM TREE" },
        fileTitle: "browser_render.js",
        code: `<span class="token-comment">// 1. Dispatched across network fiber conduit</span>
fetch(<span class="token-string">"/order/9021"</span>)
  .then(res =&gt; res.text())
  .then(html =&gt; {
      <span class="token-comment">// 2. Browser parses DOM tree &amp; expands shelves</span>
      <span class="token-keyword">const</span> app = document.getElementById(<span class="token-string">"viewport"</span>);
      app.innerHTML = html;
      
      <span class="token-comment">// 3. Layout reflow, CSS styling &amp; verification stamp</span>
      app.classList.add(<span class="token-string">"paid-verified"</span>);
  });`,
        takeaway: "The browser doesn't just display text; it constructs an expandable chassis of Document Object Model (DOM) shelves. Arriving network packets unpack structured tags (<header>, <table>, <tr>, <td>) and calculate pixel layouts in real time.",
        tip: "Watch the data capsule shoot through the fiber pneumatic conduit, unfolding the browser DOM shelves in cascade!"
    }
];

// ============================================================================
// SCENES IMPLEMENTATIONS (MODULE 1: PACKAGING)
// ============================================================================
class SceneJSON extends Phaser.Scene {
    constructor() { super('SceneJSON'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        const dataNodes = [
            { key: '"name"', val: '"Atlas"', x: cx - 220, y: cy - 130, color: 0x00f0ff },
            { key: '"level"', val: '42', x: cx + 20, y: cy - 160, color: 0xffd600 },
            { key: '"hp"', val: '100.0', x: cx - 180, y: cy + 130, color: 0x00ff88 },
            { key: '"skills"', val: '["dash", "shield"]', x: cx + 80, y: cy + 140, color: 0x9d4edd }
        ];

        this.nodeContainers = dataNodes.map(item => {
            const container = this.add.container(item.x, item.y);
            const bg = this.add.rectangle(0, 0, 180, 50, 0x111625, 0.95).setStrokeStyle(1.5, item.color, 0.8);
            const ramAddr = this.add.text(-80, -18, '0x' + Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase(), {
                fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#6272a4'
            });
            const text = this.add.text(0, 4, `${item.key}: ${item.val}`, {
                fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#ffffff', fontStyle: 'bold'
            }).setOrigin(0.5);
            container.add([bg, ramAddr, text]);
            return container;
        });

        this.chamber = this.add.container(cx, cy);
        const chamberBg = this.add.rectangle(0, 0, 440, 100, 0x0c111e, 0.95).setStrokeStyle(2, 0x00f0ff, 0.7);
        const chamberLabel = this.add.text(0, -38, 'SERIALIZER PIPELINE // JSON ENCODER', {
            fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#00f0ff', letterSpacing: 2
        }).setOrigin(0.5);
        this.outputStr = this.add.text(0, 8, '{"name": "Atlas", "level": 42, "hp": 100, ...}', {
            fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a5d6ff', fontStyle: 'bold'
        }).setOrigin(0.5).setAlpha(0);
        this.chamber.add([chamberBg, chamberLabel, this.outputStr]);

        this.initTimeline(cx, cy);
    }

    initTimeline(cx, cy) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.to(this.nodeContainers, { y: "+=12", stagger: 0.1, duration: 1, yoyo: true, repeat: 1, ease: "sine.inOut" });
        tl.call(() => sfx.whoosh());
        tl.to(this.nodeContainers, { x: cx, y: cy, scale: 0.2, alpha: 0, stagger: 0.12, duration: 0.7, ease: "back.in(1.7)" });
        tl.call(() => sfx.snap());
        tl.to(this.outputStr, { alpha: 1, scale: 1.05, duration: 0.5, ease: "power2.out" });
        tl.to(this.outputStr, { scale: 1, duration: 0.2 });
    }
}

class SceneBinary extends Phaser.Scene {
    constructor() { super('SceneBinary'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        const hexColors = [
            { hex: "FF 00 55", num: 0xff0055 }, { hex: "00 F0 FF", num: 0x00f0ff },
            { hex: "00 FF 88", num: 0x00ff88 }, { hex: "FF D6 00", num: 0xffd600 },
            { hex: "9D 4E DD", num: 0x9d4edd }, { hex: "FF 77 00", num: 0xff7700 },
            { hex: "00 A2 FF", num: 0x00a2ff }, { hex: "FF 00 AA", num: 0xff00aa },
            { hex: "26 C6 DA", num: 0x26c6da }, { hex: "EE FF 41", num: 0xeeff41 },
            { hex: "7C 4D FF", num: 0x7c4dff }, { hex: "FF 52 52", num: 0xff5252 },
            { hex: "69 F0 AE", num: 0x69f0ae }, { hex: "FF AB 00", num: 0xffab00 },
            { hex: "40 C4 FF", num: 0x40c4ff }, { hex: "E0 40 FB", num: 0xe040fb }
        ];

        this.cells = [];
        const gridSize = 4;
        const cellSize = 66;
        const gap = 12;
        const startX = cx - (gridSize * (cellSize + gap)) / 2 + cellSize / 2;
        const startY = cy - (gridSize * (cellSize + gap)) / 2 + cellSize / 2;

        hexColors.forEach((item, idx) => {
            const col = idx % gridSize;
            const row = Math.floor(idx / gridSize);
            const x = startX + col * (cellSize + gap);
            const y = startY + row * (cellSize + gap);

            const container = this.add.container(x, y);
            const hexCard = this.add.rectangle(0, 0, cellSize, cellSize, 0x111625, 0.95).setStrokeStyle(1.5, 0x414868);
            const hexText = this.add.text(0, 0, item.hex, { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#00f0ff', fontStyle: 'bold' }).setOrigin(0.5);
            const pixel = this.add.rectangle(0, 0, cellSize, cellSize, item.num).setStrokeStyle(2, 0xffffff, 0.7).setScale(0, 1);

            container.add([hexCard, hexText, pixel]);
            this.cells.push({ hexCard, pixel });
        });

        this.laserLine = this.add.line(0, 0, startX - 40, startY - 20, startX - 40, startY + gridSize * (cellSize + gap), 0x00f0ff).setLineWidth(3, 3).setAlpha(0);

        this.initTimeline(startX, startY, gridSize, cellSize, gap);
    }

    initTimeline(startX, startY, gridSize, cellSize, gap) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.to(this.laserLine, { alpha: 1, duration: 0.3 });
        tl.call(() => sfx.laser());
        const endX = startX + gridSize * (cellSize + gap) + 30;
        tl.to(this.laserLine, { x: endX - (startX - 40), duration: 2, ease: "power1.inOut" });

        this.cells.forEach((cell, idx) => {
            const col = idx % gridSize;
            const delay = 0.3 + col * 0.45;
            tl.to(cell.hexCard, { scaleX: 0, duration: 0.2, ease: "power2.in", onStart: () => sfx.snap() }, delay);
            tl.to(cell.pixel, { scaleX: 1, duration: 0.3, ease: "back.out(2)" }, delay + 0.18);
        });
        tl.to(this.laserLine, { alpha: 0, duration: 0.3 });
    }
}

class ScenePDF extends Phaser.Scene {
    constructor() { super('ScenePDF'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        this.p0 = { x: cx - 200, y: cy + 60 };
        this.p1 = { x: cx - 100, y: cy - 130 };
        this.p2 = { x: cx + 100, y: cy + 160 };
        this.p3 = { x: cx + 200, y: cy - 40 };

        this.curveGfx = this.add.graphics();
        this.plotter = this.add.container(this.p0.x, this.p0.y);
        const reticle = this.add.circle(0, 0, 12).setStrokeStyle(1.5, 0x00f0ff);
        this.plotterCoords = this.add.text(16, -16, 'X: 000 Y: 000', { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#00f0ff' });
        this.plotter.add([reticle, this.plotterCoords]);

        this.emblemText = this.add.text(cx, cy - 20, "PDF VECTOR ENGINE", {
            fontFamily: 'Outfit', fontSize: '26px', fontStyle: 'bold', color: '#ffffff'
        }).setOrigin(0.5).setScale(0);

        this.initTimeline();
    }

    initTimeline() {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        const curveProgress = { t: 0 };
        tl.call(() => sfx.laser());
        tl.to(curveProgress, {
            t: 1,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
                const t = curveProgress.t;
                const u = 1 - t;
                const x = u*u*u * this.p0.x + 3 * u*u * t * this.p1.x + 3 * u * t*t * this.p2.x + t*t*t * this.p3.x;
                const y = u*u*u * this.p0.y + 3 * u*u * t * this.p1.y + 3 * u * t*t * this.p2.y + t*t*t * this.p3.y;

                this.plotter.setPosition(x, y);
                this.plotterCoords.setText(`X: ${Math.round(x)} Y: ${Math.round(y)}`);

                this.curveGfx.clear();
                this.curveGfx.lineStyle(4, 0x00f0ff, 0.9);
                const curve = new Phaser.Curves.CubicBezier(
                    new Phaser.Math.Vector2(this.p0.x, this.p0.y),
                    new Phaser.Math.Vector2(this.p1.x, this.p1.y),
                    new Phaser.Math.Vector2(this.p2.x, this.p2.y),
                    new Phaser.Math.Vector2(this.p3.x, this.p3.y)
                );
                curve.draw(this.curveGfx, 64);
            }
        });

        tl.call(() => sfx.snap());
        tl.to(this.emblemText, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    }
}

class SceneZIP extends Phaser.Scene {
    constructor() { super('SceneZIP'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        const filesData = [
            { name: "main.py", icon: "🐍", color: 0x00f0ff, x: cx - 200, y: cy - 110 },
            { name: "atlas.png", icon: "🖼️", color: 0x00ff88, x: cx + 180, y: cy - 120 },
            { name: "theme.xml", icon: "📄", color: 0xffd600, x: cx - 180, y: cy + 120 },
            { name: "data.json", icon: "📦", color: 0x9d4edd, x: cx + 180, y: cy + 110 }
        ];

        this.fileContainers = filesData.map(f => {
            const container = this.add.container(f.x, f.y);
            const card = this.add.rectangle(0, 0, 170, 50, 0x111625, 0.95).setStrokeStyle(1.5, f.color, 0.8);
            const icon = this.add.text(-60, 0, f.icon, { fontSize: '18px' }).setOrigin(0.5);
            const name = this.add.text(-40, -6, f.name, { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#fff', fontStyle: 'bold' });
            container.add([card, icon, name]);
            return { container, origX: f.x, origY: f.y };
        });

        this.zipModule = this.add.container(cx, cy).setScale(0);
        const zipBox = this.add.rectangle(0, 0, 160, 160, 0x0e1322, 0.95).setStrokeStyle(2.5, 0xff007f, 0.9);
        const zipIcon = this.add.text(0, -30, "🗜️", { fontSize: '36px' }).setOrigin(0.5);
        const zipTitle = this.add.text(0, 15, "bundle.zip", { fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        const zipStats = this.add.text(0, 38, "CRC32: 0x8F92A14C", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#ff007f' }).setOrigin(0.5);
        this.zipModule.add([zipBox, zipIcon, zipTitle, zipStats]);
        this.zipModule.setSize(160, 160);
        this.zipModule.setInteractive({ useHandCursor: true });
        this.zipModule.on('pointerdown', () => this.explodeDecompress(cx, cy));

        this.initTimeline(cx, cy);
    }

    initTimeline(cx, cy) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => sfx.whoosh());
        tl.to(this.fileContainers.map(f => f.container), { x: cx, y: cy, scale: 0.1, alpha: 0, stagger: 0.1, duration: 0.7, ease: "power2.in" });
        tl.call(() => sfx.snap());
        tl.to(this.zipModule, { scale: 1, duration: 0.6, ease: "back.out(2)" });
    }

    explodeDecompress() {
        sfx.explosion();
        gsap.to(this.zipModule, {
            scale: 1.25, duration: 0.15, yoyo: true, repeat: 1,
            onComplete: () => {
                this.fileContainers.forEach(f => {
                    gsap.to(f.container, { x: f.origX, y: f.origY, scale: 1, alpha: 1, duration: 1, ease: "elastic.out(1, 0.5)" });
                });
            }
        });
    }
}

class ScenePLC extends Phaser.Scene {
    constructor() { super('ScenePLC'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        const registers = [
            { tag: "%IX0.0", name: "ESTOP_OK", val: "TRUE", color: 0x00ff88 },
            { tag: "%IW2", name: "REACTOR_TEMP", val: "78.4°C", color: 0xffd600 },
            { tag: "%QX0.1", name: "PUMP_MOTOR", val: "ENGAGED", color: 0x00f0ff }
        ];

        this.regContainers = registers.map((r, idx) => {
            const y = cy - 80 + idx * 60;
            const container = this.add.container(cx - 180, y);
            const card = this.add.rectangle(0, 0, 190, 46, 0x111625, 0.95).setStrokeStyle(1.5, r.color, 0.8);
            const nameText = this.add.text(-80, 0, `${r.tag}: ${r.name}`, { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#fff' }).setOrigin(0, 0.5);
            const valText = this.add.text(80, 0, r.val, { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00ff88', fontStyle: 'bold' }).setOrigin(1, 0.5);
            container.add([card, nameText, valText]);
            return container;
        });

        this.frameChamber = this.add.container(cx + 160, cy);
        const frameBg = this.add.rectangle(0, 0, 240, 240, 0x0c111e, 0.95).setStrokeStyle(2, 0x00ff88, 0.8);
        const frameTitle = this.add.text(0, -95, "OPC-UA TELEMETRY FRAME", { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#00ff88', fontStyle: 'bold' }).setOrigin(0.5);
        
        const chunks = ["DELIM: 0xAA55", "NODE: 0x01 [PLC_A]", "PAYLOAD: [78.4, 1]", "CRC16: 0xC3B8 [OK]"];
        this.chunkTexts = chunks.map((c, i) => {
            return this.add.text(0, -50 + i * 36, c, { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#a5d6ff', fontStyle: 'bold' }).setOrigin(0.5).setAlpha(0);
        });
        this.frameChamber.add([frameBg, frameTitle, ...this.chunkTexts]);

        this.initTimeline();
    }

    initTimeline() {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.to(this.regContainers, { x: "+=15", stagger: 0.1, duration: 0.5, yoyo: true, repeat: 1, ease: "power2.inOut" });
        this.chunkTexts.forEach((txt, idx) => {
            tl.call(() => sfx.blip(1000 + idx * 200));
            tl.to(txt, { alpha: 1, y: "-=5", duration: 0.35, ease: "back.out(2)" });
        });
    }
}

// ============================================================================
// SCENES IMPLEMENTATIONS (MODULE 2: DATABASE & TRANSIT)
// ============================================================================
class SceneIngestTransit extends Phaser.Scene {
    constructor() { super('SceneIngestTransit'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        this.clientCard = this.add.container(cx - 230, cy);
        const clientBg = this.add.rectangle(0, 0, 190, 190, 0x0e1322, 0.95).setStrokeStyle(1.5, 0x00f0ff, 0.8);
        const clientTitle = this.add.text(0, -75, "CLIENT FRONTEND", { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00f0ff', fontStyle: 'bold' }).setOrigin(0.5);
        const f1 = this.add.text(-80, -40, "Name: Elena Rostova", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#f0f4fc' });
        const f2 = this.add.text(-80, -15, "Email: elena@corp.io", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#f0f4fc' });
        const f3 = this.add.text(-80, 10, "Tier: Enterprise SaaS", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#ffd600' });
        const postBtn = this.add.rectangle(0, 55, 160, 28, 0x00f0ff, 0.2).setStrokeStyle(1.5, 0x00f0ff);
        const postText = this.add.text(0, 55, "POST /api/signup", { fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00f0ff', fontStyle: 'bold' }).setOrigin(0.5);
        this.clientCard.add([clientBg, clientTitle, f1, f2, f3, postBtn, postText]);

        this.gatewayNode = this.add.container(cx, cy);
        const gwCircle = this.add.circle(0, 0, 28, 0x111625, 0.95).setStrokeStyle(2, 0x9d4edd, 0.8);
        const gwIcon = this.add.text(0, 0, "🌐", { fontSize: '18px' }).setOrigin(0.5);
        const gwLabel = this.add.text(0, 42, "GATEWAY (TLS 1.3)", { fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#9d4edd' }).setOrigin(0.5);
        this.gatewayNode.add([gwCircle, gwIcon, gwLabel]);

        this.serverCard = this.add.container(cx + 230, cy);
        const srvBg = this.add.rectangle(0, 0, 190, 190, 0x0e1322, 0.95).setStrokeStyle(1.5, 0x00ff88, 0.8);
        const srvTitle = this.add.text(0, -75, "BACKEND API SERVER", { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00ff88', fontStyle: 'bold' }).setOrigin(0.5);
        const srv1 = this.add.text(-80, -35, "Port: :443 TLS", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#828ba3' });
        const srv2 = this.add.text(-80, -10, "Route: /v1/signup", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#00f0ff' });
        const srv3 = this.add.text(-80, 15, "Status: Worker Ready", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#00ff88' });
        this.serverCard.add([srvBg, srvTitle, srv1, srv2, srv3]);

        this.packet = this.add.container(cx - 230, cy).setScale(0);
        const pBox = this.add.rectangle(0, 0, 72, 34, 0x00f0ff, 0.9).setStrokeStyle(1.5, 0xffffff);
        const pText = this.add.text(0, 0, "JSON\nPACKET", { fontFamily: 'JetBrains Mono', fontSize: '8.5px', color: '#07090e', align: 'center', fontStyle: 'bold' }).setOrigin(0.5);
        this.packet.add([pBox, pText]);

        this.initTimeline(cx);
    }

    initTimeline(cx) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.to(this.packet, { scale: 1, duration: 0.3, ease: "back.out(2)" });
        tl.call(() => sfx.whoosh());
        tl.to(this.packet, { x: cx, duration: 0.8, ease: "power1.inOut" });
        tl.call(() => sfx.snap());
        tl.to(this.gatewayNode, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
        tl.call(() => sfx.laser());
        tl.to(this.packet, { x: cx + 230, duration: 0.8, ease: "power1.inOut" });
        tl.to(this.packet, { scale: 0, duration: 0.2 });
        tl.to(this.serverCard, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 });
    }
}

class SceneDatabaseTables extends Phaser.Scene {
    constructor() { super('SceneDatabaseTables'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        this.walCard = this.add.container(cx, cy - 160);
        const walBg = this.add.rectangle(0, 0, 460, 38, 0x111625, 0.95).setStrokeStyle(1.5, 0xff7700, 0.8);
        this.walText = this.add.text(0, 0, "WAL BUFFER: [PENDING COMMIT] -> 0x88F2: INSERT users", {
            fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#ff7700', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.walCard.add([walBg, this.walText]);

        this.tableCard = this.add.container(cx, cy + 20);
        const tableBg = this.add.rectangle(0, 0, 500, 200, 0x0c111e, 0.95).setStrokeStyle(2, 0x00f0ff, 0.8);
        const tableTitle = this.add.text(-230, -85, "TABLE: users (Primary Key: id)", {
            fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00f0ff', fontStyle: 'bold'
        });

        const r1 = this.add.text(-220, -40, "usr_1001   alice@domain.com   Free Tier    10:14:02", { fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#828ba3' });
        const r2 = this.add.text(-220, -10, "usr_1002   bob@corp.io        Pro SaaS     10:14:15", { fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#828ba3' });
        this.newRow = this.add.text(-220, 25, "usr_94a2   elena@corp.io      Enterprise   10:14:48", { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#00ff88', fontStyle: 'bold' }).setAlpha(0);
        
        this.tableCard.add([tableBg, tableTitle, r1, r2, this.newRow]);
        this.initTimeline();
    }

    initTimeline() {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.to(this.walCard, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
        tl.call(() => {
            sfx.snap();
            this.walText.setText("WAL BUFFER: [COMMITTED DISK 0x88F2] -> SYNC_OK");
            this.walText.setColor("#00ff88");
        });
        tl.call(() => sfx.dbCommit(), null, "+=0.3");
        tl.to(this.newRow, { alpha: 1, scale: 1.05, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        tl.to(this.newRow, { scale: 1, duration: 0.2 });
    }
}

class SceneCacheLayer extends Phaser.Scene {
    constructor() { super('SceneCacheLayer'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        this.cacheCard = this.add.container(cx - 140, cy);
        const cacheBg = this.add.rectangle(0, 0, 250, 240, 0x0c111e, 0.95).setStrokeStyle(2, 0xff007f, 0.9);
        const cacheTitle = this.add.text(0, -95, "IN-MEMORY CACHE (0.1ms)\n[REDIS / RAM]", { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#ff007f', fontStyle: 'bold', align: 'center' }).setOrigin(0.5);
        const s1 = this.add.text(-105, -35, "user:usr_94a2 -> Elena (3590s)", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#00f0ff' });
        const s2 = this.add.text(-105, 5, "session:sess_89 -> Admin (1800s)", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#f0f4fc' });
        const s3 = this.add.text(-105, 45, "tier:ent -> {limit: 1M}", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#ffd600' });
        this.cacheCard.add([cacheBg, cacheTitle, s1, s2, s3]);

        this.diskCard = this.add.container(cx + 150, cy);
        const diskBg = this.add.rectangle(0, 0, 210, 240, 0x0c111e, 0.95).setStrokeStyle(1.5, 0x828ba3, 0.7);
        const diskTitle = this.add.text(0, -95, "NVMe DISK DB (15ms)\n[POSTGRES DISK]", { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#828ba3', fontStyle: 'bold', align: 'center' }).setOrigin(0.5);
        const diskIcon = this.add.text(0, 0, "💾", { fontSize: '42px' }).setOrigin(0.5);
        this.diskCard.add([diskBg, diskTitle, diskIcon]);

        this.initTimeline();
    }

    initTimeline() {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => sfx.cachePing());
        tl.to(this.cacheCard, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 });
    }
}

class SceneAPIQueryTransit extends Phaser.Scene {
    constructor() { super('SceneAPIQueryTransit'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        this.clientCard = this.add.container(cx - 220, cy);
        const cBg = this.add.rectangle(0, 0, 180, 170, 0x0e1322, 0.95).setStrokeStyle(1.5, 0x00f0ff);
        const cTitle = this.add.text(0, -60, "CLIENT APP", { fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00f0ff', fontStyle: 'bold' }).setOrigin(0.5);
        const cQ = this.add.text(0, -15, "GET /users/usr_94a2", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#ffd600' }).setOrigin(0.5);
        this.statusText = this.add.text(0, 30, "Querying...", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#828ba3' }).setOrigin(0.5);
        this.clientCard.add([cBg, cTitle, cQ, this.statusText]);

        this.serverCard = this.add.container(cx + 220, cy);
        const sBg = this.add.rectangle(0, 0, 180, 170, 0x0e1322, 0.95).setStrokeStyle(1.5, 0x00ff88);
        const sTitle = this.add.text(0, -60, "FAST CACHE GATEWAY", { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#00ff88', fontStyle: 'bold' }).setOrigin(0.5);
        const sHit = this.add.text(0, 0, "⚡ CACHE HIT (0.2ms)", { fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00ff88', fontStyle: 'bold' }).setOrigin(0.5);
        this.serverCard.add([sBg, sTitle, sHit]);

        this.queryPacket = this.add.circle(cx - 220, cy, 12, 0x00f0ff).setAlpha(0);
        this.returnPacket = this.add.rectangle(cx + 220, cy, 70, 28, 0x00ff88).setAlpha(0);

        this.initTimeline(cx);
    }

    initTimeline(cx) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.to(this.queryPacket, { alpha: 1, duration: 0.1 });
        tl.call(() => sfx.laser());
        tl.to(this.queryPacket, { x: cx + 220, duration: 0.7, ease: "power2.in" });
        tl.to(this.queryPacket, { alpha: 0, duration: 0.1 });
        tl.call(() => sfx.cachePing());
        tl.to(this.returnPacket, { alpha: 1, duration: 0.1 });
        tl.call(() => sfx.whoosh());
        tl.to(this.returnPacket, { x: cx - 220, duration: 0.7, ease: "power2.out" });
        tl.call(() => {
            sfx.snap();
            this.statusText.setText("200 OK (0.3ms)");
            this.statusText.setColor("#00ff88");
        });
        tl.to(this.returnPacket, { alpha: 0, duration: 0.2 });
    }
}

class SceneAsyncServices extends Phaser.Scene {
    constructor() { super('SceneAsyncServices'); }
    create() {
        this.cameras.main.setBackgroundColor('#07090e');
        const cx = this.scale.width * 0.65;
        const cy = this.scale.height * 0.5;

        this.queueCard = this.add.container(cx - 150, cy);
        const qBg = this.add.rectangle(0, 0, 190, 220, 0x0c111e, 0.95).setStrokeStyle(2, 0xffd600, 0.8);
        const qTitle = this.add.text(0, -85, "EVENT QUEUE\n[RABBITMQ / REDIS]", { fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#ffd600', fontStyle: 'bold', align: 'center' }).setOrigin(0.5);
        const t1 = this.add.text(0, -25, "TASK #1: send_email", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#f0f4fc' }).setOrigin(0.5);
        const t2 = this.add.text(0, 15, "TASK #2: stripe_sync", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#f0f4fc' }).setOrigin(0.5);
        this.queueCard.add([qBg, qTitle, t1, t2]);

        this.mailCard = this.add.container(cx + 160, cy - 65);
        const mBg = this.add.rectangle(0, 0, 200, 95, 0x0c111e, 0.95).setStrokeStyle(1.5, 0x00f0ff);
        const mTitle = this.add.text(0, -25, "TRANSACTIONAL MAILER", { fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00f0ff', fontStyle: 'bold' }).setOrigin(0.5);
        this.mailStatus = this.add.text(0, 10, "Status: DISPATCHING...", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#828ba3' }).setOrigin(0.5);
        this.mailCard.add([mBg, mTitle, this.mailStatus]);

        this.stripeCard = this.add.container(cx + 160, cy + 65);
        const sBg = this.add.rectangle(0, 0, 200, 95, 0x0c111e, 0.95).setStrokeStyle(1.5, 0x9d4edd);
        const sTitle = this.add.text(0, -25, "SAAS BILLING (STRIPE)", { fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#9d4edd', fontStyle: 'bold' }).setOrigin(0.5);
        this.stripeStatus = this.add.text(0, 10, "Subscription: PENDING", { fontFamily: 'JetBrains Mono', fontSize: '9.5px', color: '#828ba3' }).setOrigin(0.5);
        this.stripeCard.add([sBg, sTitle, this.stripeStatus]);

        this.envelope = this.add.text(cx - 50, cy - 30, "✉️", { fontSize: '24px' }).setAlpha(0);

        this.initTimeline(cx, cy);
    }

    initTimeline(cx, cy) {
        if (window.currentTL) window.currentTL.kill();
        const tl = gsap.timeline({ onUpdate: updateScrubberUI, onComplete: () => sfx.powerUp() });
        window.currentTL = tl;

        tl.call(() => sfx.whoosh());
        tl.to(this.envelope, { alpha: 1, duration: 0.1 });
        tl.to(this.envelope, { x: cx + 160, y: cy - 65, duration: 0.8, ease: "power2.inOut" });
        tl.to(this.envelope, { alpha: 0, duration: 0.2 });
        tl.call(() => {
            sfx.mailChime();
            this.mailStatus.setText("Delivered: 250 OK");
            this.mailStatus.setColor("#00ff88");
        });
        tl.to(this.mailCard, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        tl.call(() => {
            sfx.snap();
            this.stripeStatus.setText("Active: cus_94a2");
            this.stripeStatus.setColor("#00ff88");
        });
        tl.to(this.stripeCard, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
    }
}

// ============================================================================
// MASTER CONFIG & SCENE REGISTRY
// ============================================================================
const allScenes = [
    SceneJSON, SceneBinary, ScenePDF, SceneZIP, ScenePLC,
    SceneIngestTransit, SceneDatabaseTables, SceneCacheLayer, SceneAPIQueryTransit, SceneAsyncServices,
    SceneInputDepot, SceneMemoryALU, SceneDiskPersistence, SceneTemplateEngine, SceneBrowserDOM
];

const MODULES = {
    packaging: {
        name: "FILE PACKAGING & FORMATS",
        scenes: ['SceneJSON', 'SceneBinary', 'ScenePDF', 'SceneZIP', 'ScenePLC'],
        tabNames: ["01 JSON", "02 BINARY/PNG", "03 VECTOR/PDF", "04 ZIP ARCHIVE", "05 PLC/CAD"],
        data: PACKAGING_STAGES
    },
    database: {
        name: "DATABASE & API TRANSIT",
        scenes: ['SceneIngestTransit', 'SceneDatabaseTables', 'SceneCacheLayer', 'SceneAPIQueryTransit', 'SceneAsyncServices'],
        tabNames: ["01 INGESTION", "02 DB TABLES", "03 CACHE RAM", "04 API TRANSIT", "05 ASYNC SAAS"],
        data: DATABASE_STAGES
    },
    automation: {
        name: "SCRIPT AUTOMATION & DATA LABORS",
        scenes: ['SceneInputDepot', 'SceneMemoryALU', 'SceneDiskPersistence', 'SceneTemplateEngine', 'SceneBrowserDOM'],
        tabNames: ["01 INPUT/TYPES", "02 MEMORY/ALU", "03 DISK SCRIBE", "04 TEMPLATE LOOM", "05 BROWSER DOM"],
        data: AUTOMATION_STAGES
    }
};

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    resolution: Math.max(window.devicePixelRatio || 1, 2),
    roundPixels: true,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: allScenes
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// UI & CONTROLLER BINDINGS
// ============================================================================
let currentModule = 'packaging';
let currentStage = 0;
window.currentTL = null;
let isPlaying = true;

// DOM Elements
const modPackagingBtn = document.getElementById('mod-packaging');
const modDatabaseBtn = document.getElementById('mod-database');
const modAutomationBtn = document.getElementById('mod-automation');
const stageNav = document.getElementById('stage-tabs');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnAction = document.getElementById('btn-action');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnReplay = document.getElementById('btn-replay');
const speedBtns = document.querySelectorAll('.speed-btn');
const btnSound = document.getElementById('btn-sound');
const timelineTrack = document.getElementById('timeline-track');
const timelineProgress = document.getElementById('timeline-progress');
const timelineTime = document.getElementById('timeline-time');

function updateScrubberUI() {
    if (!window.currentTL) return;
    const progress = window.currentTL.progress() * 100;
    timelineProgress.style.width = `${progress}%`;
    const curTime = window.currentTL.time().toFixed(2);
    const totalTime = window.currentTL.duration().toFixed(2);
    timelineTime.innerText = `${curTime}s / ${totalTime}s`;
}
window.updateStudioScrubber = updateScrubberUI;

timelineTrack.addEventListener('click', (e) => {
    if (!window.currentTL) return;
    const rect = timelineTrack.getBoundingClientRect();
    const ratio = Phaser.Math.Clamp((e.clientX - rect.left) / rect.width, 0, 1);
    window.currentTL.progress(ratio);
    sfx.click();
});

// Render Stage Tabs for the current module
function renderTabs() {
    stageNav.innerHTML = '';
    const mod = MODULES[currentModule];
    mod.tabNames.forEach((name, idx) => {
        const btn = document.createElement('button');
        btn.className = `stage-tab ${idx === currentStage ? 'active' : ''}`;
        btn.dataset.stage = idx;
        btn.innerHTML = `<span class="tab-num">0${idx+1}</span><span class="tab-name">${name.replace(/^\d+\s*/, '')}</span>`;
        btn.addEventListener('click', () => switchStage(idx));
        stageNav.appendChild(btn);
    });
}

function switchModule(modKey) {
    if (currentModule === modKey) return;
    sfx.whoosh();

    // Stop current scene
    const oldSceneKey = MODULES[currentModule].scenes[currentStage];
    game.scene.stop(oldSceneKey);

    currentModule = modKey;
    currentStage = 0;

    modPackagingBtn.classList.toggle('active', currentModule === 'packaging');
    modDatabaseBtn.classList.toggle('active', currentModule === 'database');
    if (modAutomationBtn) modAutomationBtn.classList.toggle('active', currentModule === 'automation');

    renderTabs();
    loadStageContent();

    const newSceneKey = MODULES[currentModule].scenes[0];
    game.scene.start(newSceneKey);
}

function switchStage(newIndex) {
    const mod = MODULES[currentModule];
    if (newIndex < 0 || newIndex >= mod.scenes.length) return;
    sfx.whoosh();

    game.scene.stop(mod.scenes[currentStage]);
    currentStage = newIndex;
    game.scene.start(mod.scenes[currentStage]);

    // Update Tab Styles
    document.querySelectorAll('.stage-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === currentStage);
    });

    loadStageContent();
}

function loadStageContent() {
    const mod = MODULES[currentModule];
    const data = mod.data[currentStage];

    btnPrev.disabled = (currentStage === 0);
    btnNext.disabled = (currentStage === mod.scenes.length - 1);

    document.getElementById('stage-badge').innerText = data.badge;
    document.getElementById('stage-title').innerText = data.title;
    document.getElementById('stage-subtitle').innerText = data.subtitle;

    document.getElementById('stat-val-1').innerText = data.stats.s1;
    document.getElementById('stat-val-2').innerText = data.stats.s2;
    document.getElementById('stat-val-3').innerText = data.stats.s3;

    document.getElementById('code-file-title').innerText = data.fileTitle;
    document.getElementById('code-block').innerHTML = data.code;
    document.getElementById('takeaway-text').innerText = data.takeaway;
    document.getElementById('tip-text').innerText = data.tip;
    document.getElementById('timeline-step-name').innerText = `PHASE 1: ${data.title.toUpperCase()}`;
}

modPackagingBtn.addEventListener('click', () => switchModule('packaging'));
modDatabaseBtn.addEventListener('click', () => switchModule('database'));
if (modAutomationBtn) modAutomationBtn.addEventListener('click', () => switchModule('automation'));

btnNext.addEventListener('click', () => switchStage(currentStage + 1));
btnPrev.addEventListener('click', () => switchStage(currentStage - 1));

btnPlayPause.addEventListener('click', () => {
    if (!window.currentTL) return;
    sfx.click();
    if (isPlaying) {
        window.currentTL.pause();
        btnPlayPause.innerText = '▶ PLAY';
        btnPlayPause.classList.remove('primary');
    } else {
        window.currentTL.play();
        btnPlayPause.innerText = '❚❚ PAUSE';
        btnPlayPause.classList.add('primary');
    }
    isPlaying = !isPlaying;
});

btnReplay.addEventListener('click', () => {
    if (!window.currentTL) return;
    sfx.click();
    window.currentTL.restart();
    isPlaying = true;
    btnPlayPause.innerText = '❚❚ PAUSE';
    btnPlayPause.classList.add('primary');
});

speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sfx.click();
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const spd = parseFloat(btn.dataset.speed);
        if (window.currentTL) window.currentTL.timeScale(spd);
    });
});

btnAction.addEventListener('click', () => {
    if (window.currentTL) {
        sfx.click();
        const curProgress = window.currentTL.progress();
        if (curProgress >= 1) {
            window.currentTL.restart();
        } else {
            window.currentTL.progress(Math.min(1, curProgress + 0.25));
        }
    }
});

btnSound.addEventListener('click', () => {
    const isMuted = sfx.toggleMute();
    const icon = btnSound.querySelector('.sound-icon');
    const label = btnSound.querySelector('.sound-label');
    if (isMuted) {
        icon.innerText = '🔇';
        label.innerText = 'AUDIO OFF';
        btnSound.style.opacity = '0.6';
    } else {
        icon.innerText = '🔊';
        label.innerText = 'AUDIO ON';
        btnSound.style.opacity = '1';
        sfx.blip();
    }
});

// Initialize UI
renderTabs();
loadStageContent();
game.scene.start(MODULES[currentModule].scenes[0]);
