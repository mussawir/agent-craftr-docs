Docs.page({
  id: "consent", group: "Understand it", icon: "✅", title: "Offers and consent",
  summary: "Offers go only to customers who said yes. A customer's STOP always wins.",
  body: `
<ul>
<li><b>Opt-in is explicit.</b> START, a YES to the agent's one-time “want our offers?” question (if you switch it on), or consent stated in an import or the API.</li>
<li><b>STOP works in English, Roman Urdu and Urdu</b>, and is handled before the AI sees the message.</li>
<li>A customer's own STOP can't be undone by the business or by an import. Only the customer can opt back in with START.</li>
<li>Consent is re-checked for each person at the moment a broadcast sends.</li>
<li>Adding a customer by hand never opts them in.</li>
</ul>
<p><a href="#/flow/broadcast">Sending an offer</a> · <a href="#/screen/web-broadcasts">Broadcasts guide</a></p>`,
});
