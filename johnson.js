/* =====================================================
   TRIMEX CONNECT
   JAVASCRIPT
===================================================== */


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

/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("open");

    });


    /*
       Close mobile menu when
       a navigation link is clicked
    */

    const navItems =
        navigation.querySelectorAll("a");

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            navigation.classList.remove("open");

        });

    });

}



/* =====================================================
   SIMPLE SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".quick-card, .service-card, .gazette-card, .enrollment-panel"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.1
        }

    );


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});



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