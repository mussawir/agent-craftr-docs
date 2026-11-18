Docs.flow({
  id: "pack-and-deliver", icon: "📦", title: "Pack and deliver an order",
  summary: "Warehouse staff pack orders and riders deliver them from the phone. The web Orders page shows it exactly as if the owner had done it.",
  lanes: [
    { id: "owner", label: "Owner" },
    { id: "warehouse", label: "Staff (warehouse)" },
    { id: "rider", label: "Staff (rider)" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "new", lane: "system", kind: "start", title: "A new order arrives", text: "A customer confirms an order on WhatsApp. Its status is New." },
    { id: "saudasulf", lane: "system", kind: "decision", title: "Worked in SaudaSulf?", text: "Some shops work their orders in SaudaSulf instead.", next: [{ to: "pack", label: "no" }, { to: "open", label: "yes" }] },
    { id: "open", lane: "warehouse", kind: "end", title: "Staff see “Open in SaudaSulf”", text: "CoAgent shows the order and one button that opens it in SaudaSulf.", screen: "mobile-order-saudasulf", mark: "open" },
    { id: "pack", lane: "warehouse", title: "Sees “To pack”", short: "Orders waiting to be packed", text: "The warehouse login sees the orders to pack.", screen: "mobile-field-pack", mark: "row" },
    { id: "packed", lane: "warehouse", title: "Marks it Packed", short: "Or “Something is missing”", text: "Marking an order Packed moves it from New to Packed. If something is missing, the staff member raises a problem instead.", screen: "mobile-field-pack", mark: "total" },
    { id: "deliver", lane: "rider", title: "Sees “To deliver”", text: "The rider sees where to take each order.", screen: "mobile-field-deliver", mark: "address" },
    { id: "out", lane: "rider", title: "Takes it out for delivery", short: "Optional", text: "“Take out for delivery” tells the owner the order is on its way.", screen: "mobile-order", mark: "out" },
    { id: "proof", lane: "rider", title: "Takes the proof", short: "Camera opens first", text: "Delivered needs a photo or a short video. The camera opens first.", screen: "mobile-field-deliver", mark: "proof" },
    { id: "delivered", lane: "rider", title: "Marks it Delivered", text: "The order moves to Delivered by the normal rules.", screen: "mobile-field-deliver", mark: "delivered" },
    { id: "offline", lane: "system", title: "Works offline", short: "Applied once", text: "With no signal, the update waits on the phone and is applied once when the connection returns.", rule: "An update is never applied twice." },
    { id: "web", lane: "owner", kind: "end", title: "Owner sees it on the web", text: "The Orders page shows the same status and the proof.", link: { href: "#/flow/shop-order", label: "A shop order on WhatsApp" } },
  ],
});
