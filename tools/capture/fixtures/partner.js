// API answers for a city partner (/partner/...).
const D = require("./data");
const { ago, days } = D;

const ok = (data) => ({ success: true, data });

const DEAL = { share_percent: 20, share_months: 12, first_payment_bonus: "1000.00", currency: "PKR", can_add_businesses: true,
  can_help_setup: true, max_discount_percent: 20, max_trial_extension_days: 7 };

const biz = (o) => ({
  id: 0, name: "", city: "Lahore", package_tier: "growth-pro", status: "active", trial: false, days_left: 20, setup_done: 7,
  setup_total: 7, last_message_at: ago(30), live_numbers: 1, issues: [], owner_name: "", owner_phone: null, owner_signed_in: true,
  first_month_discount_percent: 0, has_paid: true, trial_extension_left: 7, monthly_share: "999.80", access: null, ...o,
});
const BUSINESSES = [
  biz({ id: 507, name: "Lahore Home Bakers", package_tier: "starter", status: "trial", trial: true, days_left: 1, setup_done: 2,
        last_message_at: null, live_numbers: 0, issues: ["No WhatsApp number yet.", "No knowledge added."], owner_name: "Saima Pervaiz",
        owner_phone: "923000000571", has_paid: false, monthly_share: null, access: { status: "requested", allowed_until: null } }),
  biz({ id: 504, name: "Bano's Boutique", package_tier: "starter", status: "trial_ended", trial: true, days_left: null, setup_done: 6,
        last_message_at: ago(60 * 80), issues: ["Trial ended 3 days ago. The AI is paused."], owner_name: "Bano Akhtar",
        owner_phone: "923000000541", has_paid: false, monthly_share: null, trial_extension_left: 4 }),
  biz({ id: 501, name: "Al-Noor Kiryana Store", days_left: 24, last_message_at: ago(12), live_numbers: 2, owner_name: "Bilal Ahmed",
        owner_phone: "923000000100" }),
  biz({ id: 508, name: "City Care Clinic", days_left: 27, last_message_at: ago(45), owner_name: "Dr. Kashif Mir", owner_phone: "923000000581" }),
  biz({ id: 509, name: "Punjab Paints & Hardware", package_tier: "starter", days_left: 9, last_message_at: ago(60 * 6), owner_name: "Rizwan Saleem",
        owner_phone: "923000000591", monthly_share: "599.80" }),
  biz({ id: 510, name: "Fresh Fruit Corner", package_tier: "starter", status: "trial", trial: true, days_left: 2, setup_done: 5,
        last_message_at: ago(60 * 2), owner_name: "Naveed Akram", owner_phone: "923000000510", has_paid: false, monthly_share: null,
        first_month_discount_percent: 10 }),
];

const handlers = [
  { path: "franchise/me", reply: () => ok({ id: 61, name: "Usman Tariq", territory: "Lahore", code: "usman-lhr",
    cities: [{ id: 1, name: "Lahore" }, { id: 8, name: "Kasur" }],
    trades: [{ id: 1, name: "Grocery / kiryana store" }, { id: 3, name: "General clinic" }, { id: 5, name: "Bakery & sweets" }, { id: 7, name: "Clothing boutique" }],
    phone: "923000000061", payout_details: "Meezan Bank · 0000-0000000-01", deal: DEAL }) },
  { path: "franchise/home", reply: () => ok({
    name: "Usman Tariq", territory: "Lahore, Kasur", code: "usman-lhr", deal: DEAL, currency: "PKR",
    earned_this_month: "4599.20", owed: "6200.00", paid_out: "18400.00", paying: 4, trial: 2, open_leads: 3,
    needs: [
      { company_id: 507, kind: "trial", name: "Lahore Home Bakers", phone: "923000000571", text: "Trial ends tomorrow and setup is 2 of 7." },
      { company_id: 504, kind: "expired", name: "Bano's Boutique", phone: "923000000541", text: "Trial ended 3 days ago. Help them pay to switch the AI back on." },
      { company_id: 510, kind: "setup", name: "Fresh Fruit Corner", phone: "923000000510", text: "Trial ends in 2 days. Their number isn't answering for a product yet." },
    ],
  }) },
  { path: "franchise/businesses", reply: () => ok(BUSINESSES) },
  { path: "franchise/trades", reply: () => ok([{ id: 1, name: "Grocery / kiryana store" }, { id: 3, name: "General clinic" }]) },
];

module.exports = { handlers };
