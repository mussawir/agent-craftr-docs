Docs.flow({
  id: "ask-your-business", icon: "💬", title: "Asking your business a question",
  summary: "The owner types or says a question in their own words and gets an answer from the business's real numbers.",
  lanes: [
    { id: "owner", label: "Owner" },
    { id: "ai", label: "AI agent" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "open", lane: "owner", kind: "start", title: "Opens Ask your business", text: "The screen shows examples to start from.", screen: "mobile-ask", mark: "example" },
    { id: "type", lane: "owner", title: "Asks a question", short: "Typed or spoken", text: "“How many orders today?” or “Who owes me money?”", screen: "mobile-ask", mark: "field" },
    { id: "read", lane: "system", title: "Reads the real data", short: "Only this business", text: "The question is answered from this business's own records. The agent cannot change anything from here." },
    { id: "reply", lane: "ai", kind: "end", title: "Answers in plain words", text: "The answer appears in the same screen.", screen: "mobile-ask", mark: "note" },
  ],
});
