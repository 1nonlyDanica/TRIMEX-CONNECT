/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (!navbar) return;

    if (window.scrollY > 20) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});
/* =========================================
   CCS-MS DROPDOWN
========================================= */

const navDropdown = document.querySelector(".nav-dropdown");
const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");

if (navDropdown && navDropdownToggle) {

    navDropdownToggle.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        navDropdown.classList.toggle("open");

    });


    /* Close when clicking somewhere else */

    document.addEventListener("click", (event) => {

        if (!navDropdown.contains(event.target)) {
            navDropdown.classList.remove("open");
        }

    });


    /* Close after selecting a service */

    const dropdownLinks =
        navDropdown.querySelectorAll(".nav-dropdown-menu a");

    dropdownLinks.forEach(link => {

        link.addEventListener("click", () => {

            navDropdown.classList.remove("open");

        });

    });


    /* Close with ESC */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            navDropdown.classList.remove("open");
        }

    });

}
// ========================================
// MOBILE NAVIGATION
// ========================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    // Open and close the main navigation
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    // CCS-MS dropdown
    const dropdowns = navLinks.querySelectorAll(".nav-dropdown");

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");

        if (!toggle) return;

        toggle.setAttribute("aria-expanded", "false");

        toggle.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const willOpen = !dropdown.classList.contains("open");

            // Close other dropdowns first
            dropdowns.forEach(otherDropdown => {
                otherDropdown.classList.remove("open");

                const otherToggle = otherDropdown.querySelector(
                    ".nav-dropdown-toggle"
                );

                if (otherToggle) {
                    otherToggle.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle the selected dropdown
            if (willOpen) {
                dropdown.classList.add("open");
                toggle.setAttribute("aria-expanded", "true");
            }
        });
    });

    // Close navigation after choosing a page or service
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuButton.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");

            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("open");

                const toggle = dropdown.querySelector(
                    ".nav-dropdown-toggle"
                );

                if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    });

    // Close the menu when the user taps outside it
    document.addEventListener("click", event => {
        if (
            !navLinks.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            navLinks.classList.remove("open");
            menuButton.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");

            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("open");

                const toggle = dropdown.querySelector(
                    ".nav-dropdown-toggle"
                );

                if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        }
    });
}



/* =====================================================
   CURRENT PAGE NAVIGATION
===================================================== */

const currentPage =
    window.location.pathname.split("/").pop();

const navigationLinks =
    document.querySelectorAll(".navigation a");

navigationLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href");

    if (
        linkPage === currentPage &&
        !link.classList.contains("enroll-button")
    ) {

        link.classList.add("active");

    }

});

/* =========================================
   GAZETTE VIDEO FEATURE
========================================= */

const gazetteButtons = document.querySelectorAll(".gazette-preview-btn");

const gazetteVideo = document.getElementById("gazetteVideo");
const videoOverlay = document.getElementById("videoOverlay");
const videoPlay = document.getElementById("videoPlay");

const gazetteVideoTitle = document.getElementById("gazetteVideoTitle");
const gazetteVideoDescription = document.getElementById("gazetteVideoDescription");

const gazetteFeature = document.getElementById("gazetteFeature");


/* PLAY BUTTON */

if (gazetteVideo && videoOverlay && videoPlay) {

    videoPlay.addEventListener("click", () => {
        gazetteVideo.play();
        videoOverlay.classList.add("hidden");
    });

    gazetteVideo.addEventListener("play", () => {
        videoOverlay.classList.add("hidden");
    });

    gazetteVideo.addEventListener("pause", () => {
        if (gazetteVideo.currentTime === 0) {
            videoOverlay.classList.remove("hidden");
        }
    });

    gazetteVideo.addEventListener("ended", () => {
        videoOverlay.classList.remove("hidden");
    });
}


/* VOLUME / PUBLICATION SELECTION */

gazetteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedGazette = button.dataset.gazette;

        if (selectedGazette === "vol1") {

            if (gazetteVideoTitle) {
                gazetteVideoTitle.textContent =
                    "CCS Gazette — Volume 01";
            }

            if (gazetteVideoDescription) {
                gazetteVideoDescription.textContent =
                    "Explore the stories, activities, announcements, and student moments featured in CCS Gazette Volume 01.";
            }

        }

        if (selectedGazette === "vol2") {

            if (gazetteVideoTitle) {
                gazetteVideoTitle.textContent =
                    "CCS Gazette — Volume 02";
            }

            if (gazetteVideoDescription) {
                gazetteVideoDescription.textContent =
                    "Explore the latest CCS stories, activities, announcements, and student moments featured in Gazette Volume 02.";
            }

        }

        if (gazetteFeature) {
            gazetteFeature.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});