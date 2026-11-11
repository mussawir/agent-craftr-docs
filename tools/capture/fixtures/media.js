// Pictures served for media URLs (knowledge-base photos, payment screenshots, chat images).
// Simple SVG drawings, so nothing real and nothing downloaded.

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** A product photo stand-in: a coloured packet with its name. */
function packet(label, sub, bg, fg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg}" stop-opacity=".25"/><stop offset="1" stop-color="${bg}" stop-opacity=".55"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#g)"/>
  <ellipse cx="240" cy="318" rx="130" ry="14" fill="#000" opacity=".12"/>
  <rect x="150" y="60" width="180" height="250" rx="22" fill="${bg}"/>
  <rect x="150" y="60" width="180" height="46" rx="22" fill="#fff" opacity=".25"/>
  <circle cx="240" cy="170" r="46" fill="#fff" opacity=".9"/>
  <text x="240" y="182" text-anchor="middle" font-family="Segoe UI, Arial" font-size="34" font-weight="800" fill="${bg}">${esc(label.slice(0, 1))}</text>
  <text x="240" y="250" text-anchor="middle" font-family="Segoe UI, Arial" font-size="22" font-weight="800" fill="${fg}">${esc(label)}</text>
  <text x="240" y="278" text-anchor="middle" font-family="Segoe UI, Arial" font-size="16" fill="${fg}" opacity=".9">${esc(sub)}</text>
</svg>`;
}

/** A clinic picture stand-in. */
function scene(title, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="${bg}"/>
  <rect x="0" y="250" width="480" height="110" fill="#000" opacity=".08"/>
  <rect x="60" y="90" width="150" height="160" rx="10" fill="#fff" opacity=".85"/>
  <rect x="250" y="120" width="170" height="130" rx="10" fill="#fff" opacity=".6"/>
  <rect x="300" y="60" width="70" height="70" rx="35" fill="#fff" opacity=".9"/>
  <path d="M327 78h16v16h16v16h-16v16h-16v-16h-16v-16h16z" fill="#ef4444"/>
  <text x="240" y="312" text-anchor="middle" font-family="Segoe UI, Arial" font-size="24" font-weight="700" fill="#0f172a">${esc(title)}</text>
</svg>`;
}

/** A mobile banking "transfer successful" screenshot stand-in. */
function receipt(bank, amount, ref, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640">
  <rect width="360" height="640" fill="#f8fafc"/>
  <rect width="360" height="120" fill="${color}"/>
  <text x="180" y="70" text-anchor="middle" font-family="Segoe UI, Arial" font-size="26" font-weight="800" fill="#fff">${esc(bank)}</text>
  <circle cx="180" cy="190" r="44" fill="#22c55e"/>
  <path d="M160 190l14 14 28-30" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="180" y="270" text-anchor="middle" font-family="Segoe UI, Arial" font-size="20" fill="#334155">Transfer successful</text>
  <text x="180" y="320" text-anchor="middle" font-family="Segoe UI, Arial" font-size="38" font-weight="800" fill="#0f172a">${esc(amount)}</text>
  <text x="40" y="390" font-family="Segoe UI, Arial" font-size="16" fill="#64748b">To</text>
  <text x="320" y="390" text-anchor="end" font-family="Segoe UI, Arial" font-size="16" fill="#0f172a">Al-Noor Kiryana Store</text>
  <text x="40" y="430" font-family="Segoe UI, Arial" font-size="16" fill="#64748b">Reference</text>
  <text x="320" y="430" text-anchor="end" font-family="Segoe UI, Arial" font-size="16" fill="#0f172a">${esc(ref)}</text>
  <text x="40" y="470" font-family="Segoe UI, Arial" font-size="16" fill="#64748b">Date</text>
  <text x="320" y="470" text-anchor="end" font-family="Segoe UI, Arial" font-size="16" fill="#0f172a">11 Nov 2026</text>
</svg>`;
}

const PICTURES = {
  "rice.svg": () => packet("Basmati Rice", "Guard · 5 kg", "#b45309", "#fff"),
  "oil.svg": () => packet("Cooking Oil", "Dalda · 5 L", "#ca8a04", "#fff"),
  "atta.svg": () => packet("Chakki Atta", "Sunridge · 10 kg", "#15803d", "#fff"),
  "ration.svg": () => packet("Ration Pack", "Medium box", "#0369a1", "#fff"),
  "clinic-front.svg": () => scene("Clinic entrance", "#dbeafe"),
  "clinic-room.svg": () => scene("Check-up room", "#dcfce7"),
  "clinic-tour.svg": () => scene("Clinic tour video", "#ede9fe"),
};

function svgFor(path) {
  const name = path.split("/").pop();
  if (PICTURES[name]) return PICTURES[name]();
  const m = name.match(/proof-(\d+)/);
  if (m) {
    const n = Number(m[1]);
    const table = {
      71: ["Meezan Bank", "PKR 6,420", "MBL-2026111183421", "#7c3aed"],
      72: ["JazzCash", "PKR 2,780", "JC-88123904", "#dc2626"],
      73: ["Easypaisa", "PKR 1,500", "EP-55102877", "#16a34a"],
      68: ["HBL", "PKR 3,240", "HBL-7781023", "#0f766e"],
      66: ["Meezan Bank", "PKR 4,210", "MBL-2026111022918", "#7c3aed"],
      64: ["UBL", "PKR 1,200", "UBL-55120", "#1d4ed8"],
      3402: ["Meezan Bank", "PKR 6,420", "MBL-2026111183421", "#7c3aed"],
    }[n] || ["Bank", "PKR 1,000", "REF-0000", "#334155"];
    return receipt(...table);
  }
  return packet("Al-Noor", "Picture", "#16a34a", "#fff");
}

module.exports = { svgFor };
