Docs.page({
  id: "system-check", group: "User guides", icon: "✅", title: "System check: full walkthrough",
  summary: "One ordered test of the whole system across every role, from inviting staff to a lead that came from a social post.",
  body: `
<p>Use a test setup, not real customers. You need five people, or one person with five browser windows: an admin <b>Owner</b>, a <b>Finance</b> person, a <b>Marketing</b> person, a <b>Franchise holder</b>, and a test <b>business owner</b>. Use a private window for each. Mark each step when you see the result.</p>
<p>Role details: <a href="#/page/guide-admin-team">admin team</a>, <a href="#/page/guide-franchise-holder">Franchise holder</a>, <a href="#/page/guide-owner">business owner</a>.</p>

<h2>Part 1. The admin team</h2>
<ol>
<li><b>Owner</b> signs in at /admin/login and opens <b>Team</b>.</li>
<li>Invite a Finance person and a Marketing person. <b>You see:</b> two pending invites with links.</li>
<li>Each opens their link and sets a password. <b>You see:</b> both active in Team.</li>
<li>Finance signs in. <b>You see:</b> Billing, Franchise holders, Trade Partners, Plans; no Team, Leads or Social.</li>
<li>Marketing signs in. <b>You see:</b> only Leads, Site content and Social.</li>
</ol>

<h2>Part 2. Franchise holder to business</h2>
<ol start="6">
<li>The Franchise holder must already exist (Owner or Finance adds them under Franchise holders and gives them a sign-in link). They sign in. <b>You see:</b> the Franchise menu.</li>
<li>Franchise holder opens <b>Leads</b> and adds a prospect with a follow-up date today. <b>You see:</b> the prospect in New and "Follow-ups due" on Home.</li>
<li>Move it to Contacted, then Demo, adding a note each time. <b>You see:</b> the notes in the timeline.</li>
<li>Press <b>Convert to business</b>. <b>You see:</b> the Add business form pre-filled with the name and phone. Create it. <b>You see:</b> a sign-in link for the owner.</li>
<li>The business owner opens the link and sets a password. In <b>My businesses</b> the Franchise holder sees the business.</li>
</ol>

<h2>Part 3. The business sets up</h2>
<ol start="11">
<li>The business owner opens Setup guide and adds an Item with a price.</li>
<li>Connects a WhatsApp number and attaches it to the Item. (If a number is needed, requests it; Support handles it under Number requests.)</li>
<li>Sends a message from another phone. <b>You see:</b> the agent reply and the chat in Inbox.</li>
<li>Opens Plan &amp; billing. <b>You see:</b> the plan, renewal date and payment reference.</li>
</ol>

<h2>Part 4. Payment proof to confirmed</h2>
<ol start="15">
<li>The Franchise holder opens My businesses. <b>You see:</b> the business as due (or trial), with an amount.</li>
<li>Press <b>Send reminder</b>. <b>You see:</b> WhatsApp open with AgentCraftr's payment details and the reference.</li>
<li>The business "pays" AgentCraftr (a test receipt is enough). The Franchise holder presses <b>Upload payment proof</b> with receipt, method, amount and reference. <b>You see:</b> "Proof waiting for AgentCraftr".</li>
<li><b>Finance</b> opens Billing, <b>Proofs to confirm</b>. <b>You see:</b> the proof, "Put in by: Franchise holder".</li>
<li>Finance confirms it with the right method. <b>You see:</b> it leaves the queue.</li>
<li>Business owner refreshes Plan &amp; billing. <b>You see:</b> status active, new renewal date, payment in history.</li>
<li>Franchise holder refreshes My businesses. <b>You see:</b> Active.</li>
<li>Franchise holder opens <b>Earnings</b>. <b>You see:</b> a new line for that business.</li>
</ol>

<h2>Part 5. Payout</h2>
<ol start="23">
<li>Finance opens Billing, <b>Statements</b>, Franchise holders. <b>You see:</b> an amount owed to the Franchise holder.</li>
<li>Press <b>Record payout</b>, choose a method, add a reference, save. <b>You see:</b> owed drops and the last payout shows.</li>
<li>Franchise holder opens Earnings. <b>You see:</b> the payout in the payouts list.</li>
<li>Owner opens <b>Activity log</b>. <b>You see:</b> the confirm and payout under Finance's name.</li>
</ol>

<h2>Part 6. Social post to lead</h2>
<ol start="27">
<li><b>Marketing</b> opens Social and creates a post with an Instagram caption. Press <b>AI help</b> for a draft.</li>
<li>Under <b>Tracked links</b> press <b>New link</b>. <b>You see:</b> a link ending in a code.</li>
<li>Press <b>Scheduled</b> with a date, then later <b>Mark posted</b> with a pasted post link (posting is by hand).</li>
<li>In a private window open the tracked link. <b>You see:</b> the site opens and the click is counted.</li>
<li>Sign up or send a chat message on the site from that window.</li>
<li>Back in Social, open the post. <b>You see:</b> the person under "People who signed up from this post".</li>
<li>Open <b>Leads</b>. <b>You see:</b> the new lead (source social, linked to the post).</li>
</ol>

<h2>If a step fails</h2>
<ul>
<li>Nothing in Proofs to confirm: check the proof was submitted on the right business, and that Finance or Owner is signed in.</li>
<li>Business still not active after confirm: refresh, then open the Tenant and check the period end.</li>
<li>No earnings line: the payment must be confirmed first, and the business must be linked to that Franchise holder.</li>
<li>Agent silent: the number is not attached to an Item.</li>
<li>A menu is missing: that is the role working. Check the role in Team.</li>
</ul>
<p class="muted">Not testable here: automatic posting to social platforms, email delivery of invites and online card payment. They are not built.</p>`,
});
