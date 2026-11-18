Docs.page({
  id: "progress", group: "Understand it", icon: "📈", title: "What's built (progress)",
  summary: "Where the build stands, in plain words: what is finished in CoAgent and SaudaSulf, what was decided along the way, and what still waits for a person. Updated 19 November 2026.",
  body: `
<p>This page is for the whole team. It says what each app can do <b>today</b>, what we decided while building it, and what is still open. The detailed engineering log stays in the backend repo (<code>docs/superpowers/</code>).</p>

<h2>At a glance</h2>
<table>
<tr><th>Work</th><th>State</th></tr>
<tr><td>SaudaSulf: all 6 plans (subscriptions, shop codes and customers, ordering, message counting, order rule and khata, in-app chat and notifications)</td><td>✅ Built and reviewed</td></tr>
<tr><td>CoAgent: new names, set up from the phone, staff packing and delivery, docs (16 tasks)</td><td>✅ Built and reviewed</td></tr>
<tr><td>Database changes for both</td><td>✅ Applied (19 Nov)</td></tr>
<tr><td>Admin Billing desk (both products, proofs, SaudaSulf usage, statements)</td><td>✅ Built; its database change is written, not applied</td></tr>
<tr><td>Going live</td><td>⏳ Waits on the items under “Still open”</td></tr>
</table>
<p>Every piece of work went through the same steps: built task by task, each task checked by a separate reviewer, then one review of the whole plan, with its findings fixed and checked again. All automatic tests pass (backend 1,978; CoAgent 78; SaudaSulf 196).</p>

<h2>New names</h2>
<p>The people who sell AgentCraftr are now called:</p>
<ul>
<li><b>Trade Partner</b> (ٹریڈ پارٹنر): top of the sales network; holds trades or sectors in an area, with Franchise holders under them.</li>
<li><b>Franchise holder</b> (فرنچائز ہولڈر): holds a <b>Franchise</b>, a city + trade, e.g. “Lahore · Grocery”.</li>
</ul>
<p>The old words “Partner” and “Trade Holder” are gone from every screen, the web, the app and these docs. Web addresses changed too (<code>/franchise</code>, <code>/trade-partner</code>).</p>

<h2>CoAgent: what an owner can now do from the phone</h2>
<p>Before, setting up a business needed the website. Now any trade (shop, clinic, salon, lawyer, accountant…) can do it from CoAgent. These screens are under <b>More → Set up</b> and only <b>admins</b> see them.</p>
<table>
<tr><th>Screen</th><th>What it does</th></tr>
<tr><td>Business and services</td><td>Add a service, product, whole shop, property or anything else; set how the agent talks; pause or delete</td></tr>
<tr><td>Price list</td><td>Rows of name, price, “per” and what’s included</td></tr>
<tr><td>Teach</td><td>Teach the agent from documents, photos, voice, video or a web link</td></tr>
<tr><td>Team</td><td>Invite by email and send the link on WhatsApp; set each person’s role (Manager, Sales, Warehouse, Rider, Technician); switch people off</td></tr>
<tr><td>Booking setup and crew</td><td>Opening hours (with lunch breaks), slot length, people per slot, notice needed, reminders; each doctor/stylist/teacher with their own timings</td></tr>
<tr><td>Features</td><td>Switch features on or off; ones in use are locked with the reason shown</td></tr>
<tr><td>WhatsApp number</td><td>Shows Working / Needs attention / Blocked, with “Check now”</td></tr>
</table>
<p>Everyone on the team (not only admins) can also:</p>
<ul>
<li><b>Book by hand</b> for a walk-in or phone call. If the time was just taken, the app says “That time is no longer free.” and shows fresh times.</li>
<li><b>Confirm</b> a booked appointment.</li>
<li><b>Create a request</b> (quote, job, ticket or enquiry) with a due date and an internal note only the team sees, or straight from a chat with “Make a request”.</li>
</ul>
<p><b>Safety rule:</b> the server, not only the app, refuses set-up changes from non-admins (items, prices, bookings, products, persona, industry, which items a number answers for). Adding knowledge stays open to everyone, because it is everyday work.</p>

<h2>CoAgent: packing and delivery by staff</h2>
<p>For shops that run their orders in CoAgent (not SaudaSulf):</p>
<table>
<tr><th>Login</th><th>Sees</th><th>Can do</th></tr>
<tr><td>Warehouse</td><td><b>To pack</b>: new orders</td><td>Packed · Something is missing</td></tr>
<tr><td>Rider</td><td><b>To deliver</b>: packed and out-for-delivery orders</td><td>Take out for delivery · Delivered</td></tr>
</table>
<ul>
<li><b>Delivered needs proof.</b> The button opens the camera first (a photo, or hold for a short video). Without a photo the server refuses, even through old routes.</li>
<li><b>Works without signal.</b> The update waits on the phone and is sent once when signal returns, never twice.</li>
<li><b>Nothing is lost silently.</b> If the server is busy, the phone tries again later. If the server refuses (for example, the shop moved its orders to SaudaSulf), the phone shows “1 update couldn’t be sent” with <b>Retry</b> and <b>Discard</b>.</li>
<li>Warehouse and riders can only take their own steps. A shop whose orders are worked in SaudaSulf shows “Open in SaudaSulf” instead of these buttons.</li>
</ul>

<h2>SaudaSulf: in-app chat and notifications</h2>
<ul>
<li>Customers chat with the shop inside SaudaSulf; the AI answers, and hands over to a person when needed, the same way it does on WhatsApp.</li>
<li>Staff get an alert when a customer waits for a person, including when the AI hands over because the month’s messages are used up.</li>
<li>Notifications reach the right customer even on a shared phone, and signing out stops them.</li>
<li>Every message counts towards the package, the same as WhatsApp.</li>
</ul>

<h2>Admin: the Billing desk</h2>
<p>One page in the admin web for money coming in, for both products (WhatsApp plans and SaudaSulf packages). It replaces the old Payments page; the old link opens the <b>Proofs to confirm</b> tab.</p>
<table>
<tr><th>Tab</th><th>Shows</th></tr>
<tr><td>Due</td><td>Waiting for a first or renewal payment (never paid, trial or month ended) with no proof sent yet</td></tr>
<tr><td>Overdue</td><td>The period ended and no later payment was confirmed</td></tr>
<tr><td>Paused</td><td>Paused or suspended businesses</td></tr>
<tr><td>Renewing in 7 days</td><td>Active, period ends within 7 days</td></tr>
<tr><td>Proofs to confirm</td><td>Every pending payment, SaudaSulf first. Shows who put it in (business, Franchise holder, Trade Partner or staff), and “Extra pack P500” for a message pack</td></tr>
<tr><td>SaudaSulf</td><td>The packages and extra packs, and every shop's messages used, packs bought and whether <b>ordering is closed</b> (filters: Ordering closed, Low 80%+)</td></tr>
<tr><td>Statements</td><td>Earned, paid and owed per month for Franchise holders and Trade Partners, with <b>Record payout</b></td></tr>
</table>
<ul>
<li>A business with both products appears once for each product, never merged.</li>
<li>Confirming asks <b>how it was paid</b>: cash, bank transfer, Easypaisa or JazzCash (pre-filled from the payment). An extra pack only adds messages; it never moves the package dates.</li>
<li>Finance and Owner can confirm, reject and record payouts; Support can look only; Marketing has no access.</li>
<li>A payout settles <b>everything</b> owed to that person, not just one month.</li>
<li>No message is sent from the desk. The database change (<code>billing_desk.sql</code>) is written but <b>not applied yet</b>; apply it after a backup, before going live.</li>
</ul>

<h2>Decisions taken while building</h2>
<ol>
<li>Only what people see was renamed (and web addresses). Code and database names stay; a table in the backend <code>CLAUDE.md</code> maps old to new.</li>
<li>New CoAgent screens use the app’s current look, laid out like the mockups. A new colour palette waits for a choice.</li>
<li>Team invites go by email, with the link sent on WhatsApp. Phone-only invites would need server work.</li>
<li>Delivery proof is saved <b>before</b> the order moves to Delivered, so an order can never be delivered without its photo.</li>
<li>In SaudaSulf, an AI reply with text plus files counts one message per item sent.</li>
</ol>

<h2>Still open</h2>
<table>
<tr><th>Item</th><th>Who</th></tr>
<tr><td>Firebase set-up so SaudaSulf can send notifications</td><td>Mussawir</td></tr>
<tr><td>A native speaker reads the new Urdu text in both apps</td><td>Team</td></tr>
<tr><td>Pick the CoAgent colour palette (Firoza, Neela or Shaam) in the mockups</td><td>Mussawir</td></tr>
<tr><td>iOS builds, store listings, deploy</td><td>Mussawir</td></tr>
</table>
<p><b>Later, not planned yet:</b> owners see delivery photos inside the order; an option to create a packing task for every new order automatically; Trade Partner screens in CoAgent.</p>
`
});
