// Signed-out pages: sign in, sign up, pricing.
const ok = (data) => ({ success: true, data });

const PACKAGES = [
  { tier: "starter", name: "Starter", seat_limit: 3, amount: 2999, price: "2999.00", currency: "PKR", symbol: "Rs" },
  { tier: "growth-pro", name: "Growth Pro", seat_limit: 10, amount: 4999, price: "4999.00", currency: "PKR", symbol: "Rs" },
  { tier: "enterprise-elite", name: "Enterprise Elite", seat_limit: null, amount: 7999, price: "7999.00", currency: "PKR", symbol: "Rs" },
];

const TRADES = [
  ["Grocery / kiryana store", "Grocery"], ["Pharmacy", "Health"], ["General clinic", "Health"], ["Dental clinic", "Health"],
  ["Bakery & sweets", "Food & drink"], ["Restaurant / home kitchen", "Food & drink"], ["Clothing boutique", "Shopping"],
  ["Mobile & electronics shop", "Shopping"], ["Salon & beauty", "Beauty"], ["Real estate agency", "Property"],
  ["Travel agency / Umrah & Hajj", "Travel"], ["School / academy", "Education"],
].map(([name, sector], i) => ({ id: i + 1, name, sector }));

const handlers = [
  { path: "packages", reply: () => ok(PACKAGES) },
  { path: "countries", reply: () => ok([{ code: "PK", name: "Pakistan", currency_code: "PKR" }]) },
  { path: "signup-options", reply: () => ok({ cities: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Kasur"], trades: TRADES }) },
];

module.exports = { handlers, PACKAGES, TRADES };
