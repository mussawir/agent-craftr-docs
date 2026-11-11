Docs.page({
  id: "agent-and-handover", group: "Understand it", icon: "🤖", title: "The AI agent and handover",
  summary: "One agent answers every chat using the skills your trade has switched on. It hands a chat to a person when it should, and says why.",
  body: `
<h2>What the agent can do</h2>
<table>
<tr><th>Skill</th><th>What the agent does</th><th>What the system checks</th></tr>
<tr><td>Answer</td><td>Replies from the Item's knowledge</td><td>Only this business's knowledge is searched</td></tr>
<tr><td>Prices</td><td>Quotes the price table</td><td>Figures quoted exactly as entered</td></tr>
<tr><td>Orders</td><td>Builds a cart</td><td>Products, stock and the total</td></tr>
<tr><td>Bookings</td><td>Offers free slots</td><td>Slot still free when booking</td></tr>
<tr><td>Quotes, jobs, complaints</td><td>Collects the details</td><td>Never prices; a person does</td></tr>
<tr><td>Files</td><td>Sends files you switched on</td><td>Only those files, at most 5</td></tr>
<tr><td>Payments</td><td>Reads payment screenshots</td><td>A person confirms</td></tr>
<tr><td>Hand over</td><td>Passes the chat to a person</td><td>Reason recorded</td></tr>
</table>

<h2>Why a person gets a chat</h2>
<table>
<tr><th>Reason shown</th><th>What to do</th></tr>
<tr><td>The customer asked for a person</td><td>Reply, then give the chat back to the AI</td></tr>
<tr><td>Plan paused</td><td>The trial ended or the month expired. Pay to turn the AI back on; the inbox keeps working</td></tr>
<tr><td>AI replies used up</td><td>This month's allowance is spent. Upgrade, or answer by hand until next month</td></tr>
<tr><td>Cost limit</td><td>The business's AI spending limit was reached</td></tr>
<tr><td>Automation</td><td>One of your automations handed it over</td></tr>
<tr><td>Staff paused / staff replied</td><td>Someone on your team took over</td></tr>
</table>
<p>The first reason stays until someone resumes the AI. One AI answer counts as one reply; files sent after the words don't count again.</p>
<p><a href="#/flow/handover">See the handover workflow</a> · <a href="#/screen/web-inbox">Inbox guide</a></p>`,
});
