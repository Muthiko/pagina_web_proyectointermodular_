/* ===== Data: Frutiger Aero ===== */
const aeroData = [
  {
    main: true,
    title: "¿Qué es Frutiger Aero?",
    text: "Estética visual dominante entre ~2004-2012. Combina transparencias, brillos húmedos, gradientes aqua/verde, burbujas y naturaleza digital. Nació con Windows Vista Aero, iOS temprano, logos de Yahoo/MSN y publicidad de la época. Transmitía optimismo tecnológico limpio y futurista."
  },
  {
    title: "Windows Aero",
    text: "El glassmorphism de Vista y 7 popularizó las ventanas translúcidas con reflejos y bordes suaves. El nombre “Aero” viene de Authentic, Energetic, Reflective and Open."
  },
  {
    title: "Naturaleza + Tech",
    text: "Imágenes de hierba verde brillante, gotas de agua, cielos azules y hojas se mezclaban con interfaces digitales. La naturaleza se sentía “limpia” y tecnológica."
  },
  {
    title: "Burbujas por doquier",
    text: "Esferas de jabón, gotas de agua y orbes transparentes eran elementos clave. Representaban pureza, frescura y un futuro “sin fricción”."
  },
  {
    title: "iPhone 1-4",
    text: "Los iconos brillantes, el skeuomorfismo y los reflejos de los primeros iPhones formaban parte del mismo universo visual que Frutiger Aero."
  },
  {
    title: "Colores clave",
    text: "Aqua, cyan, verde lima, blanco perlado y azules claros. Todo con alto brillo especular y degradados suaves."
  },
  {
    title: "Era pre-flat",
    text: "Antes del diseño plano (iOS 7, Material Design), el mundo digital era táctil, 3D y “mojado”. Frutiger Aero es la última gran era del skeuomorfismo masivo."
  },
  {
    title: "TV y publicidad",
    text: "Anuncios de detergentes, refrescos, bancos y telecomunicaciones usaban esta estética: limpio, confiable y moderno."
  },
  {
    title: "Videojuegos",
    text: "Muchos menús de consolas y juegos de la época (Wii, PSP, Xbox 360) adoptaron el look brillante y amigable de Frutiger Aero."
  },
  {
    title: "Nombre del estilo",
    text: "“Frutiger” viene de la tipografía Frutiger (muy usada en señalética limpia). “Aero” del glass de Windows. El término se popularizó en internet años después."
  },
  {
    title: "Sensación",
    text: "Optimismo, higiene digital, progreso suave. Un futuro donde la tecnología se sentía amigable, casi orgánica."
  },
  {
    title: "Años pico",
    text: "2005-2012 aproximadamente. Luego llegó el flat design y el minimalismo seco que dominó la década siguiente."
  }
];

/* ===== Data: Frutiger Night ===== */
const nightData = [
  {
    main: true,
    title: "¿Qué es Frutiger Night?",
    text: "La versión nocturna del universo Frutiger. Mantiene el brillo, el glass y la tech limpia, pero bajo cielos estrellados, lunas, neones azules y ciudades iluminadas. Es el mismo optimismo futurista, ahora en modo noche."
  },
  {
    title: "Ciudad nocturna",
    text: "Rascacielos con luces, pantallas brillantes y reflejos en el agua. La noche no es oscura: está llena de cian, azul eléctrico y destellos de neón."
  },
  {
    title: "Luna y estrellas",
    text: "La luna brillante, arcos de luz y estrellas son firmas visuales. Sustituyen al sol del Frutiger Aero diurno sin perder el tono esperanzador."
  },
  {
    title: "Verde nocturno",
    text: "La hierba y los árboles siguen presentes, pero bañados por luz artificial suave: farolas, caminos iluminados y un toque de sci-fi tranquilo."
  },
  {
    title: "Pantallas y UI",
    text: "Monitores, interfaces y hologramas con tipografía clara sobre fondos oscuros translúcidos. El glassmorphism se adapta al modo noche."
  },
  {
    title: "Colores clave",
    text: "Azul profundo, cian neón, blanco lunar, verde hierba bajo luz artificial y toques de púrpura/índigo en el cielo."
  },
  {
    title: "Misma era",
    text: "Comparte años y raíces con Frutiger Aero (mediados de los 2000). Aparecía en wallpapers, intros de TV, menús de consolas y publicidades “tech del futuro”."
  },
  {
    title: "Sensación",
    text: "Calma tecnológica, ciudad viva de noche, progreso silencioso. Un futuro que no duerme pero tampoco agobia."
  },
  {
    title: "Vs. Aero diurno",
    text: "Aero = día, sol, burbujas y cielo claro. Night = luna, neón, cielo estrellado y reflejos urbanos. Misma familia visual, distinta hora del día."
  },
  {
    title: "Wallpapers clásicos",
    text: "Muchos fondos de escritorio de la época mezclaban globos terráqueos, ciudades y arcos de luz sobre praderas nocturnas: iconos del estilo."
  },
  {
    title: "Audio y media",
    text: "Intros de canales, menús de DVD y demos de software usaban esta atmósfera: limpia, espacial y optimista."
  },
  {
    title: "Hoy",
    text: "Frutiger Night ha vuelto en redes y diseño nostálgico: quien ama el Aero diurno suele explorar también su cara nocturna."
  }
];

/* ===== State ===== */
let activated = false;
let isNight = false;
let cardsData = aeroData;

const logo = document.getElementById("logo");
const cardsContainer = document.getElementById("cards");
const bg = document.getElementById("bg");
const hint = document.getElementById("hint");
const bubblesEl = document.getElementById("bubbles");
const moonBtn = document.getElementById("moonBtn");

/* ===== Create cards (hidden behind logo) ===== */
function createCards() {
  cardsContainer.innerHTML = "";
  cardsData.forEach((data, i) => {
    const card = document.createElement("div");
    card.className = "card" + (data.main ? " main" : "");
    card.innerHTML = `
      ${data.main ? `<span class="card-tag">${isNight ? "Frutiger Night" : "Frutiger Aero"}</span>` : ""}
      <h3>${data.title}</h3>
      <p>${data.text}</p>
    `;
    card.dataset.index = i;
    cardsContainer.appendChild(card);
  });
}

/* ===== Non-overlapping positions – full screen, never leave bounds ===== */
function computePositions() {
  if (isCompact()) return compactPositions(window.innerWidth, window.innerHeight);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const edge = 24; // hard margin from screen edges
  const topSafe = 76; // espacio para el selector de sección

  const mainW = 300;
  const mainH = 210;
  const normalW = 200;
  const normalH = 145;

  // Gap between cards (prevents clustering)
  const gapX = 28;
  const gapY = 24;

  const positions = [];

  // 1) Main card – larger, upper area but fully inside
  {
    const scale = 1.12;
    const w = mainW * scale;
    const h = mainH * scale;
    const x = clamp(vw * 0.20, w / 2 + edge, vw - w / 2 - edge);
    const y = clamp(vh * 0.18, h / 2 + topSafe, vh - h / 2 - edge);
    positions.push({ x, y, w, h, scale });
  }

  // 2) Build a wide grid of candidates across the whole viewport
  const cols = Math.max(4, Math.ceil(Math.sqrt(cardsData.length * 1.8)));
  const rows = Math.max(3, Math.ceil(cardsData.length / cols) + 1);
  const candidates = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) / cols;
      const cy = (r + 0.5) / rows;
      // Leave a soft hole around the logo (center)
      if (Math.abs(cx - 0.5) < 0.11 && Math.abs(cy - 0.5) < 0.13) continue;

      const jitterX = (Math.random() - 0.5) * 0.12;
      const jitterY = (Math.random() - 0.5) * 0.11;
      candidates.push({
        x: (cx + jitterX) * vw,
        y: (cy + jitterY) * vh
      });
    }
  }

  // Shuffle
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  // 3) Place remaining cards with strict bounds + anti-overlap
  const others = cardsData.length - 1;
  let candIdx = 0;

  for (let i = 0; i < others; i++) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 80) {
      let x, y;
      if (candIdx < candidates.length) {
        x = candidates[candIdx].x;
        y = candidates[candIdx].y;
        candIdx++;
      } else {
        x = edge + Math.random() * (vw - 2 * edge);
        y = edge + Math.random() * (vh - 2 * edge);
      }

      const scale = 0.90 + Math.random() * 0.10;
      const w = normalW * scale;
      const h = normalH * scale;

      // Force fully inside the screen
      x = clamp(x, w / 2 + edge, vw - w / 2 - edge);
      y = clamp(y, h / 2 + topSafe, vh - h / 2 - edge);

      // Overlap test with generous gap
      let overlap = false;
      for (const p of positions) {
        const dx = Math.abs(x - p.x);
        const dy = Math.abs(y - p.y);
        if (dx < (w + p.w) / 2 + gapX && dy < (h + p.h) / 2 + gapY) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        positions.push({ x, y, w, h, scale });
        placed = true;
      }
      attempts++;
    }

    // Safe fallback: place on a ring still inside bounds
    if (!placed) {
      const angle = (i / Math.max(others, 1)) * Math.PI * 2 + 0.3;
      const rx = Math.min(vw, vh) * 0.38;
      const ry = Math.min(vw, vh) * 0.34;
      let x = vw / 2 + Math.cos(angle) * rx;
      let y = vh / 2 + Math.sin(angle) * ry;
      const scale = 0.90;
      const w = normalW * scale;
      const h = normalH * scale;
      x = clamp(x, w / 2 + edge, vw - w / 2 - edge);
      y = clamp(y, h / 2 + topSafe, vh - h / 2 - edge);
      positions.push({ x, y, w, h, scale });
    }
  }

  return positions;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* ===== Activate ===== */
function activate() {
  if (activated) return;
  activated = true;

  // Bounce the logo
  logo.classList.add("bounce");
  setTimeout(() => logo.classList.remove("bounce"), 600);

  // Scatter the two pawns a bit
  setTimeout(() => logo.classList.add("scattered"), 200);
  roamStartTimer = setTimeout(startRoam, 1150);

  // Change background (day or night)
  bg.classList.remove("bg-black", "bg-aero", "bg-night");
  bg.classList.add(isNight ? "bg-night" : "bg-aero");

  // Hide hint
  hint.classList.add("hide");
  hideSplash();

  // Spawn bubbles
  spawnBubbles();

  // Position & animate cards outward
  const positions = computePositions();
  layoutCompact = isCompact();
  const cards = Array.from(cardsContainer.children);
  const edgePad = isCompact() ? 6 : 28; // minimum distance from screen edge after bounce

  cards.forEach((card, i) => {
    const pos = positions[i];
    void card.offsetWidth;

    // Store position for drag
    card._x = pos.x;
    card._y = pos.y;
    card._scale = pos.scale;
    card._w = pos.w;
    card._h = pos.h;

    const delay = 80 + i * 70;
    setTimeout(() => {
      card.classList.add("flying");
      card.style.opacity = "1";
      card.style.transform = `${cardT(pos.x, pos.y, pos.scale)}`;
      card.style.transition = `
        transform 1.05s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.65s ease
      `;

      setTimeout(() => {
        bounceIfNearEdge(card, pos, edgePad);
        // Enable drag after settle
        setTimeout(() => enableDrag(card), 400);
      }, 1100);
    }, delay);
  });
}

/* If a card is too close to a screen edge, nudge it inward with a bounce */
function bounceIfNearEdge(card, pos, edgePad) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const halfW = pos.w / 2;
  const halfH = pos.h / 2;
  const topPad = isCompact() ? 62 : 72;

  let x = pos.x;
  let y = pos.y;
  let needsBounce = false;

  // Left
  if (x - halfW < edgePad) {
    x = halfW + edgePad + 6;
    needsBounce = true;
  }
  // Right
  if (x + halfW > vw - edgePad) {
    x = vw - halfW - edgePad - 6;
    needsBounce = true;
  }
  // Top
  if (y - halfH < topPad) {
    y = halfH + topPad + 6;
    needsBounce = true;
  }
  // Bottom
  if (y + halfH > vh - edgePad) {
    y = vh - halfH - edgePad - 6;
    needsBounce = true;
  }

  if (!needsBounce) return;

  // Overshoot slightly outward then settle (small bounce feel)
  const overshootX = x + (x - pos.x) * 0.15;
  const overshootY = y + (y - pos.y) * 0.15;

  card.style.transition = "transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1)";
  card.style.transform = `${cardT(overshootX, overshootY, pos.scale)}`;

  setTimeout(() => {
    card.style.transition = "transform 0.35s cubic-bezier(0.22, 1.2, 0.36, 1)";
    card.style.transform = `${cardT(x, y, pos.scale)}`;
    pos.x = x;
    pos.y = y;
    card._x = x;
    card._y = y;
  }, 220);
}

/* ===== Drag cards ===== */
let dragZ = 100;

function enableDrag(card) {
  card._solid = true; // ya se puede pisar
  card._ready = true;
  card.style.cursor = "grab";
  card.style.touchAction = "none";
  card.style.transition = "box-shadow 0.2s ease, transform 0.05s linear";

  let dragging = false;
  let startPx = 0, startPy = 0;
  let originX = 0, originY = 0;

  function onDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    dragging = true;
    card.style.cursor = "grabbing";
    card.style.zIndex = ++dragZ;
    card.classList.add("dragging");

    const pt = e.touches ? e.touches[0] : e;
    startPx = pt.clientX;
    startPy = pt.clientY;
    originX = card._x;
    originY = card._y;

    // Disable transition while dragging for instant follow
    card.style.transition = "box-shadow 0.15s ease";
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - startPx;
    const dy = pt.clientY - startPy;

    // Free movement – no invisible margin / barrier
    const nx = originX + dx;
    const ny = originY + dy;

    card._x = nx;
    card._y = ny;
    card.style.transform =
      `${cardT(nx, ny, card._scale)}`;
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    card.style.cursor = "grab";
    card.classList.remove("dragging");
    card.style.transition = "box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)";
  }

  card.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);

  // Touch fallback
  card.addEventListener("touchstart", onDown, { passive: false });
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("touchend", onUp);
}

/* ===== Bubbles ===== */
function spawnBubbles() {
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    const size = 18 + Math.random() * 55;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "%";
    b.style.bottom = -size - 20 + "px";
    b.style.animationDuration = 7 + Math.random() * 9 + "s";
    b.style.animationDelay = Math.random() * 4 + "s";
    bubblesEl.appendChild(b);
  }
  // Continuous soft stream
  setInterval(() => {
    if (!activated) return;
    const b = document.createElement("div");
    b.className = "bubble";
    const size = 12 + Math.random() * 40;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "%";
    b.style.bottom = -size - 10 + "px";
    b.style.animationDuration = 8 + Math.random() * 8 + "s";
    bubblesEl.appendChild(b);
    setTimeout(() => b.remove(), 17000);
  }, 1200);
}

/* ===== Toggle Day / Night ===== */
function switchMode() {
  stopRoam();
  isNight = !isNight;
  document.body.classList.toggle("night-mode", isNight);
  cardsData = isNight ? nightData : aeroData;

  // Reset interaction state
  activated = false;
  logo.classList.remove("scattered", "bounce");
  hint.classList.remove("hide");

  // Clear bubbles
  bubblesEl.innerHTML = "";

  // Reset background to black until user clicks again
  bg.classList.remove("bg-aero", "bg-night");
  bg.classList.add("bg-black");

  // Rebuild cards with new content
  createCards();
  updateModeUI(true);
}

/* ===== Init ===== */
createCards();
logo.addEventListener("click", activate);
moonBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  switchMode();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") activate();
});

/* ===== Indicador de sección (Aero / Night) ===== */
const modeSwitch = document.getElementById("modeSwitch");
const modeSplash = document.getElementById("modeSplash");
const moonLabel = moonBtn.querySelector(".moon-label");
let splashTimer = null;

const MODE_INFO = {
  aero:  { name: "Frutiger Aero",  sub: "Día, sol y burbujas",    go: "Ir a Frutiger Night" },
  night: { name: "Frutiger Night", sub: "Noche, luna y neón",     go: "Volver a Frutiger Aero" }
};

function hideSplash() {
  clearTimeout(splashTimer);
  modeSplash.classList.remove("show");
}

function showSplash(key) {
  hideSplash();
  modeSplash.dataset.mode = key;
  modeSplash.querySelector("h1").textContent = MODE_INFO[key].name;
  modeSplash.querySelector("p").textContent = MODE_INFO[key].sub;
  void modeSplash.offsetWidth;
  modeSplash.classList.add("show");
  splashTimer = setTimeout(hideSplash, 2400);
}

function updateModeUI(withSplash) {
  const key = isNight ? "night" : "aero";
  const info = MODE_INFO[key];
  document.body.dataset.mode = key;
  modeSwitch.dataset.mode = key;
  modeSwitch.querySelectorAll(".ms-btn").forEach(btn => {
    const on = btn.dataset.mode === key;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on);
  });
  moonLabel.textContent = info.go;
  moonBtn.title = info.go;
  moonBtn.setAttribute("aria-label", info.go);
  hint.textContent = info.name + (hasKeyboard() ? " – haz clic en los peones" : " – toca los peones");
  document.title = info.name;
  if (withSplash) showSplash(key);
}

modeSwitch.querySelectorAll(".ms-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.blur();
    if ((btn.dataset.mode === "night") !== isNight) switchMode();
  });
});
moonBtn.addEventListener("click", () => moonBtn.blur());



/* ===== Peones que corretean por el suelo y por las tarjetas ===== */
const GRAV = 1600;                 // gravedad (px/s²)
let roamMarker = null, tipEl = null, tipTimer = 0, tipDelay = 0;
let roamLayer = null, roamRAF = 0, roamStartTimer = 0, roamLast = 0, roamers = [];
const rnd = (a, b) => a + Math.random() * (b - a);

function startRoam() {
  if (roamers.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!roamLayer) {
    roamLayer = document.createElement("div");
    roamLayer.id = "roam";
    document.body.appendChild(roamLayer);
  }
  const target = isCompact() ? 0.3 : 0.4;
  roamers = Array.from(logo.querySelectorAll(".pawn")).map((el, i) => {
    const r = el.getBoundingClientRect();
    const c = {
      id: i, el, w: el.offsetWidth, h: el.offsetHeight,
      x: r.left + r.width / 2, y: r.bottom,            // pies del peón
      vx: i ? 150 : -150, vy: -520,                    // salto al soltarse
      s: r.width / el.offsetWidth, sTarget: target,
      rot: i ? 8 : -12, sq: 0, sqv: 0, pv: 0, heldRot: 0, dizzy: 0, dzAge: 0, shake: 0, ldx: 0, ldy: 0, lhx: 0, lhy: 0, headW: el.offsetWidth > 150 ? 100 : 70, player: false, pvx: 0, phase: rnd(0, 6), t: rnd(0, 6),
      state: "air", plat: null, timer: 0, goal: 0, speed: 0, next: null
    };
    roamLayer.appendChild(el);
    c.stars = makeStars();
    bindGrab(c);
    return c;
  });
  roamers.forEach(c => c.other = roamers[1 - c.id]);
  if (!roamMarker) {
    roamMarker = document.createElement("div");
    roamMarker.id = "pawnMarker";
    roamLayer.appendChild(roamMarker);
  }
  tipDelay = setTimeout(() => {
    if (roamers.length && !roamers.some(c => c.player))
      showTip(window.matchMedia("(pointer: coarse)").matches
        ? "Arrastra a un peón para lanzarlo"
        : "Arrastra a un peón para lanzarlo o haz clic en él para manejarlo", 6000);
  }, 2500);
  roamLast = performance.now();
  roamRAF = requestAnimationFrame(roamFrame);
}

function stopRoam() {
  clearTimeout(roamStartTimer);
  cancelAnimationFrame(roamRAF);
  clearTimeout(tipDelay); hideTip();
  keys.left = keys.right = keys.jump = false;
  if (roamMarker) roamMarker.style.display = "none";
  roamers.forEach(c => { c.stars.wrap.remove(); c.el.onpointerdown = c.el.onpointermove = c.el.onpointerup = c.el.onpointercancel = null; c.el.style.cssText = ""; logo.appendChild(c.el); });
  roamers = [];
}

/* Suelo + borde superior de cada tarjeta (se leen cada frame: las tarjetas se pueden arrastrar) */
function getPlatforms(vw, vh) {
  const list = [{ id: "floor", x1: 0, x2: vw, y: vh - 8 }];
  cardsContainer.querySelectorAll(".card").forEach((card, i) => {
    if (!card._ready) return;
    const r = card.getBoundingClientRect();
    if (r.top < 120 || r.top > vh - 80 || r.width < 100) return;
    list.push({ id: "c" + i, x1: Math.max(0, r.left + 8), x2: Math.min(vw, r.right - 8), y: r.top });
  });
  return list;
}

function crouchJump(c, vx, vy) {          // agacharse un instante y saltar
  c.state = "crouch";
  c.timer = 0.15;
  c.next = { vx, vy };
}

function decide(c, plats) {
  const roll = Math.random();
  const p = plats.find(q => q.id === c.plat);

  if (roll < 0.4 && p) {                                   // pasear por la plataforma
    const edge = Math.random() < 0.12;                     // a veces se tira por el borde
    c.goal = edge ? (Math.random() < 0.5 ? p.x1 - 30 : p.x2 + 30) : rnd(p.x1 + 10, p.x2 - 10);
    c.speed = rnd(70, 160);
    c.state = "walk";
    return;
  }
  if (roll < 0.9) {                                        // saltar a otra plataforma con arco calculado
    let best = null;
    plats.forEach(q => {
      if (q.id === c.plat || q.x2 - q.x1 < 60) return;
      const dy = q.y - c.y, up = Math.max(0, -dy);
      if (up > 230) return;
      const tx = Math.min(q.x2 - 10, Math.max(q.x1 + 10, c.x + rnd(-120, 120)));
      const vy0 = Math.sqrt(2 * GRAV * (up + 55));
      const tt = (vy0 + Math.sqrt(vy0 * vy0 + 2 * GRAV * dy)) / GRAV;
      const vx0 = (tx - c.x) / tt;
      if (Math.abs(vx0) > 560) return;
      const score = Math.abs(tx - c.x) + rnd(0, 250) - (c.other && q.id === c.other.plat ? 220 : 0);
      if (!best || score < best.score) best = { score, vx: vx0, vy: -vy0 };
    });
    if (best) return crouchJump(c, best.vx, best.vy);
  }
  crouchJump(c, rnd(-60, 60), -rnd(560, 700));             // saltito en el sitio
}

function stepRoamer(c, dt, plats, vw) {
  c.t += dt;
  if (c.dizzy > 0) c.dizzy -= dt;
  const floor = plats[0];

  if (c.state === "held") {                                // agarrado con el cursor: cuelga de la mano
    c.grab.dx *= 1 - Math.min(1, dt * 6);
    c.grab.dy += (-0.8 * c.h * c.s - c.grab.dy) * Math.min(1, dt * 6);
    const k = Math.min(1, dt * 25), ox = c.x;
    c.x += (Math.max(10, Math.min(vw - 10, c.hx - c.grab.dx)) - c.x) * k;
    c.y += (Math.max(40, Math.min(window.innerHeight, c.hy - c.grab.dy)) - c.y) * k;
    c.heldRot = Math.max(-35, Math.min(35, ((c.x - ox) / dt) * 0.035));
    c.sq = -0.1; c.sqv = 0;
    // medidor de meneo: cuenta los cambios bruscos de dirección del cursor; se va vaciando solo
    const mx = c.hx - c.lhx, my = c.hy - c.lhy;
    c.lhx = c.hx; c.lhy = c.hy;
    const dirX = Math.abs(mx) > 5 ? Math.sign(mx) : 0, dirY = Math.abs(my) > 5 ? Math.sign(my) : 0;
    if (dirX) { if (dirX !== c.ldx && c.ldx) c.shake++; c.ldx = dirX; }
    if (dirY) { if (dirY !== c.ldy && c.ldy) c.shake++; c.ldy = dirY; }
    c.shake = Math.max(0, c.shake - dt * 2.2);
    if (c.shake >= 8 && c.dizzy <= 0) { c.dizzy = 4.5; c.shake = 0; }   // ¡mareado!
  } else if (c.state === "air") {
    const prevY = c.y;
    const ad = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    if (c.player && ad && c.vx * ad < 380) c.vx += ad * 900 * dt;
    c.vy += GRAV * dt; c.x += c.vx * dt; c.y += c.vy * dt;
    if (c.x < 24)      { c.x = 24;      c.vx =  Math.abs(c.vx) * 0.5; }
    if (c.x > vw - 24) { c.x = vw - 24; c.vx = -Math.abs(c.vx) * 0.5; }
    if (c.vy > 0) {                                        // cayendo: ¿aterriza?
      let hit = plats.filter(p => prevY <= p.y + 1 && c.y >= p.y && c.x >= p.x1 - 6 && c.x <= p.x2 + 6)
                     .sort((a, b) => a.y - b.y)[0];
      if (!hit && c.y > floor.y) hit = floor;
      if (hit) {
        c.sq = Math.min(0.4, Math.max(0.1, c.vy / 2600)); c.sqv = 0;   // aplastarse al caer
        c.y = hit.y; c.plat = hit.id; c.vx = c.vy = c.pvx = 0;
        c.state = "idle"; c.timer = rnd(0.2, 0.9);
      }
    }
  } else {
    const p = plats.find(q => q.id === c.plat);
    if (!p || c.x < p.x1 - 8 || c.x > p.x2 + 8) {          // se acabó la plataforma: cae
      c.vx = c.state === "walk" ? Math.sign(c.goal - c.x) * c.speed : 0;
      c.vy = 0; c.plat = null; c.state = "air";
    } else {
      c.y = p.y;                                           // sigue a la tarjeta si la arrastran
      c.timer -= dt;
      if (c.dizzy > 0) {                                   // mareado: se queda en su sitio
        c.state = "idle"; c.timer = 0.6; c.pvx = 0;
      } else if (c.state === "crouch") {
        c.sq = 0.28; c.sqv = 0;
        if (c.timer <= 0) { c.vx = c.next.vx; c.vy = c.next.vy; c.plat = null; c.state = "air"; c.sq = -0.15; }
      } else if (c.player) {
        playerControl(c, dt);
      } else if (c.state === "walk") {
        const dir = Math.sign(c.goal - c.x);
        c.x += dir * c.speed * dt;
        c.phase += dt * c.speed * 0.075;
        if (Math.abs(c.goal - c.x) < 5) { c.state = "idle"; c.timer = rnd(0.4, 2); }
      } else if (c.timer <= 0) {
        decide(c, plats);
      }
    }
  }

  c.x = Math.max(16, Math.min(vw - 16, c.x));              // nunca fuera de la pantalla

  /* --- animación: muelle de aplastamiento, inclinación y rebote al andar --- */
  if (c.state !== "crouch" && c.state !== "held") {
    c.sqv += (-c.sq * 260 - c.sqv * 13) * dt;
    c.sq += c.sqv * dt;
  }
  const walking = c.state === "walk", air = c.state === "air";
  const dir = walking ? Math.sign(c.goal - c.x) : 0;
  const rotT = c.state === "held" ? c.heldRot : (c.dizzy > 0 && !air) ? Math.sin(c.t * 4.5) * 8 + Math.sin(c.t * 7.7) * 3 : air ? Math.max(-15, Math.min(15, c.vx * 0.025)) : walking ? dir * 6 + Math.sin(c.phase) * 4 : 0;
  c.rot += (rotT - c.rot) * Math.min(1, dt * 10);
  c.s += (c.sTarget - c.s) * Math.min(1, dt * 4);

  const bob = walking ? -Math.abs(Math.sin(c.phase)) * 5 : (c.dizzy > 0 && c.state === "idle") ? -Math.abs(Math.sin(c.t * 9)) * 1.5 : 0;
  const sq = c.sq
    + (walking ? Math.cos(c.phase * 2) * 0.05 : 0)
    + (c.state === "idle" ? Math.sin(c.t * 2.2) * 0.015 : 0)
    + (c.dizzy > 0 && c.state === "idle" ? Math.sin(c.t * 6.3) * 0.035 : 0)
    - (air ? Math.min(Math.abs(c.vy) / 3000, 0.18) : 0);
  // al agarrarlo, gira alrededor de la cabeza (los pies se balancean)
  c.pv += ((c.state === "held" ? 1 : 0) - c.pv) * Math.min(1, dt * 8);
  const sx = c.s * (1 + sq * 0.7), sy = c.s * (1 - sq);
  const d = c.pv * c.h * 0.85 * sy, rr = (c.rot * Math.PI) / 180;
  c.el.style.transform =
    `translate(${c.x - c.w / 2 - d * Math.sin(rr)}px, ${c.y - c.h + bob + d * (Math.cos(rr) - 1)}px) rotate(${c.rot}deg) scale(${sx}, ${sy})`;
  c.el.style.zIndex = c.state === "held" ? 4000 : Math.round(c.y);

  // estrellitas de dibujos animados girando sobre la cabeza
  c.dzAge = c.dizzy > 0 ? c.dzAge + dt : 0;
  const al = Math.max(0, Math.min(1, c.dzAge * 4, c.dizzy * 2));
  c.stars.wrap.style.opacity = al;
  if (al > 0) {
    const hs = c.h * sy;                                         // altura visible del peón
    const topX = c.x - d * Math.sin(rr) + hs * Math.sin(rr);
    const topY = c.y + bob + d * (Math.cos(rr) - 1) - hs * Math.cos(rr) - 8;
    const rx = c.headW * sx * 0.6 + 6, ry = rx * 0.32;
    c.stars.items.forEach((st, i) => {
      const a = c.t * 5 + (i * Math.PI * 2) / 3, depth = (Math.sin(a) + 1) / 2;
      st.style.opacity = 0.6 + 0.4 * depth;
      st.style.transform = `translate(${topX + Math.cos(a) * rx - 7}px, ${topY + Math.sin(a) * ry - 7}px) rotate(${a * 40}deg) scale(${0.65 + 0.5 * depth})`;
    });
  }
}

function roamFrame(now) {
  const dt = Math.min(0.033, (now - roamLast) / 1000);
  roamLast = now;
  const plats = getPlatforms(window.innerWidth, window.innerHeight);
  roamers.forEach(c => stepRoamer(c, dt || 0.016, plats, window.innerWidth));
  const pl = roamers.find(c => c.player);
  if (roamMarker) {
    roamMarker.style.display = pl ? "block" : "none";
    if (pl) roamMarker.style.transform =
      `translate(${pl.x - 10}px, ${pl.y - pl.h * pl.s - 34 + Math.sin(pl.t * 6) * 3}px)`;
  }
  keys.jump = false;
  roamRAF = requestAnimationFrame(roamFrame);
}


/* ===== Agarrar con el cursor / manejar con las flechas ===== */
const keys = { left: false, right: false, jump: false };

function bindGrab(c) {
  const el = c.el;
  el.onpointerdown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    el.setPointerCapture(e.pointerId);
    c.state = "held"; c.plat = null; c.vx = c.vy = 0;
    c.hx = e.clientX; c.hy = e.clientY;
    c.grab = { dx: e.clientX - c.x, dy: e.clientY - c.y };
    c.down = { x: e.clientX, y: e.clientY, moved: false };
    c.lhx = e.clientX; c.lhy = e.clientY; c.shake = 0; c.ldx = c.ldy = 0;
    c.track = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
    el.style.cursor = "grabbing";
  };
  el.onpointermove = (e) => {
    if (c.state !== "held") return;
    c.hx = e.clientX; c.hy = e.clientY;
    if (Math.hypot(e.clientX - c.down.x, e.clientY - c.down.y) > 6) c.down.moved = true;
    const now = performance.now();
    c.track.push({ x: e.clientX, y: e.clientY, t: now });
    while (c.track.length > 2 && now - c.track[0].t > 100) c.track.shift();
  };
  el.onpointerup = el.onpointercancel = () => {
    if (c.state !== "held") return;
    el.style.cursor = "";
    c.state = "air";                                        // al soltarlo cae (y sale lanzado si lo movías rápido)
    if (!c.down.moved) {
      if (!hasKeyboard()) { c.vy = -650; c.vx = rnd(-100, 100); }   // táctil: un toque = saltito
      else togglePlayer(c);                                          // ratón: un clic = manejarlo con las flechas
      return;
    }
    const a = c.track[0], b = c.track[c.track.length - 1];
    const dt = Math.max(0.016, (b.t - a.t) / 1000), cl = v => Math.max(-1400, Math.min(1400, v));
    c.vx = cl((b.x - a.x) / dt); c.vy = cl((b.y - a.y) / dt);
  };
}

function togglePlayer(c) {
  const on = !c.player;
  roamers.forEach(o => o.player = false);
  keys.left = keys.right = keys.jump = false;
  c.player = on; c.pvx = 0;
  if (on) showTip("Flechas ← → para moverte, ↑ o espacio para saltar. Esc o clic para soltarlo", 0);
  else hideTip();
}

function playerControl(c, dt) {
  const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  c.pvx += (dir * 300 - c.pvx) * Math.min(1, dt * 9);
  c.x = Math.max(24, Math.min(window.innerWidth - 24, c.x + c.pvx * dt));
  c.speed = Math.abs(c.pvx);
  c.state = c.speed > 20 ? "walk" : "idle";
  c.goal = c.x + Math.sign(c.pvx) * 100;
  c.phase += dt * c.speed * 0.075;
  if (keys.jump) { crouchJump(c, c.pvx * 0.9, -900); c.timer = 0.06; }
}

function showTip(msg, ms) {
  if (!tipEl) {
    tipEl = document.createElement("div");
    tipEl.id = "tip";
    document.body.appendChild(tipEl);
  }
  tipEl.textContent = msg;
  void tipEl.offsetWidth;
  tipEl.classList.add("show");
  clearTimeout(tipTimer);
  if (ms) tipTimer = setTimeout(hideTip, ms);
}
function hideTip() {
  clearTimeout(tipTimer);
  if (tipEl) tipEl.classList.remove("show");
}

window.addEventListener("keydown", (e) => {
  if (!roamers.some(c => c.player)) return;
  if (e.key === "ArrowLeft") keys.left = true;
  else if (e.key === "ArrowRight") keys.right = true;
  else if (e.key === "ArrowUp" || e.key === " ") { if (!e.repeat) keys.jump = true; }
  else if (e.key === "Escape") { roamers.forEach(c => c.player = false); hideTip(); return; }
  else return;
  e.preventDefault();
});
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});
window.addEventListener("blur", () => { keys.left = keys.right = false; });


/* ===== Móvil y cambios de tamaño ===== */
let layoutCompact = false, resizeTimer = 0;
function hasKeyboard() { return !window.matchMedia("(pointer: coarse)").matches; }   // táctil = sin flechas
function isCompact() { return window.innerWidth < 640 || window.innerHeight < 560; }

// Posición por el centro de la tarjeta, en píxeles reales del contenedor
function cardT(x, y, s) {
  return `translate(calc(-50% + ${x - cardsContainer.clientWidth / 2}px), calc(-50% + ${y - cardsContainer.clientHeight / 2}px)) scale(${s})`;
}

// Cuadrícula ordenada para pantallas pequeñas (tarjetas más pequeñas; pueden solaparse un poco y se arrastran)
function compactPositions(vw, vh) {
  const cards = Array.from(cardsContainer.children);
  const m = 8, top = 66, portrait = vw < 640, out = [];
  const dim = c => ({ w: c.offsetWidth, h: c.offsetHeight });
  const place = (i, x, y) => {
    const d = dim(cards[i]);
    out[i] = { x: clamp(x, d.w / 2 + m, vw - d.w / 2 - m), y: clamp(y, d.h / 2 + top, vh - d.h / 2 - m), w: d.w, h: d.h, scale: 1 };
  };
  let start = 0, y0 = top;
  if (portrait) {                                   // la tarjeta principal ocupa su propia fila
    const d = dim(cards[0]);
    place(0, vw / 2, top + d.h / 2);
    y0 = top + d.h + 10; start = 1;
  }
  const items = cards.length - start, cols = portrait ? 2 : 4, rows = Math.ceil(items / cols);
  const hAvg = cards.slice(start).reduce((s, c) => s + c.offsetHeight, 0) / Math.max(items, 1);
  const yMin = y0 + hAvg / 2, yMax = vh - m - hAvg / 2;
  const gap = rows > 1 ? Math.max(40, (yMax - yMin) / (rows - 1)) : 0;
  for (let k = 0; k < items; k++) {
    const r = Math.floor(k / cols), c = k % cols;
    place(start + k, ((c + 0.5) / cols) * vw, yMin + r * gap + (c % 2 ? 8 : -8));
  }
  return out;
}

// Al girar el móvil o cambiar el tamaño de la ventana: tarjetas dentro de la pantalla y peones al tamaño correcto
function refitCards() {
  const vw = window.innerWidth, vh = window.innerHeight, compact = isCompact();
  roamers.forEach(c => c.sTarget = compact ? 0.3 : 0.4);
  if (!activated) return;
  const cards = Array.from(cardsContainer.children);
  if (compact !== layoutCompact) {                  // cambió de tipo de pantalla: recolocar todo
    layoutCompact = compact;
    computePositions().forEach((p, i) => { cards[i]._x = p.x; cards[i]._y = p.y; cards[i]._scale = p.scale; });
  } else {
    const m = compact ? 8 : 24, top = compact ? 66 : 76;
    cards.forEach(card => {
      const w = card.offsetWidth * card._scale, h = card.offsetHeight * card._scale;
      card._x = clamp(card._x, w / 2 + m, vw - w / 2 - m);
      card._y = clamp(card._y, h / 2 + top, vh - h / 2 - m);
    });
  }
  cards.forEach(card => {
    if (card._x === undefined) return;
    card.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease";
    card.style.transform = cardT(card._x, card._y, card._scale);
  });
}
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refitCards, 150);
});

/* ===== Arranque (al final, cuando todo está definido) ===== */
updateModeUI(true);


/* Estrellitas del mareo (una tanda por peón) */
function makeStars() {
  const wrap = document.createElement("div");
  wrap.className = "dz-wrap";
  const items = [0, 1, 2].map(() => {
    const s = document.createElement("div");
    s.className = "dz-star";
    wrap.appendChild(s);
    return s;
  });
  roamLayer.appendChild(wrap);
  return { wrap, items };
}
