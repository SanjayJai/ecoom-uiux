/**
 * NOVARA - Product Detail Page Controller
 * Reads URL query ?id=..., manages gallery switcher, size/color selectors, quantity & validations
 */

const NovaraProductDetail = (function () {
  let currentProduct = null;
  let selectedSize = null;
  let selectedColor = null;
  let currentQuantity = 1;

  function init() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || (window.PRODUCTS_DATA && window.PRODUCTS_DATA[0].id) || "nv-101";

    if (typeof NovaraCatalog === "undefined") return;

    currentProduct = NovaraCatalog.getById(productId);
    if (!currentProduct) {
      currentProduct = window.PRODUCTS_DATA[0];
    }

    renderProduct();
    renderRelated();
    bindEvents();
  }

  function renderProduct() {
    if (!currentProduct) return;

    document.title = `${currentProduct.name} — NOVARA`;

    // Breadcrumb
    const breadcrumbCurrent = document.getElementById("pdp-breadcrumb-name");
    const breadcrumbCat = document.getElementById("pdp-breadcrumb-category");
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentProduct.name;
    if (breadcrumbCat) {
      breadcrumbCat.textContent = currentProduct.category.toUpperCase();
      breadcrumbCat.href = `shop.html?category=${currentProduct.category}`;
    }

    // Title & SKU
    const titleEl = document.getElementById("pdp-title");
    const skuEl = document.getElementById("pdp-sku");
    const categoryEl = document.getElementById("pdp-category");
    if (titleEl) titleEl.textContent = currentProduct.name;
    if (skuEl) skuEl.textContent = `SKU: ${currentProduct.sku}`;
    if (categoryEl) categoryEl.textContent = currentProduct.category.toUpperCase();

    // Pricing & Discount
    const priceCurrent = document.getElementById("pdp-price");
    const priceOriginal = document.getElementById("pdp-original-price");
    const discountBadge = document.getElementById("pdp-discount-badge");
    const discount = NovaraCatalog.calculateDiscount(currentProduct.originalPrice, currentProduct.price);

    if (priceCurrent) priceCurrent.textContent = `₹${currentProduct.price.toLocaleString("en-IN")}`;
    if (priceOriginal) {
      if (currentProduct.originalPrice) {
        priceOriginal.textContent = `₹${currentProduct.originalPrice.toLocaleString("en-IN")}`;
        priceOriginal.style.display = "inline";
      } else {
        priceOriginal.style.display = "none";
      }
    }
    if (discountBadge) {
      if (discount > 0) {
        discountBadge.textContent = `${discount}% OFF`;
        discountBadge.style.display = "inline-block";
      } else {
        discountBadge.style.display = "none";
      }
    }

    // Ratings
    const ratingStars = document.getElementById("pdp-stars");
    const reviewsCount = document.getElementById("pdp-reviews-count");
    if (ratingStars) {
      ratingStars.textContent = "★".repeat(Math.round(currentProduct.rating)) + "☆".repeat(5 - Math.round(currentProduct.rating));
    }
    if (reviewsCount) {
      reviewsCount.textContent = `(${currentProduct.reviewsCount} verified reviews)`;
    }

    // Stock Status
    const stockEl = document.getElementById("pdp-stock-status");
    if (stockEl) {
      if (currentProduct.inStock) {
        stockEl.innerHTML = `
          <span style="display: inline-block; width: 8px; height: 8px; background: #267347; border-radius: 50%; margin-right: 6px;"></span>
          In Stock — Only <strong>${currentProduct.stockCount}</strong> available in our Mumbai Atelier
        `;
        stockEl.className = "pdp-stock in-stock";
      } else {
        stockEl.innerHTML = `
          <span style="display: inline-block; width: 8px; height: 8px; background: #c53424; border-radius: 50%; margin-right: 6px;"></span>
          Currently Out of Stock
        `;
        stockEl.className = "pdp-stock out-of-stock";
      }
    }

    // Description & Details
    const descEl = document.getElementById("pdp-description");
    if (descEl) descEl.textContent = currentProduct.description;

    const detailsList = document.getElementById("pdp-details-list");
    if (detailsList && currentProduct.details) {
      detailsList.innerHTML = currentProduct.details.map(d => `<li>${d}</li>`).join("");
    }

    // Gallery
    renderGallery();

    // Color Swatches
    renderColors();

    // Sizes
    renderSizes();

    // Update Wishlist button state
    syncWishlistButton();
  }

  function renderGallery() {
    const mainImg = document.getElementById("pdp-main-image");
    const thumbsContainer = document.getElementById("pdp-thumbnails");
    if (!mainImg || !thumbsContainer) return;

    const images = currentProduct.gallery && currentProduct.gallery.length > 0
      ? currentProduct.gallery
      : [currentProduct.primaryImage];

    mainImg.src = images[0];
    mainImg.alt = currentProduct.name;

    let thumbsHtml = "";
    images.forEach((imgUrl, idx) => {
      thumbsHtml += `
        <button class="pdp-thumb-btn ${idx === 0 ? "is-active" : ""}" data-index="${idx}" data-img="${imgUrl}" aria-label="View photo ${idx + 1}">
          <img src="${imgUrl}" alt="Thumbnail ${idx + 1}">
        </button>
      `;
    });

    thumbsContainer.innerHTML = thumbsHtml;

    // Thumbnail click binding
    thumbsContainer.querySelectorAll(".pdp-thumb-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        thumbsContainer.querySelectorAll(".pdp-thumb-btn").forEach(b => b.classList.remove("is-active"));
        this.classList.add("is-active");
        const newImg = this.getAttribute("data-img");
        mainImg.style.opacity = "0.4";
        setTimeout(() => {
          mainImg.src = newImg;
          mainImg.style.opacity = "1";
        }, 150);
      });
    });
  }

  function renderColors() {
    const container = document.getElementById("pdp-colors-container");
    const label = document.getElementById("pdp-selected-color-label");
    if (!container) return;

    const colors = currentProduct.colors || [{ name: "Standard", hex: "#111111" }];
    selectedColor = colors[0].name;
    if (label) label.textContent = selectedColor;

    let html = "";
    colors.forEach((col, idx) => {
      html += `
        <button class="color-swatch-btn ${idx === 0 ? "is-active" : ""}" data-color-name="${col.name}" style="background-color: ${col.hex};" title="${col.name}" aria-label="${col.name}">
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll(".color-swatch-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        container.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("is-active"));
        this.classList.add("is-active");
        selectedColor = this.getAttribute("data-color-name");
        if (label) label.textContent = selectedColor;
      });
    });
  }

  function renderSizes() {
    const container = document.getElementById("pdp-sizes-container");
    const warning = document.getElementById("pdp-size-warning");
    if (!container) return;

    const sizes = currentProduct.sizes || ["One Size"];
    selectedSize = sizes.length === 1 ? sizes[0] : null; // Auto-select if only 1 option

    let html = "";
    sizes.forEach((s) => {
      const activeClass = selectedSize === s ? "is-active" : "";
      html += `
        <button class="size-choice-btn ${activeClass}" data-size="${s}">
          ${s}
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll(".size-choice-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        container.querySelectorAll(".size-choice-btn").forEach(b => b.classList.remove("is-active"));
        this.classList.add("is-active");
        selectedSize = this.getAttribute("data-size");
        if (warning) warning.style.display = "none";
      });
    });
  }

  function syncWishlistButton() {
    const wishlistBtn = document.getElementById("pdp-wishlist-btn");
    if (!wishlistBtn || !currentProduct) return;

    const inWishlist = typeof NovaraWishlist !== "undefined" && NovaraWishlist.hasItem(currentProduct.id);
    if (inWishlist) {
      wishlistBtn.classList.add("is-active");
      wishlistBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        Saved in Wishlist
      `;
    } else {
      wishlistBtn.classList.remove("is-active");
      wishlistBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        Add to Wishlist
      `;
    }
  }

  function bindEvents() {
    // Quantity controls
    const qtyMinus = document.getElementById("pdp-qty-minus");
    const qtyPlus = document.getElementById("pdp-qty-plus");
    const qtyVal = document.getElementById("pdp-qty-val");

    if (qtyMinus && qtyPlus && qtyVal) {
      qtyMinus.addEventListener("click", () => {
        if (currentQuantity > 1) {
          currentQuantity--;
          qtyVal.textContent = currentQuantity;
        }
      });

      qtyPlus.addEventListener("click", () => {
        const max = currentProduct.stockCount || 10;
        if (currentQuantity < max) {
          currentQuantity++;
          qtyVal.textContent = currentQuantity;
        } else {
          NovaraApp.showToast("Stock Limit Reached", `Only ${max} units currently available.`, "info");
        }
      });
    }

    // Add to Cart
    const addBtn = document.getElementById("pdp-add-to-cart");
    const sizeWarning = document.getElementById("pdp-size-warning");

    if (addBtn) {
      addBtn.addEventListener("click", function () {
        if (!selectedSize) {
          if (sizeWarning) {
            sizeWarning.textContent = "Please select a size to proceed.";
            sizeWarning.style.display = "block";
          }
          NovaraApp.showToast("Size Required", "Please select your preferred size.", "info");
          return;
        }

        if (typeof NovaraCart !== "undefined") {
          addBtn.classList.add("is-loading");
          addBtn.disabled = true;

          setTimeout(() => {
            NovaraCart.addItem(currentProduct, {
              size: selectedSize,
              color: selectedColor,
              quantity: currentQuantity
            });

            addBtn.classList.remove("is-loading");
            addBtn.disabled = false;

            NovaraApp.showToast(
              "Added to Shopping Bag",
              `${currentProduct.name} (${selectedSize}, ${selectedColor}) has been added.`,
              "bag"
            );

            NovaraCart.openDrawer();
          }, 300);
        }
      });
    }

    // Wishlist Toggle
    const wishlistBtn = document.getElementById("pdp-wishlist-btn");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", function () {
        if (typeof NovaraWishlist !== "undefined" && currentProduct) {
          const inWish = NovaraWishlist.toggle(currentProduct.id);
          syncWishlistButton();
          if (inWish) {
            NovaraApp.showToast("Saved to Wishlist", `${currentProduct.name} saved for later.`, "heart");
          } else {
            NovaraApp.showToast("Removed from Wishlist", `${currentProduct.name} removed.`, "info");
          }
        }
      });
    }

    // Accordions
    document.querySelectorAll(".pdp-accordion-trigger").forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const item = this.closest(".pdp-accordion-item");
        const isOpen = item.classList.contains("is-open");

        document.querySelectorAll(".pdp-accordion-item").forEach(i => i.classList.remove("is-open"));

        if (!isOpen) {
          item.classList.add("is-open");
        }
      });
    });

    // Size Guide Modal
    const sizeGuideBtn = document.getElementById("pdp-size-guide-btn");
    const sizeGuideModal = document.getElementById("size-guide-modal");
    const sizeGuideClose = document.getElementById("size-guide-close");

    if (sizeGuideBtn && sizeGuideModal) {
      sizeGuideBtn.addEventListener("click", () => {
        sizeGuideModal.classList.add("is-active");
      });
    }

    if (sizeGuideClose && sizeGuideModal) {
      sizeGuideClose.addEventListener("click", () => {
        sizeGuideModal.classList.remove("is-active");
      });
    }

    if (sizeGuideModal) {
      sizeGuideModal.addEventListener("click", (e) => {
        if (e.target === sizeGuideModal) {
          sizeGuideModal.classList.remove("is-active");
        }
      });
    }
  }

  function renderRelated() {
    const container = document.getElementById("pdp-related-products");
    if (!container || !currentProduct) return;

    const related = NovaraCatalog.getRelated(currentProduct.id, 4);
    let html = "";
    related.forEach((prod) => {
      html += NovaraApp.createProductCardHTML(prod);
    });

    container.innerHTML = html;
  }

  return {
    init: init
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  // Only init if we are on product.html
  if (document.getElementById("pdp-main-image")) {
    NovaraProductDetail.init();
  }
});

if (typeof window !== "undefined") {
  window.NovaraProductDetail = NovaraProductDetail;
}
