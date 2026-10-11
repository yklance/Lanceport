// Builds the vouch list from data/vouches.js.

export function renderVouches(listEl, vouches) {
  if (!listEl) return;
  const frag = document.createDocumentFragment();

  for (const v of vouches) {
    const li = document.createElement("li");
    li.className = "vouch";

    const figure = document.createElement("figure");

    const quote = document.createElement("blockquote");
    const p = document.createElement("p");
    p.textContent = `“${v.quote}”`;
    quote.append(p);

    const caption = document.createElement("figcaption");

    const img = document.createElement("img");
    img.className = "vouch__face";
    img.src = v.image;
    img.alt = "";
    img.width = 56;
    img.height = 56;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => img.remove());

    const who = document.createElement("div");
    who.setAttribute("translate", "no");
    const name = document.createElement("span");
    name.className = "vouch__name";
    name.textContent = v.name;
    who.append(name);

    if (v.username) {
      const handle = `@${v.username}`;
      if (v.robloxId) {
        const link = document.createElement("a");
        link.className = "vouch__user";
        link.href = `https://www.roblox.com/users/${v.robloxId}/profile`;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = handle;
        link.setAttribute("aria-label", `${handle} on Roblox`);
        who.append(link);
      } else {
        const span = document.createElement("span");
        span.className = "vouch__user";
        span.textContent = handle;
        who.append(span);
      }
    }

    caption.append(img, who);
    figure.append(quote, caption);
    li.append(figure);
    frag.append(li);
  }

  listEl.replaceChildren(frag);
}
