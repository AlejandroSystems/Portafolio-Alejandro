/* =========================================================
   PORTAFOLIO ALEJANDRO ZÚÑIGA
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ELEMENTOS DEL DOM
    ====================================================== */

    const header = document.querySelector(".header");

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    const navLinks = document.querySelectorAll(".nav-link");

    const scrollTopButton = document.getElementById("scroll-top");

    const currentYear = document.getElementById("current-year");


    /* =====================================================
       2. MENÚ RESPONSIVE
    ====================================================== */

    const openMenu = () => {

        navMenu.classList.add("open");
        menuToggle.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    };


    const closeMenu = () => {

        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    };


    menuToggle.addEventListener("click", () => {

        const menuIsOpen =
            navMenu.classList.contains("open");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       3. CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
    ====================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       4. CERRAR MENÚ CON ESC
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       5. CERRAR MENÚ SI VOLVEMOS A DESKTOP
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {
            closeMenu();
        }

    });


    /* =====================================================
       6. HEADER AL HACER SCROLL
    ====================================================== */

    const updateHeader = () => {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    /* =====================================================
       7. BOTÓN VOLVER ARRIBA
    ====================================================== */

    const updateScrollButton = () => {

        if (window.scrollY > 500) {

            scrollTopButton.classList.add("visible");

        } else {

            scrollTopButton.classList.remove("visible");

        }

    };


    scrollTopButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       8. NAVEGACIÓN ACTIVA
    ====================================================== */

    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "inicio";


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                !href.startsWith("#")
            ) {
                return;
            }


            const section =
                document.querySelector(href);

            if (!section) {
                return;
            }


            if (
                scrollPosition >=
                section.offsetTop
            ) {
                currentSection =
                    section.id;
            }

        });


        /*
        Si estamos prácticamente arriba,
        siempre marcamos Inicio.
        */

        if (window.scrollY < 350) {
            currentSection = "inicio";
        }


        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    /* =====================================================
       9. AÑO AUTOMÁTICO DEL FOOTER
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       10. SCROLL PRINCIPAL
    ====================================================== */

    const handleScroll = () => {

        updateHeader();

        updateScrollButton();

        updateActiveNavigation();

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /*
    Ejecutamos una vez al cargar
    por si la página inicia desplazada.
    */

    handleScroll();


    /* =====================================================
       11. SCROLL SUAVE EN ENLACES INTERNOS
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const destination =
                        this.getAttribute("href");

                    if (
                        destination === "#" ||
                        !destination
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            destination
                        );

                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header.offsetHeight;

                    const targetPosition =
                        target.offsetTop -
                        headerHeight -
                        20;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });
/* =====================================================
   ANIMACIONES AL HACER SCROLL
====================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

    /* =====================================================
       12. MENSAJE DE DESARROLLO
    ====================================================== */

    console.log(
        "%c<AZ/> Portafolio cargado correctamente",
        `
        color: #38bdf8;
        font-size: 16px;
        font-weight: bold;
        `
    );

});