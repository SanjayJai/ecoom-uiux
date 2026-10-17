/**
 * NOVARA - Shopping Cart State Manager
 * Handles LocalStorage persistence, integer calculation, promo coupons & drawers
 */

const NovaraCart = (function () {
  const STORAGE_KEY = "novara_cart_v1";
  const COUPON_KEY = "novara_active_coupon_v1";
  const FREE_SHIPPING_THRESHOLD = 1999;
  const STANDARD_SHIPPING_FEE = 199;

  // Active coupons definition
  const AVAILABLE_COUPONS = {
    NOVARA10: { code: "NOVARA10", type: "percent", value: 10, minOrder: 0, label: "10% Off Entire Order" },
    FIRST500: { code: "FIRST500", type: "fixed", value: 500, minOrder: 2500, label: "₹500 Off (Min ₹2,500)" },
    FREESHIP: { code: "FREESHIP", type: "shipping", value: 100, minOrder: 0, label: "Complimentary Express Shipping" }
  };

  // Helper to load cart from localStorage
  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse cart storage", e);
      return [];
    }
  }

  // Save cart
  function saveCart(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      updateBadges();
      window.dispatchEvent(new CustomEvent("novara:cart-updated", { detail: { items } }));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }

  // Active coupon
  function getActiveCoupon() {
    try {
      const saved = localStorage.getItem(COUPON_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function saveCoupon(coupon) {
    if (coupon) {
      localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(COUPON_KEY);
    }
    window.dispatchEvent(new CustomEvent("novara:cart-updated"));
  }

  // Unique key for line item
  function generateItemKey(id, size, color) {
    return `${id}__${size || "std"}__${color || "std"}`;
  }

  // Core API
  return {
    getItems: function () {
      return loadCart();
    },

    getItemCount: function () {
      const items = loadCart();
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },

    addItem: function (product, options = {}) {
      if (!product || !product.id) return false;
      const items = loadCart();
      const size = options.size || (product.sizes && product.sizes[0]) || "One Size";
      const color = options.color || (product.colors && product.colors[0]?.name) || "Standard";
      const quantityToAdd = Math.max(1, parseInt(options.quantity, 10) || 1);
      const key = generateItemKey(product.id, size, color);

      const existingIndex = items.findIndex(item => item.key === key);

      if (existingIndex > -1) {
        const newQty = items[existingIndex].quantity + quantityToAdd;
        const maxStock = product.stockCount || 20;
        items[existingIndex].quantity = Math.min(newQty, maxStock);
      } else {
        items.push({
          key,
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice || null,
          image: product.primaryImage,
          size,
          color,
          quantity: quantityToAdd,
          maxStock: product.stockCount || 20
        });
      }

      saveCart(items);
      return true;
    },

    updateQuantity: function (key, quantity) {
      let items = loadCart();
      const target = items.find(item => item.key === key);
      if (!target) return false;

      const newQty = parseInt(quantity, 10);
      if (newQty <= 0) {
        return this.removeItem(key);
      }

      target.quantity = Math.min(newQty, target.maxStock || 20);
      saveCart(items);
      return true;
    },

    removeItem: function (key) {
      let items = loadCart();
      const initialLen = items.length;
      items = items.filter(item => item.key !== key);
      if (items.length !== initialLen) {
        saveCart(items);
        return true;
      }
      return false;
    },

    clearCart: function () {
      saveCart([]);
      saveCoupon(null);
    },

    getSubtotal: function () {
      const items = loadCart();
      // Calculate in integer paise to avoid precision loss
      const totalPaise = items.reduce((sum, item) => {
        return sum + Math.round(item.price * 100) * item.quantity;
      }, 0);
      return Math.round(totalPaise / 100);
    },

    getShipping: function () {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      const coupon = getActiveCoupon();
      if (coupon && coupon.type === "shipping") return 0;
      return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    },

    getFreeShippingProgress: function () {
      const subtotal = this.getSubtotal();
      const diff = FREE_SHIPPING_THRESHOLD - subtotal;
      const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      return {
        threshold: FREE_SHIPPING_THRESHOLD,
        current: subtotal,
        remaining: Math.max(0, diff),
        percent: subtotal === 0 ? 0 : percent,
        isQualified: subtotal >= FREE_SHIPPING_THRESHOLD
      };
    },

    applyCoupon: function (inputCode) {
      if (!inputCode) return { success: false, message: "Please enter a coupon code." };
      const cleaned = inputCode.trim().toUpperCase();
      const coupon = AVAILABLE_COUPONS[cleaned];

      if (!coupon) {
        return { success: false, message: "Invalid promo code. Try 'NOVARA10' or 'FIRST500'." };
      }

      const subtotal = this.getSubtotal();
      if (coupon.minOrder && subtotal < coupon.minOrder) {
        return {
          success: false,
          message: `Minimum order value of ₹${coupon.minOrder.toLocaleString("en-IN")} required for this code.`
        };
      }

      saveCoupon(coupon);
      return { success: true, message: `Coupon '${coupon.code}' applied successfully!` };
    },

    removeCoupon: function () {
      saveCoupon(null);
      return true;
    },

    getActiveCoupon: function () {
      return getActiveCoupon();
    },

    getDiscount: function () {
      const coupon = getActiveCoupon();
      if (!coupon) return 0;
      const subtotal = this.getSubtotal();

      if (coupon.type === "percent") {
        return Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.type === "fixed") {
        return Math.min(subtotal, coupon.value);
      }
      return 0;
    },

    getTotal: function () {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      const shipping = this.getShipping();
      const discount = this.getDiscount();
      return Math.max(0, subtotal - discount + shipping);
    },

    openDrawer: function () {
      const drawer = document.getElementById("cart-drawer");
      const backdrop = document.getElementById("cart-backdrop");
      if (drawer && backdrop) {
        this.renderDrawer();
        drawer.classList.add("is-open");
        backdrop.classList.add("is-active");
        document.body.style.overflow = "hidden";
      }
    },

    closeDrawer: function () {
      const drawer = document.getElementById("cart-drawer");
      const backdrop = document.getElementById("cart-backdrop");
      if (drawer && backdrop) {
        drawer.classList.remove("is-open");
        backdrop.classList.remove("is-active");
        document.body.style.overflow = "";
      }
    },

    renderDrawer: function () {
      const drawerBody = document.getElementById("cart-drawer-items");
      const subtotalEl = document.getElementById("cart-drawer-subtotal");
      const totalEl = document.getElementById("cart-drawer-total");
      const countEl = document.getElementById("cart-drawer-count");
      const progressText = document.getElementById("free-shipping-text");
      const progressFill = document.getElementById("free-shipping-fill");
      const checkoutBtn = document.getElementById("cart-drawer-checkout-btn");

      if (!drawerBody) return;

      const items = this.getItems();
      const subtotal = this.getSubtotal();
      const total = this.getTotal();
      const count = this.getItemCount();
      const shippingProgress = this.getFreeShippingProgress();

      if (countEl) countEl.textContent = `(${count} ${count === 1 ? "item" : "items"})`;

      // Update free shipping bar
      if (progressText && progressFill) {
        if (subtotal === 0) {
          progressText.innerHTML = `Add items to enjoy <strong>Free Shipping</strong> above ₹${FREE_SHIPPING_THRESHOLD.toLocaleString("en-IN")}`;
          progressFill.style.width = "0%";
        } else if (shippingProgress.isQualified) {
          progressText.innerHTML = `🎉 <strong>Congratulations!</strong> You have unlocked Free Express Shipping!`;
          progressFill.style.width = "100%";
        } else {
          progressText.innerHTML = `Add <strong>₹${shippingProgress.remaining.toLocaleString("en-IN")}</strong> more for <strong>Free Shipping</strong>`;
          progressFill.style.width = `${shippingProgress.percent}%`;
        }
      }

      if (items.length === 0) {
        drawerBody.innerHTML = `
          <div class="empty-state" style="padding: 3rem 1rem;">
            <div class="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h4 class="empty-state-title" style="font-size: 1.15rem;">Your shopping bag is empty</h4>
            <p class="empty-state-text" style="font-size: 0.85rem;">Discover our latest artisanal arrivals tailored for your everyday wardrobe.</p>
            <a href="shop.html" class="btn btn-primary btn-sm" onclick="NovaraCart.closeDrawer()">Explore Collection</a>
          </div>
        `;
        if (subtotalEl) subtotalEl.textContent = "₹0";
        if (totalEl) totalEl.textContent = "₹0";
        if (checkoutBtn) checkoutBtn.classList.add("is-disabled");
        return;
      }

      if (checkoutBtn) checkoutBtn.classList.remove("is-disabled");

      let html = "";
      items.forEach((item) => {
        html += `
          <div class="cart-item" data-key="${item.key}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
            <div class="cart-item-info">
              <div>
                <h5 class="cart-item-title"><a href="product.html?id=${item.id}">${item.name}</a></h5>
                <div class="cart-item-meta">
                  <span>Size: <strong>${item.size}</strong></span>
                  <span>Color: <strong>${item.color}</strong></span>
                </div>
              </div>
              <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString("en-IN")}</div>
              <div class="cart-item-actions">
                <div class="qty-stepper">
                  <button class="qty-btn" onclick="NovaraCart.updateQuantity('${item.key}', ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
                  <span class="qty-value">${item.quantity}</span>
                  <button class="qty-btn" onclick="NovaraCart.updateQuantity('${item.key}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
                </div>
                <button class="cart-item-remove" onclick="NovaraCart.removeItem('${item.key}')" title="Remove item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        `;
      });

      drawerBody.innerHTML = html;
      if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
      if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
    }
  };

  function updateBadges() {
    const count = NovaraCart.getItemCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach((b) => {
      b.textContent = count;
      if (count > 0) {
        b.classList.add("has-items");
      } else {
        b.classList.remove("has-items");
      }
    });
  }
})();

// Listen to storage changes across browser tabs
window.addEventListener("storage", function (e) {
  if (e.key === "novara_cart_v1") {
    NovaraCart.renderDrawer();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach((b) => {
      b.textContent = NovaraCart.getItemCount();
    });
  }
});

// Auto-init badges on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  const count = NovaraCart.getItemCount();
  const badges = document.querySelectorAll(".cart-count-badge");
  badges.forEach((b) => {
    b.textContent = count;
    if (count > 0) b.classList.add("has-items");
  });
});

if (typeof window !== "undefined") {
  window.NovaraCart = NovaraCart;
}
