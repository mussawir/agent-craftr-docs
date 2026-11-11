Docs.screen({
  id: "mobile-teach", app: "mobile", section: "Set up", title: "Teach your agent",
  route: "More → Teach", roles: ["owner", "staff"], pending: true,
  summary: "Photos, price lists and voice notes. The agent learns them and can send them to customers.",
  image: "images/mobile/teach.png", width: 1080, height: 2400,
  marks: [
    { id: "pick", n: 1, kind: "action", label: "What is this about?", text: "Pick the product, service or shop the new knowledge belongs to." },
    { id: "photo", n: 2, kind: "action", label: "Take a photo / Choose photos", text: "Photos of products, menus or price boards. Several at once is fine." },
    { id: "voice", n: 3, kind: "action", label: "Record a voice note", text: "Explain something in your own words. It's turned into text the agent can use." },
    { id: "note", n: 4, kind: "action", label: "Write a note", text: "Timings, delivery areas, rules: anything customers ask about." },
    { id: "name", n: 5, kind: "action", label: "What is it?", text: "Give each thing a clear name, for example “Price list October”. That's how the agent refers to it." },
    { id: "send", n: 6, kind: "action", label: "Send to customers", text: "Switch on if the agent may send this file to customers, for example a price list PDF." },
    { id: "learning", n: 7, kind: "info", label: "Learning…", text: "Shown while the agent reads the new file. It's ready when the label goes away." },
  ],
  arrows: [{ from: "pick", to: "photo" }, { from: "photo", to: "name" }, { from: "name", to: "send" }],
});
