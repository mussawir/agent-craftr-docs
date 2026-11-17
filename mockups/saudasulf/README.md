# SaudaSulf redesign mockups

**Chosen: B Neela, 2026-11-17.** The app now uses this palette (`lib/core/theme.dart` in `G:\saudasulf`), and the page opens on it.

High-fidelity HTML mockups of every current screen in the SaudaSulf Flutter app (`G:\saudasulf`), in a new look that replaces the brown/terracotta Material 3 theme.

- `index.html` is one self-contained page: inline CSS and SVG icons, with a small inline script for the switchers. The only external resource is Google Fonts (Plus Jakarta Sans and Noto Nastaliq Urdu). Open it in a browser.
  - Palette switcher: **A · Sabz** (green with a saffron accent), **B · Neela** (indigo with an orange accent, the default), **C · Anaar** (pomegranate with a gold accent). There is also a Light / Dark toggle.
  - You can also pick these in the URL: `index.html?theme=neela&mode=dark`.
  - Customer: 10 frames (C1–C9, with My shops in both its list and empty states). Shopkeeper: 13 frames (S1–S12, plus S13, the Orders screen in Urdu, right-to-left).
  - **Planned (not built yet), added 2026-11-17:** 17 more frames for what the design spec (`G:/agentcraftr-backend/docs/superpowers/specs/2026-11-13-grocery-app-design.md`) needs and the app doesn't have. Customer C10–C16: scan a QR, order placed, chat with the shop, notifications, shop not taking app orders, waiting to be confirmed, my profile (with Delete my account). Shopkeeper S14–S23: chats, one chat, create your shop, customers, pay for your package (JazzCash / Easypaisa + screenshot), add a product, messages used up (grace), poster, rider, shop notifications. Each caption names the spec section it comes from.
  - The **Design system** panel at the end maps every token to a Material 3 `ColorScheme` role or to a `SaudaColors` ThemeExtension. It also gives the type scale, radius, spacing, elevation and component specs.
- `overview-a-sabz.png`, `overview-b-neela.png`, `overview-c-anaar.png` are full-page exports per palette (light mode, 1600px wide, from headless Chrome).

All copy comes from `lib/l10n/app_en.arb` and `app_ur.arb`. Fields and actions follow `lib/features/**`. Shop names, people, products and amounts are sample data.

To re-export a PNG:

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --hide-scrollbars --window-size=1600,13000 --screenshot=out.png "file:///G:/agent-craftr-docs/mockups/saudasulf/index.html?theme=sabz"
```

This command leaves blank space below the page. The committed overview PNGs were also cropped to the page height.
