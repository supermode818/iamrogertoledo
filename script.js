
/* =====================================================
   ROGER TOLEDO
   THE EVOLUTION CODE®
   PREMIUM INTERACTION SYSTEM
   JAVASCRIPT V3.0
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       01. ELEMENTOS PRINCIPALES
    ================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav");

    const navLinks = document.querySelectorAll(".nav a");

    const sections = document.querySelectorAll(
        ".hero[id], .page-section[id]"
    );

    const yearElement = document.querySelector("#current-year");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =================================================
       02. MENÚ RESPONSIVE
    ================================================= */

    function openMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.add("open");

        menuToggle.classList.add("is-active");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute("aria-label", "Cerrar menú");

    }


    function closeMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.remove("open");

        menuToggle.classList.remove("is-active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menú");

    }


    function toggleMenu() {

        if (!navigation) return;

        const isOpen = navigation.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", toggleMenu);

        // Cerrar al seleccionar un enlace

        navLinks.forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Cerrar al pulsar Escape

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        });


        // Cerrar al hacer clic fuera del menú

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navigation.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                navigation.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMenu();

            }

        });


        // Cerrar si se cambia a escritorio

        window.addEventListener("resize", () => {

            if (window.innerWidth > 680) {

                closeMenu();

            }

        });

    }


    /* =================================================
       03. NAVEGACIÓN SUAVE
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            let target;

            try {

                target = document.querySelector(targetId);

            } catch {

                return;

            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: reducedMotion ? "instant" : "smooth",

                block: "start"

            });

            // Actualizar navegación

            updateActiveLink(targetId);

        });

    });


    /* =================================================
       04. ESTADO ACTIVO DE LA NAVEGACIÓN
    ================================================= */

    function updateActiveLink(hash) {

        navLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") === hash;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "location");

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }


    // Estado inicial

    updateActiveLink("#inicio");


    /* =================================================
       05. DETECCIÓN DE SECCIONES AL DESPLAZARSE
    ================================================= */

    if ("IntersectionObserver" in window) {

        const observableSections = Array.from(sections).filter(
            section => section.getBoundingClientRect().height > 10
        );

        if (observableSections.length) {

            const sectionObserver = new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        updateActiveLink("#" + entry.target.id);

                    });

                },

                {
                    root: null,
                    rootMargin: "-20% 0px -65% 0px",
                    threshold: 0
                }

            );

            observableSections.forEach(section => {

                sectionObserver.observe(section);

            });

        }

    }


    /* =================================================
       06. ANIMACIÓN DE PILARES
    ================================================= */

    const pillars = document.querySelectorAll(".pillar");

    if (
        "IntersectionObserver" in window &&
        !reducedMotion &&
        pillars.length
    ) {

        const pillarObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        pillarObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

        pillars.forEach(pillar => {

            pillarObserver.observe(pillar);

        });

    } else {

        pillars.forEach(pillar => {

            pillar.classList.add("is-visible");

        });

    }


    /* =================================================
       07. EFECTOS DE BOTONES
    ================================================= */

    const interactiveButtons = document.querySelectorAll(
        ".btn, .join-top"
    );

    interactiveButtons.forEach(button => {

        button.addEventListener("pointerdown", () => {

            button.classList.add("is-pressed");

        });

        ["pointerup", "pointerleave", "pointercancel"].forEach(
            eventName => {

                button.addEventListener(eventName, () => {

                    button.classList.remove("is-pressed");

                });

            }
        );

    });


    /* =================================================
       08. AÑO AUTOMÁTICO
    ================================================= */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* =================================================
       09. CARGA DE IMAGEN
    ================================================= */

    const portrait = document.querySelector(".portrait-image");

    if (portrait) {

        portrait.addEventListener("error", () => {

            console.error(
                "No se pudo cargar la fotografía: asset/yo.png"
            );

        });

        portrait.addEventListener("load", () => {

            portrait.classList.add("image-loaded");

        });

    }


    /* =================================================
       10. DIAGNÓSTICO DE MARCA
    ================================================= */

    console.log(
        "%c ROGER TOLEDO ",
        "background:#f20b16;color:#fff;font-size:20px;font-weight:800;padding:10px 16px;"
    );

    console.log(
        "%c THE EVOLUTION CODE® ",
        "color:#f20b16;font-size:13px;font-weight:800;letter-spacing:3px;"
    );

    console.log(
        "%c Website initialized successfully.",
        "color:#999;font-size:11px;"
    );

});
