import { vouches } from "../data/vouches.js";
import { schedule } from "../data/schedule.js";
import { renderVouches } from "./vouches.js";
import { startAvailability } from "./availability.js";
import { initNav } from "./nav.js";
import { initMotion } from "./motion.js";

function init() {
  window.__vkReady = true;
  renderVouches(document.querySelector("[data-vouch-list]"), vouches);
  const avail = document.querySelector("#availability");
  if (avail) startAvailability(avail, schedule);
  initNav();
  // Motion last, so it can find the vouches and bricks built above.
  initMotion();
}

// Called at the end of the module, after every import and declaration is ready.
init();
