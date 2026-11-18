# AgentCraftr Master Plan

**Where we are going, what we have decided, and who does what next.**

| | |
|---|---|
| Started | 14 November 2026 |
| Decided by | Mussawir |
| For | The software team, the hardware team (forming), Trade Partners and future investors |
| Status | Living document: discuss it as a team, then assign the work in section 12 |

**How to read it.** Every point is marked:

- ✅ **Decided**: settled. Don't reopen it without a new reason.
- 🟡 **Proposed**: a recommendation still waiting for a decision.
- ❓ **Open**: still to be discussed.

When something is decided, change its mark and add a line to the decision log (section 14).

---

## 1. The direction in one paragraph

AgentCraftr started as an AI agent that answers WhatsApp for a business. It is becoming much more than that:

- a **business system**: an AI agent, a web dashboard and two mobile apps;
- run through a **local sales network**: Trade Partners and Franchise holders;
- with **our own hardware** in the shop: printers, a POS and an AI speaker.

Everything is built for businesses where the technology is still simple. We start in Pakistan, then take the same model to Bangladesh, Sri Lanka, India, Afghanistan and Central Asia. The aim is to help people's businesses grow, honestly and simply.

---

## 2. Names: use these everywhere

✅ One name for each thing, in every screen, contract, document and conversation.

| Name | What it is | Don't call it |
|---|---|---|
| **AgentCraftr** | The company and the WhatsApp AI service with its web dashboard | — |
| **CoAgent** | The mobile app for every business (store name "CoAgent" in the Play Store and App Store): the WhatsApp communication and analytics hub. The AI agent answers; you work alongside it. Full feature list: [COAGENT.md](COAGENT.md) | "the owner app", "Ac app" |
| **SaudaSulf** (سودا سلف) | The ordering app for shops and their customers, for every trade that sells from a product list (grocery first) | "customer app", "grocery app" |
| **Trade Partner** | The top level of the sales network: holds trades or sectors in an area | Friend, Sector Manager, Trade Manager, Trade Holder |
| **Franchise holder** | The level below: holds a **franchise** (city + trade), brings in and sets up businesses | Partner, Associate |
| **Franchise** | What a Franchise holder holds, e.g. "Lahore · Grocery" | Territory, coverage |
| **Business** | A paying client (the owner of the WhatsApp number) | Tenant (only in code) |

The chain: **AgentCraftr → Trade Partner → Franchise holder → Business → their customers**

✅ **CoAgent** is the approved name (2026-11-17), the same in the Play Store and App Store. Before printing it on stands or boxes, register it as a trademark with IPO Pakistan. Developer tools with the same name exist, but no consumer app for businesses.

🔧 **Code rename needed.** The code still says `trade_holder` (role 31) and `partner` (role 30). Neither is deployed yet, so renaming now is cheap.

---

## 3. Products

| Product | Who uses it | What it does | Where the code is | Status |
|---|---|---|---|---|
| **AgentCraftr (WhatsApp AI)** | Businesses' customers, on WhatsApp | Answers text, voice notes and pictures; takes orders, bookings and requests; reads payment screenshots; hands a chat to a person | `salesagent-backend` | ✅ Built |
| **Web dashboard** | Owners and staff | Inbox, orders, payments, customers (CRM), khata, marketing, reports, setup | `salesagent-frontend` (`/app`) | ✅ Built |
| **CoAgent app** | Every business; Franchise holders also log in here | Inbox, orders, customers, khata, staff tasks with photo/video proof, approvals, "Ask your business", teach the agent ([COAGENT.md](COAGENT.md)) | `co-agent` (GitHub `agentcraftr-app`) | ✅ Built (not in the stores yet) |
| **SaudaSulf app** | Shops of every trade that sells from a product list, and their customers | Customers add a shop by code/QR, browse its catalogue, order, chat and see their orders, payments and khata; the shop runs catalogue, orders (from the app **and** WhatsApp), payments, khata and app chats | `saudasulf` | ✅ Designed, coding started |
| **Franchise holder dashboard** | Franchise holders | Their businesses, setup help, leads, earnings | web `/partner` + inside CoAgent | ✅ Built (to rename) |
| **Trade Partner dashboard** | Trade Partners | Their area, Franchise holders, businesses, earnings, "cities with no Franchise holder yet" | web `/holder` | ✅ Built (to rename); not in the app yet |
| **Admin** | AgentCraftr staff | Businesses, payments, numbers, verification, Trade Partners, activity log | web `/admin` | ✅ Built |
| **Personal WhatsApp app** (name ❓) | People on a normal WhatsApp number with many groups | Analysis of their chats and groups; AI replies they control (see "Personal WhatsApp" below) | not started | 🟡 Planned, after launch |

**Decisions on the apps:**
- ✅ Only **two store apps at launch**: CoAgent and SaudaSulf. The "Ac Khata" edition is parked (khata is inside CoAgent).
- ✅ SaudaSulf and WhatsApp are **two separate products**. A shop with both has one login and one set of data, but two subscriptions, each paid and paused on its own.
- ✅ No websites for shops. Everything is in the apps.
- ✅ Android and iPhone at launch.

**One hub, many dedicated apps (decided 2026-11-16):**
- ✅ **CoAgent is the hub.** Every business gets it with its WhatsApp package. It holds all communication, customers, analytics, marketing and lead generation. Every customer arrives through WhatsApp first, so CoAgent is where leads are found.
- ✅ **Dedicated apps for specific jobs, each sold on its own after the WhatsApp package.** SaudaSulf (ordering) is the first. A new app is added only when it is a distinct job that shops pay for separately (the stores reject look-alike apps, and every app costs listing, upkeep and push setup). Food delivery / restaurants will be a separate app later, so restaurants are not in SaudaSulf.
- ✅ **SaudaSulf is for every trade that sells from a product list** (grocery, pharmacy, bakery, …), not only grocery. The name stays. Its own codebase (`saudasulf`), the same backend, database and login.
- ✅ **The order rule: each order is worked in exactly one app at a time.** Orders are worked in CoAgent until the shop buys SaudaSulf. From then on every order, from WhatsApp **and** from the app, lands in SaudaSulf and is worked there; CoAgent still shows every order, with "Open in SaudaSulf" in place of its buttons. If SaudaSulf lapses or is paused, the buttons return to CoAgent automatically; no order is ever stuck. Riders and warehouse staff follow the same rule. One orders table: nothing is copied between apps.
- ✅ **A WhatsApp-only shop works its orders in CoAgent.** SaudaSulf's shopkeeper screens are only for shops that pay for SaudaSulf (replaces the design spec's rule that a WhatsApp-only shop could use them).
- ✅ **Khata is shown in both apps.** The same records; an entry made in either app shows in the other.
- ✅ **Chat is in both apps.** The AI answers app customers first; when a person steps in, the shopkeeper replies in SaudaSulf (only app customers' chats, beside their orders) or in CoAgent (every chat).

**Quick order bar and Order by voice (decided 2026-11-18):**
- ✅ **Quick order bar** (free, every shop): the bar at the bottom of the shop screen shows "N items · Rs total"; tapping it opens the order details in place (items, total, Delivery by default or Pickup, address, note) with **"Send order"**. It replaces the separate cart and checkout steps; old cart links still open it. Prices still come from our side when the order is sent.
- ✅ **Order by voice** (paid SaudaSulf add-on): the customer holds the mic (up to 60 seconds) and says the list in English, Urdu, Roman Urdu or a mix; we turn it into items from **that shop's** catalogue with quantities and prices. Unclear items ask a short question with up to 3 choices; the customer can always fix things by hand, then taps "Send order". The shop gets the recording with the order and can play it.
- ✅ Sold monthly with a cap of voice orders plus extra voice packs; placeholder **PKR 999 for 300 voice orders** (❓ real price: Mussawir). Paid and confirmed like other payments; Franchise holders and Trade Partners earn nothing on it. Warnings at 80% and 95%; when used up or not bought, customers don't see the mic.
- ✅ The customer is told the recording goes to the shop. Recordings are deleted 30 days after the order is delivered or cancelled (Claude's call). Design: `agentcraftr-backend/docs/superpowers/specs/2026-11-18-saudasulf-quick-order-and-voice-design.md`; plan: `docs/superpowers/plans/2026-11-18-saudasulf-quick-order-and-voice.md`. ✅ Built (app, backend, CoAgent and web player) on 2026-11-18; the voice SQL (`scripts/sql/saudasulf_voice.sql`, placeholder prices) is written but **not applied yet** (waiting for Mussawir's go).

**Personal WhatsApp: normal numbers with many groups (decided 2026-11-16):**

Some people want AI help with their **normal WhatsApp** (not a business number) and are in many groups. They want their messages analysed and want the AI to reply for them.

Why our current product can't do it:
- Our system uses Meta's official WhatsApp Cloud API. It only works for a business number, and that number then can't be used in the phone app.
- Meta's **Groups API** doesn't fit either. It needs an Official Business Account (green badge), allows at most **8 people per group**, joins by invite link only, and doesn't support buttons or lists. Groups made in the phone app never reach the API, even with coexistence.

What we will build, using only WhatsApp's own features, so numbers are not banned and our standing with Meta is not put at risk:

1. ✅ **Analysis from chat exports.** In WhatsApp, the user exports a chat or group (*More → Export chat*) and shares the file to our app. The AI gives summaries, unanswered questions, action items, who said what, mood and trends across groups. Works on Android and iPhone. Limits: manual, one chat at a time, not live, no replies, and roughly 40,000 messages per export.
2. ✅ **Live AI replies on Android (notification reader).** With the user's permission, the app reads incoming WhatsApp notifications, sends them to our AI and replies through the notification's own **Reply** button, so the user's real WhatsApp sends it.
   - Rules per chat and group, for example "reply only when I'm mentioned or asked directly".
   - A **"draft only, I approve"** mode.
   - Limits: Android only (iPhone doesn't allow it); muted chats are not seen; no past history (exports fill the gap); text only; the phone must be on and online; some phone makers stop background apps.
   - The Play Store listing must explain honestly why the app needs notification access.
3. ✅ **No unofficial linked-device bots.** Baileys, whatsapp-web.js, WAHA and Evolution API connect as a WhatsApp Web device. They are more powerful but break WhatsApp's terms, get numbers banned, and could cost us our standing with Meta, which our main business depends on. If this is ever reconsidered, it must be a separate brand, company and server, with users agreeing in writing to the ban risk, and limited to reading and AI drafts the user sends.

Product rules:
- ✅ **A separate app**, not a mode inside CoAgent. CoAgent is the business hub on the official API, and the stores may question an app that mixes both. It still uses the same backend, AI and login.
- ✅ **Group etiquette and privacy.** The AI reads other members' messages and writes as the user. The app says so clearly, and in groups auto-reply is off by default or limited to "only when I'm mentioned or asked directly", so it never floods a group.
- ❓ Name, price and when to build: see section 13.

### CRM ("Customers"): a CRM that fills itself from WhatsApp

✅ Built (web 10 November, not deployed; CoAgent has the Customers list, profile and follow-ups). Design: `agentcraftr-backend/docs/superpowers/specs/2026-11-10-tenant-crm-design.md`. Screens: docs site → Web dashboard → Customers.

**Why:** Pakistani shops and offices keep customers in Zoho, Bitrix24, HubSpot or a register, mainly for the customer list, notes, follow-ups and a sales pipeline. We already have the WhatsApp side: every sender becomes a customer automatically, with their orders, payments, bookings and requests attached. The CRM adds the layer a business works in every day. PKR, Urdu-friendly, no card payments, no typing customers in.

| Part | What the business gets | Where |
|---|---|---|
| Customer list | Search; filter by stage, tag, owner, city, source, quiet for N days, follow-up due, own fields; sort; saved views; CSV export (admin) | Web Customers · CoAgent Customers |
| Customer profile (360°) | Who they are, what they have paid (per currency, never mixed with pipeline), stage, and ONE timeline: chats, orders, payments, bookings, stays, requests, deals, notes, follow-ups | Web profile · CoAgent customer |
| Stage, computed | Lead → Customer (1 purchase) → Repeat (2+) → Inactive (no purchase in 60 days). Never typed, so it can't go stale | Everywhere |
| Notes | Many per customer, with author and time; never silently rewritten | Profile |
| Follow-ups | "Call Ali about the quote, Thursday 4 pm, Sara"; overdue / today / upcoming; push to the person assigned when due | Web profile · CoAgent Follow-ups |
| Own fields | Text, number, date, choice, yes/no ("Car model", "Budget"); suggested sets per trade | Web Customer fields |
| Owner and deals | A staff owner per customer; deals with owner and expected close date on a board by stage | Web Deals |
| Add by hand | Walk-in or phone customers, on a chosen WhatsApp number | Web Customers |
| Khata | Udhaar per customer, gave/got, statements; shown in CoAgent and (when the shop allows) to the customer in SaudaSulf | Web Khata · CoAgent Khata · SaudaSulf |
| AI customer notes | The agent keeps short notes about each customer and uses them in replies | Profile (changes live replies once deployed) |
| Lead ads | Leads from Facebook/Instagram lead ads arrive as customers | Web Lead ads |

**Rules:** one customer record (`contacts`), never a second table; the CRM never merges customers on its own; revenue is never added to pipeline value or across currencies; one "Customers" menu, one profile, one follow-ups list.

**Not built yet:** quotes and invoices as documents, email campaigns, AI filling fields automatically.


---

## 4. Money: how it flows

✅ **Every rupee is paid to AgentCraftr first.** A business never pays a Trade Partner or a Franchise holder directly. We confirm the payment; the system works out each person's share; we pay out monthly.

```
Business pays AgentCraftr ──► we confirm ──► system writes each person's share
                                                  │
                         ┌────────────────────────┴───────────────────────┐
                 Franchise holder's share                       Trade Partner's share
                         └──────────── paid out monthly ──────────────────┘
```

| Who | Pays us | Earns |
|---|---|---|
| **Franchise holder** | ✅ **A franchise fee** (amount ❓). 🟡 The fee includes a starter kit (section 8) | 🟡 A bonus on a client's first payment + a % of their first few months. ✅ Paid for **bringing** a client, not forever, so they keep finding new ones |
| **Trade Partner** | ✅ **Nothing** | 🟡 A % of **every** payment in their area while the business pays. 🟡 Calculated on **sales** (simple to check), not profit (needs AI cost and exchange rates, leads to disputes) |
| **SaudaSulf payments** | — | ✅ Nobody in the network earns on app payments for now |

🟡 **Payouts:** once a month on a fixed date, holding back the last 15 days of payments, so a reversed payment doesn't mean taking money back.

❓ **Open numbers:** franchise fee; Franchise holder bonus, % and months; Trade Partner %.

> The current code was built with rules Claude chose while Mussawir was away (Trade Partner on "sales or profit", one Trade Partner per city + trade, 180-day inactive flag). Review them when the numbers above are decided.

---

## 5. Getting paid: JazzCash and Easypaisa

✅ Businesses pay by **JazzCash, Easypaisa** (and bank transfer).

| Stage | How it works | Status |
|---|---|---|
| **1. By hand (launch)** | The business sees our JazzCash/Easypaisa numbers, pays and sends the screenshot or reference; we confirm and the plan starts | ✅ Built. Only our numbers need entering in payment settings |
| **2. Automatic** | The business pays inside our page and the plan starts without us | ❓ Needs **merchant accounts** with JazzCash and Easypaisa (registered business, NTN, bank account, agreement; can take weeks). 🟡 Apply now, build when the credentials arrive |

❓ **Tax:** ask an accountant about provincial sales tax on IT services (e.g. PRA in Punjab) before sending invoices.

---

## 6. Prices

✅ **Nothing is free.** Every business buys a paid package, so it is taken as a serious business. Growth comes from add-ons that save the business money.

**WhatsApp plans (AgentCraftr):** ✅ 3-day free trial at signup.

| Plan | PKR / month | Logins | AI replies | Broadcasts |
|---|---|---|---|---|
| Starter | 2,999 | 3 | 1,500 | 1,000 |
| Growth Pro | 4,999 | 10 | 5,000 | 5,000 |
| Elite | 7,999 | unlimited | 10,000 | 20,000 |

**SaudaSulf plans:** ✅ no trial; one national price. Every message counts: customer text, order, AI reply, staff reply, status update.

| Plan | PKR / month | Messages | Logins |
|---|---|---|---|
| Chhota | 999 | 1,500 | 2 |
| Dukaan | 1,999 | 5,000 | 4 |
| Bara | 3,499 | 12,000 | 8 |
| Extra packs | 500 msgs = 499 · 2,000 msgs = 1,499 | | |

Meta also charges for WhatsApp messages (about PKR 4 each beyond 1,000 free per number a month). This is billed to the business's own WhatsApp account, not through us.

---

## 7. AI: which OpenAI model does what

✅ **OpenAI is our AI platform** for all communication.

| Job | Model now | Plan |
|---|---|---|
| Normal customer replies | gpt-4o-mini | ✅ Keep for launch |
| Hard questions (weak knowledge match, long questions) | gpt-4o | ✅ Keep for launch |
| Payment screenshots, product photos, field reports | gpt-4o | ✅ Keep: accuracy is money |
| Voice notes → text | whisper-1 | 🟡 Test gpt-4o-mini-transcribe on real Urdu / Roman Urdu notes |
| Spoken replies | tts-1 | 🟡 Test gpt-4o-mini-tts for a more natural Urdu voice |
| Customer notes, small jobs | gpt-4o-mini | ✅ Keep |
| "Ask your business" | gpt-4o | ✅ Keep (owner only, low volume) |
| Knowledge search | text-embedding-3-small | ✅ Keep |

🟡 **How to change models:** run the same real chats through the new model, compare quality and cost side by side, then change one setting. Never switch blind.

A text reply's Meta fee (~PKR 4) is already far more than our AI cost (under PKR 0.20). Model choice matters most for voice, pictures and the gpt-4o step-ups.

---

## 8. Hardware

✅ AgentCraftr will have its **own hardware**. This makes us a real local company, not only software, and gives Franchise holders a second income.

**How it works (decided):**
- ✅ **We design; we keep no stock.** Franchise holders confirm (pre-order) the hardware they need; we bring it in through stock partners and pass it to them.
- ✅ **An investor partner** funds hardware development and shares in the profit.
- ✅ **PTA type approval** for every device model we sell (see below).
- ✅ The AI speaker builds on the Kiitab speaker design from **Inkabots** (Mussawir's own future company): `G:\kiitab-speaker-mockup`, `G:\inkabots\firmware`.

**Priority, cheapest and easiest first** 🟡

| # | Product | What it does | Our software work | When |
|---|---|---|---|---|
| 1 | **QR stands, stickers, posters** | Customers scan to order and chat on WhatsApp / SaudaSulf | None (the app already makes the QR and poster) | At launch |
| 2 | **Franchise starter kit**: stands, brochures, a demo printer, branded bag | The Franchise holder can demonstrate on day one | None | At launch, inside the franchise fee |
| 3 | **Bluetooth receipt printer** (58/80 mm) | Prints receipts and khata statements from the phone | Small: direct printing in CoAgent and SaudaSulf (✅ built 2026-11-18, Android; real-printer test pending) | First month |
| 4 | **Bluetooth barcode scanner** | Products into the catalogue and at checkout | Small: a scan field | First months |
| 5 | **Counter tablet / kitchen screen** | New orders, today's bookings, clinic token screen | Medium: "counter mode" in CoAgent | After launch |
| 6 | **AgentCraftr POS box** (Wi-Fi Android device with a built-in printer) | One branded counter device running our apps | Low: our apps preinstalled | After testing 2–3 models |
| 7 | **AgentCraftr AI speaker** | Reads out new orders and payments; the owner asks by voice ("Aaj kitni sale hui?") | Medium: firmware + voice link to our backend | Prototype now, sell later |
| 8 | **Business number kit** (SIM + low-cost phone for the official WhatsApp number) | Solves "my number is already on WhatsApp" | None | When Jazz or Zong agrees |
| 9 | **Payment soundbox** | Announces JazzCash / Easypaisa payments | Needs automatic payments (section 5) | Later (the speaker can do this) |

**The AI speaker for shops** is a simpler version of the Kiitab speaker:
- **Keep:** one speaker, a microphone, one button, a light ring, an ESP32-S3 board, USB-C power, Wi-Fi.
- **Drop:** the motors and the turning base.
- **Reuse:** the firmware plan and message format from Inkabots.
- Most of the "brain" already exists: voice notes to text, "Ask your business", spoken replies and live updates.

**PTA type approval: how it works** ([PTA general info](https://www.pta.gov.pk/index.php/en/type-approval-general-info), [FAQs](https://www.pta.gov.pk/assets/media/2025-07-23-TA-FAQs.pdf), [2025 procedures draft](https://www.pta.gov.pk/assets/media/2025-07-23-PDF-Type_Approval-ProceduresFinal_Draft.pdf)):
1. One approval per **device model**, not per unit.
2. Send to PTA Islamabad: application form, processing fee, technical data sheet, test reports (the factory usually has CE/FCC reports), and usually one complete sample.
3. About one week once the papers are complete.
4. Approved devices carry an "Approved by PTA" mark.
5. Plan for approval on Bluetooth and Wi-Fi devices too (older exemptions were reportedly removed in 2019).
6. ❓ Fees: sources disagree. Confirm the current schedule with PTA.
7. 🟡 Ask the stock partner / importer to handle PTA as part of their service.

---

## 9. Other countries

✅ The model is meant to be copied wherever technology is still simple. It travels because it doesn't depend on Pakistan: an AI agent on the customer's messaging app, a local franchise network and local wallets.

| Country | Main messaging app | Wallets | Note |
|---|---|---|---|
| Bangladesh | WhatsApp, Messenger | bKash, Nagad | Closest to Pakistan. Likely the first after Pakistan |
| Sri Lanka | WhatsApp, Viber | eZ Cash, mCash | Smaller, easy to start |
| India | WhatsApp | UPI | Big but crowded. Our edge: the franchise network and hardware |
| Afghanistan | WhatsApp | HesabPay, M-Paisa | Getting paid is hard (banking, sanctions). Later |
| Central Asia | **Telegram** | Click, Payme, Kaspi | Our Telegram channel already works |

Per country we need: currency, language, wallets, the local trade list and prices. Most of this is settings. ✅ **Don't build any of it before Pakistan works.**

---

## 10. WhatsApp features at launch

✅ Launch with what's built:
- AI replies to text, voice and pictures; replies with photos, videos and PDFs.
- Shop orders, payment screenshots, bookings (with several staff), date bookings, quotes, jobs, complaints, enquiries, field reports.
- Handing a chat to a person, with the reason shown.
- Broadcasts (opt-in only; STOP works in Urdu too), alerts, daily summary.
- Customer notes, so the agent knows the customer.

Not at launch (✅ decided): Messenger / Instagram (need a new Meta permission), WeChat, AI voice calls.

---

## 11. Before we go to market

| # | Task | Who | Status |
|---|---|---|---|
| 1 | Deploy the work of 10–11 November (CRM, khata, AI customer notes, lead ads, CoAgent operations) and **rehearse on the live number** | Mussawir + software | ❓ |
| 2 | Rename Trade Holder → Trade Partner and Partner → Franchise holder in code, web, app and docs | Software | ❓ |
| 3 | Enter our JazzCash / Easypaisa numbers in payment settings | Mussawir | ❓ |
| 4 | Apply for JazzCash and Easypaisa merchant accounts | Mussawir | ❓ |
| 5 | Alerts: approved `agentcraftr_alert` template + `ALERTS_CHANNEL_ID` on the server | Mussawir | ❓ |
| 6 | Phone notifications: set up Firebase | Software | ❓ |
| 7 | CoAgent and SaudaSulf in the Play Store and App Store | Software | ❓ |
| 8 | Decide the money numbers (section 4) and write the contracts (Franchise holder, Trade Partner) | Mussawir + lawyer | ❓ |
| 9 | Trademark "CoAgent" (and "SaudaSulf") with IPO Pakistan | Mussawir | ❓ |
| 10 | Mobile screenshots for the docs site | Software | ❓ |

---

## 12. Workstreams to assign

Discuss in the team meeting and fill in the **Owner** column.

| Workstream | What it covers | Owner | Depends on |
|---|---|---|---|
| **A. WhatsApp AI + backend** | Reply quality, model tests (section 7), new trades, launch support | | — |
| **B. Web dashboard** | Business, Franchise holder, Trade Partner and Admin dashboards; the rename | | A |
| **C. CoAgent app** | Store release, Trade Partner screens in the app, Bluetooth printing (hardware #3) | | A |
| **D. SaudaSulf app** | Build from the design (`salesagent-backend/docs/superpowers/specs/2026-11-13-grocery-app-design.md`), updated by the 2026-11-16 decisions in section 3 (every trade, the order rule, chat and khata in both apps). Code in `saudasulf` | | A, C |
| **E. Payments** | Merchant accounts, then automatic JazzCash / Easypaisa | | Section 5 |
| **F. Sales network** | Recruit Trade Partners and Franchise holders, contracts, franchise kit, training | | Section 4 numbers |
| **G. Hardware** | Stock partners, PTA approvals, QR stands and printers first, AI speaker prototype | | Investor partner |
| **H. Documentation & training** | This repo: user guides, workflows, Franchise holder handbook, training videos | | All |
| **I. Investors** | Hardware investor partner; pitch from this document | | Section 8 |
| **J. Personal WhatsApp app** | Chat-export analysis, then the Android notification reader with AI replies (section 3). Start with a proof of concept on one Android phone | | A |

---

## 13. Open questions

1. ~~Is **CoAgent** the final app name?~~ ✅ Yes, decided 2026-11-17.
2. **Franchise fee**: amount, and does it include the starter kit?
3. **Franchise holder earnings**: bonus, %, months.
4. **Trade Partner earnings**: % of sales.
5. Which **hardware** items go first, and which stock partner?
6. Which **investor** to approach for hardware, and what share?
7. When to start the **second country**, and which one (Bangladesh suggested)?
8. **Personal WhatsApp app**: its name, its price, and when to build it (before or after the SaudaSulf release)?

---

## 14. Decision log

| Date | Decision |
|---|---|
| 2026-10-24 | 3-day free trial for WhatsApp plans; plans PKR 2,999 / 4,999 / 7,999; subscription enforced |
| 2026-10-28 | JazzCash / Easypaisa accepted by hand, like bank transfer |
| 2026-11-05 | Franchise holders (then "Partners") hold cities × trades; one per city + trade |
| 2026-11-11 | Trade Partners (then "Trade Holders") added above them |
| 2026-11-13 | SaudaSulf: grocery app, separate product, paid from day one, no commission, prices Chhota / Dukaan / Bara |
| 2026-11-13 | Nothing is free; every message counts |
| 2026-11-14 | Names final: **Trade Partner** (pays nothing) → **Franchise holder** (pays a franchise fee) |
| 2026-11-14 | All money is paid to AgentCraftr first; shares are paid out by us |
| 2026-11-14 | JazzCash and Easypaisa are the payment methods; automatic payments once merchant accounts exist |
| 2026-11-14 | OpenAI is the AI platform |
| 2026-11-14 | Two store apps: CoAgent (proposed name) and SaudaSulf |
| 2026-11-14 | AgentCraftr will sell its own hardware: designed by us, no stock (Franchise holders pre-order), an investor partner funds development, PTA approval per model |
| 2026-11-14 | The AI speaker builds on the Inkabots Kiitab speaker design |
| 2026-11-14 | The model will be copied to other countries after Pakistan works |
| 2026-11-16 | One hub (CoAgent: communication, analytics, marketing, leads) and dedicated apps for specific jobs, each sold after the WhatsApp package |
| 2026-11-16 | SaudaSulf serves every trade that sells from a product list, not only grocery; restaurants go to a separate food app later; own codebase `saudasulf` |
| 2026-11-16 | Order rule: orders are worked in CoAgent until the shop buys SaudaSulf, then every order (WhatsApp and app) is worked in SaudaSulf; CoAgent always shows them |
| 2026-11-16 | Khata and chat are in both apps (same data) |
| 2026-11-16 | Personal WhatsApp (normal numbers, many groups): a separate app using chat-export analysis plus an Android notification reader for AI replies; no unofficial linked-device bots; Meta's Groups API rejected (needs OBA, 8 people per group) |
| 2026-11-17 | **CoAgent** is the approved app name, the same in the Play Store and App Store; its features are collected in COAGENT.md |
