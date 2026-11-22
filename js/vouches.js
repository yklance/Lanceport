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
    img.alt = v.name;
    img.width = 56;
    img.height = 56;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => img.remove());

    const profileUrl = v.robloxUrl || (v.robloxId ? `https://www.roblox.com/users/${v.robloxId}/profile` : null);

    let imgContainer;
    if (profileUrl) {
      imgContainer = document.createElement("a");
      imgContainer.href = profileUrl;
      imgContainer.target = "_blank";
      imgContainer.rel = "noopener";
      imgContainer.setAttribute("aria-label", `${v.name} on Roblox`);
      imgContainer.append(img);
    } else {
      imgContainer = img;
    }

    const who = document.createElement("div");
    who.setAttribute("translate", "no");

    let nameEl;
    if (profileUrl) {
      nameEl = document.createElement("a");
      nameEl.className = "vouch__name";
      nameEl.href = profileUrl;
      nameEl.target = "_blank";
      nameEl.rel = "noopener";
      nameEl.textContent = v.name;
    } else {
      nameEl = document.createElement("span");
      nameEl.className = "vouch__name";
      nameEl.textContent = v.name;
    }
    who.append(nameEl);

    if (v.role) {
      const role = document.createElement("span");
      role.className = "vouch__user";
      role.textContent = v.role;
      who.append(role);
    } else if (v.username) {
      const handle = `@${v.username}`;
      const span = document.createElement("span");
      span.className = "vouch__user";
      span.textContent = handle;
      who.append(span);
    }

    caption.append(imgContainer, who);
    figure.append(quote, caption);
    li.append(figure);
    frag.append(li);
  }

  listEl.replaceChildren(frag);
}
