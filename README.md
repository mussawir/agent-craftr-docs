# AgentCraftr Docs

One place for all AgentCraftr documentation: how things work, how to use them, and how they are built.

AgentCraftr is a multi-tenant SaaS where an AI agent answers WhatsApp (and other messaging) conversations
for a business, over that business's own products, prices and knowledge. Around the agent sit the
tools the business runs on: inbox and human handover, orders, payments, bookings, requests, CRM,
khata (credit), marketing, staff tasks and reports. It has a web dashboard and a mobile app
(owner, staff and partner modes, plus the "Ac" app family).

**Direction and decisions:** see [MASTER-PLAN.md](MASTER-PLAN.md): names, products, money, payments, prices,
AI models, hardware, countries, launch tasks and who does what.

## Open the interactive docs

**Open `site/index.html` in a browser.** There's no build step and no server: it works straight from the folder.

What's in it:

| Part | What it shows |
|---|---|
| **Screen guides** | Real screenshots of the web dashboard, mobile app, partner pages and admin. Numbered boxes mark each action, and arrows show what you can do next. Three views: *Step by step* (a guided tour with a spotlight; use ← → on the keyboard), *All marks* and *Clean*. |
| **Workflows** | Who does what, in order, in swimlanes: customer, AI, your team, the system checks. Press *Play* to walk through it. Steps that happen on a screen show a cropped piece of that screenshot, linked to its guide. |
| **Understand it** | Short concept pages: Items, the agent and handover, trades and features, roles, plans, consent, glossary. |
| **Search** | Every screen, action, workflow step and page. Press `/` to search. |
| **Marking editor** | `site/editor.html`: paste a screenshot, drag boxes over buttons, join them with arrows and save the screen file. |

To share it, upload the `site/` folder to any static host (for example a `docs.` subdomain on the same cPanel as agentcraftr.com).

## Who this is for

| Reader | Start here |
|---|---|
| Business owners and their staff | `site/` → "I own a business" / "I work for a business" |
| Mobile app users | `site/` → Mobile app |
| Partners and Trade Holders | `site/` → "I'm a partner", then `partners/` |
| Our support and onboarding team | `site/` → Admin, then `operations/` |
| Developers | `technical/` |
| Anyone new to the product | `site/` → "What AgentCraftr is" |

## What's inside

```
site/                 The interactive documentation (open site/index.html)
  index.html          The site: menu, search, screen viewer, workflow diagrams
  editor.html         Marking editor: draw boxes and arrows on a screenshot, save the screen file
  assets/             docs.css (one stylesheet, light + dark) and docs.js (the engine)
  data/index.js       THE LIST of every screen, workflow and page the site loads, in menu order
  data/screens/       One file per annotated screenshot (format: data/SCREEN-FORMAT.md)
  data/flows/         One file per workflow (lanes + steps)
  data/pages/         One file per concept page
  images/             Screenshots: web/ admin/ partner/ mobile/
tools/capture/        Takes the web screenshots automatically, with demo data, and measures
                      where each marked button is (see tools/capture/README.md)

concepts/      What things are and why: Items, trades and workflows, the AI agent and handover,
               stages, khata, consent, plans and limits, partners and Trade Holders
workflows/     Each workflow from start to finish, with who does what: number setup, orders,
               payments, bookings, date bookings, quotes, jobs, complaints, enquiries,
               field reports, broadcasts, follow-ups, tasks and approvals
user-guide/    Step-by-step training for the web dashboard and the mobile app, by role
               (owner, staff, warehouse, rider, technician), with screenshots
partners/      Partner and Trade Holder handbook: covering cities and trades, adding a business,
               discounts and trial extensions, earnings and payouts
operations/    Internal runbooks: onboarding a business, number health, Meta business
               verification, payments to confirm, deploying, live checks
technical/     Architecture, data model, services, APIs, events and the outbox, channel adapters,
               security (tokens, tenant isolation, view-as, help mode), migrations, testing
decisions/     Product decisions with their date and reasoning, so they aren't argued twice
```

The Markdown folders are for long-form text (runbooks, technical notes, decisions). Anything a user
should *see* goes in `site/`.

## How to add or update content

### A web screenshot
Web screens are captured automatically, so they never show real customer data:

```
cd tools/capture
npm install          # first time only
npm run capture      # all screens, or: npm run capture -- web-orders
```

It starts the web dashboard with demo data, opens each screen, saves `site/images/<app>/<id>.png`
and writes `site/data/screens/<id>.js` with the boxes measured from the real page. When the UI
changes, run it again: the boxes follow the buttons. To add a screen, add an entry to
`tools/capture/screens.config.js` (route, which elements to mark, what to say about them).

### A mobile screenshot
1. Take the screenshot on the phone (demo account, never a real customer).
2. Open `site/editor.html`, click **Open screen file**, and pick the screen's file from
   `site/data/screens/` (for example `mobile-orders.js`). Its steps are already written.
3. Paste the screenshot (Ctrl + V) and drag a box over each button, in order. Each box fills the
   next step that has no box yet.
4. **⬇ Screen file** → replace the file in `site/data/screens/`. **⬇ Image** → save it at the path shown
   (for example `site/images/mobile/orders.png`).

### A workflow
Add `site/data/flows/<id>.js` with lanes (who) and steps (what), then add the id to `site/data/index.js`.
A step with `screen` + `mark` shows that piece of the screenshot. Copy an existing flow as a starting point.

### A concept page
Add `site/data/pages/<id>.js` (`Docs.page({ id, group, title, summary, body })`, body is HTML) and
list it in `site/data/index.js`.

## Related repositories

| Repo | What it is |
|---|---|
| `salesagent-backend` | FastAPI + PostgreSQL (pgvector) API, the AI agent and channel adapters |
| `salesagent-frontend` | Web dashboard (Vite + React + MUI) |
| `agentcraftr-app` | Flutter mobile app (owner, staff and partner modes; Ac Khata edition) |

The code repos keep their own developer notes (`CLAUDE.md`, `docs/`). This repo is where those
notes become documentation people can read and learn from.

## Writing rules

- **Plain words.** Write for a shop owner first, a developer second. Avoid jargon.
  If a term is needed, define it once in the glossary (`site/data/pages/glossary.js`).
- **Use the screen's own words.** A mark's label is the button's exact text, so readers can find it.
- **One topic per page.** Link instead of repeating.
- **Show the real screen.** Every action a new user must learn gets a numbered box. Arrows only for
  "what you do next", not decoration. 3–7 marks per screen.
- **Date every decision** in `decisions/` (`YYYY-MM-DD-topic.md`) with who decided it and why.
- **English first.** Urdu / Roman Urdu versions of the user guides sit beside the English page
  as `<page>.ur.md`.
- **Never** put secrets, API keys, customer data or real phone numbers in this repo, and never in
  a screenshot. Use the demo shop.

## Status

- **Interactive site**: built. 25 web, partner and admin screens captured with demo data
  (171 marked actions across all screens), 9 workflows, 8 concept pages. The 7 mobile screens have
  their steps written and need phone screenshots (use the marking editor).
- **Markdown folders**: content is still being moved here from the code repos' notes and design documents.
