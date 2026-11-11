Docs.flow({
  id: "customer-message", icon: "💬", title: "What happens to a customer's message",
  summary: "From the moment a WhatsApp message arrives to the reply. The model proposes; the system checks every action before it happens.",
  lanes: [
    { id: "customer", label: "Customer" },
    { id: "checks", label: "Checks first" },
    { id: "ai", label: "AI agent" },
    { id: "system", label: "System" },
    { id: "team", label: "Your team" },
  ],
  steps: [
    { id: "in", lane: "customer", kind: "start", title: "Message arrives", text: "Text, voice note, photo, video, document or a button tap, on WhatsApp (or Telegram)." },
    { id: "dup", lane: "checks", title: "Seen before?", short: "Duplicates dropped", text: "WhatsApp sometimes delivers a message twice. The second copy is ignored." },
    { id: "stop", lane: "checks", title: "STOP / START?", short: "Consent words handled first", text: "A message that is only STOP or START (also in Roman Urdu and Urdu) changes marketing consent and gets a fixed confirmation. The AI never sees it.", rule: "A customer's own STOP can't be overridden by the business or an import." },
    { id: "plan", lane: "checks", kind: "decision", title: "Plan active, replies left?", text: "If the trial ended, the plan expired or the month's AI replies are used up, the message is saved and the chat goes to your team.", next: [{ to: "understand", label: "yes" }, { to: "handover", label: "no" }] },
    { id: "understand", lane: "ai", title: "Understand", short: "Voice → text, photo → meaning", text: "Voice notes are transcribed; photos are read once. A payment screenshot becomes a payment proof for a person to check." },
    { id: "answer", lane: "ai", title: "Answer + propose actions", short: "Knowledge, persona, trade rules", text: "The agent searches the Item's knowledge and writes one answer. It may also propose actions: a cart, a booking, a quote request, files to send, or a handover." },
    { id: "check", lane: "system", title: "Check every action", short: "Prices, stock, slots verified", text: "Each proposal is checked by the part of the system that owns it: products and stock for orders, free slots for bookings. Invented items are dropped.", rule: "The model never states money we keep: totals are computed and appended by the system." },
    { id: "send", lane: "system", title: "Reply goes out", short: "Words first, then files", text: "Text answers text; a voice note gets a voice note. Files follow as separate messages (one picture rides as the caption)." },
    { id: "events", lane: "system", kind: "end", title: "Others are told", text: "Order placed, payment proof, booking… become events: alerts, phone notifications, webhooks, automations." },
    { id: "handover", lane: "team", col: 4, title: "Handed to a person", short: "Reason shown on the chat", text: "The chat shows why a person has it and what to do next. Your team answers from the Inbox.", screen: "web-inbox", next: [], mark: "reason" },
  ],
});
