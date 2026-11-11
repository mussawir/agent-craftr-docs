Docs.flow({
  id: "go-live", icon: "🚀", title: "Going live: sign-up to first answer",
  summary: "The path every new business takes. Each step is something the system checks before the next one can work, and Home shows which step is next.",
  lanes: [
    { id: "owner", label: "Owner" },
    { id: "system", label: "AgentCraftr" },
    { id: "meta", label: "Meta (WhatsApp)" },
    { id: "customer", label: "Customer" },
  ],
  steps: [
    { id: "signup", lane: "owner", kind: "start", title: "Sign up", text: "Name, business, trade and city. No payment: a 3-day free trial starts at once. A partner's link or the city + trade links the business to its partner.", screen: "web-signup", mark: "trade" },
    { id: "trial", lane: "system", title: "Trial + trade presets", short: "Features switched on for the trade", text: "The trial runs Growth Pro features with trial limits (200 AI replies, 100 broadcasts). The trade decides which features are on: orders, bookings, quotes…", rule: "A trade change only ever adds features; anything in use can't be switched off." },
    { id: "item", lane: "owner", title: "Add an Item", short: "Product, service or the whole shop", text: "An Item is what the agent talks about: one product, a service, a property, or a whole shop (one catalog Item with hundreds of products as rows).", screen: "web-items", mark: "new" },
    { id: "teach", lane: "owner", title: "Teach the agent", short: "Files, photos, voice notes, prices", text: "Upload PDFs, photos, voice notes, links and notes; add a price table or product list. Choose which files the agent may send to customers.", screen: "web-item-knowledge", mark: "upload" },
    { id: "number", lane: "owner", title: "Connect WhatsApp", short: "Readiness checks, then Meta sign-up", text: "Checks first: is the number on the WhatsApp app, can it receive the code, does the display name follow Meta's rules. Then Meta's Embedded Signup.", screen: "web-channels", mark: "request" },
    { id: "attach", lane: "owner", kind: "decision", title: "Number attached to an Item?", short: "Without it the agent is silent", text: "A live number must answer for at least one Item. This is the step people miss: a connected number with no Item gets no AI replies.", rule: "No Item attached = the agent stays silent.", next: [{ to: "name", label: "yes" }, { to: "number", label: "no" }] },
    { id: "name", lane: "meta", kind: "system", title: "Display name review", short: "Meta approves the name", text: "Meta reviews the display name. Messages work meanwhile; the name shows once approved. Number health is checked every 6 hours." },
    { id: "msg", lane: "customer", title: "First customer message", short: "Text, voice, photo…", text: "A customer writes to the number. The agent answers from the Item's knowledge.", link: { href: "#/flow/customer-message", label: "See what happens to a message" } },
    { id: "watch", lane: "owner", kind: "end", title: "Watch the Inbox", text: "The owner sees every chat in the Inbox and steps in when the agent hands over.", screen: "web-inbox", mark: "filters" },
    { id: "verify", lane: "meta", kind: "system", col: 8, title: "Business verification", short: "Only to go above 250/day", text: "Not needed to start. To message more than 250 new customers a day, the business verifies with Meta (NTN/SECP, utility bill). Our checklist prepares it.", next: [] },
  ],
  notes: "<h2>Where people get stuck</h2><ul><li><b>Number connected but no replies</b>: the number isn't attached to an Item.</li><li><b>Agent answers vaguely</b>: the Item has little knowledge. Add a price table and the most-asked questions as a note.</li><li><b>Trial ended</b>: the AI pauses and chats go to your team; the inbox keeps working. Pay by bank transfer, JazzCash or Easypaisa.</li></ul>",
});
