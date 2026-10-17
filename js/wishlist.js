/**
 * NOVARA - Wishlist State Manager
 * Handles saved items, local storage sync, toggle heart states & wishlist page rendering
 */

const NovaraWishlist = (function () {
  const STORAGE_KEY = "novara_wishlist_v1";

  function loadWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load wishlist", e);
      return [];
    }
  }

  function saveWishlist(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      updateWishlistBadges();
      syncHeartButtons();
      window.dispatchEvent(new CustomEvent("novara:wishlist-updated", { detail: { items } }));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }

  function updateWishlistBadges() {
    const items = loadWishlist();
    const count = items.length;
    const badges = document.querySelectorAll(".wishlist-count-badge");
    badges.forEach((b) => {
      b.textContent = count;
      if (count > 0) {
        b.classList.add("has-items");
      } else {
        b.classList.remove("has-items");
      }
    });
  }

  function syncHeartButtons() {
    const items = loadWishlist();
    const heartBtns = document.querySelectorAll(".wishlist-toggle");
    heartBtns.forEach((btn) => {
      const pid = btn.getAttribute("data-product-id");
      if (pid && items.includes(pid)) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-label", "Remove from Wishlist");
      } else {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-label", "Add to Wishlist");
      }
    });
  }

  return {
    getItems: function () {
      return loadWishlist();
    },

    getCount: function () {
      return loadWishlist().length;
    },

    hasItem: function (productId) {
      const items = loadWishlist();
      return items.includes(productId);
    },

    toggle: function (productId) {
      let items = loadWishlist();
      const index = items.indexOf(productId);
      let inWishlist = false;

      if (index > -1) {
        items.splice(index, 1);
        inWishlist = false;
      } else {
        items.push(productId);
        inWishlist = true;
      }

      saveWishlist(items);
      return inWishlist;
    },

    remove: function (productId) {
      let items = loadWishlist();
      items = items.filter(id => id !== productId);
      saveWishlist(items);
    },

    clear: function () {
      saveWishlist([]);
    },

    syncUI: function () {
      updateWishlistBadges();
      syncHeartButtons();
    },

    moveToCart: function (productId) {
      if (typeof NovaraCatalog !== "undefined" && typeof NovaraCart !== "undefined") {
        const prod = NovaraCatalog.getById(productId);
        if (prod) {
          NovaraCart.addItem(prod);
          this.remove(productId);
          if (typeof NovaraApp !== "undefined") {
            NovaraApp.showToast("Added to Bag", `${prod.name} has been moved to your shopping bag.`, "bag");
          }
          return true;
        }
      }
      return false;
    },

    moveAllToCart: function () {
      const items = this.getItems();
      if (items.length === 0) return;

      let count = 0;
      items.forEach((id) => {
        const prod = NovaraCatalog.getById(id);
        if (prod) {
          NovaraCart.addItem(prod);
          count++;
        }
      });

      this.clear();
      if (typeof NovaraApp !== "undefined") {
        NovaraApp.showToast("All Items Added", `Moved ${count} items from your wishlist to your bag.`, "bag");
      }
    }
  };
})();

// Cross-tab synchronization
window.addEventListener("storage", function (e) {
  if (e.key === "novara_wishlist_v1") {
    NovaraWishlist.syncUI();
  }
});

// Auto-sync on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  NovaraWishlist.syncUI();
});

if (typeof window !== "undefined") {
  window.NovaraWishlist = NovaraWishlist;
}
