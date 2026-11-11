Docs.flow({
  id: "broadcast", icon: "📣", title: "Sending an offer (broadcast)",
  summary: "Offers go only to customers who said yes, using a template Meta approved. Meta bills the business's own WhatsApp account per message.",
  lanes: [
    { id: "owner", label: "Owner (admin)" },
    { id: "meta", label: "Meta" },
    { id: "system", label: "System" },
    { id: "customer", label: "Customer" },
  ],
  steps: [
    { id: "optin", lane: "customer", kind: "start", title: "Customer opts in", text: "By replying START or YES, or stated consent from an import/API. Opt-in is explicit only." },
    { id: "tpl", lane: "owner", title: "Write a template", short: "Text, picture, buttons", text: "Templates page: body text, optional picture header, footer and buttons. Checked locally first." },
    { id: "approve", lane: "meta", kind: "decision", title: "Meta approves?", text: "Only APPROVED templates on the same number can be sent.", next: [{ to: "audience", label: "approved" }, { to: "tpl", label: "rejected" }] },
    { id: "audience", lane: "owner", title: "Choose audience", short: "Tags, opted-in only", text: "Pick tags. The whole audience must fit the plan's remaining broadcast allowance.", screen: "web-broadcasts", mark: "new" },
    { id: "run", lane: "system", title: "Send (now or scheduled)", short: "~20 per second, resumable", text: "Consent is re-checked for every person as it sends. A scheduled send is re-validated at send time.", rule: "STOP is honoured immediately and can't be overridden." },
    { id: "report", lane: "system", title: "Delivery report", short: "sent → delivered → read → replied", text: "Statuses come from Meta's receipts and only move forward.", screen: "web-broadcasts", mark: "results" },
    { id: "reply", lane: "customer", kind: "end", title: "Customer replies", text: "Within 72 hours the offer is attached to their chat, so the agent knows what “yes” means." },
  ],
});
