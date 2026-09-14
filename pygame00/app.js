/**
 * Game Concepts Lab: Vector Motion, Inputs, State, and Loops in JavaScript.
 * Runs directly in browser environments.
 */

// 1. DATA REPOSITORY: Code source displayed inside the interactive tracer
const SOURCE_CODE = [
  { n: 1,  stage: "INIT",  t: `<span class="c-cm">// [VARIABLES & STATE]: Memory allocation for coordinates and engine flags</span>` },
  { n: 2,  stage: "INIT",  t: `<span class="c-kw">let</span> currentPos <span class="c-op">=</span> { x: <span class="c-num">300</span>, y: <span class="c-num">200</span> };` },
  { n: 3,  stage: "INIT",  t: `<span class="c-kw">let</span> targetPos <span class="c-op">=</span> { x: <span class="c-num">300</span>, y: <span class="c-num">200</span> };` },
  { n: 4,  stage: "INIT",  t: `<span class="c-kw">let</span> isMoving <span class="c-op">=</span> <span class="c-kw">false</span>;` },
  { n: 5,  stage: "INPUT", t: `<span class="c-cm">// [INPUT LISTENER]: Intercepts mouse or textual coordinates asynchronously</span>` },
  { n: 6,  stage: "INPUT", t: `<span class="c-kw">function</span> <span class="c-fn">onReceiveTarget</span>(newX, newY) {` },
  { n: 7,  stage: "INPUT", t: `  targetPos.x <span class="c-op">=</span> newX; targetPos.y <span class="c-op">=</span> newY;` },
  { n: 8,  stage: "INPUT", t: `  isMoving <span class="c-op">=</span> <span class="c-kw">true</span>;` },
  { n: 9,  stage: "INPUT", t: `}` },
  { n: 10, stage: "LOOP",  t: `<span class="c-cm">// [GAME LOOP]: Executes ~60 times per second using browser refresh synchronization</span>` },
  { n: 11, stage: "LOOP",  t: `<span class="c-kw">function</span> <span class="c-fn">loop</span>(timestamp) {` },
  { n: 12, stage: "PHYS",  t: `  <span class="c-kw">let</span> dt <span class="c-op">=</span> (timestamp - lastTime) / <span class="c-num">1000</span>;` },
  { n: 13, stage: "PHYS",  t: `  <span class="c-cm">// [VECTOR MATH]: Calculate distance using Pythagorean theorem</span>` },
  { n: 14, stage: "PHYS",  t: `  <span class="c-kw">let</span> dx <span class="c-op">=</span> targetPos.x - currentPos.x;` },
  { n: 15, stage: "PHYS",  t: `  <span class="c-kw">let</span> dy <span class="c-op">=</span> targetPos.y - currentPos.y;` },
  { n: 16, stage: "PHYS",  t: `  <span class="c-kw">let</span> dist <span class="c-op">=</span> Math.<span class="c-fn">hypot</span>(dx, dy);` },
  { n: 17, stage: "PHYS",  t: `  <span class="c-cm">// [MOTION & NORMALIZATION]: Step incrementally towards target</span>` },
  { n: 18, stage: "PHYS",  t: `  <span class="c-kw">if</span> (dist <span class="c-op">&gt;</span> <span class="c-num">1.0</span>) {` },
  { n: 19, stage: "PHYS",  t: `    currentPos.x <span class="c-op">+=</span> (dx / dist) * speed * dt;` },
  { n: 20, stage: "PHYS",  t: `    currentPos.y <span class="c-op">+=</span> (dy / dist) * speed * dt;` },
  { n: 21, stage: "PHYS",  t: `  } <span class="c-kw">else</span> { isMoving <span class="c-op">=</span> <span class="c-kw">false</span>; }` },
  { n: 22, stage: "REND",  t: `  <span class="c-cm">// [RENDER PASS]: Clear screen and blit sprite at updated coordinates</span>` },
  { n: 23, stage: "REND",  t: `  ctx.<span class="c-fn">clearRect</span>(<span class="c-num">0</span>, <span class="c-num">0</span>, width, height);` },
  { n: 24, stage: "REND",  t: `  ctx.<span class="c-fn">drawImage</span>(sprite, currentPos.x, currentPos.y);` },
  { n: 25, stage: "LOOP",  t: `  <span class="c-fn">requestAnimationFrame</span>(loop);` },
  { n: 26, stage: "LOOP",  t: `}` }
];

(function() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const codeStream = document.getElementById("code-stream");

  // Memory elements
  const mPosX = document.getElementById("mem-pos-x");
  const mPosY = document.getElementById("mem-pos-y");
  const mTarX = document.getElementById("mem-tar-x");
  const mTarY = document.getElementById("mem-tar-y");
  const mDist = document.getElementById("mem-dist");
  const mDt = document.getElementById("mem-dt");
  const mMoving = document.getElementById("mem-moving");
  const mStage = document.getElementById("mem-stage");

  const hudStatus = document.getElementById("hud-status");
  const hudSpeed = document.getElementById("hud-speed");
  const inputTarget = document.getElementById("input-target");
  const btnSubmit = document.getElementById("btn-submit");
  const sliderSpeed = document.getElementById("slider-speed");

  // State
  let speed = 250;
  let currentPos = { x: 200, y: 200 };
  let targetPos = { x: 200, y: 200 };
  let isMoving = false;
  let lastTime = performance.now();
  let currentStage = "LOOP";
  let activeLines = new Set([11, 25]);

  // Handle high-DPI scaling
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Populate code inspector window
  SOURCE_CODE.forEach(item => {
    const div = document.createElement("div");
    div.className = "code-line";
    div.id = `line-${item.n}`;
    div.innerHTML = `<span class="line-num">${item.n}</span><span class="line-text">${item.t}</span>`;
    codeStream.appendChild(div);
  });

  function updateCodeHighlight(stage, specificLines = []) {
    currentStage = stage;
    mStage.textContent = stage;
    document.querySelectorAll(".code-line").forEach(el => el.classList.remove("active-line"));
    
    SOURCE_CODE.forEach(item => {
      if (item.stage === stage || specificLines.includes(item.n)) {
        const el = document.getElementById(`line-${item.n}`);
        if (el) el.classList.add("active-line");
      }
    });
  }

  // Load SVG or use procedural fallback
  const sprite = new Image();
  let spriteLoaded = false;
  sprite.onload = () => { spriteLoaded = true; };
  sprite.onerror = () => { spriteLoaded = false; };
  sprite.src = "cat_a.svg";

  // Dispatch target change
  function setTarget(x, y) {
    targetPos.x = Math.max(20, Math.min(canvas.width - 20, x));
    targetPos.y = Math.max(20, Math.min(canvas.height - 20, y));
    const dist = Math.hypot(targetPos.x - currentPos.x, targetPos.y - currentPos.y);

    if (dist > 1.0) {
      isMoving = true;
      hudStatus.textContent = "MOVING";
      hudStatus.style.color = "#00ffaa";
      updateCodeHighlight("INPUT", [6, 7, 8]);
    } else {
      isMoving = false;
      hudStatus.textContent = "ARRIVED";
      hudStatus.style.color = "#00d2ff";
    }
  }

  // Event Listeners
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTarget(x, y);
  });

  btnSubmit.addEventListener("click", () => {
    parseCoordinates();
  });

  inputTarget.addEventListener("keydown", (e) => {
    if (e.key === "Enter") parseCoordinates();
  });

  function parseCoordinates() {
    const parts = inputTarget.value.trim().split(/\s+/);
    if (parts.length === 2) {
      const x = parseFloat(parts[0]);
      const y = parseFloat(parts[1]);
      if (!isNaN(x) && !isNaN(y)) {
        setTarget(x, y);
        inputTarget.value = "";
        return;
      }
    }
    hudStatus.textContent = "INVALID COORDS";
    hudStatus.style.color = "#ff4444";
  }

  sliderSpeed.addEventListener("input", (e) => {
    speed = parseFloat(e.target.value);
    hudSpeed.textContent = speed;
  });

  // Main Loop
  function gameLoop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1); // Guard against massive jumps
    lastTime = now;

    const dx = targetPos.x - currentPos.x;
    const dy = targetPos.y - currentPos.y;
    const dist = Math.hypot(dx, dy);

    // Update memory table
    mPosX.textContent = currentPos.x.toFixed(1);
    mPosY.textContent = currentPos.y.toFixed(1);
    mTarX.textContent = targetPos.x.toFixed(1);
    mTarY.textContent = targetPos.y.toFixed(1);
    mDist.textContent = dist.toFixed(1);
    mDt.textContent = dt.toFixed(4) + "s";
    mMoving.textContent = isMoving ? "true" : "false";

    // Physics Update
    if (isMoving) {
      updateCodeHighlight("PHYS");
      const step = speed * dt;
      if (dist <= step) {
        currentPos.x = targetPos.x;
        currentPos.y = targetPos.y;
        isMoving = false;
        hudStatus.textContent = "IDLE";
        hudStatus.style.color = "#00d2ff";
      } else {
        currentPos.x += (dx / dist) * step;
        currentPos.y += (dy / dist) * step;
      }
    } else if (currentStage !== "INPUT") {
      updateCodeHighlight("LOOP");
    }

    // Render Update
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw coordinate target crosshair and movement vector line
    if (isMoving) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(currentPos.x, currentPos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffaa";
      ctx.fill();
    }

    // Draw sprite (SVG or procedural cat face)
    ctx.save();
    ctx.translate(currentPos.x, currentPos.y);
    if (spriteLoaded) {
      ctx.drawImage(sprite, -24, -24, 48, 48);
    } else {
      ctx.fillStyle = "#ff7733";
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fill();
      // Ears
      ctx.beginPath();
      ctx.moveTo(-16, -10);
      ctx.lineTo(-8, -26);
      ctx.lineTo(0, -14);
      ctx.fillStyle = "#e05511";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(16, -10);
      ctx.lineTo(8, -26);
      ctx.lineTo(0, -14);
      ctx.fill();
    }
    ctx.restore();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame((now) => {
    lastTime = now;
    gameLoop(now);
  });
})();