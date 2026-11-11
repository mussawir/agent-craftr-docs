#!/usr/bin/env node
/*
 * AgentCraftr docs screenshot capture.
 *
 *   node capture.js                 all screens
 *   node capture.js web-inbox ...   only these ids (or prefixes ending in *, e.g. "admin-*")
 *
 * Starts the frontend's Vite dev server with VITE_API_BASE_URL=http://mock.api/api/v1/web,
 * answers every API call from ./fixtures, screenshots each screen in screens.config.js to
 * site/images/<app>/<name>.png and writes site/data/screens/<id>.js (see site/data/SCREEN-FORMAT.md).
 * Env: FRONTEND_DIR (default ../../../salesagent-frontend), SHOW_ERRORS=1 prints browser console errors.
 */
const fs = require("fs");
const path = require("path");
const net = require("net");
const { spawn } = require("child_process");
const { chromium } = require("playwright");
const mock = require("./lib-mock");
const config = require(process.env.CAPTURE_CONFIG || "./screens.config");

const FRONTEND = process.env.FRONTEND_DIR || path.resolve(__dirname, "../../../salesagent-frontend");
const SITE = path.resolve(__dirname, "../../site");
const PAD = 6;

function freePort(start = 5300) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.once("error", () => resolve(freePort(start + 1)));
    s.listen(start, "127.0.0.1", () => s.close(() => resolve(start)));
  });
}

async function startVite() {
  const port = await freePort();
  const viteBin = path.join(FRONTEND, "node_modules", "vite", "bin", "vite.js");
  if (!fs.existsSync(viteBin)) throw new Error(`Vite not found at ${viteBin} - run npm install in the frontend first.`);
  // Process env wins over the frontend's .env files, so nothing is written in that repo.
  const env = { ...process.env, VITE_API_BASE_URL: "http://mock.api/api/v1/web", VITE_BASE: "/", BROWSER: "none" };
  const child = spawn(process.execPath, [viteBin, "--port", String(port), "--strictPort", "--host", "127.0.0.1"], {
    cwd: FRONTEND, env, stdio: ["ignore", "pipe", "pipe"],
  });
  let out = "";
  child.stdout.on("data", (d) => (out += d));
  child.stderr.on("data", (d) => (out += d));
  const base = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 120; i++) {
    if (child.exitCode !== null) throw new Error(`Vite exited:\n${out}`);
    try {
      const r = await fetch(base + "/");
      if (r.ok) return { child, base };
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  child.kill();
  throw new Error(`Vite did not start:\n${out}`);
}

function selectScreens(args) {
  const ids = args.filter((a) => !a.startsWith("--"));
  if (!ids.length) return config.screens;
  return config.screens.filter((s) => ids.some((p) => (p.endsWith("*") ? s.id.startsWith(p.slice(0, -1)) : s.id === p)));
}

const HIDE_MOTION = `
  *, *::before, *::after { transition: none !important; animation-duration: 0s !important;
    animation-delay: 0s !important; caret-color: transparent !important; scroll-behavior: auto !important; }
`;

const BUSY = ".MuiCircularProgress-root:not([data-keep]), .MuiSkeleton-root, .MuiLinearProgress-indeterminate";

async function runAction(page, a) {
  if (typeof a === "function") return a(page);
  const loc = () => (a.nth != null ? page.locator(a.sel).nth(a.nth) : page.locator(a.sel).first());
  switch (a.do) {
    case "click": await loc().click(); break;
    case "fill": await loc().fill(a.value); break;
    case "hover": await loc().hover(); break;
    case "press": await page.keyboard.press(a.key); break;
    case "wait": await page.waitForTimeout(a.ms || 300); break;
    case "waitFor": await loc().waitFor({ state: a.state || "visible", timeout: a.timeout || 10000 }); break;
    case "scroll": await loc().scrollIntoViewIfNeeded(); break;
    case "scrollY": await page.evaluate((y) => window.scrollTo(0, y), a.y); break;
    case "eval": await page.evaluate(a.fn, a.arg); break;
    default: throw new Error(`unknown action ${a.do}`);
  }
}

async function settle(page) {
  try { await page.waitForLoadState("networkidle", { timeout: 8000 }); } catch { /* polling pages */ }
  try {
    await page.waitForFunction((sel) => !document.querySelector(sel), BUSY, { timeout: 8000 });
  } catch { /* reported by the checks below */ }
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(250);
}

async function measure(page, mark, W, H) {
  const all = page.locator(mark.sel);
  const n = await all.count();
  if (!n) throw new Error(`mark "${mark.id}": nothing matches ${mark.sel}`);
  const targets = mark.all ? [...Array(n).keys()].map((i) => all.nth(i)) : [all.nth(mark.nth || 0)];
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const t of targets) {
    const b = await t.boundingBox();
    if (!b) continue;
    x1 = Math.min(x1, b.x); y1 = Math.min(y1, b.y);
    x2 = Math.max(x2, b.x + b.width); y2 = Math.max(y2, b.y + b.height);
  }
  if (!isFinite(x1)) throw new Error(`mark "${mark.id}": ${mark.sel} is not visible`);
  const pad = mark.pad ?? PAD;
  x1 = Math.max(0, Math.round(x1 - pad)); y1 = Math.max(0, Math.round(y1 - pad));
  x2 = Math.min(W, Math.round(x2 + pad)); y2 = Math.min(H, Math.round(y2 + pad));
  if (x2 - x1 < 8 || y2 - y1 < 8) throw new Error(`mark "${mark.id}": box is off screen (${mark.sel})`);
  return [x1, y1, x2 - x1, y2 - y1];
}

function fileName(s) { return s.file || s.id.replace(new RegExp(`^${s.app}-`), ""); }

function screenJs(s, marks, W, H) {
  const obj = {
    id: s.id, app: s.app, section: s.section, title: s.title, route: s.route, roles: s.roles,
    summary: s.summary, image: `images/${s.app}/${fileName(s)}.png`, width: W, height: H,
    marks, arrows: s.arrows || [],
  };
  // Short arrays of plain values (box, roles) stay on one line.
  const json = JSON.stringify(obj, null, 2).replace(/\[\s*((?:(?:-?\d+|"[^"\n]*"),\s*)*(?:-?\d+|"[^"\n]*"))\s*\]/g,
    (_, inner) => `[${inner.split(/,\s*/).join(", ")}]`);
  return `// Generated by tools/capture (node capture.js). Edit tools/capture/screens.config.js, not this file.\nDocs.screen(${json});\n`;
}

async function captureScreen(browser, base, s, log) {
  const vp = s.viewport || config.viewport;
  const user = s.as === null ? null : config.users[s.as || "owner"];
  const context = await browser.newContext({
    viewport: vp, deviceScaleFactor: 1, locale: "en-US", timezoneId: "Asia/Karachi",
    reducedMotion: "reduce", colorScheme: "light",
  });
  await context.clock.setFixedTime(new Date(config.frozenNow));
  await mock.install(context, log, s.fixtures || []);
  await context.addInitScript(({ user, css }) => {
    try {
      if (user) {
        localStorage.setItem("token", "demo.token.signature");
        localStorage.setItem("user", JSON.stringify(user));
      } else { localStorage.removeItem("token"); localStorage.removeItem("user"); }
    } catch { /* */ }
    const add = () => { const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); };
    if (document.head) add(); else document.addEventListener("DOMContentLoaded", add);
  }, { user, css: HIDE_MOTION });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text().slice(0, 300)}`); });
  try {
    await page.goto(base + s.route, { waitUntil: "domcontentloaded" });
    await settle(page);
    for (const a of s.before || []) { await runAction(page, a); await settle(page); }
    if (s.waitFor) await page.locator(s.waitFor).first().waitFor({ timeout: 10000 });
    await page.mouse.move(vp.width - 2, vp.height - 2); // no stray hover
    await page.waitForTimeout(200);

    const problems = await page.evaluate((sel) => {
      const p = [];
      if (document.querySelector(sel)) p.push("spinner/skeleton visible");
      document.querySelectorAll(".MuiAlert-standardError, .MuiAlert-filledError, .MuiAlert-outlinedError")
        .forEach((e) => p.push(`error alert: ${e.textContent.trim().slice(0, 120)}`));
      return p;
    }, BUSY);
    if (page.url().replace(base, "").split("?")[0] !== s.route.split("?")[0]) problems.push(`redirected to ${page.url().replace(base, "")}`);

    const marks = [];
    for (const m of s.marks || []) {
      const box = await measure(page, m, vp.width, vp.height);
      const out = { id: m.id, n: m.n, box, kind: m.kind || "action", label: m.label, text: m.text };
      if (m.go) out.go = m.go;
      marks.push(out);
    }
    const ids = new Set(marks.map((m) => m.id));
    for (const a of s.arrows || []) if (!ids.has(a.from) || !ids.has(a.to)) throw new Error(`arrow ${a.from}->${a.to} names a missing mark`);

    const img = path.join(SITE, "images", s.app, fileName(s) + ".png");
    fs.mkdirSync(path.dirname(img), { recursive: true });
    await page.screenshot({ path: img, animations: "disabled", caret: "hide" });
    fs.mkdirSync(path.join(SITE, "data", "screens"), { recursive: true });
    fs.writeFileSync(path.join(SITE, "data", "screens", s.id + ".js"), screenJs(s, marks, vp.width, vp.height));

    // Helpers for writing marks (never part of the site):
    //   DUMP_DIR=...    a full-page screenshot plus every visible control's text and box
    //   PREVIEW_DIR=... the screenshot with the mark boxes drawn on it, to check they land right
    if (process.env.DUMP_DIR) {
      fs.mkdirSync(process.env.DUMP_DIR, { recursive: true });
      const controls = await page.evaluate(() => [...document.querySelectorAll(
        "button, a, [role=tab], input, textarea, select, h1, h2, h3, h4, h5, h6, th, .MuiChip-root, .MuiPaper-root > .MuiTypography-root")]
        .map((e) => { const r = e.getBoundingClientRect(); return { tag: e.tagName.toLowerCase(), text: (e.innerText || e.value || e.getAttribute("aria-label") || e.getAttribute("placeholder") || "").trim().slice(0, 60), box: [r.x, r.y, r.width, r.height].map(Math.round) }; })
        .filter((c) => c.box[2] > 0 && c.box[3] > 0));
      fs.writeFileSync(path.join(process.env.DUMP_DIR, s.id + ".json"), JSON.stringify(controls, null, 1));
      await page.screenshot({ path: path.join(process.env.DUMP_DIR, s.id + "-full.png"), fullPage: true });
    }
    if (process.env.PREVIEW_DIR && marks.length) {
      fs.mkdirSync(process.env.PREVIEW_DIR, { recursive: true });
      await page.evaluate((ms) => {
        for (const m of ms) {
          const d = document.createElement("div");
          d.style.cssText = `position:fixed;left:${m.box[0]}px;top:${m.box[1]}px;width:${m.box[2]}px;height:${m.box[3]}px;border:3px solid ${m.kind === "info" ? "#2563eb" : "#e11d48"};z-index:99999;pointer-events:none;border-radius:6px`;
          const b = document.createElement("div");
          b.textContent = m.n;
          b.style.cssText = `position:absolute;left:-12px;top:-12px;width:24px;height:24px;border-radius:12px;background:${m.kind === "info" ? "#2563eb" : "#e11d48"};color:#fff;font:700 13px/24px sans-serif;text-align:center`;
          d.appendChild(b);
          document.body.appendChild(d);
        }
      }, marks);
      await page.screenshot({ path: path.join(process.env.PREVIEW_DIR, s.id + ".png") });
    }
    return { problems, errors };
  } finally {
    await context.close();
  }
}

(async () => {
  const args = process.argv.slice(2);
  const screens = selectScreens(args);
  if (!screens.length) { console.error("No screens match."); process.exit(1); }
  const goIds = new Set(config.screens.map((s) => s.id));
  for (const s of config.screens) for (const m of s.marks || []) {
    if (m.go && !goIds.has(m.go)) console.log(`note: ${s.id} mark "${m.id}" goes to unknown screen "${m.go}"`);
  }
  const { child, base } = await startVite();
  console.log(`dev server ${base}`);
  const browser = await chromium.launch();
  const failed = [];
  const log = { unknown: new Set(), hits: new Set(), blocked: new Set() };
  try {
    // Warm the dev server (the first load compiles every module).
    const warm = await browser.newPage();
    await warm.goto(base + "/login", { waitUntil: "networkidle", timeout: 120000 }).catch(() => {});
    await warm.close();
    for (const s of screens) {
      const before = new Set(log.unknown);
      try {
        const { problems, errors } = await captureScreen(browser, base, s, log);
        const newUnknown = [...log.unknown].filter((u) => !before.has(u));
        const bad = problems.length > 0;
        console.log(`${bad ? "WARN" : "ok  "} ${s.id}${problems.length ? "  " + problems.join("; ") : ""}`);
        newUnknown.forEach((u) => console.log(`       unknown endpoint: ${u}`));
        if (process.env.SHOW_ERRORS) errors.forEach((e) => console.log(`       ${e}`));
        if (bad) failed.push(s.id);
      } catch (e) {
        console.log(`FAIL ${s.id}  ${e.message.split("\n")[0]}`);
        failed.push(s.id);
      }
    }
  } finally {
    await browser.close();
    child.kill();
  }
  if (log.blocked.size) console.log("blocked outside requests:\n  " + [...log.blocked].join("\n  "));
  if (log.unknown.size) console.log(`unknown endpoints answered with an empty value (${log.unknown.size}):\n  ` + [...log.unknown].sort().join("\n  "));
  console.log(failed.length ? `\n${failed.length} screen(s) need attention: ${failed.join(", ")}` : `\nAll ${screens.length} screens captured.`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
