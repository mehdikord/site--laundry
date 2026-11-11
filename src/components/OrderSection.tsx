"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike, User, Phone, MapPin, CalendarClock, MessageCircle, ReceiptText,
  CheckCircle2, Send, Users, Search, PackageCheck, Truck, Sparkles,
  Shirt, Sofa, Layers, BedDouble, Zap, Footprints, X, Printer, RotateCcw
} from "lucide-react";

/* ---------------- Data ---------------- */
const ITEMS = [
  { id: "clothes", label: "خشکشویی لباس (کیلو)", price: 45000, icon: Shirt },
  { id: "sofa", label: "مبل‌شویی (نفره)", price: 120000, icon: Sofa },
  { id: "carpet", label: "فرش و موکت (متر)", price: 35000, icon: Layers },
  { id: "blanket", label: "پتو و لحاف (عدد)", price: 95000, icon: BedDouble },
  { id: "iron", label: "اتوکشی (عدد)", price: 25000, icon: Zap },
  { id: "shoes", label: "کفش و کیف (عدد)", price: 60000, icon: Footprints },
];

const DEMO_ORDERS: Record<string, { name: string; items: string; status: number; ready: string }> = {
  "AL-1024": { name: "سارا محمدی", items: "خشکشویی لباس + اتوکشی", status: 3, ready: "امروز ساعت ۱۸:۰۰" },
  "AL-2048": { name: "امیر رضایی", items: "مبل‌شویی ۷ نفره", status: 2, ready: "فردا ساعت ۱۲:۰۰" },
  "AL-3096": { name: "مریم کریمی", items: "پتو و لحاف (۲ عدد)", status: 4, ready: "امروز ساعت ۲۰:۰۰" },
};

const CUSTOMERS = [
  { name: "سارا محمدی", phone: "0912 345 6789", last: "۳ روز پیش", weekly: true, orders: 24 },
  { name: "امیر رضایی", phone: "0935 111 2233", last: "۵ روز پیش", weekly: true, orders: 18 },
  { name: "مریم کریمی", phone: "0919 876 5432", last: "۱ هفته پیش", weekly: true, orders: 31 },
  { name: "رضا احمدی", phone: "0903 222 3344", last: "۲ هفته پیش", weekly: false, orders: 7 },
  { name: "زهرا حسینی", phone: "0912 999 8877", last: "۱ ماه پیش", weekly: false, orders: 3 },
  { name: "علی نادری", phone: "0938 555 6677", last: "۴ روز پیش", weekly: true, orders: 12 },
];

const TEMPLATES = [
  { id: "discount", label: "تخفیف این هفته", text: "سلام {نام} عزیز! 🌟 این هفته ۱۵٪ تخفیف خشکشویی ویژه مشتریان ثابت آرمان لاندری فعاله. پیک رایگان درب منزل — فقط با یک کلیک سفارش بده: armanlaundry.ir" },
  { id: "ready", label: "سفارش آماده شد", text: "سلام {نام} عزیز! سفارشت آماده تحوّله ✅ پیک آرمان امروز ساعت ۱۸ درب منزلت هست. ممنون از اعتمادت — آرمان لاندری" },
  { id: "thanks", label: "تشکر و یادآوری", text: "سلام {نام} عزیز! ممنون که به آرمان لاندری اعتماد کردی 💛 لباس یا مبلت نیاز به شستشو داره؟ پیک رایگان میاد درب منزلت." },
];

const STATUS_STEPS = ["ثبت سفارش", "تحویل گرفته شد", "در حال شستشو", "آماده تحویل", "تحویل داده شد"];

type OrderResult = {
  code: string; name: string; phone: string; items: { label: string; price: number }[];
  total: number; date: string; slot: string; address: string;
};

const faNum = (n: number) => n.toLocaleString("fa-IR");

/* ---------------- Toast ---------------- */
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}
      className="fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-2xl bg-[#1c1206] text-white px-5 py-4 shadow-2xl max-w-sm">
      <CheckCircle2 className="h-6 w-6 text-[#ffb800] shrink-0" />
      <p className="text-sm font-bold leading-6">{msg}</p>
      <button onClick={onClose} className="shrink-0 rounded-full bg-white/10 p-1.5 hover:bg-white/20"><X className="h-4 w-4" /></button>
    </motion.div>
  );
}

/* ---------------- Order Form ---------------- */
function OrderForm({ onSuccess }: { onSuccess: (r: OrderResult) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("۱۰ تا ۱۲");
  const [selected, setSelected] = useState<string[]>(["clothes"]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const total = useMemo(() => ITEMS.filter((i) => selected.includes(i.id)).reduce((s, i) => s + i.price, 0), [selected]);

  const toggle = (id: string) => setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/[^\d]/g, "");
    if (name.trim().length < 3) return setError("نام و نام خانوادگی را وارد کنید.");
    if (!/^09\d{9}$/.test(digits)) return setError("شماره موبایل معتبر وارد کنید (مثل 09123456789).");
    if (selected.length === 0) return setError("حداقل یک خدمت انتخاب کنید.");
    if (address.trim().length < 8) return setError("آدرس دقیق را وارد کنید تا پیک رایگان بیاد درب منزل.");
    setError("");
    setSending(true);
    setTimeout(() => {
      const code = "AL-" + Math.floor(1000 + Math.random() * 9000);
      onSuccess({
        code, name: name.trim(), phone: digits,
        items: ITEMS.filter((i) => selected.includes(i.id)).map((i) => ({ label: i.label, price: i.price })),
        total, date: date || "امروز", slot, address: address.trim(),
      });
      setSending(false);
    }, 900);
  };

  const inputCls = "w-full rounded-2xl border-2 border-orange-100 bg-white px-4 py-3.5 text-sm font-semibold outline-none transition focus:border-[#ffb800] focus:ring-4 focus:ring-amber-100 placeholder:text-stone-400";

  return (
    <form onSubmit={submit} className="rounded-[32px] bg-white border border-orange-100 card-shadow p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mango-grad text-white shadow-lg shadow-orange-500/30"><Bike className="h-6 w-6" /></span>
        <div>
          <h3 className="text-xl font-black">درخواست پیک رایگان</h3>
          <p className="text-xs font-bold text-stone-400">کمتر از ۱ دقیقه — پیامک و فاکتور همون لحظه میاد</p>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <label className="relative block">
          <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام و نام خانوادگی" className={`${inputCls} pr-11`} />
        </label>
        <label className="relative block">
          <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="شماره موبایل — 09123456789" inputMode="tel" className={`${inputCls} pr-11`} />
        </label>
      </div>

      <label className="relative mt-4 block">
        <MapPin className="absolute right-4 top-4 h-4 w-4 text-orange-400" />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="آدرس دقیق برای پیک رایگان (شهر، محله، خیابان، پلاک، واحد)" rows={2} className={`${inputCls} pr-11 resize-none`} />
      </label>

      <div className="mt-4">
        <p className="mb-2 text-sm font-extrabold text-stone-700">چه چیزی تحویل می‌دی؟</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ITEMS.map((it) => {
            const active = selected.includes(it.id);
            return (
              <button type="button" key={it.id} onClick={() => toggle(it.id)}
                className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-3 text-right transition ${active ? "border-[#ffb800] bg-amber-50 shadow-sm" : "border-orange-100 bg-white hover:border-orange-200"}`}>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${active ? "bg-mango-grad text-white" : "bg-amber-50 text-orange-500"}`}><it.icon className="h-4 w-4" /></span>
                <span className="leading-tight">
                  <span className="block text-[12px] font-extrabold text-stone-800">{it.label}</span>
                  <span className="block text-[10px] font-bold text-orange-500">{faNum(it.price)} تومان</span>
                </span>
                {active && <CheckCircle2 className="mr-auto h-4 w-4 shrink-0 text-orange-500" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <label className="relative block">
          <CalendarClock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${inputCls} pr-11`} />
        </label>
        <div className="flex gap-2">
          {["۱۰ تا ۱۲", "۱۲ تا ۱۴", "۱۶ تا ۱۸", "۱۸ تا ۲۰"].map((s) => (
            <button type="button" key={s} onClick={() => setSlot(s)}
              className={`flex-1 rounded-2xl border-2 py-3 text-xs font-extrabold transition ${slot === s ? "border-[#ffb800] bg-amber-50 text-orange-700" : "border-orange-100 text-stone-500 hover:border-orange-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-600 animate-slide-down">{error}</p>}

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button type="submit" disabled={sending}
          className="shine-wrap w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-full bg-mango-grad px-8 py-4 font-black text-white shadow-xl shadow-orange-500/35 transition hover:scale-[1.02] active:scale-95 disabled:opacity-70">
          {sending ? <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" /> در حال ثبت و ارسال پیامک…</> : <><Send className="h-5 w-5" /> ثبت سفارش + ارسال پیامک</>}
        </button>
        <div className="text-center sm:text-left">
          <p className="text-[11px] font-bold text-stone-400">جمع تقریبی (پیک رایگان)</p>
          <p className="text-lg font-black text-orange-600">{faNum(total)} <span className="text-xs">تومان</span></p>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] font-medium text-stone-400">با ثبت سفارش، پیامک تأیید و فاکتور آنلاین به شماره‌ات ارسال می‌شه. (نسخه دمو — بدون دیتابیس)</p>
    </form>
  );
}

/* ---------------- SMS Phone Mockup ---------------- */
function SmsMockup({ result }: { result: OrderResult }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24, rotateY: 10 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ delay: 0.15 }} className="mx-auto w-full max-w-[320px]">
      <div className="rounded-[36px] bg-[#1c1206] p-2.5 shadow-2xl">
        <div className="rounded-[28px] bg-[#fff8ec] overflow-hidden">
          <div className="bg-[#1c1206] px-5 py-3 flex items-center justify-between">
            <span className="text-white text-xs font-black">پیام‌ها</span>
            <span className="rounded-full bg-[#ffb800] px-2 py-0.5 text-[10px] font-black text-[#1c1206]">ARMAN LAUNDRY</span>
          </div>
          <div className="p-4 space-y-3 min-h-[300px]">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="rounded-2xl rounded-tr-sm bg-white border border-orange-100 p-3.5 shadow-sm">
              <p className="text-[12px] leading-6 font-semibold text-stone-700">
                سلام <b>{result.name}</b> عزیز! 🌟<br />
                سفارشت با کد <b className="text-orange-600">{result.code}</b> ثبت شد.<br />
                ✅ وسایل تحویل گرفته شد: {result.items.map((i) => i.label).join("، ")}<br />
                🚴 پیک رایگان: {result.date} — ساعت {result.slot}<br />
                💰 فاکتور: {faNum(result.total)} تومان (پیک رایگان)<br />
                ⏰ آماده تحویل: ۴۸ ساعت آینده<br />
                <span className="text-stone-400">پیگیری: armanlaundry.ir/track</span>
              </p>
              <p className="mt-2 text-left text-[10px] font-bold text-stone-400">همین حالا • پیامک شد</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="mr-auto w-fit rounded-2xl rounded-tl-sm bg-mango-grad px-3.5 py-2.5 text-[11px] font-extrabold text-white shadow">
              ممنون! 🙏 منتظر پیکم
            </motion.div>
          </div>
          <div className="border-t border-orange-100 px-4 py-3 flex items-center gap-2">
            <div className="flex-1 rounded-full bg-white border border-orange-100 px-4 py-2 text-[11px] font-medium text-stone-400">پیام بنویس…</div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mango-grad text-white"><Send className="h-4 w-4 -scale-x-100" /></span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-bold text-stone-400">پیش‌نمایش پیامک لحظه‌ای که مشتری دریافت می‌کند</p>
    </motion.div>
  );
}

/* ---------------- Invoice ---------------- */
function Invoice({ result }: { result: OrderResult }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      className="relative rounded-[28px] bg-white border-2 border-dashed border-orange-200 p-6 shadow-xl overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-2 bg-mango-grad" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-black">فاکتور سفارش <span className="text-mango-grad">{result.code}</span></p>
          <p className="mt-1 text-xs font-bold text-stone-400">{result.name} • {result.phone}</p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mango-grad text-white"><ReceiptText className="h-5 w-5" /></span>
      </div>
      <div className="mt-5 space-y-2.5">
        {result.items.map((it) => (
          <div key={it.label} className="flex items-center justify-between border-b border-dashed border-orange-100 pb-2.5 text-sm font-semibold text-stone-600">
            <span>{it.label}</span><span className="font-extrabold text-stone-800">{faNum(it.price)} تومان</span>
          </div>
        ))}
        <div className="flex items-center justify-between text-sm font-semibold text-stone-600">
          <span>پیک موتوری (رفت و برگشت)</span><span className="font-black text-emerald-600">رایگان 🎉</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#1c1206] px-4 py-3 text-white">
          <span className="text-sm font-extrabold">جمع قابل پرداخت</span>
          <span className="text-lg font-black text-mango-grad">{faNum(result.total)} تومان</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-stone-400">
        <span>پیک: {result.date} • {result.slot}</span>
        <span className="flex items-center gap-1"><PackageCheck className="h-3.5 w-3.5 text-orange-500" /> رسید تحویل صادر شد</span>
      </div>
      <button onClick={() => window.print()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-orange-200 py-3 text-sm font-extrabold text-orange-600 transition hover:bg-amber-50">
        <Printer className="h-4 w-4" /> چاپ / ذخیره فاکتور
      </button>
    </motion.div>
  );
}

/* ---------------- Tracker ---------------- */
function Tracker() {
  const [code, setCode] = useState("");
  const [found, setFound] = useState<{ code: string; name: string; items: string; status: number; ready: string } | null>(null);
  const [err, setErr] = useState("");

  const search = () => {
    const c = code.trim().toUpperCase();
    if (DEMO_ORDERS[c]) { setFound({ code: c, ...DEMO_ORDERS[c] }); setErr(""); }
    else { setFound(null); setErr("سفارشی با این کد پیدا نشد. کدهای دمو: AL-1024 ، AL-2048 ، AL-3096"); }
  };

  return (
    <div className="rounded-[32px] bg-[#1c1206] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#ffb800]/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mango-grad text-white shadow-lg"><Search className="h-6 w-6" /></span>
          <div>
            <h3 className="text-xl font-black">پیگیری سفارش</h3>
            <p className="text-xs font-bold text-stone-400">کد پیگیری پیامک‌شده رو وارد کن</p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="مثلاً AL-1024" dir="ltr"
            className="flex-1 rounded-2xl border-2 border-white/15 bg-white/10 px-4 py-3.5 text-sm font-bold text-white outline-none placeholder:text-stone-500 focus:border-[#ffb800] text-left" />
          <button onClick={search} className="rounded-2xl bg-mango-grad px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/30 hover:scale-[1.03] transition">پیگیری</button>
        </div>
        {err && <p className="mt-3 rounded-2xl bg-red-500/15 border border-red-400/30 px-4 py-3 text-xs font-bold text-red-300 animate-slide-down">{err}</p>}

        <AnimatePresence>
          {found && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-black">{found.name} <span className="text-amber-300 text-sm">• {found.code}</span></p>
                <span className="rounded-full bg-[#ffb800] px-3 py-1 text-[11px] font-black text-[#1c1206]">آماده تحویل: {found.ready}</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-stone-300">{found.items}</p>

              <div className="relative mt-7">
                <div className="absolute top-5 inset-x-4 h-1 rounded-full bg-white/10" />
                <motion.div className="absolute top-5 right-4 h-1 rounded-full bg-mango-grad" initial={{ width: 0 }} animate={{ width: `${(found.status / (STATUS_STEPS.length - 1)) * 88}%` }} transition={{ duration: 0.8 }} />
                <div className="relative flex justify-between">
                  {STATUS_STEPS.map((s, i) => (
                    <div key={s} className="flex flex-col items-center gap-2 w-16">
                      <span className={`grid h-10 w-10 place-items-center rounded-full border-2 transition ${i <= found.status ? "bg-mango-grad border-[#ffb800] text-white shadow-lg shadow-orange-500/30" : "bg-white/10 border-white/15 text-stone-500"}`}>
                        {i <= found.status ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-xs font-black">{i + 1}</span>}
                      </span>
                      <span className={`text-[10px] font-extrabold text-center leading-4 ${i <= found.status ? "text-amber-300" : "text-stone-500"}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- SMS Panel (Owner Demo) ---------------- */
function SmsPanel({ onToast }: { onToast: (m: string) => void }) {
  const [group, setGroup] = useState<"weekly" | "all">("weekly");
  const [tpl, setTpl] = useState(TEMPLATES[0]);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);

  const targets = group === "weekly" ? CUSTOMERS.filter((c) => c.weekly) : CUSTOMERS;

  const send = () => {
    setSending(true); setSent(false); setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 12;
      if (p >= 100) {
        clearInterval(iv); setProgress(100); setSending(false); setSent(true);
        onToast(`پیامک «${tpl.label}» به ${targets.length} مشتری ارسال شد (دمو)`);
      } else setProgress(p);
    }, 160);
  };

  return (
    <div className="rounded-[32px] bg-white border border-orange-100 card-shadow p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1c1206] text-[#ffb800]"><Users className="h-6 w-6" /></span>
        <div>
          <h3 className="text-xl font-black">پنل پیامک یک‌کلیکی <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black text-orange-600 align-middle">دمو برای صاحب کسب‌وکار</span></h3>
          <p className="text-xs font-bold text-stone-400">شماره مشتری‌ها ذخیره شده — با یک کلیک تخفیف هفتگی بفرست</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button onClick={() => setGroup("weekly")} className={`rounded-2xl border-2 py-3 text-sm font-extrabold transition ${group === "weekly" ? "border-[#ffb800] bg-amber-50 text-orange-700" : "border-orange-100 text-stone-500"}`}>
          مشتریان هفتگی ({CUSTOMERS.filter((c) => c.weekly).length} نفر)
        </button>
        <button onClick={() => setGroup("all")} className={`rounded-2xl border-2 py-3 text-sm font-extrabold transition ${group === "all" ? "border-[#ffb800] bg-amber-50 text-orange-700" : "border-orange-100 text-stone-500"}`}>
          همه مشتری‌ها ({CUSTOMERS.length} نفر)
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => setTpl(t)} className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${tpl.id === t.id ? "bg-mango-grad text-white shadow" : "bg-amber-50 text-stone-600 hover:bg-amber-100"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-[#fff8ec] border border-orange-100 p-4">
        <p className="text-[11px] font-black text-stone-400 mb-1.5">متن پیامک (نام مشتری خودکار جایگذاری می‌شود):</p>
        <p className="text-sm leading-7 font-semibold text-stone-700">{tpl.text}</p>
      </div>

      <div className="mt-4 max-h-44 overflow-y-auto space-y-2 pl-1">
        {targets.map((c) => (
          <div key={c.phone} className="flex items-center justify-between rounded-2xl bg-white border border-orange-100 px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-100 text-xs font-black text-orange-600">{c.name[0]}</span>
              <div className="leading-tight">
                <p className="text-xs font-extrabold text-stone-800">{c.name} {c.weekly && <span className="rounded-full bg-[#ffb800] px-1.5 py-0.5 text-[9px] font-black text-[#1c1206]">هفتگی</span>}</p>
                <p className="text-[10px] font-bold text-stone-400" dir="ltr">{c.phone} • {c.orders} سفارش • آخرین: {c.last}</p>
              </div>
            </div>
            <MessageCircle className="h-4 w-4 text-orange-300" />
          </div>
        ))}
      </div>

      {sending && (
        <div className="mt-4">
          <div className="h-2.5 rounded-full bg-amber-100 overflow-hidden">
            <div className="h-full rounded-full bg-mango-grad transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 text-center text-xs font-extrabold text-orange-600">در حال ارسال… {progress}٪</p>
        </div>
      )}
      {sent && <p className="mt-4 flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-extrabold text-emerald-700 animate-pop"><CheckCircle2 className="h-4 w-4" /> ارسال با موفقیت انجام شد</p>}

      <button onClick={send} disabled={sending}
        className="shine-wrap mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-mango-grad px-8 py-4 font-black text-white shadow-xl shadow-orange-500/35 transition hover:scale-[1.02] active:scale-95 disabled:opacity-70">
        <Send className="h-5 w-5" /> ارسال پیامک به {targets.length} مشتری
      </button>
    </div>
  );
}

/* ---------------- Main Section ---------------- */
export default function OrderSection() {
  const [result, setResult] = useState<OrderResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 4500); };

  return (
    <section id="order" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-[#ffb800]/20 blur-3xl" />
        <div className="absolute bottom-10 -left-32 h-96 w-96 rounded-full bg-[#ff6a00]/15 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-4 py-1.5 text-xs font-extrabold text-orange-600">
            <Truck className="h-3.5 w-3.5" /> سفارش آنلاین + پیامک لحظه‌ای
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">یه کلیک تا <span className="text-mango-grad">پیک رایگان</span> درب منزلت</h2>
          <p className="mt-4 text-stone-600 font-medium leading-8">فرم رو پر کن؛ همون لحظه کد پیگیری، پیامک تحویل وسایل و فاکتور برات صادر می‌شه.</p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <OrderForm onSuccess={(r) => { setResult(r); showToast(`سفارش ${r.code} ثبت شد و پیامک ارسال شد!`); }} />
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Tracker />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <SmsPanel onToast={showToast} />
            </motion.div>
          </div>
        </div>

        {/* Result: SMS + Invoice */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-12">
              <div className="rounded-[36px] bg-white/60 backdrop-blur border border-orange-200 p-6 sm:p-10 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-2xl font-black">
                    <Sparkles className="h-6 w-6 text-orange-500" />
                    سفارشت ثبت شد! کد پیگیری: <span className="text-mango-grad" dir="ltr">{result.code}</span>
                  </h3>
                  <button onClick={() => setResult(null)} className="flex items-center gap-1.5 rounded-full bg-white border border-orange-200 px-4 py-2 text-xs font-extrabold text-stone-600 hover:border-orange-400">
                    <RotateCcw className="h-3.5 w-3.5" /> سفارش جدید
                  </button>
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
                  <SmsMockup result={result} />
                  <Invoice result={result} />
                </div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {STATUS_STEPS.map((s, i) => (
                    <div key={s} className={`rounded-2xl px-3 py-3 text-center text-xs font-extrabold ${i === 0 ? "bg-mango-grad text-white" : "bg-white border border-orange-100 text-stone-400"}`}>
                      {i + 1}. {s}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{toast && <Toast msg={toast} onClose={() => setToast(null)} />}</AnimatePresence>
    </section>
  );
}
