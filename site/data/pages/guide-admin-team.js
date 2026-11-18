Docs.page({
  id: "guide-admin-team", group: "User guides", icon: "🛠️", title: "Guide: AgentCraftr admin team",
  summary: "For our own staff: what Owner, Finance, Support and Marketing each see and do in the admin, with steps and a check for each role.",
  body: `
<p>The admin is where AgentCraftr runs itself. Sign in at <b>/admin/login</b>. Each person has <b>one role</b>. The menu shows only what your role may open, and the server refuses the rest. Every change you make is written to the activity log under your name.</p>

<h2>Who can open what</h2>
<p>R is read only. RW is read and change. A dash means no access.</p>
<table>
<tr><th>Area</th><th>Owner</th><th>Finance</th><th>Support</th><th>Marketing</th></tr>
<tr><td>Home</td><td>RW</td><td>R</td><td>R</td><td>R</td></tr>
<tr><td>Team (<a href="#/screen/admin-team">screen</a>), Activity log</td><td>RW / R</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>Billing desk (<a href="#/screen/admin-billing">screen</a>), Plans</td><td>RW</td><td>RW</td><td>R</td><td>-</td></tr>
<tr><td>Franchise holders, Trade Partners (and payouts)</td><td>RW</td><td>RW</td><td>R</td><td>-</td></tr>
<tr><td>Tenants, view-as, Numbers, Number requests, Business types</td><td>RW</td><td>R</td><td>RW</td><td>-</td></tr>
<tr><td>Usage, Cities</td><td>RW</td><td>R</td><td>R</td><td>-</td></tr>
<tr><td>Settings (AI, gateways, currencies, countries)</td><td>RW</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>Leads, Site content, Social (<a href="#/screen/admin-social">screen</a>)</td><td>RW</td><td>-</td><td>R</td><td>RW</td></tr>
</table>
<p>The last Owner cannot be disabled or demoted. Nobody can change their own role.</p>

<div class="callout"><b>Money rule</b>Only AgentCraftr collects payment: cash, bank transfer, Easypaisa or JazzCash. Franchise holders and Trade Partners only remind and upload proofs. Finance or Owner confirms. Their own share reaches them as a payout we record.</div>

<h2>Owner</h2>
<p><b>Can do:</b> everything, including Team, Activity log and Settings.</p>

<h3>Invite a staff member</h3>
<ol>
<li>Open <b>Team</b> and press <b>Invite staff</b>.</li>
<li>Type name and email. Pick the role: Owner, Finance, Support or Marketing. Press <b>Create invite</b>.</li>
<li>Copy the link, or press <b>Share on WhatsApp</b>. We do not send email: you share the link by hand.</li>
<li>The person opens the link and sets a password. They then sign in at /admin/login.</li>
<li>Later you can <b>Change role</b>, <b>Resend link</b> or <b>Cancel invite</b>, or disable the person. Disabling signs them out at once.</li>
</ol>

<h3>Read the activity log</h3>
<ol><li>Open <b>Activity log</b>. Every admin change shows with the person's name.</li></ol>

<p><b>System check (Owner)</b></p>
<ol>
<li>Sign in. <b>You see:</b> every menu item including Team and Activity log.</li>
<li>Invite a test Finance person. <b>You see:</b> a pending member and a link.</li>
<li>Open the link in a private window and set a password. <b>You see:</b> the person active in Team.</li>
<li>Change their role to Support. <b>You see:</b> the role label change; their menu changes next time they load.</li>
<li>Try to disable the only Owner. <b>You see:</b> it is refused.</li>
<li>Open Activity log. <b>You see:</b> the invite and role change under your name.</li>
</ol>

<h2>Finance</h2>
<p><b>Can do:</b> Billing desk, Plans, Franchise holders and Trade Partners (including payouts). Can read tenants and usage. Cannot see leads, site, social, Team or Settings.</p>

<h3>Confirm a payment</h3>
<ol>
<li>Open <b>Billing</b>, tab <b>Proofs to confirm</b>. One queue for WhatsApp and SaudaSulf, whoever uploaded: the business, a Franchise holder, a Trade Partner or staff. The "Put in by" column tells you.</li>
<li>Check the receipt against the bank or wallet. Match the reference.</li>
<li>Press confirm. Choose the method (cash, bank, Easypaisa or JazzCash) and confirm. Or reject it.</li>
<li>The business becomes active with a new period end. The earnings line for its Franchise holder or Trade Partner is created.</li>
</ol>

<h3>Chase renewals</h3>
<ol>
<li>Use the tabs <b>Due</b>, <b>Overdue</b>, <b>Paused</b> and <b>Renewing in 7 days</b>. Filter by product. Search by business, phone or reference.</li>
<li>Each row shows plan, status, period end, days, amount due and who brought the business.</li>
<li>The <b>SaudaSulf</b> tab shows the SaudaSulf shops.</li>
</ol>

<h3>Pay a Franchise holder or Trade Partner</h3>
<ol>
<li>Open the <b>Statements</b> tab. Pick Franchise holders or Trade Partners.</li>
<li>Each row shows what is owed and the last payout.</li>
<li>Pay them outside the system (bank, Easypaisa, JazzCash or cash). Then press <b>Record payout</b>, pick the method, add the reference and press <b>Save payout</b>.</li>
<li>A payout settles everything owed to that person, not only one month. It shows in their Earnings.</li>
</ol>

<h3>Change a plan or grant time</h3>
<ol><li>Open the business under <b>Tenants</b>. Use <b>Change plan</b> or <b>Grant subscription period</b>. Plans and prices are under <b>Plans</b>.</li></ol>

<p><b>System check (Finance)</b></p>
<ol>
<li>Sign in. <b>You see:</b> Billing, Franchise holders, Trade Partners, Plans, Tenants (read only). No Team, Leads, Social or Settings.</li>
<li>Billing. <b>You see:</b> the tabs Due, Overdue, Paused, Renewing in 7 days, Proofs to confirm, SaudaSulf and Statements, each with a count.</li>
<li>Have a Franchise holder upload a proof. <b>You see:</b> it in Proofs to confirm, "Put in by: Franchise holder".</li>
<li>Confirm it with method bank. <b>You see:</b> it leaves the queue, and the business is active in Tenants.</li>
<li>Statements. <b>You see:</b> the Franchise holder owes more than before. Record a payout. <b>You see:</b> owed drops and the last payout shows.</li>
<li>Open a Tenant. <b>You see:</b> details but no edit buttons for channels or numbers.</li>
</ol>

<h2>Support</h2>
<p><b>Can do:</b> Tenants, view-as, Numbers, Number requests, Business types (change). Reads billing, partners, usage and leads.</p>

<h3>Add a business and get it live</h3>
<ol>
<li>Open <b>Tenants</b> and add a tenant: business name, type, owner's name, WhatsApp and email, plan and days.</li>
<li>Copy the owner's sign-in link and send it. The owner opens it and sets a password.</li>
<li>Follow the steps the dialog shows: attach the Item to the number and send a test message.</li>
</ol>

<h3>See what a business sees (view-as)</h3>
<ol>
<li>Open the business in <b>Tenants</b> and press the view-as button.</li>
<li>The business dashboard opens in a new view, read only, with a banner. You cannot change anything while viewing.</li>
<li>Close the view when done.</li>
</ol>

<h3>Handle a number request</h3>
<ol>
<li>Open <b>Number requests</b>. Each row is a business asking for a number.</li>
<li>Pick the provider (adapter), set it up and approve. If nothing is waiting it says so.</li>
<li>Open <b>Numbers</b> to see every number. Filter by Live, Requested, Blocked by us or Off. Display name and daily limit show per number.</li>
</ol>

<h3>Test a business channel</h3>
<ol><li>In the tenant page, under WhatsApp channels, use <b>Send a test message</b>.</li></ol>

<p><b>System check (Support)</b></p>
<ol>
<li>Sign in. <b>You see:</b> Tenants, Numbers, Number requests, Business types, plus Billing, Franchise holders, Usage and Leads you can only read.</li>
<li>Add a test tenant. <b>You see:</b> it in the list and a sign-in link.</li>
<li>Press view-as. <b>You see:</b> the business dashboard with a view banner, and no save works.</li>
<li>Open Billing. <b>You see:</b> the lists but no confirm or reject buttons.</li>
<li>Open Team in the address bar (/admin/team). <b>You see:</b> you are sent back to admin home.</li>
</ol>

<h2>Marketing</h2>
<p><b>Can do:</b> Leads, Site content and Social. Home is read only. Nothing else.</p>

<h3>Work the leads</h3>
<ol>
<li>Open <b>Leads</b>. See totals: Total, In play, Won, Conversion.</li>
<li>Filter by stage or "Overdue only". Open a lead to see its timeline.</li>
<li>Add notes and set the next action date. Leads from the website chat, Franchise holders, Trade Partners and social posts all land here.</li>
</ol>

<h3>Update what the website chatbot knows</h3>
<ol>
<li>Open <b>Site content</b>.</li>
<li>Press <b>Add text</b> or <b>Upload file</b>. Wait for "Indexing" to finish.</li>
<li>The homepage chatbot now answers from it.</li>
</ol>

<h3>Plan and post on social media</h3>
<ol>
<li>Open <b>Social</b>. The calendar shows month and week. Ideas and drafts without a date wait in a side list.</li>
<li>Press <b>New post</b>. Give it a title and notes. Status goes idea, draft, scheduled, posted.</li>
<li>For each platform (Facebook, Instagram, TikTok, LinkedIn, YouTube) open its tab and write the caption. Press <b>AI help</b> to draft one. The caption limit for the platform is shown.</li>
<li>Choose <b>Scheduled</b> and a <b>Post on</b> date. This is a reminder for a person: nothing posts by itself.</li>
<li>Under <b>Tracked links</b> press <b>New link</b> for a platform. Copy the link (it looks like /r/ and a code) and put it in the post.</li>
<li>Post by hand on the platform. Press <b>Copy caption</b> to paste it. Then <b>Mark posted</b> and paste the link to the live post.</li>
<li>Clicks and sign-ups show under <b>People who signed up from this post</b>, and the lead appears in Leads with source social.</li>
</ol>
<p class="muted">Coming later: automatic posting through the platforms and pulling their analytics.</p>

<p><b>System check (Marketing)</b></p>
<ol>
<li>Sign in. <b>You see:</b> Leads, Site content and Social only.</li>
<li>Site content: add a short text. <b>You see:</b> it in the list after indexing. Ask the homepage chatbot about it; it answers from it.</li>
<li>Social: create a post, write an Instagram caption, press AI help. <b>You see:</b> a draft caption.</li>
<li>Create a tracked link. <b>You see:</b> a link ending in a code.</li>
<li>Open that link in a private window. <b>You see:</b> a redirect to the site and the click counted.</li>
<li>Sign up through it. <b>You see:</b> the person under the post, and as a lead in Leads.</li>
<li>Try /admin/billing. <b>You see:</b> you are sent back to admin home.</li>
</ol>`,
});
