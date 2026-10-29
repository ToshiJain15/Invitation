/**
 * THE ROYAL WEDDING OF VIPUL & TOSHI — INTERACTIVE FAIRYTALE EXPERIENCE
 * Features:
 *  - 3D Realistic Velvet & Gold Envelope with Wax Seal
 *  - Interactive Gold Foil Scratch Card with Sparkle Particle Physics
 *  - Web Audio API Sound Synthesizer (Zero-latency sound effects)
 *  - Parallax 3D Card Tilt & Holographic Sheen
 *  - Dynamic Countdown & Google/Apple Calendar Integration
 *  - Interactive Royal Shubhkaamnayein (Blessings Wall)
 *  - Personalized Shahi Entry Pass Generator Modal
 */

// ==========================================
// 1. ROYAL AUDIO ENGINE (Sound Effects Disabled as per User Request)
// Only Authentic Shehnai Background Music is enabled
// ==========================================
class RoyalAudioEngine {
    constructor() {}
    init() {}
    // All synthetic sound effects removed as per user request: only Shehnai music plays
    playSealBreak() {}
    playSparkleChime() {}
    playFanfare() {}
}

const royalAudio = new RoyalAudioEngine();

// ==========================================
// 2. LOADER & INITIALIZATION
// ==========================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) { loader.style.display = 'none'; loader.style.pointerEvents = 'none'; }
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
            }, 700);
        }, 400);
    }

    // Initialize all modules
    initScratchCard();
    initCountdown();
    initPetals();
    initCard3DTilt();
    initSparkleEffect();
});

// ==========================================
// 3. 3D ROYAL ENVELOPE OPENING CHOREOGRAPHY
// ==========================================
let isEnvelopeOpened = false;

function openInvitation() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    if (typeof royalAudio !== 'undefined' && royalAudio.playSealBreak) {
        royalAudio.playSealBreak();
    }

    const stage = document.getElementById('envelope-stage');
    const seal = document.getElementById('royal-wax-seal');

    // 1. Break wax seal with crack & golden sparkle blast (0ms - 350ms)
    if (seal) {
        seal.classList.add('breaking');
    }

    // 2. Unfold top triangular flap upwards in 3D perspective (starts at 350ms, finishes at 1250ms)
    setTimeout(() => {
        if (stage) {
            stage.classList.add('flapped');
        }
    }, 350);

    // 3. Invitation card physically slides UPWARDS out of the envelope pocket (starts at 1300ms, finishes at 2300ms)
    setTimeout(() => {
        if (stage) {
            stage.classList.add('card-emerging');
        }
    }, 1300);

    // 4. Smoothly fade envelope stage and reveal the royal Shree Ganesh card (starts at 2550ms)
    setTimeout(() => {
        if (stage) {
            stage.classList.add('opened');
        }
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        // Start background music
        playBackgroundMusic();
        setTimeout(updateCarPosition, 400);
        setTimeout(initHeartScratchCards, 450);
    }, 2550);

    // 5. Cleanly hide envelope stage after fade completion
    setTimeout(() => {
        if (stage) {
            stage.style.display = 'none';
        }
    }, 3450);
}

function reopenEnvelope() {
    const stage = document.getElementById('envelope-stage');
    const seal = document.getElementById('royal-wax-seal');
    if (!stage) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        isEnvelopeOpened = false;
        stage.style.display = 'flex';
        stage.classList.remove('opened', 'card-emerging', 'flapped');
        if (seal) {
            seal.classList.remove('breaking');
        }
    }, 400);
}

// Background Music Toggle
let isMusicPlaying = false;
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const dockBtn = document.getElementById('music-dock-btn');
    const icon = document.getElementById('music-icon');
    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            isMusicPlaying = true;
            if (dockBtn) dockBtn.classList.add('active');
            if (icon) {
                icon.classList.remove('fa-music', 'fa-volume-mute');
                icon.classList.add('fa-volume-up');
            }
        }).catch(err => {
            console.log('Audio autoplay prevented:', err);
        });
    } else {
        music.pause();
        isMusicPlaying = false;
        if (dockBtn) dockBtn.classList.remove('active');
        if (icon) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        }
    }
}

function playBackgroundMusic() {
    const music = document.getElementById('bg-music');
    const dockBtn = document.getElementById('music-dock-btn');
    const icon = document.getElementById('music-icon');
    if (!music) return;

    music.play().then(() => {
        isMusicPlaying = true;
        if (dockBtn) dockBtn.classList.add('active');
        if (icon) {
            icon.classList.remove('fa-music', 'fa-volume-mute');
            icon.classList.add('fa-volume-up');
        }
    }).catch(() => {
        // Autoplay may need user gesture
    });
}

// ==========================================================================
// 4. INTERACTIVE 3-HEART SCRATCH CARD (21 • 12 • 26) & BOOM OF FLOWERS
// ==============================================================================
let heartCanvases = [];
let heartStates = [false, false, false]; // revealed status of hearts 0, 1, 2
let isScratchingHeart = false;
let currentScratchingIdx = -1;

function initHeartScratchCards() {
    heartCanvases = [];
    heartStates = [false, false, false];

    for (let i = 0; i < 3; i++) {
        const canvas = document.getElementById(`heart-canvas-${i}`);
        if (!canvas) continue;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        heartCanvases[i] = { canvas, ctx, checked: 0 };

        setupHeartCanvas(i);
    }
}

function setupHeartCanvas(idx) {
    const item = heartCanvases[idx];
    if (!item) return;
    const { canvas, ctx } = item;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);
    drawHeartFoil(idx);

    // Scratch interaction listeners
    canvas.onmousedown = (e) => startScratchHeart(idx, e);
    canvas.ontouchstart = (e) => startScratchHeartTouch(idx, e);
    canvas.ondblclick = () => revealHeart(idx);
}

function drawHeartFoil(idx) {
    const item = heartCanvases[idx];
    if (!item) return;
    const { canvas, ctx } = item;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#916315');
    grad.addColorStop(0.2, '#fae78b');
    grad.addColorStop(0.45, '#c59e32');
    grad.addColorStop(0.7, '#fae78b');
    grad.addColorStop(0.85, '#a57a1d');
    grad.addColorStop(1, '#664205');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Gold foil dust flecks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 280; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
    ctx.fillStyle = 'rgba(70, 35, 5, 0.25)';
    for (let i = 0; i < 180; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.2, 1.2);
    }

    // Heart decorative border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Embossed prompt
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#5c0911';
    ctx.font = 'bold 12px Cinzel, serif';
    ctx.fillText('SCRATCH', w / 2, h / 2 - 6);
    ctx.font = '15px serif';
    ctx.fillText('✨', w / 2, h / 2 + 14);
}

function getHeartPos(canvas, clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function startScratchHeart(idx, e) {
    if (heartStates[idx]) return;
    isScratchingHeart = true;
    currentScratchingIdx = idx;
    const pos = getHeartPos(heartCanvases[idx].canvas, e.clientX, e.clientY);
    scratchHeartAt(idx, pos.x, pos.y);

    window.addEventListener('mousemove', onHeartMouseMove);
    window.addEventListener('mouseup', onHeartMouseUp);
}

function onHeartMouseMove(e) {
    if (!isScratchingHeart || currentScratchingIdx === -1) return;
    const idx = currentScratchingIdx;
    const item = heartCanvases[idx];
    if (!item) return;
    const pos = getHeartPos(item.canvas, e.clientX, e.clientY);
    scratchHeartAt(idx, pos.x, pos.y);
}

function onHeartMouseUp() {
    isScratchingHeart = false;
    currentScratchingIdx = -1;
    window.removeEventListener('mousemove', onHeartMouseMove);
    window.removeEventListener('mouseup', onHeartMouseUp);
}

function startScratchHeartTouch(idx, e) {
    if (heartStates[idx] || e.touches.length === 0) return;
    e.preventDefault();
    isScratchingHeart = true;
    currentScratchingIdx = idx;
    const touch = e.touches[0];
    const pos = getHeartPos(heartCanvases[idx].canvas, touch.clientX, touch.clientY);
    scratchHeartAt(idx, pos.x, pos.y);

    window.addEventListener('touchmove', onHeartTouchMove, { passive: false });
    window.addEventListener('touchend', onHeartTouchEnd);
}

function onHeartTouchMove(e) {
    if (!isScratchingHeart || currentScratchingIdx === -1 || e.touches.length === 0) return;
    e.preventDefault();
    const idx = currentScratchingIdx;
    const item = heartCanvases[idx];
    if (!item) return;
    const touch = e.touches[0];
    const pos = getHeartPos(item.canvas, touch.clientX, touch.clientY);
    scratchHeartAt(idx, pos.x, pos.y);
}

function onHeartTouchEnd() {
    isScratchingHeart = false;
    currentScratchingIdx = -1;
    window.removeEventListener('touchmove', onHeartTouchMove);
    window.removeEventListener('touchend', onHeartTouchEnd);
}

function scratchHeartAt(idx, x, y) {
    const item = heartCanvases[idx];
    if (!item || heartStates[idx]) return;
    const { canvas, ctx } = item;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    item.checked++;
    if (item.checked % 7 === 0) {
        checkHeartCompletion(idx);
    }
}

function checkHeartCompletion(idx) {
    const item = heartCanvases[idx];
    if (!item || heartStates[idx]) return;
    const { canvas, ctx } = item;
    const w = canvas.width;
    const h = canvas.height;

    try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        let cleared = 0;
        const total = data.length / 4;

        for (let i = 3; i < data.length; i += 32) {
            if (data[i] === 0) cleared++;
        }

        const ratio = cleared / (total / 8);
        if (ratio > 0.35) {
            revealHeart(idx);
        }
    } catch (e) {
        // Fallback for security contexts
    }
}

function revealHeart(idx) {
    if (heartStates[idx]) return;
    heartStates[idx] = true;

    const pod = document.getElementById(`heart-pod-${idx}`);
    const canvas = document.getElementById(`heart-canvas-${idx}`);
    if (pod) pod.classList.add('revealed');
    if (canvas) canvas.classList.add('fade-out');

    // Trigger mini floral puff
    triggerFlowerBoom(pod, 45);

    // Check if all 3 hearts are revealed
    if (heartStates[0] && heartStates[1] && heartStates[2]) {
        completeAllHearts();
    }
}

function completeAllHearts() {
    const ann = document.getElementById('scratchAnnouncement');
    if (ann) ann.classList.add('illuminated');

    if (typeof royalAudio !== 'undefined' && royalAudio.playFanfare) {
        royalAudio.playFanfare();
    }

    // Trigger GRAND BOOM OF FLOWERS
    const cardWrap = document.querySelector('.scratch-card-wrapper');
    setTimeout(() => {
        triggerFlowerBoom(cardWrap, 160);
    }, 200);
}

function revealAllHearts() {
    for (let i = 0; i < 3; i++) {
        const pod = document.getElementById(`heart-pod-${i}`);
        const canvas = document.getElementById(`heart-canvas-${i}`);
        heartStates[i] = true;
        if (pod) pod.classList.add('revealed');
        if (canvas) canvas.classList.add('fade-out');
    }
    completeAllHearts();
}

function resetAllHearts() {
    heartStates = [false, false, false];
    const ann = document.getElementById('scratchAnnouncement');
    if (ann) ann.classList.remove('illuminated');

    for (let i = 0; i < 3; i++) {
        const pod = document.getElementById(`heart-pod-${i}`);
        const canvas = document.getElementById(`heart-canvas-${i}`);
        if (pod) pod.classList.remove('revealed');
        if (canvas) {
            canvas.classList.remove('fade-out');
            drawHeartFoil(i);
        }
    }
}

// ==============================================================================
// 4B. SPECTACULAR BOOM OF FLOWERS SIMULATION ENGINE
// ==============================================================================
let activeFlowerBoomAnimation = null;

function triggerFlowerBoom(sourceElement, count = 140) {
    const canvas = document.getElementById('flower-boom-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const sec = document.getElementById('scratch-card');
    const secRect = sec ? sec.getBoundingClientRect() : { width: window.innerWidth, height: 600 };

    const dpr = window.devicePixelRatio || 1;
    canvas.width = secRect.width * dpr;
    canvas.height = secRect.height * dpr;
    canvas.style.width = `${secRect.width}px`;
    canvas.style.height = `${secRect.height}px`;
    ctx.scale(dpr, dpr);

    let originX = secRect.width / 2;
    let originY = secRect.height / 2;
    if (sourceElement && sec) {
        const sRect = sourceElement.getBoundingClientRect();
        originX = (sRect.left + sRect.width / 2) - sec.getBoundingClientRect().left;
        originY = (sRect.top + sRect.height / 2) - sec.getBoundingClientRect().top;
    }

    const palettes = [
        { type: 'rose', outer: '#b21e35', inner: '#5c0911', lip: '#e63946' },      // Royal Velvet Rose
        { type: 'lotus', outer: '#ff758f', inner: '#ffb3c1', lip: '#fff0f3' },     // Sacred Pink Lotus
        { type: 'marigold', outer: '#f77f00', inner: '#fcbf49', lip: '#eae2b7' },  // Saffron Genda Phool
        { type: 'jasmine', outer: '#fdf0d5', inner: '#ffffff', lip: '#fff9ec' },   // White Mogra / Jasmine
        { type: 'gold', outer: '#fae78b', inner: '#c99e32', lip: '#ffffff' }       // Shimmer Gold Flakes
    ];

    const petals = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 6 + Math.random() * 18;
        const pal = palettes[Math.floor(Math.random() * palettes.length)];

        petals.push({
            x: originX + (Math.random() - 0.5) * 30,
            y: originY + (Math.random() - 0.5) * 30,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (3.5 + Math.random() * 4.5),
            gravity: 0.16 + Math.random() * 0.08,
            friction: 0.958,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.16,
            tilt: Math.random() * Math.PI,
            tiltSpeed: 0.05 + Math.random() * 0.08,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.05 + Math.random() * 0.06,
            width: 14 + Math.random() * 16,
            height: 18 + Math.random() * 20,
            palette: pal,
            opacity: 1,
            life: 0,
            maxLife: 150 + Math.random() * 60
        });
    }

    if (activeFlowerBoomAnimation) {
        cancelAnimationFrame(activeFlowerBoomAnimation);
    }

    function drawSinglePetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        const scaleY = Math.cos(p.tilt);
        ctx.scale(1, scaleY);
        ctx.globalAlpha = Math.max(0, p.opacity);

        const w = p.width;
        const h = p.height;

        // Elegant curved organic flower petal
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        ctx.bezierCurveTo(-w * 0.55, h * 0.15, -w * 0.45, -h * 0.45, 0, -h * 0.5);
        ctx.bezierCurveTo(w * 0.45, -h * 0.45, w * 0.55, h * 0.15, 0, h * 0.5);
        ctx.closePath();

        const grad = ctx.createRadialGradient(0, -h * 0.1, 2, 0, 0, h * 0.6);
        grad.addColorStop(0, p.palette.inner);
        grad.addColorStop(0.7, p.palette.outer);
        grad.addColorStop(1, p.palette.lip);

        ctx.fillStyle = grad;
        ctx.fill();

        // Central vein
        ctx.beginPath();
        ctx.moveTo(0, h * 0.35);
        ctx.lineTo(0, -h * 0.28);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }

    function renderLoop() {
        ctx.clearRect(0, 0, secRect.width, secRect.height);
        let alive = 0;

        for (let i = 0; i < petals.length; i++) {
            const p = petals[i];
            p.life++;

            p.vx *= p.friction;
            p.vy *= p.friction;
            p.vy += p.gravity;

            p.wobble += p.wobbleSpeed;
            p.x += p.vx + Math.sin(p.wobble) * 1.2;
            p.y += p.vy;

            p.rotation += p.rotationSpeed;
            p.tilt += p.tiltSpeed;

            if (p.life > p.maxLife * 0.65) {
                p.opacity = 1 - (p.life - p.maxLife * 0.65) / (p.maxLife * 0.35);
            }

            if (p.opacity > 0 && p.y < secRect.height + 60) {
                drawSinglePetal(p);
                alive++;
            }
        }

        if (alive > 0) {
            activeFlowerBoomAnimation = requestAnimationFrame(renderLoop);
        } else {
            ctx.clearRect(0, 0, secRect.width, secRect.height);
            activeFlowerBoomAnimation = null;
        }
    }

    renderLoop();
}

// Backward-compatibility aliases
function initScratchCard() { initHeartScratchCards(); }
function revealScratchCard() { revealAllHearts(); }
function resetScratchCard() { resetAllHearts(); }

// 5. PARALLAX 3D CARD TILT ON DESKTOP
// ==========================================
function initCard3DTilt() {
    // Disabled: 3D perspective rotation on the full page container (#main-card) causes
    // the card to tilt off-screen and disappear, and makes the screen wobble along with the cursor.
}

// ==========================================
// 6. ENCHANTED COUNTDOWN TIMER
// ==========================================
function initCountdown() {
    // Royal Celebrations begin: 20th December 2026, 10:00:00 IST (Haldi & Carnival)
    const weddingDate = new Date('December 20, 2026 10:00:00 GMT+0530').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            const timerContainer = document.getElementById('timer');
            if (timerContainer) {
                timerContainer.innerHTML = '<h3 style="color:var(--gold-bright); font-size:1.8rem; font-family:\'Cinzel Decorative\', cursive;">The Royal Wedding Celebrations Have Begun!</h3>';
            }
        }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
}

// ==========================================
// 7. CALENDAR INTEGRATION (GOOGLE & ICAL)
// ==========================================
const weddingEvents = {
    haldi: {
        title: "Toshi & Vipul Sa — Haldi & Carnival",
        start: "20261220T100000",
        end: "20261220T133000",
        location: "Sher Garh Rawla, Near DPS Circle, Jodhpur, Rajasthan",
        description: "Colors of love, laughter and new beginnings! Haldi & Carnival celebrations."
    },
    mayra: {
        title: "Toshi & Vipul Sa — Mayra & Battisi",
        start: "20261220T140000",
        end: "20261220T170000",
        location: "Sher Garh Rawla, Near DPS Circle, Jodhpur, Rajasthan",
        description: "A beautiful tradition celebrating love, family & blessings! Mayra & Battisi."
    },
    sangeet: {
        title: "Toshi & Vipul Sa — Sangeet Sandhya",
        start: "20261220T180000",
        end: "20261220T233000",
        location: "Sher Garh Rawla, Near DPS Circle, Jodhpur, Rajasthan",
        description: "An evening of music, dance and endless celebrations with Toshi & Vipul Sa!"
    },
    wedding: {
        title: "Toshi with Vipul Sa — The Auspicious Wedding Ceremony",
        start: "20261221T103000",
        end: "20261221T153000",
        location: "Sher Garh Rawla, Near DPS Circle, Jodhpur, Rajasthan",
        description: "Two souls, one forever. Sacred Wedding Ceremony of Toshi and Vipul Sa."
    },
    reception: {
        title: "Toshi & Vipul Sa — Grand Wedding Reception",
        start: "20261221T180000",
        end: "20261221T235900",
        location: "Sher Garh Rawla, Near DPS Circle, Jodhpur, Rajasthan",
        description: "The Grand Finale — An evening to cherish new beginnings together!"
    }
};

function addEventToGoogleCalendar(eventKey) {
    const ev = weddingEvents[eventKey] || weddingEvents.wedding;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${ev.start}/${ev.end}&details=${encodeURIComponent(ev.description)}&location=${encodeURIComponent(ev.location)}`;
    window.open(url, '_blank');
}

function downloadICalFile(eventKey) {
    const ev = weddingEvents[eventKey] || weddingEvents.wedding;
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vipul and Toshi Royal Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${ev.title}
DTSTART:${ev.start}
DTEND:${ev.end}
LOCATION:${ev.location}
DESCRIPTION:${ev.description}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${eventKey}_invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================================
// 8. INTERACTIVE BLESSINGS & ROYAL PASS
// ==========================================
function selectBlessingPill(pill, text) {
    document.querySelectorAll('.blessing-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const input = document.getElementById('guest-blessing-text');
    if (input) {
        input.value = text;
    }
}

function submitRoyalBlessing(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('guest-name-input');
    const blessingInput = document.getElementById('guest-blessing-text');

    const name = (nameInput && nameInput.value.trim()) || "Honoured Well-Wisher";
    const text = (blessingInput && blessingInput.value.trim()) || "May your bond be forever blessed with divine joy and prosperity!";

    // Add to stream
    const stream = document.getElementById('sent-blessings-stream');
    if (stream) {
        const card = document.createElement('div');
        card.className = 'sent-blessing-card';
        card.innerHTML = `
            <div class="sent-blessing-author">${escapeHtml(name)}</div>
            <div class="sent-blessing-text">"${escapeHtml(text)}"</div>
        `;
        stream.prepend(card);
    }

    // Trigger golden heart burst
    triggerHeartBurst();
    royalAudio.playFanfare();

    alert(`Thank you, ${name}! Your royal blessing has been lovingly recorded for Vipul & Toshi.`);
    if (blessingInput) blessingInput.value = '';
}

function openRoyalPassModal(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('guest-name-input');
    const guestCount = document.getElementById('guest-count-select');

    const name = (nameInput && nameInput.value.trim()) || "Honoured Royal Guest";
    const count = (guestCount && guestCount.value) || "2 Guests";

    const modal = document.getElementById('royal-pass-modal');
    const passName = document.getElementById('pass-guest-name');
    const passMeta = document.getElementById('pass-guest-meta');

    if (passName) passName.innerText = name;
    if (passMeta) passMeta.innerText = `Reserved Entry: ${count} • Sherghar Rawla, Jodhpur`;

    if (modal) {
        modal.classList.add('active');
        royalAudio.playFanfare();
        triggerRoyalConfetti();
    }
}

function closeRoyalPassModal() {
    const modal = document.getElementById('royal-pass-modal');
    if (modal) modal.classList.remove('active');
}

function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
}

// ==========================================
// 9. FAIRYTALE PETALS & STARDUST ENGINE
// ==========================================
function initPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    const types = ['rose', 'pink', 'jasmine', 'gold-spark'];

    setInterval(() => {
        if (document.hidden) return;
        const petal = document.createElement('div');
        const type = types[Math.floor(Math.random() * types.length)];
        petal.className = `petal ${type}`;

        petal.style.left = Math.random() * 98 + 'vw';
        petal.style.animationDuration = Math.random() * 4 + 6 + 's';
        petal.style.opacity = Math.random() * 0.4 + 0.6;

        container.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 10000);
    }, 700);
}

// Gold Text Sparkles
function initSparkleEffect() {
    setInterval(() => {
        if (document.hidden) return;
        const titles = document.querySelectorAll('.main-title, .section-title, .venue-info h3');
        if (!titles.length) return;

        const target = titles[Math.floor(Math.random() * titles.length)];
        const rect = target.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.top = Math.random() * rect.height + 'px';
        sparkle.style.left = Math.random() * rect.width + 'px';

        target.style.position = 'relative';
        target.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 900);
    }, 380);
}

// Pure JS Celebratory Confetti & Fireworks Shower
function triggerRoyalConfetti() {
    const canvas = document.getElementById('confetti-canvas') || createConfettiCanvas();
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#d4af37', '#fae78b', '#ffffff', '#8a1322', '#1b4d3e', '#e7525b'];

    for (let i = 0; i < 110; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height * 0.4,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.8) * 16,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            life: 100,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = 0;

        particles.forEach(p => {
            if (p.life > 0) {
                active++;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35; // gravity
                p.vx *= 0.98;
                p.rotation += p.rotationSpeed;
                p.life--;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.life / 100);

                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        });

        if (active > 0) {
            requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    render();
}

function createConfettiCanvas() {
    let c = document.getElementById('confetti-canvas');
    if (!c) {
        c = document.createElement('canvas');
        c.id = 'confetti-canvas';
        document.body.appendChild(c);
    }
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    return c;
}

function triggerHeartBurst() {
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.bottom = '30%';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100000';
        heart.style.transition = 'all 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        document.body.appendChild(heart);

        const targetX = (Math.random() - 0.5) * 350;
        const targetY = -(Math.random() * 300 + 150);

        setTimeout(() => {
            heart.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.4)`;
            heart.style.opacity = '0';
        }, 20);

        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
}

// ==========================================
// 10. ANIMATED VERTICAL WEDDING CAR ITINERARY CONTROLLER
// ==========================================
let currentCarStop = 0;
let autoTourTimer = null;

function updateCarPosition() {
    const car = document.getElementById('weddingConvoyCar');
    const wrapper = document.getElementById('itineraryTimelineWrapper');
    const targetNode = document.getElementById(`timeline-node-${currentCarStop}`);
    if (!car || !wrapper || !targetNode) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const marker = targetNode.querySelector('.marker-dot') || targetNode;
    const markerRect = marker.getBoundingClientRect();

    const targetY = (markerRect.top + markerRect.height / 2) - wrapperRect.top;
    car.style.top = `${targetY}px`;
}

function driveCarToStop(stopIdx, smoothScroll = false) {
    if (stopIdx < 0 || stopIdx >= 5) return;
    currentCarStop = stopIdx;

    const car = document.getElementById('weddingConvoyCar');
    const targetNode = document.getElementById(`timeline-node-${currentCarStop}`);

    if (car) {
        car.classList.remove('parked');
        car.classList.add('driving');
        updateCarPosition();

        if (typeof royalAudio !== 'undefined' && royalAudio.playSparkleChime) {
            royalAudio.playSparkleChime();
        }

        setTimeout(() => {
            car.classList.remove('driving');
            car.classList.add('parked');
            setTimeout(() => car.classList.remove('parked'), 600);
        }, 1150);
    }

    // Toggle active class on all 5 timeline nodes
    for (let i = 0; i < 5; i++) {
        const node = document.getElementById(`timeline-node-${i}`);
        if (node) {
            node.classList.toggle('active', i === currentCarStop);
        }
    }

    if (smoothScroll && targetNode) {
        targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function driveCarNext() {
    driveCarToStop((currentCarStop + 1) % 5, true);
}

function driveCarPrev() {
    driveCarToStop((currentCarStop + 4) % 5, true);
}

function toggleAutoTour() {
    const btn = document.getElementById('btnTourMode');
    const icon = document.getElementById('tourIcon');
    const text = document.getElementById('tourText');

    if (autoTourTimer) {
        clearInterval(autoTourTimer);
        autoTourTimer = null;
        if (icon) icon.className = 'fas fa-play';
        if (text) text.innerText = 'Play Journey';
        if (btn) btn.classList.remove('playing');
    } else {
        if (icon) icon.className = 'fas fa-pause';
        if (text) text.innerText = 'Pause Tour';
        if (btn) btn.classList.add('playing');
        driveCarNext();
        autoTourTimer = setInterval(() => {
            driveCarNext();
        }, 4200);
    }
}

// Recalculate car position on window resize
window.addEventListener('resize', () => {
    updateCarPosition();
});

// Initial positioning on load
window.addEventListener('load', () => {
    setTimeout(updateCarPosition, 800);
});


// Ensure car is correctly placed whenever itinerary becomes visible
if ('IntersectionObserver' in window) {
    const itineraryObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCarPosition();
            }
        });
    }, { threshold: 0.1 });
    window.addEventListener('DOMContentLoaded', () => {
        const wrap = document.getElementById('itineraryTimelineWrapper');
        if (wrap) itineraryObs.observe(wrap);
    });
}
