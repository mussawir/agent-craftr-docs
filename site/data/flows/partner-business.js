Docs.flow({
  id: "partner-business", icon: "🤝", title: "A partner brings a business",
  summary: "Partners cover cities × trades. Each city + trade pair belongs to one active partner, who earns a share when the business pays and we confirm it.",
  lanes: [
    { id: "us", label: "AgentCraftr team" },
    { id: "partner", label: "Partner" },
    { id: "owner", label: "Business owner" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "create", lane: "us", kind: "start", title: "Add the partner", text: "Deal (share %, months, first-payment bonus), limits (discount, trial extension), and the cities × trades they cover. They log in by invite link." },
    { id: "bring", lane: "partner", title: "Bring a business", short: "Share link or add it", text: "Share the /p/code link, or add the business directly and send the owner's invite link on WhatsApp.", screen: "partner-businesses", mark: "add" },
    { id: "link", lane: "system", kind: "decision", title: "Partner covers this trade?", text: "The business is linked to the partner only if they cover its trade (and city). Otherwise it goes to whoever owns that city + trade.", next: [{ to: "help", label: "yes" }, { to: "other", label: "no" }] },
    { id: "help", lane: "partner", title: "Help with setup", short: "Only with the owner's OK", text: "The owner can allow 7 days of setup help. Every change the partner makes is shown to the owner.", screen: "partner-businesses", mark: "access" },
    { id: "pay", lane: "owner", title: "Owner pays", short: "Bank, JazzCash, Easypaisa", text: "A first-month discount within the partner's limit may apply." },
    { id: "confirm", lane: "us", title: "We confirm the payment", text: "Commission is earned only here, never on a test gateway.", rule: "Reversing a payment adds a minus line; earnings lines are never edited." },
    { id: "earn", lane: "system", kind: "end", title: "Partner's share recorded", text: "Share % of what was paid for the agreed months, plus a one-time bonus. Payouts settle what's owed.", screen: "partner-home", mark: "earned" },
    { id: "other", lane: "system", col: 3, title: "Linked elsewhere", short: "Or to no partner", text: "A trade the partner wasn't given is blocked for them.", next: [] },
  ],
});
