Docs.flow({
  id: "shop-order", icon: "🛒", title: "A shop order on WhatsApp",
  summary: "For shops with a product list (grocery, pharmacy). The agent builds the cart; the system checks it and writes the total; the customer confirms.",
  lanes: [
    { id: "customer", label: "Customer" },
    { id: "ai", label: "AI agent" },
    { id: "system", label: "System" },
    { id: "team", label: "Your team" },
  ],
  steps: [
    { id: "ask", lane: "customer", kind: "start", title: "“2 kilo cheeni, 1 basmati”", text: "The customer asks for products in their own words, by text or voice." },
    { id: "cart", lane: "ai", title: "Proposes a cart", short: "Matches products by name & aliases", text: "The agent matches the words to products in the shop's list and proposes a cart." },
    { id: "validate", lane: "system", title: "Checks the cart", short: "Real products, stock, prices", text: "Every line is checked against the products table: invented or foreign items dropped, quantities capped at stock, out-of-stock refused.", rule: "Only one draft order per chat." },
    { id: "total", lane: "system", title: "Writes the total", short: "Itemised, computed by us", text: "The system appends its own itemised total to the agent's reply and asks the customer to confirm." },
    { id: "confirm", lane: "customer", kind: "decision", title: "Customer confirms?", text: "“yes” places the order. The customer can also change the cart first.", next: [{ to: "placed", label: "yes" }, { to: "cart", label: "change" }] },
    { id: "placed", lane: "system", title: "Order placed", short: "Status New, stock reduced", text: "The order gets a number, status New, and tracked stock goes down. The team is alerted." },
    { id: "pack", lane: "team", title: "Pack, then deliver", short: "New → Packed → Delivered", text: "Staff move the order along on the web or in the app. Cancelling from New or Packed gives the stock back.", screen: "web-orders", mark: "tabs" },
    { id: "paid", lane: "team", kind: "end", title: "Paid when confirmed", text: "Paid is separate from status (cash on delivery). An order is marked paid only when a payment proof is confirmed.", link: { href: "#/flow/payment-proof", label: "How payment proofs work" } },
  ],
});
