// All scroll and pointer motion. GSAP, ScrollTrigger and Lenis load as deferred globals from jsDelivr.
// Nothing here runs when the visitor prefers reduced motion: the page is complete without it.

const root = document.documentElement;

function giveUp() {
  root.classList.remove("motion");
  return null;
}

// Wrap each word of the statement in a span, leaving inline elements (the headshot pill) in place.
function splitWords(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  for (const node of textNodes) {
    const frag = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(document.createTextNode(" "));
      } else {
        const w = document.createElement("span");
        w.className = "w";
        w.textContent = part;
        frag.append(w);
      }
    }
    node.replaceWith(frag);
  }
  return [...el.querySelectorAll(".w, .intro__pill")];
}

function fontsReady(timeout = 1200) {
  if (!document.fonts?.ready) return Promise.resolve();
  return Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, timeout))]);
}

export function initMotion() {
  if (!root.classList.contains("motion")) return null;
  const { gsap, ScrollTrigger, Lenis } = window;
  if (!gsap || !ScrollTrigger) return giveUp();

  gsap.registerPlugin(ScrollTrigger);

  // ---------- Smooth scroll ----------
  let lenis = null;
  if (Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("menu:open", () => lenis.stop());
    document.addEventListener("menu:close", () => lenis.start());
  }

  // In-page links glide with Lenis, then move focus to the section for keyboard users.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !lenis) return;
    const id = a.getAttribute("href");
    const target = id === "#top" ? document.body : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.start();
    lenis.scrollTo(id === "#top" ? 0 : target, { duration: 1.4 });
    history.replaceState(null, "", id);
    const focusEl = id === "#top" ? document.querySelector("#main") : target;
    if (focusEl) {
      if (!focusEl.hasAttribute("tabindex")) focusEl.setAttribute("tabindex", "-1");
      focusEl.focus({ preventScroll: true });
    }
  });

  // ---------- Hero ----------
  const hero = document.querySelector("[data-hero]");
  fontsReady().then(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(".hero__word span", { yPercent: 105, y: 0 }, { yPercent: 0, duration: 1.5, stagger: 0.06 })
      .fromTo(".hero__figure img", { opacity: 0, yPercent: 6, y: 0 }, { opacity: 1, yPercent: 0, duration: 1.7 }, 0.2)
      .fromTo(".hero__copy > *", { opacity: 0, y: 24, yPercent: 0 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.55);
    ScrollTrigger.refresh();
  });

  // Depth: type moves least, the figure moves most.
  if (hero && window.matchMedia("(pointer: fine)").matches) {
    const layers = [...hero.querySelectorAll("[data-depth]")].map((el) => ({
      depth: Number(el.dataset.depth) || 0,
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
    }));
    hero.addEventListener("pointermove", (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const l of layers) {
        l.x(nx * -34 * l.depth);
        l.y(ny * -20 * l.depth);
      }
    });
    hero.addEventListener("pointerleave", () => {
      for (const l of layers) {
        l.x(0);
        l.y(0);
      }
    });
  }

  // As the hero leaves, the figure rises and the name sinks.
  gsap.timeline({
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
  })
    .fromTo("[data-hero-figure]", { yPercent: 0 }, { yPercent: -16, ease: "none", duration: 1 }, 0)
    .fromTo("[data-hero-word]", { yPercent: 0 }, { yPercent: 30, ease: "none", duration: 1 }, 0)
    // the copy is gone before the sinking name can reach it
    .fromTo("[data-hero-copy]", { y: 0, opacity: 1 }, { y: -40, opacity: 0, ease: "none", duration: 0.32 }, 0);

  // ---------- Intro statement: words light up in reading order ----------
  const statement = document.querySelector("[data-words]");
  if (statement) {
    const words = splitWords(statement);
    gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: { trigger: statement, start: "top 82%", end: "bottom 42%", scrub: true },
    });
    const pill = statement.querySelector(".intro__pill");
    if (pill) {
      gsap.fromTo(
        pill,
        { scale: 0.5 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: statement, start: "top 82%", end: "top 45%", scrub: true } }
      );
    }
  }

  // ---------- Numbers rise out of their masks ----------
  gsap.utils.toArray("[data-number]").forEach((el) => {
    gsap.fromTo(el, { yPercent: 102, y: 0 }, {
      yPercent: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: el.closest(".numbers__item"), start: "top 88%", once: true },
    });
  });

  // ---------- Bento ----------
  ScrollTrigger.batch("[data-cell]", {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 48, yPercent: 0 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.09 }),
  });
  // He is mid-jump: a short float when the card arrives, ending in the air (under 5 s, so no pause control needed).
  gsap.to("[data-jump]", {
    y: -14,
    duration: 1.6,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 2,
    scrollTrigger: { trigger: "[data-jump]", start: "top 85%", once: true },
  });

  // ---------- Vouches ----------
  ScrollTrigger.batch(".vouch", {
    start: "top 88%",
    once: true,
    onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 40, yPercent: 0 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }),
  });
  gsap.fromTo(
    "[data-point] img",
    { scale: 0.86, rotate: -3, transformOrigin: "50% 80%" },
    { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: ".vouches", start: "top bottom", end: "top 20%", scrub: true } }
  );

  // ---------- Availability: the week and avatar are revealed on the red platform ----------
  ScrollTrigger.create({
    trigger: ".week-stage",
    start: "top 78%",
    once: true,
    onEnter: () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".day__marker", { opacity: 0, y: -48, yPercent: 0 }, { opacity: 1, y: 0, duration: 1, stagger: 0.07 })
        .fromTo("[data-sit]", { opacity: 0, y: -36, yPercent: 0 }, { opacity: 1, y: 0, duration: 1.2 }, "-=0.45");
    },
  });

  // ---------- Closing: the lockup closes in, the wave rises ----------
  const closer = document.querySelector("[data-closer]");
  if (closer) {
    const spans = closer.querySelectorAll(".closer__title span");
    gsap
      .timeline({ scrollTrigger: { trigger: closer, start: "top bottom", end: "top 15%", scrub: true } })
      .fromTo(spans[0], { xPercent: -14 }, { xPercent: 0, ease: "none" }, 0)
      .fromTo(spans[1], { xPercent: 10 }, { xPercent: 0, ease: "none" }, 0)
      .fromTo("[data-closer-figure]", { yPercent: 22 }, { yPercent: 0, ease: "none" }, 0);
  }

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  return { lenis };
}
