Docs.screen({
  id: "mobile-customers", app: "mobile", section: "Sales", title: "Customers",
  route: "Customers tab", roles: ["owner", "staff"], pending: true,
  summary: "Everyone who has messaged you. The stage is worked out from what they bought, never typed.",
  image: "images/mobile/customers.png", width: 1080, height: 2400,
  marks: [
    { id: "stages", n: 1, kind: "action", label: "Lead · Customer · Repeat · Gone quiet", text: "Lead = no purchase yet. Customer = one. Repeat = two or more. Gone quiet = nothing for 60 days." },
    { id: "search", n: 2, kind: "action", label: "Search name or number", text: "Find anyone who has ever written to the business." },
    { id: "row", n: 3, kind: "action", label: "A customer", text: "Opens their profile: chats, orders, payments, bookings, notes and follow-ups in one timeline." },
    { id: "add", n: 4, kind: "action", label: "Add customer", text: "Add someone by hand, for example a walk-in. Adding never opts them in to offers." },
  ],
  arrows: [{ from: "stages", to: "row" }],
});
