/* AgentCraftr Docs engine.
   Content lives in site/data/** as plain JS calls (Docs.screen / Docs.flow / Docs.page), listed in
   site/data/index.js. Plain JS (not JSON) so the site works opened straight from the folder (file://).
   Routes (hash): #/  #/app/<app>  #/screen/<id>[/<step>]  #/flow/<id>[/<step>]  #/page/<id>  #/search/<q> */
(function () {
  "use strict";

  const S = { screens: {}, flows: {}, pages: {}, order: { screens: [], flows: [], pages: [] }, site: {} };
  const APPS = {
    web: { label: "Web dashboard", icon: "🖥️", blurb: "What the business owner and staff use every day." },
    mobile: { label: "Mobile app", icon: "📱", blurb: "The same business on the phone: today, chats, orders, teaching the agent." },
    partner: { label: "Partner", icon: "🤝", blurb: "For partners who bring businesses in their cities and trades." },
    admin: { label: "Admin (our team)", icon: "🛠️", blurb: "AgentCraftr's own team: tenants, numbers, payments." },
  };
  const LANE_COLORS = ["#0d9488", "#e11d74", "#6d28d9", "#b45309", "#0369a1", "#16a34a", "#be123c"];

  // ───── registry (called by data files) ─────
  window.Docs = {
    site(cfg) { S.site = cfg; },
    screen(s) { if (!S.screens[s.id]) S.order.screens.push(s.id); S.screens[s.id] = s; },
    flow(f) { if (!S.flows[f.id]) S.order.flows.push(f.id); S.flows[f.id] = f; },
    page(p) { if (!S.pages[p.id]) S.order.pages.push(p.id); S.pages[p.id] = p; },
    _state: S,
  };

  // ───── helpers ─────
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const store = {
    get(k) { try { return localStorage.getItem("acdocs." + k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("acdocs." + k, v); } catch { /* private window */ } },
  };
  const strip = (html) => String(html || "").replace(/<[^>]+>/g, " ");
  const screensOf = (app) => S.order.screens.map((id) => S.screens[id]).filter((s) => s.app === app);
  const sortedMarks = (s) => (s.marks || []).slice().sort((a, b) => (a.n ?? 99) - (b.n ?? 99));

  // ───── loader: read the file list, add a <script> per file, render when all settled ─────
  function load(done) {
    const list = window.DOCS_FILES || { screens: [], flows: [], pages: [] };
    const files = [
      ...(list.pages || []).map((f) => "data/pages/" + f + ".js"),
      ...(list.screens || []).map((f) => "data/screens/" + f + ".js"),
      ...(list.flows || []).map((f) => "data/flows/" + f + ".js"),
    ];
    let left = files.length;
    if (!left) return done();
    // keep the listed order: scripts load in parallel but register into a pre-sized slot order
    const wanted = { screens: list.screens || [], flows: list.flows || [], pages: list.pages || [] };
    files.forEach((src) => {
      const el = document.createElement("script");
      el.src = src;
      el.onload = el.onerror = () => {
        if (el.readyState === undefined && !el.dataset.ok) { /* ignored */ }
        if (--left === 0) {
          for (const k of ["screens", "flows", "pages"]) {
            const known = S.order[k];
            S.order[k] = wanted[k].filter((id) => known.includes(id)).concat(known.filter((id) => !wanted[k].includes(id)));
          }
          done();
        }
      };
      document.head.appendChild(el);
    });
  }

  // ───── shell + nav ─────
  function buildNav() {
    const nav = $("#nav");
    const parts = [`<a href="#/" data-r="/">🏠 Start here</a>`];
    parts.push(`<div class="grp">Guides by app</div>`);
    for (const [app, a] of Object.entries(APPS)) {
      const list = screensOf(app);
      if (!list.length) continue;
      const bySec = {};
      list.forEach((s) => (bySec[s.section || "Screens"] ||= []).push(s));
      const subs = Object.entries(bySec).map(([sec, items]) =>
        `<div class="sec">${esc(sec)}</div>` + items.map((s) => `<a href="#/screen/${s.id}" data-r="/screen/${s.id}">${esc(s.title)}</a>`).join("")
      ).join("");
      parts.push(`<details data-app="${app}"><summary>${a.icon} ${esc(a.label)}<span class="count">${list.length}</span></summary>
        <div class="sub"><a href="#/app/${app}" data-r="/app/${app}">All ${esc(a.label.toLowerCase())} screens</a>${subs}</div></details>`);
    }
    const flows = S.order.flows.map((id) => S.flows[id]);
    if (flows.length) {
      parts.push(`<div class="grp">Workflows</div>`);
      flows.forEach((f) => parts.push(`<a href="#/flow/${f.id}" data-r="/flow/${f.id}">${f.icon || "↪"} ${esc(f.title)}</a>`));
    }
    const groups = {};
    S.order.pages.map((id) => S.pages[id]).filter((p) => !p.hidden).forEach((p) => (groups[p.group || "Concepts"] ||= []).push(p));
    for (const [g, ps] of Object.entries(groups)) {
      parts.push(`<div class="grp">${esc(g)}</div>`);
      ps.forEach((p) => parts.push(`<a href="#/page/${p.id}" data-r="/page/${p.id}">${p.icon || "📘"} ${esc(p.title)}</a>`));
    }
    nav.innerHTML = parts.join("");
  }

  function markNav(route) {
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.r === route));
    const on = $("#nav a.on");
    if (on) { const d = on.closest("details"); if (d) d.open = true; }
  }

  // ───── router ─────
  let cleanup = null;
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    document.body.classList.remove("nav-open");
    const raw = decodeURIComponent(location.hash.replace(/^#/, "")) || "/";
    const [, kind, id, step] = raw.split("/");
    const c = $("#content");
    c.innerHTML = "";
    let navRoute = raw;
    if (!kind) renderHome(c);
    else if (kind === "app") renderApp(c, id);
    else if (kind === "screen") { navRoute = "/screen/" + id; renderScreen(c, id, step); }
    else if (kind === "flow") { navRoute = "/flow/" + id; renderFlow(c, id, step); }
    else if (kind === "page") renderPage(c, id);
    else if (kind === "search") renderSearch(c, raw.slice(8));
    else c.appendChild(h(`<div class="empty">Page not found. <a href="#/">Go to the start</a>.</div>`));
    markNav(navRoute);
    const t = c.querySelector("h1");
    document.title = (t ? t.textContent + " · " : "") + "AgentCraftr Docs";
    if (!step) window.scrollTo(0, 0);
  }

  // ───── home ─────
  function renderHome(c) {
    const site = S.site;
    const hero = S.screens[site.heroScreen];
    const nScreens = S.order.screens.length, nFlows = S.order.flows.length;
    const nMarks = S.order.screens.reduce((t, id) => t + (S.screens[id].marks || []).length, 0);
    c.appendChild(h(`<div>
      <div class="hero">
        <div>
          <div class="eyebrow">AgentCraftr documentation</div>
          <h1 style="margin-top:10px">${esc(site.headline || "Learn AgentCraftr by looking at it.")}</h1>
          <p class="lede" style="margin-top:14px">${esc(site.intro || "")}</p>
          <div class="facts">
            <div class="fact"><b>${nScreens}</b><span>screens with marked actions</span></div>
            <div class="fact"><b>${nMarks}</b><span>actions explained</span></div>
            <div class="fact"><b>${nFlows}</b><span>workflows, start to finish</span></div>
          </div>
        </div>
        ${hero ? `<a class="hero-shot" href="#/screen/${hero.id}" aria-label="Open the ${esc(hero.title)} guide"><img src="${esc(hero.image)}" alt="${esc(hero.title)} screen" onerror="this.remove()"></a>` : ""}
      </div>
      <div class="section"><h2>Who are you?</h2><p class="lede">Pick a starting point. Every guide links to the next one.</p>
        <div class="roles">${(site.roles || []).map((r) => `<a class="role-card" href="${esc(r.href)}"><span class="ic">${r.icon}</span><span><b>${esc(r.title)}</b><p>${esc(r.text)}</p></span></a>`).join("")}</div></div>
      ${site.journey ? `<div class="section"><h2>From sign-up to the first customer answer</h2><p class="lede">The order matters. Each step is what the system checks before the next one works.</p>
        <div class="journey">${site.journey.map((j) => `<a href="${esc(j.href)}">${esc(j.title)}<small>${esc(j.text)}</small></a>`).join("")}</div></div>` : ""}
      <div class="section"><h2>Guides by app</h2><p class="lede">Each screen is a real screenshot. Numbered boxes mark what you can do; arrows show what comes next. Press <span class="kbd">→</span> to step through.</p>
        <div class="cards">${Object.entries(APPS).map(([app, a]) => {
          const list = screensOf(app); const first = S.screens[(site.covers || {})[app]] || list[0];
          const ready = list.filter((s) => s.image && !s.pending).length;
          return `<a class="card" href="#/app/${app}">${first && first.image && !first.pending ? `<div class="thumb ${app === "mobile" ? "phone" : ""}" style="background-image:url('${esc(first.image)}')"></div>` : ""}
            <h3>${a.icon} ${esc(a.label)}</h3><p>${esc(a.blurb)}</p><span class="meta">${list.length} screens${ready < list.length ? ` · ${list.length - ready} need screenshots` : ""}</span></a>`;
        }).join("")}</div></div>
      ${nFlows ? `<div class="section"><h2>Workflows</h2><p class="lede">Who does what, in order: the customer, the AI, your team, and the system checks in between.</p>
        <div class="cards">${S.order.flows.map((id) => S.flows[id]).map((f) => `<a class="card" href="#/flow/${f.id}"><h3>${f.icon || "↪"} ${esc(f.title)}</h3><p>${esc(f.summary)}</p><span class="meta">${f.steps.length} steps · ${(f.lanes || []).map((l) => l.label).join(" · ")}</span></a>`).join("")}</div></div>` : ""}
    </div>`));
  }

  // ───── app index ─────
  function renderApp(c, app) {
    const a = APPS[app];
    if (!a) { c.appendChild(h(`<div class="empty">Unknown app.</div>`)); return; }
    const list = screensOf(app);
    const bySec = {};
    list.forEach((s) => (bySec[s.section || "Screens"] ||= []).push(s));
    c.appendChild(h(`<div>
      <div class="crumbs"><a href="#/">Start</a><span class="sep">/</span><span>${esc(a.label)}</span></div>
      <div class="pagehead"><h1>${a.icon} ${esc(a.label)}</h1><p class="lede">${esc(a.blurb)}</p></div>
      ${app === "mobile" ? `<div class="callout" style="margin-bottom:20px"><b>Adding phone screenshots</b>Take a screenshot on the phone, open the <a href="editor.html">marking editor</a>, paste it, draw boxes on the buttons and save the file into <code>site/data/screens/</code>.</div>` : ""}
      ${Object.entries(bySec).map(([sec, items]) => `<div class="section" style="margin-top:28px"><h2>${esc(sec)}</h2>
        <div class="cards" style="margin-top:14px">${items.map((s) => `<a class="card" href="#/screen/${s.id}">
          ${s.image && !s.pending ? `<div class="thumb ${app === "mobile" ? "phone" : ""}" style="background-image:url('${esc(s.image)}')"></div>` : `<div class="thumb ${app === "mobile" ? "phone" : ""}" style="display:grid;place-items:center;font-size:13px;color:var(--muted)">Screenshot needed</div>`}
          <h3>${esc(s.title)}</h3><p>${esc(s.summary || "")}</p><span class="meta">${(s.marks || []).length} actions${s.roles ? " · " + s.roles.join(", ") : ""}</span></a>`).join("")}</div></div>`).join("")}
    </div>`));
  }

  // ───── screen viewer ─────
  function renderScreen(c, id, stepArg) {
    const s = S.screens[id];
    if (!s) { c.appendChild(h(`<div class="empty">This screen isn't documented yet. <a href="#/">Back to the start</a>.</div>`)); return; }
    const marks = sortedMarks(s);
    const isPhone = s.app === "mobile";
    const app = APPS[s.app] || { label: s.app };
    const list = screensOf(s.app);
    const idx = list.indexOf(s);
    const prev = list[idx - 1], next = list[idx + 1];
    const backlinks = S.order.screens.map((k) => S.screens[k]).filter((o) => o.id !== s.id && (o.marks || []).some((m) => m.go === s.id));
    const usedIn = S.order.flows.map((k) => S.flows[k]).filter((f) => f.steps.some((st) => st.screen === s.id));
    let mode = store.get("mode") || "tour";
    let active = Math.max(0, Math.min(marks.length - 1, (parseInt(stepArg, 10) || 1) - 1));

    const root = h(`<div>
      <div class="crumbs"><a href="#/">Start</a><span class="sep">/</span><a href="#/app/${s.app}">${esc(app.label)}</a>${s.section ? `<span class="sep">/</span><span>${esc(s.section)}</span>` : ""}</div>
      <div class="pagehead">
        <h1>${esc(s.title)}</h1>
        ${s.summary ? `<p class="lede">${esc(s.summary)}</p>` : ""}
        <div class="chips">${s.route ? `<span class="chip route">${esc(s.route)}</span>` : ""}${(s.roles || []).map((r) => `<span class="chip role">${esc(r)}</span>`).join("")}${s.pending ? `<span class="chip todo">screenshot needed</span>` : ""}</div>
      </div>
      <div class="toolbar">
        <div class="seg" role="group" aria-label="How to show the marks">
          <button data-mode="tour">Step by step</button><button data-mode="all">All marks</button><button data-mode="clean">Clean</button>
        </div>
        <span class="spacer"></span>
        <span class="muted" style="font-size:12.5px"><span class="kbd">←</span> <span class="kbd">→</span> steps · <span class="kbd">F</span> full screen</span>
        <button class="iconbtn" data-act="fs" title="Full screen">⤢ Full screen</button>
      </div>
      <div class="viewer ${isPhone ? "mobile" : ""}">
        <div>
          ${isPhone ? `<div class="phoneframe"><div class="stage"></div></div>`
                    : `<div class="frame"><div class="bar"><i></i><i></i><i></i><span class="url">agentcraftr.com${esc(s.route || "")}</span></div><div class="stage"></div></div>`}
          ${s.notes ? `<div class="prose" style="margin-top:20px">${s.notes}</div>` : ""}
          ${(backlinks.length || usedIn.length) ? `<div class="related">${backlinks.length ? `Reached from: ${backlinks.map((b) => `<a class="chip" href="#/screen/${b.id}">${esc(b.title)}</a>`).join("")}` : ""}
            ${usedIn.length ? ` Part of: ${usedIn.map((f) => `<a class="chip" href="#/flow/${f.id}">${esc(f.title)}</a>`).join("")}` : ""}</div>` : ""}
        </div>
        <div class="steps" aria-label="Steps"></div>
      </div>
      <div class="pager">${prev ? `<a href="#/screen/${prev.id}"><small>← Previous</small>${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a class="next" href="#/screen/${next.id}"><small>Next →</small>${esc(next.title)}</a>` : ""}</div>
    </div>`);
    c.appendChild(root);

    const stage = $(".stage", root);
    const stepsEl = $(".steps", root);
    const W = s.width || 1440, H = s.height || 900;

    // the picture (or a placeholder with the same shape)
    if (s.image && !s.pending) {
      const img = new Image();
      img.src = s.image; img.alt = s.title + " screen"; img.width = W; img.height = H;
      img.onerror = () => { img.replaceWith(placeholder()); draw(); };
      img.onload = () => draw();
      stage.appendChild(img);
    } else stage.appendChild(placeholder());
    function placeholder() {
      return h(`<div class="ph" style="aspect-ratio:${W}/${H}"><div><b>Screenshot needed</b>Add <code>${esc(s.image || "images/" + s.app + "/" + s.id + ".png")}</code><br>or open the <a href="editor.html">marking editor</a>.</div></div>`);
    }

    // boxes
    const boxEls = marks.map((m, i) => {
      if (!m.box) return null; // described but not yet placed on a screenshot
      const [x, y, w, hh] = m.box;
      const el = h(`<button class="mk ${esc(m.kind || "action")}" aria-label="${esc((m.n ?? i + 1) + ". " + m.label)}"
        style="left:${(x / W) * 100}%;top:${(y / H) * 100}%;width:${(w / W) * 100}%;height:${(hh / H) * 100}%">
        <span class="badge">${m.n ?? i + 1}</span><span class="tag">${esc(m.label)}</span></button>`);
      el.addEventListener("click", () => { if (mode === "clean") return; setActive(i, true); if (mode === "all") setMode("tour"); });
      stage.appendChild(el);
      return el;
    });
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "arrows");
    svg.setAttribute("aria-hidden", "true");
    stage.appendChild(svg);
    const pop = h(`<div class="callout-pop" role="dialog" aria-live="polite"></div>`);
    stage.appendChild(pop);

    // step list
    const byId = Object.fromEntries(marks.map((m, i) => [m.id, i]));
    stepsEl.innerHTML = marks.length ? marks.map((m, i) => {
      const nexts = (s.arrows || []).filter((a) => a.from === m.id && byId[a.to] !== undefined);
      return `<button class="step ${esc(m.kind || "action")}" data-i="${i}">
        <span class="n">${m.n ?? i + 1}</span>
        <span><b>${esc(m.label)}</b><p>${esc(m.text || "")}</p>
        ${nexts.length ? `<span class="then">Next: ${nexts.map((a) => `<a href="#/screen/${s.id}/${byId[a.to] + 1}" data-jump="${byId[a.to]}">${esc(marks[byId[a.to]].label)}</a>`).join(", ")}</span>` : ""}
        ${m.go && S.screens[m.go] ? `<a class="go" href="#/screen/${m.go}">Opens: ${esc(S.screens[m.go].title)} →</a>` : ""}</span></button>`;
    }).join("") : `<div class="empty">No marks yet. Open the <a href="editor.html">editor</a> to add them.</div>`;
    stepsEl.addEventListener("click", (e) => {
      const j = e.target.closest("[data-jump]");
      if (j) { e.preventDefault(); setActive(+j.dataset.jump, true); return; }
      if (e.target.closest("a")) return;
      const b = e.target.closest(".step");
      if (b) { setActive(+b.dataset.i, true); if (mode !== "tour") setMode("tour"); }
    });

    function setMode(m) {
      mode = m; store.set("mode", m);
      stage.classList.remove("mode-tour", "mode-all", "mode-clean");
      stage.classList.add("mode-" + m);
      root.querySelectorAll(".seg button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
      draw();
    }
    function setActive(i, user) {
      if (!marks.length) return;
      active = (i + marks.length) % marks.length;
      if (user) history.replaceState(null, "", `#/screen/${s.id}/${active + 1}`);
      draw();
      const st = stepsEl.querySelector(`.step[data-i="${active}"]`);
      if (st && user) st.scrollIntoView({ block: "nearest", behavior: "smooth" });
      if (user && mode === "tour" && boxEls[active]) {
        const r = boxEls[active].getBoundingClientRect();
        if (r.top < 0 || r.bottom > innerHeight) boxEls[active].scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }

    function draw() {
      const rect = stage.getBoundingClientRect();
      const sw = rect.width, sh = rect.height;
      if (!sw) return;
      const k = sw / W;
      const cur = marks[active];
      const nextIds = cur ? (s.arrows || []).filter((a) => a.from === cur.id).map((a) => a.to) : [];
      boxEls.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("on", i === active);
        el.classList.toggle("next", nextIds.includes(marks[i].id));
      });
      stepsEl.querySelectorAll(".step").forEach((el) => el.classList.toggle("on", +el.dataset.i === active && mode === "tour"));

      // arrows in pixel space
      svg.setAttribute("viewBox", `0 0 ${sw} ${sh}`);
      const parts = [];
      (s.arrows || []).forEach((a) => {
        const A = marks[byId[a.from]], B = marks[byId[a.to]];
        if (!A || !B || !A.box || !B.box) return;
        const live = mode === "tour" && cur && a.from === cur.id;
        if (mode === "tour" && !live) return;
        parts.push(arrow(A.box.map((v) => v * k), B.box.map((v) => v * k), a.label, live));
      });
      svg.innerHTML = parts.join("");

      // callout next to the active box
      if (mode === "tour" && cur && cur.box) {
        const [x, y, w, hh] = cur.box.map((v) => v * k);
        const pw = 260, gap = 14;
        pop.style.display = "";
        pop.innerHTML = `<h4><span class="n">${cur.n ?? active + 1}</span>${esc(cur.label)}</h4><div>${esc(cur.text || "")}</div>
          <div class="row"><span class="of">${active + 1} of ${marks.length}</span>
          ${cur.go && S.screens[cur.go] ? `<a class="btn" href="#/screen/${cur.go}">Go there</a>` : ""}
          <button class="btn" data-p ${active === 0 ? "disabled" : ""} aria-label="Previous step">←</button>
          <button class="btn primary" data-n ${active === marks.length - 1 ? "disabled" : ""} aria-label="Next step">Next →</button></div>`;
        const ph = pop.offsetHeight;
        let px, py;
        if (x + w + gap + pw <= sw) { px = x + w + gap; py = y; }
        else if (x - gap - pw >= 0) { px = x - gap - pw; py = y; }
        else { px = Math.min(Math.max(8, x), sw - pw - 8); py = y + hh + gap; if (py + ph > sh) py = Math.max(8, y - ph - gap); }
        py = Math.min(Math.max(8, py), Math.max(8, sh - ph - 8));
        pop.style.left = px + "px"; pop.style.top = py + "px";
        pop.querySelector("[data-p]").onclick = () => setActive(active - 1, true);
        pop.querySelector("[data-n]").onclick = () => setActive(active + 1, true);
      } else pop.style.display = "none";
    }

    root.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
    $("[data-act=fs]", root).addEventListener("click", () => { document.body.classList.toggle("fs"); requestAnimationFrame(draw); });
    const onKey = (e) => {
      if (e.target.closest("input,textarea")) return;
      if (e.key === "ArrowRight") { if (mode !== "tour") setMode("tour"); setActive(active + 1, true); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { if (mode !== "tour") setMode("tour"); setActive(active - 1, true); e.preventDefault(); }
      else if (e.key === "f" || e.key === "F") { document.body.classList.toggle("fs"); requestAnimationFrame(draw); }
      else if (e.key === "Escape") { document.body.classList.remove("fs"); requestAnimationFrame(draw); }
    };
    document.addEventListener("keydown", onKey);
    const ro = new ResizeObserver(() => draw());
    ro.observe(stage);
    cleanup = () => { document.removeEventListener("keydown", onKey); ro.disconnect(); document.body.classList.remove("fs"); };
    setMode(mode);
    if (stepArg) requestAnimationFrame(() => boxEls[active] && boxEls[active].classList.add("flash"));
    else if (s.pending && marks.length) stage.classList.add("mode-all"); // nothing to tour over yet
  }

  // curved arrow from box A to box B (pixel boxes), leaving and entering at the box edges
  function arrow(A, B, label, live) {
    const ca = [A[0] + A[2] / 2, A[1] + A[3] / 2], cb = [B[0] + B[2] / 2, B[1] + B[3] / 2];
    const p1 = edge(A, ca, cb, 6), p2 = edge(B, cb, ca, 9);
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1], len = Math.hypot(dx, dy) || 1;
    const bend = Math.min(60, len * 0.22);
    const cx = (p1[0] + p2[0]) / 2 - (dy / len) * bend, cy = (p1[1] + p2[1]) / 2 + (dx / len) * bend;
    const ang = Math.atan2(p2[1] - cy, p2[0] - cx), s = 11;
    const tip = `${p2[0]},${p2[1]} ${p2[0] - s * Math.cos(ang - 0.42)},${p2[1] - s * Math.sin(ang - 0.42)} ${p2[0] - s * Math.cos(ang + 0.42)},${p2[1] - s * Math.sin(ang + 0.42)}`;
    let lab = "";
    if (label) {
      const mx = 0.25 * p1[0] + 0.5 * cx + 0.25 * p2[0], my = 0.25 * p1[1] + 0.5 * cy + 0.25 * p2[1];
      const tw = label.length * 6.4 + 14;
      lab = `<g class="lbl"><rect x="${mx - tw / 2}" y="${my - 10}" width="${tw}" height="20" rx="10"/><text x="${mx}" y="${my + 4}" text-anchor="middle">${esc(label)}</text></g>`;
    }
    return `<g><path class="${live ? "live" : ""}" d="M${p1[0]},${p1[1]} Q${cx},${cy} ${p2[0]},${p2[1]}"/><polygon points="${tip}"/>${lab}</g>`;
  }
  function edge(b, from, to, pad) {
    const [x, y, w, hh] = [b[0] - pad, b[1] - pad, b[2] + 2 * pad, b[3] + 2 * pad];
    const dx = to[0] - from[0], dy = to[1] - from[1];
    const tx = dx ? ((dx > 0 ? x + w : x) - from[0]) / dx : Infinity;
    const ty = dy ? ((dy > 0 ? y + hh : y) - from[1]) / dy : Infinity;
    const t = Math.min(Math.abs(tx), Math.abs(ty));
    return [from[0] + dx * t, from[1] + dy * t];
  }

  // a cropped view of one mark of a screen (used by workflow steps and search)
  function crop(screenId, markId, width) {
    const s = S.screens[screenId];
    if (!s || !s.image || s.pending) return "";
    const m = (s.marks || []).find((x) => x.id === markId);
    const W = s.width, H = s.height;
    let [x, y, w, hh] = m ? m.box : [0, 0, W, Math.min(H, W * 0.6)];
    // add context around the box so the reader can find it on the real screen
    const cw = Math.min(W, Math.max(w * 2.2, s.app === "mobile" ? W : 560)), ch = Math.min(H, Math.max(hh * 2.6, cw * 0.42));
    const cx = Math.min(Math.max(0, x + w / 2 - cw / 2), W - cw), cy = Math.min(Math.max(0, y + hh / 2 - ch / 2), H - ch);
    const k = width / cw;
    return `<a class="crop" href="#/screen/${s.id}${m ? "/" + ((sortedMarks(s).indexOf(m)) + 1) : ""}" title="Open ${esc(s.title)}"
      style="height:${Math.round(ch * k)}px;background-image:url('${esc(s.image)}');background-size:${W * k}px ${H * k}px;background-position:${-cx * k}px ${-cy * k}px">
      ${m ? `<span class="cbox" style="left:${(x - cx) * k - 4}px;top:${(y - cy) * k - 4}px;width:${w * k + 8}px;height:${hh * k + 8}px"></span>` : ""}</a>`;
  }

  // ───── workflow diagram ─────
  function renderFlow(c, id, stepArg) {
    const f = S.flows[id];
    if (!f) { c.appendChild(h(`<div class="empty">Workflow not found.</div>`)); return; }
    const lanes = f.lanes || [{ id: "all", label: "" }];
    const laneIdx = Object.fromEntries(lanes.map((l, i) => [l.id, i]));
    const NW = 176, NH = 74, GX = 46, LH = 108, LW = 118, PADX = 22;
    // columns: explicit `col`, else one after the previous step
    let col = -1;
    const steps = f.steps.map((st) => { col = st.col ?? col + 1; return { ...st, _col: col }; });
    const pos = {};
    steps.forEach((st) => {
      const li = laneIdx[st.lane] ?? 0;
      pos[st.id] = { x: LW + PADX + st._col * (NW + GX), y: li * LH + (LH - NH) / 2, li };
    });
    const maxCol = Math.max(...steps.map((s) => s._col));
    const cw = LW + PADX * 2 + (maxCol + 1) * (NW + GX) - GX, chh = lanes.length * LH;
    const edges = [];
    steps.forEach((st, i) => {
      let nx = st.next;
      if (nx === undefined) nx = steps[i + 1] && st.kind !== "end" ? [steps[i + 1].id] : [];
      if (!Array.isArray(nx)) nx = [nx];
      nx.forEach((n) => { const o = typeof n === "string" ? { to: n } : n; if (pos[o.to]) edges.push({ from: st.id, to: o.to, label: o.label }); });
    });
    const order = steps.map((s) => s.id);
    let active = Math.max(0, Math.min(steps.length - 1, (parseInt(stepArg, 10) || 1) - 1));
    let timer = null;

    const root = h(`<div>
      <div class="crumbs"><a href="#/">Start</a><span class="sep">/</span><span>Workflows</span></div>
      <div class="pagehead"><h1>${f.icon || ""} ${esc(f.title)}</h1><p class="lede">${esc(f.summary || "")}</p>
        <div class="chips">${lanes.map((l, i) => `<span class="chip"><i style="width:9px;height:9px;border-radius:3px;background:${l.color || LANE_COLORS[i % LANE_COLORS.length]}"></i>${esc(l.label)}</span>`).join("")}</div></div>
      <div class="toolbar"><button class="btn primary" data-act="play">▶ Play the flow</button><button class="btn" data-act="prev">←</button><button class="btn" data-act="next">→</button>
        <span class="spacer"></span><span class="muted" style="font-size:12.5px">Click any box. Boxes with <span style="color:var(--mark);font-weight:700">●</span> have a screen.</span></div>
      <div class="flowbox"><div class="flowcanvas" style="width:${cw}px;height:${chh}px">
        ${lanes.map((l, i) => `<div class="lane" style="top:${i * LH}px;height:${LH}px"><div class="lname"><i style="background:${l.color || LANE_COLORS[i % LANE_COLORS.length]}"></i>${esc(l.label)}</div></div>`).join("")}
        <svg class="wires" width="${cw}" height="${chh}" aria-hidden="true"></svg>
        ${steps.map((st, i) => { const p = pos[st.id]; const lc = lanes[p.li].color || LANE_COLORS[p.li % LANE_COLORS.length];
          return `<button class="node ${esc(st.kind || "step")}" data-i="${i}" style="left:${p.x}px;top:${p.y}px;width:${NW}px;height:${NH}px;border-left:4px solid ${lc}">
          ${st.kind === "decision" ? `<span class="k">decision</span>` : ""}<b>${esc(st.title)}</b>${st.kind !== "start" && st.kind !== "end" && st.short ? `<small>${esc(st.short)}</small>` : ""}${st.screen && S.screens[st.screen] ? `<span class="scr">●</span>` : ""}</button>`; }).join("")}
      </div></div>
      <div class="flowdetail"><div class="stepcard" id="stepcard"></div><div class="steplist">${steps.map((st, i) => `<button data-i="${i}"><span class="i">${i + 1}</span><span><b>${esc(st.title)}</b><small>${esc(lanes[pos[st.id].li].label)}</small></span></button>`).join("")}</div></div>
      ${f.notes ? `<div class="prose section">${f.notes}</div>` : ""}
    </div>`);
    c.appendChild(root);
    const svg = $("svg.wires", root), canvas = $(".flowcanvas", root);

    function wires() {
      const cur = steps[active].id;
      svg.innerHTML = edges.map((e) => {
        const a = pos[e.from], b = pos[e.to];
        const on = e.from === cur;
        let d, tip, lx, ly;
        if (b.x > a.x) { // forward: right side → left side, elbow
          const x1 = a.x + NW, y1 = a.y + NH / 2, x2 = b.x - 4, y2 = b.y + NH / 2, mx = (x1 + x2) / 2;
          d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`; tip = [x2, y2, 0]; lx = mx; ly = (y1 + y2) / 2;
        } else if (b.x === a.x) { // same column: bottom → top (or top → bottom)
          const down = b.y > a.y; const x1 = a.x + NW / 2, y1 = down ? a.y + NH : a.y, y2 = down ? b.y - 4 : b.y + NH + 4;
          d = `M${x1},${y1} L${x1},${y2}`; tip = [x1, y2, down ? 90 : -90]; lx = x1 + 6; ly = (y1 + y2) / 2;
        } else { // back to an earlier column: loop under the lanes
          const x1 = a.x + NW / 2, y1 = a.y + NH, x2 = b.x + NW / 2, y2 = b.y + NH + 4, yy = Math.max(y1, y2) + 18;
          d = `M${x1},${y1} L${x1},${yy} L${x2},${yy} L${x2},${y2}`; tip = [x2, y2, -90]; lx = (x1 + x2) / 2; ly = yy;
        }
        const r = (tip[2] * Math.PI) / 180, s = 8;
        const pts = `${tip[0]},${tip[1]} ${tip[0] - s * Math.cos(r - 0.45)},${tip[1] - s * Math.sin(r - 0.45)} ${tip[0] - s * Math.cos(r + 0.45)},${tip[1] - s * Math.sin(r + 0.45)}`;
        const lab = e.label ? `<g class="lb"><rect x="${lx - e.label.length * 3.3 - 7}" y="${ly - 10}" width="${e.label.length * 6.6 + 14}" height="19" rx="9"/><text x="${lx}" y="${ly + 4}" text-anchor="middle">${esc(e.label)}</text></g>` : "";
        return `<path class="${on ? "on" : ""}" d="${d}"/><polygon class="${on ? "on" : ""}" points="${pts}"/>${lab}`;
      }).join("");
    }
    function setActive(i, user) {
      active = (i + steps.length) % steps.length;
      if (user) history.replaceState(null, "", `#/flow/${f.id}/${active + 1}`);
      const st = steps[active];
      root.querySelectorAll(".node").forEach((n) => { const k = +n.dataset.i; n.classList.toggle("on", k === active); n.classList.toggle("done", k < active); });
      root.querySelectorAll(".steplist button").forEach((n) => n.classList.toggle("on", +n.dataset.i === active));
      const lane = lanes[pos[st.id].li];
      const scr = st.screen && S.screens[st.screen];
      $("#stepcard", root).innerHTML = `<span class="who">Step ${active + 1} of ${steps.length} · ${esc(lane.label)}</span><h3>${esc(st.title)}</h3>
        <p>${esc(st.text || st.short || "")}</p>
        ${st.rule ? `<div class="callout"><b>Rule</b>${esc(st.rule)}</div>` : ""}
        ${scr ? crop(st.screen, st.mark, Math.min(560, ($("#stepcard", root).clientWidth || 520) - 32)) + `<a class="btn" style="align-self:flex-start" href="#/screen/${scr.id}">Open the ${esc(scr.title)} guide →</a>` : ""}
        ${st.link ? `<a class="btn" style="align-self:flex-start" href="${esc(st.link.href)}">${esc(st.link.label)} →</a>` : ""}`;
      wires();
      const node = root.querySelector(`.node[data-i="${active}"]`);
      if (node && user) { const box = $(".flowbox", root); box.scrollTo({ left: Math.max(0, node.offsetLeft - box.clientWidth / 2 + NW / 2), behavior: "smooth" }); }
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; canvas.classList.remove("playing"); $("[data-act=play]", root).textContent = "▶ Play the flow"; } }
    root.addEventListener("click", (e) => {
      const n = e.target.closest(".node,.steplist button");
      if (n) { stop(); setActive(+n.dataset.i, true); return; }
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "next") { stop(); setActive(active + 1, true); }
      if (act === "prev") { stop(); setActive(active - 1, true); }
      if (act === "play") {
        if (timer) return stop();
        canvas.classList.add("playing"); e.target.textContent = "■ Stop";
        setActive(0, true);
        timer = setInterval(() => { if (active >= steps.length - 1) return stop(); setActive(active + 1, true); }, 2600);
      }
    });
    const onKey = (e) => {
      if (e.target.closest("input,textarea")) return;
      if (e.key === "ArrowRight") { stop(); setActive(active + 1, true); }
      if (e.key === "ArrowLeft") { stop(); setActive(active - 1, true); }
    };
    document.addEventListener("keydown", onKey);
    cleanup = () => { stop(); document.removeEventListener("keydown", onKey); };
    setActive(active, false);
    void order;
  }

  // ───── concept page ─────
  function renderPage(c, id) {
    const p = S.pages[id];
    if (!p) { c.appendChild(h(`<div class="empty">Page not found.</div>`)); return; }
    c.appendChild(h(`<div>
      <div class="crumbs"><a href="#/">Start</a><span class="sep">/</span><span>${esc(p.group || "Concepts")}</span></div>
      <div class="pagehead"><h1>${p.icon || ""} ${esc(p.title)}</h1>${p.summary ? `<p class="lede">${esc(p.summary)}</p>` : ""}</div>
      <div class="prose">${p.body || ""}</div>
    </div>`));
    // [[screen:id/mark]] and [[flow:id]] shortcuts inside page bodies become crops / cards
    c.querySelectorAll("[data-crop]").forEach((el) => { const [sid, mid] = el.dataset.crop.split("/"); el.outerHTML = crop(sid, mid, Math.min(680, el.parentElement.clientWidth || 680)); });
  }

  // ───── search ─────
  function index() {
    const out = [];
    S.order.screens.forEach((id) => {
      const s = S.screens[id];
      out.push({ t: s.title, sub: (APPS[s.app]?.label || s.app) + " · screen", body: s.summary || "", href: `#/screen/${s.id}` });
      sortedMarks(s).forEach((m, i) => out.push({ t: m.label, sub: `${s.title} · step ${i + 1}`, body: m.text || "", href: `#/screen/${s.id}/${i + 1}` }));
    });
    S.order.flows.forEach((id) => {
      const f = S.flows[id];
      out.push({ t: f.title, sub: "Workflow", body: f.summary || "", href: `#/flow/${f.id}` });
      f.steps.forEach((st, i) => out.push({ t: st.title, sub: `${f.title} · step ${i + 1}`, body: (st.text || st.short || "") + " " + (st.rule || ""), href: `#/flow/${f.id}/${i + 1}` }));
    });
    S.order.pages.forEach((id) => { const p = S.pages[id]; out.push({ t: p.title, sub: p.group || "Concepts", body: (p.summary || "") + " " + strip(p.body), href: `#/page/${p.id}` }); });
    return out;
  }
  function renderSearch(c, q) {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = !words.length ? [] : index().map((r) => {
      const hay = (r.t + " " + r.body).toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      return { ...r, score: words.reduce((t, w) => t + (r.t.toLowerCase().includes(w) ? 3 : 1), 0) };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 60);
    const hl = (s) => { let o = esc(s); words.forEach((w) => { o = o.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); }); return o; };
    const snip = (b) => { const l = b.toLowerCase(); const i = Math.max(0, l.indexOf(words[0]) - 50); return (i ? "…" : "") + b.slice(i, i + 170).trim() + (b.length > i + 170 ? "…" : ""); };
    c.appendChild(h(`<div><div class="pagehead"><h1>Search</h1><p class="lede">${hits.length ? `${hits.length} results for “${esc(q)}”` : `Nothing found for “${esc(q)}”. Try fewer words.`}</p></div>
      <div class="results">${hits.map((r) => `<a class="result" href="${r.href}"><b>${hl(r.t)}</b><small>${esc(r.sub)}</small>${r.body ? `<small>${hl(snip(r.body))}</small>` : ""}</a>`).join("")}</div></div>`));
  }

  // ───── boot ─────
  function boot() {
    const saved = store.get("theme");
    if (saved) document.documentElement.dataset.theme = saved;
    $("#theme").addEventListener("click", () => {
      const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme = dark ? "light" : "dark";
      store.set("theme", document.documentElement.dataset.theme);
    });
    $("#menu").addEventListener("click", () => document.body.classList.add("nav-open"));
    $(".scrim").addEventListener("click", () => document.body.classList.remove("nav-open"));
    const q = $("#q");
    let t;
    q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { location.hash = q.value.trim() ? "#/search/" + encodeURIComponent(q.value.trim()) : "#/"; }, 220); });
    document.addEventListener("keydown", (e) => { if (e.key === "/" && !e.target.closest("input,textarea")) { e.preventDefault(); q.focus(); } });
    load(() => { buildNav(); route(); });
    addEventListener("hashchange", route);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
