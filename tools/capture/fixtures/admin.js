// API answers for the SuperAdmin panel (/admin/...).
const D = require("./data");
const { ago, hours, days, at } = D;
const { TRADES } = require("./public");

const ok = (data) => ({ success: true, data });

// Tenants on the platform (all invented).
const T = [
  { id: 501, name: "Al-Noor Kiryana Store", tier: "growth-pro", status: "active", end: at(24, "00:00"), seats: [4, 10], created: 120,
    last: 12, ai: 2846, numbers: 2, setup: [7, 7], verification: "verified", issues: [] },
  { id: 502, name: "Shifa Dental Care", tier: "starter", status: "trial", trial: true, end: at(2, "00:00"), seats: [2, 3], created: 1,
    last: 60 * 3, ai: 64, numbers: 1, setup: [5, 7], verification: "not_started", issues: ["Trial ends in 2 days and no payment yet."] },
  { id: 503, name: "Karachi Mobile Hub", tier: "growth-pro", status: "active", end: at(12, "00:00"), seats: [6, 10], created: 64,
    last: 30, ai: 3911, numbers: 1, setup: [7, 7], verification: "submitted", issues: [] },
  { id: 504, name: "Bano's Boutique", tier: "starter", status: "trial_ended", trial: true, end: days(3), seats: [1, 3], created: 6,
    last: 60 * 80, ai: 188, numbers: 1, setup: [6, 7], verification: "not_started", issues: ["Trial ended 3 days ago. The AI is paused."] },
  { id: 505, name: "Madina Travels", tier: "enterprise-elite", status: "active", end: at(19, "00:00"), seats: [14, null], created: 150,
    last: 8, ai: 8120, numbers: 3, setup: [7, 7], verification: "verified", issues: [] },
  { id: 506, name: "Green Valley Pharmacy", tier: "growth-pro", status: "pending_payment", end: days(1), seats: [3, 10], created: 33,
    last: 60 * 20, ai: 1204, numbers: 1, setup: [7, 7], verification: "preparing", issues: ["Bank transfer of PKR 4,999 waiting for you to confirm."] },
  { id: 507, name: "Lahore Home Bakers", tier: "starter", status: "trial", trial: true, end: at(1, "00:00"), seats: [1, 3], created: 2,
    last: null, ai: 0, numbers: 0, setup: [2, 7], verification: "not_started", issues: ["No WhatsApp number yet.", "No knowledge added."] },
  { id: 508, name: "City Care Clinic", tier: "growth-pro", status: "active", end: at(27, "00:00"), seats: [5, 10], created: 98,
    last: 45, ai: 2290, numbers: 1, setup: [7, 7], verification: "verified", issues: [] },
];
const slug = (n) => n.toLowerCase().replace(/[^a-z]+/g, "");

function tenantSummary(t) {
  return {
    id: t.id, name: t.name, email: `owner@${slug(t.name)}-demo.pk`, admin_email: `owner@${slug(t.name)}-demo.pk`,
    package_tier: t.tier, seat_limit: t.seats[1], seat_used: t.seats[0], subscription_status: t.status,
    current_period_end: t.end, is_active: ["active", "trial"].includes(t.status), created_at: days(t.created),
    health: {
      status: t.status, trial: !!t.trial, days_left: Math.round((new Date(t.end).getTime() - D.NOW) / 86400000),
      last_message_at: t.last == null ? null : ago(t.last), ai_replies_month: t.ai, live_numbers: t.numbers,
      setup_done: t.setup[0], setup_total: t.setup[1], setup_complete: t.setup[0] === t.setup[1],
      verification: t.verification, issues: t.issues,
    },
  };
}

const ONBOARDING = {
  steps: [
    ["account", "us", "Account created", "Signed up on 14 Jul 2026"], ["owner", "client", "Owner signed in", "Bilal Ahmed"],
    ["plan", "client", "Plan paid", "Growth Pro until 5 Dec"], ["item", "client", "First product or service", "4 items"],
    ["knowledge", "client", "Knowledge added", "19 entries, 5 prices"], ["number", "us", "WhatsApp number live", "+92 300 0000101"],
    ["attached", "client", "Number answers for an item", "Al-Noor Grocery"], ["first_reply", "us", "First AI reply", "14 Jul 2026"],
    ["name", "meta", "Display name approved", "Al-Noor Store"], ["verified", "meta", "Business verified", "1,000 chats a day"],
  ].map(([key, who, title, detail]) => ({ key, who, title, detail, done: true })),
  done: 10, total: 10, can_do_business: true, owner_invite: null,
};

const handlers = [
  { path: "superadmin/home", reply: () => ok({
    tenants: { total: 48, active: 31, trial: 9, trial_ended: 3, pending_payment: 2, expired: 2, suspended: 1, new_7d: 6, new_30d: 17 },
    revenue: { this_month: [{ currency: "PKR", amount: "164970.00" }], last_month: [{ currency: "PKR", amount: "149968.00" }] },
    to_do: {
      payments_to_confirm: { count: 2, items: [
        { id: 912, company_id: 506, company: "Green Valley Pharmacy", amount: "4999.00", currency: "PKR", reference: "AC-506-1110", created_at: hours(5) },
        { id: 913, company_id: 502, company: "Shifa Dental Care", amount: "2999.00", currency: "PKR", reference: "AC-502-1111", created_at: ago(40) },
      ] },
      number_requests: 3, new_leads: 7, follow_ups_due: 4,
    },
    ai_cost: { month: "2026-11", total_usd: 61.8, platform_usd: 3.2, top: [
      { company_id: 505, company: "Madina Travels", cost_usd: 14.6 }, { company_id: 503, company: "Karachi Mobile Hub", cost_usd: 8.9 },
      { company_id: 501, company: "Al-Noor Kiryana Store", cost_usd: 6.4 } ] },
    activity: { messages_in: 18240, messages_out: 21905, live_numbers: 39, orders: 612, broadcast_messages: 2410 },
    attention: [
      { company_id: 508, company: "City Care Clinic", kind: "number_health", detail: "Quality dropped to YELLOW on +92 300 0000802.", level: "warning" },
      { company_id: 503, company: "Karachi Mobile Hub", kind: "ai_quota", detail: "78% of this month's AI replies used with 19 days to go." },
    ],
    number_setup: [
      { channel_id: 811, company_id: 502, company: "Shifa Dental Care", label: "Reception", phone_number: "+92 300 0000502", known: true,
        connected: true, name_approved: false, name_status: "PENDING_REVIEW", verified: false, messaging_limit: "TIER_250" },
      { channel_id: 812, company_id: 504, company: "Bano's Boutique", label: "Boutique", phone_number: "+92 300 0000504", known: true,
        connected: true, name_approved: true, name_status: "APPROVED", verified: false, messaging_limit: "TIER_250" },
    ],
  }) },
  { path: "superadmin/verifications", reply: () => ok([
    { company_id: 503, company: "Karachi Mobile Hub", status: "submitted", status_note: null, submitted_at: days(3), updated_at: days(3) },
    { company_id: 506, company: "Green Valley Pharmacy", status: "preparing", status_note: null, submitted_at: null, updated_at: days(1) },
  ]) },
  { path: "superadmin/expiring", reply: () => ok({
    ending: [
      { company_id: 507, company: "Lahore Home Bakers", phone: "923000000507", trial: true, current_period_end: at(1, "00:00"), days_left: 1 },
      { company_id: 502, company: "Shifa Dental Care", phone: "923000000502", trial: true, current_period_end: at(2, "00:00"), days_left: 2 },
    ],
    ended: [
      { company_id: 504, company: "Bano's Boutique", phone: "923000000504", trial: true, current_period_end: days(3), days_left: null, status: "trial_ended", days_ago: 3 },
    ],
  }) },
  { path: "superadmin/channel-requests", reply: () => ok([1, 2, 3].map((i) => ({
    id: 820 + i, company_id: 500 + i, item_id: null, provider: "meta", label: "Main", phone_number: `+92 300 000082${i}`,
    is_active: false, is_approved: false, is_blocked: false, is_cancelled: false, status: "pending", inbound_token: "demo",
    webhook_url: "https://api.example.com/webhooks/meta/demo", company_name: T[i].name, created_at: days(i) }))) },
  { path: "superadmin/tenants", reply: () => ok(T.map(tenantSummary)) },
  { path: "superadmin/tenants/:id", reply: ({ params }) => {
    const t = T.find((x) => x.id === Number(params.id)) || T[0];
    return ok({ ...tenantSummary(t), phone: D.COMPANY.phone, user_count: 4, business_type_id: 1, llm_mode: "platform",
      llm_base_url: null, llm_chat_model: null, llm_has_key: false, llm_last_error: null,
      recent_payments: [
        { id: 905, amount: 4999, currency: "PKR", status: "confirmed", provider: "manual_bank", reference: "AC-501-1105", created_at: days(6), period_end: at(24, "00:00") },
        { id: 871, amount: 4999, currency: "PKR", status: "confirmed", provider: "manual_bank", reference: "AC-501-1005", created_at: days(37), period_end: days(6) },
        { id: 840, amount: 2999, currency: "PKR", status: "confirmed", provider: "manual_bank", reference: "AC-501-0905", created_at: days(67), period_end: days(37) },
      ] });
  } },
  { path: "superadmin/tenants/:id/onboarding", reply: () => ok(ONBOARDING) },
  { path: "superadmin/tenants/:id/verification", reply: () => ok({
    company_id: 501, legal_form: "sole_proprietor", legal_name: "Al-Noor Kiryana Store", address: "Block R2, Johar Town, Lahore",
    ntn: "0000000-1", website: null, email: "bilal@alnoor-demo.pk", documents: [], issues: [], ready: true, status: "verified",
    status_note: null, submitted_at: days(60), verified_at: days(55), updated_at: days(55), verified_by_meta: true,
    legal_forms: [{ key: "sole_proprietor", label: "Sole proprietor" }] }) },
  { path: "superadmin/tenants/:id/partner", reply: () => ok({ company_id: 501, partner: { id: 61, name: "Usman Tariq", territory: "Lahore", phone: "923000000061" },
    partner_since: days(120), city: "Lahore", first_month_discount_percent: 0 }) },
  { path: "superadmin/tenants/:id/trade-holder", reply: () => ok({ company_id: 501, since: null, holder: null }) },
  { path: "superadmin/tenants/:id/usage", reply: () => ok({ this_month: 3212, last_month: 7480, months: [
    ["2026-06", 1210], ["2026-07", 3480], ["2026-08", 5120], ["2026-09", 6340], ["2026-10", 7480], ["2026-11", 3212]].map(([month, count]) => ({ month, count })) }) },
  { path: "superadmin/tenants/:id/channels", reply: () => ok(D.CHANNELS.filter((c) => c.status !== "pending").map((c) => ({
    id: c.id, company_id: 501, item_id: c.item_ids[0] || null, provider: c.provider, label: c.label, phone_number: c.phone_number,
    is_active: c.is_active, is_approved: c.is_approved, is_blocked: false, is_cancelled: false, status: c.status,
    inbound_token: "demo-token", webhook_url: `https://api.example.com/webhooks/${c.provider}/demo-token` }))) },
  { path: "superadmin/business-types", reply: () => ok(TRADES.map((t, i) => ({ id: t.id, name: t.name, default_persona: "", guardrails: "",
    is_active: true, sort_order: i, capabilities: null }))) },
  { path: "superadmin/partners", reply: () => ok([{ id: 61, name: "Usman Tariq", phone: "923000000061", email: "usman.partner@demo.pk",
    code: "usman-lhr", territory: "Lahore", status: "active", signed_in: true, cities: [{ id: 1, name: "Lahore" }], trades: [],
    deal: { share_percent: 20, share_months: 12, first_payment_bonus: "1000.00", currency: "PKR", can_add_businesses: true,
      can_help_setup: true, max_discount_percent: 20, max_trial_extension_days: 7 }, payout_details: null, notes: null,
    businesses: { total: 9, paying: 6, trial: 2, lapsed: 1 }, owed: "6200.00", paid_out: "18400.00", created_at: days(150) }]) },
  { path: "superadmin/trade-holders", reply: () => ok([]) },
  { path: "superadmin/audit", reply: () => ok([
    { id: 3, at: days(6), actor: "AgentCraftr Support", company_id: 501, company: "Al-Noor Kiryana Store", action: "confirm_payment", summary: "Confirmed payment AC-501-1105 (PKR 4,999)", detail: {} },
    { id: 2, at: days(40), actor: "AgentCraftr Support", company_id: 501, company: "Al-Noor Kiryana Store", action: "plan", summary: "Changed plan from Starter to Growth Pro", detail: {} },
    { id: 1, at: days(100), actor: "AgentCraftr Support", company_id: 501, company: "Al-Noor Kiryana Store", action: "provision", summary: "Connected +92 300 0000101 (Meta)", detail: {} },
  ]) },
];

module.exports = { handlers, T };
