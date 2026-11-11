Docs.flow({
  id: "quote-request", icon: "📝", title: "Quote to job",
  summary: "Workshops, tailors, contractors. The agent collects the details; a person prices it; an accepted quote becomes a job the customer can track.",
  lanes: [
    { id: "customer", label: "Customer" },
    { id: "ai", label: "AI agent" },
    { id: "team", label: "Your team" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "ask", lane: "customer", kind: "start", title: "Asks for a price", text: "“Car ka AC theek karwana hai, kitna lagega?”" },
    { id: "collect", lane: "ai", title: "Collects the details", short: "The questions you set", text: "The agent asks the questions you set for this Item (model, problem, photos), then opens quote Q-0001.", rule: "The agent never prices a quote itself." },
    { id: "price", lane: "team", title: "Price it", short: "Q- new → priced", text: "Staff open the request, enter the amount and a note. Moving to priced needs an amount.", screen: "web-requests", mark: "stage" },
    { id: "tell", lane: "system", title: "Customer is told", short: "Inside 24 h", text: "The price goes to the customer. Outside WhatsApp's 24-hour window the system says why it couldn't message." },
    { id: "accept", lane: "customer", kind: "decision", title: "Accepts?", text: "The customer replies yes or no to the priced quote, in their own chat.", next: [{ to: "job", label: "yes" }, { to: "declined", label: "no" }] },
    { id: "job", lane: "system", title: "Job J-0001 opens", short: "received → in progress → ready → delivered", text: "An accepted quote becomes a job. Each stage change can tell the customer." },
    { id: "track", lane: "customer", kind: "end", title: "“Where is my car?”", text: "The agent answers from THIS customer's own jobs and orders only." },
    { id: "declined", lane: "team", col: 5, title: "Declined", short: "Kept for the record", text: "The quote is closed as declined.", next: [] },
  ],
});
