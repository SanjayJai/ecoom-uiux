/**
 * NOVARA - Interactive Search Experience
 * Debounced live search, suggestion pills, instant keyboard navigation & overlay controls
 */

const NovaraSearch = (function () {
  let debounceTimer = null;
  const DEBOUNCE_DELAY = 220;

  function init() {
    const searchOverlay = document.getElementById("search-overlay");
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("search-clear");
    const closeBtn = document.getElementById("search-close");
    const searchBackdrop = document.getElementById("search-backdrop");
    const openBtns = document.querySelectorAll(".search-trigger-btn");
    const pillTags = document.querySelectorAll(".tag-pill");

    // Open triggers
    openBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openSearch();
      });
    });

    // Close triggers
    if (closeBtn) {
      closeBtn.addEventListener("click", closeSearch);
    }
    if (searchBackdrop) {
      searchBackdrop.addEventListener("click", closeSearch);
    }

    // Escape key listener
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (searchOverlay && searchOverlay.classList.contains("is-open")) {
          closeSearch();
        }
      }
    });

    // Input typing with debounce
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        const query = e.target.value.trim();

        if (clearBtn) {
          if (query.length > 0) {
            clearBtn.classList.add("is-visible");
          } else {
            clearBtn.classList.remove("is-visible");
          }
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          performSearch(query);
        }, DEBOUNCE_DELAY);
      });
    }

    // Clear button
    if (clearBtn && searchInput) {
      clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        clearBtn.classList.remove("is-visible");
        performSearch("");
        searchInput.focus();
      });
    }

    // Search suggestion pills
    pillTags.forEach((pill) => {
      pill.addEventListener("click", function () {
        const text = this.getAttribute("data-query") || this.textContent.trim();
        if (searchInput) {
          searchInput.value = text;
          if (clearBtn) clearBtn.classList.add("is-visible");
          performSearch(text);
        }
      });
    });
  }

  function openSearch() {
    const overlay = document.getElementById("search-overlay");
    const backdrop = document.getElementById("search-backdrop");
    const input = document.getElementById("search-input");

    if (overlay && backdrop) {
      overlay.classList.add("is-open");
      backdrop.classList.add("is-active");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (input) input.focus();
      }, 100);
    }
  }

  function closeSearch() {
    const overlay = document.getElementById("search-overlay");
    const backdrop = document.getElementById("search-backdrop");

    if (overlay && backdrop) {
      overlay.classList.remove("is-open");
      backdrop.classList.remove("is-active");
      document.body.style.overflow = "";
    }
  }

  function performSearch(query) {
    const resultsContainer = document.getElementById("search-results");
    const resultsCountEl = document.getElementById("search-results-count");
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = "";
      if (resultsCountEl) resultsCountEl.textContent = "";
      return;
    }

    if (typeof PRODUCTS_DATA === "undefined") return;

    const lower = query.toLowerCase();
    const matches = PRODUCTS_DATA.filter((p) => {
      return (
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some(t => t.toLowerCase().includes(lower)) ||
        (p.description && p.description.toLowerCase().includes(lower))
      );
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = `${matches.length} ${matches.length === 1 ? "result" : "results"} found for "${query}"`;
    }

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 2.5rem 1rem;">
          <h5 class="empty-state-title" style="font-size: 1.1rem;">No matching items found</h5>
          <p class="empty-state-text" style="font-size: 0.85rem;">Try adjusting your keywords or browse our core collections.</p>
          <a href="shop.html" class="btn btn-secondary btn-sm" onclick="NovaraSearch.closeSearch()">View All Collections</a>
        </div>
      `;
      return;
    }

    let html = "";
    matches.slice(0, 8).forEach((prod) => {
      html += `
        <a href="product.html?id=${prod.id}" class="search-result-item" onclick="NovaraSearch.closeSearch()">
          <img src="${prod.primaryImage}" alt="${prod.name}" class="search-result-thumb" loading="lazy">
          <div class="search-result-info">
            <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--color-muted);">${prod.category}</span>
            <h6>${prod.name}</h6>
            <p>₹${prod.price.toLocaleString("en-IN")}</p>
          </div>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
  }

  return {
    init: init,
    openSearch: openSearch,
    closeSearch: closeSearch,
    performSearch: performSearch
  };
})();

// Auto-initialize on load
document.addEventListener("DOMContentLoaded", function () {
  NovaraSearch.init();
});

if (typeof window !== "undefined") {
  window.NovaraSearch = NovaraSearch;
}
