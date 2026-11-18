Docs.flow({
  id: "mobile-notification", icon: "🔔", title: "From a notification to the action",
  summary: "Something needs the owner. CoAgent tells them on the phone, and one tap opens the thing to act on.",
  lanes: [
    { id: "customer", label: "Customer" },
    { id: "ai", label: "AI agent" },
    { id: "system", label: "System" },
    { id: "owner", label: "Owner" },
  ],
  steps: [
    { id: "msg", lane: "customer", kind: "start", title: "Customer needs a person", text: "A customer asks for a person, or sends a payment screenshot." },
    { id: "handoff", lane: "ai", title: "Agent hands over", short: "Stops replying", text: "The agent stops answering and marks the chat as needing a person." },
    { id: "push", lane: "system", title: "Phone notification", short: "Push, and the bell", text: "CoAgent sends a push notification and adds a line to the Notifications list." },
    { id: "open", lane: "owner", title: "Owner opens the list", short: "Unread ones first", text: "The unread notifications are marked. Tapping one opens the chat, order or task it is about.", screen: "mobile-notifications", mark: "unread" },
    { id: "act", lane: "owner", kind: "end", title: "Replies in the chat", short: "The agent stays quiet", text: "The owner replies. The agent stays quiet in that chat until it is handed back.", screen: "mobile-chat", mark: "reply" },
  ],
});
