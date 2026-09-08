document.addEventListener("DOMContentLoaded", () => {
    // ========================================================
    // 0. Ultra-Aesthetic Cyber Preloader System (Fast, Smooth & Non-Blocking)
    // ========================================================
    const initPreloader = () => {
        const preloader = document.getElementById("preloader");
        if (!preloader) return;

        const progressFill = document.getElementById("loader-progress-fill");
        const percentageText = document.getElementById("loader-percentage");
        const statusText = document.getElementById("loader-status");

        let progress = 0;
        document.body.classList.add("preloader-active");

        const statusMessages = [
            "Initializing Neural Tech Core",
            "Loading Flagship Catalog & Specs",
            "Calibrating Interactive Displays",
            "Optimizing ElectroHub Experience",
            "Welcome to ElectroHub"
        ];

        const updateStatus = (currentProgress) => {
            if (!statusText) return;
            if (currentProgress < 25) {
                statusText.innerHTML = `${statusMessages[0]}<span class="dots"></span>`;
            } else if (currentProgress < 55) {
                statusText.innerHTML = `${statusMessages[1]}<span class="dots"></span>`;
            } else if (currentProgress < 85) {
                statusText.innerHTML = `${statusMessages[2]}<span class="dots"></span>`;
            } else if (currentProgress < 100) {
                statusText.innerHTML = `${statusMessages[3]}<span class="dots"></span>`;
            } else {
                statusText.innerHTML = `${statusMessages[4]} ✨`;
            }
        };

        const dismissPreloader = () => {
            if (preloader.classList.contains("loaded")) return;
            preloader.classList.add("loaded");
            document.body.classList.remove("preloader-active");

            // Trigger entrance animations
            document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up, .reveal-zoom").forEach(el => {
                el.classList.add("reveal-active");
            });

            setTimeout(() => {
                preloader.style.display = "none";
                preloader.style.visibility = "hidden";
            }, 500);
        };

        // Smooth controlled progress timer (~1.2s duration)
        const startTime = Date.now();
        const targetDuration = 1100;

        const loaderInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(100, Math.floor((elapsed / targetDuration) * 100));

            if (progressFill) progressFill.style.width = `${progress}%`;
            if (percentageText) percentageText.innerText = progress;
            updateStatus(progress);

            if (progress >= 100) {
                clearInterval(loaderInterval);
                updateStatus(100);
                setTimeout(dismissPreloader, 250);
            }
        }, 20);

        // Absolute safety fallback (dismiss after 1.5s max unconditionally)
        setTimeout(() => {
            clearInterval(loaderInterval);
            if (progressFill) progressFill.style.width = "100%";
            if (percentageText) percentageText.innerText = "100";
            dismissPreloader();
        }, 1500);
    };

    initPreloader();

    // ========================================================
    // 1. Cinematic Scroll Reveal Animation Engine (Left-to-Right, Up, Zoom)
    // ========================================================
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll(
            ".reveal-left, .reveal-right, .reveal-up, .reveal-zoom"
        );

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("reveal-active");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -30px 0px"
                }
            );

            revealElements.forEach((el) => revealObserver.observe(el));
        } else {
            revealElements.forEach((el) => el.classList.add("reveal-active"));
        }
    };

    initScrollReveal();

    // ========================================================
    // 2. Header Scroll Glassmorphic Effects & ScrollSpy Navigation
    // ========================================================
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll("#navbar .nav-link, .drawer-nav-link");
    const sections = document.querySelectorAll("section[id]");

    const handleHeaderScroll = () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    const highlightActiveNav = () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 160;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    };

    window.addEventListener("scroll", highlightActiveNav, { passive: true });

    // Smooth scroll for all on-page hash links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#" || !targetId.startsWith("#")) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update active class immediately on click
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === targetId) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });

                // Auto close mobile drawer if open
                toggleMobileMenu(false);
            }
        });
    });

    // ========================================================
    // 3. Cyber Mobile Navigation Drawer Controller
    // ========================================================
    const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileMenuCloseBtn = document.getElementById("mobile-menu-close");
    const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
    const navbar = document.getElementById("navbar");

    const toggleMobileMenu = (forceState) => {
        const isCurrentlyOpen = (mobileDrawer && mobileDrawer.classList.contains("open")) || 
                                (navbar && navbar.classList.contains("mobile-active"));
        const shouldOpen = forceState !== undefined ? forceState : !isCurrentlyOpen;

        if (shouldOpen) {
            if (mobileDrawer) mobileDrawer.classList.add("open");
            if (navbar) navbar.classList.add("mobile-active");
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.add("active");
                mobileMenuBtn.setAttribute("aria-expanded", "true");
            }
            if (mobileNavOverlay) mobileNavOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        } else {
            if (mobileDrawer) mobileDrawer.classList.remove("open");
            if (navbar) navbar.classList.remove("mobile-active");
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove("active");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
            }
            if (mobileNavOverlay) mobileNavOverlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMobileMenu(false);
        });
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener("click", () => {
            toggleMobileMenu(false);
        });
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            toggleMobileMenu(false);
        }
    });

    // Sync drawer search input with global search
    const globalSearch = document.getElementById("global-search-input");
    const drawerSearch = document.getElementById("drawer-search-input");
    if (drawerSearch && globalSearch) {
        drawerSearch.addEventListener("input", (e) => {
            globalSearch.value = e.target.value;
            globalSearch.dispatchEvent(new Event("input"));
        });
    }

    // ========================================================
    // 4. Wishlist State & Live Counter Synchronization
    // ========================================================
    const wishlistBadges = document.querySelectorAll(".wishlist-badge-count");
    let wishlistItems = JSON.parse(localStorage.getItem("electrohub_wishlist") || "[]");

    const updateWishlistDisplay = () => {
        const count = wishlistItems.length;
        wishlistBadges.forEach((badge) => {
            badge.innerText = count;
            badge.style.transform = "scale(1.35)";
            setTimeout(() => {
                badge.style.transform = "scale(1)";
            }, 300);
        });
    };

    updateWishlistDisplay();

    // ========================================================
    // 4. Counter Animation Logic with Intersection Observer
    // ========================================================
    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0) {
        const animateCounters = (counter) => {
            const target = Number(counter.dataset.target);
            let count = 0;
            const duration = 1600;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.innerText = target.toLocaleString() + "+";
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(count).toLocaleString();
                }
            }, stepTime);
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateCounters(entry.target);
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.25 }
            );

            counters.forEach((counter) => observer.observe(counter));
        } else {
            counters.forEach((counter) => animateCounters(counter));
        }
    }

    // ========================================================
    // 5. Header Scroll Shadow & Blur Effect
    // ========================================================
    const header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // ========================================================
    // 6. Toast Notification System
    // ========================================================
    const toast = document.getElementById("toast-notification");
    const toastTitle = document.getElementById("toast-title");
    const toastMsg = document.getElementById("toast-msg");
    let toastTimeout;

    const showToast = (title, message, isSuccess = true) => {
        if (!toast) return;
        clearTimeout(toastTimeout);

        if (toastTitle) toastTitle.innerText = title;
        if (toastMsg) toastMsg.innerText = message;

        const icon = toast.querySelector(".toast-icon");
        if (icon) {
            icon.className = isSuccess
                ? "fa-solid fa-circle-check toast-icon"
                : "fa-solid fa-heart toast-icon";
            icon.style.color = isSuccess ? "#10b981" : "#ef4444";
        }

        toast.classList.add("show");

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    };

    // ========================================================
    // 7. Cart Badge Count State
    // ========================================================
    const cartBadges = document.querySelectorAll(".cart-badge-count");
    let cartTotalCount = parseInt(localStorage.getItem("cartCount") || "0", 10);

    const updateCartCount = (count) => {
        cartTotalCount = count;
        localStorage.setItem("cartCount", cartTotalCount.toString());
        cartBadges.forEach((badge) => {
            badge.innerText = cartTotalCount;
            badge.style.transform = "scale(1.35)";
            setTimeout(() => {
                badge.style.transform = "scale(1)";
            }, 300);
        });
    };

    updateCartCount(cartTotalCount);

    // ========================================================
    // 8. Portfolio Category Filtering & Live Search
    // ========================================================
    const filterButtons = document.querySelectorAll(".buttons-div .buttons");
    const productCards = document.querySelectorAll(".boxes-container .box");
    const globalSearchInput = document.getElementById("global-search-input");
    const resultsCount = document.getElementById("results-count");

    let currentFilter = "all";
    let currentSearchTerm = "";

    const applyFilterAndSearch = () => {
        let visibleCount = 0;

        productCards.forEach((card) => {
            const category = card.dataset.category || "";
            const name = (card.dataset.name || "").toLowerCase();
            const desc = (card.dataset.desc || "").toLowerCase();
            const specs = (card.dataset.specs || "").toLowerCase();

            const matchesCategory = currentFilter === "all" || category === currentFilter;
            const matchesSearch =
                !currentSearchTerm ||
                name.includes(currentSearchTerm) ||
                desc.includes(currentSearchTerm) ||
                specs.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                card.classList.remove("hide-card");
                card.style.animation = "fadeInCard 0.4s ease forwards";
                visibleCount++;
            } else {
                card.classList.add("hide-card");
            }
        });

        if (resultsCount) {
            resultsCount.innerText = `Showing ${visibleCount} product${visibleCount === 1 ? "" : "s"}${
                currentFilter !== "all" ? ` in ${currentFilter}` : ""
            }${currentSearchTerm ? ` for "${currentSearchTerm}"` : ""}`;
        }
    };

    if (filterButtons.length > 0) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.dataset.filter || "all";
                applyFilterAndSearch();
            });
        });
    }

    if (globalSearchInput) {
        globalSearchInput.addEventListener("input", (e) => {
            currentSearchTerm = e.target.value.trim().toLowerCase();
            applyFilterAndSearch();

            // Smooth scroll to portfolio if searching while on other sections
            if (currentSearchTerm.length > 1) {
                const portfolioSection = document.getElementById("portfolio");
                if (portfolioSection) {
                    const rect = portfolioSection.getBoundingClientRect();
                    if (rect.top < -500 || rect.top > window.innerHeight) {
                        portfolioSection.scrollIntoView({ behavior: "smooth" });
                    }
                }
            }
        });
    }

    // ========================================================
    // 9. Interactive Product Quick View Modal
    // ========================================================
    const productModal = document.getElementById("product-modal");
    const modalClose = document.getElementById("modal-close");
    const modalImg = document.getElementById("modal-img");
    const modalBadge = document.getElementById("modal-badge");
    const modalCategory = document.getElementById("modal-category");
    const modalTitle = document.getElementById("modal-title");
    const modalRating = document.getElementById("modal-rating");
    const modalPrice = document.getElementById("modal-price");
    const modalOldPrice = document.getElementById("modal-old-price");
    const modalDesc = document.getElementById("modal-desc");
    const modalSpecs = document.getElementById("modal-specs");
    const modalAddToCart = document.getElementById("modal-add-to-cart");
    const qtyInput = document.getElementById("qty-input");
    const qtyMinus = document.getElementById("qty-minus");
    const qtyPlus = document.getElementById("qty-plus");

    let currentActiveProduct = null;

    const openProductModal = (card) => {
        if (!productModal) return;

        const name = card.dataset.name || "ElectroHub Premium Device";
        const price = card.dataset.price ? Number(card.dataset.price).toLocaleString() : "0";
        const oldPrice = card.dataset.originalPrice ? "Rs " + Number(card.dataset.originalPrice).toLocaleString() : "";
        const rating = card.dataset.rating || "4.9";
        const reviews = card.dataset.reviews || "100";
        const img = card.dataset.img || card.querySelector("img")?.src || "";
        const desc = card.dataset.desc || "Experience world-class technology with supreme durability and precision.";
        const specs = card.dataset.specs || "Premium Flagship Specs";
        const categoryTag = card.querySelector(".product-category-tag")?.innerText || "Flagship Series";

        currentActiveProduct = { name, price, img };

        if (modalImg) modalImg.src = img;
        if (modalCategory) modalCategory.innerText = categoryTag;
        if (modalTitle) modalTitle.innerText = name;
        if (modalRating) modalRating.innerText = `${rating} (${reviews} reviews)`;
        if (modalPrice) modalPrice.innerText = price;
        if (modalOldPrice) modalOldPrice.innerText = oldPrice;
        if (modalDesc) modalDesc.innerText = desc;
        if (modalSpecs) modalSpecs.innerText = specs;
        if (qtyInput) qtyInput.value = "1";

        productModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeProductModal = () => {
        if (!productModal) return;
        productModal.classList.remove("active");
        document.body.style.overflow = "";
    };

    // Card Details Triggers
    document.querySelectorAll(".view-details-trigger, .quick-view-btn").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = trigger.closest(".box");
            if (card) openProductModal(card);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeProductModal);
    }

    if (productModal) {
        productModal.addEventListener("click", (e) => {
            if (e.target === productModal) closeProductModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && productModal && productModal.classList.contains("active")) {
            closeProductModal();
        }
    });

    // Quantity Picker
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });

        qtyPlus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val < 10) qtyInput.value = val + 1;
        });
    }

    // Modal Add to Cart
    if (modalAddToCart) {
        modalAddToCart.addEventListener("click", () => {
            const qty = parseInt(qtyInput?.value || "1", 10);
            updateCartCount(cartTotalCount + qty);
            showToast("Added to Cart!", `${qty}x ${currentActiveProduct?.name || "Product"} added to your shopping cart.`, true);
            closeProductModal();
        });
    }

    // Direct Add to Cart on Card
    document.querySelectorAll(".add-to-cart-direct-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".box");
            const name = card?.dataset.name || "Product";
            updateCartCount(cartTotalCount + 1);
            showToast("Added to Cart!", `1x ${name} added to your cart.`, true);
        });
    });

    // Wishlist Toggle & Persistence
    const restoreWishlistUi = () => {
        document.querySelectorAll(".add-wishlist-btn").forEach((btn) => {
            const card = btn.closest(".box");
            const name = card?.dataset.name;
            const icon = btn.querySelector("i");
            if (name && wishlistItems.includes(name) && icon) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                icon.style.color = "#ef4444";
            }
        });
    };

    restoreWishlistUi();

    document.querySelectorAll(".add-wishlist-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".box");
            const name = card?.dataset.name || "ElectroHub Flagship Device";
            const icon = btn.querySelector("i");
            const isFav = icon.classList.contains("fa-solid");

            if (isFav) {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
                icon.style.color = "";
                wishlistItems = wishlistItems.filter((item) => item !== name);
                localStorage.setItem("electrohub_wishlist", JSON.stringify(wishlistItems));
                updateWishlistDisplay();
                showToast("Removed from Wishlist", `${name} removed from your favorites.`, false);
            } else {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                icon.style.color = "#ef4444";
                if (!wishlistItems.includes(name)) {
                    wishlistItems.push(name);
                }
                localStorage.setItem("electrohub_wishlist", JSON.stringify(wishlistItems));
                updateWishlistDisplay();
                showToast("Saved to Wishlist!", `${name} added to your favorites.`, false);
            }
        });
    });

    // ========================================================
    // 10. Interactive Contact Form Submission System
    // ========================================================
    const contactForm = document.getElementById("contact-form");
    const contactSubmitBtn = document.getElementById("contact-submit-btn");

    if (contactForm && contactSubmitBtn) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("contact-name");
            const emailInput = document.getElementById("contact-email");
            const subjectInput = document.getElementById("contact-subject");
            const messageInput = document.getElementById("contact-message");

            const nameVal = nameInput ? nameInput.value.trim() : "";
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const subjectVal = subjectInput ? subjectInput.value : "";
            const messageVal = messageInput ? messageInput.value.trim() : "";

            if (!nameVal || !emailVal || !subjectVal || !messageVal) {
                showToast("Required Fields Missing", "Please fill in your name, email, subject, and message.", false);
                return;
            }

            const btnText = contactSubmitBtn.querySelector(".btn-text");
            const btnSpinner = contactSubmitBtn.querySelector(".btn-loading-spinner");

            if (btnText && btnSpinner) {
                btnText.style.display = "none";
                btnSpinner.style.display = "inline-flex";
                contactSubmitBtn.disabled = true;
            }

            setTimeout(() => {
                if (btnText && btnSpinner) {
                    btnText.style.display = "inline-flex";
                    btnSpinner.style.display = "none";
                    contactSubmitBtn.disabled = false;
                }

                showToast(
                    "Message Transmitted!",
                    `Thank you, ${nameVal}. Our hardware specialists will contact you at ${emailVal} within 2 hours.`,
                    true
                );

                contactForm.reset();
            }, 850);
        });
    }
});