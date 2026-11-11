Docs.page({
  id: "items", group: "Understand it", icon: "📦", title: "Items: what the agent talks about",
  summary: "An Item is one thing the business sells or offers, with its own knowledge, prices and settings. A WhatsApp number answers for one or more Items.",
  body: `
<table>
<tr><th>Item type</th><th>Use it for</th><th>Example</th></tr>
<tr><td>Product</td><td>One product or a small range</td><td>A lawn suit collection</td></tr>
<tr><td>Service</td><td>Something you do for people</td><td>Dental check-up, AC repair</td></tr>
<tr><td>Property</td><td>A plot, house or flat</td><td>5 marla house, DHA</td></tr>
<tr><td>Catalog (whole shop)</td><td>Shops with hundreds of products</td><td>A grocery store with 300 products</td></tr>
</table>

<div class="callout"><b>A whole shop is ONE Item</b>Don't create 300 Items for a grocery store. Create one catalog Item and upload the price list (CSV or Excel). Each product becomes a row with price, unit, other names and optional stock. Re-uploading the list updates prices in bulk.</div>

<h2>What an Item holds</h2>
<ul>
<li><b>Knowledge</b>: PDFs, Office files, photos, voice notes, links and notes. The agent searches these to answer.</li>
<li><b>Files to send</b>: switch on “Send to customers” for pictures (JPG/PNG up to 5 MB), videos (MP4 up to 16 MB) and documents (up to 100 MB).</li>
<li><b>Prices</b>: a price table the agent quotes exactly, or products for a catalog.</li>
<li><b>Persona</b>: how the agent speaks for this Item.</li>
<li><b>Booking, requests, date bookings</b>: if your trade uses them.</li>
</ul>

<div class="callout warn"><b>The number must be attached</b>A connected WhatsApp number that isn't attached to any Item gets no AI replies. Check the Items column on the WhatsApp numbers page.</div>

<p>See it on screen: <a href="#/screen/web-items">Items list</a> · <a href="#/screen/web-item-knowledge">One Item</a> · <a href="#/screen/mobile-teach">Teach from the phone</a></p>`,
});
