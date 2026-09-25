import "./storage.js";
import React, { useState, useEffect } from "react";
import {
  ShoppingCart, Package, Plus, Minus, Check, Wallet, Star, BarChart3, LogIn, LogOut,
  UserPlus, Building2, ShieldCheck, CreditCard, Banknote, FileText, X, Clock, Trophy,
  Lock, Gift, Trash2, RotateCcw, Boxes, AlertTriangle, Truck, Scale, MessageSquare,
  Users, Send, Megaphone, ClipboardCheck, MapPin, Receipt, Image as ImageIcon,
  ChevronLeft, Search, Pencil, Save, Download, Paperclip, ClipboardList, Phone, Mail, Home, Bell, User, KeyRound, MessageCircle, Share2, Facebook
} from "lucide-react";

const C = {
  bg: "#EEF3F8", surface: "#FFFFFF", ink: "#0F1B2D", sub: "#5A6B80", line: "#DCE5EE",
  green: "#1E6FE0", greenDeep: "#0B2A63", greenSoft: "#E7F0FD",
  amber: "#C77D12", amberSoft: "#FBEFD9", plum: "#5B4BC4", plumSoft: "#ECEAFB",
  red: "#C0392B", redSoft: "#FBEAE8", blue: "#1E6FE0", blueSoft: "#E7F0FD",
};
const SH = "0 1px 2px rgba(20,45,30,.05), 0 4px 14px rgba(20,45,30,.05)";
const FONT = "'Rubik', 'Assistant', 'Segoe UI', system-ui, sans-serif";
const KEY = "vegapp:v12";
const SUPER_PW = "super";
const MANAGER_PW = "admin";
const LOGO_IMG = "data:image/jpeg;base64,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";
const MIN_ORDER = 5;
const LOW = 12;
const NIS = (n) => "₪" + (Math.round(n * 100) / 100).toLocaleString("he-IL");
const NUM = (n) => Math.round(n).toLocaleString("he-IL");
const bgStyle = (key, color, custom) => { if (key === "custom" && custom) return custom; switch (key) { case "white": return "#FFFFFF"; case "cream": return "#FBF7EE"; case "tint": return `linear-gradient(180deg, ${color}12, ${C.bg})`; default: return `radial-gradient(1100px 460px at 50% -10%, ${color}22, ${C.bg})`; } };
const shade = (hex) => { try { const n = parseInt(String(hex).slice(1), 16); let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; r = Math.round(r * 0.6); g = Math.round(g * 0.6); b = Math.round(b * 0.6); return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); } catch { return hex; } };
const KGL = (n) => (Math.round(n * 10) / 10).toLocaleString("he-IL") + ' ק"ג';
const monthKey = (d) => { const x = new Date(d); return x.getFullYear() + "-" + x.getMonth(); };
const nowMonth = monthKey(new Date());
const monthName = new Date().toLocaleDateString("he-IL", { month: "long", year: "numeric" });
const dayStr = (d) => new Date(d).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const PAY = { cash: { label: "מזומן", icon: Banknote }, credit: { label: "אשראי", icon: CreditCard }, check: { label: "צ'ק", icon: FileText } };
const STRUCTURES = ["עוסק פטור", "עוסק מורשה", "חברה בע\"מ"];
const CATEGORIES = ["מסעדה", "בית קפה", "מכולת / סופר", "קייטרינג", "מלון / צימר", "בר / פאב", "אחר"];
const ROLE_LABEL = { manager: "מנהל", client: "לקוח", agent: "סוכן", picker: "מלקט", driver: "נהג" };
const STATUS = {
  new: { label: "חדשה · לליקוט", color: C.amber, bg: C.amberSoft },
  picked: { label: "לוקטה · מוכנה למשלוח", color: C.blue, bg: C.blueSoft },
  assigned: { label: "הוצבה לנהג", color: C.plum, bg: C.plumSoft },
  collected: { label: "בדרך ללקוח", color: C.plum, bg: C.plumSoft },
  delivered: { label: "בוצעה", color: C.greenDeep, bg: C.greenSoft },
};

const defaultTiers = () => ([
  { id: "t0", points: 30, title: "מארז מתנה", detail: "", cost: 80 },
  { id: "t1", points: 100, title: "כרטיס אשראי טעון ₪550", detail: "", cost: 550 },
  { id: "t2", points: 250, title: "חופשה בארץ", detail: "", cost: 1200 },
  { id: "t3", points: 400, title: "חופשה באילת", detail: "", cost: 2500 },
  { id: "t4", points: 600, title: "חופשה בחו\"ל", detail: "", cost: 4500 },
]);
const supplierData = () => ({
  kgPerPoint: 10,
  periodMonths: 1,
  prizeTiers: [
    { id: "t0", points: 30, title: "מארז ירקות מתנה", detail: "מבחר טרי לבחירתך", cost: 80 },
    { id: "t1", points: 100, title: "כרטיס אשראי טעון ₪550", detail: "", cost: 550 },
    { id: "t2", points: 250, title: "חופשה בארץ (לא כולל אילת)", detail: "החודש: הכינרת", cost: 1200 },
    { id: "t3", points: 400, title: "חופשה באילת", detail: "החודש: מלון הרודס", cost: 2500 },
    { id: "t4", points: 600, title: "חופשה בחו\"ל", detail: "יעד מתחלף מדי חודש", cost: 4500 },
  ],
  products: [
    { id: "p1", name: "עגבניות", unit: "weight", cost: 2.2, price: 4.5, kg: 10, stock: 80, emoji: "🍅", img: "" },
    { id: "p2", name: "מלפפונים", unit: "weight", cost: 1.6, price: 3.8, kg: 10, stock: 65, emoji: "🥒", img: "" },
    { id: "p3", name: "בצל יבש", unit: "weight", cost: 1.1, price: 2.9, kg: 10, stock: 120, emoji: "🧅", img: "" },
    { id: "p4", name: "תפוחי אדמה", unit: "weight", cost: 1.3, price: 3.2, kg: 15, stock: 90, emoji: "🥔", img: "" },
    { id: "p5", name: "לימון", unit: "weight", cost: 3.0, price: 6.0, kg: 3, stock: 30, emoji: "🍋", img: "", cat: "פירות" },
    { id: "p6", name: "פלפל אדום", unit: "weight", cost: 5.5, price: 8.5, kg: 8, stock: 9, emoji: "🫑", img: "" },
    { id: "p7", name: "חסה", unit: "carton", cost: 2.8, price: 5.0, kg: 5, units: 12, stock: 40, emoji: "🥬", img: "" },
    { id: "p8", name: "כרובית", unit: "carton", cost: 2.5, price: 4.5, kg: 8, units: 8, stock: 22, emoji: "🥦", img: "" },
    { id: "p9", name: "גזר", unit: "weight", cost: 1.5, price: 3.4, kg: 10, stock: 70, emoji: "🥕", img: "" },
  ],
  clients: [
    { id: "c1", name: "מסעדת הגן", contact: "יוסי לוי", phone: "050-1234567", address: "הרצל 15, תל אביב", email: "gan@demo.co.il", password: "1234", taxId: "514112233", structure: "חברה בע\"מ", category: "מסעדה", pay: "check", status: "active", target: 40, docs: ["תעודת התאגדות.pdf", "מורשה חתימה.pdf"], createdAt: Date.now() - 86400000 * 40 },
    { id: "c2", name: "מכולת שלי", contact: "רונית כהן", phone: "052-7654321", address: "שדרות ירושלים 40, בת ים", email: "makolet@demo.co.il", password: "1234", taxId: "039221144", structure: "עוסק מורשה", category: "מכולת / סופר", pay: "cash", status: "active", target: 25, docs: ["עוסק מורשה.pdf"], createdAt: Date.now() - 86400000 * 30 },
    { id: "c3", name: "קפה נועה", contact: "נועה בר", phone: "054-1112223", address: "הבנים 3, רמת גן", email: "noa@demo.co.il", password: "1234", taxId: "058993311", structure: "עוסק פטור", category: "בית קפה", pay: "credit", status: "active", target: 15, docs: [], createdAt: Date.now() - 86400000 * 20 },
    { id: "cP", name: "פיצה רומא", contact: "מריו רוסי", phone: "050-9998887", address: "ויצמן 8, גבעתיים", email: "pizza@demo.co.il", password: "1234", taxId: "515667788", structure: "חברה בע\"מ", category: "מסעדה", pay: "credit", status: "pending", target: 20, docs: ["ת.ז מורשה חתימה.jpg"], createdAt: Date.now() - 3600000 * 5 },
  ],
  staff: [
    { id: "a1", role: "agent", name: "דנה (סוכנת)", email: "agent@demo.co.il", password: "1234" },
    { id: "k1", role: "picker", name: "משה (מלקט)", email: "picker@demo.co.il", password: "1234" },
    { id: "d1", role: "driver", name: "עמית (נהג)", email: "driver@demo.co.il", password: "1234", roles: ["picker"] },
  ],
  orders: [
    { id: "1024", clientId: "c1", date: Date.now() - 86400000 * 6, status: "delivered", driverId: "d1", paid: true, pickedBy: "משה (מלקט)", items: [{ pid: "p1", cartons: 40, actualKg: 402 }, { pid: "p6", cartons: 30, actualKg: 238 }] },
    { id: "1031", clientId: "c1", date: Date.now() - 86400000 * 2, status: "delivered", driverId: "d1", paid: false, pickedBy: "משה (מלקט)", items: [{ pid: "p2", cartons: 35, actualKg: 351 }, { pid: "p7", cartons: 20 }] },
    { id: "1038", clientId: "c2", date: Date.now() - 86400000 * 1, status: "picked", paid: false, pickedBy: "משה (מלקט)", items: [{ pid: "p4", cartons: 40, actualKg: 611 }, { pid: "p9", cartons: 20, actualKg: 198 }] },
    { id: "1042", clientId: "c3", date: Date.now() - 3600000 * 3, status: "new", paid: false, items: [{ pid: "p1", cartons: 6 }, { pid: "p5", cartons: 4 }] },
    { id: "1043", clientId: "c2", date: Date.now() - 3600000 * 1, status: "new", paid: false, items: [{ pid: "p3", cartons: 8 }, { pid: "p8", cartons: 3 }] },
  ],
  messages: [
    { id: "m1", clientId: "c1", fromRole: "client", fromName: "מסעדת הגן", text: "אפשר להוסיף ארגז עגבניות למחר?", ts: Date.now() - 3600000 * 4 },
    { id: "m2", clientId: "c1", fromRole: "agent", fromName: "דנה (סוכנת)", text: "בטח, הוספתי 🙂", ts: Date.now() - 3600000 * 3.5 },
  ],
  broadcasts: [{ id: "b1", text: "מבצע השבוע: 10% הנחה על פלפל אדום! 🫑", ts: Date.now() - 86400000 }],
});

const secondSupplier = () => ({ id: "s2", name: "מאפיית הבוקר", category: "מאפייה ולחמים", regions: "ירושלים, שפלה, מרכז", status: "active", biz: { taxId: "302998877", address: "יפו 100, ירושלים", phone: "02-5559876", email: "" }, invoiceSeq: 2000, owner: { email: "admin@boker.co.il", password: "1234", contact: "בעל המאפייה", phone: "02-0000000" }, brand: { logo: LOGO_IMG, tagline: "טרי מהתנור כל בוקר", color: "#B4791F", borderW: 2.5 }, cats: ["מאפים", "חד פעמי"], features: { prizes: true, chat: true, minOrder: 5 }, kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(), products: [ { id: "b1", name: "לחמניות", unit: "carton", cost: 0.8, price: 1.6, kg: 4, units: 24, stock: 50, emoji: "🥐", img: "" }, { id: "b2", name: "חלות", unit: "carton", cost: 6, price: 12, kg: 6, units: 6, stock: 30, emoji: "🍞", img: "" }, { id: "b3", name: "בורקסים", unit: "carton", cost: 2, price: 4, kg: 5, units: 12, stock: 40, emoji: "🥧", img: "" }, { id: "b4", name: "עוגיות", unit: "weight", cost: 15, price: 28, kg: 2, stock: 25, emoji: "🍪", img: "" }, { id: "b5", name: "כלים חד פעמי", unit: "carton", cost: 20, price: 38, kg: 3, units: 100, stock: 40, emoji: "🥡", img: "", cat: "חד פעמי" } ], clients: [ { id: "c1b", name: "מסעדת הגן", contact: "יוסי לוי", phone: "050-1234567", address: "הרצל 15, תל אביב", email: "gan@demo.co.il", password: "1234", taxId: "514112233", structure: "עוסק מורשה", category: "מסעדה", pay: "credit", status: "active", target: 15, docs: [], createdAt: Date.now() - 86400000 * 10 } ], staff: [], orders: [], messages: [], broadcasts: [] });
const demoSupplier = () => { const now = Date.now(); const id = "demo" + now; return {
  id, name: "ספק הדגמה", category: "ירקות ופירות", regions: "מרכז, השרון", status: "active",
  biz: { taxId: "500000000", address: "רחוב הדוגמה 1, תל אביב", phone: "03-0000000", email: "" },
  invoiceSeq: 5000,
  owner: { email: "demo-" + now + "@b2bplus.co.il", password: "1234", contact: "מנהל הדגמה", phone: "050-0000000" },
  brand: { logo: LOGO_IMG, tagline: "הדגמה — כך תיראה החנות שלך", color: "#1E6FE0", borderW: 2.5 },
  cats: ["ירקות", "פירות"], features: { prizes: true, chat: true, minOrder: 5 }, kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(),
  products: [
    { id: "dp1", name: "עגבניות", unit: "weight", cost: 3, price: 6.5, kg: 10, stock: 60, emoji: "🍅", img: "", cat: "ירקות" },
    { id: "dp2", name: "מלפפונים", unit: "weight", cost: 2.5, price: 5.5, kg: 8, stock: 45, emoji: "🥒", img: "", cat: "ירקות" },
    { id: "dp3", name: "פלפל אדום", unit: "weight", cost: 5, price: 9, kg: 6, stock: 30, emoji: "🫑", img: "", cat: "ירקות" },
    { id: "dp4", name: "תפוחים", unit: "weight", cost: 4, price: 7.5, kg: 12, stock: 50, emoji: "🍎", img: "", cat: "פירות" },
    { id: "dp5", name: "בננות", unit: "weight", cost: 4.5, price: 8, kg: 10, stock: 40, emoji: "🍌", img: "", cat: "פירות" },
    { id: "dp6", name: "לימונים", unit: "weight", cost: 3, price: 6, kg: 5, stock: 25, emoji: "🍋", img: "", cat: "פירות" },
  ],
  clients: [
    { id: "dc1", name: "מסעדת הדגמה", contact: "דנה כהן", phone: "050-1111111", address: "דיזנגוף 100, תל אביב", email: "demo-rest-" + now + "@demo.co.il", password: "1234", taxId: "514000001", structure: "עוסק מורשה", category: "מסעדה", pay: "credit", status: "active", target: 20, docs: [], createdAt: now - 86400000 * 8 },
    { id: "dc2", name: "בית קפה לדוגמה", contact: "רון לוי", phone: "050-2222222", address: "אלנבי 50, תל אביב", email: "demo-cafe-" + now + "@demo.co.il", password: "1234", taxId: "514000002", structure: "חברה בעמ", category: "בית קפה", pay: "cash", status: "active", target: 12, docs: [], createdAt: now - 86400000 * 5 },
    { id: "dc3", name: "קייטרינג (ממתין לאישור)", contact: "שירה אזולאי", phone: "050-3333333", address: "הרצליה", email: "demo-inst-" + now + "@demo.co.il", password: "1234", taxId: "514000003", structure: "עוסק מורשה", category: "קייטרינג", pay: "check", status: "pending", target: 30, docs: ["רישיון עסק"], createdAt: now - 86400000 },
  ],
  staff: [
    { id: "dk1", role: "picker", name: "מלקט הדגמה", email: "demo-pick-" + now + "@b2bplus.co.il", password: "1234" },
    { id: "dd1", role: "driver", name: "נהג הדגמה", email: "demo-drive-" + now + "@b2bplus.co.il", password: "1234" },
    { id: "da1", role: "agent", name: "סוכן הדגמה", email: "demo-agent-" + now + "@b2bplus.co.il", password: "1234" },
  ],
  orders: [
    { id: "D" + (now % 100000) + "1", clientId: "dc1", date: now - 86400000 * 2, status: "delivered", driverId: "dd1", paid: true, pickedBy: "מלקט הדגמה", invNo: 5001, items: [{ pid: "dp1", cartons: 5, supplied: 5, actualKg: 52 }, { pid: "dp4", cartons: 3, supplied: 3, actualKg: 34 }] },
    { id: "D" + (now % 100000) + "2", clientId: "dc2", date: now - 3600000 * 5, status: "picked", pickedBy: "מלקט הדגמה", invNo: 5002, items: [{ pid: "dp2", cartons: 4, supplied: 4, actualKg: 31 }] },
    { id: "D" + (now % 100000) + "3", clientId: "dc1", date: now - 3600000 * 2, status: "new", items: [{ pid: "dp3", cartons: 2 }, { pid: "dp5", cartons: 3 }] },
  ],
  messages: [], broadcasts: [{ id: "db1", text: "ברוכים הבאים לחנות ההדגמה של B2B+ 🎉", ts: now - 3600000 * 24 }],
}; };
const seed = () => ({
  superPw: SUPER_PW,
  superAgents: [{ id: "sa1", role: "superagent", name: "תמיכה B2B+", email: "support@b2bplus.co.il", password: "1234" }],
  suppliers: [{ id: "s1", name: "שיווק השדה", category: "ירקות ופירות טריים", regions: "מרכז, השרון, תל אביב", status: "active", biz: { taxId: "515123456", address: "המסגר 20, תל אביב", phone: "03-5551234", email: "billing@sadeh.co.il" }, invoiceSeq: 1000, owner: { email: "admin@sadeh.co.il", password: "1234", contact: "בעל העסק", phone: "050-0000000" }, brand: { logo: LOGO_IMG, tagline: "ירקות ופירות טריים לעסקים", color: "#1F7A4D", borderW: 2.5 }, cats: ["ירקות", "פירות"], features: { prizes: true, chat: true, minOrder: 5 }, ...supplierData() }, secondSupplier()],
});

function useAppState() {
  const [state, setState] = useState(null);
  const lastSaveRef = React.useRef(0);
  useEffect(() => { let live = true; (async () => { try { const r = await window.storage.get(KEY); if (live) setState(r && r.value ? JSON.parse(r.value) : seed()); } catch { if (live) setState(seed()); } })(); return () => { live = false; }; }, []);
  useEffect(() => { if (!state) return; lastSaveRef.current = Date.now(); (async () => { try { await window.storage.set(KEY, JSON.stringify(state)); } catch {} })(); }, [state]);
  // סנכרון בין מכשירים: כשחוזרים לאפליקציה, טוענים מחדש את המצב העדכני מהענן
  useEffect(() => {
    const reload = async () => { if (Date.now() - lastSaveRef.current < 3000) return; try { const r = await window.storage.get(KEY); if (r && r.value) { const remote = JSON.parse(r.value); setState((cur) => JSON.stringify(cur) === r.value ? cur : remote); } } catch {} };
    const onVis = () => { if (document.visibilityState === "visible") reload(); };
    window.addEventListener("focus", reload); document.addEventListener("visibilitychange", onVis);
    const iv = setInterval(() => { if (document.visibilityState === "visible") reload(); }, 25000);
    return () => { window.removeEventListener("focus", reload); document.removeEventListener("visibilitychange", onVis); clearInterval(iv); };
  }, []);
  return [state, setState];
}

/* helpers */
const VAT = 0.18;
const noPrice = (p) => !!p.noPrice || !(p.price > 0);
const cartonPrice = (p) => p.price * p.kg;
// מחיר קרטון כולל מע"מ אם המוצר מוגדר "לא כולל מע"מ"
const cartonPriceGross = (p) => cartonPrice(p) * (p.vatIncluded === false ? (1 + VAT) : 1);
const suppliedOf = (it) => it.supplied != null ? it.supplied : it.cartons;
const shortageOf = (it) => Math.max(0, it.cartons - suppliedOf(it));
const hasShortage = (o) => o.items.some((it) => shortageOf(it) > 0);
const lineKg = (it, p) => p.unit === "carton" ? suppliedOf(it) * p.kg : (it.actualKg != null ? it.actualKg : suppliedOf(it) * p.kg);
const lineUnitGross = (p) => p.unit === "carton" ? cartonPriceGross(p) : (p.price * (p.vatIncluded === false ? (1 + VAT) : 1));
const lineTotal = (it, p) => noPrice(p) ? 0 : (p.unit === "carton" ? suppliedOf(it) * cartonPriceGross(p) : lineKg(it, p) * (p.price * (p.vatIncluded === false ? (1 + VAT) : 1)));
const lineProfit = (it, p) => lineKg(it, p) * (p.price - p.cost);
const orderCartons = (o) => o.items.reduce((s, it) => s + it.cartons, 0);
const orderKgEff = (o, ps) => o.items.reduce((s, it) => { const p = ps.find((x) => x.id === it.pid); return s + (p ? lineKg(it, p) : 0); }, 0);
const orderTotal = (o, ps) => o.items.reduce((s, it) => { const p = ps.find((x) => x.id === it.pid); return s + (p ? lineTotal(it, p) : 0); }, 0);
const orderProfit = (o, ps) => o.items.reduce((s, it) => { const p = ps.find((x) => x.id === it.pid); return s + (p ? lineProfit(it, p) : 0); }, 0);
const monthOrdersOf = (cid, orders) => orders.filter((o) => o.clientId === cid && monthKey(o.date) === nowMonth);
const monthKgOf = (cid, orders, ps) => monthOrdersOf(cid, orders).reduce((s, o) => s + orderKgEff(o, ps), 0);
const periodStartMs = (pm) => { const n = new Date(); const m = pm === 2 ? Math.floor(n.getMonth() / 2) * 2 : n.getMonth(); return new Date(n.getFullYear(), m, 1).getTime(); };
const periodLabel = (pm) => { const st = new Date(periodStartMs(pm)); if (pm === 2) { const e = new Date(st.getFullYear(), st.getMonth() + 1, 1); return st.toLocaleDateString("he-IL", { month: "long" }) + "–" + e.toLocaleDateString("he-IL", { month: "long", year: "numeric" }); } return st.toLocaleDateString("he-IL", { month: "long", year: "numeric" }); };
const periodKgOf = (cid, orders, ps, pm) => orders.filter((o) => o.clientId === cid && o.date >= periodStartMs(pm)).reduce((s, o) => s + orderKgEff(o, ps), 0);
const pointsOf = (cid, orders, ps, kgpp, pm = 1) => Math.floor(periodKgOf(cid, orders, ps, pm) / kgpp);
const outstandingOf = (cid, orders, ps) => orders.filter((o) => o.clientId === cid && o.status === "delivered" && !o.paid).reduce((s, o) => s + orderTotal(o, ps), 0);
const hasRole = (u, role) => u.role === role || (u.roles || []).includes(role);
const sortTiers = (t) => [...t].sort((a, b) => a.points - b.points);
const reachedTier = (pts, tiers) => sortTiers(tiers).filter((t) => pts >= t.points).pop() || null;
const nextTier = (pts, tiers) => sortTiers(tiers).find((t) => t.points > pts) || null;

function Logo({ size = 42, light = false, sub = false, wordmark = false, img, name, tagline }) {
  const src = img || LOGO_IMG;
  const nm = name || "B2B+";
  const tg = tagline || "ממשק הזמנות מהספק לעסק";
  const image = <img src={src} alt={nm} style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), objectFit: "cover", display: "block", boxShadow: light ? "0 2px 6px rgba(0,0,0,.18)" : "0 3px 12px rgba(18,74,43,.16)" }} />;
  if (!wordmark) return image;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {image}
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontWeight: 800, fontSize: Math.round(size * 0.46), color: light ? "#fff" : C.greenDeep, letterSpacing: "-0.5px" }}>{nm}</div>
        {sub && <div style={{ fontSize: Math.round(size * 0.24), color: light ? "rgba(255,255,255,.82)" : C.sub, fontWeight: 600, marginTop: 4 }}>{tg}</div>}
      </div>
    </div>
  );
}

function FontLoader({ font }) {
  useEffect(() => { if (!font || font === "Rubik") return; const id = "gf-" + font.replace(/\s+/g, ""); if (document.getElementById(id)) return; const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + font.replace(/\s+/g, "+") + ":wght@400;600;700;800&display=swap"; document.head.appendChild(l); }, [font]);
  return null;
}
export default function App() {
  const [state, setState] = useAppState();
  const [session, setSession] = useState({ kind: "none" });
  const [saved, setSaved] = useState(false);
  const [storeId] = useState(() => { try { return new URL(window.location.href).searchParams.get("store"); } catch { return null; } });
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => { if (!document.getElementById("ff-rubik")) { const l = document.createElement("link"); l.id = "ff-rubik"; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap"; document.head.appendChild(l); } if (!document.getElementById("tp-css")) { const st = document.createElement("style"); st.id = "tp-css"; st.textContent = ".tp-2col{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:20px}.tp-2eq{grid-template-columns:1fr 1fr}.tp-staff{grid-template-columns:1fr 1fr 1fr 1fr auto}@media(max-width:760px){.tp-2col{grid-template-columns:1fr}.tp-staff{grid-template-columns:1fr 1fr}}@media(max-width:560px){.tp-2eq{grid-template-columns:1fr}}"; document.head.appendChild(st); } }, []);
  if (!state) return <div dir="rtl" style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.sub }}>טוען…</div>;
  if (session.kind === "none") { const storeSup = storeId ? state.suppliers.find((x) => x.id === storeId && x.status === "active") : null; return storeSup ? <StorePage supplier={storeSup} state={state} setState={setState} onLogin={setSession} /> : <AuthScreen state={state} setState={setState} onLogin={setSession} />; }
  const save = async () => { try { await window.storage.set(KEY, JSON.stringify(state)); } catch {} setSaved(true); setTimeout(() => setSaved(false), 1600); };
  const isSuper = session.kind === "super";
  const isAgent = session.kind === "superagent";
  const isHub = session.kind === "client" && !session.supplierId;
  const sup = (isSuper || isAgent || isHub) ? null : state.suppliers.find((x) => x.id === session.supplierId);
  if (!isSuper && !isAgent && !isHub && !sup) return <AuthScreen state={state} setState={setState} onLogin={setSession} />;
  const scopedSet = (u) => setState((root) => ({ ...root, suppliers: root.suppliers.map((s) => s.id === session.supplierId ? (typeof u === "function" ? u(s) : u) : s) }));
  const clientRec = (session.kind === "client" && sup) ? sup.clients.find((c) => c.email.trim().toLowerCase() === (session.email || "").trim().toLowerCase()) : null;
  const joinSupplier = (supId) => setState((root) => { let prof = null; for (const sp of root.suppliers) { const c = sp.clients.find((x) => x.email.trim().toLowerCase() === (session.email || "").trim().toLowerCase()); if (c) prof = c; } if (!prof) return root; const tgt = root.suppliers.find((x) => x.id === supId); if (tgt && tgt.clients.some((c) => c.email.trim().toLowerCase() === session.email.trim().toLowerCase())) return root; const { id, readBc, ...rest } = prof; const nc = { ...rest, id: "c" + Date.now(), status: "pending", createdAt: Date.now() }; return { ...root, suppliers: root.suppliers.map((sp) => sp.id === supId ? { ...sp, clients: [...sp.clients, nc] } : sp) }; });
  const me = isSuper ? { name: "מנהל-על" } : isAgent ? { name: "סוכן-על" } : isHub ? { name: "העסק שלי" } : session.kind === "supplier" ? { name: sup.name } : session.kind === "client" ? clientRec : (sup ? sup.staff.find((s) => s.id === session.userId) : null);
  const title = isSuper ? "פיקוח על כל הספקים" : isAgent ? "ניהול ותמיכה" : isHub ? "הספקים שלי" : session.kind === "supplier" ? "ניהול החנות" : (ROLE_LABEL[session.kind] || "") + " · " + (me ? me.name : "");
  const supNewOrders = session.kind === "supplier" && sup ? sup.orders.filter((o) => o.status === "new").length : 0;
  const supUnreadMsgs = session.kind === "supplier" && sup ? sup.messages.filter((m) => m.fromRole === "client" && !m.readBySup).length : 0;
  const supAlerts = supNewOrders + supUnreadMsgs;
  const bizRec = session.kind === "client" ? (state.suppliers.map((sp) => sp.clients.find((c) => c.email.trim().toLowerCase() === (session.email || "").trim().toLowerCase())).find(Boolean) || null) : null;
  const staffRoles = (me && me.role) ? [me.role, ...((me.roles) || [])].filter((v, i, a) => a.indexOf(v) === i) : [];
  const isStaffView = ["picker", "driver", "agent"].includes(session.kind);
  const headerBg = sup && sup.brand && sup.brand.color ? `linear-gradient(100deg, ${shade(sup.brand.color)}, ${sup.brand.color})` : `linear-gradient(100deg, ${C.greenDeep}, #1E6FE0)`;
  const themeFont = (sup && sup.brand && sup.brand.font) || "Rubik";
  const themeScale = Math.min(1.15, (sup && sup.brand && sup.brand.fontScale) || 1);
  const clientThemed = sup && (session.kind === "client");
  const themed2 = sup && (session.kind === "client" || session.kind === "supplier");
  const pageBg = themed2 ? bgStyle((sup.brand && sup.brand.bg) || "soft", (sup.brand && sup.brand.color) || C.green, sup.brand && sup.brand.bgColor) : C.bg;
  const themeFontColor = (sup && sup.brand && sup.brand.fontColor) || C.ink;
  const pageFont = themed2 ? `'${themeFont}', ${FONT}` : FONT;

  return (
    <div dir="rtl" style={{ background: pageBg, minHeight: "100vh", color: C.ink, fontFamily: pageFont }}>
      <div style={{ background: headerBg, color: "#fff", boxShadow: "0 2px 12px rgba(18,74,43,.18)", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <Logo size={32} light wordmark img={isHub && bizRec ? bizRec.logo : (sup && sup.brand && sup.brand.logo)} name={isHub ? (bizRec ? bizRec.name : "העסק שלי") : (sup ? sup.name : (isAgent ? "סוכן-על" : "מנהל-על"))} />
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 13.5, opacity: .92, fontWeight: 600 }}>{title}</span>
          {session.kind === "client" && session.supplierId && <button onClick={() => setSession({ kind: "client", email: session.email, pw: session.pw })} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><Building2 size={15} /> הספקים שלי</button>}
          <button onClick={() => setShowProfile(true)} title="הפרופיל שלי" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><User size={16} /></button>
          {session.kind === "supplier" && supAlerts > 0 && <div title="עדכונים חדשים" style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", borderRadius: 9, padding: "8px 12px", fontSize: 14, fontWeight: 700 }}><Bell size={16} /><span style={{ background: C.amber, color: "#fff", borderRadius: 20, fontSize: 11, padding: "1px 7px", fontWeight: 800 }}>{supAlerts}</span></div>}
          <button onClick={save} style={{ display: "flex", alignItems: "center", gap: 6, background: saved ? "#fff" : "rgba(255,255,255,.16)", color: saved ? C.greenDeep : "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{saved ? <Check size={15} /> : <Save size={15} />}{saved ? "נשמר" : "שמור"}</button>
          <button onClick={() => setSession(session.asSuper ? { kind: session.from || "super" } : { kind: "none" })} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><LogOut size={15} /> {session.asSuper ? "חזרה למנהל-על" : "יציאה"}</button>
        </div>
      </div>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "20px 20px 60px" }}>
        {isSuper && <SuperAdminView state={state} setState={setState} onEnter={(sid) => setSession({ kind: "supplier", supplierId: sid, asSuper: true, from: "super" })} />}
        {isAgent && <SuperAdminView state={state} setState={setState} agentMode onEnter={(sid) => setSession({ kind: "supplier", supplierId: sid, asSuper: true, from: "superagent" })} />}
        {isHub && <BusinessHub state={state} setState={setState} email={session.email} onEnter={(sid) => setSession({ ...session, supplierId: sid })} onJoin={joinSupplier} />}
        {session.kind === "supplier" && <><FontLoader font={themeFont} /><ManagerView state={sup} setState={scopedSet} /></>}
        {session.kind === "client" && sup && clientRec && <div style={{ zoom: themeScale, color: themeFontColor }}><FontLoader font={themeFont} /><ClientView state={sup} setState={scopedSet} clientId={clientRec.id} /></div>}
        {isStaffView && staffRoles.length > 1 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 14, padding: 10, boxShadow: SH }}>
            <span style={{ fontSize: 13, color: C.sub, fontWeight: 700, alignSelf: "center", marginInlineEnd: 4 }}>התפקידים שלי:</span>
            {staffRoles.map((r) => { const on = session.kind === r; return <button key={r} onClick={() => setSession({ ...session, kind: r })} style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 13.5, padding: "8px 16px", borderRadius: 10, cursor: "pointer" }}>{ROLE_LABEL[r]}</button>; })}
          </div>
        )}
        {session.kind === "picker" && <PickerView state={sup} setState={scopedSet} me={me} />}
        {session.kind === "driver" && <DriverView state={sup} setState={scopedSet} me={me} />}
        {session.kind === "agent" && <AgentView state={sup} setState={scopedSet} me={me} />}
      </div>
      {showProfile && <ProfileModal session={session} state={state} setState={setState} sup={sup} onClose={() => setShowProfile(false)} onLoggedOut={() => { setShowProfile(false); setSession({ kind: "none" }); }} />}
    </div>
  );
}

/* ============ AUTH ============ */
function AuthScreen({ state, setState, onLogin }) {
  const [mode, setMode] = useState("menu");
  return (
    <div dir="rtl" style={{ minHeight: "100vh", color: C.ink, fontFamily: FONT, display: "flex", flexDirection: "column", alignItems: "center", padding: "44px 16px", background: `radial-gradient(1200px 500px at 50% -8%, ${C.greenSoft}, ${C.bg})` }}>
      <div style={{ marginBottom: 12 }}><Logo size={122} /></div>
      <div style={{ color: C.blue, fontWeight: 800, fontSize: 16, marginBottom: 4 }}>B2B+ Marketplace</div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 22 }}>ממשק הזמנות מהספק לעסק · כל ספק, החנות שלו</div>
      {mode === "menu" && (
        <div style={{ width: "100%", maxWidth: 380, display: "grid", gap: 12 }}>
          <BigBtn icon={<LogIn size={18} />} onClick={() => setMode("login")} primary>התחברות</BigBtn>
          <BigBtn icon={<Building2 size={18} />} onClick={() => setMode("supreg")}>הרשמת ספק חדש</BigBtn>
          <BigBtn icon={<UserPlus size={18} />} onClick={() => setMode("register")}>הרשמת עסק (לקוח)</BigBtn>
        </div>
      )}
      {mode === "login" && <LoginForm state={state} onLogin={onLogin} back={() => setMode("menu")} onForgot={() => setMode("forgot")} />}
      {mode === "forgot" && <ForgotForm state={state} back={() => setMode("login")} />}
      {mode === "supreg" && <SupplierRegister state={state} setState={setState} back={() => setMode("menu")} />}
      {mode === "register" && <RegisterForm state={state} setState={setState} back={() => setMode("menu")} />}
    </div>
  );
}
function SupplierRegister({ state, setState, back, byAdmin, onDone }) {
  const [f, setF] = useState({ name: "", category: "", regions: "", contact: "", phone: "", email: "", password: "" });
  const [err, setErr] = useState(""); const [done, setDone] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const submit = () => {
    if (!f.name || !f.email || !f.password) return setErr("שם, אימייל וסיסמה חובה");
    const em = f.email.trim().toLowerCase();
    if (state.suppliers.some((sp) => sp.owner && sp.owner.email.trim().toLowerCase() === em)) return setErr("אימייל זה כבר רשום כספק");
    const sup = { id: "s" + Date.now(), name: f.name, category: f.category || "כללי", regions: f.regions || "", status: byAdmin ? "active" : "pending", owner: { email: f.email, password: f.password, contact: f.contact, phone: f.phone }, brand: { logo: LOGO_IMG, tagline: "", color: "#1F7A4D" }, biz: { taxId: "", address: "", phone: f.phone || "", email: f.email || "" }, cats: [], invoiceSeq: 1000, features: { prizes: true, chat: true, minOrder: 5 }, kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(), products: [], clients: [], staff: [], orders: [], messages: [], broadcasts: [] };
    setState((root) => ({ ...root, suppliers: [...root.suppliers, sup] }));
    if (byAdmin && onDone) return onDone();
    setDone(true);
  };
  if (done) return (<Card title="הבקשה נשלחה" back={back}><div style={{ textAlign: "center", padding: "10px 0" }}><div style={{ width: 54, height: 54, borderRadius: "50%", background: C.amberSoft, color: C.amber, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Clock size={26} /></div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>תודה, {f.name}!</div><div style={{ fontSize: 14, color: C.sub, lineHeight: 1.6 }}>הבקשה ממתינה לאישור מנהל-על. לאחר האישור תוכל להתחבר ולהקים את החנות שלך.</div></div><SubmitBtn onClick={back}>חזרה</SubmitBtn></Card>);
  const body = (
    <>
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם החנות / הספק *" value={f.name} onChange={set("name")} />
        <Field label="קטגוריה" value={f.category} onChange={set("category")} placeholder="ירקות ופירות / מאפייה / בשרים" />
        <Field label="אזורי עבודה" value={f.regions} onChange={set("regions")} placeholder="מרכז, השרון, ירושלים" />
        <Field label="איש קשר" value={f.contact} onChange={set("contact")} />
        <Field label="טלפון" value={f.phone} onChange={set("phone")} />
        <Field label="אימייל (לכניסה) *" value={f.email} onChange={set("email")} />
        <Field label="סיסמה *" type="password" value={f.password} onChange={set("password")} />
      </div>
      {err && <ErrBox>{err}</ErrBox>}<SubmitBtn onClick={submit}>{byAdmin ? "הוסף ספק" : "שליחת בקשה למנהל-על"}</SubmitBtn>
    </>
  );
  return byAdmin ? body : <Card title="הרשמת ספק חדש" back={back} wide>{body}</Card>;
}
function SuperAdminView({ state, setState, onEnter, agentMode }) {
  const [add, setAdd] = useState(false); const [sf, setSf] = useState({ name: "", email: "", password: "" }); const [saErr, setSaErr] = useState("");
  const addAgent = () => { if (!sf.name || !sf.email || !sf.password) return setSaErr("שם, אימייל וסיסמה חובה"); if ((state.superAgents || []).some((a) => a.email.trim().toLowerCase() === sf.email.trim().toLowerCase())) return setSaErr("אימייל כבר קיים"); setState((r) => ({ ...r, superAgents: [...(r.superAgents || []), { id: "sa" + Date.now(), role: "superagent", ...sf }] })); setSf({ name: "", email: "", password: "" }); setSaErr(""); };
  const delAgent = (id) => setState((r) => ({ ...r, superAgents: (r.superAgents || []).filter((a) => a.id !== id) }));
  const hasDemo = (state.suppliers || []).some((x) => x.id.indexOf("demo") === 0);
  const createDemo = () => { const d = demoSupplier(); setState((r) => ({ ...r, suppliers: [...r.suppliers, d] })); if (onEnter) onEnter(d.id); };
  const resetDemo = () => setState((r) => ({ ...r, suppliers: r.suppliers.filter((x) => x.id.indexOf("demo") !== 0) }));
  const suppliers = state.suppliers;
  const pending = suppliers.filter((x) => x.status === "pending");
  const active = suppliers.filter((x) => x.status === "active");
  const totalOrders = active.reduce((n, s) => n + s.orders.length, 0);
  const totalClients = active.reduce((n, s) => n + s.clients.filter((c) => c.status === "active").length, 0);
  const totalRevenue = active.reduce((n, s) => n + s.orders.reduce((a, o) => a + orderTotal(o, s.products), 0), 0);
  const approve = (id) => setState((r) => ({ ...r, suppliers: r.suppliers.map((s) => s.id === id ? { ...s, status: "active" } : s) }));
  const reject = (id) => setState((r) => ({ ...r, suppliers: r.suppliers.filter((s) => s.id !== id) }));
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
        <Kpi icon={<Building2 size={18} />} label="ספקים פעילים" value={active.length} tone="green" />
        <Kpi icon={<Clock size={18} />} label="ממתינים לאישור" value={pending.length} tone="amber" />
        <Kpi icon={<ClipboardList size={18} />} label={'סה"כ הזמנות'} value={totalOrders} tone="blue" />
        <Kpi icon={<Wallet size={18} />} label={'סה"כ הכנסות'} value={NIS(totalRevenue)} tone="green" />
      </div>
      {pending.length > 0 && (
        <Panel style={{ borderColor: "#E4D3A8", background: "#FFFDF6", boxShadow: SH }}>
          <SectionTitle icon={<Clock size={18} />} extra={<Badge tone="amber">{pending.length}</Badge>}>בקשות הרשמת ספקים</SectionTitle>
          <div style={{ display: "grid", gap: 10 }}>{pending.map((sp) => (
            <div key={sp.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, background: "#fff", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 200 }}><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 13, color: C.sub }}>{sp.category} · {sp.owner.contact} · {sp.owner.email}</div></div>
              <div style={{ display: "flex", gap: 8 }}><button onClick={() => approve(sp.id)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "9px 16px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><Check size={16} /> אשר</button><button onClick={() => reject(sp.id)} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.red, fontWeight: 700, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><X size={16} /> דחה</button></div>
            </div>
          ))}</div>
        </Panel>
      )}
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Building2 size={18} />} extra={<button onClick={() => setAdd(true)} style={{ display: "flex", alignItems: "center", gap: 5, border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "7px 13px", borderRadius: 9, cursor: "pointer" }}><Plus size={15} /> ספק חדש</button>}>הספקים בפלטפורמה</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {active.map((sp) => { const rev = sp.orders.reduce((a, o) => a + orderTotal(o, sp.products), 0); const nw = sp.orders.filter((o) => o.status === "new").length; return (
            <div key={sp.id} style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, background: "#fff", boxShadow: SH }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Logo size={40} img={sp.brand && sp.brand.logo} name={sp.name} /><div><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{sp.category}</div></div></div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}><Badge>{sp.products.length} מוצרים</Badge><Badge>{sp.clients.filter((c) => c.status === "active").length} לקוחות</Badge><Badge>{sp.orders.length} הזמנות</Badge>{nw > 0 && <Badge tone="amber">{nw} חדשות</Badge>}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(rev)}</span><button onClick={() => onEnter(sp.id)} style={{ border: `1px solid ${C.green}`, background: C.greenSoft, color: C.greenDeep, fontWeight: 700, fontSize: 13, padding: "7px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><LogIn size={14} /> כניסה לניהול</button></div>
            </div>
          ); })}
        </div>
      </Panel>
      <Panel style={{ boxShadow: SH, borderColor: "#BBD3F5", background: "#F5F9FF" }}>
        <SectionTitle icon={<Building2 size={18} />}>מצב הדגמה — הצגת המערכת לספקים</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 12, lineHeight: 1.6 }}>צור בלחיצה ספק הדגמה מלא — עם מוצרים, קטגוריות, לקוחות, צוות (מלקט/נהג/סוכן) והזמנות במצבים שונים — ותיכנס אליו כדי להראות לספק פוטנציאלי בדיוק איך המערכת עובדת. בתוך ההדגמה תוכל גם להוסיף עוד אנשי צוות דרך לשונית "צוות".</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={createDemo} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px 20px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Building2 size={16} /> צור והצג ספק הדגמה</button>
          {hasDemo && <button onClick={resetDemo} style={{ border: `1px solid ${C.red}`, background: "#fff", color: C.red, fontWeight: 700, fontSize: 14, padding: "11px 16px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Trash2 size={15} /> מחק הדגמות</button>}
        </div>
      </Panel>
      {!agentMode && (
        <Panel style={{ boxShadow: SH }}>
          <SectionTitle icon={<ShieldCheck size={18} />}>סוכני-על / תמיכה</SectionTitle>
          <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>סוכני-על יכולים להוסיף ספקים חדשים ולתת תמיכה (כניסה לניהול של כל ספק).</div>
          <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>{(state.superAgents || []).map((a) => (<div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px" }}><Badge tone="plum">סוכן-על</Badge><div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{a.name}</div><div style={{ fontSize: 12, color: C.sub }}>{a.email}</div></div><button onClick={() => delAgent(a.id)} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button></div>))}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, alignItems: "end" }}>
            <MiniField label="שם" value={sf.name} onChange={(v) => setSf({ ...sf, name: v })} />
            <MiniField label="אימייל" value={sf.email} onChange={(v) => setSf({ ...sf, email: v })} />
            <MiniField label="סיסמה" value={sf.password} onChange={(v) => setSf({ ...sf, password: v })} />
            <button onClick={addAgent} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "10px 16px", borderRadius: 10, cursor: "pointer", height: 40 }}>הוסף</button>
          </div>
          {saErr && <ErrBox>{saErr}</ErrBox>}
        </Panel>
      )}
      {add && <Modal onClose={() => setAdd(false)} title="הוספת ספק חדש"><SupplierRegister state={state} setState={setState} byAdmin onDone={() => setAdd(false)} back={() => setAdd(false)} /></Modal>}
    </div>
  );
}
function LoginForm({ state, onLogin, back, onForgot }) {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [remember, setRemember] = useState(false);
  useEffect(() => { (async () => { try { const r = await window.storage.get("vegapp:remember"); if (r && r.value) { const d = JSON.parse(r.value); setEmail(d.email || ""); setPw(d.pw || ""); setRemember(true); } } catch {} })(); }, []);
  const finish = (sess) => { (async () => { try { if (remember) await window.storage.set("vegapp:remember", JSON.stringify({ email, pw })); else await window.storage.delete("vegapp:remember"); } catch {} })(); onLogin(sess); };
  const submit = () => {
    const em = email.trim().toLowerCase();
    if (pw === (state.superPw || SUPER_PW) && (em === "" || em === "super")) return finish({ kind: "super" });
    const sa = (state.superAgents || []).find((x) => x.email.trim().toLowerCase() === em && x.password === pw);
    if (sa) return finish({ kind: "superagent", userId: sa.id });
    let clientActive = false, clientPending = false;
    for (const sup of state.suppliers) {
      if (sup.status !== "active") continue;
      if (sup.owner && sup.owner.email.trim().toLowerCase() === em && sup.owner.password === pw) return finish({ kind: "supplier", supplierId: sup.id });
      const st = sup.staff.find((x) => x.email.trim().toLowerCase() === em && x.password === pw);
      if (st) return finish({ kind: st.role, supplierId: sup.id, userId: st.id });
      const c = sup.clients.find((x) => x.email.trim().toLowerCase() === em && x.password === pw);
      if (c) { if (c.status === "active") clientActive = true; else clientPending = true; }
    }
    if (clientActive) return finish({ kind: "client", email: em, pw });
    if (clientPending) { setErr("החשבון ממתין לאישור הספק"); return; }
    setErr("אימייל או סיסמה שגויים");
  };
  return (
    <Card title="התחברות" back={back}>
      <Field label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@business.co.il" />
      <Field label="סיסמה" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px 0 10px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.sub, cursor: "pointer" }}><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> זכור אותי</label>
        <button onClick={onForgot} style={{ border: "none", background: "transparent", color: C.green, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0 }}>שכחתי סיסמה</button>
      </div>
      {err && <ErrBox>{err}</ErrBox>}
      <SubmitBtn onClick={submit}>כניסה</SubmitBtn>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 10, textAlign: "center", lineHeight: 1.7 }}>מנהל-על: super/super · ספק: admin@sadeh.co.il/1234<br />לקוח: gan@demo.co.il · picker@ / driver@ / agent@demo.co.il · 1234</div>
    </Card>
  );
}
function ForgotForm({ state, back }) {
  const [email, setEmail] = useState(""); const [res, setRes] = useState(null);
  const find = () => {
    const em = email.trim().toLowerCase(); let pw = null;
    for (const sup of state.suppliers) {
      if (sup.owner && sup.owner.email.trim().toLowerCase() === em) pw = sup.owner.password;
      const u = [...sup.clients, ...sup.staff].find((x) => x.email.trim().toLowerCase() === em);
      if (u) pw = u.password;
    }
    setRes(pw ? { ok: true, pw } : { ok: false });
  };
  return (
    <Card title="שחזור סיסמה" back={back}>
      <Field label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@business.co.il" />
      <SubmitBtn onClick={find}>שחזר סיסמה</SubmitBtn>
      {res && (res.ok
        ? <div style={{ marginTop: 12, background: C.greenSoft, color: C.greenDeep, padding: 12, borderRadius: 10, fontSize: 14 }}>הסיסמה שלך: <b style={{ fontSize: 16 }}>{res.pw}</b><div style={{ fontSize: 12, color: C.sub, marginTop: 6 }}>בגרסה האמיתית יישלח קישור לאיפוס לאימייל.</div></div>
        : <ErrBox>לא נמצא חשבון עם האימייל הזה</ErrBox>)}
    </Card>
  );
}
function RegisterForm({ state, setState, back, byManager, onDone, lockSupplier }) {
  const suppliers = byManager ? [] : (state.suppliers || []).filter((x) => x.status === "active");
  const [f, setF] = useState({ name: "", contact: "", phone: "", address: "", email: "", password: "", taxId: "", structure: STRUCTURES[1], category: CATEGORIES[0], pay: "cash", docs: [], supId: lockSupplier || (suppliers[0] ? suppliers[0].id : "") });
  const [err, setErr] = useState(""); const [done, setDone] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const addDocs = (files) => { const names = Array.from(files).map((x) => x.name); setF((s) => ({ ...s, docs: [...s.docs, ...names] })); };
  const mkClient = (status) => ({ id: "c" + Date.now(), name: f.name, contact: f.contact, phone: f.phone, address: f.address, email: f.email, password: f.password, taxId: f.taxId, structure: f.structure, category: f.category, pay: f.pay, docs: f.docs, status, target: 20, createdAt: Date.now() });
  const submit = () => {
    if (!f.name || !f.email || !f.password) return setErr("שם העסק, אימייל וסיסמה הם שדות חובה");
    const em = f.email.trim().toLowerCase();
    if (byManager) {
      if ([...state.clients, ...state.staff].some((c) => c.email.trim().toLowerCase() === em)) return setErr("אימייל זה כבר רשום");
      setState((s) => ({ ...s, clients: [...s.clients, mkClient("active")] }));
      if (onDone) return onDone();
      return setDone(true);
    }
    if (!f.supId) return setErr("בחר ספק להזמנה");
    const sup = state.suppliers.find((x) => x.id === f.supId);
    if (sup && [...sup.clients, ...sup.staff].some((c) => c.email.trim().toLowerCase() === em)) return setErr("אימייל זה כבר רשום אצל הספק");
    const client = mkClient("pending");
    setState((root) => ({ ...root, suppliers: root.suppliers.map((sp) => sp.id === f.supId ? { ...sp, clients: [...sp.clients, client] } : sp) }));
    setDone(true);
  };
  if (done) return (<Card title={byManager ? "הלקוח נוסף" : "הבקשה נשלחה"} back={back}><div style={{ textAlign: "center", padding: "10px 0" }}><div style={{ width: 54, height: 54, borderRadius: "50%", background: C.amberSoft, color: C.amber, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Clock size={26} /></div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>תודה, {f.name}!</div><div style={{ fontSize: 14, color: C.sub, lineHeight: 1.6 }}>{byManager ? "הלקוח נוסף בהצלחה." : "הבקשה ממתינה לאישור הספק. לאחר האישור תוכל להתחבר ולהזמין."}</div></div><SubmitBtn onClick={back}>חזרה</SubmitBtn></Card>);
  const body = (
    <>
      {!byManager && !lockSupplier && (
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>בחר ספק להזמנה *</div><select value={f.supId} onChange={set("supId")} style={fieldStyle}>{suppliers.length === 0 && <option value="">אין ספקים זמינים</option>}{suppliers.map((sp) => <option key={sp.id} value={sp.id}>{sp.name} · {sp.category}</option>)}</select></label>
      )}
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם העסק *" value={f.name} onChange={set("name")} /><Field label="איש קשר" value={f.contact} onChange={set("contact")} />
        <Field label="טלפון" value={f.phone} onChange={set("phone")} /><Field label="כתובת למשלוח" value={f.address} onChange={set("address")} />
        <Field label="מספר עוסק / ח.פ" value={f.taxId} onChange={set("taxId")} /><Field label="אימייל (לכניסה) *" value={f.email} onChange={set("email")} />
        <Field label="סיסמה *" type="password" value={f.password} onChange={set("password")} /><div />
        <Select label="סוג התאגדות" value={f.structure} onChange={set("structure")} options={STRUCTURES} /><Select label="סוג העסק" value={f.category} onChange={set("category")} options={CATEGORIES} />
      </div>
      <div style={{ marginTop: 4, marginBottom: 4, fontSize: 13, color: C.sub }}>אופן תשלום</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {Object.entries(PAY).map(([k, v]) => { const Icon = v.icon, active = f.pay === k; return (<button key={k} onClick={() => setF((s) => ({ ...s, pay: k }))} style={{ border: `1.5px solid ${active ? C.green : C.line}`, background: active ? C.greenSoft : "#fff", color: active ? C.greenDeep : C.sub, borderRadius: 12, padding: "11px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}><Icon size={19} />{v.label}</button>); })}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 6 }}>מסמכים (ת.ז / עוסק מורשה / תעודת התאגדות)</div>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><Paperclip size={15} /> צרף קבצים<input type="file" multiple onChange={(e) => addDocs(e.target.files)} style={{ display: "none" }} /></label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>{f.docs.map((d, i) => <Badge key={i} icon={<FileText size={11} />}>{d}</Badge>)}</div>
      </div>
      {err && <ErrBox>{err}</ErrBox>}<SubmitBtn onClick={submit}>{byManager ? "הוסף לקוח" : "שליחת בקשה לספק"}</SubmitBtn>
    </>
  );
  return byManager ? body : <Card title="הרשמת עסק (לקוח)" back={back} wide>{body}</Card>;
}
function Card({ title, children, back, wide }) { return (<div style={{ width: "100%", maxWidth: wide ? 580 : 380, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 18, padding: 24, boxShadow: SH }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>{back && <button onClick={back} style={{ border: "none", background: "#EEF1EC", borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: C.sub, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>}<h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{title}</h2></div>{children}</div>); }

/* ============ CLIENT ============ */
function StaffRolePicker({ me, onPick }) {
  const roles = [me.role, ...((me.roles) || [])].filter((v, i, a) => a.indexOf(v) === i);
  const meta = { picker: { icon: Scale, tone: "amber", desc: "ליקוט ושקילת הזמנות" }, driver: { icon: Truck, tone: "plum", desc: "איסוף ומסירת משלוחים" }, agent: { icon: MessageSquare, tone: "blue", desc: "תמיכה והזמנות ללקוחות" } };
  const map = { amber: [C.amberSoft, C.amber], plum: [C.plumSoft, C.plum], blue: [C.blueSoft, C.blue] };
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: "24px 26px", background: `linear-gradient(120deg, ${C.greenSoft}, #fff 78%)` }}>
          <div style={{ fontSize: 14, color: C.sub, fontWeight: 600 }}>שלום, {me.name}</div>
          <div style={{ fontWeight: 800, fontSize: 22 }}>באיזה תפקיד תרצה לעבוד עכשיו?</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 4 }}>הוצבו לך כמה תפקידים — בחר מסך.</div>
        </div>
      </Panel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {roles.map((r) => { const m = meta[r] || { icon: ShieldCheck, tone: "blue", desc: "" }; const Ic = m.icon; const [bg, fg] = map[m.tone] || ["#EEF1EC", C.ink]; return (
          <button key={r} onClick={() => onPick(r)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 18, padding: 20, background: "#fff", cursor: "pointer", boxShadow: SH, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={26} /></div>
            <div><div style={{ fontWeight: 800, fontSize: 18 }}>{ROLE_LABEL[r]}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{m.desc}</div></div>
          </button>
        ); })}
      </div>
    </div>
  );
}
function ProfileModal({ session, state, setState, sup, onClose }) {
  const kind = session.kind;
  const roleLabel = kind === "super" ? "מנהל-על" : ROLE_LABEL[kind] || kind;
  let rec = null;
  if (kind === "super") rec = { name: "מנהל-על", email: "super", contact: "", phone: "", password: state.superPw || "super" };
  else if (kind === "supplier" && sup) rec = { name: sup.name, email: (sup.owner && sup.owner.email) || "", contact: (sup.owner && sup.owner.contact) || "", phone: (sup.owner && sup.owner.phone) || "", password: (sup.owner && sup.owner.password) || "" };
  else if (kind === "client") { const em = (session.email || "").trim().toLowerCase(); for (const s2 of state.suppliers) { const c = s2.clients.find((c) => c.email.trim().toLowerCase() === em); if (c) rec = c; } }
  else if (sup) rec = sup.staff.find((x) => x.id === session.userId);
  const [f, setF] = useState({ name: rec ? rec.name || "" : "", contact: rec ? rec.contact || "" : "", phone: rec ? rec.phone || "" : "", email: rec ? rec.email || "" : "" });
  const [pw1, setPw1] = useState(""); const [pw2, setPw2] = useState(""); const [msg, setMsg] = useState("");
  const emailEditable = kind === "supplier" || kind === "picker" || kind === "driver" || kind === "agent";
  const showContact = kind === "supplier" || kind === "client";
  const showName = kind !== "super";
  const save = () => {
    if (pw1 && pw1 !== pw2) { setMsg("הסיסמאות אינן תואמות"); return; }
    const np = pw1 || null;
    if (kind === "super") setState((r) => ({ ...r, superPw: np || r.superPw || "super" }));
    else if (kind === "supplier" && sup) setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sup.id ? { ...s2, name: f.name || s2.name, owner: { ...(s2.owner || {}), contact: f.contact, phone: f.phone, email: f.email || (s2.owner && s2.owner.email), password: np || (s2.owner && s2.owner.password) } } : s2) }));
    else if (kind === "client") { const em = (session.email || "").trim().toLowerCase(); setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => ({ ...s2, clients: s2.clients.map((c) => c.email.trim().toLowerCase() === em ? { ...c, name: f.name, contact: f.contact, phone: f.phone, password: np || c.password } : c) })) })); }
    else if (sup) setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sup.id ? { ...s2, staff: s2.staff.map((u) => u.id === session.userId ? { ...u, name: f.name, email: f.email || u.email, password: np || u.password } : u) } : s2) }));
    setMsg("נשמר בהצלחה" + (np ? " · הסיסמה עודכנה" : "")); setPw1(""); setPw2("");
  };
  return (
    <Modal onClose={onClose} title="הפרופיל שלי">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: C.greenSoft, color: C.greenDeep, display: "flex", alignItems: "center", justifyContent: "center" }}><User size={22} /></div>
        <div><div style={{ fontWeight: 800, fontSize: 16 }}>{f.name || roleLabel}</div><Badge>{roleLabel}</Badge></div>
      </div>
      {showName && <Field label={kind === "supplier" || kind === "client" ? "שם העסק" : "שם"} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}
      {showContact && <Field label="איש קשר" value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} />}
      {showContact && <Field label="טלפון" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />}
      <Field label="אימייל" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} disabled={!emailEditable} />
      <div style={{ borderTop: `1px solid ${C.line}`, margin: "8px 0 0", paddingTop: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><KeyRound size={15} /> שינוי סיסמה</div>
        <Field label="סיסמה חדשה" type="password" value={pw1} onChange={(e) => setPw1(e.target.value)} placeholder="השאר ריק כדי לא לשנות" />
        <Field label="אימות סיסמה" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
      </div>
      {msg && <div style={{ background: msg.includes("אינן") ? C.redSoft : C.greenSoft, color: msg.includes("אינן") ? C.red : C.greenDeep, padding: "9px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{msg}</div>}
      <SubmitBtn onClick={save}>שמור שינויים</SubmitBtn>
    </Modal>
  );
}
function BusinessHub({ state, setState, email, onEnter, onJoin }) {
  const [tab, setTab] = useState("mine");
  const [q, setQ] = useState(""); const [region, setRegion] = useState("");
  const emL = (email || "").trim().toLowerCase();
  const anyRec = state.suppliers.map((sp) => sp.clients.find((c) => c.email.trim().toLowerCase() === emL)).find(Boolean) || null;
  const [pf, setPf] = useState({ name: anyRec ? anyRec.name : "", contact: anyRec ? anyRec.contact || "" : "", phone: anyRec ? anyRec.phone || "" : "", address: anyRec ? anyRec.address || "" : "", taxId: anyRec ? anyRec.taxId || "" : "" });
  const patchAll = (patch) => setState((root) => ({ ...root, suppliers: root.suppliers.map((sp) => ({ ...sp, clients: sp.clients.map((c) => c.email.trim().toLowerCase() === emL ? { ...c, ...patch } : c) })) }));
  const pickLogo = (file) => { if (!file) return; const r = new FileReader(); r.onload = () => patchAll({ logo: r.result }); r.readAsDataURL(file); };
  const em = (email || "").trim().toLowerCase();
  const recOf = (sp) => sp.clients.find((c) => c.email.trim().toLowerCase() === em);
  const active = state.suppliers.filter((s) => s.status === "active");
  const mine = active.filter((s) => recOf(s));
  const others = active.filter((s) => !recOf(s));
  const regions = Array.from(new Set(active.flatMap((s) => (s.regions || "").split(",").map((x) => x.trim()).filter(Boolean))));
  const matchText = (s) => { const t = q.trim().toLowerCase(); if (!t) return true; const hay = (s.name + " " + s.category + " " + (s.regions || "") + " " + (s.products || []).map((p) => p.name).join(" ")).toLowerCase(); return hay.includes(t); };
  const found = others.filter((s) => (!region || (s.regions || "").includes(region)) && matchText(s));
  const dir = active.filter((s) => (!region || (s.regions || "").includes(region)) && matchText(s));
  const matchedProducts = (s) => q.trim() ? (s.products || []).filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())).map((p) => p.name) : [];
  const businessName = mine[0] ? recOf(mine[0]).name : "העסק שלי";
  const tabs = [["mine", "הספקים שלי", Building2], ["find", "מצא ספקים", Search], ["profile", "הפרופיל שלי", ShieldCheck]];
  const card = (sp, cta) => { const color = (sp.brand && sp.brand.color) || C.green; return (
    <div key={sp.id} style={{ border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: SH }}>
      <div style={{ height: 8, background: color }} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Logo size={40} img={sp.brand && sp.brand.logo} name={sp.name} /><div><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{sp.category}</div></div></div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", margin: "10px 0" }}>{(sp.regions || "").split(",").map((r) => r.trim()).filter(Boolean).map((r) => <Badge key={r} icon={<MapPin size={11} />}>{r}</Badge>)}</div>
        {cta}
      </div>
    </div>
  ); };
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: "24px 26px", background: `linear-gradient(120deg, ${C.greenSoft}, #fff 78%)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Logo size={46} img={anyRec && anyRec.logo} name={businessName} /><div><div style={{ fontSize: 14, color: C.sub, fontWeight: 600 }}>שלום,</div><div style={{ fontWeight: 800, fontSize: 24 }}>{businessName}</div></div></div>
          <div style={{ fontSize: 14, color: C.sub, marginTop: 4 }}>בחר ספק להזמנה, או גלה ספקים חדשים לפי אזור ומוצר</div>
        </div>
      </Panel>
      <Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ mine: mine.length }} />
      {tab === "mine" && (mine.length === 0 ? <Empty>עדיין לא הצטרפת לספקים. עבור ל"מצא ספקים".</Empty> :
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
          {mine.map((sp) => { const rec = recOf(sp); const color = (sp.brand && sp.brand.color) || C.green; return card(sp, rec.status !== "active"
            ? <Badge tone="amber"><Clock size={12} /> ממתין לאישור הספק</Badge>
            : <button onClick={() => onEnter(sp.id)} style={{ width: "100%", border: "none", background: color, color: "#fff", fontWeight: 800, padding: "10px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ShoppingCart size={16} /> כניסה לחנות</button>); })}
        </div>)}
      {tab === "find" && (
        <div style={{ display: "grid", gap: 14 }}>
          <Panel style={{ boxShadow: SH }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", flex: 1, minWidth: 180 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: שם ספק / קטגוריה / מוצר (למשל: חד פעמי)" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
              <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 10px", fontSize: 13, fontFamily: "inherit" }}><option value="">כל האזורים</option>{regions.map((r) => <option key={r} value={r}>{r}</option>)}</select>
              <button onClick={() => setTab("find")} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 800, padding: "10px 18px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Search size={15} /> חיפוש</button>
            </div>
          </Panel>
          <div style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>{dir.length} ספקים זמינים{region ? " באזור " + region : ""}</div>
          {dir.length === 0 ? <Empty>לא נמצאו ספקים לפי הסינון</Empty> :
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
              {dir.map((sp) => { const color = (sp.brand && sp.brand.color) || C.green; const rec = recOf(sp); const mp = matchedProducts(sp); const cta = rec ? (rec.status === "active"
                ? <button onClick={() => onEnter(sp.id)} style={{ width: "100%", border: "none", background: color, color: "#fff", fontWeight: 800, padding: "10px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ShoppingCart size={16} /> כניסה לחנות</button>
                : <Badge tone="amber"><Clock size={12} /> ממתין לאישור</Badge>)
                : <button onClick={() => onJoin(sp.id)} style={{ width: "100%", border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, padding: "10px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><UserPlus size={16} /> בקש להצטרף</button>;
                return card(sp, <div>{mp.length > 0 && <div style={{ fontSize: 12, color: C.greenDeep, background: C.greenSoft, borderRadius: 8, padding: "5px 8px", marginBottom: 8 }}>נמצא: {mp.slice(0, 3).join(", ")}</div>}{cta}</div>); })}
            </div>}
        </div>
      )}
      {tab === "profile" && (
        <div style={{ display: "grid", gap: 16 }}>
          <Panel style={{ boxShadow: SH }}>
            <SectionTitle icon={<ShieldCheck size={18} />}>פרופיל העסק שלי</SectionTitle>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <Logo size={58} img={anyRec && anyRec.logo} name={pf.name || businessName} />
              <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> העלה לוגו של העסק<input type="file" accept="image/*" onChange={(e) => pickLogo(e.target.files[0])} style={{ display: "none" }} /></label>
            </div>
            <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
              <Field label="שם העסק" value={pf.name} onChange={(e) => setPf({ ...pf, name: e.target.value })} />
              <Field label="איש קשר" value={pf.contact} onChange={(e) => setPf({ ...pf, contact: e.target.value })} />
              <Field label="טלפון" value={pf.phone} onChange={(e) => setPf({ ...pf, phone: e.target.value })} />
              <Field label="כתובת" value={pf.address} onChange={(e) => setPf({ ...pf, address: e.target.value })} />
              <Field label="ע.מ / ח.פ" value={pf.taxId} onChange={(e) => setPf({ ...pf, taxId: e.target.value })} />
            </div>
            <div style={{ fontSize: 12, color: C.sub, margin: "4px 0 8px" }}>הפרטים והלוגו מתעדכנים אצל כל הספקים שאתה עובד איתם.</div>
            <SubmitBtn onClick={() => patchAll(pf)}>שמור פרופיל</SubmitBtn>
          </Panel>
        </div>
      )}
    </div>
  );
}
function ClientView({ state, setState, clientId }) {
  const client = state.clients.find((c) => c.id === clientId);
  const [tab, setTab] = useState("home");
  const feat = state.features || {};
  const showPrizes = feat.prizes !== false;
  const showChat = feat.chat !== false;
  const unread = state.broadcasts.filter((b) => !((client.readBc || []).includes(b.id))).length;
  const tabs = [["home", "בית", Home], ["order", "הזמנה חדשה", ShoppingCart], ["orders", "הזמנות וקבלות", Receipt], showPrizes && ["prizes", "יעדים", Trophy], ["inbox", "תיבת דואר", Mail], showChat && ["chat", "צ'אט עם הספק", MessageSquare]].filter(Boolean);
  return (<div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ inbox: unread }} />
    {tab === "home" && <ClientHome state={state} clientId={clientId} unread={unread} onOpen={setTab} />}
    {tab === "order" && <OrderForm state={state} setState={setState} clientId={clientId} />}
    {tab === "orders" && <ClientOrders state={state} setState={setState} clientId={clientId} canEdit editorRole="client" />}
    {tab === "prizes" && showPrizes && <PrizeLadder state={state} clientId={clientId} />}
    {tab === "inbox" && <Inbox state={state} setState={setState} clientId={clientId} />}
    {tab === "chat" && showChat && <Chat state={state} setState={setState} clientId={clientId} meRole="client" meName={client.name} />}
  </div>);
}
function RoleHome({ name, prompt, cards, onOpen, accent }) {
  const grad = { green: "linear-gradient(135deg,#2FA268,#124A2B)", blue: "linear-gradient(135deg,#3E86B5,#1E5478)", plum: "linear-gradient(135deg,#8B5CB0,#4E2A6B)", amber: "linear-gradient(135deg,#E0A93C,#9A6A16)" };
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: "26px 28px", background: accent ? `linear-gradient(135deg, ${accent}, ${shade(accent)})` : `linear-gradient(120deg, ${C.greenSoft}, #fff 78%)` }}>
          <div style={{ fontSize: 14, color: accent ? "rgba(255,255,255,.85)" : C.sub, fontWeight: 600 }}>שלום,</div>
          <div style={{ fontWeight: 800, fontSize: 25, letterSpacing: "-0.5px", color: accent ? "#fff" : C.ink }}>{name}</div>
          <div style={{ fontSize: 14, color: accent ? "rgba(255,255,255,.9)" : C.sub, marginTop: 4 }}>{prompt || "מה תרצה לעשות היום?"}</div>
        </div>
      </Panel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {cards.map((c) => { const Ic = c.Icon; const pill = c.stat || c.badge; return (
          <button key={c.id} onClick={() => onOpen(c.id)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 20, overflow: "hidden", padding: 0, background: "#fff", cursor: "pointer", boxShadow: SH }}>
            <div style={{ height: 96, background: grad[c.tone], position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -24, left: -18, width: 84, height: 84, borderRadius: "50%", background: "rgba(255,255,255,.13)" }} />
              <div style={{ position: "absolute", bottom: -30, right: 14, width: 66, height: 66, borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />
              <Ic size={42} color="#fff" strokeWidth={1.8} style={{ position: "relative", opacity: .96 }} />
              {pill && <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,.94)", color: c.tone === "amber" ? "#7A5A17" : C.ink, borderRadius: 20, padding: "3px 10px", fontSize: 11.5, fontWeight: 800 }}>{pill}</span>}
            </div>
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{c.desc}</div>
            </div>
          </button>
        ); })}
      </div>
    </div>
  );
}
function ClientHome({ state, clientId, unread, onOpen }) {
  const client = state.clients.find((c) => c.id === clientId);
  const pts = pointsOf(clientId, state.orders, state.products, state.kgPerPoint, state.periodMonths);
  const debt = outstandingOf(clientId, state.orders, state.products);
  const mo = monthOrdersOf(clientId, state.orders).length;
  const nxt = nextTier(pts, sortTiers(state.prizeTiers));
  const feat = state.features || {};
  const cards = [
    { id: "order", title: "הזמנה חדשה", desc: "הזמן ירקות ופירות טריים", Icon: ShoppingCart, tone: "green" },
    { id: "orders", title: "הזמנות וקבלות", desc: mo ? `${mo} הזמנות החודש` : "היסטוריה וחשבוניות", Icon: Receipt, tone: "blue", badge: debt > 0 ? "חוב " + NIS(debt) : null },
    { id: "prizes", title: "יעדים ופרסים", desc: nxt ? `עוד ${nxt.points - pts} נק' ל${nxt.title}` : "צבור נקודות וזכה בפרסים", Icon: Trophy, tone: "plum", stat: pts + " נק'" },
    { id: "inbox", title: "תיבת דואר", desc: "הודעות ומבצעים", Icon: Mail, tone: "amber", badge: unread ? unread + " חדשות" : null },
    { id: "chat", title: "צ'אט עם הספק", desc: "שאלה? דברו איתנו", Icon: MessageSquare, tone: "green" },
  ];
  const upcoming = state.orders.filter((o) => o.clientId === clientId && o.delivDate && o.delivWindow && o.status !== "delivered").sort((a, b) => new Date(a.delivDate).getTime() - new Date(b.delivDate).getTime())[0];
  const dayLbl = (ds) => { const d = new Date(ds); return isNaN(d.getTime()) ? ds : d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "numeric" }); };
  return (
    <div>
      {upcoming && (
        <button onClick={() => onOpen("orders")} style={{ width: "100%", textAlign: "right", border: "none", cursor: "pointer", marginBottom: 16, borderRadius: 16, padding: "14px 18px", background: `linear-gradient(120deg, ${C.green}, ${C.greenDeep})`, color: "#fff", display: "flex", alignItems: "center", gap: 14, boxShadow: SH }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Truck size={24} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>הספק עדכן מועד אספקה 🚚</div>
            <div style={{ fontSize: 13.5, opacity: .95, marginTop: 2 }}>הזמנה #{upcoming.id} תגיע ביום {dayLbl(upcoming.delivDate)}, בין השעות {upcoming.delivWindow}</div>
          </div>
          <ChevronLeft size={20} style={{ opacity: .8 }} />
        </button>
      )}
      <RoleHome name={client.name} accent={state.brand && state.brand.color} cards={cards.filter((c) => (c.id !== "prizes" || feat.prizes !== false) && (c.id !== "chat" || feat.chat !== false))} onOpen={onOpen} />
    </div>
  );
}
function Inbox({ state, setState, clientId }) {
  useEffect(() => {
    const cl = state.clients.find((c) => c.id === clientId);
    const ids = state.broadcasts.map((b) => b.id);
    if (ids.some((id) => !((cl.readBc || []).includes(id)))) setState((s) => ({ ...s, clients: s.clients.map((c) => c.id === clientId ? { ...c, readBc: ids } : c) }));
  }, []);
  const bs = [...state.broadcasts].sort((a, b) => b.ts - a.ts);
  return (
    <Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<Mail size={18} />}>תיבת דואר · הודעות ומבצעים</SectionTitle>
      {bs.length === 0 ? <Empty>אין הודעות</Empty> : <div style={{ display: "grid", gap: 10 }}>{bs.map((b) => (
        <div key={b.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, background: "#fff" }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: C.amberSoft, color: C.amber, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Megaphone size={18} /></div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{b.text}</div><div style={{ fontSize: 11.5, color: C.sub, marginTop: 3 }}>{dayStr(b.ts)}</div></div>
        </div>
      ))}</div>}
    </Panel>
  );
}

function OrderForm({ state, setState, clientId, agentName }) {
  const [cart, setCart] = useState({}); const [toast, setToast] = useState(""); const [pq, setPq] = useState(""); const [pcat, setPcat] = useState("");
  const minOrder = (state.features && state.features.minOrder) || MIN_ORDER;
  const themeColor = (state.brand && state.brand.color) || C.greenDeep;
  const borderW = (state.brand && state.brand.borderW != null) ? state.brand.borderW : 2.5;
  const setQty = (pid, n) => setCart((c) => { const p = state.products.find((x) => x.id === pid); const v = Math.max(0, Math.min(p.stock, (c[pid] || 0) + n)); const nc = { ...c }; if (v === 0) delete nc[pid]; else nc[pid] = v; return nc; });
  const items = Object.entries(cart); const cartons = items.reduce((s, [, n]) => s + n, 0);
  const est = items.reduce((s, [pid, n]) => { const p = state.products.find((x) => x.id === pid); return s + n * cartonPriceGross(p); }, 0);
  const ok = cartons >= minOrder;
  const place = () => { if (!ok) return; const order = { id: String(1000 + Math.floor(Math.random() * 9000)), clientId, date: Date.now(), status: "new", paid: false, items: items.map(([pid, n]) => ({ pid, cartons: n })), byAgent: agentName || null }; setState((s) => ({ ...s, orders: [order, ...s.orders], products: s.products.map((p) => cart[p.id] ? { ...p, stock: Math.max(0, p.stock - cart[p.id]) } : p) })); setCart({}); setToast("ההזמנה נשלחה לליקוט. חשבונית מדויקת תופק אחרי השקילה."); setTimeout(() => setToast(""), 3500); };
  return (
    <>
    <div className="tp-2col" style={{ paddingBottom: cartons > 0 ? 88 : 0 }}>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Package size={18} />} extra={<span style={{ fontSize: 12, color: C.sub }}>מינימום {minOrder} קרטונים</span>}>קטלוג</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={pq} onChange={(e) => setPq(e.target.value)} placeholder="חיפוש מוצר בקטלוג" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
          {(state.cats || []).length > 0 && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>{[["", "הכל"], ...(state.cats || []).map((c) => [c, c])].map(([id, lbl]) => { const on = pcat === id; return <button key={id || "all"} onClick={() => setPcat(id)} style={{ border: `1.5px solid ${on ? themeColor : C.line}`, background: on ? themeColor : "#fff", color: on ? "#fff" : C.sub, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{lbl}</button>; })}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(158px,1fr))", gap: 12 }}>
          {state.products.filter((p) => (!pq.trim() || p.name.toLowerCase().includes(pq.trim().toLowerCase())) && (!pcat || (p.cat || "") === pcat)).map((p) => { const out = p.stock <= 0, low = p.stock > 0 && p.stock <= LOW, inCart = cart[p.id] || 0; return (
            <div key={p.id} style={{ border: `${Math.max(1.5, borderW)}px solid ${inCart > 0 ? themeColor : themeColor + "99"}`, borderRadius: 16, padding: 12, opacity: out ? .55 : 1, background: "#fff", boxShadow: inCart > 0 ? `0 0 0 3px ${themeColor}22` : "none" }}>
              <ProdThumb p={p} tint={themeColor} /><div style={{ fontWeight: 700, marginTop: 8 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: C.sub }}>{p.unit === "carton" ? "לפי קרטון" + (p.units ? " · " + p.units + " יח\' בקרטון" : "") : NIS(p.price) + " לק\"ג · קרטון " + p.kg + " ק\"ג"}</div>
              <div style={{ fontWeight: 800, color: themeColor, margin: "5px 0 6px" }}>{noPrice(p) ? <span style={{ fontSize: 13 }}>לפי הצעת מחיר</span> : <>{NIS(cartonPriceGross(p))} <span style={{ fontSize: 11, color: C.sub, fontWeight: 500 }}>/ קרטון</span></>}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 8, color: out ? C.red : low ? C.amber : C.green }}>{out ? "אזל מהמלאי" : low ? `נותרו ${p.stock}` : "במלאי"}</div>
              {out ? <div style={{ textAlign: "center", fontSize: 12, color: C.sub, padding: "6px 0", border: `1px dashed ${C.line}`, borderRadius: 10 }}>לא זמין</div> : <Stepper value={inCart} onDec={() => setQty(p.id, -1)} onInc={() => setQty(p.id, 1)} maxed={inCart >= p.stock} accent={themeColor} />}
            </div>
          ); })}
        </div>
      </Panel>
      <Panel style={{ alignSelf: "start", boxShadow: SH }}>
        <SectionTitle icon={<ShoppingCart size={18} />}>{agentName ? "הזמנה עבור הלקוח" : "ההזמנה שלך"}</SectionTitle>
        {items.length === 0 ? <div style={{ color: C.sub, fontSize: 14, padding: "8px 0" }}>בחר כמות קרטונים.</div> : (
          <div>{items.map(([pid, n]) => { const p = state.products.find((x) => x.id === pid); return (<div key={pid} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, borderBottom: `1px dashed ${C.line}` }}><span>{p.emoji} {p.name} × {n}</span><span style={{ fontWeight: 700 }}>{noPrice(p) ? "לפי הצעה" : NIS(n * cartonPriceGross(p))}</span></div>); })}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontWeight: 800, fontSize: 17 }}><span>הערכה</span><span style={{ color: themeColor }}>{NIS(est)}</span></div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>הסכום הסופי ייקבע לפי משקל בליקוט.</div></div>
        )}
        {!ok && cartons > 0 && <div style={{ fontSize: 12.5, color: C.amber, marginTop: 8, fontWeight: 600 }}>נדרש מינימום {minOrder} קרטונים (יש {cartons}).</div>}
        <button onClick={place} disabled={!ok} style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 12, border: "none", background: ok ? themeColor : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, cursor: ok ? "pointer" : "default" }}>שלח הזמנה {cartons > 0 && `· ${cartons} קרטונים`}</button>
        {toast && <div style={{ marginTop: 10, background: C.greenSoft, color: C.greenDeep, padding: 10, borderRadius: 10, fontSize: 13.5, fontWeight: 600, display: "flex", gap: 6, alignItems: "flex-start" }}><Check size={16} /> {toast}</div>}
      </Panel>
    </div>
    {cartons > 0 && (
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: "#fff", borderTop: `1px solid ${C.line}`, boxShadow: "0 -6px 20px rgba(0,0,0,.08)", padding: "12px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
          <div><div style={{ fontSize: 12, color: C.sub }}>{cartons} קרטונים · הערכה</div><div style={{ fontWeight: 800, fontSize: 21, color: themeColor }}>{NIS(est)}</div></div>
          <div style={{ flex: 1 }} />
          {!ok && <span style={{ fontSize: 12.5, color: C.amber, fontWeight: 700 }}>מינ' {minOrder} קרטונים</span>}
          <button onClick={place} disabled={!ok} style={{ border: "none", background: ok ? themeColor : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 26px", borderRadius: 12, cursor: ok ? "pointer" : "default" }}>שלח הזמנה</button>
        </div>
      </div>
    )}
    </>
  );
}

function ClientOrders({ state, setState, clientId, canEdit, editorRole }) {
  const [inv, setInv] = useState(null); const [edit, setEdit] = useState(null);
  const orders = state.orders.filter((o) => o.clientId === clientId).sort((a, b) => b.date - a.date);
  const m = monthOrdersOf(clientId, orders); const monthTotal = m.reduce((s, o) => s + orderTotal(o, state.products), 0);
  const debt = outstandingOf(clientId, state.orders, state.products);
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
        <Kpi icon={<BarChart3 size={17} />} label={"סה\"כ החודש · " + monthName} value={NIS(monthTotal)} tone="green" />
        <Kpi icon={<Wallet size={17} />} label="יתרת חוב לתשלום" value={NIS(debt)} tone={debt > 0 ? "red" : "green"} />
        <Kpi icon={<Receipt size={17} />} label="הזמנות החודש" value={m.length} tone="blue" />
      </div>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Receipt size={18} />}>ההזמנות והקבלות שלי</SectionTitle>
        <div style={{ display: "grid", gap: 8 }}>
          {orders.map((o) => { const st = STATUS[o.status]; const editable = canEdit && o.status === "new"; return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontSize: 13, color: C.sub }}>#{o.id} · {dayStr(o.date)}</span><span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{st.label}</span></div>
              <div style={{ fontSize: 13, margin: "6px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.emoji}${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
              {hasShortage(o) && <div style={{ fontSize: 12.5, color: C.amber, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={13} /> חלק מהפריטים סופקו חלקית — פירוט מלא בחשבונית</div>}
              {o.delivDate && o.delivWindow && <div style={{ fontSize: 12.5, color: C.greenDeep, background: C.greenSoft, borderRadius: 8, padding: "6px 10px", marginBottom: 6, display: "flex", alignItems: "center", gap: 5, fontWeight: 700 }}><Truck size={13} /> אספקה: {(() => { const d = new Date(o.delivDate); return isNaN(d.getTime()) ? o.delivDate : d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "numeric" }); })()} · בין {o.delivWindow}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setInv(o)} style={miniBtn}><Receipt size={13} /> חשבונית</button>
                  {editable && <button onClick={() => setEdit(o)} style={{ ...miniBtn, color: C.blue, borderColor: C.blue }}><Pencil size={13} /> שינוי הזמנה</button>}
                  {o.status === "delivered" && (o.paid ? <Badge tone="green"><Check size={11} /> שולם</Badge> : <Badge tone="amber">לתשלום מול הספק</Badge>)}
                </div>
                <span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span>
              </div>
            </div>
          ); })}
        </div>
      </Panel>
      {inv && <InvoiceModal order={inv} state={state} onClose={() => setInv(null)} />}
      {edit && <EditOrder order={edit} state={state} setState={setState} onClose={() => setEdit(null)} />}
    </div>
  );
}

function PrizeLadder({ state, clientId }) {
  const client = state.clients.find((c) => c.id === clientId); const tiers = sortTiers(state.prizeTiers);
  const pts = pointsOf(clientId, state.orders, state.products, state.kgPerPoint, state.periodMonths);
  const cur = reachedTier(pts, tiers); const nxt = nextTier(pts, tiers);
  const base = cur ? cur.points : 0; const span = nxt ? nxt.points - base : 1; const barPct = nxt ? Math.min(100, Math.round(((pts - base) / span) * 100)) : 100;
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: 24, background: `linear-gradient(125deg, ${C.plumSoft} 0%, #fff 70%)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}><div style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>שלום, {client.name}</div><Badge tone="plum" icon={<RotateCcw size={12} />}>מתאפס בתחילת התקופה · {periodLabel(state.periodMonths)}</Badge></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "6px 0 2px" }}><Star size={28} style={{ color: C.plum }} fill={C.plum} /><span style={{ fontSize: 44, fontWeight: 800, color: C.plum, lineHeight: 1 }}>{NUM(pts)}</span><span style={{ fontSize: 15, color: C.sub, fontWeight: 600 }}>נקודות ({state.kgPerPoint} ק"ג = נקודה)</span></div>
          <div style={{ fontSize: 14, marginTop: 8, fontWeight: 700, color: cur ? C.greenDeep : C.sub }}>{cur ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Trophy size={16} style={{ color: C.amber }} /> זכית עד כה: {cur.title}</span> : "עדיין לא הגעת לפרס הראשון"}</div>
          {nxt && (<><div style={{ background: "#E8DCF0", height: 10, borderRadius: 6, overflow: "hidden", marginTop: 10 }}><div style={{ width: barPct + "%", height: "100%", background: `linear-gradient(90deg, ${C.plum}, #9159b8)` }} /></div><div style={{ fontSize: 13, color: C.sub, marginTop: 6 }}>עוד <b style={{ color: C.plum }}>{nxt.points - pts}</b> נקודות לפרס: <b>{nxt.title}</b>{nxt.detail ? ` · ${nxt.detail}` : ""}</div></>)}
        </div>
      </Panel>
      <Panel style={{ boxShadow: SH }}><SectionTitle icon={<Gift size={18} />}>מסלול הפרסים החודשי</SectionTitle>
        <div style={{ display: "grid", gap: 10 }}>{tiers.map((t) => { const got = pts >= t.points; const isNext = nxt && nxt.id === t.id; return (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${got ? C.green : isNext ? C.plum : C.line}`, background: got ? C.greenSoft : isNext ? C.plumSoft : "#fff", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: got ? C.green : isNext ? C.plum : "#EEF1EC", color: got || isNext ? "#fff" : C.sub }}>{got ? <Check size={20} /> : isNext ? <Trophy size={18} /> : <Lock size={16} />}</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>{t.title}</div>{t.detail && <div style={{ fontSize: 12.5, color: C.sub }}>{t.detail}</div>}</div>
            <div style={{ textAlign: "left" }}><div style={{ fontWeight: 800, color: got ? C.greenDeep : isNext ? C.plum : C.sub }}>{t.points} נק'</div><div style={{ fontSize: 11, color: C.sub }}>{got ? "הושג ✓" : `עוד ${t.points - pts}`}</div></div>
          </div>
        ); })}</div>
      </Panel>
    </div>
  );
}

/* ============ EDIT ORDER (client/agent/manager) ============ */
function EditOrder({ order, state, setState, onClose }) {
  const orig = {}; order.items.forEach((it) => { orig[it.pid] = it.cartons; });
  const [qty, setQty] = useState(() => ({ ...orig }));
  const maxFor = (p) => p.stock + (orig[p.id] || 0);
  const setQ = (pid, n) => setQty((q) => { const p = state.products.find((x) => x.id === pid); const v = Math.max(0, Math.min(maxFor(p), (q[pid] || 0) + n)); return { ...q, [pid]: v }; });
  const items = Object.entries(qty).filter(([, n]) => n > 0);
  const cartons = items.reduce((s, [, n]) => s + n, 0); const ok = cartons >= MIN_ORDER;
  const est = items.reduce((s, [pid, n]) => { const p = state.products.find((x) => x.id === pid); return s + n * cartonPrice(p); }, 0);
  const save = () => {
    if (!ok) return;
    const newItems = items.map(([pid, n]) => ({ pid, cartons: n }));
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => o.id === order.id ? { ...o, items: newItems } : o),
      products: s.products.map((p) => { const delta = (qty[p.id] || 0) - (orig[p.id] || 0); return delta ? { ...p, stock: Math.max(0, p.stock - delta) } : p; }),
    }));
    onClose();
  };
  return (
    <Modal onClose={onClose} title={"שינוי הזמנה #" + order.id}>
      <div style={{ display: "grid", gap: 8, maxHeight: 380, overflow: "auto" }}>
        {state.products.map((p) => { const out = maxFor(p) <= 0; const v = qty[p.id] || 0; return (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "8px 12px", opacity: out && v === 0 ? .5 : 1 }}>
            <ProdThumb p={p} size={38} /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div><div style={{ fontSize: 11.5, color: C.sub }}>{NIS(cartonPrice(p))}/קרטון · זמין {maxFor(p)}</div></div>
            <div style={{ width: 118 }}><Stepper value={v} onDec={() => setQ(p.id, -1)} onInc={() => setQ(p.id, 1)} maxed={v >= maxFor(p)} /></div>
          </div>
        ); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontWeight: 800 }}><span>הערכה · {cartons} קרטונים</span><span style={{ color: C.greenDeep, fontSize: 18 }}>{NIS(est)}</span></div>
      {!ok && <div style={{ fontSize: 12.5, color: C.amber, marginTop: 6, fontWeight: 600 }}>מינימום {MIN_ORDER} קרטונים.</div>}
      <button onClick={save} disabled={!ok} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 12, border: "none", background: ok ? C.green : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, cursor: ok ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={16} /> שמור שינויים</button>
    </Modal>
  );
}

/* ============ MANAGER ============ */
function ManagerView({ state, setState }) {
  const [tab, setTab] = useState("home");
  const lowCount = state.products.filter((p) => p.stock <= LOW).length;
  const newCount = state.orders.filter((o) => o.status === "new").length;
  const pendCount = state.clients.filter((c) => c.status === "pending").length;
  const tabs = [["home", "בית", Home], ["orders", "הזמנות", ClipboardList], ["mystore", "החנות שלי", Building2], ["clients", "לקוחות", Users], ["staff", "צוות", ShieldCheck], ["messages", "הודעות", MessageSquare]];
  return (<div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ orders: newCount, clients: pendCount }} />
    {tab === "home" && <RoleHome name="מנהל" prompt="ניהול החנות" cards={[
      { id: "orders", title: "הזמנות", desc: newCount ? `${newCount} לליקוט` : "כל ההזמנות", Icon: ClipboardList, tone: "amber", badge: newCount ? newCount + " חדשות" : null },
      { id: "mystore", title: "החנות שלי", desc: lowCount ? `${lowCount} מוצרים במלאי נמוך` : "מוצרים · עיצוב · יעדים", Icon: Building2, tone: "blue", badge: lowCount ? lowCount + " נמוך" : null },
      { id: "clients", title: "לקוחות", desc: pendCount ? `${pendCount} ממתינים לאישור` : "ניהול לקוחות", Icon: Users, tone: "green", badge: pendCount ? pendCount + " ממתינים" : null },
      { id: "staff", title: "צוות", desc: "מלקטים, נהגים וסוכנים", Icon: ShieldCheck, tone: "blue" },
      { id: "messages", title: "הודעות", desc: "צ'אט ומבצעים ללקוחות", Icon: MessageSquare, tone: "amber" },
    ]} onOpen={setTab} />}
    {tab === "orders" && <MgrOrders state={state} setState={setState} />}
    {tab === "mystore" && <MyStore state={state} setState={setState} />}
    {tab === "clients" && <MgrClients state={state} setState={setState} />}
    {tab === "staff" && <MgrStaff state={state} setState={setState} />}
    {tab === "messages" && <MgrMessages state={state} setState={setState} />}
  </div>);
}
function MyStore({ state, setState }) {
  const [sub, setSub] = useState("products");
  const lowCount = state.products.filter((p) => p.stock <= LOW).length;
  const subs = [["products", "מוצרים ומלאי", Boxes], ["design", "עיצוב החנות", ImageIcon], ["prizes", "יעדים ופרסים", Gift]];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 14, padding: 8, boxShadow: SH }}>
        {subs.map(([id, label, Icon]) => { const on = sub === id; return <button key={id} onClick={() => setSub(id)} style={{ display: "flex", alignItems: "center", gap: 7, border: "none", background: on ? C.green : "transparent", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 14, padding: "9px 15px", borderRadius: 10, cursor: "pointer" }}><Icon size={16} />{label}{id === "products" && lowCount ? <span style={{ background: on ? "rgba(255,255,255,.25)" : C.amber, color: "#fff", borderRadius: 20, fontSize: 11, padding: "1px 7px", fontWeight: 800 }}>{lowCount}</span> : null}</button>; })}
      </div>
      {sub === "products" && <MgrProducts state={state} setState={setState} />}
      {sub === "design" && <StoreDesign state={state} setState={setState} />}
      {sub === "prizes" && <MgrPrizes state={state} setState={setState} />}
    </div>
  );
}

function MgrOrders({ state, setState }) {
  const [view, setView] = useState(null); const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState("new"); const [q, setQ] = useState("");
  const orders = [...state.orders].sort((a, b) => b.date - a.date);
  const drivers = state.staff.filter((s) => hasRole(s, "driver"));
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cnt = {
    new: orders.filter((o) => o.status === "new").length,
    picked: orders.filter((o) => o.status === "picked").length,
    transit: orders.filter((o) => o.status === "assigned" || o.status === "collected").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    today: orders.filter((o) => o.date >= today.getTime()).length,
  };
  const revToday = orders.filter((o) => o.date >= today.getTime()).reduce((s, o) => s + orderTotal(o, state.products), 0);
  const inFilter = (o) => filter === "all" ? true : filter === "new" ? o.status === "new" : filter === "picked" ? o.status === "picked" : filter === "transit" ? (o.status === "assigned" || o.status === "collected") : filter === "delivered" ? o.status === "delivered" : filter === "today" ? o.date >= today.getTime() : true;
  const inSearch = (o) => { if (!q.trim()) return true; const c = state.clients.find((x) => x.id === o.clientId); const hay = (o.id + " " + (c ? c.name : "") + " " + dayStr(o.date)).toLowerCase(); return hay.includes(q.trim().toLowerCase()); };
  const list = orders.filter((o) => inFilter(o) && inSearch(o));
  const assign = (oid, did) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, status: o.status === "new" ? "new" : "assigned", driverId: did } : o) }));
  const markPaid = (oid) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, paid: true } : o) }));
  const slotDayLabel = (ds) => { const d = new Date(ds); return isNaN(d.getTime()) ? ds : d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "numeric" }); };
  const setSlot = (oid, patch) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, ...patch, delivNotified: false } : o) }));
  const winPart = (o, i) => { const w = o.delivWindow || ""; return w.includes("-") ? w.split("-")[i] : ""; };
  const setWinPart = (o, i, val) => { const from = i === 0 ? val : winPart(o, 0); const to = i === 1 ? val : winPart(o, 1); setSlot(o.id, { delivWindow: (from || to) ? (from + "-" + to) : "" }); };
  const notifyClient = (o) => { const items = o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p ? p.name : ""}×${it.cartons}`; }).join(", "); const text = `עדכון הזמנה #${o.id}: האספקה נקבעה ליום ${slotDayLabel(o.delivDate)}, בין השעות ${o.delivWindow}. פריטים: ${items}. סכום משוער: ${NIS(orderTotal(o, state.products))}.`; setState((s) => ({ ...s, messages: [...s.messages, { id: "m" + Date.now(), clientId: o.clientId, fromRole: "manager", fromName: "מערכת", text, ts: Date.now() }], orders: s.orders.map((x) => x.id === o.id ? { ...x, delivNotified: true } : x) })); };

  const chips = [["new", "לליקוט", cnt.new, "amber"], ["picked", "מוכנות למשלוח", cnt.picked, "blue"], ["transit", "בדרך", cnt.transit, "plum"], ["delivered", "בוצעו", cnt.delivered, "green"], ["today", "מכירות היום", cnt.today, "green"], ["all", "הכל", orders.length, "green"]];
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        <button onClick={() => setFilter("new")} style={kpiBtn(filter === "new")}><Kpi icon={<AlertTriangle size={17} />} label="לליקוט" value={cnt.new} tone="amber" bare /></button>
        <button onClick={() => setFilter("picked")} style={kpiBtn(filter === "picked")}><Kpi icon={<ClipboardCheck size={17} />} label="מוכנות למשלוח" value={cnt.picked} tone="blue" bare /></button>
        <button onClick={() => setFilter("transit")} style={kpiBtn(filter === "transit")}><Kpi icon={<Truck size={17} />} label="בדרך ללקוח" value={cnt.transit} tone="plum" bare /></button>
        <button onClick={() => setFilter("today")} style={kpiBtn(filter === "today")}><Kpi icon={<Wallet size={17} />} label="מכירות היום" value={NIS(revToday)} tone="green" bare /></button>
      </div>
      <Panel style={{ boxShadow: SH }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {chips.map(([id, lbl, n, tone]) => { const on = filter === id; return <button key={id} onClick={() => setFilter(id)} style={{ border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.sub, borderRadius: 20, padding: "6px 13px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{lbl} <span style={{ opacity: .8 }}>({n})</span></button>; })}
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", minWidth: 200 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: מס' הזמנה / לקוח / תאריך" style={{ border: "none", outline: "none", padding: "8px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        </div>
        {list.length === 0 ? <Empty>אין הזמנות בקטגוריה זו</Empty> : <div style={{ display: "grid", gap: 8 }}>
          {list.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); const st = STATUS[o.status]; return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}{o.byAgent && <span style={{ fontSize: 11, color: C.plum, fontWeight: 600 }}> · ע"י {o.byAgent}</span>}</span><span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{st.label}</span></div>
              <div style={{ fontSize: 13, color: C.sub, margin: "5px 0" }}>{dayStr(o.date)} · {o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
              {o.pickedBy && <div style={{ fontSize: 12, color: C.sub, marginBottom: 5, display: "flex", alignItems: "center", gap: 4 }}><Scale size={12} /> ליקט: {o.pickedBy}</div>}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <Badge tone="green">{orderCartons(o)} קרטונים</Badge>
                {hasShortage(o) && <Badge tone="amber"><AlertTriangle size={11} /> חוסרים</Badge>}
                {o.delivDate && o.delivWindow && <Badge tone="blue"><Clock size={11} /> {slotDayLabel(o.delivDate)} · {o.delivWindow}</Badge>}
                <button onClick={() => setView(o)} style={miniBtn}><Receipt size={13} /> צפייה</button>
                {o.status === "new" && <button onClick={() => setEdit(o)} style={{ ...miniBtn, color: C.blue, borderColor: C.blue }}><Pencil size={13} /> שינוי</button>}
                {o.status === "delivered" && (o.paid ? <Badge tone="green">שולם</Badge> : <button onClick={() => markPaid(o.id)} style={{ ...miniBtn, color: C.amber, borderColor: C.amber }}><Wallet size={13} /> סמן כשולם</button>)}
                <div style={{ flex: 1 }} /><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span>
              </div>
              {(o.status === "picked" || o.status === "assigned" || o.status === "collected") && (
                <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: C.sub }}>{o.driverId ? "שנה נהג:" : "הצב לנהג:"}</span>
                  {drivers.map((d) => { const on = o.driverId === d.id; return <button key={d.id} onClick={() => assign(o.id, d.id)} style={{ border: `1px solid ${C.plum}`, color: on ? "#fff" : C.plum, background: on ? C.plum : C.plumSoft, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{d.name}</button>; })}
                </div>
              )}
              {o.status !== "delivered" && (
                <div style={{ marginTop: 8, borderTop: `1px dashed ${C.line}`, paddingTop: 8, display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
                  <label style={{ fontSize: 11, color: C.sub }}>יום אספקה<br /><input type="date" value={o.delivDate || ""} onChange={(e) => setSlot(o.id, { delivDate: e.target.value })} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 8px", fontSize: 13, fontFamily: "inherit", marginTop: 3 }} /></label>
                  <div style={{ fontSize: 11, color: C.sub }}>טווח שעות<div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}><input type="time" value={winPart(o, 0)} onChange={(e) => setWinPart(o, 0, e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 8px", fontSize: 13, fontFamily: "inherit" }} /><span style={{ color: C.sub }}>עד</span><input type="time" value={winPart(o, 1)} onChange={(e) => setWinPart(o, 1, e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 8px", fontSize: 13, fontFamily: "inherit" }} /></div></div>
                  <button onClick={() => notifyClient(o)} disabled={!o.delivDate || !(o.delivWindow && o.delivWindow.split("-")[0] && o.delivWindow.split("-")[1])} style={{ border: "none", background: (o.delivDate && o.delivWindow && o.delivWindow.split("-")[0] && o.delivWindow.split("-")[1]) ? C.green : "#C9D3C7", color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Send size={14} /> עדכן לקוח</button>
                  {o.delivNotified && <Badge tone="green"><Check size={11} /> הלקוח עודכן</Badge>}
                </div>
              )}
            </div>
          ); })}
        </div>}
      </Panel>
      {view && <InvoiceModal order={view} state={state} onClose={() => setView(null)} withAddress />}
      {edit && <EditOrder order={edit} state={state} setState={setState} onClose={() => setEdit(null)} />}
    </div>
  );
}

function MgrProducts({ state, setState }) {
  const [add, setAdd] = useState(false); const [q, setQ] = useState(""); const [newCat, setNewCat] = useState("");
  const cats = state.cats || [];
  const addCat = () => { const v = newCat.trim(); if (!v) return; setState((s) => ({ ...s, cats: [...(s.cats || []), v].filter((x, i, a) => a.indexOf(x) === i) })); setNewCat(""); };
  const removeCat = (cat) => setState((s) => ({ ...s, cats: (s.cats || []).filter((c) => c !== cat), products: s.products.map((pr) => pr.cat === cat ? { ...pr, cat: "" } : pr) }));
  const products = state.products;
  const upd = (pid, k, v) => setState((s) => ({ ...s, products: s.products.map((p) => p.id === pid ? { ...p, [k]: v } : p) }));
  const num = (pid, k, v) => upd(pid, k, Math.max(0, v));
  const del = (pid) => setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== pid) }));
  const pickImg = (pid, file) => { if (!file) return; const r = new FileReader(); r.onload = () => upd(pid, "img", r.result); r.readAsDataURL(file); };
  const low = products.filter((p) => p.stock <= LOW);
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {low.length > 0 && <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.amberSoft, border: "1px solid #E4D3A8", color: "#7A5A17", borderRadius: 14, padding: "12px 16px", fontSize: 14, flexWrap: "wrap" }}><AlertTriangle size={18} style={{ color: C.amber }} /><b>מלאי נמוך / אזל:</b>{low.map((p) => <span key={p.id}>{p.emoji} {p.name} ({p.stock === 0 ? "אזל" : p.stock})</span>)}</div>}
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Boxes size={18} />} extra={<button onClick={() => setAdd(true)} style={{ display: "flex", alignItems: "center", gap: 5, border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "7px 13px", borderRadius: 9, cursor: "pointer" }}><Plus size={15} /> מוצר חדש</button>}>ניהול מוצרים ומלאי</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מוצר" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 14, background: "#F7F9FC", borderRadius: 10, padding: 10 }}><span style={{ fontSize: 13, color: C.sub, fontWeight: 700 }}>קטגוריות:</span>{cats.map((cat) => <span key={cat} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.greenSoft, color: C.greenDeep, borderRadius: 20, padding: "4px 10px", fontSize: 12.5, fontWeight: 700 }}>{cat}<button onClick={() => removeCat(cat)} style={{ border: "none", background: "transparent", color: C.greenDeep, cursor: "pointer", padding: 0, display: "flex" }}><X size={13} /></button></span>)}<input value={newCat} onChange={(e) => setNewCat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCat()} placeholder="קטגוריה חדשה" style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 10px", fontSize: 13, fontFamily: "inherit" }} /><button onClick={addCat} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "6px 12px", borderRadius: 8, cursor: "pointer" }}>הוסף</button></div>
        <div style={{ display: "grid", gap: 10 }}>
          {products.filter((p) => !q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase())).map((p) => { const isC = p.unit === "carton"; const unitTxt = isC ? "קרטון" : "ק\"ג"; const m = p.price - p.cost; const out = p.stock <= 0, lw = p.stock > 0 && p.stock <= LOW; return (
            <div key={p.id} style={{ border: `1px solid ${C.line}`, borderRadius: 14, padding: 12, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <label style={{ cursor: "pointer", position: "relative" }}><ProdThumb p={p} size={54} /><input type="file" accept="image/*" onChange={(e) => pickImg(p.id, e.target.files[0])} style={{ display: "none" }} /><span style={{ position: "absolute", bottom: -4, left: -4, background: C.green, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}><ImageIcon size={11} /></span></label>
              <div style={{ minWidth: 120 }}><div style={{ fontWeight: 700 }}>{p.name}</div><select value={p.unit} onChange={(e) => upd(p.id, "unit", e.target.value)} style={{ marginTop: 4, border: `1px solid ${C.line}`, borderRadius: 8, padding: "3px 6px", fontSize: 12, fontFamily: "inherit" }}><option value="weight">לפי משקל</option><option value="carton">לפי קרטון</option></select><select value={p.cat || ""} onChange={(e) => upd(p.id, "cat", e.target.value)} style={{ marginTop: 4, marginInlineStart: 4, border: `1px solid ${C.line}`, borderRadius: 8, padding: "3px 6px", fontSize: 12, fontFamily: "inherit" }}><option value="">ללא קטגוריה</option>{cats.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
              <LabIn label={"עלות " + unitTxt} val={isC ? p.cost * p.kg : p.cost} step="0.1" onChange={(v) => num(p.id, "cost", isC ? v / p.kg : v)} />
              <LabIn label={"מחיר " + unitTxt} val={isC ? p.price * p.kg : p.price} step="0.1" onChange={(v) => num(p.id, "price", isC ? v / p.kg : v)} />
              <LabIn label={'ק"ג/קרטון'} val={p.kg} onChange={(v) => num(p.id, "kg", v)} />
              {isC && <LabIn label="יח' בקרטון" val={p.units || 0} onChange={(v) => num(p.id, "units", v)} />}
              <div style={{ fontSize: 12, color: C.sub }}>רווח<br /><b style={{ color: m <= 0 ? C.red : C.greenDeep, fontSize: 14 }}>{NIS(isC ? m * p.kg : m)}/{unitTxt}</b></div>
              <LabIn label="מלאי" val={p.stock} onChange={(v) => num(p.id, "stock", v)} />
              <span style={{ fontSize: 12, fontWeight: 700, color: out ? C.red : lw ? C.amber : C.green }}>{out ? "אזל" : lw ? "נמוך" : "תקין"}</span>
              <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.sub }}><input type="checkbox" checked={!!p.noPrice} onChange={(e) => upd(p.id, "noPrice", e.target.checked)} /> ללא מחיר</label>
              <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.sub }}><input type="checkbox" checked={p.vatIncluded !== false} onChange={(e) => upd(p.id, "vatIncluded", e.target.checked)} /> כולל מע"מ</label>
              <button onClick={() => del(p.id)} title="מחק מוצר" style={{ marginInlineStart: "auto", border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button>
            </div>
          ); })}
        </div>
      </Panel>
      {add && <AddProduct state={state} setState={setState} onClose={() => setAdd(false)} />}
    </div>
  );
}
function AddProduct({ state, setState, onClose }) {
  const [f, setF] = useState({ name: "", unit: "weight", kg: 10, units: "", cost: "", price: "", stock: "", emoji: "🥗", img: "", noPrice: false, vatIncluded: true, cat: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const pickImg = (file) => { if (!file) return; const r = new FileReader(); r.onload = () => setF((s) => ({ ...s, img: r.result })); r.readAsDataURL(file); };
  const unitTxt = f.unit === "carton" ? "קרטון" : "ק\"ג";
  const save = () => {
    if (!f.name.trim()) return setErr("שם המוצר חובה");
    const kg = Math.max(1, +f.kg || 1);
    const cRaw = Math.max(0, +f.cost || 0), pRaw = Math.max(0, +f.price || 0);
    const prod = { id: "p" + Date.now(), name: f.name.trim(), unit: f.unit, kg, units: Math.max(0, +f.units || 0), cost: f.unit === "carton" ? cRaw / kg : cRaw, price: f.noPrice ? 0 : (f.unit === "carton" ? pRaw / kg : pRaw), stock: Math.max(0, +f.stock || 0), emoji: f.emoji || "🥗", img: f.img, noPrice: f.noPrice, vatIncluded: f.vatIncluded, cat: f.cat };
    setState((s) => ({ ...s, products: [...s.products, prod] }));
    onClose();
  };
  return (
    <Modal onClose={onClose} title="הוספת מוצר חדש">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <ProdThumb p={{ img: f.img, emoji: f.emoji || "🥗", id: "new" }} size={54} />
        <div style={{ fontSize: 12.5, color: C.sub }}>תצוגה מקדימה · אפשר להעלות תמונה או להשתמש באימוג'י</div>
      </div>
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם המוצר *" value={f.name} onChange={set("name")} />
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>סוג יחידה</div><select value={f.unit} onChange={set("unit")} style={fieldStyle}><option value="weight">לפי משקל</option><option value="carton">לפי קרטון</option></select></label>
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>קטגוריה</div><select value={f.cat} onChange={set("cat")} style={fieldStyle}><option value="">ללא קטגוריה</option>{(state.cats || []).map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></label>
        <Field label={'ק"ג לקרטון'} type="number" value={f.kg} onChange={set("kg")} />
        {f.unit === "carton" && <Field label="יחידות בקרטון" type="number" value={f.units} onChange={set("units")} />}
        <Field label="מלאי (קרטונים)" type="number" value={f.stock} onChange={set("stock")} />
        <Field label={"עלות ל" + unitTxt + " (₪)"} type="number" value={f.cost} onChange={set("cost")} />
        <Field label={"מחיר ל" + unitTxt + " (₪)"} type="number" value={f.price} onChange={set("price")} disabled={f.noPrice} />
        <Field label="אימוג'י" value={f.emoji} onChange={set("emoji")} />
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.sub, cursor: "pointer" }}><input type="checkbox" checked={f.noPrice} onChange={(e) => setF((s) => ({ ...s, noPrice: e.target.checked }))} /> ללא מחיר (לפי הצעת מחיר)</label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.sub, cursor: "pointer" }}><input type="checkbox" checked={f.vatIncluded !== false} onChange={(e) => setF((s) => ({ ...s, vatIncluded: e.target.checked }))} /> המחיר כולל מע"מ</label>
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>תמונה</div><label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "9px 12px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> {f.img ? "הוחלפה ✓" : "העלה תמונה"}<input type="file" accept="image/*" onChange={(e) => pickImg(e.target.files[0])} style={{ display: "none" }} /></label></label>
      </div>
      {err && <ErrBox>{err}</ErrBox>}
      <SubmitBtn onClick={save}>הוסף מוצר</SubmitBtn>
    </Modal>
  );
}

function CenterWrap({ children, color }) {
  return <div dir="rtl" style={{ minHeight: "100vh", fontFamily: FONT, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 16px", background: `radial-gradient(1200px 500px at 50% -8%, ${color}22, ${C.bg})` }}>{children}</div>;
}
function StorePage({ supplier, state, setState, onLogin }) {
  const [mode, setMode] = useState("view");
  const color = (supplier.brand && supplier.brand.color) || C.green;
  const font = (supplier.brand && supplier.brand.font) || "Rubik";
  const scale = (supplier.brand && supplier.brand.fontScale) || 1;
  const bg = bgStyle((supplier.brand && supplier.brand.bg) || "soft", color, supplier.brand && supplier.brand.bgColor);
  const fontColor = (supplier.brand && supplier.brand.fontColor) || C.ink;
  const borderW = (supplier.brand && supplier.brand.borderW != null) ? supplier.brand.borderW : 1.5;
  const fam = `'${font}', ${FONT}`;
  const fs = (n) => Math.round(n * scale);
  useEffect(() => { if (font === "Rubik") return; const id = "gf-" + font.replace(/\s+/g, ""); if (document.getElementById(id)) return; const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + font.replace(/\s+/g, "+") + ":wght@400;600;700;800&display=swap"; document.head.appendChild(l); }, [font]);
  const back = () => setMode("view");
  if (mode === "login") return <CenterWrap color={color}><LoginForm state={state} onLogin={onLogin} back={back} onForgot={() => setMode("forgot")} /></CenterWrap>;
  if (mode === "forgot") return <CenterWrap color={color}><ForgotForm state={state} back={() => setMode("login")} /></CenterWrap>;
  if (mode === "register") return <CenterWrap color={color}><RegisterForm state={state} setState={setState} back={back} lockSupplier={supplier.id} /></CenterWrap>;
  const prods = supplier.products.filter((p) => p.stock > 0).slice(0, 12);
  return (
    <div dir="rtl" style={{ minHeight: "100vh", fontFamily: fam, background: bg, color: fontColor }}>
      <div style={{ background: `linear-gradient(135deg, ${color}, ${shade(color)})`, color: "#fff", padding: "40px 20px 46px", boxShadow: "0 4px 20px rgba(0,0,0,.12)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <Logo size={66} img={supplier.brand && supplier.brand.logo} name={supplier.name} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: fs(27), fontWeight: 800, letterSpacing: "-0.5px" }}>{supplier.name}</div>
            <div style={{ opacity: .92, marginTop: 4, fontSize: fs(15) }}>{(supplier.brand && supplier.brand.tagline) || "ספק לעסקים"}</div>
            <div style={{ marginTop: 6, fontSize: fs(12.5), opacity: .85, display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.18)", padding: "3px 10px", borderRadius: 20 }}>{supplier.category}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setMode("register")} style={{ border: "none", background: "#fff", color, fontWeight: 800, fontSize: fs(15), padding: "12px 22px", borderRadius: 12, cursor: "pointer" }}>הרשמה להזמנה</button>
            <button onClick={() => setMode("login")} style={{ border: "1.5px solid rgba(255,255,255,.75)", background: "transparent", color: "#fff", fontWeight: 800, fontSize: fs(15), padding: "12px 22px", borderRadius: 12, cursor: "pointer" }}>כניסת לקוח</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 20px 60px" }}>
        <h2 style={{ fontSize: fs(19), fontWeight: 800, margin: "0 0 14px" }}>המוצרים שלנו</h2>
        {prods.length === 0 ? <div style={{ color: C.sub }}>הקטלוג יתעדכן בקרוב.</div> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
            {prods.map((p) => (
              <div key={p.id} style={{ border: `${Math.max(1.5, borderW)}px solid ${borderW > 0 ? color : C.line}`, borderRadius: 16, padding: 12, background: "#fff", boxShadow: SH }}>
                <ProdThumb p={p} tint={color} /><div style={{ fontWeight: 700, marginTop: 8, fontSize: fs(14), color: C.ink }}>{p.name}</div>
                <div style={{ fontSize: fs(12), color: C.sub }}>{p.unit === "carton" ? (p.units ? "קרטון · " + p.units + " יחידות" : "לפי קרטון") : "קרטון " + p.kg + " ק\"ג"}</div>
                <div style={{ fontWeight: 800, marginTop: 4, color, fontSize: fs(15) }}>{noPrice(p) ? "לפי הצעת מחיר" : <>{NIS(cartonPriceGross(p))} <span style={{ fontSize: fs(11), color: C.sub, fontWeight: 500 }}>/ קרטון</span></>}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <button onClick={() => setMode("register")} style={{ border: "none", background: color, color: "#fff", fontWeight: 800, fontSize: fs(16), padding: "14px 32px", borderRadius: 14, cursor: "pointer", boxShadow: `0 6px 18px ${color}55` }}>הצטרפו והזמינו מ{supplier.name}</button>
          <div style={{ fontSize: 12, color: C.sub, marginTop: 14 }}>מופעל על ידי B2B+ · ממשק הזמנות מהספק לעסק</div>
        </div>
      </div>
    </div>
  );
}
function StoreDesign({ state, setState }) {
  const feat = state.features || { prizes: true, chat: true, minOrder: 5 };
  const b = state.brand || {};
  const [f, setF] = useState({ name: state.name || "", tagline: b.tagline || "", category: state.category || "", regions: state.regions || "", color: b.color || C.green, bg: b.bg || "soft", bgColor: b.bgColor || "#F4F7F1", fontColor: b.fontColor || C.ink, font: b.font || "Rubik", fontScale: b.fontScale || 1, borderW: b.borderW == null ? 2.5 : b.borderW });
  const [copied, setCopied] = useState(false);
  useEffect(() => { if (f.font === "Rubik") return; const id = "gf-" + f.font.replace(/\s+/g, ""); if (document.getElementById(id)) return; const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + f.font.replace(/\s+/g, "+") + ":wght@400;600;700;800&display=swap"; document.head.appendChild(l); }, [f.font]);
  const pickLogo = (file) => { if (!file) return; const r = new FileReader(); r.onload = () => setState((s) => ({ ...s, brand: { ...(s.brand || {}), logo: r.result } })); r.readAsDataURL(file); };
  const save = () => setState((s) => ({ ...s, name: f.name || s.name, category: f.category, regions: f.regions, brand: { ...(s.brand || {}), tagline: f.tagline, color: f.color, bg: f.bg, bgColor: f.bgColor, fontColor: f.fontColor, font: f.font, fontScale: f.fontScale, borderW: f.borderW } }));
  const setFeat = (k, v) => setState((s) => ({ ...s, features: { ...(s.features || { prizes: true, chat: true, minOrder: 5 }), [k]: v } }));
  const storeUrl = (typeof window !== "undefined" ? window.location.origin + window.location.pathname : "") + "?store=" + state.id;
  const copy = () => { try { navigator.clipboard.writeText(storeUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {} };
  const shareMsg = "בואו להזמין מ" + state.name + " 🛒\n" + storeUrl;
  const shareBtn = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 10, textDecoration: "none", border: "none", cursor: "pointer", fontFamily: "inherit" });
  const swatches = ["#1F7A4D", "#2C6E9B", "#B23B3B", "#B4791F", "#6D3B8E", "#0E7C86", "#C2410C", "#334155"];
  const fam = `'${f.font}', ${FONT}`;
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Building2 size={18} />}>עיצוב החנות</SectionTitle>
        <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, border: `1px solid ${C.line}` }}>
          <div style={{ background: bgStyle(f.bg, f.color, f.bgColor), padding: 16, fontFamily: fam, color: f.fontColor }}>
            <div style={{ background: `linear-gradient(135deg, ${f.color}, ${shade(f.color)})`, color: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <Logo size={46} img={state.brand && state.brand.logo} name={f.name || state.name} />
              <div><div style={{ fontWeight: 800, fontSize: Math.round(18 * f.fontScale) }}>{f.name || state.name}</div><div style={{ opacity: .9, fontSize: Math.round(12 * f.fontScale) }}>{f.tagline || "החנות שלך"}</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {[["עגבניות", "🍅", 45], ["מלפפונים", "🥒", 38]].map(([nm, em, pr]) => (
                <div key={nm} style={{ background: "#fff", border: `${f.borderW}px solid ${f.color}`, borderRadius: 12, padding: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: f.color + "1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{em}</div>
                  <div style={{ fontWeight: 700, marginTop: 6, fontSize: Math.round(13 * f.fontScale), color: f.fontColor }}>{nm}</div>
                  <div style={{ fontWeight: 800, color: f.color, fontSize: Math.round(14 * f.fontScale) }}>₪{pr} <span style={{ fontSize: Math.round(10 * f.fontScale), color: C.sub, fontWeight: 500 }}>/ קרטון</span></div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, background: "#fff", borderRadius: 12, padding: "10px 12px" }}>
              <span style={{ fontSize: Math.round(12 * f.fontScale), color: C.sub }}>לתשלום</span>
              <span style={{ fontWeight: 800, color: f.color, fontSize: Math.round(17 * f.fontScale) }}>₪166</span>
              <div style={{ flex: 1 }} />
              <span style={{ background: f.color, color: "#fff", borderRadius: 10, padding: "9px 18px", fontWeight: 800, fontSize: Math.round(13 * f.fontScale) }}>שלח הזמנה</span>
            </div>
          </div>
          <div style={{ padding: 10, fontSize: 12, color: C.sub, background: "#fff", textAlign: "center" }}>תצוגה מקדימה חיה — כך הלקוח יראה את החנות (צבע · גופן · גודל)</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <Logo size={50} img={state.brand && state.brand.logo} name={state.name} />
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> החלף לוגו<input type="file" accept="image/*" onChange={(e) => pickLogo(e.target.files[0])} style={{ display: "none" }} /></label>
        </div>
        <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
          <Field label="שם החנות" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Field label="קטגוריה" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} placeholder="ירקות ופירות / מאפייה / בשרים" />
        </div>
        <Field label="סלוגן" value={f.tagline} onChange={(e) => setF({ ...f, tagline: e.target.value })} placeholder="למשל: ירקות ופירות טריים לעסקים" />
        <Field label="אזורי עבודה (מופרדים בפסיק)" value={f.regions} onChange={(e) => setF({ ...f, regions: e.target.value })} placeholder="למשל: מרכז, השרון, ירושלים" />
        <div style={{ fontSize: 13, color: C.sub, margin: "6px 0 6px" }}>צבע מסגרות המוצרים</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {swatches.map((sw) => <button key={sw} onClick={() => setF({ ...f, color: sw })} style={{ width: 30, height: 30, borderRadius: 8, background: sw, border: f.color === sw ? "3px solid #182620" : "2px solid #fff", boxShadow: "0 0 0 1px #ddd", cursor: "pointer" }} />)}
          <input type="color" value={f.color} onChange={(e) => setF({ ...f, color: e.target.value })} style={{ width: 38, height: 32, border: "none", background: "none", cursor: "pointer" }} />
        </div>

        <button onClick={save} style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 12, border: "none", background: f.color, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>שמור עיצוב</button>
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Gift size={18} />}>פיצ'רים בחנות</SectionTitle>
        <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 14, cursor: "pointer" }}><input type="checkbox" checked={feat.prizes !== false} onChange={(e) => setFeat("prizes", e.target.checked)} /> תוכנית יעדים ופרסים ללקוחות</label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 14, cursor: "pointer" }}><input type="checkbox" checked={feat.chat !== false} onChange={(e) => setFeat("chat", e.target.checked)} /> צ'אט / תמיכה ללקוחות</label>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 14 }}>מינימום הזמנה: <input type="number" value={feat.minOrder || 5} onChange={(e) => setFeat("minOrder", Math.max(1, +e.target.value))} style={{ width: 66, border: `1px solid ${C.line}`, borderRadius: 8, padding: "5px", textAlign: "center" }} /> קרטונים</div>
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Receipt size={18} />}>פרטי חשבונית לעסק</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>פרטים אלה יופיעו בכל חשבונית שהלקוחות מקבלים.</div>
        <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
          <Field label="ע.מ / ח.פ" value={(state.biz && state.biz.taxId) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), taxId: e.target.value } }))} />
          <Field label="כתובת העסק" value={(state.biz && state.biz.address) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), address: e.target.value } }))} />
          <Field label="טלפון" value={(state.biz && state.biz.phone) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), phone: e.target.value } }))} />
          <Field label="אימייל לחשבוניות" value={(state.biz && state.biz.email) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), email: e.target.value } }))} />
        </div>
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Send size={18} />}>הקישור לחנות שלך</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>שלח את הקישור ללקוחות — הוא פותח את החנות שלך עם הקטלוג וכפתורי הרשמה/כניסה.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input readOnly value={storeUrl} onFocus={(e) => e.target.select()} style={{ flex: 1, minWidth: 220, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, background: "#F7F9F5", color: C.ink, fontFamily: "inherit" }} />
          <button onClick={copy} style={{ border: "none", background: copied ? C.greenDeep : C.green, color: "#fff", fontWeight: 800, padding: "0 20px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>{copied ? <Check size={16} /> : <Download size={16} />}{copied ? "הועתק!" : "העתק קישור"}</button>
        </div>
        <div style={{ fontSize: 13, color: C.sub, margin: "14px 0 8px" }}>שיתוף מהיר:</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`} target="_blank" rel="noopener noreferrer" style={shareBtn("#25D366")}><MessageCircle size={16} /> וואטסאפ</a>
          <a href={`mailto:?subject=${encodeURIComponent(state.name)}&body=${encodeURIComponent(shareMsg)}`} style={shareBtn("#5A6B80")}><Mail size={16} /> מייל</a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}`} target="_blank" rel="noopener noreferrer" style={shareBtn("#1877F2")}><Facebook size={16} /> פייסבוק</a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(storeUrl)}&text=${encodeURIComponent(state.name)}`} target="_blank" rel="noopener noreferrer" style={shareBtn("#229ED9")}><Send size={16} /> טלגרם</a>
          <a href={`sms:?&body=${encodeURIComponent(shareMsg)}`} style={shareBtn("#7A5AF8")}><MessageSquare size={16} /> SMS</a>
          <button onClick={() => { try { if (navigator.share) { navigator.share({ title: state.name, text: shareMsg, url: storeUrl }); } else { copy(); } } catch (e) {} }} style={shareBtn(C.green)}><Share2 size={16} /> עוד…</button>
        </div>
      </Panel>
    </div>
  );
}
function downloadInvoice(order, state) {
  const c = state.clients.find((x) => x.id === order.clientId);
  const biz = state.biz || {};
  const color = (state.brand && state.brand.color) || "#0B2A63";
  const gross = orderTotal(order, state.products);
  const net = gross / (1 + VAT), vat = gross - net;
  const rows = order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); if (!p) return ""; const isC = p.unit === "carton"; const w = isC ? "—" : (it.actualKg != null ? KGL(it.actualKg) : "~" + KGL(it.cartons * p.kg)); const amt = noPrice(p) ? "לפי הצעה" : NIS(lineTotal(it, p)); return `<tr><td>${p.emoji} ${p.name}</td><td>${it.cartons} קרטונים</td><td>${w}</td><td>${amt}</td></tr>`; }).join("");
  const html = `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>חשבונית ${order.invNo || order.id}</title><style>body{font-family:system-ui,Arial;padding:32px;color:#182620}h1{color:${color};margin:0;font-size:24px}table{width:100%;border-collapse:collapse;margin-top:16px}td,th{border-bottom:1px solid #E4E9DE;padding:8px;text-align:right}thead tr{background:${color};color:#fff}.tot{margin-top:16px;text-align:left;line-height:1.8}.tot b{font-size:20px;color:${color}}.hd{display:flex;justify-content:space-between;border-bottom:3px solid ${color};padding-bottom:10px}</style></head><body><div class="hd"><div><h1>${state.name}</h1><div style="color:#5B6B60;font-size:13px">${biz.taxId ? "ע.מ/ח.פ: " + biz.taxId + "<br>" : ""}${biz.address || ""}${biz.phone ? "<br>טל' " + biz.phone : ""}</div></div><div style="text-align:left"><div style="font-weight:800;color:${color};font-size:18px">חשבונית מס</div><div style="color:#5B6B60;font-size:13px">מס' ${order.invNo || order.id}<br>${new Date(order.date).toLocaleDateString("he-IL")}</div></div></div><div style="margin-top:12px">לכבוד: <b>${c ? c.name : ""}</b>${c && c.taxId ? " · ע.מ/ח.פ " + c.taxId : ""}<br>${c && c.address ? c.address : ""}</div><table><thead><tr><th>מוצר</th><th>כמות</th><th>משקל</th><th>סכום</th></tr></thead><tbody>${rows}</tbody></table><div class="tot">סכום לפני מע"מ: ${NIS(net)}<br>מע"מ ${Math.round(VAT * 100)}%: ${NIS(vat)}<br><b>סה"כ לתשלום: ${NIS(gross)}</b></div><p style="color:#5B6B60;font-size:12px">תשלום ב${(PAY[c ? c.pay : "cash"] || PAY.cash).label} · מופק ע"י ${state.name}</p></body></html>`;
  try { const blob = new Blob([html], { type: "text/html;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "invoice-" + (order.invNo || order.id) + ".html"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (e) {}
}
function InvoiceModal({ order, state, onClose, withAddress }) {
  const c = state.clients.find((x) => x.id === order.clientId);
  const priced = order.status === "delivered" || order.status === "picked";
  const color = (state.brand && state.brand.color) || C.greenDeep;
  const biz = state.biz || {};
  const pay = PAY[c ? c.pay : "cash"] || PAY.cash;
  const gross = orderTotal(order, state.products);
  const net = gross / (1 + VAT), vat = gross - net;
  const anyNoPrice = order.items.some((it) => { const p = state.products.find((x) => x.id === it.pid); return p && noPrice(p); });
  return (
    <Modal onClose={onClose} title={priced ? "חשבונית" : "פרטי הזמנה"}>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, padding: 18, background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `2px solid ${color}`, paddingBottom: 12, marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Logo size={42} img={state.brand && state.brand.logo} name={state.name} />
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.ink }}>{state.name}</div>
              {biz.taxId ? <div>ע.מ / ח.פ: {biz.taxId}</div> : null}
              {biz.address ? <div>{biz.address}</div> : null}
              {biz.phone ? <div>טלפון: {biz.phone}</div> : null}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color }}>{priced ? "חשבונית מס" : "אישור הזמנה"}</div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>מס' {order.invNo || order.id}<br />{new Date(order.date).toLocaleDateString("he-IL")}<br /><span style={{ color: STATUS[order.status].color, fontWeight: 700 }}>{STATUS[order.status].label}</span></div>
          </div>
        </div>
        <div style={{ fontSize: 13, marginBottom: 10 }}><span style={{ color: C.sub }}>לכבוד:</span> <b>{c ? c.name : ""}</b>{c && c.taxId ? " · ע.מ/ח.פ " + c.taxId : ""}{c && c.contact ? " · " + c.contact : ""}{withAddress && c && c.address ? <div style={{ fontSize: 12.5, color: C.sub, marginTop: 2, display: "flex", gap: 5, alignItems: "center" }}><MapPin size={13} /> {c.address} · {c.phone}</div> : null}</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead><tr style={{ background: color, color: "#fff", textAlign: "right" }}><Th>מוצר</Th><Th>כמות</Th><Th>משקל</Th><Th>סכום</Th></tr></thead>
          <tbody>{order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); if (!p) return null; const isC = p.unit === "carton"; return (<tr key={it.pid} style={{ borderBottom: `1px solid ${C.line}` }}><Td>{p.emoji} {p.name}</Td><Td>{it.cartons} קרטונים{suppliedOf(it) < it.cartons ? " (סופקו " + suppliedOf(it) + ")" : ""}</Td><Td>{isC ? "—" : (it.actualKg != null ? KGL(it.actualKg) : "~" + KGL(it.cartons * p.kg))}</Td><Td strong>{noPrice(p) ? "לפי הצעה" : NIS(lineTotal(it, p))}</Td></tr>); })}</tbody>
        </table>
        <div style={{ marginInlineStart: "auto", maxWidth: 280, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>סכום לפני מע"מ</span><span style={{ fontWeight: 700 }}>{NIS(net)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>מע"מ {Math.round(VAT * 100)}%</span><span style={{ fontWeight: 700 }}>{NIS(vat)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `2px solid ${color}`, fontWeight: 800, fontSize: 18 }}><span>סה"כ לתשלום</span><span style={{ color }}>{NIS(gross)}</span></div>
        </div>
        {anyNoPrice && <div style={{ fontSize: 12, color: C.amber, marginTop: 8 }}>* פריטים המסומנים "לפי הצעה" יתומחרו בנפרד ואינם כלולים בסכום.</div>}
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10, display: "flex", alignItems: "center", gap: 5 }}><pay.icon size={13} /> תשלום ב{pay.label}{!priced ? " · הסכום ייקבע בשקילה" : ""}</div>
      </div>
      <button onClick={() => downloadInvoice(order, state)} style={{ width: "100%", marginTop: 14, padding: 11, borderRadius: 12, border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Download size={16} /> הורדת חשבונית (להדפסה / PDF)</button>
    </Modal>
  );
}
function MgrPrizes({ state, setState }) {
  const [open, setOpen] = useState(null);
  const perClient = state.clients.filter((c) => c.status === "active").map((c) => ({ ...c, pts: pointsOf(c.id, state.orders, state.products, state.kgPerPoint, state.periodMonths) }));
  const tiers = sortTiers(state.prizeTiers);
  const updateTier = (id, k, v) => setState((s) => ({ ...s, prizeTiers: s.prizeTiers.map((t) => t.id === id ? { ...t, [k]: v } : t) }));
  const addTier = () => setState((s) => { const mx = s.prizeTiers.reduce((m, t) => Math.max(m, t.points), 0); return { ...s, prizeTiers: [...s.prizeTiers, { id: "t" + Date.now(), points: mx + 100, title: "פרס חדש", detail: "", cost: 0 }] }; });
  const removeTier = (id) => setState((s) => ({ ...s, prizeTiers: s.prizeTiers.filter((t) => t.id !== id) }));
  const prizeCost = perClient.reduce((s, c) => { const t = reachedTier(c.pts, tiers); return s + (t ? t.cost || 0 : 0); }, 0);
  return (
    <Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<Gift size={18} />} extra={<button onClick={addTier} style={{ display: "flex", alignItems: "center", gap: 5, border: `1px solid ${C.line}`, background: "#fff", color: C.green, fontWeight: 700, fontSize: 13, padding: "6px 12px", borderRadius: 9, cursor: "pointer" }}><Plus size={15} /> הוסף יעד</button>}>תוכנית היעדים והפרסים · {periodLabel(state.periodMonths)}</SectionTitle>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: C.sub }}>{state.kgPerPoint} ק"ג = נקודה · מתאפס בכל תקופה · לחיצה על מספר הלקוחות מציגה מי הגיע.</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: C.sub, fontWeight: 700 }}>תקופת היעדים:</span>
        <select value={state.periodMonths || 1} onChange={(e) => setState((s) => ({ ...s, periodMonths: +e.target.value }))} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 10px", fontSize: 13, fontFamily: "inherit" }}><option value={1}>כל חודש</option><option value={2}>כל חודשיים</option></select>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {tiers.map((t) => { const winners = perClient.filter((c) => c.pts >= t.points); const isOpen = open === t.id; return (
          <div key={t.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "78px 1fr 1fr 92px 34px", gap: 8, alignItems: "end" }}>
              <TierIn label="נקודות" val={t.points} onChange={(v) => updateTier(t.id, "points", Math.max(1, +v))} />
              <TierTxt label="הפרס" val={t.title} onChange={(v) => updateTier(t.id, "title", v)} />
              <TierTxt label="פרט (יעד/מלון)" val={t.detail} onChange={(v) => updateTier(t.id, "detail", v)} placeholder="החודש: …" />
              <TierIn label="עלות ₪" val={t.cost || 0} onChange={(v) => updateTier(t.id, "cost", Math.max(0, +v))} />
              <button onClick={() => removeTier(t.id)} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button>
            </div>
            <button onClick={() => setOpen(isOpen ? null : t.id)} style={{ marginTop: 8, border: "none", background: "transparent", cursor: "pointer", padding: 0 }}><Badge tone="plum">{winners.length} לקוחות הגיעו · {isOpen ? "הסתר" : "הצג"}</Badge></button>
            {isOpen && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>{winners.length === 0 ? <span style={{ fontSize: 12.5, color: C.sub }}>עדיין אף לקוח</span> : winners.map((w) => <Badge key={w.id} tone="green" icon={<Star size={11} fill={C.greenDeep} />}>{w.name} · {w.pts} נק'</Badge>)}</div>}
          </div>
        ); })}
      </div>
      <div style={{ marginTop: 14, padding: 12, background: C.amberSoft, borderRadius: 12, fontSize: 12.5, color: "#7A5A17", lineHeight: 1.6 }}>עלות הפרסים המשוערת לתקופה: <b>{NIS(prizeCost)}</b>.</div>
    </Panel>
  );
}
function MgrClients({ state, setState }) {
  const [open, setOpen] = useState(null); const [q, setQ] = useState(""); const [adding, setAdding] = useState(false);
  const pending = state.clients.filter((c) => c.status === "pending");
  const approve = (cid) => setState((s) => ({ ...s, clients: s.clients.map((c) => c.id === cid ? { ...c, status: "active" } : c) }));
  const reject = (cid) => setState((s) => ({ ...s, clients: s.clients.filter((c) => c.id !== cid) }));
  const match = (c) => { if (!q.trim()) return true; const hay = (c.name + " " + c.phone + " " + c.taxId + " " + c.email).toLowerCase(); return hay.includes(q.trim().toLowerCase()); };
  const active = state.clients.filter((c) => c.status === "active" && match(c));
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {pending.length > 0 && (
        <Panel style={{ borderColor: "#E4D3A8", background: "#FFFDF6", boxShadow: SH }}>
          <SectionTitle icon={<Clock size={18} />} extra={<Badge tone="amber">{pending.length}</Badge>}>בקשות הרשמת עסקים</SectionTitle>
          <div style={{ display: "grid", gap: 10 }}>{pending.map((c) => (<div key={c.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, background: "#fff", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}><div style={{ flex: 1, minWidth: 200 }}><div style={{ fontWeight: 800 }}>{c.name}</div><div style={{ fontSize: 13, color: C.sub }}>{c.contact} · {c.phone} · {c.email}</div><div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}><Badge>{c.structure}</Badge><Badge>{c.category}</Badge><Badge icon={<PayIcon pay={c.pay} size={11} />}>{PAY[c.pay].label}</Badge></div></div><div style={{ display: "flex", gap: 8 }}><button onClick={() => approve(c.id)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "9px 16px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><Check size={16} /> אשר</button><button onClick={() => reject(c.id)} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.red, fontWeight: 700, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><X size={16} /> דחה</button></div></div>))}</div>
        </Panel>
      )}
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Users size={18} />} extra={<button onClick={() => setAdding(true)} style={{ display: "flex", alignItems: "center", gap: 5, border: `1px solid ${C.line}`, background: "#fff", color: C.green, fontWeight: 700, fontSize: 13, padding: "6px 12px", borderRadius: 9, cursor: "pointer" }}><UserPlus size={15} /> לקוח חדש</button>}>לקוחות</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: שם / טלפון / ח.פ / אימייל" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        <div style={{ display: "grid", gap: 8 }}>
          {active.map((c) => { const pts = pointsOf(c.id, state.orders, state.products, state.kgPerPoint, state.periodMonths); const prize = reachedTier(pts, sortTiers(state.prizeTiers)); const cnt = state.orders.filter((o) => o.clientId === c.id).length; const debt = outstandingOf(c.id, state.orders, state.products); return (
            <button key={c.id} onClick={() => setOpen(c)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>{c.name}</span><Badge tone="plum" icon={<Star size={12} fill={C.plum} />}>{pts} נק'</Badge></div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}><Badge icon={<Building2 size={11} />}>{c.structure}</Badge><Badge icon={<PayIcon pay={c.pay} size={11} />}>{PAY[c.pay].label}</Badge>{prize && <Badge tone="green" icon={<Trophy size={11} />}>{prize.title}</Badge>}<Badge>{cnt} הזמנות</Badge>{debt > 0 && <Badge tone="amber"><Wallet size={11} /> חוב {NIS(debt)}</Badge>}</div>
            </button>
          ); })}
          {active.length === 0 && <Empty>לא נמצאו לקוחות</Empty>}
        </div>
      </Panel>
      {open && <ClientModal client={open} state={state} setState={setState} onClose={() => setOpen(null)} />}
      {adding && <Modal onClose={() => setAdding(false)} title="הוספת לקוח חדש"><RegisterForm state={state} setState={setState} byManager onDone={() => setAdding(false)} back={() => setAdding(false)} /></Modal>}
    </div>
  );
}
function MgrStaff({ state, setState }) {
  const [f, setF] = useState({ name: "", role: "picker", email: "", password: "" }); const [err, setErr] = useState("");
  const [edit, setEdit] = useState(null);
  const add = () => { if (!f.name || !f.email || !f.password) return setErr("שם, אימייל וסיסמה חובה"); if ([...state.clients, ...state.staff].some((u) => u.email.trim().toLowerCase() === f.email.trim().toLowerCase())) return setErr("אימייל כבר קיים"); setState((s) => ({ ...s, staff: [...s.staff, { id: "u" + Date.now(), ...f }] })); setF({ name: "", role: "picker", email: "", password: "" }); setErr(""); };
  const del = (id) => setState((s) => ({ ...s, staff: s.staff.filter((x) => x.id !== id) }));
  const eset = (k) => (e) => setEdit((s) => ({ ...s, [k]: e.target.value }));
  const saveEdit = () => { if (!edit.name || !edit.email || !edit.password) return; setState((s) => ({ ...s, staff: s.staff.map((u) => u.id === edit.id ? edit : u) })); setEdit(null); };
  return (
    <Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<ShieldCheck size={18} />}>צוות · מלקטים, נהגים וסוכנים</SectionTitle>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>{state.staff.map((u) => (<div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", flexWrap: "wrap" }}><Badge tone={u.role === "agent" ? "plum" : u.role === "driver" ? "green" : "amber"}>{ROLE_LABEL[u.role]}</Badge>{(u.roles || []).map((r) => <Badge key={r}>+{ROLE_LABEL[r]}</Badge>)}<div style={{ flex: 1, minWidth: 140 }}><div style={{ fontWeight: 700 }}>{u.name}</div><div style={{ fontSize: 12, color: C.sub }}>{u.email}</div></div><button onClick={() => setEdit({ ...u })} style={miniBtn}><Pencil size={13} /> ערוך</button><button onClick={() => del(u.id)} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button></div>))}</div>
      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>פתיחת משתמש חדש לצוות</div>
        <div className="tp-staff" style={{ display: "grid", gap: 8, alignItems: "end" }}>
          <MiniField label="שם" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
          <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 3 }}>תפקיד</div><select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} style={{ ...fieldStyle, padding: "8px" }}><option value="picker">מלקט</option><option value="driver">נהג</option><option value="agent">סוכן</option></select></label>
          <MiniField label="אימייל" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
          <MiniField label="סיסמה" value={f.password} onChange={(v) => setF({ ...f, password: v })} />
          <button onClick={add} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "10px 16px", borderRadius: 10, cursor: "pointer", height: 40 }}>הוסף</button>
        </div>
        {err && <ErrBox>{err}</ErrBox>}
      </div>
      {edit && <Modal onClose={() => setEdit(null)} title="עריכת חבר צוות">
        <Field label="שם" value={edit.name} onChange={eset("name")} />
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>תפקיד</div><select value={edit.role} onChange={eset("role")} style={fieldStyle}><option value="picker">מלקט</option><option value="driver">נהג</option><option value="agent">סוכן</option></select></label>
        <Field label="אימייל" value={edit.email} onChange={eset("email")} />
        <Field label="סיסמה" value={edit.password} onChange={eset("password")} />
        <div style={{ fontSize: 13, color: C.sub, margin: "6px 0 6px" }}>הצבת תפקידים נוספים</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>{["picker", "driver", "agent"].filter((r) => r !== edit.role).map((r) => { const on = (edit.roles || []).includes(r); return <button key={r} onClick={() => setEdit((s) => ({ ...s, roles: on ? (s.roles || []).filter((x) => x !== r) : [...(s.roles || []), r] }))} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.greenSoft : "#fff", color: on ? C.greenDeep : C.sub, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{ROLE_LABEL[r]}</button>; })}</div>
        <div style={{ fontSize: 12, color: C.sub, marginBottom: 12 }}>למשל: אם אין מלקט — אפשר להציב למנהל או לנהג גם את תפקיד המלקט. בכניסה הוא יבחר באיזה מסך לעבוד.</div>
        <SubmitBtn onClick={saveEdit}>שמור שינויים</SubmitBtn>
      </Modal>}
    </Panel>
  );
}
function MgrMessages({ state, setState }) {
  const [open, setOpen] = useState(null); const [bc, setBc] = useState("");
  const clients = state.clients.filter((c) => c.status === "active");
  const sendBc = () => { if (!bc.trim()) return; setState((s) => ({ ...s, broadcasts: [{ id: "b" + Date.now(), text: bc.trim(), ts: Date.now() }, ...s.broadcasts] })); setBc(""); };
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel style={{ boxShadow: SH }}><SectionTitle icon={<Megaphone size={18} />}>הודעה כללית / מבצע לכל הלקוחות</SectionTitle>
        <div style={{ display: "flex", gap: 8 }}><input value={bc} onChange={(e) => setBc(e.target.value)} placeholder="למשל: מבצע השבוע – 10% על עגבניות 🍅" style={{ ...fieldStyle, flex: 1 }} /><button onClick={sendBc} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "0 18px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Send size={16} /> שלח</button></div>
        <div style={{ display: "grid", gap: 6, marginTop: 12 }}>{state.broadcasts.map((b) => <div key={b.id} style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "8px 12px", fontSize: 13 }}><b>{b.text}</b> <span style={{ color: C.sub, fontSize: 11 }}>· {dayStr(b.ts)}</span></div>)}</div>
      </Panel>
      <Panel style={{ boxShadow: SH }}><SectionTitle icon={<MessageSquare size={18} />}>שיחות עם לקוחות</SectionTitle>
        <div style={{ display: "grid", gap: 8 }}>{clients.map((c) => { const msgs = state.messages.filter((m) => m.clientId === c.id); const last = msgs[msgs.length - 1]; const unread = msgs.some((m) => m.fromRole === "client" && !m.readBySup); return (<button key={c.id} onClick={() => { setOpen(c); setState((s) => ({ ...s, messages: s.messages.map((m) => m.clientId === c.id && m.fromRole === "client" ? { ...m, readBySup: true } : m) })); }} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff", cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>{c.name}{unread && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.amber, display: "inline-block" }} />}</span>{last && <span style={{ fontSize: 11, color: C.sub }}>{dayStr(last.ts)}</span>}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{last ? last.text : "אין הודעות עדיין"}</div></button>); })}</div>
      </Panel>
      {open && <Modal onClose={() => setOpen(null)} title={"שיחה · " + open.name}><Chat state={state} setState={setState} clientId={open.id} meRole="manager" meName="מנהל" embedded /></Modal>}
    </div>
  );
}
function PickerView({ state, setState, me }) {
  const [tab, setTab] = useState("home");
  const [open, setOpen] = useState(null);
  const queue = state.orders.filter((o) => o.status === "new").sort((a, b) => a.date - b.date);
  const picked = state.orders.filter((o) => o.pickedBy).sort((a, b) => b.date - a.date);
  const doneToday = state.orders.filter((o) => o.status !== "new" && new Date(o.date).toDateString() === new Date().toDateString()).length;
  const tabs = [["home", "בית", Home], ["queue", "ממתינות לליקוט", Scale], ["picked", "לוקטו", ClipboardCheck]];
  return (
    <div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ queue: queue.length }} />
      {tab === "home" && <RoleHome name={me ? me.name : "מלקט"} prompt="ליקוט ושקילת הזמנות" cards={[
        { id: "queue", title: "ממתינות לליקוט", desc: queue.length ? `${queue.length} הזמנות ממתינות` : "אין הזמנות לליקוט", Icon: Scale, tone: "amber", badge: queue.length ? queue.length + " ממתינות" : null },
        { id: "picked", title: "לוקטו", desc: `${picked.length} הזמנות שלוקטו`, Icon: ClipboardCheck, tone: "green" },
      ]} onOpen={setTab} />}
      {tab === "queue" && (
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            <Kpi icon={<ClipboardList size={17} />} label="ממתינות לליקוט" value={queue.length} tone="amber" />
            <Kpi icon={<ClipboardCheck size={17} />} label="לוקטו היום" value={doneToday} tone="green" />
          </div>
          <Panel style={{ boxShadow: SH }}><SectionTitle icon={<Scale size={18} />}>תור ליקוט</SectionTitle>
            {queue.length === 0 ? <Empty>אין הזמנות לליקוט כרגע 🎉</Empty> : <div style={{ display: "grid", gap: 8 }}>{queue.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return (
              <button key={o.id} onClick={() => setOpen(o)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><span style={{ fontSize: 12, color: C.sub }}>{dayStr(o.date)}</span></div>
                <div style={{ fontSize: 13, color: C.sub, margin: "5px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
                <Badge tone="amber" icon={<Scale size={12} />}>לליקוט ושקילה · {orderCartons(o)} קרטונים</Badge>
              </button>
            ); })}</div>}
          </Panel>
        </div>
      )}
      {tab === "picked" && (
        <Panel style={{ boxShadow: SH }}><SectionTitle icon={<ClipboardCheck size={18} />} extra={<Badge tone="green">{picked.length}</Badge>}>הזמנות שלוקטו</SectionTitle>
          {picked.length === 0 ? <Empty>עדיין לא לוקטו הזמנות</Empty> : <div style={{ display: "grid", gap: 8 }}>{picked.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><Badge tone="green">{STATUS[o.status].label}</Badge></div>
              <div style={{ fontSize: 13, color: C.sub, margin: "5px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}><Badge icon={<Scale size={11} />}>ליקט: {o.pickedBy}</Badge><span style={{ fontSize: 12, color: C.sub }}>{dayStr(o.date)}</span><div style={{ flex: 1 }} /><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span></div>
            </div>
          ); })}</div>}
        </Panel>
      )}
      {open && <PickModal order={open} state={state} setState={setState} me={me} onClose={() => setOpen(null)} />}
    </div>
  );
}
function PickModal({ order, state, setState, onClose, me }) {
  const [supplied, setSupplied] = useState(() => { const o = {}; order.items.forEach((it) => { o[it.pid] = it.cartons; }); return o; });
  const [weights, setWeights] = useState(() => { const w = {}; order.items.forEach((it) => { const p = state.products.find((x) => x.id === it.pid); w[it.pid] = p.unit === "carton" ? null : it.cartons * p.kg; }); return w; });
  const [checked, setChecked] = useState({});
  const c = state.clients.find((x) => x.id === order.clientId);
  const setSup = (pid, d, max) => { const p = state.products.find((x) => x.id === pid); const v = Math.max(0, Math.min(max, (supplied[pid] || 0) + d)); setSupplied((s) => ({ ...s, [pid]: v })); if (p.unit !== "carton") setWeights((w) => ({ ...w, [pid]: v * p.kg })); };
  const active = order.items.filter((it) => (supplied[it.pid] || 0) > 0);
  const allChecked = active.length > 0 && active.every((it) => checked[it.pid]);
  const total = order.items.reduce((s, it) => { const p = state.products.find((x) => x.id === it.pid); const eff = p.unit === "carton" ? { ...it, supplied: supplied[it.pid] } : { ...it, supplied: supplied[it.pid], actualKg: +weights[it.pid] || 0 }; return s + lineTotal(eff, p); }, 0);
  const confirm = () => {
    const items = order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); const base = { ...it, supplied: supplied[it.pid] }; return p.unit === "carton" ? base : { ...base, actualKg: Math.max(0, +weights[it.pid] || 0) }; });
    setState((s) => { const seq = (s.invoiceSeq || 1000) + 1; return { ...s, invoiceSeq: seq, orders: s.orders.map((o) => o.id === order.id ? { ...o, status: "picked", items, pickedBy: me ? me.name : "מלקט", invNo: o.invNo || seq } : o) }; });
    onClose();
  };
  return (
    <Modal onClose={onClose} title={"ליקוט · #" + order.id + " · " + (c ? c.name : "")}>
      <div style={{ display: "grid", gap: 10 }}>
        {order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); const isC = p.unit === "carton"; const sup = supplied[it.pid] || 0; const short = it.cartons - sup; const gone = sup === 0; return (
          <div key={it.pid} style={{ border: `1px solid ${gone ? C.red : checked[it.pid] ? C.green : C.line}`, background: gone ? C.redSoft : checked[it.pid] ? C.greenSoft : "#fff", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <ProdThumb p={p} size={42} />
              <div style={{ flex: 1, minWidth: 120 }}><div style={{ fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 12, color: C.sub }}>הוזמנו {it.cartons} קרטונים{isC ? " (לפי קרטון)" : ` · ~${it.cartons * p.kg} ק"ג`}</div></div>
              {!gone && <button onClick={() => setChecked((x) => ({ ...x, [it.pid]: !x[it.pid] }))} style={{ border: "none", background: checked[it.pid] ? C.green : "#EEF1EC", color: checked[it.pid] ? "#fff" : C.sub, borderRadius: 10, width: 42, height: 42, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={20} /></button>}
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap", marginTop: 10 }}>
              <div><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>קרטונים שסופקו</div><div style={{ width: 118 }}><Stepper value={sup} onDec={() => setSup(it.pid, -1, it.cartons)} onInc={() => setSup(it.pid, 1, it.cartons)} maxed={sup >= it.cartons} /></div></div>
              {!isC && !gone && <label style={{ fontSize: 11, color: C.sub }}>משקל מדויק (ק"ג)<br /><input type="number" value={weights[it.pid] ?? ""} onChange={(e) => setWeights((w) => ({ ...w, [it.pid]: e.target.value }))} style={{ width: 90, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px", textAlign: "center", fontSize: 15, marginTop: 3 }} /></label>}
              {short > 0 && <Badge tone="amber"><AlertTriangle size={11} /> חסר {short} מהמלאי</Badge>}
            </div>
          </div>
        ); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, fontWeight: 800 }}><span>סכום מחושב</span><span style={{ color: C.greenDeep, fontSize: 18 }}>{NIS(total)}</span></div>
      <button onClick={confirm} disabled={!allChecked} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 12, border: "none", background: allChecked ? C.green : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, cursor: allChecked ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={16} /> {allChecked ? "אשר ושמור · העבר לנהג" : "סמן את הפריטים שסופקו"}</button>
    </Modal>
  );
}
function DriverView({ state, setState, me }) {
  const [tab, setTab] = useState("home");
  const mine = state.orders.filter((o) => (o.status === "assigned" || o.status === "collected") && o.driverId === me.id).sort((a, b) => a.date - b.date);
  const done = state.orders.filter((o) => o.status === "delivered" && o.driverId === me.id);
  const setStatus = (oid, st) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, status: st } : o) }));
  const tabs = [["home", "בית", Home], ["deliveries", "המשלוחים שלי", Truck]];
  return (
    <div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ deliveries: mine.length }} />
      {tab === "home" && <RoleHome name={me.name} prompt="ניהול המשלוחים שלך" cards={[{ id: "deliveries", title: "המשלוחים שלי", desc: mine.length ? `${mine.length} משלוחים פעילים` : "אין משלוחים כרגע", Icon: Truck, tone: "plum", badge: mine.length ? mine.length + " פעילים" : null }]} onOpen={setTab} />}
      {tab === "deliveries" && (
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            <Kpi icon={<Truck size={17} />} label="למשלוח" value={mine.length} tone="plum" />
            <Kpi icon={<Check size={17} />} label="נמסרו היום" value={done.filter((o) => new Date(o.date).toDateString() === new Date().toDateString()).length} tone="green" />
          </div>
          <Panel style={{ boxShadow: SH }}><SectionTitle icon={<MapPin size={18} />}>המשלוחים שלי</SectionTitle>
            {mine.length === 0 ? <Empty>אין משלוחים משובצים כרגע</Empty> : <div style={{ display: "grid", gap: 8 }}>{mine.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return (
              <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><Badge tone="plum">{STATUS[o.status].label}</Badge></div>
                <div style={{ fontSize: 13, color: C.ink, margin: "6px 0", display: "grid", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} color={C.green} /> {c?.address || "אין כתובת"}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} color={C.green} /> {c?.contact} · {c?.phone}</div>
                </div>
                {o.status === "assigned" ? <button onClick={() => setStatus(o.id, "collected")} style={dvBtn(C.blue)}><Package size={16} /> אספתי מהמחסן</button> : <button onClick={() => setStatus(o.id, "delivered")} style={dvBtn(C.green)}><Check size={16} /> נמסר ללקוח · בוצע</button>}
              </div>
            ); })}</div>}
          </Panel>
        </div>
      )}
    </div>
  );
}
const dvBtn = (bg) => ({ width: "100%", border: "none", background: bg, color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 });
function AgentView({ state, setState, me }) {
  const [tab, setTab] = useState("home"); const [chatClient, setChatClient] = useState(null); const [orderClient, setOrderClient] = useState("");
  const [q, setQ] = useState(""); const [edit, setEdit] = useState(null); const [view, setView] = useState(null); const [cq, setCq] = useState("");
  const clients = state.clients.filter((c) => c.status === "active");
  const tabs = [["home", "בית", Home], ["orders", "מעקב הזמנות", ClipboardList], ["new", "הזמנה ללקוח", ShoppingCart], ["chat", "תמיכה בלקוחות", MessageSquare]];
  const match = (o) => { if (!q.trim()) return true; const c = state.clients.find((x) => x.id === o.clientId); const hay = (o.id + " " + (c ? c.name + " " + c.phone + " " + c.taxId : "") + " " + dayStr(o.date)).toLowerCase(); return hay.includes(q.trim().toLowerCase()); };
  const orders = [...state.orders].sort((a, b) => b.date - a.date).filter(match);
  return (
    <div><Tabs tabs={tabs} active={tab} onChange={setTab} />
      {tab === "home" && <RoleHome name={me.name} prompt="מרכז הסוכן" cards={[
        { id: "orders", title: "מעקב הזמנות", desc: "כל ההזמנות במערכת", Icon: ClipboardList, tone: "blue" },
        { id: "new", title: "הזמנה ללקוח", desc: "צור הזמנה עבור לקוח", Icon: ShoppingCart, tone: "green" },
        { id: "chat", title: "תמיכה בלקוחות", desc: "שיחות ופניות לקוחות", Icon: MessageSquare, tone: "amber" },
      ]} onOpen={setTab} />}
      {tab === "orders" && (
        <Panel style={{ boxShadow: SH }}><SectionTitle icon={<ClipboardList size={18} />}>כל ההזמנות</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: מס' הזמנה / לקוח / טלפון / ח.פ" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
          <div style={{ display: "grid", gap: 8 }}>{orders.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); const st = STATUS[o.status]; return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><Badge tone="green">{st.label}</Badge></div><div style={{ fontSize: 13, color: C.sub, margin: "4px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join(" · ")} · <b style={{ color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</b></div><div style={{ display: "flex", gap: 6 }}><button onClick={() => setView(o)} style={miniBtn}><Receipt size={13} /> צפייה</button>{o.status === "new" && <button onClick={() => setEdit(o)} style={{ ...miniBtn, color: C.blue, borderColor: C.blue }}><Pencil size={13} /> שינוי</button>}</div></div>
          ); })}{orders.length === 0 && <Empty>לא נמצאו הזמנות</Empty>}</div>
        </Panel>
      )}
      {tab === "new" && (
        <div style={{ display: "grid", gap: 16 }}>
          <Panel style={{ boxShadow: SH }}>
            <SectionTitle icon={<Users size={18} />}>בחר לקוח</SectionTitle>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 10, maxWidth: 440 }}><Search size={15} color={C.sub} /><input value={cq} onChange={(e) => setCq(e.target.value)} placeholder="חיפוש לקוח: שם / טלפון / ח.פ / אימייל" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{clients.filter((c) => { const h = (c.name + " " + c.phone + " " + c.taxId + " " + c.email).toLowerCase(); return h.includes(cq.trim().toLowerCase()); }).map((c) => { const on = orderClient === c.id; return <button key={c.id} onClick={() => setOrderClient(c.id)} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.greenSoft : "#fff", color: on ? C.greenDeep : C.ink, borderRadius: 12, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{c.name}<span style={{ color: C.sub, fontWeight: 500, fontSize: 11 }}> · {c.phone}</span></button>; })}</div>
          </Panel>
          {orderClient && <OrderForm state={state} setState={setState} clientId={orderClient} agentName={me.name} />}
        </div>
      )}
      {tab === "chat" && (chatClient
        ? <div><button onClick={() => setChatClient(null)} style={{ border: "none", background: "transparent", color: C.green, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}><ChevronLeft size={16} /> חזרה</button><Panel style={{ boxShadow: SH }}><SectionTitle icon={<MessageSquare size={18} />}>{state.clients.find((c) => c.id === chatClient)?.name}</SectionTitle><Chat state={state} setState={setState} clientId={chatClient} meRole="agent" meName={me.name} embedded /></Panel></div>
        : <Panel style={{ boxShadow: SH }}><SectionTitle icon={<MessageSquare size={18} />}>פניות לקוחות</SectionTitle><div style={{ display: "grid", gap: 8 }}>{clients.map((c) => { const msgs = state.messages.filter((m) => m.clientId === c.id); const last = msgs[msgs.length - 1]; return <button key={c.id} onClick={() => setChatClient(c.id)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff", cursor: "pointer" }}><div style={{ fontWeight: 700 }}>{c.name}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{last ? last.text : "אין הודעות"}</div></button>; })}</div></Panel>
      )}
      {edit && <EditOrder order={edit} state={state} setState={setState} onClose={() => setEdit(null)} />}
      {view && <InvoiceModal order={view} state={state} onClose={() => setView(null)} withAddress />}
    </div>
  );
}
function Chat({ state, setState, clientId, meRole, meName, embedded }) {
  const [text, setText] = useState("");
  const msgs = state.messages.filter((m) => m.clientId === clientId).sort((a, b) => a.ts - b.ts);
  const send = () => { if (!text.trim()) return; setState((s) => ({ ...s, messages: [...s.messages, { id: "m" + Date.now(), clientId, fromRole: meRole, fromName: meName, text: text.trim(), ts: Date.now() }] })); setText(""); };
  const mine = (m) => m.fromRole === meRole;
  return (
    <div>
      {!embedded && meRole === "client" && state.broadcasts.length > 0 && <div style={{ marginBottom: 12 }}>{state.broadcasts.slice(0, 2).map((b) => <div key={b.id} style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "8px 12px", fontSize: 13, marginBottom: 6, display: "flex", gap: 6, alignItems: "center" }}><Megaphone size={15} /> <b>{b.text}</b></div>)}</div>}
      <div style={{ background: embedded ? "transparent" : C.surface, border: embedded ? "none" : `1px solid ${C.line}`, borderRadius: 16, padding: embedded ? 0 : 16, boxShadow: embedded ? "none" : SH }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflow: "auto", marginBottom: 12, padding: 4 }}>
          {msgs.length === 0 && <Empty>אין הודעות עדיין.</Empty>}
          {msgs.map((m) => (<div key={m.id} style={{ alignSelf: mine(m) ? "flex-start" : "flex-end", maxWidth: "82%" }}><div style={{ background: mine(m) ? C.green : "#EEF1EC", color: mine(m) ? "#fff" : C.ink, borderRadius: 14, padding: "8px 12px", fontSize: 14 }}>{m.text}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3, textAlign: mine(m) ? "right" : "left" }}>{m.fromRole !== meRole ? (ROLE_LABEL[m.fromRole] || "") + " · " : ""}{dayStr(m.ts)}</div></div>))}
        </div>
        <div style={{ display: "flex", gap: 8 }}><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="כתוב הודעה…" style={{ ...fieldStyle, flex: 1 }} /><button onClick={send} style={{ border: "none", background: C.green, color: "#fff", borderRadius: 10, padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={17} /></button></div>
      </div>
    </div>
  );
}
function ClientModal({ client, state, setState, onClose }) {
  const [inv, setInv] = useState(null);
  const [editing, setEditing] = useState(false);
  const [f, setF] = useState(client);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const saveEdit = () => { setState((s) => ({ ...s, clients: s.clients.map((c) => c.id === client.id ? { ...c, ...f, target: +f.target || c.target } : c) })); setEditing(false); };
  const orders = state.orders.filter((o) => o.clientId === client.id).sort((a, b) => b.date - a.date);
  const m = monthOrdersOf(client.id, orders); const monthTotal = m.reduce((s, o) => s + orderTotal(o, state.products), 0);
  const pts = pointsOf(client.id, state.orders, state.products, state.kgPerPoint, state.periodMonths); const prize = reachedTier(pts, sortTiers(state.prizeTiers));
  const debt = outstandingOf(client.id, state.orders, state.products);
  const markPaid = (oid) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, paid: true } : o) }));
  if (editing) return (
    <Modal onClose={onClose} title={"עריכת פרטים · " + client.name}>
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם העסק" value={f.name || ""} onChange={set("name")} />
        <Field label="איש קשר" value={f.contact || ""} onChange={set("contact")} />
        <Field label="טלפון" value={f.phone || ""} onChange={set("phone")} />
        <Field label="כתובת" value={f.address || ""} onChange={set("address")} />
        <Field label="אימייל" value={f.email || ""} onChange={set("email")} />
        <Field label="מספר עוסק / ח.פ" value={f.taxId || ""} onChange={set("taxId")} />
        <Field label="סיסמה" value={f.password || ""} onChange={set("password")} />
        <Field label="יעד חודשי (נק')" type="number" value={f.target} onChange={set("target")} />
        <Select label="סוג התאגדות" value={f.structure} onChange={set("structure")} options={STRUCTURES} />
        <Select label="סוג העסק" value={f.category} onChange={set("category")} options={CATEGORIES} />
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>אופן תשלום</div><select value={f.pay} onChange={set("pay")} style={fieldStyle}><option value="cash">מזומן</option><option value="credit">אשראי</option><option value="check">צ'ק</option></select></label>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <button onClick={saveEdit} style={{ flex: 1, border: "none", background: C.green, color: "#fff", fontWeight: 800, padding: 12, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={16} /> שמור שינויים</button>
        <button onClick={() => { setF(client); setEditing(false); }} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, padding: "12px 18px", borderRadius: 12, cursor: "pointer" }}>ביטול</button>
      </div>
    </Modal>
  );
  return (
    <Modal onClose={onClose} title={client.name}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Badge tone="plum" icon={<Star size={12} fill={C.plum} />}>{pts} נק'</Badge>{prize && <Badge tone="green" icon={<Trophy size={12} />}>{prize.title}</Badge>}<Badge icon={<PayIcon pay={client.pay} size={11} />}>{PAY[client.pay].label}</Badge>{debt > 0 && <Badge tone="amber"><Wallet size={11} /> חוב {NIS(debt)}</Badge>}</div>
        <button onClick={() => setEditing(true)} style={miniBtn}><Pencil size={13} /> ערוך פרטים</button>
      </div>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{client.contact} · {client.phone} · {client.email}</div>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 8, display: "flex", gap: 5, alignItems: "center" }}><MapPin size={13} /> {client.address || "אין כתובת"} · ח.פ {client.taxId || "—"}</div>
      {(client.docs || []).length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>{client.docs.map((d, i) => <Badge key={i} icon={<FileText size={11} />}>{d}</Badge>)}</div>}
      <div style={{ background: C.greenSoft, borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 14 }}><b>סיכום {monthName}:</b> {m.length} הזמנות · סה"כ {NIS(monthTotal)}</div>
      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>כל ההזמנות</div>
      <div style={{ display: "grid", gap: 8, maxHeight: 260, overflow: "auto" }}>{orders.map((o) => (
        <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, color: C.sub }}>#{o.id} · {dayStr(o.date)}</span><Badge tone="green">{STATUS[o.status].label}</Badge></div>
          <div style={{ fontSize: 13, margin: "5px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join(" · ")}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6, flexWrap: "wrap" }}><div style={{ display: "flex", gap: 6 }}><button onClick={() => setInv(o)} style={miniBtn}><Receipt size={13} /> חשבונית</button>{o.status === "delivered" && (o.paid ? <Badge tone="green">שולם</Badge> : <button onClick={() => markPaid(o.id)} style={{ ...miniBtn, color: C.amber, borderColor: C.amber }}><Wallet size={13} /> סמן כשולם</button>)}</div><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span></div>
        </div>
      ))}</div>
      {inv && <InvoiceModal order={inv} state={state} onClose={() => setInv(null)} withAddress />}
    </Modal>
  );
}

/* ============ UI primitives ============ */
function Tabs({ tabs, active, onChange, badges = {} }) {
  return (<div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
    {tabs.map(([id, label, Icon]) => { const on = active === id; const b = badges[id]; return (
      <button key={id} onClick={() => onChange(id)} style={{ display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap", border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 14, padding: "9px 15px", borderRadius: 11, cursor: "pointer", boxShadow: on ? "0 3px 10px rgba(31,122,77,.25)" : "none" }}>
        <Icon size={16} />{label}{b ? <span style={{ background: on ? "rgba(255,255,255,.25)" : C.amber, color: "#fff", borderRadius: 20, fontSize: 11, padding: "1px 7px", fontWeight: 800 }}>{b}</span> : null}
      </button>
    ); })}
  </div>);
}
function Modal({ title, children, onClose }) {
  return (<div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,40,30,.45)", zIndex: 50, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflow: "auto" }}>
    <div dir="rtl" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, padding: 22, width: "100%", maxWidth: 580, boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}><h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, flex: 1 }}>{title}</h2><button onClick={onClose} style={{ border: "none", background: "#EEF1EC", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: C.sub, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={17} /></button></div>
      {children}
    </div>
  </div>);
}
function PayIcon({ pay, size = 12 }) { const I = (PAY[pay] || PAY.cash).icon; return <I size={size} />; }
function ProdIcon({ p, s = 26 }) {
  const M = {
    p1: (<g><circle cx="12" cy="14.5" r="7.5" fill="#E4572E" /><path d="M12 7.2c-1.2-1.5-3.3-1.9-3.3-1.9.4 1.7 1.6 2.7 3.3 2.7z" fill="#3E9E52" /><path d="M12 7.2c1.2-1.5 3.3-1.9 3.3-1.9-.4 1.7-1.6 2.7-3.3 2.7z" fill="#3E9E52" /><path d="M12 4.6v3" stroke="#3E9E52" strokeWidth="1.3" strokeLinecap="round" /><circle cx="9.5" cy="12.5" r="1.6" fill="#fff" opacity=".38" /></g>),
    p2: (<g><rect x="6" y="5" width="7" height="15" rx="3.5" transform="rotate(30 9.5 12.5)" fill="#4E9A45" /><rect x="8" y="7" width="1.4" height="11" rx=".7" transform="rotate(30 9.5 12.5)" fill="#77BE64" opacity=".7" /></g>),
    p3: (<g><path d="M12 6c4 0 6 3.5 6 7.5s-2.6 6.5-6 6.5-6-2.5-6-6.5S8 6 12 6z" fill="#CBA76E" /><path d="M9 8c-.5 3-.5 9 0 12M15 8c.5 3 .5 9 0 12" stroke="#A57F44" strokeWidth=".8" fill="none" opacity=".6" /><path d="M12 6c0-2 1.4-3 1.4-3M12 6c0-2-1.4-3-1.4-3" stroke="#3E9E52" strokeWidth="1.4" strokeLinecap="round" /></g>),
    p4: (<g><ellipse cx="12" cy="13" rx="8" ry="6.4" fill="#BB8E57" /><circle cx="9" cy="11" r="1" fill="#8A6636" /><circle cx="14.5" cy="14" r="1" fill="#8A6636" /><circle cx="12" cy="10" r=".7" fill="#8A6636" /></g>),
    p5: (<g><ellipse cx="12" cy="13" rx="8" ry="6" fill="#F2CE1B" /><ellipse cx="9.5" cy="11" rx="2" ry="1.2" fill="#fff" opacity=".35" /></g>),
    p6: (<g><path d="M8 8.5c-2 1-3 4-3 7 0 3 2 5 3.8 5 1.2 0 1.7-.8 3.2-.8s2 .8 3.2.8c1.8 0 3.8-2 3.8-5 0-3-1-6-3-7-1.6-.8-3 0-3 0s-1.4-.8-3 0z" fill="#D33B34" /><path d="M12 6.5v-2.5" stroke="#3E9E52" strokeWidth="1.6" strokeLinecap="round" /><path d="M12 5c1-1 3-1 3-1" stroke="#3E9E52" strokeWidth="1.4" strokeLinecap="round" fill="none" /></g>),
    p7: (<g><circle cx="12" cy="13" r="8" fill="#7CC950" /><path d="M5 12c3-1 5-1 7 0M7 16c3-1 6-1 8 0M6 9c3-1 7-1 10 0" stroke="#5AAE38" strokeWidth="1" fill="none" opacity=".7" /></g>),
    p8: (<g><path d="M6 20l1.2-6h9.6l1.2 6z" fill="#5AAE38" /><circle cx="12" cy="10" r="6.5" fill="#F1F4EC" /><circle cx="9.2" cy="9.2" r="2.3" fill="#fff" /><circle cx="13" cy="8.2" r="2.3" fill="#fff" /><circle cx="15" cy="11" r="2.3" fill="#fff" /><circle cx="11" cy="12" r="2.3" fill="#fff" /></g>),
    p9: (<g><path d="M12 21 L8 8 L16 8 Z" fill="#E8730E" /><g stroke="#3E9E52" strokeWidth="1.4" strokeLinecap="round"><path d="M12 8V3.5" /><path d="M9 8L7 4.5" /><path d="M15 8l2-3.5" /></g></g>),
  };
  const g = M[p.id];
  if (!g) return <span style={{ fontSize: s * 0.6 }}>{p.emoji}</span>;
  return <svg width={s} height={s} viewBox="0 0 24 24">{g}</svg>;
}
function ProdThumb({ p, size = 46, tint }) {
  if (p.img) return <img src={p.img} alt={p.name} style={{ width: size, height: size, borderRadius: 12, objectFit: "cover" }} />;
  return <div style={{ width: size, height: size, borderRadius: 12, background: tint ? tint + "1A" : "#F2F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}><ProdIcon p={p} s={Math.round(size * 0.64)} /></div>;
}
function Panel({ children, pad = 20, style = {} }) { return <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 18, padding: pad, ...style }}>{children}</div>; }
function SectionTitle({ icon, children, extra }) { return <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}><span style={{ color: C.green, display: "flex" }}>{icon}</span><h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{children}</h2><div style={{ flex: 1 }} />{extra}</div>; }
function Stepper({ value, onDec, onInc, maxed, accent }) { const ac = accent || C.greenDeep; return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: `1px solid ${C.line}`, borderRadius: 10, overflow: "hidden" }}><button onClick={onDec} style={stepBtn}><Minus size={16} /></button><span style={{ fontWeight: 800, minWidth: 22, textAlign: "center" }}>{value}</span><button onClick={onInc} disabled={maxed} style={{ ...stepBtn, background: maxed ? "#F0F0F0" : ac + "18", color: maxed ? "#B7BDB4" : ac, cursor: maxed ? "default" : "pointer" }}><Plus size={16} /></button></div>; }
const stepBtn = { border: "none", background: "#fff", padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", color: C.sub };
const miniBtn = { border: `1px solid ${C.line}`, background: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: C.sub, display: "inline-flex", alignItems: "center", gap: 4 };
const kpiBtn = (on) => ({ border: "none", background: "transparent", padding: 0, cursor: "pointer", textAlign: "right", outline: on ? `2px solid ${C.green}` : "none", borderRadius: 18 });
function Kpi({ icon, label, value, tone, bare }) { const map = { green: [C.greenSoft, C.greenDeep], amber: [C.amberSoft, C.amber], plum: [C.plumSoft, C.plum], red: [C.redSoft, C.red], blue: [C.blueSoft, C.blue] }; const [bg, fg] = map[tone] || ["#EEF1EC", C.ink]; const inner = <><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 11, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div><div style={{ fontSize: 12.5, color: C.sub }}>{label}</div></div><div style={{ fontWeight: 800, fontSize: 22, marginTop: 8, color: fg }}>{value}</div></>; return bare ? <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 18, padding: 15, boxShadow: SH }}>{inner}</div> : <Panel pad={15} style={{ boxShadow: SH }}>{inner}</Panel>; }
function Badge({ children, tone, icon }) { const map = { green: [C.greenSoft, C.greenDeep], amber: [C.amberSoft, C.amber], plum: [C.plumSoft, C.plum] }; const [bg, fg] = map[tone] || ["#EEF1EC", C.sub]; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg, color: fg, borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700 }}>{icon}{children}</span>; }
function Empty({ children }) { return <div style={{ color: C.sub, fontSize: 14, textAlign: "center", padding: "18px 0" }}>{children}</div>; }
function Th({ children }) { return <th style={{ padding: "6px 8px", fontWeight: 600, whiteSpace: "nowrap" }}>{children}</th>; }
function Td({ children, strong, color }) { return <td style={{ padding: "8px", fontWeight: strong ? 800 : 400, color: color || C.ink }}>{children}</td>; }
const fieldStyle = { width: "100%", border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 11px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", background: "#fff", color: C.ink };
function Field({ label, ...p }) { return <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{label}</div><input style={fieldStyle} {...p} /></label>; }
function MiniField({ label, value, onChange }) { return <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 3 }}>{label}</div><input value={value} onChange={(e) => onChange(e.target.value)} style={{ ...fieldStyle, padding: "8px 10px" }} /></label>; }
function Select({ label, options, ...p }) { return <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{label}</div><select style={fieldStyle} {...p}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>; }
function SubmitBtn({ onClick, children }) { return <button onClick={onClick} style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 12, border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>{children}</button>; }
function BigBtn({ icon, children, onClick, primary }) { return <button onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, borderRadius: 14, border: primary ? "none" : `1.5px solid ${C.line}`, background: primary ? C.green : "#fff", color: primary ? "#fff" : C.ink, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: primary ? "0 4px 14px rgba(31,122,77,.3)" : "none" }}>{icon}{children}</button>; }
function SmallBtn({ children, onClick }) { return <button onClick={onClick} style={{ flex: "1 0 28%", padding: "9px", borderRadius: 10, border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{children}</button>; }
function ErrBox({ children }) { return <div style={{ background: C.redSoft, color: C.red, padding: "9px 12px", borderRadius: 10, fontSize: 13, marginTop: 8, fontWeight: 600 }}>{children}</div>; }
function LabIn({ label, val, onChange, step }) { return <label style={{ display: "block" }}><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>{label}</div><input type="number" step={step} value={Math.round((val + Number.EPSILON) * 100) / 100} onChange={(e) => onChange(+e.target.value)} style={{ width: 78, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px", textAlign: "center", fontSize: 14 }} /></label>; }
function TierIn({ label, val, onChange }) { return <label style={{ display: "block" }}><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>{label}</div><input type="number" value={val} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 6px", textAlign: "center", fontSize: 14 }} /></label>; }
function TierTxt({ label, val, onChange, placeholder }) { return <label style={{ display: "block" }}><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>{label}</div><input value={val} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 8px", fontSize: 14, fontFamily: "inherit" }} /></label>; }
