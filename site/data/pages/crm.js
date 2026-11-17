Docs.page({
  id: "crm", group: "Understand it", icon: "👥", title: "CRM: Customers",
  summary: "A CRM that fills itself from WhatsApp. Every sender becomes a customer, with their orders, payments, bookings and requests attached; the business adds notes, follow-ups, its own fields and a deals board.",
  body: `
<p>Shops and offices in Pakistan keep customers in Zoho, Bitrix24, HubSpot or a register, mainly for four things: a customer list, notes, follow-ups and a sales pipeline. AgentCraftr's CRM gives them those four, but nobody types customers in: <b>every WhatsApp sender becomes a customer automatically</b>, and everything they buy or ask for is already linked. Prices in PKR, Urdu-friendly, no card payments.</p>

<h2>What is in it</h2>
<table>
<tr><th>Part</th><th>What the business gets</th><th>Where</th></tr>
<tr><td>Customer list</td><td>Search; filter by stage, tag, owner, city, source, quiet for N days, follow-up due, own fields; sort; saved views; CSV export (owner)</td><td><a href="#/screen/web-customers">Web</a> · <a href="#/screen/mobile-customers">CoAgent</a></td></tr>
<tr><td>Customer profile</td><td>Who they are, what they have paid (per currency), stage, and one timeline: chats, orders, payments, bookings, stays, requests, deals, notes, follow-ups</td><td><a href="#/screen/web-customer-profile">Web</a></td></tr>
<tr><td>Stage</td><td>Lead → Customer (1 purchase) → Repeat (2+) → Inactive (no purchase in 60 days). Worked out from what they bought, never typed, so it never goes stale</td><td>Everywhere</td></tr>
<tr><td>Notes</td><td>Many per customer, with who wrote them and when</td><td>Profile</td></tr>
<tr><td>Follow-ups</td><td>"Call Ali about the quote, Thursday 4 pm, Sara": overdue, today, upcoming; a push to the person assigned when one is due</td><td>Profile · CoAgent Follow-ups</td></tr>
<tr><td>Own fields</td><td>Text, number, date, choice or yes/no, such as "Car model" or "Budget"; suggested sets for each trade</td><td>Web Customer fields</td></tr>
<tr><td>Owner and deals</td><td>A staff member responsible for each customer; deals with an owner and expected close date, on a board by stage</td><td>Web Deals</td></tr>
<tr><td>Khata</td><td>Udhaar per customer: gave, got, statements. Also in CoAgent, and in SaudaSulf for customers when the shop allows it</td><td>Web Khata · CoAgent Khata · SaudaSulf</td></tr>
<tr><td>AI customer notes</td><td>The agent keeps short notes about each customer and uses them when it replies</td><td>Profile</td></tr>
<tr><td>Lead ads</td><td>Leads from Facebook and Instagram lead ads arrive as customers</td><td>Web Lead ads</td></tr>
</table>

<h2>Rules it keeps</h2>
<ul>
<li>One customer record. The CRM never makes a second list, and never merges two customers on its own.</li>
<li>Money paid is never added to deal values, and never added across currencies.</li>
<li>One Customers menu, one profile, one follow-ups list.</li>
</ul>

<h2>Status</h2>
<p>Built on the web on 10 November 2026, not yet deployed. CoAgent has the customer list, a customer, follow-ups and khata. Not built yet: quotes and invoices as documents, email campaigns, the AI filling fields by itself.</p>
<p class="muted">Source: MASTER-PLAN.md, section 3 (CRM). Design: agentcraftr-backend/docs/superpowers/specs/2026-11-10-tenant-crm-design.md.</p>`,
});
