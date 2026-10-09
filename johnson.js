
/* =====================================================
   TRIMEX CONNECT — MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        }
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });


    // ========================================
    // MOBILE BURGER MENU
    // ========================================

    const menuButton = document.querySelector(
        "#menuButton, .menu-button, .hamburger, .burger"
    );

    const navLinks = document.querySelector(
        "#navLinks, #navigation, .navbar .navigation, .nav-links"
    );

    function closeMobileMenu() {
        if (navLinks) {
            navLinks.classList.remove("open");
        }

        if (menuButton) {
            menuButton.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
            dropdown.classList.remove("open");

            const toggle = dropdown.querySelector(".nav-dropdown-toggle");

            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (menuButton && navLinks) {

        menuButton.setAttribute("aria-controls", navLinks.id || "navLinks");
        menuButton.setAttribute("aria-expanded", "false");

        if (menuButton.tagName === "BUTTON") {
            menuButton.setAttribute("type", "button");
        }

        menuButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = !navLinks.classList.contains("open");

            navLinks.classList.toggle("open", isOpen);
            menuButton.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));

            if (!isOpen) {
                closeDropdowns();
            }
        });

        // Close the menu when a page link is selected.
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (link.classList.contains("nav-dropdown-toggle")) {
                    return;
                }

                closeMobileMenu();
            });
        });

        // Close when tapping outside the menu.
        document.addEventListener("click", event => {
            if (
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        // Close when Escape is pressed.
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        // Reset the menu when returning to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        }, { passive: true });
    }


    // ========================================
    // CCS-MS DROPDOWN
    // ========================================

    function closeDropdowns(except = null) {
        document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
            if (dropdown === except) return;

            dropdown.classList.remove("open");

            const toggle = dropdown.querySelector(".nav-dropdown-toggle");

            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    document.querySelectorAll(".nav-dropdown").forEach(dropdown => {

        const toggle = dropdown.querySelector(".nav-dropdown-toggle");

        if (!toggle) return;

        if (toggle.tagName === "BUTTON") {
            toggle.setAttribute("type", "button");
        }

        toggle.setAttribute("aria-expanded", "false");

        toggle.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = !dropdown.classList.contains("open");

            closeDropdowns(dropdown);

            dropdown.classList.toggle("open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });
    });


    // ========================================
    // ACTIVE NAVIGATION LINK
    // ========================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(
        ".navigation a, .nav-links a, .footer-links a"
    ).forEach(link => {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            link.classList.contains("nav-dropdown-toggle")
        ) {
            return;
        }

        const linkPage = href.split("/").pop().split("?")[0];

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    // ========================================
    // REVEAL CARDS ON SCROLL
    // ========================================

    const revealItems = document.querySelectorAll(
        ".quick-card, .service-card, .gazette-card, " +
        ".enrollment-panel, .service-directory-card, .announcement-card"
    );

    if ("IntersectionObserver" in window && revealItems.length) {

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(item => observer.observe(item));

    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }


    // ========================================
    // ENROLLMENT OPTION SELECTION
    // ========================================

    const enrollmentOptions =
        document.querySelectorAll(".enrollment-option");

    const enrollmentNextStep =
        document.getElementById("enrollmentNextStep");

    const selectedTitle =
        document.getElementById("selectedTitle");

    const selectedMessage =
        document.getElementById("selectedMessage");

    const nextStepAction =
        document.getElementById("nextStepAction");

    const enrollmentMessages = {
        new: {
            title: "New Student selected.",
            message:
                "Review the requirements and enrollment instructions for new students before starting your application.",
            action: "NEXT: REVIEW NEW STUDENT REQUIREMENTS"
        },

        current: {
            title: "Current / Old Student selected.",
            message:
                "Check the enrollment instructions for returning students and prepare the information needed for enrollment.",
            action: "NEXT: REVIEW RETURNING STUDENT REQUIREMENTS"
        },

        transferee: {
            title: "Transferee selected.",
            message:
                "Review the requirements and enrollment instructions specifically provided for transferees.",
            action: "NEXT: REVIEW TRANSFEREE REQUIREMENTS"
        }
    };

    function selectEnrollment(card) {
        const selection = enrollmentMessages[card.dataset.type];

        if (!selection) return;

        enrollmentOptions.forEach(option => {
            option.classList.remove("selected");

            const button = option.querySelector(".enrollment-btn");

            if (button) {
                button.textContent = "SELECT THIS";
            }

            option.setAttribute("aria-pressed", "false");
        });

        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");

        const selectedButton = card.querySelector(".enrollment-btn");

        if (selectedButton) {
            selectedButton.textContent = "SELECTED";
        }

        if (selectedTitle) {
            selectedTitle.textContent = selection.title;
        }

        if (selectedMessage) {
            selectedMessage.textContent = selection.message;
        }

        if (nextStepAction) {
            nextStepAction.textContent = selection.action;
        }

        if (enrollmentNextStep) {
            enrollmentNextStep.classList.add("active");
        }
    }

    enrollmentOptions.forEach(card => {
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-pressed",
            card.classList.contains("selected") ? "true" : "false"
        );

        card.addEventListener("click", () => selectEnrollment(card));

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectEnrollment(card);
            }
        });
    });

});