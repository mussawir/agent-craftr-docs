Docs.page({
  id: "guide-staff", group: "User guides", icon: "💬", title: "Guide: Business staff",
  summary: "For people who work for a business: what each staff job can see, how to answer chats, work orders and tasks, and how to use the CoAgent phone app.",
  body: `
<p>You work for a business. The owner invited you with a link and you set a password. You use the web dashboard, the <b>CoAgent</b> phone app, or both. Same login for both.</p>

<h2>What you can do</h2>
<p>A normal <b>Staff</b> login sees the inbox, contacts, sales (orders, payments, customers) and AI setup. You do <b>not</b> see Plan &amp; billing, Team, Integrations, Approvals, or sending broadcasts. The owner can also give you a job:</p>
<table>
<tr><th>Job</th><th>What you see</th></tr>
<tr><td>Manager</td><td>Everything a staff member can do</td></tr>
<tr><td>Sales</td><td>Everything a staff member can do</td></tr>
<tr><td>Warehouse</td><td>Only tasks and the orders to pack</td></tr>
<tr><td>Rider</td><td>Only tasks and the orders to deliver</td></tr>
<tr><td>Technician</td><td>Only tasks and jobs</td></tr>
</table>

<h2>Workflows</h2>

<h3>1. Join the business</h3>
<ol>
<li>Open the invite link the owner sent you. It lasts 7 days.</li>
<li>Set a password.</li>
<li>Sign in on the web, or in the CoAgent app.</li>
</ol>

<h3>2. Answer a handed-over chat</h3>
<ol>
<li>Open <a href="#/screen/web-inbox">Inbox</a> (or <b>Chats</b> in the app).</li>
<li>Open the chat that needs a person.</li>
<li>Read the history, then reply.</li>
<li>Hand the chat back to the agent when you are done. See <a href="#/flow/handover">Handover</a>.</li>
</ol>

<h3>3. Work an order</h3>
<ol>
<li>Open <a href="#/screen/web-orders">Orders</a>. In the app, Warehouse sees <b>To pack</b>, Rider sees <b>To deliver</b>.</li>
<li>Open the order. Pack it, then mark it out for delivery, then delivered.</li>
<li>Each change tells the customer. See <a href="#/flow/pack-and-deliver">Pack and deliver</a>.</li>
</ol>

<h3>4. Check a payment</h3>
<ol>
<li>Open <a href="#/screen/web-payments">Payments</a>.</li>
<li>Compare the photo and amount with the bank or wallet.</li>
<li>Approve or reject it. See <a href="#/flow/payment-proof">Payment proof</a>.</li>
</ol>

<h3>5. Do a task</h3>
<ol>
<li>Open <b>Tasks</b> (<a href="#/screen/mobile-tasks">in the app</a>).</li>
<li>Open a task given to you. Do the work.</li>
<li>Add the proof it asks for (for example a photo) and mark it done. See <a href="#/flow/staff-task-proof">Task with proof</a>.</li>
</ol>

<h3>6. Use the CoAgent phone app</h3>
<ol>
<li>Sign in with the same email and password (<a href="#/screen/mobile-login">login</a>).</li>
<li>Use the bottom tabs. Tasks, orders and chats are there. Everything else is under <b>More</b>.</li>
<li>You get a phone notification for new work (<a href="#/flow/mobile-notification">how</a>).</li>
</ol>
<p>All app screens: <a href="#/app/mobile">CoAgent</a> and <a href="#/page/coagent">the CoAgent page</a>.</p>

<h2>System check</h2>
<ol>
<li>Owner invites you (Settings, Team). <b>You see:</b> your name as pending, then active after you accept.</li>
<li>Open the link, set a password, sign in. <b>You see:</b> the dashboard with no Plan &amp; billing and no Team.</li>
<li>Type /app/billing in the address bar. <b>You see:</b> you are sent away, not shown billing.</li>
<li>Open Inbox. <b>You see:</b> the business chats. Reply to one. <b>You see:</b> your reply on the customer's phone.</li>
<li>Open Orders and move an order forward. <b>You see:</b> the new status.</li>
<li>Owner gives you a task. <b>You see:</b> it in Tasks, and a phone notification in the app. Complete it with proof. <b>You see:</b> it marked done.</li>
<li>Ask the owner to set your job to Rider. Sign in again in the app. <b>You see:</b> only Tasks and To deliver.</li>
<li>Owner disables you. <b>You see:</b> you are signed out at once.</li>
</ol>`,
});
