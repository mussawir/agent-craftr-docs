Docs.screen({
  id: "mobile-today", app: "mobile", section: "Every day", title: "Home (Today)",
  route: "Home tab", roles: ["owner", "staff"], pending: true,
  summary: "The first screen of the app: what needs you right now, how the AI is doing this month, and the latest chats.",
  image: "images/mobile/today.png", width: 1080, height: 2400,
  marks: [
    { id: "trial", n: 1, kind: "warn", label: "Plan banner", text: "Shows days left on the free trial, or that the AI is paused because the plan ended. The inbox still works while paused." },
    { id: "needs", n: 2, kind: "action", label: "Needs you", text: "Customers waiting for a reply, new orders to pack, payment screenshots to check, quotes to price. Tap a row to open that list.", go: "mobile-chats" },
    { id: "quota", n: 3, kind: "info", label: "AI replies this month", text: "How many AI answers your plan has used. Files sent after the words don't count." },
    { id: "week", n: 4, kind: "info", label: "This week", text: "Chats today, payments confirmed today and this week." },
    { id: "live", n: 5, kind: "action", label: "Latest chats", text: "The newest conversations. Tap one to read it or take over.", go: "mobile-chat" },
    { id: "tabs", n: 6, kind: "action", label: "Bottom tabs", text: "Home, Chats, Orders, Customers and More. More holds Teach, Requests, Appointments and the rest your trade uses." },
  ],
  arrows: [{ from: "needs", to: "live" }, { from: "live", to: "tabs" }],
});
