Docs.screen({
  id: "mobile-chat", app: "mobile", section: "Every day", title: "One chat",
  route: "Chats → a chat", roles: ["owner", "staff"], pending: true,
  summary: "Read the conversation, see why a person has it, and reply or give it back to the AI.",
  image: "images/mobile/chat.png", width: 1080, height: 2400,
  marks: [
    { id: "reason", n: 1, kind: "warn", label: "Why a person has this chat", text: "For example: “The customer asked to talk to a person.” The reason also says what to do." },
    { id: "ai", n: 2, kind: "info", label: "AI bubbles", text: "Messages marked AI were written by the agent. Your team's replies are not marked." },
    { id: "take", n: 3, kind: "action", label: "Take over", text: "Stops the AI on this chat so you can answer. Replying yourself does the same." },
    { id: "reply", n: 4, kind: "action", label: "Type a reply", text: "Your message goes to the customer on WhatsApp from the business number." },
    { id: "back", n: 5, kind: "action", label: "Give back to AI", text: "When you're done, hand the chat back so the agent answers the next message." },
    { id: "close", n: 6, kind: "action", label: "Close chat", text: "Moves it to Closed. A new message from the customer reopens it." },
  ],
  arrows: [{ from: "reason", to: "take" }, { from: "take", to: "reply" }, { from: "reply", to: "back" }],
});
