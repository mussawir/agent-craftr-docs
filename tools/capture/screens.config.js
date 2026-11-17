// Every screen the docs site shows. `node capture.js` turns each entry into
//   site/images/<app>/<id without the "<app>-" prefix>.png  and  site/data/screens/<id>.js
//
// Screen fields
//   id, app (web|admin|partner), section, title, route, roles, summary  -> copied into the screen file
//   as        which login to use: "owner" (default) | "admin" | "partner" | null (signed out)
//   viewport  defaults to 1440x900
//   fixtures  this screen's own API answers, tried before the shared ones in fixtures/ (same shape)
//   before    steps run after the page settles:
//             { do: "click"|"fill"|"hover"|"press"|"wait"|"waitFor"|"scroll"|"scrollY"|"eval", sel, value, nth, y, fn }
//   waitFor   a selector that must be visible before the screenshot
//   marks     { id, n, sel, kind = "action"|"info"|"warn", label, text, go?, nth?, all?, pad? }
//             `sel` is a Playwright selector: CSS (with :has-text(), :text-is()), `text=...`,
//             `role=button[name="Save"]`, chained with `>>`. `nth` picks one match (default the first,
//             -1 = the last); `all: true` draws one box around every match.
//   arrows    { from, to, label? } between marks of the same screen ("what you can do next")
const { FROZEN_NOW, USERS } = require("./fixtures/data");
const owner = require("./fixtures/owner");

const OWNER = ["owner"];
const TEAM = ["owner", "staff"];

/** Scroll a scrollable box (found by its background colour) to the bottom — the chat pane. */
const scrollChatToEnd = {
  do: "eval",
  fn: () => {
    const pane = [...document.querySelectorAll("div")].find((d) => getComputedStyle(d).backgroundColor === "rgb(230, 222, 212)");
    if (pane) pane.scrollTop = pane.scrollHeight;
  },
};
const formControl = (label) => `.MuiFormControl-root:has(label:has-text("${label}"))`;

module.exports = {
  frozenNow: FROZEN_NOW,
  viewport: { width: 1440, height: 900 },
  users: { owner: USERS.owner, admin: USERS.admin, partner: USERS.partner },
  screens: [
    // ── Public ───────────────────────────────────────────────────────────────
    {
      id: "web-login", app: "web", section: "Getting started", title: "Sign in", route: "/login", as: null,
      roles: ["owner", "staff", "partner"],
      summary: "Sign in with the email and password you chose when you joined. Staff use their own email.",
      before: [
        { do: "fill", sel: "input[type=email]", value: "bilal@alnoor-demo.pk" },
        { do: "fill", sel: "input[type=password]", value: "demo-password" },
      ],
      marks: [
        { id: "email", n: 1, sel: formControl("Email"), label: "Email", text: "Type the email you signed up with, or the one your owner invited you with." },
        { id: "password", n: 2, sel: formControl("Password"), label: "Password", text: "Your own password. Nobody at AgentCraftr can see it." },
        { id: "login", n: 3, sel: "role=button[name=\"Log in\"]", label: "Log in", text: "Opens your Home page, or the partner pages if you are a partner.", go: "web-home" },
        { id: "signup", n: 4, sel: "text=Create an account", label: "Create an account", text: "New here? Start a free 3-day trial instead.", go: "web-signup" },
      ],
      arrows: [{ from: "email", to: "password" }, { from: "password", to: "login" }],
    },
    {
      id: "web-signup", app: "web", section: "Getting started", title: "Start your free trial", route: "/signup", as: null,
      roles: ["owner"],
      summary: "Create your business account. The first 3 days are free and you pay nothing to start.",
      before: [
        { do: "fill", sel: "role=textbox[name=/Your name/]", value: "Bilal Ahmed" },
        { do: "fill", sel: "role=textbox[name=/Work email/]", value: "bilal@alnoor-demo.pk" },
        { do: "fill", sel: "input[type=password]", value: "demo-password" },
        { do: "fill", sel: "role=textbox[name=/Company name/]", value: "Al-Noor Kiryana Store" },
        { do: "fill", sel: "role=textbox[name=/Phone/]", value: "0300 0000100" },
        { do: "scrollY", y: 330 },
      ],
      marks: [
        { id: "plan", n: 1, sel: "text=Change plan", kind: "action", label: "Change plan", text: "Pick the plan that fits. You can change it later; nothing is charged during the trial." },
        { id: "details", n: 2, sel: formControl("Your name"), label: "Your details", text: "Your name, email and a password. This becomes the owner login." },
        { id: "company", n: 3, sel: formControl("Company name"), label: "Business name", text: "The name your customers know. Leave it blank to use your own name." },
        { id: "trade", n: 4, sel: formControl("What kind of business"), label: "What kind of business?", text: "Choose your trade so the agent starts with the right tone and the right features switched on." },
        { id: "city", n: 5, sel: formControl("City"), label: "City", text: "Lets a local partner help you set up, if there is one in your city." },
        { id: "continue", n: 6, sel: "role=button[name=\"Continue\"]", label: "Continue", text: "Go to the last step and start your free trial. No payment needed." },
      ],
      arrows: [{ from: "details", to: "company" }, { from: "trade", to: "continue", label: "then" }],
    },

    // ── Owner dashboard ──────────────────────────────────────────────────────
    {
      id: "web-home", app: "web", section: "Home", title: "Home", route: "/app", roles: TEAM,
      summary: "Your day at a glance: who is waiting for a reply, today's chats, money coming in and how much the AI handled.",
      marks: [
        { id: "needs-reply", n: 1, sel: "a:has-text(\"Need your reply\")", label: "Need your reply", text: "Customers waiting for a person. Click to open the Inbox and answer them first.", go: "web-inbox" },
        { id: "orders", n: 2, sel: ".MuiAlert-root:has-text(\"new orders to pack\")", label: "Orders to pack", text: "New orders the agent took on WhatsApp. Open them to pack and deliver.", go: "web-orders" },
        { id: "revenue", n: 3, kind: "info", sel: "a:has-text(\"Revenue this month\")", label: "Revenue this month", text: "Money from payments you confirmed. Unchecked screenshots are not counted." },
        { id: "ai-share", n: 4, kind: "info", sel: ".MuiPaper-root:has(> p:text-is(\"Handled by AI\"))", label: "Handled by AI", text: "How many of this month's chats the AI finished without a person stepping in." },
        { id: "insights", n: 5, kind: "info", sel: "h6:text-is(\"This week\") + div", label: "This week", text: "Plain facts about this week compared with last week. Click a card to see the records behind it." },
        { id: "agent", n: 6, sel: ".MuiPaper-root:has(p:text-is(\"AI Agent\")) >> nth=-1", kind: "info", label: "AI Agent", text: "AI replies used this month against your plan, and Meta's 1,000 free WhatsApp replies per number." },
      ],
      arrows: [{ from: "needs-reply", to: "orders", label: "then" }],
    },
    {
      id: "web-setup", app: "web", section: "AI agent", title: "Setup guide", route: "/app/setup", roles: TEAM,
      summary: "Seven steps from nothing to an AI that answers your customers on WhatsApp. Do them in order.",
      fixtures: [{ path: "dashboard/home", reply: () => {
        const h = owner.home();
        const done = new Set(["item", "knowledge", "persona"]);
        h.setup = { ...h.setup, complete: false, steps: h.setup.steps.map((s) => ({ ...s, done: done.has(s.key) })) };
        return owner.ok(h);
      } }],
      marks: [
        { id: "progress", n: 1, kind: "info", sel: ".MuiLinearProgress-root", label: "Your progress", text: "How many of the seven steps are done. The agent starts answering once the number step is finished." },
        { id: "done", n: 2, kind: "info", sel: "[data-testid=step-item]", label: "A finished step", text: "A green tick means it is done. Press Open to change it any time." },
        { id: "optional", n: 3, kind: "info", sel: "[data-testid=step-files]", label: "Recommended", text: "Not required, but customers love it: photos and PDFs the agent can send when asked." },
        { id: "next", n: 4, sel: "[data-testid=step-number]", label: "Your next step", text: "Highlighted in green. Press the button to go straight to the page where you do it.", go: "web-channels" },
        { id: "attach", n: 5, kind: "info", sel: "[data-testid=step-attached]", label: "Put the number on what you sell", text: "Until a number answers for a product or service, the agent stays silent." },
      ],
      arrows: [{ from: "next", to: "attach", label: "then" }],
    },
    {
      id: "web-items", app: "web", section: "AI agent", title: "Products & services", route: "/app/items", roles: TEAM,
      summary: "Everything your agent can talk about. Each card is one shop, service or product with its own knowledge.",
      marks: [
        { id: "new", n: 1, sel: "role=button[name=\"New item\"]", label: "New item", text: "Add a product, a service, a property or a whole shop with many products." },
        { id: "card", n: 2, sel: ".MuiPaper-root:has(> * button[aria-label=\"Edit Al-Noor Family Clinic\"]) >> nth=-1", kind: "info", label: "One item", text: "What it is, what the agent knows about it, and the three things it needs: knowledge, a persona and a number." },
        { id: "status", n: 3, kind: "info", sel: "text=Answering >> nth=1", label: "Status", text: "\"Answering\" means customers get replies. Anything else tells you what is missing." },
        { id: "open", n: 4, sel: "role=button[name=\"Open knowledge & files →\"] >> nth=1", label: "Open knowledge & files", text: "Teach the agent about this item: photos, price lists, notes and voice notes.", go: "web-item-knowledge" },
        { id: "warn", n: 5, kind: "warn", sel: "text=Not on a number", label: "Not on a number", text: "This item has knowledge but no WhatsApp number answers for it yet, so nobody gets replies about it." },
        { id: "connect", n: 6, sel: "role=button[name=\"Connect a number →\"]", label: "Connect a number", text: "Choose which of your numbers answers for this item." },
      ],
      arrows: [{ from: "warn", to: "connect", label: "fix it" }],
    },
    {
      id: "web-item-knowledge", app: "web", section: "AI agent", title: "Knowledge & files", route: "/app/items/12", roles: TEAM,
      summary: "Teach the agent about one product or service: photos, price lists, notes and voice notes. It answers only from what you add.",
      before: [
        { do: "fill", sel: "input[aria-label=\"Ask what a customer would ask\"]", value: "Dr. Sana kab baithti hain? Fee kitni hai?" },
        { do: "click", sel: "section[aria-label=\"Try it now\"] >> role=button[name=\"Ask\"]" },
        { do: "waitFor", sel: "text=Answered from:" },
      ],
      marks: [
        { id: "tiles", n: 1, kind: "info", sel: "button:has-text(\"things the agent knows\")", label: "At a glance", text: "How much the agent knows, which files it may send, the prices it quotes and how many numbers answer for it." },
        { id: "upload", n: 2, sel: "role=button[name=\"Upload files\"]", label: "Upload files", text: "Add photos, videos, PDFs or price lists. You can also drop several files on the green box." },
        { id: "note", n: 3, sel: "role=button[name=\"Write a note\"]", label: "Write a note", text: "Type facts the agent should know, like opening hours or delivery rules." },
        { id: "voice", n: 4, sel: "role=button[name=\"Record a voice note\"]", label: "Record a voice note", text: "Just talk. The agent learns from what you say; the recording itself is never sent to customers." },
        { id: "prices", n: 5, sel: "role=button[name=\"Edit prices\"]", label: "Prices", text: "The exact prices the agent quotes. It never makes up a figure of its own." },
        { id: "try", n: 6, sel: "section[aria-label=\"Try it now\"]", label: "Try it now", text: "Ask what a customer would ask and see the reply they would get, with the files it came from." },
        { id: "test-tab", n: 7, sel: "role=tab[name=\"Test the agent\"]", label: "Test the agent", text: "Have a longer practice chat before you go live." },
      ],
      arrows: [{ from: "upload", to: "try", label: "then check" }],
    },
    {
      id: "web-item-files", app: "web", section: "AI agent", title: "Photos & files the agent sends", route: "/app/items/12", roles: TEAM,
      summary: "Choose which photos, videos and documents the agent may send to customers when they ask.",
      before: [{ do: "scrollY", y: 860 }],
      marks: [
        { id: "media", n: 1, kind: "info", sel: "section[aria-label=\"Photos & videos\"] > h6, section[aria-label=\"Photos & videos\"] > p", all: true, label: "Photos & videos", text: "Each picture or video you uploaded, shown the way the customer will see it." },
        { id: "send", n: 2, sel: "input[aria-label=\"Send Clinic entrance.jpg to customers\"] >> xpath=ancestor::label[1]", pad: 4, label: "Send to customers", text: "Switched on: the agent may send this file when a customer asks, for example \"where is the clinic?\"" },
        { id: "off", n: 3, sel: "input[aria-label=\"Send Clinic tour.mp4 to customers\"] >> xpath=ancestor::label[1]", pad: 4, label: "Knowledge only", text: "Switched off: the agent still learns from it but never sends it." },
        { id: "doc", n: 4, sel: "input[aria-label=\"Send Fee list 2026.pdf to customers\"] >> xpath=ancestor::label[1]", pad: 4, label: "Documents", text: "A PDF price list can go to customers too. Office files and sheets are for the agent to read." },
        { id: "edit", n: 5, sel: "role=button[name=\"Edit Check-up room.jpg\"]", label: "Edit", text: "Rename a file or add a line about when to send it." },
        { id: "voice", n: 6, kind: "info", sel: "section[aria-label=\"Voice notes & audio\"]", label: "Voice notes", text: "The agent learns from what is said. Recordings are never sent to customers." },
      ],
      arrows: [{ from: "send", to: "off" }],
    },
    {
      id: "web-item-products", app: "web", section: "AI agent", title: "Shop products", route: "/app/items/11?tab=products", roles: TEAM,
      summary: "A shop's products and prices. The agent takes orders only from this list, with these prices.",
      marks: [
        { id: "tab", n: 1, sel: "role=tab[name=\"Products\"]", label: "Products tab", text: "Only a shop with many products has this tab. Each product is one row, not a separate item." },
        { id: "import", n: 2, sel: "role=button[name=\"Import from Excel / CSV\"]", label: "Import from Excel / CSV", text: "Upload your price list. Upload it again later and prices are updated in one go." },
        { id: "add", n: 3, sel: "role=button[name=\"Add product\"]", label: "Add product", text: "Add one product by hand: name, unit, price and stock." },
        { id: "price", n: 4, kind: "info", sel: "tr:has-text(\"Guard Basmati Rice\") > td:nth-child(3)", label: "Price", text: "The agent quotes exactly this price and the system works out every order total itself." },
        { id: "stock", n: 5, kind: "info", sel: "tr:has-text(\"Farm Eggs\") > td:nth-child(4)", label: "Stock", text: "Leave stock empty if you don't count it. When counted, orders take it down and cancelled orders put it back." },
        { id: "available", n: 6, sel: "input[aria-label=\"Dalda Cooking Oil available\"] >> xpath=ancestor::span[contains(@class,'MuiSwitch-root')][1]", label: "Available", text: "Switch off a product you don't have today. The agent won't offer it." },
        { id: "shopify", n: 7, sel: "role=button[name=\"Connect Shopify\"]", label: "Connect Shopify", text: "Selling on Shopify too? Bring products in from there and keep them in step." },
      ],
      arrows: [{ from: "import", to: "price", label: "then check" }],
    },
    {
      id: "web-inbox", app: "web", section: "Talk to customers", title: "Inbox", route: "/app/inbox?thread=32", roles: TEAM,
      summary: "Every WhatsApp chat in one list. The AI answers; you step in when it hands a chat to a person.",
      before: [scrollChatToEnd],
      marks: [
        { id: "filters", n: 1, sel: formControl("Assigned"), label: "Mine / Unassigned", text: "Show only the chats given to you, or the ones nobody has taken yet. Status shows AI or human chats." },
        { id: "thread", n: 2, sel: "tr.Mui-selected > td:nth-child(-n+3)", all: true, label: "A chat", text: "Click a chat to open it on the right. A green dot means there is a new message." },
        { id: "reason", n: 3, kind: "info", sel: ".MuiAlert-root:has-text(\"Why a person has this chat\")", label: "Why a person has this chat", text: "The AI stepped back here because the customer asked for a person. It stays quiet until you resume it." },
        { id: "assign", n: 4, sel: formControl("Assigned to"), label: "Assigned to", text: "Give the chat to a team member. It shows up under their Mine filter." },
        { id: "reply", n: 5, sel: "form:has(input[placeholder=\"Type a reply…\"])", label: "Reply", text: "Type your answer and press Send. It goes to the customer on WhatsApp from your business number." },
        { id: "resume", n: 6, sel: "role=button[name=\"Resume AI\"]", label: "Resume AI", text: "When you are done, hand the chat back so the AI answers again." },
        { id: "profile", n: 7, sel: "text=Customer profile", label: "Customer profile", text: "See this customer's orders, payments and notes.", go: "web-customer-profile" },
      ],
      arrows: [{ from: "thread", to: "reason" }, { from: "reply", to: "resume", label: "then" }],
    },
    {
      id: "web-orders", app: "web", section: "Sales", title: "Orders", route: "/app/orders", roles: TEAM,
      summary: "Orders the agent took on WhatsApp, waiting to be packed and delivered.",
      marks: [
        { id: "tabs", n: 1, sel: "role=tablist", label: "Order stages", text: "New orders to pack, packed orders waiting for the rider, then delivered or cancelled." },
        { id: "row", n: 2, sel: "tr:has-text(\"#1043\")", label: "An order", text: "Who ordered, the total the system worked out, and when. Click it to see every line.", go: "web-order-detail" },
        { id: "status", n: 3, kind: "info", sel: "tr:has-text(\"#1043\") >> .MuiChip-root", label: "Status", text: "Shows where the order is. \"Paid\" appears once you confirm a payment for it." },
        { id: "export", n: 4, sel: "role=button[name=\"Export CSV\"]", label: "Export CSV", text: "Download your orders as a spreadsheet." },
      ],
      arrows: [{ from: "tabs", to: "row" }],
    },
    {
      id: "web-order-detail", app: "web", section: "Sales", title: "Order details", route: "/app/orders", roles: TEAM,
      summary: "Everything in one order: what to pack, where to deliver, and the next step.",
      before: [{ do: "click", sel: "tr:has-text(\"#1043\")" }, { do: "waitFor", sel: "role=dialog" }],
      marks: [
        { id: "address", n: 1, kind: "info", sel: "role=dialog >> p:has-text(\"Deliver to:\")", label: "Deliver to", text: "The address the customer gave in the chat." },
        { id: "lines", n: 2, kind: "info", sel: "role=dialog >> table", label: "What to pack", text: "Every item with its quantity. The total is worked out from your price list, never by the AI." },
        { id: "paid", n: 3, kind: "info", sel: "role=dialog >> text=Not paid yet.", label: "Paid or not", text: "Changes to Paid when you confirm the customer's payment screenshot on the Payments page.", go: "web-payments" },
        { id: "next", n: 4, sel: "role=button[name=\"Mark packed\"]", label: "Mark packed", text: "Move the order on when it is packed. Next comes Mark delivered." },
        { id: "chat", n: 5, sel: "role=link[name=\"Open chat\"]", label: "Open chat", text: "Open this customer's WhatsApp chat, for example to ask about a missing item.", go: "web-inbox" },
        { id: "cancel", n: 6, sel: "role=button[name=\"Cancel order\"]", label: "Cancel order", text: "Cancels it and puts counted stock back." },
      ],
      arrows: [{ from: "lines", to: "next", label: "packed?" }],
    },
    {
      id: "web-payments", app: "web", section: "Sales", title: "Payments", route: "/app/payments", roles: TEAM,
      summary: "Payment screenshots customers sent. The AI reads them; you check each one against your bank and confirm it.",
      marks: [
        { id: "image", n: 1, kind: "info", sel: "img[alt=\"Payment proof\"] >> nth=0", label: "The screenshot", text: "The picture the customer sent on WhatsApp. Click to check it against your bank or wallet app." },
        { id: "read", n: 2, kind: "info", sel: "tr:has-text(\"JC-88123904\") >> td >> nth=1", label: "What the AI read", text: "Amount and reference read from the picture. Confidence shows how sure it is (1.00 = very sure)." },
        { id: "confirm", n: 3, sel: "role=button[name=\"Confirm proof 72\"]", label: "Confirm", text: "Only after you see the money arrive. You can link it to an order so the order shows as paid." },
        { id: "reject", n: 4, sel: "role=button[name=\"Reject proof 72\"]", label: "Reject", text: "If it is wrong or old. Write why, so your team knows." },
        { id: "rejected", n: 5, kind: "info", sel: "tr:has-text(\"Rejected\")", label: "Rejected", text: "Kept with the reason, so it is never counted as money in." },
      ],
      arrows: [{ from: "read", to: "confirm", label: "matches?" }, { from: "read", to: "reject", label: "wrong?" }],
    },
    {
      id: "web-customers", app: "web", section: "Customers", title: "Customers", route: "/app/customers", roles: TEAM,
      summary: "Everyone who has messaged you, sorted into leads, customers, repeat buyers and those gone quiet.",
      marks: [
        { id: "stages", n: 1, sel: "role=tablist", label: "Stages", text: "Worked out for you: Lead has not bought yet, Customer bought once, Repeat bought twice or more, Gone quiet nothing for 60 days." },
        { id: "filters", n: 2, sel: formControl("Tag"), label: "Filters", text: "Narrow the list by tag, who looks after them, city, or how long they have been quiet." },
        { id: "views", n: 3, sel: "role=button[name=\"Save this view\"]", label: "Save this view", text: "Keep a filter you use often, like \"VIPs gone quiet\", as a one-click chip." },
        { id: "row", n: 4, sel: "tr:has-text(\"Sadia Malik\")", label: "A customer", text: "What they paid, their tags, who looks after them and the next follow-up. Click to open the profile.", go: "web-customer-profile" },
        { id: "followup", n: 5, kind: "info", sel: "tr:has-text(\"Tariq Javed\") >> td >> nth=-1", label: "Next follow-up", text: "A reminder someone set. It turns red when it is late." },
        { id: "add", n: 6, sel: "role=button[name=\"Add customer\"]", label: "Add customer", text: "Add someone by hand, for example a walk-in customer." },
      ],
      arrows: [{ from: "stages", to: "row" }],
    },
    {
      id: "web-customer-profile", app: "web", section: "Customers", title: "Customer profile", route: "/app/customers/201", roles: TEAM,
      summary: "One customer on one page: what they bought and paid, notes, follow-ups and every chat.",
      marks: [
        { id: "stats", n: 1, kind: "info", sel: ".MuiPaper-root:has(> p:text-is(\"Paid\"))", label: "Paid", text: "Only payments you confirmed. Open deals are shown apart and never added to this." },
        { id: "chat", n: 2, sel: "role=link[name=\"Open chat\"]", label: "Open chat", text: "Jump to this customer's WhatsApp chat in the Inbox.", go: "web-inbox" },
        { id: "details", n: 3, sel: formControl("Looked after by"), label: "Looked after by", text: "The team member responsible for this customer. Edit any detail and press Save." },
        { id: "ai", n: 4, kind: "info", sel: ".MuiPaper-root:has-text(\"What the AI noted\") >> nth=-1", label: "What the AI noted", text: "A short summary of the chats and a suggested next step, written by the AI." },
        { id: "followup", n: 5, sel: formControl("What needs doing"), label: "Add a follow-up", text: "Set a reminder for yourself or a teammate. They get a phone notification when it is due." },
        { id: "note", n: 6, sel: "role=button[name=\"Call\"]", label: "Note, call or visit", text: "Write what happened so the whole team knows. It is added to the history below." },
      ],
      arrows: [{ from: "ai", to: "followup", label: "act on it" }],
    },
    {
      id: "web-deals", app: "web", section: "Sales", title: "Deals", route: "/app/deals", roles: TEAM,
      summary: "Every enquiry the agent has opened, grouped by stage, with the money quoted at each stage.",
      marks: [
        { id: "new", n: 1, sel: "role=button[name=\"New deal\"]", label: "New deal", text: "Open a deal yourself, for example after a phone call or a walk-in. It starts at Enquiry." },
        { id: "filters", n: 2, sel: formControl("Item"), label: "Filter", text: "Show one product or service only, or one stage." },
        { id: "stage", n: 3, kind: "info", sel: "td:has(p:text-is(\"Quoted (3)\"))", label: "A stage", text: "Enquiry, Quoted, Invoiced, Paid and Lost. The chips show the PKR total of that stage, so you can see what is still open." },
        { id: "row", n: 4, sel: "tr:has-text(\"Tariq Javed\")", label: "A deal", text: "Who, for what, how much and how it started: \"ai\" means the agent opened it from a chat. Click it to open the deal, change its stage or add the quoted amount." },
        { id: "dismiss", n: 5, sel: "role=button[name=\"Dismiss deal 301\"]", label: "Dismiss", text: "Remove an enquiry that is not real, like a wrong number. It leaves the pipeline for good." },
      ],
      arrows: [{ from: "new", to: "stage", label: "starts at" }, { from: "stage", to: "row" }],
    },
    {
      id: "web-lead-ads", app: "web", section: "Sales", title: "Lead ads", route: "/app/lead-ads", roles: TEAM,
      summary: "Facebook and Instagram lead forms land in Customers within seconds, with a reminder for someone to call.",
      marks: [
        { id: "connect", n: 1, sel: "role=button[name=\"Connect a Facebook Page\"]", label: "Connect a Facebook Page", text: "Log in with Facebook and choose the Page your ads run from. Only an admin can do this. Instagram ads come through the same Page." },
        { id: "status", n: 2, kind: "info", sel: ".MuiChip-root:has-text(\"Receiving leads\")", label: "Receiving leads", text: "The Page is connected and Meta is sending us its leads. \"Waiting for Meta\" means it is not confirmed yet." },
        { id: "deal", n: 3, sel: formControl("Open a deal for"), label: "Open a deal for", text: "Pick the product or service this ad sells, and every new lead also opens a deal for it in Deals.", go: "web-deals" },
        { id: "who", n: 4, sel: formControl("Who calls them"), label: "Who calls them", text: "The team member who gets the follow-up to call each new lead. The owner if you leave it empty." },
        { id: "switch", n: 5, sel: "input[aria-label=\"Receive leads from this Page\"] >> xpath=..", label: "Receive leads", text: "Switch it off to stop bringing in leads from this Page. Nothing already received is removed." },
        { id: "leads", n: 6, kind: "info", sel: "role=link[name=\"Nadia Hussain\"]", label: "Latest leads", text: "Each lead with the form and ad it came from. Click the name to open the new customer.", go: "web-customer-profile" },
      ],
      arrows: [{ from: "connect", to: "deal", label: "then" }, { from: "deal", to: "leads" }],
    },
    {
      id: "web-customer-fields", app: "web", section: "Customers", title: "Customer fields", route: "/app/settings/customer-fields", roles: OWNER,
      summary: "The extra details your business keeps about each customer, such as family size or delivery slot.",
      fixtures: [{ path: "crm/fields", reply: () => owner.ok([
        { id: 1, key: "family_size", label: "Family size", kind: "number", options: [], position: 1, is_active: true },
        { id: 2, key: "area", label: "Area", kind: "choice", options: ["Johar Town", "Wapda Town", "Township", "DHA"], position: 2, is_active: true },
        { id: 3, key: "pays_by", label: "Usually pays by", kind: "choice", options: ["Cash", "Bank transfer", "JazzCash", "Easypaisa"], position: 3, is_active: true },
        { id: 4, key: "delivery_after", label: "Deliver after", kind: "text", options: [], position: 4, is_active: true },
        { id: 5, key: "birthday", label: "Birthday", kind: "date", options: [], position: 5, is_active: true },
      ]) }],
      marks: [
        { id: "ai", n: 1, sel: "label:has-text(\"Let the AI keep customer notes\")", label: "AI keeps notes", text: "After a chat goes quiet the AI writes a short note and fills empty fields from what the customer said. It never overwrites your team's own entries." },
        { id: "row", n: 2, sel: formControl("Type"), nth: 1, label: "Type", text: "Text, number, date, yes/no or pick-one. For pick-one, type the choices with commas." },
        { id: "order", n: 3, sel: "role=button[name=\"Move up\"]", nth: 1, label: "Move up / remove", text: "Change the order the fields appear in. Removing a field hides it, and what was already written is kept." },
        { id: "add", n: 4, sel: "role=button[name=\"Add a field\"]", label: "Add a field", text: "Create your own detail. It shows on every customer page and can be searched and exported." },
        { id: "suggested", n: 5, sel: "role=button[name=\"Add the ones suggested for my trade\"]", label: "Suggested fields", text: "A ready-made set for your kind of business, so you do not start from nothing." },
        { id: "save", n: 6, sel: "role=button[name=\"Save\"]", label: "Save", text: "Nothing changes until you press Save." },
      ],
      arrows: [{ from: "add", to: "save", label: "then" }],
    },
    {
      id: "web-khata", app: "web", section: "Customers", title: "Khata", route: "/app/khata", roles: TEAM,
      summary: "Who owes the shop money on credit (udhaar), biggest balance first.",
      marks: [
        { id: "total", n: 1, kind: "info", sel: ".MuiPaper-root:has(> p:text-is(\"Owed to you\"))", label: "Owed to you", text: "Everything customers owe you right now. Totals are kept per currency and never added across currencies." },
        { id: "search", n: 2, sel: formControl("Search"), label: "Search", text: "Find a customer by name or number." },
        { id: "row", n: 3, sel: "tr:has-text(\"Sadia Malik\")", label: "A customer", text: "What they owe, since when and when they last paid. Click to open their page and write udhaar, record a payment or send a reminder on WhatsApp.", go: "web-customer-profile" },
        { id: "limit", n: 4, kind: "warn", sel: ".MuiChip-root:has-text(\"Over limit\")", label: "Over limit", text: "This customer owes more than the credit limit you set for them." },
        { id: "never", n: 5, kind: "info", sel: "tr:has-text(\"Rabia Anwar\") >> td >> nth=3", label: "Last payment", text: "\"Never\" means they have not paid anything since they started owing." },
      ],
      arrows: [{ from: "total", to: "row" }],
    },
    {
      id: "web-approvals", app: "web", section: "Sales", title: "Approvals", route: "/app/approvals", roles: OWNER,
      summary: "Requests from your team that need your yes, such as cancelling an order or giving a refund.",
      marks: [
        { id: "tabs", n: 1, sel: ".MuiToggleButtonGroup-root", label: "Waiting / All", text: "Waiting shows what needs you now. All also shows ones already decided, and by whom." },
        { id: "card", n: 2, kind: "info", sel: ".MuiPaper-root:has-text(\"Cancel order #1041\") >> nth=-1", label: "A request", text: "What your team member wants to do, why, who asked and when." },
        { id: "note", n: 3, sel: "input[placeholder=\"Note (optional)\"]", label: "Note", text: "Add a word for the team member, for example why you refused." },
        { id: "approve", n: 4, sel: "role=button[name=\"Approve\"]", label: "Approve", text: "Approving does it straight away, for example the order is cancelled and its stock comes back." },
        { id: "refuse", n: 5, sel: "role=button[name=\"Refuse\"]", label: "Refuse", text: "Nothing happens and the team member sees your note." },
      ],
      arrows: [{ from: "card", to: "approve" }, { from: "card", to: "refuse" }],
    },
    {
      id: "web-followups", app: "web", section: "Customers", title: "Follow-ups", route: "/app/followups", roles: TEAM,
      summary: "Calls, visits and replies you promised to customers, for you or the whole team.",
      marks: [
        { id: "who", n: 1, sel: ".MuiToggleButtonGroup-root", label: "Mine / Whole team", text: "Your own list, or everyone's, to see what the team still owes customers." },
        { id: "tabs", n: 2, sel: "role=tablist", label: "Late, Today, Coming up", text: "Late ones are in red. You get a phone reminder when one is due." },
        { id: "row", n: 3, sel: "div:has(> div > p:text-is(\"Call about wedding quote\"))", nth: -1, label: "A follow-up", text: "What to do and for which customer. Click the name to open their page.", go: "web-customer-profile" },
        { id: "later", n: 4, sel: "role=button[name=\"Tomorrow\"]", nth: 1, label: "Tomorrow / Next week", text: "Not today? Push it to tomorrow or next week." },
        { id: "done", n: 5, sel: "role=button[name=\"Done\"]", nth: 1, label: "Done", text: "Tick it off when you have done it." },
      ],
      arrows: [{ from: "row", to: "done" }],
    },
    {
      id: "web-channels", app: "web", section: "AI agent", title: "WhatsApp numbers", route: "/app/channels", roles: TEAM,
      summary: "The numbers your agent answers on, which product each one answers for, and how healthy each number is.",
      marks: [
        { id: "request", n: 1, sel: "role=button[name=\"Request a number\"]", label: "Request a number", text: "Ask for a new official WhatsApp number. We get it approved and tell you when it is live." },
        { id: "item", n: 2, kind: "info", sel: "tr:has-text(\"Al-Noor Store\") >> td >> nth=2", label: "Answers for", text: "The products or services this number answers about. Change it from the item's Persona & numbers tab.", go: "web-items" },
        { id: "health", n: 3, kind: "warn", sel: ".MuiChip-root:has-text(\"Needs attention\")", label: "Needs attention", text: "Meta is unhappy with this number, for example customers blocked it. Click to see what to do." },
        { id: "pending", n: 4, kind: "info", sel: ".MuiChip-root:has-text(\"Pending approval\")", label: "Pending approval", text: "A number you asked for. We are setting it up; you can withdraw the request." },
        { id: "rename", n: 5, sel: "role=button[name=\"Rename Al-Noor Store\"]", label: "Rename", text: "Give the number a name your team understands, like \"Clinic line\"." },
        { id: "telegram", n: 6, sel: "role=button[name=\"Connect Telegram\"]", label: "Connect Telegram", text: "Answer customers on Telegram too, with the same agent." },
      ],
      arrows: [{ from: "request", to: "pending", label: "becomes" }],
    },
    {
      id: "web-requests", app: "web", section: "Sales", title: "Requests", route: "/app/requests", roles: TEAM,
      summary: "Quotes to price, complaints and enquiries the agent collected on WhatsApp. Moving one forward tells the customer.",
      marks: [
        { id: "kinds", n: 1, sel: "role=tablist", label: "Kinds of request", text: "Quotes, jobs, complaints and enquiries. The orange number is how many are waiting for you." },
        { id: "open", n: 2, sel: ".MuiFormControl-root:has(label:has-text(\"Search\")), label:has-text(\"Open only\")", all: true, label: "Search and Open only", text: "Find a request by number or customer. Switch off Open only to see finished ones too." },
        { id: "row", n: 3, sel: "tr:has-text(\"Q-0019\")", label: "A quote to price", text: "The agent collected what the customer wants. Click it, enter your price, and the customer gets it on WhatsApp." },
        { id: "stage", n: 4, kind: "info", sel: "tr:has-text(\"Q-0018\") >> .MuiChip-root", label: "Price sent", text: "The customer has your price. When they say yes or no on WhatsApp, the stage changes by itself." },
        { id: "new", n: 5, sel: "role=button[name=\"New\"]", label: "New", text: "Open a request yourself, for example after a phone call." },
      ],
      arrows: [{ from: "row", to: "stage", label: "then" }],
    },
    {
      id: "web-appointments", app: "web", section: "Sales", title: "Appointments", route: "/app/appointments", roles: TEAM,
      summary: "Visits the agent booked this week, by doctor. Book by hand for walk-ins and phone calls.",
      marks: [
        { id: "week", n: 1, sel: "button[aria-label=\"Previous week\"], button[aria-label=\"Next week\"], button:has-text(\"This week\")", all: true, label: "Week", text: "Move between weeks. \"This week\" brings you back to today." },
        { id: "who", n: 2, sel: formControl("Who"), label: "Who", text: "Show one doctor's bookings only." },
        { id: "booking", n: 3, kind: "info", sel: "text=Kamran Butt · Al-Noor Family Clinic · Dr. Ahmed Raza >> xpath=ancestor::div[contains(@class,'MuiStack-root')][1]", label: "A booking", text: "Time, customer, service and doctor. Notes from the chat appear under the number." },
        { id: "status", n: 4, sel: "text=Confirmed", label: "Status", text: "Click it to mark a visit confirmed, done or a no-show." },
        { id: "book", n: 5, sel: "role=button[name=\"Book by hand\"]", label: "Book by hand", text: "Add a booking for a walk-in or a phone call. Only free times are offered." },
      ],
      arrows: [{ from: "booking", to: "status" }],
    },
    {
      id: "web-broadcasts", app: "web", section: "Marketing", title: "Broadcasts", route: "/app/broadcasts", roles: TEAM,
      summary: "Send an approved offer to customers who agreed to receive offers, and see who read it and replied.",
      marks: [
        { id: "new", n: 1, sel: "role=button[name=\"New broadcast\"]", label: "New broadcast", text: "Choose an approved message, pick tags for the audience and send now or later." },
        { id: "allowance", n: 2, kind: "info", sel: ".MuiPaper-root:has-text(\"Broadcast messages this month\") >> nth=-1", label: "This month's allowance", text: "Offer messages your plan includes. Meta also charges your own WhatsApp account per message." },
        { id: "scheduled", n: 3, kind: "info", sel: "text=/Scheduled for/", label: "Scheduled", text: "Goes out by itself at that time. Cancel it any time before." },
        { id: "results", n: 4, kind: "info", sel: "tr:has-text(\"Ration pack for December\") >> td >> nth=1", label: "Results", text: "How many got it, read it and replied. Replies go to the Inbox and the AI knows which offer they mean." },
      ],
      arrows: [{ from: "new", to: "scheduled", label: "send later" }],
    },
    {
      id: "web-team", app: "web", section: "Settings", title: "Team", route: "/app/team", roles: OWNER,
      summary: "Add your staff, choose what each person can do, and decide who gets which chats.",
      marks: [
        { id: "add", n: 1, sel: "role=button[name=\"Add team member\"]", label: "Add team member", text: "Makes an invite link. Send it to your staff on WhatsApp; they choose their own password." },
        { id: "seats", n: 2, kind: "info", sel: ".MuiPaper-root:has-text(\"4 of 10 used\") >> nth=-1", label: "Seats", text: "How many logins your plan allows. A pending invite uses a seat." },
        { id: "role", n: 3, kind: "info", sel: "text=Rider", label: "What they do", text: "A rider sees only deliveries, a sales person sees everything except billing and team." },
        { id: "invite", n: 4, kind: "info", sel: "text=Invite sent", label: "Invite sent", text: "Waiting for them to open the link. Use the menu to send it again or cancel it." },
        { id: "menu", n: 5, sel: "role=button[name=\"Actions for Ayesha Khan\"]", label: "Actions", text: "Change someone's role, or disable their login straight away." },
        { id: "rules", n: 6, sel: "role=button[name=\"Add rule\"]", label: "Who gets which chats", text: "Hand chats to people automatically by number or product. People in a rule take turns." },
      ],
      arrows: [{ from: "add", to: "invite", label: "becomes" }],
    },
    {
      id: "web-billing", app: "web", section: "Settings", title: "Plan & billing", route: "/app/billing", roles: OWNER,
      summary: "Your plan, when it renews, what the AI used this month and every payment you made.",
      marks: [
        { id: "status", n: 1, kind: "info", sel: ".MuiPaper-root:has-text(\"Subscription\") >> nth=-1", label: "Subscription", text: "Active until the renewal date. If it ends, the AI pauses but your Inbox keeps working." },
        { id: "usage", n: 2, kind: "info", sel: ".MuiPaper-root:has(h6:text-is(\"AI usage this month\")) >> nth=-1", label: "AI usage", text: "Included in your plan and shown for openness. It is not a separate charge." },
        { id: "history", n: 3, sel: "h6:text-is(\"Payment history\") >> xpath=..", label: "Payment history", text: "Every payment with its reference. Search or filter by date." },
      ],
      arrows: [],
    },

    // ── SuperAdmin ──────────────────────────────────────────────────────────
    {
      id: "admin-home", app: "admin", section: "Clients", title: "Admin home", route: "/admin", as: "admin", roles: ["superadmin"],
      summary: "The whole platform today: businesses, revenue, payments to confirm and who needs help.",
      marks: [
        { id: "kpis", n: 1, kind: "info", sel: "a:has-text(\"Paying tenants\")", label: "Paying tenants", text: "Businesses paying now, how many in total and how many joined this week." },
        { id: "needs", n: 2, sel: ".MuiPaper-root:has(h6:text-is(\"Needs you\")) >> nth=-1", label: "Needs you", text: "Bank transfers to confirm, number requests and leads to call. Work through it every morning." },
        { id: "transfer", n: 3, sel: "role=link[name=\"Green Valley Pharmacy\"]", label: "A transfer to confirm", text: "Open the business to check the transfer and switch their plan on.", go: "admin-tenant-detail" },
        { id: "tenants", n: 4, kind: "info", sel: ".MuiPaper-root:has(h6:text-is(\"Tenants\")) >> nth=-1", label: "Tenants by status", text: "Paying, on trial, trial ended and waiting to pay." },
        { id: "attention", n: 5, kind: "warn", sel: ".MuiPaper-root:has(h6:text-is(\"Attention\")) >> nth=-1", label: "Attention", text: "Numbers Meta is unhappy with and businesses close to their AI limit." },
      ],
      arrows: [{ from: "needs", to: "transfer" }],
    },
    {
      id: "admin-tenants", app: "admin", section: "Clients", title: "Tenants", route: "/admin/tenants", as: "admin", roles: ["superadmin"],
      summary: "Every business on AgentCraftr with its plan, setup progress and what needs attention.",
      marks: [
        { id: "add", n: 1, sel: "role=button[name=\"Add tenant\"]", label: "Add tenant", text: "Create a business for a client. The owner gets a link to choose their own password." },
        { id: "filters", n: 2, sel: "text=Needs attention only", label: "Needs attention only", text: "Show only businesses with a problem: trial ending, no number, payment waiting." },
        { id: "setup", n: 3, kind: "info", sel: "tr:has-text(\"Shifa Dental Care\") >> td >> nth=3", label: "Setup", text: "How many of the seven setup steps the business has done." },
        { id: "needs", n: 4, kind: "warn", sel: "tr:has-text(\"Shifa Dental Care\") >> td >> nth=6", label: "Needs", text: "What needs us, in plain words. \"All good\" means nothing to do." },
        { id: "row", n: 5, sel: "tr:has-text(\"Al-Noor Kiryana Store\") >> td >> nth=0", label: "Open a business", text: "Click the name to see everything about it.", go: "admin-tenant-detail" },
      ],
      arrows: [{ from: "filters", to: "needs" }],
    },
    {
      id: "admin-tenant-detail", app: "admin", section: "Clients", title: "Tenant detail", route: "/admin/tenants/501", as: "admin", roles: ["superadmin"],
      summary: "One business: onboarding progress, Meta verification, partner, plan, numbers and payments.",
      marks: [
        { id: "view", n: 1, sel: "role=button[name=\"View as owner (read-only)\"]", label: "View as owner", text: "Open their dashboard read-only for one hour to see what they see. You cannot change anything." },
        { id: "onboarding", n: 2, kind: "info", sel: ".MuiPaper-root:has(h6:text-is(\"Onboarding\")) >> nth=-1", label: "Onboarding", text: "Every step from account to Meta-verified, and whose move it is: us, the client or Meta." },
        { id: "verification", n: 3, kind: "info", sel: ".MuiPaper-root:has-text(\"Meta business verification\") >> nth=-1", label: "Meta business verification", text: "Where their verification stands. Verified numbers can message more customers a day." },
        { id: "partner", n: 4, sel: formControl("Partner"), label: "Partner", text: "The city partner looking after this business. Change it and press Save." },
      ],
      arrows: [{ from: "onboarding", to: "verification" }],
    },

    // ── Partner ─────────────────────────────────────────────────────────────
    {
      id: "partner-home", app: "partner", section: "Partner", title: "Partner home", route: "/partner", as: "partner", roles: ["partner"],
      summary: "What you earned, the businesses you brought in, and which ones need you today.",
      marks: [
        { id: "earned", n: 1, kind: "info", sel: ".MuiPaper-root:has-text(\"Earned this month\") >> nth=-1", label: "Earned this month", text: "Your share of what your businesses paid this month." },
        { id: "owed", n: 2, kind: "info", sel: ".MuiPaper-root:has-text(\"Waiting to be paid to you\") >> nth=-1", label: "Waiting to be paid", text: "Earned but not paid out yet. AgentCraftr pays partners monthly." },
        { id: "needs", n: 3, sel: ".MuiPaper-root:has(h6:text-is(\"Needs you\")) >> nth=-1", label: "Needs you", text: "Trials ending, trials that ended and setups that are stuck. Help these first." },
        { id: "whatsapp", n: 4, sel: "role=link[name=\"WhatsApp owner\"] >> nth=0", label: "WhatsApp owner", text: "Opens a WhatsApp chat with the owner so you can help straight away." },
        { id: "deal", n: 5, kind: "info", sel: ".MuiPaper-root:has(h6:text-is(\"Your deal\")) >> nth=-1", label: "Your deal", text: "Your share, the bonus on a first payment and the discount you may give." },
      ],
      arrows: [{ from: "needs", to: "whatsapp", label: "act" }],
    },
    {
      id: "partner-businesses", app: "partner", section: "Partner", title: "My businesses", route: "/partner/businesses", as: "partner", roles: ["partner"],
      summary: "Every business you brought in: its plan, how far its setup is, and what you can do to help.",
      marks: [
        { id: "add", n: 1, sel: "role=link[name=\"Add business\"]", label: "Add business", text: "Sign up a new business in your cities. The owner gets a link on WhatsApp." },
        { id: "status", n: 2, kind: "info", sel: "tr:has-text(\"Lahore Home Bakers\") >> .MuiChip-root", label: "Status", text: "Trial with days left, paying, or trial ended. You see status and setup only, never their chats or customers." },
        { id: "setup", n: 3, kind: "info", sel: "tr:has-text(\"Lahore Home Bakers\") >> td >> nth=3", label: "Setup", text: "Steps done out of seven. Low numbers mean the owner needs a hand." },
        { id: "access", n: 4, sel: "role=button[name=\"Ask owner for access\"] >> nth=0", label: "Ask owner for access", text: "Ask permission to set things up for them. The owner allows it for 7 days and sees every change." },
        { id: "more", n: 5, sel: "role=button[name=\"More for Fresh Fruit Corner\"]", label: "More", text: "Extend a trial or give a first-month discount, within your limits." },
      ],
      arrows: [{ from: "setup", to: "access", label: "stuck?" }],
    },
  ],
};
