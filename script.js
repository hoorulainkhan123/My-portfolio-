/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {

        if (preloader) {
            preloader.classList.add("hide");
        }

    }, 1200);

});


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });

    function animateCursor() {

        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;

        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav, {
    passive: true
});

window.addEventListener("resize", updateActiveNav);

updateActiveNav();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("show");

    });

}


/* =========================================
   PROJECT CARD 3D TILT
========================================= */

const cards = document.querySelectorAll(
    ".skill-card, .project-card"
);

const supportsHover =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;


if (supportsHover) {

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", () => {

        const button =
            contactForm.querySelector(".form-button");

        if (button) {

            button.innerHTML =
                "Opening Email... <span>→</span>";

        }

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   BUTTON INTERACTION
========================================= */

const buttons = document.querySelectorAll(
    ".primary-button, .secondary-button, .nav-button"
);

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform =
            "translateY(-3px)";

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* =========================================
   ESCAPE KEY — CLOSE MOBILE MENU
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }

});
/* =========================================
   SCROLL PROGRESS
========================================= */

const scrollProgress = document.createElement("div");

scrollProgress.className = "scroll-progress";

document.body.appendChild(scrollProgress);


function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================
   MAGNETIC BUTTONS
========================================= */

const magneticButtons = document.querySelectorAll(
    ".primary-button, .secondary-button, .nav-button"
);


if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    magneticButtons.forEach((button) => {

        button.addEventListener("mousemove", (event) => {

            const rect = button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}


/* =========================================
   HERO ENTRANCE
========================================= */

window.addEventListener("load", () => {

    const heroElements = document.querySelectorAll(
        ".hero-content > *, .hero-visual"
    );

    heroElements.forEach((element, index) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";

        setTimeout(() => {

            element.style.transition =
                "opacity .8s ease, transform .8s ease";

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }, 250 + (index * 120));

    });

});