// API answers for the pages added in Nov 2026: admin Team, Billing desk and Social; Franchise holder and
// Trade Partner Billing and Prospects; the tenant SaudaSulf page. Tried before the older fixtures.
const D = require("./data");
const { ago, days, at } = D;

const ok = (data) => ({ success: true, data });
const inDays = (d) => days(-d);

// ── Admin: team ─────────────────────────────────────────────────────────────────
const STAFF = [
  { id: 1, name: "AgentCraftr Support", email: "support@agentcraftr-demo.com", admin_role: "owner", state: "active", invite_expires_at: null },
  { id: 2, name: "Hira Saeed", email: "hira@agentcraftr-demo.com", admin_role: "finance", state: "active", invite_expires_at: null },
  { id: 3, name: "Omer Farooq", email: "omer@agentcraftr-demo.com", admin_role: "support", state: "active", invite_expires_at: null },
  { id: 4, name: "Ayesha Khan", email: "ayesha@agentcraftr-demo.com", admin_role: "marketing", state: "invited", invite_expires_at: inDays(5) },
  { id: 5, name: "Danish Ali", email: "danish@agentcraftr-demo.com", admin_role: "support", state: "disabled", invite_expires_at: null },
];

// ── Admin: billing desk ─────────────────────────────────────────────────────────
const desk = (o) => ({ company_id: 0, company: "", phone: null, product: "whatsapp", plan: "growth-pro", status: "active",
  current_period_end: inDays(3), days_left: 3, amount_due: "4999.00", currency: "PKR", partner: null, holder: null, ...o });
const DESK = {
  due: [
    desk({ company_id: 501, company: "Al-Noor Kiryana Store", phone: "923000000100", days_left: 3, current_period_end: inDays(3),
           partner: { id: 61, name: "Usman Tariq" } }),
    desk({ company_id: 509, company: "Punjab Paints & Hardware", phone: "923000000591", plan: "starter", amount_due: "2999.00",
           days_left: 5, current_period_end: inDays(5), partner: { id: 61, name: "Usman Tariq" }, holder: { id: 71, name: "Faisal Qadri" } }),
    desk({ company_id: 512, company: "Green Valley Grocers", phone: "923000000512", product: "saudasulf", plan: "saudasulf-basic",
           amount_due: "1500.00", days_left: 6, current_period_end: inDays(6) }),
  ],
  overdue: [
    desk({ company_id: 504, company: "Bano's Boutique", phone: "923000000541", plan: "starter", status: "past_due", amount_due: "2999.00",
           days_left: -3, current_period_end: days(3), partner: { id: 61, name: "Usman Tariq" } }),
  ],
  paused: [], renewing: [],
  proofs: [
    { id: 9001, company_id: 508, company: "City Care Clinic", amount: "4999.00", currency: "PKR", status: "pending", provider: "manual",
      reference: "EP-55120", created_at: ago(95), period_end: null, product: "whatsapp", pack: null, method: "easypaisa",
      uploaded_by: { user_id: 301, name: "Usman Tariq", kind: "partner" }, proof_url: "uploads/proofs/9001.jpg" },
  ],
};
DESK.renewing = DESK.due.slice(0, 2);
const COUNTS = { due: 3, overdue: 1, paused: 0, renewing: 2, proofs: 1 };

// ── Admin: social calendar ──────────────────────────────────────────────────────
const post = (id, title, status, when, platforms) => ({ id, title, status, scheduled_for: when, posted_at: status === "posted" ? when : null, platforms });
const SOCIAL = {
  dated: [
    post(801, "Kiryana owners: never miss an order", "posted", at(-8, "18:00"), ["facebook", "instagram"]),
    post(802, "Clinic reminder demo (video)", "posted", at(-3, "19:30"), ["tiktok", "instagram"]),
    post(803, "Franchise holder stories: Lahore", "scheduled", at(0, "20:00"), ["facebook", "linkedin"]),
    post(804, "SaudaSulf: orders from the shop's QR", "scheduled", at(2, "18:30"), ["facebook", "instagram", "tiktok"]),
    post(805, "Ramadan rush: AI answers at sehri", "draft", at(6, "17:00"), ["instagram"]),
    post(806, "Customer story: City Care Clinic", "scheduled", at(9, "19:00"), ["youtube", "facebook"]),
  ],
  undated: [
    post(810, "How the AI hands over to you", "idea", null, []),
    post(811, "Khata on WhatsApp — short reel", "idea", null, ["tiktok"]),
  ],
};

// ── Franchise holder / Trade Partner: billing of their businesses ───────────────
const bill = (o) => ({ company_id: 0, company: "", phone: null, product: "whatsapp", plan: "growth-pro", status: "active",
  current_period_end: inDays(20), days_left: 20, amount_due: "4999.00", currency: "PKR", reference: "", owner_name: null,
  owner_phone: null, via_partner: null, pending_proof: null, ...o });
const PAYMENT_DETAILS = "Pay AgentCraftr: Meezan Bank · AppCraftr (Pvt) Ltd · 0000-0000000-99, or Easypaisa 0300-0000099. Put the reference in the note.";
const PARTNER_BILLING = { payment_details: PAYMENT_DETAILS, rows: [
  bill({ company_id: 504, company: "Bano's Boutique", phone: "923000000541", plan: "starter", status: "past_due", amount_due: "2999.00",
         days_left: -3, current_period_end: days(3), reference: "AC-504", owner_name: "Bano Akhtar", owner_phone: "923000000541" }),
  bill({ company_id: 509, company: "Punjab Paints & Hardware", phone: "923000000591", plan: "starter", amount_due: "2999.00", days_left: 5,
         current_period_end: inDays(5), reference: "AC-509", owner_name: "Rizwan Saleem", owner_phone: "923000000591" }),
  bill({ company_id: 508, company: "City Care Clinic", phone: "923000000581", days_left: 27, current_period_end: inDays(27), reference: "AC-508",
         owner_name: "Dr. Kashif Mir", owner_phone: "923000000581",
         pending_proof: { payment_id: 9001, uploaded_by_role: "partner", created_at: ago(95) } }),
  bill({ company_id: 501, company: "Al-Noor Kiryana Store", phone: "923000000100", days_left: 24, current_period_end: inDays(24),
         reference: "AC-501", owner_name: "Bilal Ahmed", owner_phone: "923000000100" }),
  bill({ company_id: 501, company: "Al-Noor Kiryana Store", phone: "923000000100", product: "saudasulf", plan: "saudasulf-basic",
         amount_due: "1500.00", days_left: 12, current_period_end: inDays(12), reference: "SS-501", owner_name: "Bilal Ahmed",
         owner_phone: "923000000100" }),
] };
const HOLDER_BILLING = { payment_details: PAYMENT_DETAILS, rows: PARTNER_BILLING.rows.map((r, i) => ({
  ...r, via_partner: i === 2 ? null : "Usman Tariq" })) };

// ── Prospect pipeline (Franchise holder and Trade Partner) ──────────────────────
const prospect = (o) => ({ id: 0, name: "", email: "", phone: "", stage: "new", stored_stage: o.stage || "new", company_id: null,
  company_name: null, next_action_at: null, lost_reason: null, partner_id: 61, trade_holder_id: null, source: "partner",
  created_at: days(4), editable: true, partner: null, ...o });
const PROSPECTS = [
  prospect({ id: 1201, name: "Shahid Mehmood", phone: "923000001201", email: "shahid@demo.pk", stage: "new", created_at: hours(5) }),
  prospect({ id: 1202, name: "Mehwish Bakery", phone: "923000001202", stage: "new", source: "website", created_at: days(1) }),
  prospect({ id: 1203, name: "Gulberg Dental Care", phone: "923000001203", stage: "contacted", next_action_at: at(0, "17:30") }),
  prospect({ id: 1204, name: "Raza Electronics", phone: "923000001204", stage: "contacted", next_action_at: at(-1, "12:00") }),
  prospect({ id: 1205, name: "Model Town Pharmacy", phone: "923000001205", stage: "demo", next_action_at: at(1, "11:00") }),
  prospect({ id: 1206, name: "Fresh Fruit Corner", phone: "923000000510", stage: "trial", company_id: 510, company_name: "Fresh Fruit Corner" }),
  prospect({ id: 1207, name: "City Care Clinic", phone: "923000000581", stage: "won", company_id: 508, company_name: "City Care Clinic" }),
  prospect({ id: 1208, name: "Anarkali Shoes", phone: "923000001208", stage: "lost", lost_reason: "Too busy before Eid" }),
];
function hours(h) { return ago(h * 60); }
const HOLDER_PROSPECTS = PROSPECTS.map((p, i) => ({ ...p, trade_holder_id: 71, partner_id: i % 3 === 0 ? 61 : null,
  partner: i % 3 === 0 ? "Usman Tariq" : null, editable: i % 3 !== 0 }));
const prospectDetail = (list, id) => {
  const p = list.find((x) => x.id === Number(id)) || list[0];
  return { ...p, timeline: [
    { id: 1, body: "Added from a walk-in visit.", kind: "system", author: null, created_at: p.created_at },
    { id: 2, body: "Called; wants a demo after Friday prayers.", kind: "note", author: "Usman Tariq", created_at: days(1) },
  ] };
};

// ── Trade Partner (holder) basics ───────────────────────────────────────────────
const HOLDER_DEAL = { share_percent: 10, share_months: 12, partner_share_percent: 20, currency: "PKR", can_add_businesses: true,
  can_add_partners: true, max_discount_percent: 15, max_trial_extension_days: 7 };
const SLICE = { sectors: [{ code: "retail", name: "Retail" }], trade_ids: [3],
  trades: [{ id: 1, name: "Grocery / kiryana store", sector: "Retail" }, { id: 7, name: "Clothing boutique", sector: "Retail" },
           { id: 3, name: "General clinic", sector: "Health" }],
  area: { kind: "province", province: "Punjab", city_ids: [] }, area_label: "Punjab" };
const HOLDER_BUSINESSES = [
  { id: 501, name: "Al-Noor Kiryana Store", city: "Lahore", package_tier: "growth-pro", status: "active", trial: false, days_left: 24,
    setup_done: 7, setup_total: 7, last_message_at: ago(12), live_numbers: 2, issues: [], owner_name: "Bilal Ahmed", owner_phone: "923000000100",
    owner_signed_in: true, partner_id: 61, partner: "Usman Tariq", first_month_discount_percent: 0, has_paid: true, trial_extension_left: 7 },
  { id: 508, name: "City Care Clinic", city: "Lahore", package_tier: "growth-pro", status: "active", trial: false, days_left: 27,
    setup_done: 7, setup_total: 7, last_message_at: ago(45), live_numbers: 1, issues: [], owner_name: "Dr. Kashif Mir", owner_phone: "923000000581",
    owner_signed_in: true, partner_id: null, partner: null, first_month_discount_percent: 0, has_paid: true, trial_extension_left: 7 },
];

// ── Tenant: SaudaSulf ───────────────────────────────────────────────────────────
const appCustomer = (o) => ({ id: 0, name: null, phone: null, contact_id: null, contact_name: null, matched_existing: false,
  confirmed_at: null, blocked_at: null, added_at: ago(30), ...o });
const APP_CUSTOMERS = [
  appCustomer({ id: 3101, name: "Sadia Malik", phone: "923000000201", contact_id: 201, contact_name: "Sadia Malik", matched_existing: true, added_at: ago(40) }),
  appCustomer({ id: 3102, name: "Asif Javed", phone: "923000003102", added_at: ago(60 * 3) }),
  appCustomer({ id: 3103, name: "Mrs. Naheed", phone: "923000003103", added_at: ago(60 * 26) }),
];

const handlers = [
  // Admin
  { path: "superadmin/team", reply: () => ok(STAFF) },
  { path: "superadmin/billing/counts", reply: () => ok(COUNTS) },
  { path: "superadmin/billing/desk", reply: ({ query }) => ok(DESK[query.tab] || []) },
  { path: "superadmin/social/posts", reply: () => ok(SOCIAL) },
  // Franchise holder (the app calls /franchise/...; older captures used /partner/...)
  { path: "franchise/billing", reply: () => ok(PARTNER_BILLING) },
  { path: "franchise/crm/prospects", reply: () => ok(PROSPECTS) },
  { path: "franchise/crm/prospects/:id", reply: ({ params }) => ok(prospectDetail(PROSPECTS, params.id)) },
  // Trade Partner
  { path: "trade-partner/me", reply: () => ok({ ...SLICE, id: 71, name: "Faisal Qadri", code: "faisal-pb", phone: "923000000071",
    payout_details: "HBL · 0000-0000000-71", deal: HOLDER_DEAL }) },
  { path: "trade-partner/options", reply: () => ok({ trades: SLICE.trades, cities: [{ id: 1, name: "Lahore", province: "Punjab" }],
    partners: [{ id: 61, name: "Usman Tariq", status: "active" }], deal: HOLDER_DEAL }) },
  { path: "trade-partner/businesses", reply: () => ok(HOLDER_BUSINESSES) },
  { path: "trade-partner/billing", reply: () => ok(HOLDER_BILLING) },
  { path: "trade-partner/crm/prospects", reply: () => ok(HOLDER_PROSPECTS) },
  { path: "trade-partner/crm/prospects/:id", reply: ({ params }) => ok(prospectDetail(HOLDER_PROSPECTS, params.id)) },
  // Tenant SaudaSulf
  { path: "saudasulf/shop-code", reply: () => ok({ code: "ALNOOR-501", link: "https://saudasulf.example/s/ALNOOR-501", live: true }) },
  { path: "saudasulf/app-customers", reply: ({ query }) => ok(query.state === "waiting" || !query.state
    ? APP_CUSTOMERS : query.state === "all" ? APP_CUSTOMERS : []) },
  { path: "saudasulf/usage", reply: () => ok({ active: true, used: 642, allowance: 1000, base: 1000, pack_messages: 0, percent: 64,
    period_start: days(18), period_end: inDays(12), subscription_end: inDays(12), days_left: 12, grace_ends_at: null, level: "ok",
    ending_soon: false, packs: [{ code: "p500", messages: 500, price: "500", currency: "PKR" }], can_buy: true }) },
];

module.exports = { handlers };
