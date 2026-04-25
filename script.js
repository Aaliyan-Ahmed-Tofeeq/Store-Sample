/* ============================================================
   bloom ♥ Collection — script.js
   Full eCommerce logic: products, cart, checkout, WhatsApp
   ============================================================ */

'use strict';

/* ============================================================
   1. PRODUCT DATA
   ============================================================ */
const PRODUCTS = [
  // ── Ladies Suits ──────────────────────────────────────────
  {
    id: 1,
    name: 'Royal Embroidered Suit',
    category: 'suits',
    price: 4500,
    oldPrice: 5500,
    badge: 'Sale',
    featured: true,
    emoji: '👗',
    desc: 'Elegant 3-piece embroidered formal suit'
  },
  {
    id: 2,
    name: 'Classic Lawn Suit',
    category: 'suits',
    price: 2800,
    oldPrice: null,
    badge: 'New',
    featured: false,
    emoji: '👘',
    desc: 'Premium lawn summer 3-piece suit'
  },
  {
    id: 3,
    name: 'Designer Silk Suit',
    category: 'suits',
    price: 7200,
    oldPrice: 8500,
    badge: 'Hot',
    featured: true,
    emoji: '✨',
    desc: 'Pure silk party wear suit with hand embroidery'
  },
  {
    id: 4,
    name: 'Formal Office Suit',
    category: 'suits',
    price: 3900,
    oldPrice: null,
    badge: null,
    featured: false,
    emoji: '💼',
    desc: 'Smart office-wear 2-piece co-ord set'
  },
  {
    id: 5,
    name: 'Bridal Lehnga Suit',
    category: 'suits',
    price: 15000,
    oldPrice: 18000,
    badge: 'Exclusive',
    featured: true,
    emoji: '👑',
    desc: 'Handcrafted bridal lehnga with dupatta'
  },

  // ── Clothing ───────────────────────────────────────────────
  {
    id: 6,
    name: 'Floral Maxi Dress',
    category: 'clothing',
    price: 2200,
    oldPrice: 2800,
    badge: 'Sale',
    featured: false,
    emoji: '🌸',
    desc: 'Breezy floral print maxi dress'
  },
  {
    id: 7,
    name: 'Linen Co-Ord Set',
    category: 'clothing',
    price: 3100,
    oldPrice: null,
    badge: 'New',
    featured: true,
    emoji: '🧵',
    desc: 'Natural linen co-ord set with wide-leg trousers'
  },
  {
    id: 8,
    name: 'Wrap Midi Dress',
    category: 'clothing',
    price: 1950,
    oldPrice: null,
    badge: null,
    featured: false,
    emoji: '🎀',
    desc: 'Versatile wrap dress for every occasion'
  },
  {
    id: 9,
    name: 'Oversized Kurta',
    category: 'clothing',
    price: 1400,
    oldPrice: 1800,
    badge: 'Sale',
    featured: false,
    emoji: '🌿',
    desc: 'Comfortable oversized cotton kurta'
  },
  {
    id: 10,
    name: 'Denim Jacket',
    category: 'clothing',
    price: 2600,
    oldPrice: null,
    badge: 'Trending',
    featured: true,
    emoji: '🧥',
    desc: 'Classic denim jacket with rose gold buttons'
  },

  // ── Cosmetics ──────────────────────────────────────────────
  {
    id: 11,
    name: 'Velvet Matte Lipstick',
    category: 'cosmetics',
    price: 850,
    oldPrice: 1100,
    badge: 'Best Seller',
    featured: true,
    emoji: '💄',
    desc: 'Long-lasting velvet matte formula, 12 shades'
  },
  {
    id: 12,
    name: 'Rose Gold Palette',
    category: 'cosmetics',
    price: 2400,
    oldPrice: null,
    badge: 'New',
    featured: false,
    emoji: '🌹',
    desc: '18-shade eyeshadow palette, warm rose tones'
  },
  {
    id: 13,
    name: 'Glow Serum SPF 30',
    category: 'cosmetics',
    price: 1800,
    oldPrice: 2200,
    badge: 'Sale',
    featured: true,
    emoji: '✨',
    desc: 'Brightening face serum with SPF protection'
  },
  {
    id: 14,
    name: 'Hydra Silk Foundation',
    category: 'cosmetics',
    price: 1650,
    oldPrice: null,
    badge: null,
    featured: false,
    emoji: '🍶',
    desc: 'Full coverage silk foundation, 20 shades'
  },
  {
    id: 15,
    name: 'Perfume — Rose Oud',
    category: 'cosmetics',
    price: 3500,
    oldPrice: 4200,
    badge: 'Luxury',
    featured: true,
    emoji: '🌷',
    desc: 'Signature rose & oud eau de parfum 50ml'
  },
  {
    id: 16,
    name: 'Brow Definer Kit',
    category: 'cosmetics',
    price: 950,
    oldPrice: null,
    badge: 'New',
    featured: false,
    emoji: '🖊️',
    desc: 'Precision brow pencil + setting gel kit'
  }
];

/* WhatsApp number — replace with your real number (no + or spaces) */
const WHATSAPP_NUMBER = '923454105434';

/* ============================================================
   2. STATE
   ============================================================ */
let cart = JSON.parse(localStorage.getItem('bg_cart') || '[]');
let activeFilter = 'all';
let searchQuery   = '';

/* ============================================================
   3. UTILITIES
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const fmt = (n) => `PKR ${n.toLocaleString('en-PK')}`;
const saveCart = () => localStorage.setItem('bg_cart', JSON.stringify(cart));

/* ============================================================
   4. LOADER
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    $('#loader').classList.add('hidden');
    document.body.style.overflow = '';
  }, 1800);
  document.body.style.overflow = 'hidden';
});

/* ============================================================
   5. NAVBAR — sticky + hamburger
   ============================================================ */
const navbar  = $('#navbar');
const hamburger = $('#hamburger');
const navLinks  = $('#navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.classList.toggle('no-scroll', navLinks.classList.contains('open'));
});

// Close menu on nav link click
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

/* ============================================================
   6. SEARCH
   ============================================================ */
const searchToggle = $('#searchToggle');
const searchBar    = $('#searchBar');
const searchInput  = $('#searchInput');
const searchClose  = $('#searchClose');

searchToggle.addEventListener('click', () => {
  searchBar.classList.add('open');
  setTimeout(() => searchInput.focus(), 100);
});

searchClose.addEventListener('click', () => {
  searchBar.classList.remove('open');
  searchInput.value = '';
  searchQuery = '';
  renderProducts();
});

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  renderProducts();
  // Scroll to products
  if (searchQuery.length > 1) {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ============================================================
   7. CATEGORY FILTER
   ============================================================ */
$$('.category-card').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.category-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});

/* ============================================================
   8. RENDER PRODUCTS
   ============================================================ */
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchCat  = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.desc.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function buildProductCard(product, delay = 0) {
  const inCart = cart.find(i => i.id === product.id);
  const card = document.createElement('article');
  card.className = 'product-card';
  card.style.animationDelay = `${delay}ms`;
  card.dataset.id = product.id;

  card.innerHTML = `
    <div class="product-card__img">
      <div class="product-card__placeholder">
        <span class="cat-emoji">${product.emoji}</span>
        <span class="pname">${product.name}</span>
      </div>
      ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
      <div class="quick-view">View Details</div>
    </div>
    <div class="product-card__body">
      <div class="product-card__cat">${product.category.replace('suits','Ladies Suits').replace('clothing','Clothing').replace('cosmetics','Cosmetics')}</div>
      <div class="product-card__name">${product.name}</div>
      <div class="product-card__price">
        ${fmt(product.price)}
        ${product.oldPrice ? `<span class="old-price">${fmt(product.oldPrice)}</span>` : ''}
      </div>
      <button
        class="product-card__add ${inCart ? 'added' : ''}"
        data-id="${product.id}"
        aria-label="Add ${product.name} to cart"
      >
        ${inCart ? '✓ Added to Bag' : '+ Add to Bag'}
      </button>
    </div>
  `;

  // Add to cart handler
  card.querySelector('.product-card__add').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });

  return card;
}

function renderProducts() {
  const grid    = $('#productGrid');
  const emptyMsg = $('#emptyMsg');
  const filtered = getFilteredProducts();

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
    filtered.forEach((p, i) => {
      grid.appendChild(buildProductCard(p, i * 60));
    });
  }
}

function renderFeatured() {
  const grid = $('#featuredGrid');
  grid.innerHTML = '';
  PRODUCTS.filter(p => p.featured).forEach((p, i) => {
    grid.appendChild(buildProductCard(p, i * 60));
  });
}

/* ============================================================
   9. CART LOGIC
   ============================================================ */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, emoji: product.emoji });
  }

  saveCart();
  updateCartUI();
  renderProducts();
  renderFeatured();

  // Bounce cart icon
  const cartBtn = $('#cartBtn');
  cartBtn.classList.add('bounce');
  setTimeout(() => cartBtn.classList.remove('bounce'), 400);

  // Open cart drawer briefly
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartDrawer();
  renderProducts();
  renderFeatured();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  updateCartUI();
  renderCartDrawer();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const countEl = $('#cartCount');
  countEl.textContent = count;
  countEl.classList.toggle('visible', count > 0);
  $('#cartHeaderCount').textContent = count > 0 ? `(${count})` : '';
  $('#cartTotal').textContent = fmt(getCartTotal());
}

/* ============================================================
   10. CART DRAWER
   ============================================================ */
function renderCartDrawer() {
  const body = $('#cartBody');
  const footer = $('#cartFooter');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Your bag is empty</p>
        <a href="#products" onclick="closeCart()">Start Shopping →</a>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  body.innerHTML = '';

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item__img">${item.emoji}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">${fmt(item.price)}</div>
        <div class="cart-item__qty">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-id="${item.id}" aria-label="Remove item">✕</button>
    `;

    el.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(Number(btn.dataset.id), Number(btn.dataset.delta)));
    });

    el.querySelector('.cart-item__remove').addEventListener('click', () => {
      removeFromCart(Number(el.querySelector('.cart-item__remove').dataset.id));
    });

    body.appendChild(el);
  });

  $('#cartTotal').textContent = fmt(getCartTotal());
}

function openCart() {
  renderCartDrawer();
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  document.body.classList.remove('no-scroll');
}

$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#cartOverlay').addEventListener('click', closeCart);

/* ============================================================
   11. CHECKOUT MODAL
   ============================================================ */
function openCheckout() {
  if (cart.length === 0) return;
  closeCart();

  // Build order summary
  const summary = $('#checkoutSummary');
  let html = `<span class="checkout-summary-title">Order Summary</span>`;
  cart.forEach(i => {
    html += `<div><strong>${i.name}</strong> × ${i.qty} — ${fmt(i.price * i.qty)}</div>`;
  });
  html += `<div class="checkout-total-line">Total: ${fmt(getCartTotal())}</div>`;
  summary.innerHTML = html;

  // Clear form
  ['chkName','chkPhone','chkAddress','chkCity'].forEach(id => {
    $(` #${id}`).value = '';
    $(`#${id}Err`).textContent = '';
  });

  $('#checkoutModal').classList.add('open');
  $('#checkoutOverlay').classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeCheckout() {
  $('#checkoutModal').classList.remove('open');
  $('#checkoutOverlay').classList.remove('open');
  document.body.classList.remove('no-scroll');
}

$('#checkoutBtn').addEventListener('click', openCheckout);
$('#checkoutClose').addEventListener('click', closeCheckout);
$('#checkoutOverlay').addEventListener('click', closeCheckout);

/* ============================================================
   12. FORM VALIDATION & WHATSAPP ORDER
   ============================================================ */
$('#placeOrderBtn').addEventListener('click', placeOrder);

function placeOrder() {
  // Grab values
  const name    = $('#chkName').value.trim();
  const phone   = $('#chkPhone').value.trim();
  const address = $('#chkAddress').value.trim();
  const city    = $('#chkCity').value.trim();

  // Validate
  let valid = true;

  if (!name || name.length < 2) {
    $('#chkNameErr').textContent = 'Please enter your full name.';
    valid = false;
  } else { $('#chkNameErr').textContent = ''; }

  if (!phone || !/^[0-9+\s\-]{7,15}$/.test(phone)) {
    $('#chkPhoneErr').textContent = 'Enter a valid phone number.';
    valid = false;
  } else { $('#chkPhoneErr').textContent = ''; }

  if (!address || address.length < 5) {
    $('#chkAddressErr').textContent = 'Please enter your street address.';
    valid = false;
  } else { $('#chkAddressErr').textContent = ''; }

  if (!city || city.length < 2) {
    $('#chkCityErr').textContent = 'Please enter your city.';
    valid = false;
  } else { $('#chkCityErr').textContent = ''; }

  if (!valid) return;

  // Build WhatsApp message
  const lines = [
    `🛍️ *New Order bloom Collectione*`,
    ``,
    `👤 *Customer Details*`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}, ${city}`,
    ``,
    `🧾 *Order Items*`
  ];

  cart.forEach((item, idx) => {
    lines.push(`${idx + 1}. ${item.name} × ${item.qty} — ${fmt(item.price * item.qty)}`);
  });

  lines.push(``);
  lines.push(`💰 *Total Amount: ${fmt(getCartTotal())}*`);
  lines.push(``);
  lines.push(`_Please confirm this order. Thank you!_ 🌸 message to purchase websites`);

  const message = encodeURIComponent(lines.join('\n'));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  // Clear cart after order
  cart = [];
  saveCart();
  updateCartUI();

  closeCheckout();

  // Show confirmation
  showToast('✓ Redirecting to WhatsApp…');

  setTimeout(() => {
    window.open(url, '_blank');
  }, 600);
}

/* ============================================================
   13. CONTACT FORM
   ============================================================ */
$('#contactSubmit').addEventListener('click', () => {
  const name  = $('#contactName').value.trim();
  const email = $('#contactEmail').value.trim();
  const msg   = $('#contactMsg').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending
  $('#contactName').value = '';
  $('#contactEmail').value = '';
  $('#contactMsg').value = '';
  const successEl = $('#contactSuccess');
  successEl.style.display = 'block';
  setTimeout(() => { successEl.style.display = 'none'; }, 5000);
});

/* ============================================================
   14. TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  const existing = $('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: type === 'error' ? '#C0392B' : '#2a9d5c',
    color: 'white',
    padding: '0.85rem 1.75rem',
    borderRadius: '50px',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.88rem',
    fontWeight: '600',
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
    zIndex: '9999',
    opacity: '0',
    transition: 'all 0.4s ease',
    whiteSpace: 'nowrap'
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================================================
   15. SCROLL REVEAL ANIMATION
   ============================================================ */
function initScrollReveal() {
  const revealEls = $$('.categories, .products-section, .featured-section, .about-section, .contact-section, .mid-banner');
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   16. CART ICON BOUNCE (CSS keyframe via class)
   ============================================================ */
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
  @keyframes cartBounce {
    0%,100% { transform: scale(1); }
    30%      { transform: scale(1.35); }
    60%      { transform: scale(0.9); }
  }
  .bounce { animation: cartBounce 0.4s ease; }
`;
document.head.appendChild(bounceStyle);

/* ============================================================
   17. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ============================================================
   18. INIT
   ============================================================ */
function init() {
  renderProducts();
  renderFeatured();
  updateCartUI();
  initScrollReveal();
}

// Wait for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
