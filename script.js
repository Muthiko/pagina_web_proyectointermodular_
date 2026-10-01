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
      <h3>${data.title}</h3>
      <p>${data.text}</p>
    `;
    card.dataset.index = i;
    cardsContainer.appendChild(card);
  });
}

/* ===== Non-overlapping positions – full screen, never leave bounds ===== */
function computePositions() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const edge = 24; // hard margin from screen edges

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
    const y = clamp(vh * 0.18, h / 2 + edge, vh - h / 2 - edge);
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
      y = clamp(y, h / 2 + edge, vh - h / 2 - edge);

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
      y = clamp(y, h / 2 + edge, vh - h / 2 - edge);
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

  // Change background (day or night)
  bg.classList.remove("bg-black", "bg-aero", "bg-night");
  bg.classList.add(isNight ? "bg-night" : "bg-aero");

  // Hide hint
  hint.classList.add("hide");

  // Spawn bubbles
  spawnBubbles();

  // Position & animate cards outward
  const positions = computePositions();
  const cards = Array.from(cardsContainer.children);
  const edgePad = 28; // minimum distance from screen edge after bounce

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
      card.style.transform = `translate(calc(${pos.x}px - 50vw), calc(${pos.y}px - 50vh)) scale(${pos.scale})`;
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
  if (y - halfH < edgePad) {
    y = halfH + edgePad + 6;
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
  card.style.transform = `translate(calc(${overshootX}px - 50vw), calc(${overshootY}px - 50vh)) scale(${pos.scale})`;

  setTimeout(() => {
    card.style.transition = "transform 0.35s cubic-bezier(0.22, 1.2, 0.36, 1)";
    card.style.transform = `translate(calc(${x}px - 50vw), calc(${y}px - 50vh)) scale(${pos.scale})`;
    pos.x = x;
    pos.y = y;
    card._x = x;
    card._y = y;
  }, 220);
}

/* ===== Drag cards ===== */
let dragZ = 100;

function enableDrag(card) {
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
      `translate(calc(${nx}px - 50vw), calc(${ny}px - 50vh)) scale(${card._scale})`;
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
  isNight = !isNight;
  document.body.classList.toggle("night-mode", isNight);
  cardsData = isNight ? nightData : aeroData;

  // Reset interaction state
  activated = false;
  logo.classList.remove("scattered", "bounce");
  hint.classList.remove("hide");
  hint.textContent = "Haz clic en los peones";

  // Clear bubbles
  bubblesEl.innerHTML = "";

  // Reset background to black until user clicks again
  bg.classList.remove("bg-aero", "bg-night");
  bg.classList.add("bg-black");

  // Rebuild cards with new content
  createCards();
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
