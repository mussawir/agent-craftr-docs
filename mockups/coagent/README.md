# CoAgent redesign mockups

High-fidelity HTML mockups for the CoAgent Flutter app (`G:\co-agent`), in the same family as the SaudaSulf mockups (`../saudasulf`): same shared neutrals, status colours, components and page structure, with CoAgent's own brand colour.

- `index.html` is one self-contained page: inline CSS and SVG icons plus a small inline script for the switchers. The only external resource is Google Fonts (Plus Jakarta Sans and Noto Nastaliq Urdu). Open it in a browser.
- **Palettes** (switcher in the toolbar, plus Light / Dark): **A · Firoza** (deep teal with a saffron accent, the **default**), **B · Neela** (indigo and orange, same as SaudaSulf), **C · Shaam** (aubergine with a coral accent). Pick one in the URL too: `index.html?theme=shaam&mode=dark`.
- Built screens are redrawn from the real app (`lib/features/**`, `lib/l10n/app_en.arb`, `app_ur.arb`). **PLANNED** screens come from the approved plan `G:\agentcraftr-backend\docs\superpowers\plans\2026-11-18-coagent-rename-fulfilment-docs.md` (Part P, Part B) and the "CoAgent for every trade" proposal; each caption has a "Why" line naming its source. All names, amounts and businesses are sample data.
- CoAgent-specific states added to the shared status language: AI answering (brand tint and a sparkle), Needs you (warn), Booked / Confirmed / Done / Didn't come for appointments.

## Frames (44)

1. **Every day (built, 5):** H1 Today, H2 Chats, H3 One chat, H4 Notifications, H5 Ask your business.
2. **Sales and money (built, 9):** S1 Orders, S2 One order, S3 Order worked in SaudaSulf, S4 Payments, S5 Customers, S6 One customer, S7 Follow-ups, S8 Khata, S9 Khata account.
3. **Workflows (built, 5):** W1 Requests, W2 One request, W3 Appointments, W4 Stays, W5 Field reports.
4. **Staff (3 built, 2 planned):** T1 Tasks, T2 One task, T3 Approvals, T4 To pack (planned), T5 To deliver (planned).
5. **Set up from the phone (planned, 13):** P1 More with Set up, P2 Business and services, P3 Edit item, P4 Price list, P5 Teach, P6 Team, P7 Invite, P8 Booking setup, P9 Crew, P10 Book by hand, P11 New request, P12 Features, P13 WhatsApp number.
6. **One app, every trade (3):** X1 clinic, X2 grocery on WhatsApp, X3 accountant (the same Today screen).
7. **Franchise holder (3, renamed from Partner):** F1 Home, F2 Businesses, F3 Add a business.
8. **Urdu (1):** U1 Today, right-to-left in Noto Nastaliq, numbers kept left-to-right with `<bdi>`.

The **Design system** panel at the end maps tokens per palette to Material 3 `ColorScheme` roles (extras in a `CoAgentColors` ThemeExtension), and gives the status colours, type scale, radius, spacing and components.

## Re-export a PNG

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --hide-scrollbars --window-size=1400,16000 --virtual-time-budget=5000 --screenshot=out.png "file:///G:/agent-craftr-docs/mockups/coagent/index.html?theme=firoza"
```

This leaves blank space below the page, and Chrome tiles screenshots taller than about 16,000px, so export in parts or crop afterwards.
