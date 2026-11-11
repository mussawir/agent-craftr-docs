Docs.flow({
  id: "payment-proof", icon: "🧾", title: "Payment screenshot to confirmed payment",
  summary: "Customers pay by bank transfer, JazzCash or Easypaisa and send a screenshot. The AI reads it; only a person can confirm it.",
  lanes: [
    { id: "customer", label: "Customer" },
    { id: "ai", label: "AI agent" },
    { id: "team", label: "Owner / staff" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "shot", lane: "customer", kind: "start", title: "Sends a screenshot", text: "A photo of the transfer receipt from the bank app or wallet." },
    { id: "read", lane: "ai", title: "Reads it once", short: "Amount, reference, date", text: "One vision call extracts the amount, reference and date, and records a payment proof." },
    { id: "queue", lane: "team", title: "Appears in Payments", short: "“Payment screenshots to check”", text: "The proof shows on Home and in Payments. The system suggests which order it might settle.", screen: "web-payments", mark: "read" },
    { id: "decide", lane: "team", kind: "decision", title: "Money really arrived?", text: "Check your bank or wallet. Confirm, or reject with a reason.", next: [{ to: "confirm", label: "confirm" }, { to: "reject", label: "reject" }], screen: "web-payments", mark: "confirm" },
    { id: "confirm", lane: "system", title: "Payment confirmed", short: "Order paid, deal won", text: "The linked order is marked paid and the deal moves to paid. Revenue reports count only confirmed payments.", rule: "Paid is set ONLY by a person confirming. It is never typed or guessed." },
    { id: "done", lane: "system", kind: "end", title: "Reports + customer stage", text: "Revenue updates, and the customer's stage can move (lead → customer → repeat)." },
    { id: "reject", lane: "team", col: 4, title: "Rejected", short: "Nothing changes", text: "The proof is kept with the reason. Nothing is marked paid.", next: [] },
  ],
});
