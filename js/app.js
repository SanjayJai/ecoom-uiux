/**
 * NOVARA - Global Application Logic & Micro-Interactions
 * Handles header transitions, announcement bar, mobile drawer, toasts & card rendering
 */

const NovaraApp = (function () {
  // Toast timeout reference
  let toastTimer = null;

  function init() {
    initAnnouncementBar();
    initStickyHeader();
    initMobileNav();
    initCartTriggers();
    initGlobalDelegation();
    initNewsletterForms();
    initBackToTop();
    initScrollAnimations();
  }

  // 1. Announcement bar rotating messages & dismiss
  function initAnnouncementBar() {
    const bar = document.querySelector(".announcement-bar");
    const closeBtn = document.querySelector(".announcement-close");
    const itemContainer = document.querySelector(".announcement-item");

    if (!bar) return;

    if (sessionStorage.getItem("novara_announcement_dismissed") === "true") {
      bar.classList.add("is-hidden");
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        bar.classList.add("is-hidden");
        sessionStorage.setItem("novara_announcement_dismissed", "true");
      });
    }

    // Rotating promotional messages
    const promoMessages = [
      `Free express shipping across India on orders over <strong>₹1,999</strong>`,
      `Exclusive: Use code <strong>NOVARA10</strong> for 10% off your first order`,
      `Handcrafted ethical tailoring — Crafted for everyday elegance`
    ];
    let currentIndex = 0;

    if (itemContainer && promoMessages.length > 1) {
      setInterval(() => {
        itemContainer.style.opacity = "0";
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % promoMessages.length;
          itemContainer.innerHTML = promoMessages[currentIndex];
          itemContainer.style.opacity = "1";
        }, 300);
      }, 4500);
    }
  }

  // 2. Sticky Header with elevation on scroll
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Mobile Navigation Drawer
  function initMobileNav() {
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const drawer = document.getElementById("mobile-nav-drawer");
    const backdrop = document.getElementById("mobile-nav-backdrop");
    const closeBtn = document.querySelector(".mobile-nav-close");

    if (!drawer || !toggleBtn) return;

    const openNav = () => {
      toggleBtn.classList.add("is-open");
      drawer.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-active");
      document.body.style.overflow = "hidden";
    };

    const closeNav = () => {
      toggleBtn.classList.remove("is-open");
      drawer.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-active");
      document.body.style.overflow = "";
    };

    toggleBtn.addEventListener("click", () => {
      if (drawer.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeNav);
    if (backdrop) backdrop.addEventListener("click", closeNav);
  }

  // 4. Cart Triggers & Drawer wiring
  function initCartTriggers() {
    const cartTriggers = document.querySelectorAll(".cart-trigger-btn");
    const closeBtn = document.querySelector(".cart-drawer-close");
    const backdrop = document.getElementById("cart-backdrop");

    cartTriggers.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof NovaraCart !== "undefined") {
          NovaraCart.openDrawer();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (typeof NovaraCart !== "undefined") {
          NovaraCart.closeDrawer();
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => {
        if (typeof NovaraCart !== "undefined") {
          NovaraCart.closeDrawer();
        }
      });
    }
  }

  // 5. Global Event Delegation for Cards (Wishlist + Quick Add)
  function initGlobalDelegation() {
    document.addEventListener("click", function (e) {
      // Wishlist toggle
      const wishlistBtn = e.target.closest(".wishlist-toggle");
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        const productId = wishlistBtn.getAttribute("data-product-id");
        if (productId && typeof NovaraWishlist !== "undefined") {
          const inWishlist = NovaraWishlist.toggle(productId);
          const product = typeof NovaraCatalog !== "undefined" ? NovaraCatalog.getById(productId) : null;
          const name = product ? product.name : "Item";

          if (inWishlist) {
            showToast("Saved to Wishlist", `${name} has been added to your wishlist.`, "heart");
          } else {
            showToast("Removed from Wishlist", `${name} was removed from your wishlist.`, "info");
          }
        }
        return;
      }

      // Quick Add to Cart
      const quickAddBtn = e.target.closest(".product-quick-add");
      if (quickAddBtn) {
        e.preventDefault();
        e.stopPropagation();
        const productId = quickAddBtn.getAttribute("data-product-id");
        if (productId && typeof NovaraCatalog !== "undefined" && typeof NovaraCart !== "undefined") {
          const product = NovaraCatalog.getById(productId);
          if (product) {
            // Default first size and color
            const defaultSize = product.sizes ? product.sizes[0] : "One Size";
            const defaultColor = product.colors ? product.colors[0].name : "Standard";

            NovaraCart.addItem(product, {
              size: defaultSize,
              color: defaultColor,
              quantity: 1
            });

            showToast("Added to Bag", `${product.name} (Size: ${defaultSize}) added to your shopping bag.`, "bag");
            NovaraCart.openDrawer();
          }
        }
        return;
      }
    });
  }

  // 6. Toast Notification Engine
  function showToast(title, message, iconType = "check") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    let iconSvg = "";
    if (iconType === "heart") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    } else if (iconType === "bag") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <h6 class="toast-title">${title}</h6>
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    const closeToast = () => {
      toast.classList.remove("is-visible");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    };

    toast.querySelector(".toast-close").addEventListener("click", closeToast);

    // Auto dismiss after 3.8s
    setTimeout(closeToast, 3800);
  }

  // 7. Newsletter Subscription Validation
  function initNewsletterForms() {
    const forms = document.querySelectorAll(".newsletter-form");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = form.querySelector(".newsletter-input");
        if (!input) return;

        const val = input.value.trim();

        if (!val) {
          showToast("Email Required", "Please enter your email address to join our newsletter.", "info");
          input.focus();
          return;
        }

        if (!emailRegex.test(val)) {
          showToast("Invalid Email Format", "Please provide a valid email address (e.g., name@example.com).", "info");
          input.focus();
          return;
        }

        // Simulating immediate client feedback
        showToast("Welcome to NOVARA", "Thank you for subscribing! Your 10% welcome invitation has been sent.", "check");
        input.value = "";
      });
    });
  }

  // 8. Back to Top Button
  function initBackToTop() {
    const btns = document.querySelectorAll(".back-to-top-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    });
  }

  // 9. Scroll reveal animations via IntersectionObserver
  function initScrollAnimations() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        observer.observe(el);
      });
    }
  }

  // Reusable Product Card HTML Generator
  function createProductCardHTML(product) {
    if (!product) return "";
    const inWishlist = typeof NovaraWishlist !== "undefined" ? NovaraWishlist.hasItem(product.id) : false;
    const discount = NovaraCatalog.calculateDiscount(product.originalPrice, product.price);

    let badgeHtml = "";
    if (product.badge) {
      let badgeClass = "badge-new";
      if (product.badge.toLowerCase().includes("bestseller")) badgeClass = "badge-bestseller";
      if (product.badge.toLowerCase().includes("sale")) badgeClass = "badge-sale";
      badgeHtml = `<span class="badge ${badgeClass}">${product.badge}</span>`;
    }

    const swatchesHtml = product.colors && product.colors.length > 0
      ? `<div class="product-swatches">
          ${product.colors.map(c => `<span class="swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>`).join("")}
        </div>`
      : "";

    const secondaryClass = product.secondaryImage ? "" : "no-secondary";

    return `
      <div class="product-card ${secondaryClass}" data-id="${product.id}" data-category="${product.category}">
        <div class="product-media">
          <a href="product.html?id=${product.id}" aria-label="View ${product.name}">
            <img src="${product.primaryImage}" alt="${product.name}" class="product-img img-primary" loading="lazy">
            ${product.secondaryImage ? `<img src="${product.secondaryImage}" alt="${product.name} alternate view" class="product-img img-secondary" loading="lazy">` : ""}
          </a>

          <div class="product-badges">
            ${badgeHtml}
          </div>

          <button class="wishlist-toggle ${inWishlist ? "is-active" : ""}" data-product-id="${product.id}" aria-label="${inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>

          <button class="product-quick-add" data-product-id="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Quick Add to Bag
          </button>
        </div>

        <div class="product-details">
          <span class="product-category">${product.category}</span>
          <h4 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h4>
          
          <div class="product-rating">
            <div class="rating-stars">
              ${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}
            </div>
            <span>(${product.reviewsCount})</span>
          </div>

          ${swatchesHtml}

          <div class="product-price-row">
            <span class="price-current">₹${product.price.toLocaleString("en-IN")}</span>
            ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice.toLocaleString("en-IN")}</span>` : ""}
            ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  return {
    init: init,
    showToast: showToast,
    createProductCardHTML: createProductCardHTML
  };
})();

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  NovaraApp.init();
});

if (typeof window !== "undefined") {
  window.NovaraApp = NovaraApp;
}
