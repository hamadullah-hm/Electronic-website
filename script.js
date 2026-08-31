document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode Theme Toggle
    const themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
        // Load saved state
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            themeBtn.classList.remove("fa-moon");
            themeBtn.classList.add("fa-sun");
        } else {
            document.body.classList.remove("dark-mode");
            themeBtn.classList.remove("fa-sun");
            themeBtn.classList.add("fa-moon");
        }

        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");

            if (isDark) {
                themeBtn.classList.remove("fa-moon");
                themeBtn.classList.add("fa-sun");
            } else {
                themeBtn.classList.remove("fa-sun");
                themeBtn.classList.add("fa-moon");
            }
        });
    }

    // 2. Grayscale (Black & White) Toggle
    const grayscaleBtn = document.getElementById("grayscale-btn");
    if (grayscaleBtn) {
        // Load saved state
        const savedGrayscale = localStorage.getItem("grayscale");
        if (savedGrayscale === "enabled") {
            document.body.classList.add("grayscale");
        } else {
            document.body.classList.remove("grayscale");
        }

        grayscaleBtn.addEventListener("click", () => {
            document.body.classList.toggle("grayscale");
            const isGrayscale = document.body.classList.contains("grayscale");
            localStorage.setItem("grayscale", isGrayscale ? "enabled" : "disabled");
        });
    }

    // 3. Counter Animation Logic
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let count = 0;

        const updateCounter = () => {
            const increment = target / 100;

            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count).toLocaleString();
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };

        updateCounter();
    });

    // 4. Header Scroll Effect (Shrink & Glassmorphism intensity increase)
    const header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
});