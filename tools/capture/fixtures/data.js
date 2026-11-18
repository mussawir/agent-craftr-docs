// The demo business every screenshot shows: Al-Noor Kiryana Store, Lahore.
// All names are invented and every phone number is a clearly fake 92300 0000xxx.
// Times are relative to the frozen clock in screens.config.js (frozenNow).

/** The frozen clock every capture runs at: Wednesday 11 November 2026, 4:30 pm in Lahore. */
const FROZEN_NOW = "2026-11-11T16:30:00+05:00";
const NOW = new Date(FROZEN_NOW).getTime();

/** ISO time `m` minutes before the frozen "now" (negative = in the future). */
const ago = (m) => new Date(NOW - m * 60000).toISOString();
const hours = (h) => ago(h * 60);
const days = (d) => ago(d * 1440);
/** A Pakistan-time wall clock on a day relative to today: at(0, "15:30"). */
const at = (dayOffset, hhmm) => {
  const base = new Date(NOW + 5 * 3600000); // shift to PKT wall clock
  const [h, m] = hhmm.split(":").map(Number);
  const d = Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + dayOffset, h - 5, m);
  return new Date(d).toISOString();
};
const ymd = (dayOffset) => at(dayOffset, "12:00").slice(0, 10);

const COMPANY = { id: 501, name: "Al-Noor Kiryana Store", city: "Lahore", phone: "923000000100" };

const USERS = {
  owner: { id: 101, name: "Bilal Ahmed", email: "bilal@alnoor-demo.pk", role: "Company Admin", role_id: 21, company_id: 501 },
  admin: { id: 1, name: "AgentCraftr Support", email: "support@agentcraftr-demo.com", role: "SuperAdmin", role_id: 7, company_id: null, admin_role: "owner" },
  partner: { id: 301, name: "Usman Tariq", email: "usman.partner@demo.pk", role: "Franchise holder", role_id: 30, company_id: null },
};

const TEAM = [
  { id: 101, name: "Bilal Ahmed", email: "bilal@alnoor-demo.pk", role: "admin", staff_role: null, state: "active", invite_expires_at: null, created_at: days(120) },
  { id: 102, name: "Ayesha Khan", email: "ayesha@alnoor-demo.pk", role: "agent", staff_role: "sales", state: "active", invite_expires_at: null, created_at: days(90) },
  { id: 103, name: "Hamza Riaz", email: "hamza@alnoor-demo.pk", role: "agent", staff_role: "rider", state: "active", invite_expires_at: null, created_at: days(60) },
  { id: 104, name: "Fatima Noor", email: "fatima@alnoor-demo.pk", role: "agent", staff_role: "manager", state: "invited", invite_expires_at: at(5, "23:59"), created_at: days(2) },
];

const summary = (o) => ({ knowledge: 0, photos: 0, videos: 0, audio: 0, documents: 0, notes: 0, links: 0,
  failed: 0, sendable: 0, prices: 0, products: 0, numbers: 0, ...o });

const ITEMS = [
  { id: 11, name: "Al-Noor Grocery", item_type: "catalog", is_active: true, created_at: days(110),
    description: "Daily grocery for Johar Town: rice, atta, oil, dairy and household items, delivered in 45 minutes.",
    instructions: "You are Al-Noor's friendly shop assistant. Reply in the customer's language (English, Urdu or Roman Urdu). Take orders, confirm the address and say delivery is free above PKR 2,000.",
    summary: summary({ knowledge: 6, photos: 3, documents: 2, notes: 1, sendable: 4, products: 312, numbers: 2 }) },
  { id: 12, name: "Al-Noor Family Clinic", item_type: "service", is_active: true, created_at: days(80),
    description: "Evening clinic above the store: GP check-ups, BP and sugar tests, Mon to Sat 5 to 10 pm.",
    instructions: "You are the clinic receptionist. Be polite and brief. Book visits with the doctor the patient asks for, or offer the soonest time. Never give medical advice.",
    summary: summary({ knowledge: 8, photos: 2, videos: 1, audio: 1, documents: 2, notes: 2, sendable: 4, prices: 5, numbers: 1 }) },
  { id: 13, name: "Bulk & Party Orders", item_type: "service", is_active: true, created_at: days(45),
    description: "Rice, oil and sweets in bulk for weddings, dawats and offices. We send a quote within a day.",
    instructions: "Collect what the customer needs, the quantity, the date and the area, then open a quote request. Never promise a price yourself.",
    summary: summary({ knowledge: 3, documents: 1, notes: 2, sendable: 1, prices: 3, numbers: 1 }) },
  { id: 14, name: "Monthly Ration Pack", item_type: "product", is_active: true, created_at: days(20),
    description: "One box with a family's monthly basics. Three sizes, delivered on the 1st.",
    instructions: "",
    summary: summary({ knowledge: 2, photos: 1, notes: 1, sendable: 1, prices: 0, numbers: 0 }) },
];

const health = (o = {}) => ({
  level: "ok", quality_rating: "GREEN", messaging_limit: "TIER_1K", messaging_limit_text: "1,000",
  name_status: "APPROVED", number_status: "CONNECTED", can_send: "AVAILABLE", issues: [], log: [], error: null,
  checked_at: hours(2), ...o,
});
const setupOk = { known: true, connected: true, name_approved: true, name_status: "APPROVED", verified: true, messaging_limit: "TIER_1K" };

const CHANNELS = [
  { id: 21, company_id: 501, provider: "meta", label: "Al-Noor Store", phone_number: "+92 300 0000101", is_active: true,
    is_approved: true, is_blocked: false, is_cancelled: false, created_at: days(100), item_ids: [11, 13, 14], item_count: 3,
    status: "active", health: health(), setup: setupOk },
  { id: 22, company_id: 501, provider: "meta", label: "Clinic line", phone_number: "+92 300 0000102", is_active: true,
    is_approved: true, is_blocked: false, is_cancelled: false, created_at: days(75), item_ids: [12], item_count: 1,
    status: "active", health: health({ quality_rating: "YELLOW", level: "warning",
      issues: [{ code: "quality", severity: "warning", text: "Some customers blocked this number this week.", action: "Send fewer offers and answer quickly." }] }),
    setup: setupOk },
  { id: 23, company_id: 501, provider: "telegram", label: "Al-Noor on Telegram", phone_number: null, is_active: true,
    is_approved: true, is_blocked: false, is_cancelled: false, created_at: days(30), item_ids: [11], item_count: 1,
    status: "active", health: null, setup: null },
  { id: 24, company_id: 501, provider: "meta", label: "Delivery line", phone_number: "+92 300 0000103", is_active: false,
    is_approved: false, is_blocked: false, is_cancelled: false, created_at: days(1), item_ids: [], item_count: 0,
    status: "pending", health: null, setup: null },
];

const CUSTOMERS = [
  { id: 201, name: "Sadia Malik", city: "Lahore", stage: "repeat", purchases: 9, paid: { PKR: "41850" }, tags: ["VIP", "Johar Town"], last: 12, owner: 102, source: "whatsapp", marketing: true },
  { id: 202, name: "Imran Qureshi", city: "Lahore", stage: "customer", purchases: 1, paid: { PKR: "3240" }, tags: ["Delivery issue"], last: 25, owner: 102, source: "whatsapp", marketing: false },
  { id: 203, name: "Nadia Hussain", city: "Lahore", stage: "lead", purchases: 0, paid: {}, tags: ["Clinic"], last: 48, owner: null, source: "whatsapp", marketing: true },
  { id: 204, name: "Kamran Butt", city: "Lahore", stage: "repeat", purchases: 14, paid: { PKR: "68200" }, tags: ["VIP"], last: 70, owner: 101, source: "whatsapp", marketing: true },
  { id: 205, name: "Zainab Raza", city: "Lahore", stage: "lead", purchases: 0, paid: {}, tags: [], last: 135, owner: null, source: "telegram", marketing: false },
  { id: 207, name: "Rabia Anwar", city: "Lahore", stage: "customer", purchases: 1, paid: { PKR: "5600" }, tags: ["Ration pack"], last: 60 * 20, owner: 102, source: "whatsapp", marketing: true },
  { id: 208, name: "Tariq Javed", city: "Lahore", stage: "lead", purchases: 0, paid: {}, tags: ["Wedding"], last: 95, owner: 101, source: "whatsapp", marketing: false },
  { id: 209, name: "Hina Farooq", city: "Lahore", stage: "repeat", purchases: 6, paid: { PKR: "22900" }, tags: ["Johar Town"], last: 60 * 30, owner: 102, source: "whatsapp", marketing: true },
  { id: 210, name: "Asad Ali", city: "Lahore", stage: "customer", purchases: 1, paid: { PKR: "1980" }, tags: [], last: 60 * 52, owner: null, source: "manual", marketing: false },
  { id: 211, name: "Mehwish Iqbal", city: "Kasur", stage: "lead", purchases: 0, paid: {}, tags: ["Clinic"], last: 60 * 75, owner: null, source: "whatsapp", marketing: false },
  { id: 206, name: "Faisal Mehmood", city: "Lahore", stage: "inactive", purchases: 4, paid: { PKR: "15400" }, tags: [], last: 60 * 24 * 74, owner: 103, source: "whatsapp", marketing: true },
  { id: 212, name: "Waqas Ahmed", city: "Lahore", stage: "inactive", purchases: 2, paid: { PKR: "6100" }, tags: [], last: 60 * 24 * 91, owner: null, source: "import", marketing: false },
];
const phoneOf = (id) => `923000000${id}`;
const teamName = (uid) => (TEAM.find((t) => t.id === uid) || {}).name || null;

function customerRow(c) {
  return {
    id: c.id, name: c.name, saved: true, phone: phoneOf(c.id),
    numbers: [{ address: phoneOf(c.id), provider: c.source === "telegram" ? "telegram" : "meta" }],
    email: null, company: null, city: c.city, source: c.source, group: null, group_id: null,
    owner_user_id: c.owner, owner_name: teamName(c.owner), tags: c.tags, stage: c.stage, purchases: c.purchases,
    paid: c.paid, open_deals: c.id === 208 ? 1 : c.id === 204 ? 1 : 0,
    open_deal_value: c.id === 208 ? { PKR: "185000" } : c.id === 204 ? { PKR: "24000" } : {},
    last_activity_at: ago(c.last), next_followup_at: c.id === 208 ? at(0, "18:00") : c.id === 203 ? at(1, "11:00") : c.id === 206 ? days(1) : null,
    followups_open: [208, 203, 206].includes(c.id) ? 1 : 0, custom_fields: {}, marketing: c.marketing, created_at: days(100),
  };
}

// ── Conversations ────────────────────────────────────────────────────────────
const msg = (id, direction, text, minutesAgo, extra = {}) => ({
  id, direction, kind: "text", text, media_url: null, sent_by_user_id: null, created_at: ago(minutesAgo),
  delivery_status: direction === "out" ? "read" : null, ...extra,
});

const THREADS = [
  { id: 31, contact_id: 201, status: "ai", unread: true, last: 12, channel: "meta",
    messages: [
      msg(3101, "in", "Assalam o Alaikum, 5 kg Guard basmati aur 1 Dalda 5 litre chahiye", 19),
      msg(3102, "out", "Walaikum Assalam Sadia ji! 5 kg Guard Basmati is PKR 2,150 and Dalda Cooking Oil 5 L is PKR 3,050. Shall I add both to your order?", 18),
      msg(3103, "in", "Haan add kar dein, aur 2 dozen anday bhi", 15),
      msg(3104, "out", "Done. Your order: 5 kg Guard Basmati, Dalda 5 L, 2 dozen eggs. Total PKR 5,840 with free delivery. Same address, House 14, Block R2 Johar Town?", 14),
      msg(3105, "in", "Ji same address. Kitni der mein?", 12),
    ] },
  { id: 32, contact_id: 202, status: "human", unread: true, last: 25, channel: "meta", assigned_user_id: 102,
    handover_reason: "customer_asked", handover_note: null, handover_at: ago(27),
    messages: [
      msg(3201, "in", "Mera order #1037 abhi tak nahi aya, 2 ghante ho gaye", 41),
      msg(3202, "out", "Sorry for the wait, Imran sahab. Order #1037 left the shop at 3:10 pm with our rider Hamza. It should reach you in about 15 minutes.", 40),
      msg(3203, "in", "Ye pehle bhi hua tha. Please kisi insaan se baat karwa dein", 28),
      msg(3204, "out", "Of course. I've asked a member of our team to take over this chat. They'll reply here in a moment.", 27),
      msg(3205, "out", "Imran sahab, Ayesha here from Al-Noor. Hamza is 5 minutes away, I've just called him. Sorry again, delivery is free on your next order.", 26, { sent_by_user_id: 102, sent_by_name: "Ayesha Khan" }),
      msg(3206, "in", "Theek hai, shukriya. Agli dafa time pe bhejna", 25),
    ] },
  { id: 33, contact_id: 203, status: "ai", unread: false, last: 48, channel: "meta",
    messages: [
      msg(3301, "in", "Dr. Sana kal shaam available hain?", 52),
      msg(3302, "out", "Yes, Dr. Sana Iqbal has free times tomorrow at 6:00 pm, 6:30 pm and 8:00 pm. Which one suits you?", 51),
      msg(3303, "in", "6:30 theek hai", 49),
      msg(3304, "out", "Booked: Thursday 6:30 pm with Dr. Sana Iqbal at Al-Noor Family Clinic. Check-up fee PKR 1,500. We'll remind you an hour before.", 48),
    ] },
  { id: 34, contact_id: 204, status: "ai", unread: false, last: 70, channel: "meta",
    messages: [
      msg(3401, "in", "Payment kar di hai order 1040 ki", 74),
      msg(3402, "in", null, 73, { kind: "image", media_url: "media/private/501/proof-3402.png" }),
      msg(3403, "out", "Thank you Kamran sahab! We've received your screenshot of PKR 6,420 (Meezan Bank). The team will confirm it shortly.", 70),
    ] },
  { id: 38, contact_id: 208, status: "ai", unread: true, last: 95, channel: "meta",
    messages: [
      msg(3801, "in", "Shaadi ke liye 40 kg chawal, 20 litre oil aur mithai chahiye, 28 November ko", 100),
      msg(3802, "out", "Mubarak ho! I've noted 40 kg rice, 20 L cooking oil and sweets for 28 November. Which area should we deliver to?", 99),
      msg(3803, "in", "DHA Phase 5", 96),
      msg(3804, "out", "Thank you. Your quote request is Q-0019. Our team will send you a price today.", 95),
    ] },
  { id: 35, contact_id: 205, status: "human", unread: false, last: 135, channel: "telegram", assigned_user_id: 101,
    handover_reason: "staff_paused", handover_note: "Bilal Ahmed", handover_at: ago(140),
    messages: [
      msg(3501, "in", "Do you deliver to Wapda Town?", 150),
      msg(3502, "out", "Yes! We deliver to Wapda Town in about 60 minutes. Delivery is free above PKR 2,000.", 149),
      msg(3503, "in", "Can I pay on delivery?", 136),
      msg(3504, "out", "Yes, cash on delivery is fine. I'll keep an eye on your order myself.", 135, { sent_by_user_id: 101, sent_by_name: "Bilal Ahmed" }),
    ] },
  { id: 37, contact_id: null, sender: "923000000299", status: "ai", unread: false, last: 60 * 5, channel: "meta",
    messages: [
      msg(3701, "in", "Shop kab tak khuli hai?", 60 * 5 + 2),
      msg(3702, "out", "We're open every day from 8 am to 11 pm. Home delivery runs until 10:30 pm.", 60 * 5),
    ] },
  { id: 36, contact_id: 209, status: "closed", unread: false, last: 60 * 30, channel: "meta",
    messages: [
      msg(3601, "in", "Ration pack medium kab aayega?", 60 * 31),
      msg(3602, "out", "Your Medium Ration Pack arrives on 1 December, Hina ji. You'll get a message when it leaves the shop.", 60 * 30),
    ] },
];

const CUSTOMER_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c]));

function threadSummary(t) {
  const c = t.contact_id ? CUSTOMER_BY_ID[t.contact_id] : null;
  const lastMsg = t.messages[t.messages.length - 1];
  const preview = (lastMsg.text || (lastMsg.kind === "image" ? "Photo" : "")).slice(0, 80);
  return {
    id: t.id, channel: t.channel, sender_id: t.sender || phoneOf(t.contact_id), contact_id: t.contact_id,
    contact_name: c ? c.name : null, status: t.status, last_message_at: ago(t.last), unread: t.unread,
    preview: preview.length >= 80 ? preview + "…" : preview,
    assigned_user_id: t.assigned_user_id ?? null, assigned_name: teamName(t.assigned_user_id),
    handover_reason: t.handover_reason ?? null, handover_note: t.handover_note ?? null, handover_at: t.handover_at ?? null,
  };
}

// ── Orders ───────────────────────────────────────────────────────────────────
const line = (id, name, unit, price, qty) => ({ id, product_id: id, name, unit, unit_price: price,
  qty: `${qty}.00`, line_total: (Number(price) * qty).toFixed(2) });
const ORDERS = [
  { id: 1043, contact_id: 201, conversation_id: 31, status: "new", total: "5840.00", placed: 12, address: "House 14, Block R2, Johar Town",
    lines: [line(1, "Guard Basmati Rice", "5 kg", "2150.00", 1), line(2, "Dalda Cooking Oil", "5 L", "3050.00", 1), line(3, "Farm Eggs", "dozen", "320.00", 2)] },
  { id: 1042, contact_id: 207, conversation_id: null, status: "new", total: "2780.00", placed: 38, address: "Flat 3, Al-Rehman Plaza, Wapda Town",
    lines: [line(4, "Sunridge Chakki Atta", "10 kg", "1580.00", 1), line(5, "Nestle Milkpak", "1 L", "300.00", 4)] },
  { id: 1041, contact_id: 209, conversation_id: 36, status: "new", total: "1460.00", placed: 66, address: "House 88, Block G1, Johar Town",
    lines: [line(6, "Tapal Danedar Tea", "900 g", "1460.00", 1)] },
  { id: 1040, contact_id: 204, conversation_id: 34, status: "packed", total: "6420.00", placed: 60 * 3, address: "House 5, Block E, Johar Town", paid: 65,
    lines: [line(1, "Guard Basmati Rice", "5 kg", "2150.00", 2), line(7, "Shan Biryani Masala", "pack", "140.00", 3), line(2, "Dalda Cooking Oil", "5 L", "3050.00", 0)] },
  { id: 1039, contact_id: 210, conversation_id: null, status: "packed", total: "1980.00", placed: 60 * 4, address: "Shop 2, Main Boulevard, Johar Town",
    lines: [line(8, "Surf Excel", "2 kg", "990.00", 2)] },
  { id: 1037, contact_id: 202, conversation_id: 32, status: "delivered", total: "3240.00", placed: 60 * 5, address: "House 41, Block J3, Johar Town", paid: 60 * 4,
    lines: [line(4, "Sunridge Chakki Atta", "10 kg", "1580.00", 1), line(9, "Mitchell's Jam", "450 g", "415.00", 4)] },
  { id: 1036, contact_id: 201, conversation_id: 31, status: "delivered", total: "4210.00", placed: 60 * 26, address: "House 14, Block R2, Johar Town", paid: 60 * 25,
    lines: [line(2, "Dalda Cooking Oil", "5 L", "3050.00", 1), line(10, "Olpers Milk", "1.5 L", "580.00", 2)] },
  { id: 1035, contact_id: 205, conversation_id: 35, status: "cancelled", total: "990.00", placed: 60 * 28, address: "Wapda Town",
    lines: [line(8, "Surf Excel", "2 kg", "990.00", 1)] },
];
function orderRow(o, withLines = false) {
  const c = CUSTOMER_BY_ID[o.contact_id];
  const r = {
    id: o.id, item_id: 11, contact_id: o.contact_id, contact_name: c ? c.name : null, phone: phoneOf(o.contact_id),
    conversation_id: o.conversation_id, status: o.status, currency: "PKR", total: o.total, delivery_address: o.address,
    note: null, placed_at: ago(o.placed), paid_at: o.paid ? ago(o.paid) : null, created_at: ago(o.placed + 3), updated_at: ago(o.placed - 5),
  };
  if (withLines) r.lines = o.lines.filter((l) => l.qty !== "0.00");
  return r;
}

// ── Payment proofs ───────────────────────────────────────────────────────────
const proof = (id, contact_id, amount, status, minutesAgo, extra = {}) => ({
  id, company_id: 501, contact_id, conversation_id: null, message_id: null, deal_id: null, order_id: null,
  image_sha256: `demo${id}`, media_url: `media/private/501/proof-${id}.png`, document_type: "bank_transfer",
  amount, currency: "PKR", reference: null, paid_at: ago(minutesAgo + 2), payer: CUSTOMER_BY_ID[contact_id]?.name || null,
  payee: "Al-Noor Kiryana Store", bank: "Meezan Bank", confidence: "0.94", status, reviewed_by_user_id: null,
  reviewed_at: null, reject_reason: null, created_at: ago(minutesAgo), updated_at: ago(minutesAgo), ...extra,
});
const PROOFS = [
  proof(71, 204, "6420.00", "pending_review", 72, { reference: "MBL-2026111183421", bank: "Meezan Bank" }),
  proof(72, 207, "2780.00", "pending_review", 36, { reference: "JC-88123904", bank: "JazzCash", confidence: "0.97" }),
  proof(73, 203, "1500.00", "pending_review", 110, { reference: "EP-55102877", bank: "Easypaisa", confidence: "0.88" }),
  proof(68, 202, "3240.00", "confirmed", 60 * 4, { reference: "HBL-7781023", bank: "HBL", reviewed_by_user_id: 101, order_id: 1037 }),
  proof(66, 201, "4210.00", "confirmed", 60 * 25, { reference: "MBL-2026111022918", order_id: 1036 }),
  proof(64, 206, "1200.00", "rejected", 60 * 50, { reference: null, confidence: "0.41", reject_reason: "Screenshot is from last month's order." }),
];

module.exports = {
  FROZEN_NOW, NOW, ago, hours, days, at, ymd, COMPANY, USERS, TEAM, ITEMS, CHANNELS, CUSTOMERS, CUSTOMER_BY_ID, THREADS,
  ORDERS, PROOFS, phoneOf, teamName, customerRow, threadSummary, orderRow,
};
