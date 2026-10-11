// Mobile menu: hamburger morphs to an X, full-screen overlay with staggered links.
// Fires "menu:open" and "menu:close" on document so smooth scroll can pause.

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;

  const background = [document.querySelector("main"), document.querySelector(".foot"), document.querySelector(".skip")].filter(Boolean);
  const links = [...menu.querySelectorAll("[data-menu-link]")];
  links.forEach((a, i) => a.style.setProperty("--i", String(i)));

  let open = false;
  let hideTimer = 0;

  function setOpen(next, { restoreFocus = true } = {}) {
    if (next === open) return;
    open = next;
    clearTimeout(hideTimer);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    background.forEach((el) => (el.inert = open));

    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
      document.dispatchEvent(new CustomEvent("menu:open"));
      links[0]?.focus({ preventScroll: true });
    } else {
      menu.classList.remove("is-open");
      document.dispatchEvent(new CustomEvent("menu:close"));
      hideTimer = setTimeout(() => (menu.hidden = true), 500);
      if (restoreFocus) toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener("click", () => setOpen(!open));
  links.forEach((a) => a.addEventListener("click", () => setOpen(false, { restoreFocus: false })));

  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "Tab") {
      // Keep focus inside the toggle and the menu while it is open.
      const items = [toggle, ...menu.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.matchMedia("(min-width: 861px)").addEventListener("change", (mq) => {
    if (mq.matches) setOpen(false, { restoreFocus: false });
  });
}
