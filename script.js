/* PORTAFOLIO ALEJANDRO ZÚÑIGA — v2
 * Navegación lateral en escritorio, menú móvil accesible y animaciones.
 * No requiere librerías externas.
 */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const scrollTopButton = document.getElementById("scroll-top");
    const currentYear = document.getElementById("current-year");
    const sidebarYear = document.querySelector(".sidebar-year");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileView = window.matchMedia("(max-width: 1000px)");
    const scrollBehavior = () => reducedMotion.matches ? "auto" : "smooth";
    const headerOffset = () => mobileView.matches ? (header?.offsetHeight ?? 70) : 0;

    function setMenuOpen(isOpen, returnFocus = false) {
        if (!menuToggle || !navMenu) return;
        const open = mobileView.matches && isOpen;
        navMenu.classList.toggle("open", open);
        menuToggle.classList.toggle("active", open);
        document.body.classList.toggle("menu-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        // El menú lateral cerrado no debe tener enlaces alcanzables con Tab.
        navMenu.inert = mobileView.matches && !open;
        if (returnFocus) menuToggle.focus();
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => setMenuOpen(!navMenu.classList.contains("open")));
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && navMenu.classList.contains("open")) setMenuOpen(false, true);
        });
        document.addEventListener("click", event => {
            if (navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                setMenuOpen(false);
            }
        });
        const syncMenu = () => setMenuOpen(false);
        if (mobileView.addEventListener) mobileView.addEventListener("change", syncMenu);
        else mobileView.addListener(syncMenu);
        syncMenu();
    }

    const sections = navLinks.map(link => {
        const href = link.getAttribute("href");
        if (!href?.startsWith("#") || href === "#") return null;
        const element = document.getElementById(href.slice(1));
        return element ? { link, element } : null;
    }).filter(Boolean);

    function updateActiveNavigation() {
        const mark = window.scrollY + headerOffset() + 125;
        let currentId = "inicio";
        for (const { element } of sections) {
            if (mark >= element.getBoundingClientRect().top + window.scrollY) currentId = element.id;
        }
        if (window.scrollY < 80) currentId = "inicio";
        for (const link of navLinks) {
            const isActive = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", isActive);
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        }
    }

    function updateOnScroll() {
        header?.classList.toggle("scrolled", mobileView.matches && window.scrollY > 20);
        scrollTopButton?.classList.toggle("visible", window.scrollY > 450);
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
    window.addEventListener("resize", updateOnScroll);
    updateOnScroll();

    function goToTarget(target, updateHistory = true) {
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 18;
        window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
        if (updateHistory) {
            const hash = `#${target.id}`;
            if (window.location.hash !== hash) window.history.pushState(null, "", hash);
        }
        updateActiveNavigation();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.getElementById(href.slice(1));
            if (!target) return;
            event.preventDefault();
            const cameFromMenu = !!anchor.closest("#nav-menu");
            if (cameFromMenu) setMenuOpen(false);
            goToTarget(target);
            // El foco ayuda a usuarios de teclado y lectores de pantalla.
            if (cameFromMenu || anchor.classList.contains("skip-link")) {
                const originalTabindex = target.getAttribute("tabindex");
                target.setAttribute("tabindex", "-1");
                target.focus({ preventScroll: true });
                target.addEventListener("blur", () => {
                    if (originalTabindex === null) target.removeAttribute("tabindex");
                    else target.setAttribute("tabindex", originalTabindex);
                }, { once: true });
            }
        });
    });

    const onHistoryChange = () => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = id ? document.getElementById(id) : document.getElementById("inicio");
        if (target) goToTarget(target, false);
    };
    window.addEventListener("popstate", onHistoryChange);
    window.addEventListener("hashchange", onHistoryChange);

    scrollTopButton?.addEventListener("click", () => {
        const first = document.getElementById("inicio");
        if (first) goToTarget(first);
        else window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });

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
        }, { threshold: 0.08, rootMargin: "0px 0px 20px 0px" });
        revealElements.forEach(element => observer.observe(element));
    }

    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
    if (sidebarYear) sidebarYear.textContent = String(new Date().getFullYear());
    if (window.location.hash) {
        // Al abrir un enlace directo, aplicar el mismo offset del header móvil.
        window.requestAnimationFrame(() => {
            const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
            if (target) goToTarget(target, false);
        });
    }
});
