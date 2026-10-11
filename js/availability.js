// Live Toronto clock, current status, the week as bricks, and the Tuesday gap in the visitor's own time.

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

// Calendar parts of `date` as seen in time zone `tz`.
function partsIn(tz, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: DAY_SHORT.indexOf(get("weekday")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

// Offset of `tz` from UTC at `date`, in milliseconds.
function offsetMs(tz, date) {
  const p = partsIn(tz, date);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  const floored = Math.floor(date.getTime() / 60000) * 60000;
  return asUtc - floored;
}

// The UTC instant for a wall-clock time in `tz`.
function zonedToDate(tz, year, month, day, hour) {
  const guess = Date.UTC(year, month - 1, day, hour);
  let t = guess - offsetMs(tz, new Date(guess));
  const second = guess - offsetMs(tz, new Date(t));
  if (second !== t) t = second;
  return new Date(t);
}

// Next date (today included) that is `weekday` in `tz`, at `hour`.
function nextOccurrence(tz, weekday, hour) {
  const now = partsIn(tz);
  const delta = (weekday - now.weekday + 7) % 7;
  const d = new Date(Date.UTC(now.year, now.month - 1, now.day + delta));
  return zonedToDate(tz, d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), hour);
}

function fmtHour(h) {
  const suffix = h % 24 >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr} ${suffix}`;
}

function brickPicture(color, className = "") {
  const pic = document.createElement("picture");
  if (className) pic.className = className;
  const source = document.createElement("source");
  source.type = "image/webp";
  source.srcset = `assets/renders/brick-${color}-400.webp 400w, assets/renders/brick-${color}.webp 1000w`;
  source.sizes = "(max-width: 767px) 15vw, 14vw";
  const img = document.createElement("img");
  img.src = `assets/renders/brick-${color}.png`;
  img.width = 1000;
  img.height = 507;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  pic.append(source, img);
  return pic;
}

function buildWeek(weekEl, schedule) {
  const items = {};
  const frag = document.createDocumentFragment();

  for (const d of WEEK_ORDER) {
    const blocks = schedule.offBlocks.filter((b) => b.day === d);
    const li = document.createElement("li");
    li.className = "day";

    const brick = document.createElement("div");
    brick.className = "day__brick";
    brick.append(brickPicture("red"));
    if (blocks.length) brick.append(brickPicture("amber", "day__half"));

    const name = document.createElement("span");
    name.className = "day__name";
    name.textContent = DAY_SHORT[d];
    name.setAttribute("aria-hidden", "true");

    const note = document.createElement("span");
    note.className = "day__note";
    const visible = blocks.length
      ? blocks.map((b) => `Off ${fmtHour(b.start)} to ${fmtHour(b.end)}`).join(", ")
      : "Around";
    note.textContent = visible;
    note.setAttribute("aria-hidden", "true");

    const spoken = document.createElement("span");
    spoken.className = "visually-hidden";
    spoken.textContent = blocks.length
      ? `${DAY_LONG[d]}: away ${blocks.map((b) => `${fmtHour(b.start)} to ${fmtHour(b.end)} ${schedule.tzLabel}`).join(", ")}, around the rest of the day`
      : `${DAY_LONG[d]}: around`;

    li.append(brick, name, note, spoken);
    frag.append(li);
    items[d] = li;
  }

  weekEl.replaceChildren(frag);
  return items;
}

function localGapText(schedule) {
  const block = schedule.offBlocks[0];
  if (!block) return "";
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!visitorZone || visitorZone === schedule.timezone) return "";

  const start = nextOccurrence(schedule.timezone, block.day, block.start);
  const end = nextOccurrence(schedule.timezone, block.day, block.end);
  if (offsetMs(visitorZone, start) === offsetMs(schedule.timezone, start)) return "";

  const day = new Intl.DateTimeFormat(undefined, { weekday: "long" });
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  const startDay = day.format(start);
  const endDay = day.format(end);
  const endText = startDay === endDay ? time.format(end) : `${endDay} ${time.format(end)}`;
  return ` (that’s ${startDay} ${time.format(start)} to ${endText} your time)`;
}

export function startAvailability(root, schedule) {
  const clockEl = root.querySelector("[data-clock]");
  const statusEl = root.querySelector("[data-status]");
  const statusText = root.querySelector("[data-status-text]");
  const weekEl = root.querySelector("[data-week]");
  const gapEl = root.querySelector("[data-local-gap]");
  if (!clockEl || !weekEl) return;

  const days = buildWeek(weekEl, schedule);
  if (gapEl) gapEl.textContent = localGapText(schedule);

  const clockFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: schedule.timezone,
    hour: "numeric",
    minute: "2-digit",
  });

  function tick() {
    const now = new Date();
    clockEl.textContent = clockFmt.format(now);
    clockEl.dateTime = now.toISOString();

    const p = partsIn(schedule.timezone, now);
    for (const d of WEEK_ORDER) {
      if (d === p.weekday) days[d].setAttribute("aria-current", "date");
      else days[d].removeAttribute("aria-current");
    }

    const block = schedule.offBlocks.find((b) => b.day === p.weekday && p.hour >= b.start && p.hour < b.end);
    const state = block ? "off" : "on";
    if (statusEl.dataset.state !== state) {
      statusEl.dataset.state = state;
      statusText.textContent = block
        ? `Away right now, back around ${fmtHour(block.end)} ${schedule.tzLabel}`
        : "Usually around";
    }
  }

  tick();
  let timer = 0;
  const schedule60 = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      tick();
      schedule60();
    }, 60000 - (Date.now() % 60000) + 50);
  };
  schedule60();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      tick();
      schedule60();
    }
  });
}
