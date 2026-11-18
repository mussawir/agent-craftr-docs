Docs.flow({
  id: "khata-entry", icon: "📒", title: "Khata: recording credit and payments",
  summary: "The owner keeps a running account for each customer who buys on credit, and can send a reminder.",
  lanes: [
    { id: "owner", label: "Owner" },
    { id: "system", label: "System" },
    { id: "customer", label: "Customer" },
  ],
  steps: [
    { id: "list", lane: "owner", kind: "start", title: "Opens Khata", short: "Who owes what", text: "Every customer with a balance, and the total owed.", screen: "mobile-khata", mark: "total" },
    { id: "account", lane: "owner", title: "Opens a customer", text: "The balance and every line of their account.", screen: "mobile-khata-account", mark: "balance" },
    { id: "kind", lane: "owner", kind: "decision", title: "Credit given or payment received?", text: "Each is one line in the account.", next: [{ to: "given", label: "credit" }, { to: "payment", label: "payment" }] },
    { id: "given", lane: "owner", title: "Records credit given", text: "The balance goes up.", screen: "mobile-khata-account", mark: "given", next: [{ to: "calc" }] },
    { id: "payment", lane: "owner", title: "Records a payment", text: "The balance goes down.", screen: "mobile-khata-account", mark: "payment" },
    { id: "calc", lane: "system", title: "Updates the balance", short: "Written by the system", text: "The system adds the line, works out the new balance and checks the customer's limit.", rule: "The balance is always computed from the lines." },
    { id: "remind", lane: "owner", title: "Sends a reminder", text: "A polite reminder, on WhatsApp.", screen: "mobile-khata-account", mark: "remind" },
    { id: "got", lane: "customer", kind: "end", title: "Customer gets the reminder", text: "The customer sees the amount owed." },
  ],
});
