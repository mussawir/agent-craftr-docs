Docs.flow({
  id: "handover", icon: "🙋", title: "When the AI hands a chat to a person",
  summary: "The AI steps back when a customer asks for a person, when it isn't sure, or when the plan can't pay for more replies. The first reason stays on the chat.",
  lanes: [
    { id: "trigger", label: "What happened" },
    { id: "system", label: "System" },
    { id: "team", label: "Your team" },
    { id: "customer", label: "Customer" },
  ],
  steps: [
    { id: "why", lane: "trigger", kind: "start", title: "A reason to hand over", text: "Customer asked for a person · plan paused · AI replies used up · cost limit · an automation · staff paused the AI · staff replied themselves." },
    { id: "flip", lane: "system", title: "Chat goes to a person", short: "Reason + what to do", text: "The chat switches from AI to human. The first reason is kept with a note on what to do.", rule: "The first reason stands until someone resumes the AI." },
    { id: "route", lane: "system", title: "Assigned + alerted", short: "Routing rules, alerts, push", text: "Routing rules may assign it (by number or Item, round robin). Chosen people get a WhatsApp alert or a phone notification." },
    { id: "inbox", lane: "team", title: "Open it in the Inbox", short: "Filter: With a person", text: "The chat shows “Why a person has this chat”. The first person to reply claims an unassigned chat.", screen: "web-inbox", mark: "reason" },
    { id: "reply", lane: "team", title: "Reply", short: "From the business number", text: "Your reply goes out on WhatsApp. Replies inside 24 hours of the customer's last message are free-form.", screen: "web-inbox", mark: "reply" },
    { id: "talk", lane: "customer", title: "Conversation continues", text: "The customer talks to your team." },
    { id: "resume", lane: "team", kind: "end", title: "Resume AI", text: "When done, give the chat back. The reason clears and the agent answers the next message.", screen: "web-inbox", mark: "resume" },
  ],
});
