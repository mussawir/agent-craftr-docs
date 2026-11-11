// API answers for the business owner's dashboard (/app/...).
const D = require("./data");
const { ago, hours, days, at, ymd } = D;

const ok = (data) => ({ success: true, data });

const CAPS = ["orders", "prices", "bookings", "payments", "deals", "broadcasts", "quotes", "tickets", "questions"];
const FEATURE_LABEL = {
  orders: "Shop & orders", prices: "Price lists", bookings: "Bookings", payments: "Payments", deals: "Leads & deals",
  broadcasts: "Marketing", quotes: "Quotes", tickets: "Complaints", questions: "Enquiries", khata: "Credit / khata",
  tracking: "Job tracking", rentals: "Date bookings", field_reports: "Field reports",
};
const capabilities = () => ({
  on: CAPS, follows_trade: false,
  features: Object.keys(FEATURE_LABEL).map((k) => ({
    key: k, label: FEATURE_LABEL[k], description: "", on: CAPS.includes(k), in_trade: CAPS.includes(k),
    locked_reason: k === "orders" ? "Your shop has products." : null,
  })),
});

// ── Knowledge base ───────────────────────────────────────────────────────────
const MEDIA = "http://mock.api/uploads/kb/";
const kb = (id, file_name, file_type, o = {}) => ({
  id, file_name, file_type, status: "ready", error: null, description: null, text: null, created_at: days(30 - id % 20),
  send_to_customers: ["image", "video", "pdf"].includes(file_type), send_kind: null, sendable: true, send_problem: null,
  media_url: null, ...o,
});
const KB = {
  12: [
    kb(1201, "Clinic entrance.jpg", "image", { send_kind: "image", media_url: MEDIA + "clinic-front.svg", description: "Send when someone asks where we are." }),
    kb(1202, "Check-up room.jpg", "image", { send_kind: "image", media_url: MEDIA + "clinic-room.svg" }),
    kb(1203, "Clinic tour.mp4", "video", { send_kind: "video", media_url: MEDIA + "clinic-tour.svg", send_to_customers: false }),
    kb(1204, "Fee list 2026.pdf", "pdf", { send_kind: "document", description: "Check-up, BP, sugar and ECG fees." }),
    kb(1205, "Doctors and timings.docx", "docx", { send_to_customers: false, send_kind: "document" }),
    kb(1206, "Dr Sana voice note.m4a", "audio", { send_to_customers: false, description: "Dr. Sana explains fasting before a sugar test." }),
    kb(1207, "Opening hours", "text", { text: "Mon to Sat, 5 pm to 10 pm. Sunday closed. Walk-ins welcome until 9:30 pm.", send_to_customers: false }),
    kb(1208, "Google Maps location", "url", { text: "https://maps.example.com/al-noor-clinic", send_to_customers: false }),
  ],
  11: [
    kb(1101, "Basmati rice.jpg", "image", { send_kind: "image", media_url: MEDIA + "rice.svg" }),
    kb(1102, "Cooking oil.jpg", "image", { send_kind: "image", media_url: MEDIA + "oil.svg" }),
    kb(1103, "Chakki atta.jpg", "image", { send_kind: "image", media_url: MEDIA + "atta.svg" }),
    kb(1104, "November price list.xlsx", "xlsx", { send_to_customers: false, send_kind: "document" }),
    kb(1105, "Delivery areas.pdf", "pdf", { send_kind: "document" }),
    kb(1106, "Delivery rules", "text", { text: "Free delivery above PKR 2,000. Below that PKR 150. Johar Town, Wapda Town and Township only.", send_to_customers: false }),
  ],
};
const PRICES = {
  12: [
    { id: 1, name: "GP check-up", amount: "1500.00", currency: "PKR", per: "visit", note: null },
    { id: 2, name: "Blood sugar test", amount: "300.00", currency: "PKR", per: "test", note: "Fasting test before 10 am" },
    { id: 3, name: "BP check", amount: "200.00", currency: "PKR", per: "visit", note: null },
    { id: 4, name: "ECG", amount: "1200.00", currency: "PKR", per: "test", note: null },
    { id: 5, name: "Home visit", amount: "3500.00", currency: "PKR", per: "visit", note: "Johar Town only" },
  ],
  13: [
    { id: 6, name: "Delivery for bulk orders", amount: "0.00", currency: "PKR", per: "order", note: "Free in Lahore" },
  ],
};
const PRODUCTS = [
  ["Guard Basmati Rice", "GRD-5", "5 kg", "2150.00", "48"], ["Dalda Cooking Oil", "DLD-5L", "5 L", "3050.00", "22"],
  ["Sunridge Chakki Atta", "SUN-10", "10 kg", "1580.00", "35"], ["Farm Eggs", "EGG-12", "dozen", "320.00", null],
  ["Nestle Milkpak", "NMP-1L", "1 L", "300.00", "120"], ["Tapal Danedar Tea", "TAP-900", "900 g", "1460.00", "18"],
  ["Shan Biryani Masala", "SHN-BR", "pack", "140.00", "64"], ["Surf Excel", "SRF-2", "2 kg", "990.00", "0"],
  ["Mitchell's Jam", "MIT-450", "450 g", "415.00", "12"], ["Olpers Milk", "OLP-15", "1.5 L", "580.00", "40"],
].map(([name, sku, unit, price, stock], i) => ({
  id: i + 1, item_id: 11, name, sku, aliases: null, unit, price, currency: "PKR", stock_qty: stock, is_available: stock !== "0",
}));

// ── Bookings ────────────────────────────────────────────────────────────────
const DOCTORS = [
  { id: 51, item_id: 12, name: "Dr. Sana Iqbal", role: "General physician", hours: null, slot_minutes: null, capacity: 1, is_active: true, sort_order: 1 },
  { id: 52, item_id: 12, name: "Dr. Ahmed Raza", role: "Diabetes & BP", hours: null, slot_minutes: null, capacity: 1, is_active: true, sort_order: 2 },
];
function appointments() {
  const rows = [
    [-2, "17:30", 51, 203, "completed"], [-2, "18:00", 52, 211, "completed"], [-1, "19:00", 51, 209, "no_show"],
    [0, "17:00", 51, 207, "completed"], [0, "17:30", 52, 204, "confirmed"], [0, "18:30", 51, 210, "booked"],
    [0, "19:30", 52, 201, "booked"], [1, "18:30", 51, 203, "booked"], [1, "20:00", 52, 205, "booked"],
    [2, "17:00", 51, 212, "booked"], [3, "18:00", 52, 208, "cancelled"], [3, "19:00", 51, 206, "booked"],
  ];
  return rows.map(([d, hm, staff, cid, status], i) => {
    const start = at(d, hm);
    const end = new Date(new Date(start).getTime() + 30 * 60000).toISOString();
    const c = D.CUSTOMER_BY_ID[cid];
    return {
      id: 600 + i, item_id: 12, item: "Al-Noor Family Clinic", staff_id: staff,
      staff: DOCTORS.find((x) => x.id === staff).name, contact_id: cid, conversation_id: null, start_at: start, end_at: end,
      when: start, status, customer_name: c.name, phone: D.phoneOf(cid), notes: i === 4 ? "Sugar test, fasting" : null,
      source: i % 3 === 0 ? "manual" : "ai", reminder_sent_at: d < 0 ? at(d, "16:00") : null, reminder_note: null, created_at: days(3),
    };
  });
}
const bookingSettings = (itemId) => ({
  item_id: itemId, enabled: itemId === 12, slot_minutes: 30, capacity: 1, days_ahead: 14, min_notice_minutes: 60,
  hours: { mon: [["17:00", "22:00"]], tue: [["17:00", "22:00"]], wed: [["17:00", "22:00"]], thu: [["17:00", "22:00"]],
           fri: [["17:00", "22:00"]], sat: [["17:00", "22:00"]], sun: [] },
  reminder_hours: 1, reminder_template_id: null, staff_label: "Doctor",
});

// ── Requests ────────────────────────────────────────────────────────────────
const REQUESTS = [
  { id: 19, number: "Q-0019", kind: "quote", status: "new", cid: 208, summary: "Wedding: 40 kg basmati, 20 L oil, 15 kg mithai for 28 Nov, DHA Phase 5", item_id: 13, mins: 95, amount: null },
  { id: 18, number: "Q-0018", kind: "quote", status: "priced", cid: 204, summary: "Office pantry: tea, sugar and biscuits every month", item_id: 13, mins: 60 * 26, amount: "24000.00" },
  { id: 17, number: "Q-0017", kind: "quote", status: "new", cid: 211, summary: "Milad dawat for 150 people: rice, oil and drinks", item_id: 13, mins: 60 * 30, amount: null },
  { id: 15, number: "Q-0015", kind: "quote", status: "priced", cid: 209, summary: "School canteen weekly supply: juices and snacks", item_id: 13, mins: 60 * 72, amount: "38500.00" },
  { id: 21, number: "T-0004", kind: "ticket", status: "open", cid: 202, summary: "Order #1037 arrived 2 hours late", item_id: 11, mins: 30, amount: null },
  { id: 22, number: "T-0003", kind: "ticket", status: "in_progress", cid: 206, summary: "Two eggs broken in last delivery", item_id: 11, mins: 60 * 48, amount: null },
  { id: 23, number: "E-0011", kind: "enquiry", status: "new", cid: 205, summary: "Asks if we stock gluten-free atta", item_id: 11, mins: 60 * 3, amount: null },
];
const STAGES = { quote: ["new", "priced", "accepted", "declined"], ticket: ["open", "in_progress", "resolved", "closed"],
                 enquiry: ["new", "contacted", "won", "lost"], job: ["received", "in_progress", "ready", "delivered"] };
const SLABEL = { new: "Received", priced: "Price sent", open: "Open", in_progress: "In progress", contacted: "Contacted" };
function requestRow(r) {
  const c = D.CUSTOMER_BY_ID[r.cid];
  return {
    id: r.id, number: r.number, kind: r.kind, status: r.status, status_label: SLABEL[r.status] || r.status, stages: STAGES[r.kind],
    item_id: r.item_id, item: D.ITEMS.find((i) => i.id === r.item_id).name, contact_id: r.cid, conversation_id: r.id === 19 ? 38 : null,
    customer_name: c.name, phone: D.phoneOf(r.cid), summary: r.summary, details: r.id === 19 ? { Date: "28 November", Area: "DHA Phase 5", Guests: "300" } : {},
    amount: r.amount, currency: "PKR", due_at: null, note_to_customer: null, internal_note: null, source: "ai",
    history: [{ at: ago(r.mins), status: r.status, by: "AI agent" }], notify_note: null, created_at: ago(r.mins), updated_at: ago(r.mins),
  };
}

// ── Marketing ───────────────────────────────────────────────────────────────
const TAGS = [
  { id: 1, name: "VIP", contacts: 38, opted_in: 31 }, { id: 2, name: "Johar Town", contacts: 214, opted_in: 162 },
  { id: 3, name: "Clinic", contacts: 76, opted_in: 40 }, { id: 4, name: "Ration pack", contacts: 52, opted_in: 47 },
  { id: 5, name: "Wedding", contacts: 9, opted_in: 4 }, { id: 6, name: "Delivery issue", contacts: 6, opted_in: 2 },
];
const bstats = (sent, delivered, read, failed, replied) => ({ queued: 0, sent, delivered, read, failed, replied });
const BROADCASTS = [
  { id: 9, name: "Weekend atta & oil offer", status: "scheduled", channel_id: 21, channel: "Al-Noor Store", template: "weekend_offer",
    audience: { tag_ids: [2] }, variables: ["10%"], recipients: 162, stats: bstats(0, 0, 0, 0, 0), started_at: null, finished_at: null,
    created_at: hours(3), scheduled_at: at(3, "10:00") },
  { id: 8, name: "Ration pack for December", status: "sent", channel_id: 21, channel: "Al-Noor Store", template: "ration_pack_reminder",
    audience: { tag_ids: [4] }, variables: null, recipients: 47, stats: bstats(47, 46, 39, 1, 12), started_at: days(2), finished_at: days(2), created_at: days(2) },
  { id: 7, name: "Free sugar test week", status: "sent", channel_id: 22, channel: "Clinic line", template: "clinic_camp",
    audience: { tag_ids: [3] }, variables: null, recipients: 40, stats: bstats(40, 40, 33, 0, 9), started_at: days(6), finished_at: days(6), created_at: days(7) },
  { id: 6, name: "VIP early access: Basmati new crop", status: "sent", channel_id: 21, channel: "Al-Noor Store", template: "new_stock",
    audience: { tag_ids: [1] }, variables: null, recipients: 31, stats: bstats(31, 31, 29, 0, 14), started_at: days(12), finished_at: days(12), created_at: days(12) },
];

// ── Home ────────────────────────────────────────────────────────────────────
function home() {
  const rev = [8400, 12650, 0, 9800, 15200, 6420, 7450];
  return {
    needs_reply: 2,
    work: { followups_due: 0 },
    today: { chats: 27, messages_received: 164 },
    pending_payments: { count: 3, items: D.PROOFS.filter((p) => p.status === "pending_review").map((p) => ({
      id: p.id, amount: p.amount, currency: "PKR", payer: p.payer, created_at: p.created_at })) },
    revenue_7d: { days: rev.map((v, i) => ({ date: ymd(i - 6), by_currency: v ? [{ currency: "PKR", amount: `${v}.00` }] : [] })) },
    ai: { plan: "Growth Pro", replies: 2846, reply_limit: 5000, voice: 112, voice_limit: 500 },
    meta_free: [
      { channel_id: 21, label: "Al-Noor Store", phone_number: "+92 300 0000101", sent: 742, free: 1000 },
      { channel_id: 22, label: "Clinic line", phone_number: "+92 300 0000102", sent: 318, free: 1000 },
    ],
    setup: { steps: [
      { key: "item", done: true }, { key: "knowledge", done: true }, { key: "files", done: true, optional: true },
      { key: "persona", done: true }, { key: "number", done: true }, { key: "attached", done: true }, { key: "first_message", done: true },
    ], complete: true, item_id: 11 },
    live_chats: D.THREADS.slice(0, 5).map(D.threadSummary),
    orders: { new: 3, packed: 2 },
    number_health: [],
  };
}
const reportSummary = () => ({
  month: "2026-11",
  month_bounded: {
    revenue: { by_currency: [{ currency: "PKR", amount: "186450.00" }] },
    revenue_by_item: { items: [{ item_id: 11, by_currency: [{ currency: "PKR", amount: "142300.00" }] },
                               { item_id: 12, by_currency: [{ currency: "PKR", amount: "44150.00" }] }] },
    new_contacts: 84, conversations_started: 412, ai_handled_count: 359, taken_over_count: 53,
    ai_handled_share: "0.87", responded_count: 410, median_first_response_seconds: 6,
  },
  point_in_time: {
    pipeline: { by_currency: [{ currency: "PKR", amount: "247000.00" }] },
    deals_by_stage: { by_stage: [["enquiry", 7], ["quoted", 4], ["invoiced", 1], ["paid", 18], ["lost", 3], ["dismissed", 2]]
      .map(([stage, count]) => ({ stage, count })) },
    win_rate: { win_rate: "0.86", paid: 18, lost: 3 },
    average_deal_size: { by_currency: [{ currency: "PKR", amount: "11400.00" }] },
    conversations: 3120, unique_contacts: 1486,
  },
});
const INSIGHTS = [
  { kind: "orders_up", severity: "good", title: "Orders up 18% on last week", body: "41 orders so far this week against 35 last week.", link: "/app/orders" },
  { kind: "slow_replies", severity: "warning", title: "2 chats waited over 20 minutes", body: "Both were handed to a person. Answer them in the Inbox.", link: "/app/inbox" },
  { kind: "top_product", severity: "info", title: "Guard Basmati is your top seller", body: "Asked for in 64 chats this week.", link: "/app/items/11" },
];

function customersList(query) {
  let rows = D.CUSTOMERS.map(D.customerRow);
  if (query.stage) rows = rows.filter((r) => r.stage === query.stage);
  const stages = { lead: 0, customer: 0, repeat: 0, inactive: 0 };
  D.CUSTOMERS.forEach((c) => (stages[c.stage] += 1));
  return { total: rows.length, stages: { lead: 148, customer: 512, repeat: 641, inactive: 185 }, rows };
}
function customerProfile(id) {
  const c = D.CUSTOMER_BY_ID[id] || D.CUSTOMERS[0];
  const row = D.customerRow(c);
  return {
    ...row,
    ai_summary: "Orders groceries for a family of five about twice a week, usually basmati, oil, milk and eggs. Pays by Meezan Bank transfer. Prefers Roman Urdu.",
    ai_next_step: "Offer the Medium Ration Pack for December; she asked about it last month.",
    ai_summary_at: hours(1), ai_fields: ["family_size"],
    notes: "Prefers delivery after 5 pm. Gate code 4411.",
    fields: [
      { id: 1, key: "family_size", label: "Family size", kind: "number", options: [] },
      { id: 2, key: "area", label: "Area", kind: "choice", options: ["Johar Town", "Wapda Town", "Township", "DHA"] },
      { id: 3, key: "pays_by", label: "Usually pays by", kind: "choice", options: ["Cash", "Bank transfer", "JazzCash", "Easypaisa"] },
    ],
    custom_fields: { family_size: 5, area: "Johar Town", pays_by: "Bank transfer" },
    followups: [
      { id: 81, contact_id: c.id, deal_id: null, title: "Offer December ration pack", due_at: at(1, "12:00"), assigned_user_id: 102,
        assigned_name: "Ayesha Khan", status: "open", created_by_name: "Bilal Ahmed", done_at: null, done_by_name: null },
    ],
    timeline: [
      { kind: "chat", at: ago(12), title: "WhatsApp chat", detail: "Ji same address. Kitni der mein?", link: "/app/inbox?thread=31", id: 31 },
      { kind: "order", at: ago(12), title: "Order #1043 · PKR 5,840", detail: "New · 3 items", link: "/app/orders?order=1043", id: 1043 },
      { kind: "note", at: hours(5), title: "Call", detail: "Asked for Olpers instead of Milkpak from now on.", link: null, id: 5, by: "Ayesha Khan", user_id: 102, note_kind: "call" },
      { kind: "payment", at: days(1), title: "Payment confirmed · PKR 4,210", detail: "Meezan Bank · MBL-2026111022918", link: "/app/payments", id: 66 },
      { kind: "order", at: days(1), title: "Order #1036 · PKR 4,210", detail: "Delivered", link: "/app/orders?order=1036", id: 1036 },
      { kind: "booking", at: days(9), title: "Clinic visit with Dr. Sana Iqbal", detail: "Completed", link: "/app/appointments", id: 590 },
    ],
  };
}

const PAYMENTS_ME = [
  { id: 905, amount: "4999.00", currency: "PKR", status: "confirmed", provider: "manual_bank", reference: "AC-501-1105", period_start: "2026-11-05", period_end: "2026-12-05", created_at: days(6) },
  { id: 871, amount: "4999.00", currency: "PKR", status: "confirmed", provider: "manual_bank", reference: "AC-501-1005", period_start: "2026-10-05", period_end: "2026-11-05", created_at: days(37) },
  { id: 840, amount: "2999.00", currency: "PKR", status: "confirmed", provider: "manual_bank", reference: "AC-501-0905", period_start: "2026-09-05", period_end: "2026-10-05", created_at: days(67) },
];

const handlers = [
  { path: "settings/capabilities", reply: () => ok(capabilities()) },
  { path: "ops/notifications", reply: () => ok({ unread: 3, rows: [
    { id: 1, event: "order_placed", title: "New order #1043", body: "Sadia Malik · PKR 5,840", app_link: "/orders/1043", web_link: null, read: false, created_at: ago(12) },
    { id: 2, event: "customer_waiting", title: "Imran Qureshi asked for a person", body: null, app_link: "/chats/32", web_link: null, read: false, created_at: ago(27) },
    { id: 3, event: "payment_proof", title: "Payment screenshot from Kamran Butt", body: "PKR 6,420", app_link: "/payments", web_link: null, read: false, created_at: ago(72) },
  ] }) },
  { path: "ops/live", status: 503, reply: () => ({ detail: "offline in screenshots" }) },
  { path: "dashboard/home", reply: () => ok(home()) },
  { path: "reports/summary", reply: () => ok(reportSummary()) },
  { path: "billing/status", reply: () => ok({ subscription_status: "active", current_period_end: "2026-12-05T00:00:00+05:00", is_active: true, trial: false, days_left: 24 }) },
  { path: "billing/payments", reply: () => ok(PAYMENTS_ME) },
  { path: "usage/me", reply: () => ok({ month: "2026-11", cost_usd: 6.42, total_tokens: 3184200, call_count: 3890, breakdown: [
    { capability: "chat", cost_usd: 4.18, total_tokens: 2710000, call_count: 2846, estimated_calls: 0 },
    { capability: "embed", cost_usd: 0.21, total_tokens: 410000, call_count: 620, estimated_calls: 0 },
    { capability: "stt", cost_usd: 0.92, total_tokens: 0, call_count: 112, estimated_calls: 112 },
    { capability: "vision", cost_usd: 0.88, total_tokens: 64200, call_count: 74, estimated_calls: 0 },
    { capability: "tts", cost_usd: 0.23, total_tokens: 0, call_count: 238, estimated_calls: 238 },
  ] }) },
  { path: "insights", reply: () => ok(INSIGHTS) },
  { path: "partner-access", reply: () => ok({ partner: null, access: null, changes: [] }) },

  // Items + knowledge
  { path: "items", reply: () => ok(D.ITEMS) },
  { path: "items/:id", reply: ({ params }) => ok(D.ITEMS.find((i) => i.id === Number(params.id)) || D.ITEMS[0]) },
  { path: "items/:id/kb", reply: ({ params }) => ok(KB[params.id] || []) },
  { path: "items/:id/prices", reply: ({ params }) => ok(PRICES[params.id] || []) },
  { path: "items/:id/channels", reply: ({ params }) => ok(D.CHANNELS.filter((c) => c.item_ids.includes(Number(params.id)))) },
  { path: "items/:id/products", reply: () => ok({ total: 312, products: PRODUCTS }) },
  { path: "items/:id/shopify", reply: () => ok(null) },
  { path: "items/:id/booking", reply: ({ params }) => ok(bookingSettings(Number(params.id))) },
  { path: "items/:id/booking/staff", reply: ({ params }) => ok(Number(params.id) === 12 ? DOCTORS : []) },
  { method: "POST", path: "items/:id/kb/preview", reply: () => ok({
    reply: "Dr. Sana Iqbal sees patients Monday to Saturday, 5 pm to 10 pm. A check-up is PKR 1,500. Would you like me to book a time for you?",
    files: [], sources: [{ chunk_id: 1, kb_item_id: 1205, content: "", file_name: "Doctors and timings.docx" }, { chunk_id: 2, kb_item_id: 1204, content: "", file_name: "Fee list 2026.pdf" }] }) },

  // Channels
  { path: "channels", reply: () => ok(D.CHANNELS) },

  // Inbox
  { path: "inbox/threads", reply: () => ok(D.THREADS.map(D.threadSummary)) },
  { path: "inbox/threads/:id", reply: ({ params }) => {
    const t = D.THREADS.find((x) => x.id === Number(params.id)) || D.THREADS[0];
    return ok({ ...D.threadSummary(t), last_read_at: ago(t.last + 1), messages: t.messages });
  } },
  { method: "POST", path: "inbox/threads/:id/read", reply: ({ params }) => {
    const t = D.THREADS.find((x) => x.id === Number(params.id)) || D.THREADS[0];
    return ok({ ...D.threadSummary(t), unread: false });
  } },
  { path: "team", reply: () => ok({ members: D.TEAM, seats: { used: 4, limit: 10, available: 6, unlimited: false } }) },
  { path: "crm/team", reply: () => ok(D.TEAM.filter((t) => t.state === "active").map(({ id, name }) => ({ id, name }))) },

  // Orders + payments
  { path: "orders", reply: ({ query }) => {
    const rows = D.ORDERS.filter((o) => !query.status || o.status === query.status).map((o) => D.orderRow(o));
    return ok({ total: rows.length, orders: rows });
  } },
  { path: "orders/counts", reply: () => ok({ new: 3, packed: 2 }) },
  { path: "orders/:id", reply: ({ params }) => ok(D.orderRow(D.ORDERS.find((o) => o.id === Number(params.id)) || D.ORDERS[0], true)) },
  { path: "payment-proofs", reply: () => ok(D.PROOFS) },
  { path: "payment-proofs/:id/suggestions", reply: () => ok([]) },
  { path: "payment-proofs/:id/order-suggestions", reply: () => ok([D.orderRow(D.ORDERS[3])]) },
  { path: "contacts", reply: () => ok(D.CUSTOMERS.map((c) => ({
    id: c.id, display_name: c.name, account_id: null, merged_into_id: null, saved_at: days(50), company: null, email: null,
    notes: null, created_at: days(100), addresses: [D.phoneOf(c.id)], identity_ids: [c.id], identity_count: 1 }))) },

  // Customers (CRM)
  { path: "crm/customers", reply: ({ query }) => ok(customersList(query)) },
  { path: "crm/customers/:id", reply: ({ params }) => ok(customerProfile(Number(params.id))) },
  { path: "crm/views", reply: () => ok([{ id: 1, name: "VIPs gone quiet", filters: { tag: "VIP", quiet_days: "30" }, shared: true },
                                        { id: 2, name: "Clinic leads", filters: { stage: "lead", tag: "Clinic" }, shared: false }]) },
  { path: "crm/fields", reply: () => ok(customerProfile(201).fields) },
  { path: "crm/settings", reply: () => ok({ ai_auto: true }) },
  { path: "marketing/tags", reply: () => ok(TAGS) },

  { path: "routing-rules", reply: () => ok([
    { id: 1, name: "Clinic chats to Ayesha", channel_id: 22, item_id: null, user_ids: [102], users: [{ id: 102, name: "Ayesha Khan" }],
      trigger: "handover", is_active: true, position: 1 },
    { id: 2, name: "Shop chats take turns", channel_id: 21, item_id: null, user_ids: [101, 102], users: [{ id: 101, name: "Bilal Ahmed" }, { id: 102, name: "Ayesha Khan" }],
      trigger: "handover", is_active: true, position: 2 },
  ]) },

  // Requests, bookings
  { path: "requests", reply: ({ query }) => ok(REQUESTS.filter((r) => !query.kind || r.kind === query.kind).map(requestRow)) },
  { path: "requests/counts", reply: () => ok({ quote: 2, job: 0, ticket: 2, enquiry: 1 }) },
  { path: "appointments", reply: () => ok(appointments()) },

  // Marketing
  { path: "marketing/broadcasts", reply: () => ok(BROADCASTS) },
  { path: "marketing/allowance", reply: () => ok({ enabled: true, plan: "Growth Pro", limit: 5000, used: 118, remaining: 4882 }) },
];

module.exports = { handlers, home, ok };
