Docs.page({
  id: "guide-owner", group: "User guides", icon: "🏪", title: "Guide: Business owner",
  summary: "Everything the owner of a business does on the web dashboard: set up, connect WhatsApp, answer chats, run orders and payments, look after customers, send offers, add staff and pay AgentCraftr.",
  body: `
<p>You are the <b>owner</b> (the business admin). You see every part of the dashboard. Your staff see less: no billing, no team, no offers. See <a href="#/page/roles">who can do what</a>.</p>

<h2>What you can do</h2>
<table>
<tr><th>Area</th><th>What it is for</th><th>Screen</th></tr>
<tr><td>Setup guide</td><td>A checklist that takes you to a working agent</td><td><a href="#/screen/web-setup">Setup</a></td></tr>
<tr><td>Products &amp; services (Items)</td><td>What you sell. Teach the agent with text, files and prices</td><td><a href="#/screen/web-items">Items</a></td></tr>
<tr><td>WhatsApp numbers</td><td>Connect your number and attach it to an Item</td><td><a href="#/screen/web-channels">Numbers</a></td></tr>
<tr><td>Inbox</td><td>Every chat. Take over from the agent when needed</td><td><a href="#/screen/web-inbox">Inbox</a></td></tr>
<tr><td>Orders and Payments</td><td>Work orders. Check the payment proofs customers send you</td><td><a href="#/screen/web-orders">Orders</a>, <a href="#/screen/web-payments">Payments</a></td></tr>
<tr><td>SaudaSulf</td><td>Your shop code and QR for the ordering app; confirm app customers</td><td><a href="#/screen/web-saudasulf">SaudaSulf</a></td></tr>
<tr><td>Customers, Follow-ups</td><td>Your own customer list, notes and reminders (CRM)</td><td><a href="#/screen/web-customers">Customers</a>, <a href="#/screen/web-followups">Follow-ups</a></td></tr>
<tr><td>Khata</td><td>Who owes you money (credit)</td><td><a href="#/screen/web-khata">Khata</a></td></tr>
<tr><td>Appointments, Requests</td><td>Bookings, quotes and questions the agent collected</td><td><a href="#/screen/web-appointments">Appointments</a>, <a href="#/screen/web-requests">Requests</a></td></tr>
<tr><td>Broadcasts, Audience, Templates</td><td>Send an offer to many customers (owner only)</td><td><a href="#/screen/web-broadcasts">Broadcasts</a></td></tr>
<tr><td>Settings, Team</td><td>Add staff, give them a role</td><td><a href="#/screen/web-team">Team</a></td></tr>
<tr><td>Plan &amp; billing</td><td>Your plan, renewal date, payment reference and history</td><td><a href="#/screen/web-billing">Billing</a></td></tr>
</table>
<p>Menu items depend on your trade and features. If you do not see "Khata" or "Appointments", your business does not use that feature.</p>

<div class="callout"><b>How you pay</b>Only AgentCraftr collects payment: cash, bank transfer, Easypaisa or JazzCash. Even if a Franchise holder or Trade Partner brought you, you pay AgentCraftr, never them. Always quote your payment reference.</div>

<h2>Workflows</h2>

<h3>1. Sign up and set up</h3>
<ol>
<li>Sign up (<a href="#/screen/web-signup">sign-up</a>) with your business name, trade and city. You get a 3-day free trial. Or open the sign-in link that your Franchise holder or AgentCraftr sent you and set a password.</li>
<li>Open <b>Setup guide</b>. Do each step it shows.</li>
<li>Open <b>Products &amp; services</b> and add an Item. Add text, files, photos and prices (<a href="#/page/items">what an Item is</a>).</li>
<li>Check <b>Agent defaults</b> and <b>Industry &amp; features</b> if you want to change how the agent talks or which features you use.</li>
</ol>

<h3>2. Connect WhatsApp</h3>
<ol>
<li>Open <b>WhatsApp numbers</b>.</li>
<li>Connect your number. If you need a number from us, ask for one there. Our team handles the request.</li>
<li>Attach the number to an Item. <b>Without this the agent stays silent.</b></li>
<li>Send a message to your number from another phone. You should see the agent reply and the chat in Inbox. Full steps: <a href="#/flow/go-live">Go live</a>.</li>
</ol>

<h3>3. Answer chats and take over</h3>
<ol>
<li>Open <b>Inbox</b>. Pick a chat.</li>
<li>Read what the customer and the agent said.</li>
<li>When the customer needs a person, take the chat over and reply yourself. The agent stops while you talk.</li>
<li>When you are done, hand the chat back to the agent. See <a href="#/flow/handover">Handover</a>.</li>
</ol>

<h3>4. Work an order and check payment</h3>
<ol>
<li>Open <b>Orders</b>. Open the new order.</li>
<li>Pack it, send it, and mark it done as it moves.</li>
<li>When a customer sends a payment photo, it shows in <b>Payments</b> with the amount the agent read.</li>
<li>Check it against your bank or wallet. Approve it or reject it, with a reason if you reject. If the customer pays later, record it against khata. See <a href="#/flow/payment-proof">Payment proof</a>.</li>
</ol>

<h3>5. Look after customers (CRM)</h3>
<ol>
<li>Everyone who messages you appears in <b>Customers</b> by themselves.</li>
<li>Open a customer to see their chats, orders and payments on one timeline.</li>
<li>Add a note. Set a follow-up with a date. Due follow-ups show in <b>Follow-ups</b>.</li>
<li>Use <b>Customer fields</b> in Settings to add your own fields. More: <a href="#/page/crm">CRM</a>.</li>
</ol>

<h3>6. Khata (credit)</h3>
<ol>
<li>Open <b>Khata</b>. The list shows who owes you and since when.</li>
<li>Open an account to add an entry or record a payment received.</li>
<li>Use the search and the "Over limit" filter to find people who owe too much. See <a href="#/flow/khata-entry">Khata entry</a>.</li>
</ol>

<h3>7. Bookings and requests</h3>
<ol>
<li>Open <b>Appointments</b> for bookings the agent made, or <b>Requests</b> for quotes, tracking and questions.</li>
<li>Open one, update its status, and reply. See <a href="#/flow/booking">Booking</a> and <a href="#/flow/quote-request">Quote request</a>.</li>
</ol>

<h3>8. Send an offer (broadcast)</h3>
<ol>
<li>Open <b>Templates</b> and make a message template. Wait until it is approved.</li>
<li>Open <b>Audience</b> and choose who gets it.</li>
<li>Open <b>Broadcasts</b>, pick the template and audience, and send. See <a href="#/flow/broadcast">Broadcast</a>.</li>
</ol>

<h3>9. Add staff</h3>
<ol>
<li>Open <b>Settings, Team</b>. Choose <b>Add a team member</b>.</li>
<li>Type name and email. Pick <b>Admin</b> (everything) or <b>Staff</b> (inbox, contacts, sales, AI setup, no billing or team).</li>
<li>Share the invite link on WhatsApp. It works for 7 days. The person opens it and sets a password.</li>
<li>For a Staff member you can set a job: Manager, Sales, Warehouse, Rider or Technician. Warehouse, Rider and Technician see only tasks and their own orders or jobs.</li>
<li>You can resend, cancel or disable. Disabling signs the person out at once. The number of seats depends on your plan. See <a href="#/page/guide-staff">Staff guide</a>.</li>
</ol>

<h3>10. Pay for your plan</h3>
<ol>
<li>Open <b>Plan &amp; billing</b>. See your plan, renewal date and payment history.</li>
<li>Copy your <b>payment reference</b>.</li>
<li>Pay AgentCraftr by bank transfer, Easypaisa, JazzCash or cash, quoting the reference.</li>
<li>Send the receipt to AgentCraftr (or ask your Franchise holder to upload it for you). Our Finance team confirms it.</li>
<li>When confirmed, your plan shows active with a new renewal date.</li>
</ol>

<h2>System check</h2>
<p>Do these in order with a test business. Each line says what to click and what you should see.</p>
<ol>
<li>Sign in. <b>You see:</b> Home, and the full menu including Team and Plan &amp; billing.</li>
<li>Setup guide. Finish a step. <b>You see:</b> the step tick off.</li>
<li>Add an Item with a price and a line of text. <b>You see:</b> it in the Items list.</li>
<li>WhatsApp numbers: attach a number to the Item. <b>You see:</b> the number linked to the Item.</li>
<li>From another phone, message the number. <b>You see:</b> the agent reply on the phone and the chat in Inbox.</li>
<li>In Inbox, take over and reply. <b>You see:</b> your reply on the phone. Hand back; the agent answers the next message.</li>
<li>Place an order by chat. <b>You see:</b> it in Orders. Change its status; the customer gets an update.</li>
<li>Send a payment photo as the customer. <b>You see:</b> it in Payments. Approve it. <b>You see:</b> the status change.</li>
<li>Customers: open the test customer. <b>You see:</b> the chat, order and payment on one timeline. Add a note and a follow-up; the follow-up shows in Follow-ups.</li>
<li>Khata (if on): add an entry. <b>You see:</b> the customer in the owed list.</li>
<li>Team: invite a test Staff member and open the link in a private window. <b>You see:</b> a set-password page, then the dashboard without Billing or Team.</li>
<li>Plan &amp; billing. <b>You see:</b> your plan, renewal date and payment reference.</li>
<li>Ask AgentCraftr (or your Franchise holder) to upload a proof and confirm it. <b>You see:</b> status Active and a later renewal date. Cross-role version: <a href="#/page/system-check">full walkthrough</a>.</li>
</ol>`,
});
