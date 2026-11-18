Docs.flow({
  id: "franchise-add-business", icon: "🤝", title: "A Franchise holder adds a business",
  summary: "From the phone, a Franchise holder signs up a new business in their Franchise and follows it until it is live.",
  lanes: [
    { id: "holder", label: "Franchise holder" },
    { id: "system", label: "System" },
    { id: "business", label: "The business" },
  ],
  steps: [
    { id: "list", lane: "holder", kind: "start", title: "Opens My businesses", short: "Who is set up, who is stuck", text: "Every business they brought, and what each is waiting for.", screen: "mobile-franchise-businesses", mark: "add" },
    { id: "form", lane: "holder", title: "Fills in the business", short: "Name, phone, kind, plan", text: "Name, the owner's phone number, the kind of business and the plan. A discount can be given within the Franchise's limit.", screen: "mobile-franchise-add", mark: "name" },
    { id: "create", lane: "holder", title: "Creates it", text: "One tap creates the business.", screen: "mobile-franchise-add", mark: "create" },
    { id: "account", lane: "system", title: "Business account is made", short: "Linked to this Franchise holder", text: "The business is linked to this Franchise holder. The owner can sign in and start setting up." },
    { id: "setup", lane: "business", title: "Owner sets up", short: "Number, items, agent", text: "The owner connects their WhatsApp number and teaches the agent." },
    { id: "follow", lane: "holder", title: "Watches progress", text: "A business that stops partway is marked so the holder can help.", screen: "mobile-franchise-businesses", mark: "stuck" },
    { id: "earn", lane: "holder", kind: "end", title: "Earns when it pays", text: "Earnings, what is owed and what has been paid out.", screen: "mobile-franchise-earnings", mark: "earned" },
  ],
});
