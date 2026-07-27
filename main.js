/* Caribbean Buildings — vanilla JS */

function initLenis() {
  if (typeof Lenis === "undefined") return null;
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  window.__lenis = lenis;

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  return lenis;
}

function initNav() {
  const nav = document.querySelector(".nav");
  const trigger = document.querySelector("[data-menu-trigger]");
  const overlay = document.querySelector("[data-menu-overlay]");
  const icon = document.querySelector("[data-menu-icon]");

  if (nav && !nav.classList.contains("nav--solid")) {
    const onScroll = () => {
      const y = window.__lenis?.scroll ?? window.scrollY ?? 0;
      nav.classList.toggle("is-scrolled", y > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on("scroll", onScroll);
    } else {
      requestAnimationFrame(() => {
        if (window.__lenis) window.__lenis.on("scroll", onScroll);
      });
    }
  }

  if (!trigger || !overlay) return;

  let open = false;
  trigger.addEventListener("click", () => {
    open = !open;
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
    if (icon) icon.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
  });
}

function initTransitions() {
  if (typeof gsap === "undefined") return;
  const overlay = document.querySelector("[data-page-transition]");
  const line = overlay?.querySelector("[data-page-line]");
  if (!overlay) return;

  let animating = false;

  document.addEventListener("click", (e) => {
    const link = e.target.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http") ||
      link.target === "_blank"
    ) {
      return;
    }
    if (animating) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    animating = true;
    gsap.set(overlay, { display: "block" });

    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = href;
      },
    });

    tl.fromTo(
      overlay,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.38, ease: "power3.inOut" }
    ).fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.32, ease: "power2.inOut" },
      "-=0.16"
    );
  });
}

function initRevealLines() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  document.querySelectorAll("[data-reveal-lines]").forEach((root) => {
    const inners = root.querySelectorAll(".reveal-lines__inner");
    gsap.fromTo(
      inners,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 82%" },
      }
    );
  });
}

function initImageReveals() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  });
}

function initHomeScroll() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  const hero = document.querySelector("[data-home-hero]");
  const heroImg = document.querySelector("[data-home-hero-img]");
  const heroText = document.querySelector("[data-home-hero-text]");
  const contextImg = document.querySelector("[data-context-img]");

  if (hero && heroImg) {
    gsap.to(heroImg, {
      scale: 1.12,
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }
  if (hero && heroText) {
    gsap.to(heroText, {
      yPercent: -60,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }
  if (contextImg) {
    gsap.to(contextImg, {
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        trigger: contextImg,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

function initProjectScroll() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  const hero = document.querySelector("[data-project-hero]");
  const img = document.querySelector("[data-project-hero-img]");
  if (!hero || !img) return;
  gsap.to(img, {
    scale: 1.1,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
  });
}

function initSlideIn() {
  if (typeof gsap === "undefined") return;
  const els = document.querySelectorAll("[data-slide-in]");
  if (!els.length) return;

  gsap.set(els, { x: 120, opacity: 0 });
  gsap.to(els, {
    x: 0,
    opacity: 1,
    duration: 1.4,
    ease: "power2.out",
    delay: 0.4,
    stagger: 0.08,
  });
}

function initServices() {
  const items = Array.from(document.querySelectorAll("[data-service]"));
  const images = document.querySelectorAll("[data-service-img]");
  if (!items.length) return;

  let index = Math.max(
    0,
    items.findIndex((el) => el.classList.contains("is-active"))
  );
  let timer = null;
  const mq = window.matchMedia("(max-width: 900px)");

  const activate = (i) => {
    index = ((i % items.length) + items.length) % items.length;
    const key = items[index].getAttribute("data-service");
    items.forEach((el, n) => el.classList.toggle("is-active", n === index));
    images.forEach((img) => {
      img.classList.toggle("is-active", img.getAttribute("data-service-img") === key);
    });
  };

  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    if (!mq.matches) return;
    timer = setInterval(() => activate(index + 1), 3000);
  };

  items.forEach((item, i) => {
    item.addEventListener("mouseenter", () => {
      if (mq.matches) return;
      activate(i);
    });
    item.addEventListener("focus", () => activate(i));
    item.addEventListener("click", () => {
      activate(i);
      if (mq.matches) startAuto();
    });
  });

  const onModeChange = () => {
    activate(index);
    if (mq.matches) startAuto();
    else stopAuto();
  };

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onModeChange);
  } else {
    mq.addListener(onModeChange);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else if (mq.matches) startAuto();
  });

  onModeChange();
}

function initLoader() {
  const loader = document.querySelector("[data-loader]");
  if (!loader) return;

  document.body.classList.add("no-scroll");
  const minMs = 900;
  const started = performance.now();

  const finish = () => {
    const wait = Math.max(0, minMs - (performance.now() - started));
    setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("no-scroll");
      setTimeout(() => loader.remove(), 600);
    }, wait);
  };

  if (document.readyState === "complete") finish();
  else window.addEventListener("load", finish, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initLenis();
  initNav();
  initTransitions();
  initRevealLines();
  initImageReveals();
  initHomeScroll();
  initProjectScroll();
  initSlideIn();
  initServices();
  if (typeof ScrollTrigger !== "undefined") {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
});
