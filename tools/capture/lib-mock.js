// Answers every request the frontend makes to http://mock.api/api/v1/web/... from fixtures.
// Nothing ever reaches a real backend: requests to any other non-local host are aborted.
const { handlers } = require("./fixtures");

const API_PREFIX = "/api/v1/web/";

function compile(h) {
  if (h.path instanceof RegExp) return { ...h, re: h.path, keys: [] };
  const keys = [];
  const src = h.path
    .replace(/^\/+|\/+$/g, "")
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:(\w+)/g, (_, k) => { keys.push(k); return "([^/]+)"; });
  return { ...h, re: new RegExp(`^${src}$`), keys };
}
const compiled = handlers.map(compile);

function find(method, path, list) {
  for (const h of list) {
    if ((h.method || "GET") !== method) continue;
    const m = path.match(h.re);
    if (!m) continue;
    const params = {};
    (h.keys || []).forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
    return { h, params };
  }
  return null;
}

/** A safe guess for endpoints with no fixture, so a page renders instead of erroring. */
function fallback(method) {
  if (method === "GET") return { success: true, data: [] };
  return { success: true, data: {} };
}

function cors() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  };
}

/** `overrides`: a screen's own handlers (same shape as fixtures), tried before the shared ones. */
async function install(context, log, overrides = []) {
  const list = [...overrides.map(compile), ...compiled];
  await context.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname === "mock.api") {
      const method = req.method();
      if (method === "OPTIONS") return route.fulfill({ status: 204, headers: cors() });
      const full = url.pathname.startsWith(API_PREFIX) ? url.pathname.slice(API_PREFIX.length) : url.pathname.replace(/^\/+/, "");
      const clean = full.replace(/\/+$/, "");
      const query = Object.fromEntries(url.searchParams.entries());
      let body = null;
      try { body = req.postDataJSON(); } catch { body = req.postData(); }
      const hit = find(method, clean, list);
      let status = 200;
      let payload;
      let contentType = "application/json";
      if (hit) {
        const r = typeof hit.h.reply === "function"
          ? hit.h.reply({ params: hit.params, query, body, method, path: clean })
          : hit.h.reply;
        status = hit.h.status || 200;
        if (hit.h.raw) { payload = r; contentType = hit.h.contentType || "text/plain"; }
        else payload = JSON.stringify(r);
      } else {
        log.unknown.add(`${method} ${clean}${url.search}`);
        payload = JSON.stringify(fallback(method));
      }
      log.hits.add(`${method} ${clean}`);
      return route.fulfill({ status, headers: { ...cors(), "content-type": contentType }, body: payload });
    }
    // The dev server, data:/blob: URLs and Google Fonts are allowed; everything else is blocked.
    if (["localhost", "127.0.0.1"].includes(url.hostname) || url.protocol === "data:" || url.protocol === "blob:"
        || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
      return route.continue();
    }
    log.blocked.add(`${req.method()} ${url.origin}${url.pathname}`);
    return route.abort();
  });
}

module.exports = { install };
