# Web dashboard mockups (proposed)

Proposed redesigns of the web dashboards at agentcraftr.com, for review. The phone mockups are in `../coagent` and
`../saudasulf`.

- Open `index.html` in a browser. Tabs at the top switch between **Super Admin**, **Trade Partner** and
  **Franchise holder**; Light / Dark sits next to them.
- Each screen has three notes: **Today** (what the live site does), **Proposed** and **Why**.
- Every field, card and table column has a green ✓ and a red ✗. Each screen also has one for the whole screen. The
  choices are kept in that browser, and **Copy review** copies them as text to send back.
- Chips, plan cards, switches, tabs and the Pay them by choices respond to clicks. The area picker (Province →
  District → Town) and the trades picker (157 trades in 22 sectors) use the real lists from the backend's `data/`.
- All people, tenants, phone numbers, emails, CNICs and amounts are sample data. Plan names, prices and limits follow
  the master plan.

## Screens

**Super Admin (28):** SA1 Home, SA2 Tenants, SA3 Add tenant, SA4 One tenant's page, SA5 Billing (confirm a
payment), SA6 Franchise holders, SA7 Add franchise holder, SA8 Trade Partners, SA9–SA14 Add Trade Partner in six
steps, SA15 Cities, SA16 Numbers, SA17 Number requests, SA18 Leads, SA19 Plans, SA20 Settings (payment methods),
SA21 Team, SA22 Trades (today "Business types": search, sector filter, pages and a side panel, on the real 157
trades), SA23 Edit a trade, SA24 Social, SA25 Usage (AI cost), SA26 Docs, SA27 Site content, SA28 Activity log.

**Trade Partner (7):** TP1 Home, TP2 Franchise holders, TP3 Add franchise holder, TP4 Businesses, TP5 Add business,
TP6 Leads, TP7 Earnings.

**Franchise holder (7):** FH1 Home, FH2 My businesses, FH3 Billing (send a payment receipt), FH4 Add business,
FH5 Leads, FH6 Earnings, FH7 Franchise kit.

## Next

- Business owner dashboard (`/app`), after the phone mockups.
