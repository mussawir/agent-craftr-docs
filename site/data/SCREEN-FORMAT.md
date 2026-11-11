# Screen file format

Every annotated screenshot is one JavaScript file in `site/data/screens/<id>.js`.
It is plain JS (not JSON) so the site works when opened straight from the folder (`file://`),
where browsers refuse to `fetch()` local files.

```js
Docs.screen({
  id: "web-inbox",              // unique; also the file name and the URL: index.html#/screen/web-inbox
  app: "web",                   // web | admin | partner | mobile
  section: "Talk to customers", // menu group the screen belongs to
  title: "Inbox",
  route: "/app/inbox",          // where it lives in the product (shown as a breadcrumb)
  roles: ["owner", "staff"],    // who can see it: owner | staff | superadmin | partner
  summary: "Every WhatsApp chat in one list. The AI answers; you step in when it hands over.",
  image: "images/web/inbox.png",// relative to site/
  width: 1440, height: 900,     // the image's pixel size (marks use these coordinates)
  marks: [
    {
      id: "filter",             // unique inside the screen
      n: 1,                     // number shown on the badge = the order of the tour
      box: [24, 120, 280, 44],  // x, y, w, h in IMAGE pixels
      kind: "action",           // action (something to click) | info (something to read) | warn
      label: "Mine / Unassigned",
      text: "Show only the chats given to you, or the ones nobody has taken yet.",
      go: "web-thread"          // optional: screen id this action opens (makes a 'Go there' link)
    }
  ],
  arrows: [
    { from: "filter", to: "thread", label: "then" }   // "what can be done next"; label optional
  ]
});
```

Rules
- Boxes are in image pixels. The viewer scales them with the image, so they stay aligned on any screen size.
- `n` is the step order of the guided tour. Info marks can share the tour too.
- Arrows join two marks of the same screen. To point at another screen, use `go`.
- Never put real customer names, phone numbers or business data in a screenshot. Use the demo shop.
- Register the file in `site/data/index.js` (the `screens` list) so the site loads it.

Mobile screenshots: width/height are the phone image size (for example 1080 x 2400). The viewer puts
them in a phone frame. Use the marking editor (`site/editor.html`) to draw boxes on your own screenshots;
it writes this file for you.
