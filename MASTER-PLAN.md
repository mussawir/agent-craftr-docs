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
| **CoAgent** 🟡 | The mobile app for every business (store name "CoAgent by AgentCraftr"). The AI agent answers; you work alongside it. | "the owner app", "Ac app" |
| **SaudaSulf** (سودا سلف) | The grocery app for shops and their customers | "customer app" |
| **Trade Partner** | The top level of the sales network: holds trades or sectors in an area | Friend, Sector Manager, Trade Manager, Trade Holder |
| **Franchise holder** | The level below: holds a **franchise** (city + trade), brings in and sets up businesses | Partner, Associate |
| **Franchise** | What a Franchise holder holds, e.g. "Lahore · Grocery" | Territory, coverage |
| **Business** | A paying client (the owner of the WhatsApp number) | Tenant (only in code) |

The chain: **AgentCraftr → Trade Partner → Franchise holder → Business → their customers**

❓ **CoAgent** is proposed and still needs a final yes. Before printing it on stands or boxes, register it as a trademark with IPO Pakistan. Developer tools with the same name exist, but no consumer app for businesses.

🔧 **Code rename needed.** The code still says `trade_holder` (role 31) and `partner` (role 30). Neither is deployed yet, so renaming now is cheap.

---

## 3. Products

| Product | Who uses it | What it does | Where the code is | Status |
|---|---|---|---|---|
| **AgentCraftr (WhatsApp AI)** | Businesses' customers, on WhatsApp | Answers text, voice notes and pictures; takes orders, bookings and requests; reads payment screenshots; hands a chat to a person | `salesagent-backend` | ✅ Built |
| **Web dashboard** | Owners and staff | Inbox, orders, payments, customers (CRM), khata, marketing, reports, setup | `salesagent-frontend` (`/app`) | ✅ Built |
| **CoAgent app** | Every business; Franchise holders also log in here | Inbox, orders, customers, khata, staff tasks with photo/video proof, approvals, "Ask your business", teach the agent | `agentcraftr-app` | ✅ Built (not in the stores yet) |
| **SaudaSulf app** | Grocery shops and their customers | Customers add a shop by code/QR and order; the shop runs orders and khata on the same app | to build | ✅ Designed, coding next |
| **Franchise holder dashboard** | Franchise holders | Their businesses, setup help, leads, earnings | web `/partner` + inside CoAgent | ✅ Built (to rename) |
| **Trade Partner dashboard** | Trade Partners | Their area, Franchise holders, businesses, earnings, "cities with no Franchise holder yet" | web `/holder` | ✅ Built (to rename); not in the app yet |
| **Admin** | AgentCraftr staff | Businesses, payments, numbers, verification, Trade Partners, activity log | web `/admin` | ✅ Built |

**Decisions on the apps:**
- ✅ Only **two store apps at launch**: CoAgent and SaudaSulf. The "Ac Khata" edition is parked (khata is inside CoAgent).
- ✅ SaudaSulf and WhatsApp are **two separate products**. A shop with both has one login and one set of data, but two subscriptions, each paid and paused on its own.
- ✅ No websites for shops. Everything is in the apps.
- ✅ Android and iPhone at launch.

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
| 3 | **Bluetooth receipt printer** (58/80 mm) | Prints receipts and khata statements from the phone | Small: direct printing in CoAgent and SaudaSulf | First month |
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
| **D. SaudaSulf app** | Build from the design (`salesagent-backend/docs/superpowers/specs/2026-11-13-grocery-app-design.md`) | | A, C |
| **E. Payments** | Merchant accounts, then automatic JazzCash / Easypaisa | | Section 5 |
| **F. Sales network** | Recruit Trade Partners and Franchise holders, contracts, franchise kit, training | | Section 4 numbers |
| **G. Hardware** | Stock partners, PTA approvals, QR stands and printers first, AI speaker prototype | | Investor partner |
| **H. Documentation & training** | This repo: user guides, workflows, Franchise holder handbook, training videos | | All |
| **I. Investors** | Hardware investor partner; pitch from this document | | Section 8 |

---

## 13. Open questions

1. Is **CoAgent** the final app name?
2. **Franchise fee**: amount, and does it include the starter kit?
3. **Franchise holder earnings**: bonus, %, months.
4. **Trade Partner earnings**: % of sales.
5. Which **hardware** items go first, and which stock partner?
6. Which **investor** to approach for hardware, and what share?
7. When to start the **second country**, and which one (Bangladesh suggested)?

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
