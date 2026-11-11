# Screenshot capture

Makes the annotated screenshots for the docs site from the real web dashboard
(`salesagent-frontend`), with a fake demo business instead of real data.

For every screen in `screens.config.js` it writes

- `site/images/<app>/<name>.png` (1440 x 900), and
- `site/data/screens/<id>.js`, a `Docs.screen({...})` file in the format of `site/data/SCREEN-FORMAT.md`,
  with each mark's box measured from the page.

Re-running regenerates everything. Output is byte-for-byte the same on every run (frozen clock, no animations).

## Run it

Needs Node 18+ and the frontend checked out next to this repo (`../salesagent-frontend`, with its
`node_modules` installed). The frontend is only read and run, never changed.

```
cd tools/capture
npm install            # Playwright 1.62.0 (uses Chromium build 1234; `npx playwright install chromium` if missing)
npm run capture        # all screens
node capture.js web-inbox admin-*   # some screens (ids, or a prefix ending in *)
```

What it does:

1. Starts the frontend's Vite dev server on a free port (from 5300) with
   `VITE_API_BASE_URL=http://mock.api/api/v1/web` set in the process environment.
2. Opens Chromium, freezes the clock at Wednesday 11 Nov 2026, 4:30 pm Lahore time, signs in by putting a
   demo token and user in `localStorage`, and answers **every** request to `mock.api` from `fixtures/`.
   Any other outside request is blocked, so the real backend and database are never reached.
3. For each screen: opens the route, waits for the network and spinners to settle, runs the screen's
   `before` steps, measures the marks, takes the screenshot and writes the files.

At the end it lists failed screens and any API call that had no fixture (those got an empty answer).
The run fails (exit 1) if a mark's selector matches nothing, a spinner or a red error box is still showing,
or the page redirected somewhere else.

Other settings: `FRONTEND_DIR=...` points at a different frontend checkout; `SHOW_ERRORS=1` prints the
browser's console errors.

## Add a screen

Add an entry to `screens` in `screens.config.js`:

```js
{
  id: "web-deals", app: "web", section: "Sales", title: "Deals", route: "/app/deals", roles: ["owner", "staff"],
  summary: "One or two plain sentences for a shop owner.",
  // as: "admin" | "partner" | null (signed out); default is the owner
  // before: [{ do: "click", sel: "tr:has-text(\"#1043\")" }, { do: "scrollY", y: 400 }],
  // fixtures: [{ path: "deals", reply: () => ({ success: true, data: [] }) }],  // this screen only
  marks: [
    { id: "new", n: 1, sel: "role=button[name=\"New deal\"]", label: "New deal", text: "What it does and why." },
    { id: "stage", n: 2, kind: "info", sel: "tr:has-text(\"Sadia\") >> .MuiChip-root", label: "Stage", text: "..." },
  ],
  arrows: [{ from: "new", to: "stage", label: "then" }],
}
```

- `sel` is a Playwright selector: CSS (with `:has-text()`, `:text-is()`, `:has()`), `text=...`,
  `role=button[name="Save"]`, chained with `>>`. `nth: -1` takes the last match; `all: true` boxes every match
  together; `pad` changes the 6 px padding. Prefer the visible label (`role=button[name=...]`) so a mark
  breaks loudly if the page changes.
- `kind`: `action` (something to click), `info` (something to read), `warn`.
- `go`: the id of the screen this action opens.
- The file name of the image is the id without the `<app>-` prefix (`web-deals` -> `images/web/deals.png`).
- Register new screen ids in `site/data/index.js` so the site loads them.

Two helpers for writing marks (their output is not part of the site):

```
PREVIEW_DIR=../../.preview node capture.js web-deals   # the screenshot with the mark boxes drawn on it
DUMP_DIR=../../.dump node capture.js web-deals         # full-page screenshot + every visible control's text and box
```

Look at the preview before committing: boxes must sit on the right elements.

## Fixtures

`fixtures/` holds the fake API:

| File | What |
|---|---|
| `data.js` | The demo business, Al-Noor Kiryana Store (Lahore): team, items, numbers, customers, chats, orders, payment screenshots. Also the frozen time and the `ago()`/`at()` helpers so every date is relative to it. |
| `owner.js` | Answers for the owner dashboard (`/app/...`). |
| `admin.js` | Answers for the SuperAdmin panel (other demo tenants). |
| `partner.js` | Answers for the partner pages (partner Usman Tariq). |
| `public.js` | Plans, countries, trades and cities for sign-up. |
| `media.js` | SVG pictures for photos and payment screenshots. |
| `index.js` | Puts them in match order. |

A handler is `{ method = "GET", path, reply, status?, raw?, contentType? }`. `path` is relative to
`/api/v1/web/`, without a trailing slash, with `:name` parameters (or a RegExp). `reply` is the JSON body
(the backend wraps everything as `{ success: true, data }`) or a function `({ params, query, body }) => body`.
The first matching handler wins; a screen's own `fixtures` are tried first.

Where the shapes come from: the frontend's `src/services/*.ts` types (they mirror the backend) and its
`*.test.tsx` mocks; for anything else, the backend's `app/services` and `app/routes`.

Rules for demo data: invented names only, phone numbers `92300 0000xxx`, money in PKR, chats in a mix of
English and Roman Urdu. Never copy real customer data into a fixture.
