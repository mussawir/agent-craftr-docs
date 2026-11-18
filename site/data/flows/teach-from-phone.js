Docs.flow({
  id: "teach-from-phone", icon: "🎤", title: "Teaching the agent from the phone",
  summary: "The owner says or shows something once, and the agent uses it in its next answers.",
  lanes: [
    { id: "owner", label: "Owner" },
    { id: "ai", label: "AI agent" },
    { id: "customer", label: "Customer" },
  ],
  steps: [
    { id: "open", lane: "owner", kind: "start", title: "Opens Teach", text: "From More, the owner opens Teach your agent.", screen: "mobile-more", mark: "teach" },
    { id: "say", lane: "owner", title: "Speaks or types", short: "Voice note or a line of text", text: "A voice note or a short note: “We close at 9 on Fridays.”", screen: "mobile-teach", mark: "voice" },
    { id: "send", lane: "owner", title: "Sends it", text: "The note is saved and the agent starts learning it.", screen: "mobile-teach", mark: "send" },
    { id: "learn", lane: "ai", title: "Agent learns", short: "Shown as Learning", text: "While it learns, the note is marked Learning. Then it is part of what the agent knows.", screen: "mobile-teach", mark: "learning" },
    { id: "item", lane: "owner", kind: "decision", title: "Teach about one Item?", text: "For one product or service, the owner can add a photo, voice note or document to that Item.", next: [{ to: "ask", label: "no" }, { to: "photo", label: "yes" }] },
    { id: "photo", lane: "owner", title: "Adds a photo", text: "The camera opens first.", screen: "mobile-teach-item", mark: "photo" },
    { id: "ask", lane: "customer", title: "A customer asks", text: "Later, a customer asks about it on WhatsApp." },
    { id: "answer", lane: "ai", kind: "end", title: "Agent answers with it", text: "The agent answers from what it was taught." },
  ],
});
