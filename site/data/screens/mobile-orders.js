Docs.screen({
  id: "mobile-orders", app: "mobile", section: "Sales", title: "Orders",
  route: "Orders tab", roles: ["owner", "staff"], pending: true,
  summary: "Orders the agent took on WhatsApp, with our own checked totals. Move each one along as you pack and deliver.",
  image: "images/mobile/orders.png", width: 1080, height: 2400,
  marks: [
    { id: "tabs", n: 1, kind: "action", label: "New · Packed · Delivered", text: "Orders move left to right. New ones are waiting to be packed." },
    { id: "row", n: 2, kind: "action", label: "An order", text: "Customer, items, total and whether it's paid. Tap to open it." },
    { id: "paid", n: 3, kind: "info", label: "Paid", text: "Set only when a payment screenshot is confirmed. Cash on delivery stays unpaid until then." },
    { id: "receipt", n: 4, kind: "action", label: "Receipt", text: "Inside an order: print or share an 80 mm receipt PDF." },
  ],
  arrows: [{ from: "tabs", to: "row" }, { from: "row", to: "receipt" }],
});
