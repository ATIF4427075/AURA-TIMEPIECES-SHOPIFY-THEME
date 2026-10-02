/**
 * CHRONO LUXURY & HORLOGERIE - SHOPIFY STORE & LOCAL RUNTIME JAVASCRIPT ENGINE
 * Official Storefront for PAGANI DESIGN, BENYAR & NAVIFORCE Watches
 */

const AuraStore = {
  cart: JSON.parse(localStorage.getItem('chrono_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('chrono_wishlist') || '[]'),
  compare: JSON.parse(localStorage.getItem('chrono_compare') || '[]'),
  currentCurrency: localStorage.getItem('chrono_currency') || 'PKR',
  currentCategory: 'all',
  currentSort: 'featured',
  freeShippingThresholdPKR: 20000,
  
  currencyRates: {
    PKR: { symbol: "₨ ", rate: 1.0 },
    USD: { symbol: "$", rate: 0.0036 },
    EUR: { symbol: "€", rate: 0.0033 },
    GBP: { symbol: "£", rate: 0.0028 },
    AED: { symbol: "AED ", rate: 0.0132 },
    JPY: { symbol: "¥", rate: 0.55 }
  },

  init() {
    this.bindEvents();
    this.renderCatalog();
    this.updateCartUI();
    this.updateWishlistCount();
    this.setupStickyHeader();
    this.setupFAQ();
    this.setupSearch();
    this.initFeaturedShowcase();
  },

  formatMoney(amountInPKR) {
    const cur = this.currencyRates[this.currentCurrency] || this.currencyRates.PKR;
    const converted = amountInPKR * cur.rate;
    
    let formattedAmount;
    if (this.currentCurrency === 'PKR' || this.currentCurrency === 'JPY') {
      formattedAmount = Math.round(converted).toLocaleString();
    } else {
      formattedAmount = converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return cur.symbol + formattedAmount;
  },

  saveCart() {
    localStorage.setItem('chrono_cart', JSON.stringify(this.cart));
    this.updateCartUI();
  },

  addToCart(productId, quantity = 1, customEngraving = '', variant = 'Standard Edition') {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId && item.engraving === customEngraving && item.variant === variant);
    
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        title: product.name,
        brand: product.brand,
        pricePKR: product.price,
        image: product.mainImage,
        quantity: quantity,
        engraving: customEngraving,
        variant: variant
      });
    }

    this.saveCart();
    
    if (typeof HorologySound !== 'undefined') {
      HorologySound.playCrownWinding();
      HorologySound.playSuccessChime();
    }

    this.showToast(`Added <strong>${product.name}</strong> to Cart!`, 'success');
    this.openCartDrawer();
  },

  removeFromCart(index) {
    if (this.cart[index]) {
      const removed = this.cart[index].title;
      this.cart.splice(index, 1);
      this.saveCart();
      if (typeof HorologySound !== 'undefined') HorologySound.playBezelClick();
      this.showToast(`Removed ${removed} from Cart.`, 'info');
    }
  },

  updateQuantity(index, delta) {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.removeFromCart(index);
      } else {
        this.saveCart();
        if (typeof HorologySound !== 'undefined') HorologySound.playTick(1.1);
      }
    }
  },

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalPKR = this.cart.reduce((sum, item) => sum + (item.pricePKR * item.quantity), 0);

    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    const drawerList = document.getElementById('drawerCartItems');
    const drawerSubtotal = document.getElementById('drawerSubtotal');
    const freeShippingBar = document.getElementById('freeShippingBar');
    const freeShippingText = document.getElementById('freeShippingText');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = this.formatMoney(subtotalPKR);
    }

    if (freeShippingBar && freeShippingText) {
      const threshold = this.freeShippingThresholdPKR;
      const pct = Math.min(100, Math.round((subtotalPKR / threshold) * 100));
      freeShippingBar.style.width = `${pct}%`;

      if (subtotalPKR >= threshold) {
        freeShippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You have unlocked FREE Insured Express Courier!`;
      } else {
        const remaining = threshold - subtotalPKR;
        freeShippingText.innerHTML = `Add <strong>${this.formatMoney(remaining)}</strong> more for <strong>FREE Insured Express Delivery</strong>!`;
      }
    }

    if (drawerList) {
      if (this.cart.length === 0) {
        drawerList.innerHTML = `
          <div class="empty-cart-state">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <h4>Your Shopping Cart is Empty</h4>
            <p>Discover our Pagani Design, Benyar, and Naviforce flagship models.</p>
            <button class="btn btn-outline-gold btn-sm" onclick="AuraStore.closeCartDrawer(); document.getElementById('catalogSection').scrollIntoView({behavior: 'smooth'})">Explore Masterpieces</button>
          </div>
        `;
      } else {
        drawerList.innerHTML = this.cart.map((item, idx) => `
          <div class="cart-item-row">
            <div class="cart-item-img">
              <img src="${item.image}" onerror="this.onerror=null; var fn='${item.image}'.split('/').pop(); if(window.AURA_EMBEDDED_ASSETS && window.AURA_EMBEDDED_ASSETS[fn]) this.src=window.AURA_EMBEDDED_ASSETS[fn];" alt="${item.title}">
            </div>
            <div class="cart-item-info">
              <span class="card-vendor">${item.brand}</span>
              <h5>${item.title}</h5>
              ${item.variant ? `<div class="item-variant">${item.variant}</div>` : ''}
              ${item.engraving ? `<div class="item-variant" style="color: var(--color-gold);">Engraving: "${item.engraving}"</div>` : ''}
              <div class="item-price">${this.formatMoney(item.pricePKR)}</div>
              <div class="cart-item-controls">
                <button class="qty-btn" onclick="AuraStore.updateQuantity(${idx}, -1)">−</button>
                <span class="qty-input">${item.quantity}</span>
                <button class="qty-btn" onclick="AuraStore.updateQuantity(${idx}, 1)">+</button>
              </div>
            </div>
            <button class="icon-action-btn" title="Remove" onclick="AuraStore.removeFromCart(${idx})">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `).join('');
      }
    }
  },

  openCartDrawer() {
    document.getElementById('cartDrawerOverlay')?.classList.add('active');
    document.getElementById('cartDrawer')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeCartDrawer() {
    document.getElementById('cartDrawerOverlay')?.classList.remove('active');
    document.getElementById('cartDrawer')?.classList.remove('active');
    document.body.style.overflow = '';
  },

  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      this.showToast('Removed timepiece from Wishlist', 'info');
    } else {
      this.wishlist.push(productId);
      this.showToast('Saved to Wishlist ❤️', 'success');
      if (typeof HorologySound !== 'undefined') HorologySound.playBezelClick();
    }
    localStorage.setItem('chrono_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistCount();
    this.renderCatalog();
  },

  updateWishlistCount() {
    document.querySelectorAll('.wishlist-badge-count').forEach(el => {
      el.textContent = this.wishlist.length;
      el.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
    });
  },

  renderCatalog() {
    const grid = document.getElementById('catalogProductsGrid');
    if (!grid) return;

    let filtered = PRODUCTS_DATA.filter(p => {
      if (this.currentCategory === 'all') return true;
      return p.category === this.currentCategory || p.brand.toLowerCase().includes(this.currentCategory);
    });

    if (this.currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    grid.innerHTML = filtered.map(product => {
      const isWishlisted = this.wishlist.includes(product.id);

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="card-media">
            <span class="card-badge-top">${product.badge}</span>
            <img src="${product.mainImage}" onerror="this.onerror=null; var fn='${product.mainImage}'.split('/').pop(); if(window.AURA_EMBEDDED_ASSETS && window.AURA_EMBEDDED_ASSETS[fn]) this.src=window.AURA_EMBEDDED_ASSETS[fn];" alt="${product.name}" loading="lazy">
            <div class="card-quick-actions">
              <button class="icon-action-btn ${isWishlisted ? 'active' : ''}" title="Wishlist" onclick="AuraStore.toggleWishlist('${product.id}')">
                <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
              </button>
              <button class="icon-action-btn" title="Quick View" onclick="AuraStore.openQuickView('${product.id}')">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <span class="card-vendor">${product.brand} &bull; ${product.brandTagline}</span>
            <h4 class="card-title">
              <a href="javascript:void(0)" onclick="AuraStore.openQuickView('${product.id}')">${product.name}</a>
            </h4>
            <div class="card-specs-mini">
              <span><i class="fa-solid fa-water"></i> ${product.specs.waterResistance.split(' ')[0]}</span>
              <span><i class="fa-solid fa-circle-notch"></i> ${product.specs.caseDiameter}</span>
              <span><i class="fa-solid fa-star" style="color: var(--color-gold-light);"></i> ${product.rating}</span>
            </div>
            <div class="card-price-row">
              <span class="card-price">${this.formatMoney(product.price)}</span>
              <span class="card-compare">${this.formatMoney(product.originalPrice)}</span>
            </div>
            <button class="card-btn-add" onclick="AuraStore.addToCart('${product.id}', 1)">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
          </div>
        </article>
      `;
    }).join('');
  },

  openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const modalBody = document.getElementById('quickViewModalBody');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 32px; padding: 32px;" class="quick-view-grid">
        <div>
          <div style="width: 100%; height: 380px; border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border-gold); background: #000;">
            <img id="qvMainImg" src="${product.mainImage}" onerror="this.onerror=null; var fn='${product.mainImage}'.split('/').pop(); if(window.AURA_EMBEDDED_ASSETS && window.AURA_EMBEDDED_ASSETS[fn]) this.src=window.AURA_EMBEDDED_ASSETS[fn];" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="display: flex; gap: 10px; margin-top: 12px;">
            <img src="${product.mainImage}" onclick="document.getElementById('qvMainImg').src='${product.mainImage}'" style="width: 65px; height: 65px; border-radius: 6px; border: 1px solid var(--color-gold); cursor: pointer; object-fit: cover;">
            <img src="${product.poster}" onclick="document.getElementById('qvMainImg').src='${product.poster}'" style="width: 65px; height: 65px; border-radius: 6px; border: 1px solid var(--color-border); cursor: pointer; object-fit: cover;">
            <img src="${product.lumeImage}" onclick="document.getElementById('qvMainImg').src='${product.lumeImage}'" style="width: 65px; height: 65px; border-radius: 6px; border: 1px solid var(--color-border); cursor: pointer; object-fit: cover;">
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <span class="card-vendor">${product.brand} &bull; ${product.brandTagline}</span>
          <h3 style="font-size: 1.5rem;">${product.name}</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted);">${product.tagline}</p>
          <div class="product-price-bar">
            <span class="price">${this.formatMoney(product.price)}</span>
            <span class="hero-discount-badge">${product.badge}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6;">${product.description}</p>
          
          <div class="engraving-box">
            <label><i class="fa-solid fa-pen-nib" style="color: var(--color-gold);"></i> Complimentary Caseback Laser Engraving</label>
            <input type="text" id="qvEngravingInput" class="engraving-input" placeholder="e.g. M. Sterling 2026" maxlength="25">
          </div>

          <div class="quantity-buy-actions" style="margin-top: 10px;">
            <button class="btn btn-primary btn-block" onclick="AuraStore.addToCart('${product.id}', 1, document.getElementById('qvEngravingInput').value); AuraStore.closeModal('quickViewModalOverlay');">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart &bull; ${this.formatMoney(product.price)}
            </button>
            <button class="btn btn-buy-now btn-block" onclick="AuraStore.addToCart('${product.id}', 1, document.getElementById('qvEngravingInput').value); AuraStore.closeModal('quickViewModalOverlay'); AuraStore.openCheckoutModal();">
              <i class="fa-solid fa-bolt"></i> Instant 1-Click Buy Now
            </button>
          </div>
        </div>
      </div>
    `;

    this.openModal('quickViewModalOverlay');
  },

  openCheckoutModal() {
    this.closeCartDrawer();
    const modal = document.getElementById('checkoutModalOverlay');
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalPKR = this.cart.reduce((sum, item) => sum + (item.pricePKR * item.quantity), 0);

    const summaryEl = document.getElementById('checkoutOrderSummary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="background: rgba(14, 21, 36, 0.8); border: 1px solid var(--color-border); border-radius: 12px; padding: 20px;">
          <h4 style="font-size: 1.1rem; margin-bottom: 14px; color: var(--color-gold-light);">Order Summary (${totalCount} item${totalCount > 1 ? 's' : ''})</h4>
          ${this.cart.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 8px;">
              <span>${item.quantity}x ${item.title}</span>
              <span style="font-weight: 700;">${this.formatMoney(item.pricePKR * item.quantity)}</span>
            </div>
          `).join('')}
          <div style="border-top: 1px solid var(--color-border); margin-top: 14px; padding-top: 14px; display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800;">
            <span>Total Payable:</span>
            <span class="gold-text">${this.formatMoney(subtotalPKR)}</span>
          </div>
        </div>
      `;
    }

    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  completeCheckout() {
    const orderId = 'PAGANI-EXP-' + Math.floor(100000 + Math.random() * 900000);
    this.cart = [];
    this.saveCart();

    const bodyEl = document.getElementById('checkoutModalBody');
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="width: 75px; height: 75px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 2px solid var(--color-emerald); color: var(--color-emerald); font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
            <i class="fa-solid fa-check"></i>
          </div>
          <h2 style="font-size: 1.8rem; margin-bottom: 10px;">Order Confirmed & Insured!</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 20px;">Thank you for your order. Your official warranty card, timepiece, and courier dispatch are being prepared.</p>
          <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid var(--color-border-gold); padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 1.1rem; color: var(--color-gold-light); margin-bottom: 24px;">
            Tracking Ref: <strong>${orderId}</strong>
          </div>
          <button class="btn btn-primary" onclick="AuraStore.closeModal('checkoutModalOverlay'); window.location.reload();">
            Return to Storefront
          </button>
        </div>
      `;
    }

    if (typeof HorologySound !== 'undefined') HorologySound.playSuccessChime();
  },

  openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
    document.body.style.overflow = '';
  },

  bindEvents() {
    document.querySelectorAll('.currency-select').forEach(select => {
      select.value = this.currentCurrency;
      select.addEventListener('change', (e) => {
        this.currentCurrency = e.target.value;
        localStorage.setItem('chrono_currency', this.currentCurrency);
        this.renderCatalog();
        this.updateCartUI();
        if (typeof HorologySound !== 'undefined') HorologySound.playBezelClick();
      });
    });

    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.getAttribute('data-category');
        this.renderCatalog();
        if (typeof HorologySound !== 'undefined') HorologySound.playBezelClick();
      });
    });

    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderCatalog();
      });
    }

    document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof HorologySound !== 'undefined') {
          const enabled = HorologySound.toggleSound();
          btn.classList.toggle('active', enabled);
          this.showToast(enabled ? '🔊 Swiss Mechanical Sound Activated' : '🔇 Audio Muted', 'info');
        }
      });
    });
  },

  setupStickyHeader() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
  },

  setupFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      trigger?.addEventListener('click', () => {
        item.classList.toggle('active');
        if (typeof HorologySound !== 'undefined') HorologySound.playBezelClick();
      });
    });
  },

  setupSearch() {
    const searchInput = document.getElementById('siteSearchInput');
    const searchResults = document.getElementById('siteSearchResults');
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      const results = PRODUCTS_DATA.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.collection.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        searchResults.innerHTML = `<p style="padding: 16px; color: var(--color-text-muted);">No timepieces found matching "${query}".</p>`;
      } else {
        searchResults.innerHTML = results.map(p => `
          <div style="display: flex; align-items: center; gap: 14px; padding: 12px; border-bottom: 1px solid var(--color-border); cursor: pointer;" onclick="AuraStore.closeModal('searchModalOverlay'); AuraStore.openQuickView('${p.id}')">
            <img src="${p.mainImage}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;">
            <div>
              <span style="font-size: 0.72rem; color: var(--color-gold); text-transform: uppercase;">${p.brand}</span>
              <h5 style="font-size: 0.92rem; color: #fff;">${p.name}</h5>
              <span style="font-size: 0.85rem; color: var(--color-gold-light); font-weight: 700;">${this.formatMoney(p.price)}</span>
            </div>
          </div>
        `).join('');
      }
    });
  },

  initFeaturedShowcase() {
    document.querySelectorAll('.thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const targetSrc = thumb.getAttribute('data-img');
        const mainImg = document.getElementById('featuredShowcaseImg');
        if (mainImg && targetSrc) mainImg.src = targetSrc;
      });
    });
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 2000; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: rgba(14, 21, 36, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid ${type === 'success' ? 'var(--color-emerald)' : 'var(--color-border-gold)'};
      border-radius: 8px;
      padding: 12px 18px;
      color: #fff;
      font-size: 0.88rem;
      box-shadow: 0 8px 30px rgba(0,0,0,0.6);
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
      max-width: 320px;
    `;
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuraStore.init();
});
