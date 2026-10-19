/*
 * PORTAFOLIO ALEJANDRO ZÚÑIGA
 * script.js — navegación, accesibilidad y animaciones.
 * No requiere bibliotecas externas ni una etapa de compilación.
 */

// Con JS deshabilitado el contenido debe seguir siendo visible.
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const scrollTopButton = document.getElementById("scroll-top");
    const currentYear = document.getElementById("current-year");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollBehavior = () => reducedMotion.matches ? "auto" : "smooth";

    // 1. Menú móvil: estado accesible, cierre mediante Escape y clic externo.
    function setMenuOpen(isOpen, returnFocus = false) {
        if (!menuToggle || !navMenu) return;
        navMenu.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
        if (returnFocus) menuToggle.focus();
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            setMenuOpen(!navMenu.classList.contains("open"));
        });
        navLinks.forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && navMenu.classList.contains("open")) {
                setMenuOpen(false, true);
            }
        });
        document.addEventListener("click", event => {
            if (navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                setMenuOpen(false);
            }
        });
        window.addEventListener("resize", () => {
            if (window.innerWidth > 850 && navMenu.classList.contains("open")) {
                setMenuOpen(false);
            }
        });
    }

    // 2. Menú activo según la sección que aparece en pantalla.
    const sections = navLinks.map(link => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#") || href === "#") return null;
        const element = document.getElementById(href.slice(1));
        return element ? { link, element } : null;
    }).filter(Boolean);

    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + (header?.offsetHeight ?? 76) + 105;
        let currentId = "inicio";
        for (const { element } of sections) {
            if (scrollPosition >= element.getBoundingClientRect().top + window.scrollY) {
                currentId = element.id;
            }
        }
        if (window.scrollY < 180) currentId = "inicio";
        for (const link of navLinks) {
            const isActive = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", isActive);
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        }
    }

    // 3. Eventos de desplazamiento agrupados por fotograma.
    function updateOnScroll() {
        header?.classList.toggle("scrolled", window.scrollY > 20);
        scrollTopButton?.classList.toggle("visible", window.scrollY > 500);
        updateActiveNavigation();
    }
    let framePending = false;
    window.addEventListener("scroll", () => {
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(() => {
            updateOnScroll();
            framePending = false;
        });
    }, { passive: true });
    updateOnScroll();

    // 4. Volver arriba, respetando el ajuste de movimiento reducido.
    scrollTopButton?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });

    // 5. Enlaces internos: tener en cuenta el encabezado fijo.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.getElementById(href.slice(1));
            if (!target) return;
            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY -
                        (header?.offsetHeight ?? 0) - 20;
            window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
            // Conservar un enlace profundo navegable y un historial útil.
            if (window.location.hash !== href) {
                window.history.pushState(null, "", href);
            }
            // Devolver el foco al contenido cuando se cierra el menú móvil.
            if (anchor.closest("#nav-menu") && target !== header) {
                const hadTabindex = target.hasAttribute("tabindex");
                if (!hadTabindex) target.setAttribute("tabindex", "-1");
                target.focus({ preventScroll: true });
                if (!hadTabindex) target.addEventListener("blur", () => {
                    target.removeAttribute("tabindex");
                }, { once: true });
            }
        });
    });

    // 6. Revelar contenido; mantenerlo visible si no hay observador o si
    //    se ha pedido reducir el movimiento.
    const revealElements = document.querySelectorAll(".reveal");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        revealElements.forEach(element => element.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.15 });
        revealElements.forEach(element => observer.observe(element));
    }

    // 7. Año actual y cambios de historial (Atrás/Adelante).
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
    window.addEventListener("popstate", () => {
        const id = window.location.hash.slice(1);
        if (!id) {
            window.scrollTo({ top: 0, behavior: scrollBehavior() });
        } else {
            const element = document.getElementById(id);
            if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY -
                            (header?.offsetHeight ?? 0) - 20;
                window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
            }
        }
    });
});
