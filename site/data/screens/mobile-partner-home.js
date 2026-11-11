Docs.screen({
  id: "mobile-partner-home", app: "mobile", section: "Partner mode", title: "Partner home",
  route: "Partner login → Home", roles: ["partner"], pending: true,
  summary: "What a partner sees in the same app: money earned, businesses that need a nudge, leads to call.",
  image: "images/mobile/partner-home.png", width: 1080, height: 2400,
  marks: [
    { id: "money", n: 1, kind: "info", label: "Earned this month · Owed to you", text: "Your share of what your businesses paid. Owed is what we haven't paid out yet." },
    { id: "counts", n: 2, kind: "info", label: "Paying · On trial", text: "How many of your businesses pay, and how many are still on the free trial." },
    { id: "attention", n: 3, kind: "action", label: "Businesses that need you", text: "Trial ending, setup stuck. The WhatsApp button opens a chat with the owner." },
    { id: "leads", n: 4, kind: "action", label: "Enquiries to contact", text: "Leads we handed to you. Call or WhatsApp them." },
    { id: "share", n: 5, kind: "action", label: "Share my sign-up link", text: "Businesses that sign up with your link are linked to you, if you cover their trade." },
    { id: "add", n: 6, kind: "action", label: "Add a business", text: "Create the account yourself and send the owner their invite link on WhatsApp." },
  ],
  arrows: [{ from: "attention", to: "leads" }, { from: "share", to: "add" }],
});
