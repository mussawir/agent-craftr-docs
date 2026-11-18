Docs.flow({
  id: "cancel-approval", icon: "✋", title: "Asking to cancel an order",
  summary: "A field login cannot cancel an order alone. They ask, and the owner says yes or no.",
  lanes: [
    { id: "staff", label: "Staff" },
    { id: "owner", label: "Owner" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "ask", lane: "staff", kind: "start", title: "Asks to cancel", short: "With a reason", text: "On the order, a field login taps cancel and gives a reason. Nothing changes yet." },
    { id: "notify", lane: "system", title: "Owner is told", short: "Push and Approvals", text: "The request appears under Approvals and the owner gets a notification." },
    { id: "see", lane: "owner", title: "Reads the request", text: "The order, who asked and why.", screen: "mobile-approvals", mark: "title" },
    { id: "decide", lane: "owner", kind: "decision", title: "Cancel it?", text: "The owner says yes or no.", next: [{ to: "yes", label: "yes" }, { to: "no", label: "no" }] },
    { id: "yes", lane: "owner", title: "Approves", text: "The order is cancelled by the normal rules, and tracked stock goes back.", screen: "mobile-approvals", mark: "approve", next: [{ to: "told" }] },
    { id: "no", lane: "owner", title: "Refuses, with a reason", text: "The order stays as it is. The reason goes back to the staff member.", screen: "mobile-approvals", mark: "refuse" },
    { id: "told", lane: "system", kind: "end", title: "Staff are told the answer", text: "A notification tells the staff member what the owner decided." },
  ],
});
