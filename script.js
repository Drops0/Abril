/* ═══════════════════════════════════════════════
   DROPS — Configuración
   Editá esta sección con tu información real
   ═══════════════════════════════════════════════ */
const CONFIG = {

  // Tu usuario de Telegram (sin @)
  telegram: 'abrilsuarezz',

  // Tu link de pago de Mercado Pago
  mp_link: 'https://link.mercadopago.com.ar/kkmm',

  // Tu link de PayPal
  paypal_link: 'https://www.paypal.me/Drops05',

  // Tus packs
  packs: [
    {
      id: 'premium',
      icon: '✦',
      nombre: 'Pack Premium',
      descripcion: 'Fotos exclusivas sin filtros',
      contenido: '12 fotos por pack',
      disponibles: 3,
      precio_ars: '$12.000 ARS',
      precio_usd: '$9 USD',
      preview: 'img/preview_premium.jpg',
      paypal_usd: 9,
    },
    {
      id: 'comun',
      icon: '◎',
      nombre: 'Pack Común',
      descripcion: 'Poses sensuales con ropa',
      contenido: 'Múltiples fotos por pack',
      disponibles: 2,
      precio_ars: '$6.000 ARS',
      precio_usd: '$5 USD',
      preview: 'img/preview_comun.jpg',
      paypal_usd: 5,
    },
    {
      id: 'videos',
      icon: '▷',
      nombre: 'Videos',
      descripcion: 'Contenido exclusivo en video',
      contenido: '1 video por pack',
      disponibles: 4,
      precio_ars: '$12.000 ARS',
      precio_usd: '$9 USD',
      preview: 'img/preview_videos.jpg',
      paypal_usd: 9,
    },
    {
      id: 'pies',
      icon: '◇',
      nombre: 'Pack Pies',
      descripcion: 'Fotografía artística',
      contenido: '10 fotos por pack',
      disponibles: 3,
      precio_ars: '$4.000 ARS',
      precio_usd: '$3 USD',
      preview: 'img/preview_pies.jpg',
      paypal_usd: 3,
    },
    {
      id: 'bikini',
      icon: '🩱',
      nombre: 'Pack Bikini',
      descripcion: 'Fotos exclusivas en bikini y ropa interior',
      contenido: 'Fotos en bikini y lencería',
      disponibles: 3,
      precio_ars: '$8.000 ARS',
      precio_usd: '$6 USD',
      preview: 'img/preview_bikini.jpg',
      paypal_usd: 6,
    },
    {
      id: 'sexting',
      icon: '💬',
      nombre: 'Sexting',
      descripcion: 'Charla hot por video de 10 minutos',
      contenido: '1 videollamada de 10 min',
      disponibles: 3,
      precio_ars: '$2.000 ARS',
      precio_usd: '$2 USD',
      preview: 'img/preview_sexting.jpg',
      paypal_usd: 2,
    },
    {
      id: 'audios',
      icon: '🎧',
      nombre: 'Audios Hot',
      descripcion: 'Audios personalizados diciendo lo que quieras',
      contenido: '2 minutos de audios custom',
      disponibles: 3,
      precio_ars: '$3.500 ARS',
      precio_usd: '$3 USD',
      preview: 'img/preview_audios.jpg',
      paypal_usd: 3,
    },
    {
      id: 'novia',
      icon: '💕',
      nombre: 'Novia Virtual',
      descripcion: 'Un mes de atención personalizada + todo el contenido',
      contenido: 'Todo incluido por 1 mes',
      disponibles: 2,
      precio_ars: '$450.000 ARS',
      precio_usd: '$300 USD',
      preview: 'img/preview_novia.jpg',
      paypal_usd: 300,
    },
  ],
};

/* ═══════════════════════════════════════════════
   Testimonios
   ═══════════════════════════════════════════════ */
const TESTIMONIOS = [
  { nombre: 'Mati R.', texto: 'Super rápido, me llegó el contenido al toque por Telegram. Todo tal cual lo que prometían.', stars: 5 },
  { nombre: 'Lucas F.', texto: 'Compré el pack premium y vale cada centavo. Las fotos son increíbles y me llegó todo rapidísimo.', stars: 5 },
  { nombre: 'Franco P.', texto: 'Al principio dudé pero pagué por MP y en 10 minutos ya tenía el link. Recomendado.', stars: 5 },
  { nombre: 'Axel M.', texto: 'Buen contenido, buena onda. Pagué con PayPal desde USA y todo perfecto.', stars: 5 },
];

/* ═══════════════════════════════════════════════
   Lógica — No hace falta editar esto
   ═══════════════════════════════════════════════ */

// ── Estado actual
let currentPack = null;

// ── Helpers
const $ = id => document.getElementById(id);
const tgUrl = (msg) => `https://t.me/${CONFIG.telegram}?text=${encodeURIComponent(msg)}`;

// ── Age Gate
$('btn-enter').addEventListener('click', () => {
  const gate = $('age-gate');
  gate.classList.add('fade-out');
  setTimeout(() => {
    gate.classList.add('hidden');
    $('site').classList.remove('hidden');
  }, 500);
  sessionStorage.setItem('drops_age_ok', '1');
});

if (sessionStorage.getItem('drops_age_ok')) {
  $('age-gate').classList.add('hidden');
  $('site').classList.remove('hidden');
}

// ── Header Telegram
$('header-tg').href = `https://t.me/${CONFIG.telegram}`;

// ── Scroll header shadow
window.addEventListener('scroll', () => {
  $('header').style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(0,0,0,.5)'
    : 'none';
});

// ── Generar cards de packs
const grid = $('packs-grid');
CONFIG.packs.forEach(pack => {
  const card = document.createElement('div');
  card.className = 'pack-card';
  card.dataset.packId = pack.id;
  card.innerHTML = `
    <div class="pack-preview">
      <img src="${pack.preview}" alt="Preview ${pack.nombre}" loading="lazy" />
      <div class="pack-preview-overlay"></div>
    </div>
    <div class="pack-body">
      <div class="pack-avail">${pack.disponibles} packs para elegir</div>
      <div class="pack-name">${pack.nombre}</div>
      <div class="pack-desc">${pack.descripcion}</div>
      <div class="pack-contenido">✓ Incluye: ${pack.contenido}</div>
      <span class="pack-price-ars">${pack.precio_ars}</span>
      <span class="pack-price-usd">${pack.precio_usd}</span>
      <span class="pack-btn">Seleccionar</span>
    </div>
  `;
  card.addEventListener('click', () => openPaymentModal(pack));
  grid.appendChild(card);
});

// ── Generar testimonios
const testimonialsGrid = $('testimonials-grid');
if (testimonialsGrid) {
  TESTIMONIOS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
    card.innerHTML = `
      <div class="testimonial-stars">${stars}</div>
      <p class="testimonial-text">"${t.texto}"</p>
      <div class="testimonial-author">${t.nombre}</div>
    `;
    testimonialsGrid.appendChild(card);
  });
}

// ── Abrir modal de método de pago
function openPaymentModal(pack) {
  currentPack = pack;
  $('modal-pack-tag').textContent = pack.nombre;
  $('price-mp').textContent = pack.precio_ars;
  $('price-paypal').textContent = pack.precio_usd;
  openModal('modal-payment');
}

// ── Opciones de pago
$('pay-mp').addEventListener('click', () => {
  window.open(CONFIG.mp_link, '_blank');
  closeModal('modal-payment');
  showPostPayModal('mp');
});

$('pay-paypal').addEventListener('click', () => {
  const paypalUrl = `${CONFIG.paypal_link}/${currentPack.paypal_usd}USD`;
  window.open(paypalUrl, '_blank');
  closeModal('modal-payment');
  showPostPayModal('paypal');
});

// ── Modal post-pago (instrucción Telegram)
function showPostPayModal(method) {
  const msg = `Hola! Te envío el comprobante de pago del ${currentPack.nombre} 🧾`;
  $('mp-pack-tag').textContent = currentPack.nombre;
  $('mp-tg-btn').href = tgUrl(msg);
  $('mp-amount-val').textContent = method === 'mp' ? currentPack.precio_ars : currentPack.precio_usd;
  $('mp-method-label').textContent = method === 'mp' ? 'Mercado Pago' : 'PayPal';
  openModal('modal-mp');
}

// ── Helpers de modal
function openModal(id) {
  $(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  $(id).classList.add('hidden');
  document.body.style.overflow = '';
}
function showFeedback(id) {
  const el = $(id);
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

// ── Cerrar modales
const closers = [
  ['close-payment', 'overlay-payment', 'modal-payment'],
  ['close-mp', 'overlay-mp', 'modal-mp'],
  ['close-donate', 'overlay-donate', 'modal-donate'],
];
closers.forEach(([closeBtn, overlayId, modalId]) => {
  $(closeBtn)?.addEventListener('click', () => closeModal(modalId));
  $(overlayId)?.addEventListener('click', () => closeModal(modalId));
});

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['modal-payment', 'modal-mp', 'modal-donate'].forEach(id => closeModal(id));
  }
});

/* ═══════════════════════════════════════════════
   DONACIONES
   ═══════════════════════════════════════════════ */

let donateAmount = { ars: 2000, usd: 2 };

// Chips de monto
document.querySelectorAll('.donate-chip:not(.donate-chip--custom)').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.donate-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    donateAmount = { ars: Number(chip.dataset.ars), usd: Number(chip.dataset.usd) };
    $('donate-custom-wrap').classList.add('hidden');
  });
});

// Monto personalizado
$('donate-custom-btn').addEventListener('click', () => {
  document.querySelectorAll('.donate-chip').forEach(c => c.classList.remove('active'));
  $('donate-custom-btn').classList.add('active');
  $('donate-custom-wrap').classList.remove('hidden');
  $('donate-custom-input').focus();
});
$('donate-custom-confirm').addEventListener('click', () => {
  const val = Number($('donate-custom-input').value);
  if (val > 0) {
    donateAmount = { ars: val, usd: Math.ceil(val / 1500) };
    $('donate-custom-wrap').classList.add('hidden');
  }
});

// Abrir modal de donación
function openDonateModal() {
  const displayArs = `$${donateAmount.ars.toLocaleString('es-AR')} ARS`;
  $('donate-amount-display').textContent = displayArs;
  $('donate-paypal-link').href = `${CONFIG.paypal_link}/${donateAmount.usd}USD`;
  $('donate-mp-link').href = CONFIG.mp_link;
  const msg = `Hola! Quiero enviarte un apoyo de ${displayArs} 💛`;
  $('donate-tg-btn').href = tgUrl(msg);
  openModal('modal-donate');
}

$('btn-donate').addEventListener('click', openDonateModal);
$('btn-donate-hero').addEventListener('click', openDonateModal);
$('btn-donate-fab').addEventListener('click', openDonateModal);

// Seleccionar primer chip por defecto
document.querySelector('.donate-chip').classList.add('active');
