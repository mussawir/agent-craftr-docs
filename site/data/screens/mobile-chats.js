Docs.screen({
  id: "mobile-chats", app: "mobile", section: "Every day", title: "Chats",
  route: "Chats tab", roles: ["owner", "staff"], pending: true,
  summary: "Every WhatsApp conversation. Filter to the ones a person must answer.",
  image: "images/mobile/chats.png", width: 1080, height: 2400,
  marks: [
    { id: "search", n: 1, kind: "action", label: "Search name or number", text: "Find a customer's chat quickly." },
    { id: "filters", n: 2, kind: "action", label: "All · AI answering · With a person · Closed", text: "“With a person” is the list to empty: the AI has handed these chats to your team." },
    { id: "waiting", n: 3, kind: "warn", label: "Waiting for you", text: "A chat marked like this has a customer waiting for a human reply." },
    { id: "row", n: 4, kind: "action", label: "Open a chat", text: "Tap to read the whole conversation, including voice notes and photos.", go: "mobile-chat" },
  ],
  arrows: [{ from: "filters", to: "waiting" }, { from: "waiting", to: "row" }],
});
