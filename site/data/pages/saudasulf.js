Docs.page({
  id: "saudasulf", group: "Understand it", icon: "🛒", title: "SaudaSulf: the ordering app",
  summary: "A separate app for ordering. Shops of every trade that sells from a product list put their catalogue in it; their customers add the shop and order. Sold after the WhatsApp package, with its own monthly package.",
  body: `
<p><b>SaudaSulf</b> (سودا سلف) is AgentCraftr's second store app, next to <b>CoAgent</b>. WhatsApp can't show a shopping cart, so a shop that wants proper ordering gives its customers SaudaSulf: a catalogue, a cart, order tracking and a chat with the shop, like WhatsApp and a shopping app in one.</p>

<h2>Two apps, one business</h2>
<table>
<tr><th></th><th>CoAgent</th><th>SaudaSulf</th></tr>
<tr><td>What it is</td><td>The hub: every WhatsApp conversation, customers, analytics, marketing and leads</td><td>A dedicated app for one job: ordering</td></tr>
<tr><td>Who gets it</td><td>Every business with a WhatsApp package</td><td>Shops that buy a SaudaSulf package (usually after WhatsApp; it can also be bought alone)</td></tr>
<tr><td>Who uses it</td><td>The business and its staff</td><td>The shop and its staff, <b>and the shop's customers</b></td></tr>
<tr><td>Orders</td><td>Shows every order</td><td>Where orders are worked once the shop has SaudaSulf</td></tr>
<tr><td>Khata and chats</td><td colspan="2">Shown in both apps: the same records, nothing copied</td></tr>
</table>
<p>Same login, same data. A shop with both has two subscriptions, each paid and paused on its own.</p>

<h2>Which app works an order</h2>
<div class="callout"><b>One order, one place</b>Until a shop buys SaudaSulf, it works its orders in CoAgent, as today. From the day it has SaudaSulf, <b>every</b> order, from WhatsApp and from the app, is worked in SaudaSulf; CoAgent still shows it, with "Open in SaudaSulf". If the SaudaSulf package lapses, orders go back to CoAgent by themselves. No order is ever stuck.</div>

<h2>Who it is for</h2>
<p>Every trade that sells from a product list: grocery and kiryana first, pharmacy, bakery and more. Restaurants are not in SaudaSulf; food delivery will be its own app later.</p>

<h2>How a customer finds a shop</h2>
<ol>
<li>The shop shares its <b>code</b> (6 letters and numbers, e.g. K7PM4X) or its <b>QR</b> on a stand at the counter.</li>
<li>The customer opens SaudaSulf, taps <i>I want to order</i> → <i>Add a shop</i>, and types the code, or scans the QR.</li>
<li>Next time they open the app, their shops are there. A customer never sees shops they weren't given.</li>
</ol>

<h2>Packages</h2>
<table>
<tr><th>Package</th><th>PKR / month</th><th>Messages</th><th>Staff logins</th></tr>
<tr><td>Chhota</td><td>999</td><td>1,500</td><td>2</td></tr>
<tr><td>Dukaan</td><td>1,999</td><td>5,000</td><td>4</td></tr>
<tr><td>Bara</td><td>3,499</td><td>12,000</td><td>8</td></tr>
</table>
<p>Extra messages: 500 for PKR 499, or 2,000 for PKR 1,499, valid to the end of the month. Every communication in the app is one message: the customer's text, the order, an AI reply, a staff reply, each status update. A plain order is about 5 messages. No free trial; no commission on orders. Paid by JazzCash, Easypaisa or bank transfer and confirmed by our team, as with WhatsApp plans. The shop's code and QR work only while its package is paid.</p>

<h2>What is built so far</h2>
<table>
<tr><th>Part</th><th>Status</th></tr>
<tr><td>Welcome, shop sign-in, the shop's five tabs, language</td><td>Built (<a href="#/app/saudasulf">screens</a>)</td></tr>
<tr><td>SaudaSulf packages and payments on our side</td><td>Built (waiting for the database update)</td></tr>
<tr><td>Shop code &amp; QR, customer sign-up (name + number), Add a shop, My shops</td><td>Built (<a href="#/screen/saudasulf-shop-code">shop code</a>, <a href="#/screen/saudasulf-onboarding">sign-up</a>)</td></tr>
<tr><td>App customers: confirm, not this person, block</td><td>Built (<a href="#/screen/saudasulf-app-customers">screen</a>)</td></tr>
<tr><td>Catalogue, cart and checkout (prices from our side), My orders, cancel while new</td><td>Built (<a href="#/screen/saudasulf-shop-catalogue">catalogue</a>, <a href="#/screen/saudasulf-cart">cart</a>, <a href="#/screen/saudasulf-customer-order">order</a>)</td></tr>
<tr><td>Shop: Orders (pack, out for delivery, delivered, payment received), Products (price, stock), order updates setting</td><td>Built (<a href="#/screen/saudasulf-shop-orders">orders</a>, <a href="#/screen/saudasulf-shop-products">products</a>)</td></tr>
<tr><td>Message counting: every message counted once, warnings at 80% and 95%, 6-hour grace then ordering closes, extra packs, the "Package &amp; messages" screen and the usage banner</td><td>Built (waiting for the database update) (<a href="#/screen/saudasulf-package">package</a>, <a href="#/screen/saudasulf-usage-banner">banner</a>)</td></tr>
<tr><td>CoAgent "Open in SaudaSulf", khata in the app, install link opens Add a shop</td><td>Built (waiting for the database update) (<a href="#/screen/saudasulf-shop-khata">shop khata</a>, <a href="#/screen/saudasulf-khata-account">account</a>, <a href="#/screen/saudasulf-khata-switch">khata switch</a>, <a href="#/screen/saudasulf-my-khata">my khata</a>, <a href="#/screen/saudasulf-shop-order">put on khata</a>, <a href="#/screen/saudasulf-add-shop">install link</a>)</td></tr>
<tr><td>Chat in the app, notifications</td><td>Next</td></tr>
</table>
<p class="muted">Decisions as of 17 November 2026. Source: MASTER-PLAN.md, section 3.</p>`,
});
