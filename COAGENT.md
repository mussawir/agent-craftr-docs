# CoAgent

**The mobile app for every business that uses AgentCraftr: what it is, who uses it, every feature and its status, and what comes next.**

| | |
|---|---|
| Name | **CoAgent** ✅ approved 2026-11-17, the same name in the Play Store and the App Store |
| Package | `com.agentcraftr.app` (stays under AgentCraftr, like all our apps) |
| Platforms | Android and iPhone (Flutter) |
| Code | `G:\co-agent` (GitHub `agentcraftr-app`) |
| Languages | English and Urdu (right-to-left) |
| Status | Built; not in the stores yet; the 10–11 November work is not deployed yet |
| Sources | [MASTER-PLAN.md](MASTER-PLAN.md) section 3, `co-agent/docs/APP-FEATURES-PLAN.md`, `co-agent/README.md` |

Marks: ✅ built or decided · 🟡 planned · ❓ open · ⏸ on hold · ✖ removed

---

## 1. What CoAgent is

✅ **CoAgent is the hub** (decided 2026-11-16). Every business gets it with its WhatsApp package. It holds all communication, customers, analytics, marketing and lead finding. Every customer arrives through WhatsApp first, so CoAgent is where leads are found.

The AI agent answers customers on WhatsApp; the owner and staff work alongside it in CoAgent.

✅ **Dedicated apps sit beside it**, each for one job and sold on its own after the WhatsApp package. SaudaSulf (ordering) is the first. The Personal WhatsApp app (planned) is also separate and is **not** part of CoAgent.

✅ **Keep it simple** (Mussawir, 2026-11-07). Nothing that confuses a shopkeeper. The camera (photos and videos) and voice notes are the centre of the app. A feature that needs explaining is cut or folded into a screen that already exists.

✅ **CoAgent never changes how WhatsApp works.** Its staff and operations features have their own server area (`app/ops/`, `/api/v1/web/ops/…`, `ops_*` tables). They read WhatsApp-side records, change them only through the existing services, and never message a customer themselves.

---

## 2. Who uses it

One app; what a person sees depends on how they log in.

| Login | Tabs | What they do |
|---|---|---|
| **Owner / Manager** | Today · Chats · Orders · Customers · More | Everything: chats, orders, payments, customers, khata, workflows, staff, teaching the agent, "Ask your business" |
| **Staff: Sales** | As the owner, limited by role | Chats, customers, follow-ups |
| **Staff: Warehouse, Rider, Technician** (field logins) | Tasks · Orders · More | Their own tasks, orders to pack or deliver, proof photos and videos, problems; works offline. No billing, no settings |
| **Franchise holder** | Home · Businesses · Earnings · Leads · More | Their businesses, adding a business, setup help, leads, earnings |

✅ Staff roles are a fixed set: **Manager, Sales, Warehouse, Rider, Technician**. Owner-defined roles come later. The server refuses anything outside a role.

---

## 3. Features

### Every day

| Feature | What the person gets | Status |
|---|---|---|
| **Today** | "Needs you" (customers waiting, orders to pack, payments to check, quotes to price), plan banner, AI replies used this month, this week's numbers, latest chats | ✅ |
| **Chats** | Every WhatsApp conversation, with voice notes and photos; take over when the AI hands a chat to a person (the reason is shown) | ✅ |
| **Live updates** | Chats, orders and "Needs you" change the moment something happens, without pulling to refresh | ✅ |
| **Notification bell** | Unread count and list: new order, payment to check, customer waiting, task assigned, problem raised. Costs nothing, unlike WhatsApp alerts | ✅ |
| **Phone notifications** | A push for work waiting; tapping it opens that screen | ✅ (needs the one-time Firebase setup) |

### Sales and money

| Feature | What the person gets | Status |
|---|---|---|
| **Orders** | List by status, one order, receipt PDF | ✅ |
| **Payments** | Payment screenshots to check and confirm | ✅ |
| **Customers (CRM)** | List with search and filters; one profile with a single timeline (chats, orders, payments, bookings, requests, notes, follow-ups); stage worked out automatically (Lead → Customer → Repeat → Inactive) | ✅ |
| **Follow-ups** | "Call Ali about the quote, Thursday 4 pm"; overdue / today / upcoming; push to the person assigned | ✅ |
| **Khata** | Credit (udhaar) per customer, gave / got, statements. Same records as SaudaSulf | ✅ |
| **Shop QR** | A QR code that opens a WhatsApp chat with the business, for the counter, flyers and the franchise kit | ✅ |

Deals, own customer fields, lead ads and adding customers by hand are on the web dashboard.

### Workflows (shown when the business's trade uses them)

| Feature | Status |
|---|---|
| Requests and quotes (list and one request) | ✅ |
| Appointments | ✅ |
| Stays (date bookings) | ✅ |
| Field reports (list and one report) | ✅ |

### Staff and operations

| Feature | What the person gets | Status |
|---|---|---|
| **F1 Staff roles** | Each login sees only its own screens | ✅ |
| **F3 Tasks** | Create a task (from scratch, a chat, an order or a request), assign it, set due date and priority; the assignee updates it with comments, photos, a video, a voice note or a document | ✅ |
| **F4 Order fulfilment** | Warehouse marks Packed (or "Something is missing"); Rider marks Delivered with a proof photo or video; uses the normal order rules | 🟡 |
| **F5 Problems** | "2 units missing on #152": raised with photos, video or a voice note; stays in "Needs you" until someone resolves it | ✅ |
| **F6 Approvals** | Owner says yes or no with a reason. First kind: a field login asking to cancel an order | ✅ |
| **F9 Offline** | No signal? Task updates, photos and voice notes wait on the phone ("Waiting to send (3)") and send once, when signal returns | ✅ for tasks |
| **Mic on text boxes** | Every place staff write has a mic button; the voice note is kept and also written out as text | ✅ |

### The owner's assistant and the agent

| Feature | What the person gets | Status |
|---|---|---|
| **F7 Ask your business** | Type or speak in Urdu, Roman Urdu or English: "Aaj kitne orders pending hain?" Short answer and a list; every number opens its records. Read-only | ✅ |
| **Teach the agent** | Photos, voice notes and notes go into an Item's knowledge, and the agent uses them in replies | ✅ |

---

## 4. Rules with the other apps

- ✅ **The order rule.** A shop with only WhatsApp works its orders in CoAgent. Once it buys SaudaSulf, every order (from WhatsApp **and** the app) is worked in SaudaSulf; CoAgent still shows each one, with "Open in SaudaSulf" in place of its buttons. If SaudaSulf lapses or is paused, the buttons return to CoAgent by themselves; no order is ever stuck. Riders and warehouse staff follow the same rule.
- ✅ **Khata is in both apps**, with the same records.
- ✅ **Chat is in both apps.** CoAgent shows every chat; SaudaSulf shows only its app customers' chats.
- ✅ **One login** for CoAgent, SaudaSulf and the web dashboard; one set of data.

---

## 5. Screens

32 screens.

| Group | Screens |
|---|---|
| Sign in | Login |
| Main tabs | Today, Chats, Orders, Customers, More |
| Details | One chat, One order (+ receipt PDF), One customer |
| Money | Payments, Khata (+ statement) |
| Workflows | Requests, One request, Appointments, Stays, Field reports, One field report, Follow-ups |
| Staff | Tasks, One task, Approvals |
| Owner tools | Notifications, Ask your business, Shop QR, Teach, Teach one Item |
| Franchise holder | Home, Businesses, Earnings, Leads, More, Add a business |

Field logins use the Tasks, Orders and More screens with their own tabs.

🟡 **Docs site:** 7 of these screens have pages written but no screenshots yet. Plan: copy SaudaSulf's screenshot tool (`saudasulf/tool/docs_capture/`) into CoAgent so all 32 are captured with demo data, then add mobile workflows (notification → action, staff task with proof, approval, teach from the phone, Ask your business, khata, Franchise holder adds a business).

---

## 6. Coming later

| Feature | Status | Note |
|---|---|---|
| **Store release** (Play Store and App Store) | 🟡 | Launch task 7 in the Master Plan |
| **F12 Live voice assistant** | 🟡 | Talk to it like a call and interrupt it. Prototype first, measure speed and cost per minute; Mussawir then decides which plans get it |
| **Trade Partner screens** in the app | 🟡 | Workstream C |
| **Bluetooth receipt printer** (58 / 80 mm) | 🟡 | Receipts and khata statements from the phone; first month |
| **Counter mode** (tablet / kitchen screen) | 🟡 | New orders, today's bookings, clinic tokens; after launch |
| **F10b Scan a place QR** | 🟡 | QR on a shelf, machine or site opens its tasks; when a trade needs it |
| **F14 Customer mode** | ❓ | Needs its own plan and Mussawir's go-ahead |
| **Owner-defined staff roles** | ❓ | After the fixed set |

## 7. Removed or on hold

- ✖ **Push-to-talk (F8)** and **fill a form by speaking (F13)**: replaced by the mic button on text boxes.
- ⏸ **Weekly report (F11)**: the daily WhatsApp summary and Today cover it; revisit if owners ask.
- ⏸ **"Ac Khata" edition**: parked; khata is inside CoAgent.

---

## 8. Still to do before launch

| # | What | Who |
|---|---|---|
| 1 | Deploy the 10–11 November work (CRM, khata, AI customer notes, lead ads, CoAgent operations) and rehearse on the live number | Mussawir + software |
| 2 | Rename `partner` → Franchise holder and `trade_holder` → Trade Partner in the app's code and screens | Software |
| 3 | Firebase setup for phone notifications (see `co-agent/README.md`) | Mussawir |
| 4 | Publish CoAgent in the Play Store and App Store | Software |
| 5 | Register "CoAgent" as a trademark with IPO Pakistan, before printing it on stands or boxes | Mussawir |
| 6 | CoAgent screenshots and workflows on the docs site | Software |
