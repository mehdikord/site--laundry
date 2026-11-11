"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shirt, Sofa, Layers, BedDouble, Zap, Footprints, Bike, MessageCircle,
  ShieldCheck, Sparkles, Clock, ChevronDown, Star, Quote, Check, ArrowLeft
} from "lucide-react";

/* ---------- Tilt Card ---------- */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(900px) rotateY(${x * -10}deg) rotateX(${y * 10}deg) translateY(-4px)` });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setStyle({})} style={style} className={`transition-transform duration-200 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Services ---------- */
const services = [
  { icon: Shirt, title: "خشکشویی لباس", desc: "پیراهن، کت‌وشلوار، مانتو و لباس‌های حساس با شوینده‌های اصل و بدون آسیب به بافت", price: "از ۴۵,۰۰۰ تومان", time: "۴۸ ساعت", img: "/images/pexels-5901622.jpg", tag: "پرفروش‌ترین" },
  { icon: Sofa, title: "مبل‌شویی در محل", desc: "شستشوی عمیق مبل با دستگاه تزریق-مکش، بدون نیاز به جابه‌جایی و با خشک‌شدن سریع", price: "از ۳۵۰,۰۰۰ تومان", time: "همان روز", img: "/images/pexels-11833895.jpg", tag: "در محل شما" },
  { icon: Layers, title: "فرش و موکت", desc: "شستشوی کامل فرش، موکت و گلیم با خشک‌کن صنعتی و تحویل لوله‌شده و تمیز", price: "از ۱۲۰,۰۰۰ تومان", time: "۷۲ ساعت", img: "/images/pexels-8774451.jpg", tag: "" },
  { icon: BedDouble, title: "پتو و لحاف", desc: "شستشوی پتو، لحاف و روتختی با ضدعفونی کامل و بسته‌بندی بهداشتی", price: "از ۹۵,۰۰۰ تومان", time: "۴۸ ساعت", img: "/images/pexels-7691101.jpg", tag: "" },
  { icon: Zap, title: "اتوکشی حرفه‌ای", desc: "اتوکشی بخار صنعتی برای لباس‌های رسمی، بدون برق‌افتادگی و با فرم حفظ‌شده", price: "از ۲۵,۰۰۰ تومان", time: "۲۴ ساعت", img: "/images/pexels-8774443.jpg", tag: "فوری" },
  { icon: Footprints, title: "کفش و کیف", desc: "شستشو و احیای کفش، کتانی و کیف چرم با حفظ فرم و رنگ اصلی", price: "از ۶۰,۰۰۰ تومان", time: "۷۲ ساعت", img: "/images/pexels-8774498.jpg", tag: "" },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-4 py-1.5 text-xs font-extrabold text-orange-600">
            <Sparkles className="h-3.5 w-3.5" /> خدمات آرمان
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">هر چیزی که کثیف شده، <span className="text-mango-grad">اینجا تمیز می‌شه</span></h2>
          <p className="mt-4 text-stone-600 font-medium leading-8">از لباس‌های روزمره تا مبل و فرش — همه با یک درخواست، پیک رایگان و پیامک لحظه‌ای.</p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <TiltCard className="h-full">
                <div className="group relative h-full overflow-hidden rounded-[28px] bg-white border border-orange-100 card-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.img} alt={s.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    {s.tag && <span className="absolute top-3 right-3 rounded-full bg-[#ffb800] px-3 py-1 text-[11px] font-black text-[#1c1206] shadow">{s.tag}</span>}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20 backdrop-blur border border-white/30"><s.icon className="h-5 w-5" /></span>
                      <h3 className="text-lg font-black drop-shadow">{s.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-7 text-stone-600 font-medium min-h-[56px]">{s.desc}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-dashed border-orange-100 pt-4">
                      <div>
                        <p className="text-[11px] font-bold text-stone-400">شروع قیمت</p>
                        <p className="font-black text-orange-600">{s.price}</p>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-extrabold text-stone-600">
                        <Clock className="h-3.5 w-3.5 text-orange-500" /> {s.time}
                      </span>
                    </div>
                    <a href="#order" className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#1c1206] py-3 text-sm font-extrabold text-white transition group-hover:bg-mango-grad">
                      سفارش این خدمت <ArrowLeft className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Steps ---------- */
const steps = [
  { icon: Bike, title: "درخواست پیک رایگان", desc: "فرم رو پر کن یا زنگ بزن؛ پیک موتوری آرمان در ساعت دلخواهت درب منزل حاضر می‌شه." },
  { icon: MessageCircle, title: "پیامک تحویل و فاکتور", desc: "همون لحظه پیامک می‌گیری که چه وسایلی تحویل داده شده و فاکتور آنلاین برات ارسال می‌شه." },
  { icon: Sparkles, title: "شستشوی تخصصی", desc: "لباس‌ها و مبل‌ها با شوینده اصل و دستگاه‌های صنعتی، با حفظ کامل بافت و رنگ شسته می‌شن." },
  { icon: ShieldCheck, title: "تحویل تمیز و امن", desc: "بسته‌بندی بهداشتی، تحویل درب منزل و پیامک «آماده تحویل شد» قبل از رسیدن پیک." },
];

export function Steps() {
  return (
    <section id="steps" className="relative py-20 bg-[#1c1206] overflow-hidden">
      <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-[#ffb800]/15 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[#ff6a00]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-extrabold text-amber-300">
            <Bike className="h-3.5 w-3.5" /> فقط در ۴ قدم
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-white leading-tight">از درخواست تا تحویل، <span className="text-mango-grad">همه‌چیز خودکاره</span></h2>
        </motion.div>

        <div className="relative mt-14 grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-10 inset-x-16 h-0.5 bg-gradient-to-l from-transparent via-[#ffb800]/50 to-transparent" />
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-[24px] bg-mango-grad text-white shadow-xl shadow-orange-500/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                <s.icon className="h-9 w-9" />
                <span className="absolute -top-2 -left-2 grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-black text-orange-600 shadow">{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-black text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-300 font-medium">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <a href="#order" className="shine-wrap inline-flex items-center gap-2 rounded-full bg-mango-grad px-8 py-4 font-black text-white shadow-xl shadow-orange-500/30 hover:scale-[1.03] transition">
            <Bike className="h-5 w-5" /> همین حالا پیک رایگان بخواه
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
const plans = [
  { name: "پکیج اقتصادی", price: "۲۹۰,۰۰۰", unit: "تومان / پکیج", features: ["۵ کیلو شستشو و اتو", "پیک رایگان رفت و برگشت", "پیامک وضعیت سفارش", "تحویل ۴۸ ساعته"], hot: false },
  { name: "پکیج خانواده", price: "۵۹۰,۰۰۰", unit: "تومان / پکیج", features: ["۱۰ کیلو شستشو + اتوکشی کامل", "شستشوی ۱ عدد پتو رایگان", "پیک رایگان + فاکتور آنلاین", "اولویت تحویل ۲۴ ساعته", "۱۰٪ تخفیف مشتریان هفتگی"], hot: true },
  { name: "پکیج مبل‌شویی", price: "۸۹۰,۰۰۰", unit: "تومان / ست مبل", features: ["شستشوی عمیق مبل در محل", "ضدعفونی و خوشبوکننده", "خشک‌شدن سریع همان روز", "ضمانت بازگشت لکه"], hot: false },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
          <span className="inline-flex rounded-full bg-white border border-orange-200 px-4 py-1.5 text-xs font-extrabold text-orange-600">تعرفه‌های شفاف</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black">بدون هزینه پنهان، <span className="text-mango-grad">فاکتور دقیق</span></h2>
          <p className="mt-4 text-stone-600 font-medium">قیمت نهایی قبل از شستشو در فاکتور پیامکی مشخص می‌شه. پیک همیشه رایگانه.</p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={p.hot ? "md:-mt-4 md:mb-[-1rem]" : ""}>
              <div className={`relative h-full rounded-[28px] p-6 ${p.hot ? "bg-[#1c1206] text-white card-shadow-lg border-2 border-[#ffb800]" : "bg-white border border-orange-100 card-shadow"}`}>
                {p.hot && <span className="absolute -top-3.5 right-6 rounded-full bg-mango-grad px-4 py-1.5 text-xs font-black text-white shadow-lg">محبوب‌ترین</span>}
                <h3 className={`text-lg font-black ${p.hot ? "text-amber-300" : "text-stone-800"}`}>{p.name}</h3>
                <div className="mt-4 flex items-end gap-2">
                  <span className={`text-4xl font-black ${p.hot ? "text-mango-grad" : "text-orange-600"}`}>{p.price}</span>
                  <span className={`pb-1.5 text-xs font-bold ${p.hot ? "text-stone-300" : "text-stone-400"}`}>{p.unit}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm font-semibold ${p.hot ? "text-stone-200" : "text-stone-600"}`}>
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.hot ? "bg-[#ffb800] text-[#1c1206]" : "bg-amber-100 text-orange-600"}`}><Check className="h-3 w-3" /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#order" className={`mt-7 flex items-center justify-center rounded-2xl py-3.5 text-sm font-extrabold transition hover:scale-[1.02] ${p.hot ? "bg-mango-grad text-white shadow-lg shadow-orange-500/30" : "bg-[#1c1206] text-white"}`}>
                  انتخاب این پکیج
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Us ---------- */
const reasons = [
  { icon: Bike, title: "پیک موتوری رایگان", desc: "رفت و برگشت درب منزل بدون حتی یک تومان هزینه — کلاسیک، سریع و مطمئن." },
  { icon: ShieldCheck, title: "امنیت و ضمانت وسایل", desc: "رسید تحویل و فاکتور برای هر سفارش؛ وسایلت مثل روز اول برمی‌گردن." },
  { icon: MessageCircle, title: "پیامک لحظه‌ای", desc: "تحویل، آماده‌شدن و زمان رسیدن پیک — همه رو لحظه‌ای پیامک می‌گیری." },
  { icon: Sparkles, title: "تمیزی تضمینی", desc: "شوینده اصل، دستگاه صنعتی و بازرسی قبل از تحویل. راضی نبودی، دوباره می‌شوریم." },
];

export function WhyUs() {
  return (
    <section id="why" className="py-20 bg-white border-y border-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex rounded-full bg-amber-50 border border-orange-200 px-4 py-1.5 text-xs font-extrabold text-orange-600">چرا آرمان لاندری؟</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">اعتماد کلاسیک، <span className="text-mango-grad">راحتی مدرن</span></h2>
            <p className="mt-4 text-stone-600 font-medium leading-8">
              مشتری‌های آرمان، آدم‌های مدرنی هستن که ارزش، راحتی و تخصص می‌خوان. برای همین هر سفارش رو با رسید، فاکتور و پیامک لحظه‌ای مدیریت می‌کنیم — مثل قدیم مطمئن، مثل امروز سریع.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-3xl bg-[#fff8ec] border border-orange-100 p-5 hover:border-orange-300 hover:-translate-y-1 transition">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mango-grad text-white shadow"><r.icon className="h-5 w-5" /></span>
                  <h3 className="mt-3 font-black">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-stone-600 font-medium">{r.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="perspective-800">
              <div className="preserve-3d rotate-[-3deg] hover:rotate-0 transition-transform duration-500 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                <img src="/images/pexels-6492065.jpg" alt="ماشین لباسشویی آرمان" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="absolute -bottom-6 right-6 animate-floaty">
              <div className="rounded-3xl bg-[#1c1206] text-white px-5 py-4 shadow-2xl">
                <p className="text-2xl font-black text-mango-grad">+۱۲,۰۰۰</p>
                <p className="text-xs font-bold text-stone-300">سفارش تمیز و تحویل‌شده</p>
              </div>
            </div>
            <div className="absolute -top-5 left-4 animate-floaty2">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl border border-orange-100">
                <span className="flex text-[#ffb800]">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</span>
                <span className="text-xs font-black">رضایت ۹۸٪ مشتری‌ها</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const testimonials = [
  { name: "سارا محمدی", area: "سعادت‌آباد", text: "مبل‌مون رو توی خونه شستن، همون روز خشک شد. پیامک آماده‌شدن هم دقیق اومد. واقعاً راحت شدم!", stars: 5 },
  { name: "امیر رضایی", area: "ونک", text: "هر هفته لباس‌هام رو می‌فرستم. پیک رایگان، فاکتور پیامکی و تحویل تمیز. دیگه اتوشویی نمی‌رم.", stars: 5 },
  { name: "مریم کریمی", area: "پونک", text: "کت‌وشلوار همسرم رو خشکشویی دادن، بدون هیچ آسیبی برگشت. رسید تحویل هم برام پیامک شد.", stars: 5 },
  { name: "رضا احمدی", area: "شهرک غرب", text: "پتوها رو تحویل دادم، دو روز بعد تمیز و بسته‌بندی‌شده برگشتن. قیمت هم از قبل تو فاکتور مشخص بود.", stars: 5 },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-4 py-1.5 text-xs font-extrabold text-orange-600">
            <Quote className="h-3.5 w-3.5" /> حرف مشتری‌ها
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black">مشتری‌های <span className="text-mango-grad">راضی</span> آرمان</h2>
        </motion.div>

        <div className="relative mt-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, rotateY: 8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -20, rotateY: -8 }}
              transition={{ duration: 0.4 }}
              className="rounded-[32px] bg-white border border-orange-100 card-shadow p-8"
            >
              <div className="flex justify-center gap-1 text-[#ffb800]">
                {[...Array(testimonials[idx].stars)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-5 text-lg sm:text-xl leading-9 font-bold text-stone-800">«{testimonials[idx].text}»</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mango-grad text-white font-black text-lg">{testimonials[idx].name[0]}</span>
                <div className="text-right">
                  <p className="font-black">{testimonials[idx].name}</p>
                  <p className="text-xs font-bold text-stone-400">{testimonials[idx].area}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`نظر ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "w-10 bg-mango-grad" : "w-2.5 bg-orange-200 hover:bg-orange-300"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "پیک واقعاً رایگانه؟", a: "بله! دریافت و تحویل درب منزل با پیک موتوری کاملاً رایگانه و هیچ هزینه‌ای به فاکتور اضافه نمی‌شه. فقط هزینه شستشو رو پرداخت می‌کنی." },
  { q: "پیامک وضعیت سفارش چطور ارسال می‌شه؟", a: "به محض ثبت سفارش، پیامک «وسایل تحویل گرفته شد» به همراه کد پیگیری و فاکتور برات ارسال می‌شه. وقتی سفارش آماده شد هم پیامک «آماده تحویل» می‌گیری." },
  { q: "مبل‌شویی در محل انجام می‌شه یا مبل رو می‌برید؟", a: "مبل‌شویی با دستگاه تزریق-مکش در محل شما انجام می‌شه؛ نیازی به جابه‌جایی مبل نیست و همان روز خشک و آماده استفاده می‌شه." },
  { q: "اگر لباس آسیب ببینه چه اتفاقی می‌فته؟", a: "همه سفارش‌ها رسید تحویل دارن و ضمانت سلامت وسایل داریم. در صورت هرگونه آسیب، خسارت طبق رسید جبران می‌شه." },
  { q: "تحویل سفارش چقدر طول می‌کشه؟", a: "خشکشویی معمولاً ۴۸ ساعت، اتوکشی ۲۴ ساعت و مبل‌شویی همان روز انجام می‌شه. زمان دقیق در پیامک ثبت سفارش مشخص می‌شه." },
  { q: "چطور مشتری ثابت هفتگی بشم و تخفیف بگیرم؟", a: "اگر هر هفته سفارش بدی، خودکار در گروه مشتریان هفتگی قرار می‌گیری و پیامک تخفیف اختصاصی برات ارسال می‌شه." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-white border-t border-orange-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl sm:text-5xl font-black">سوالات <span className="text-mango-grad">متداول</span></h2>
        </motion.div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`overflow-hidden rounded-3xl border transition ${open === i ? "border-orange-300 bg-[#fff8ec] shadow-lg shadow-orange-500/10" : "border-orange-100 bg-white"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right">
                <span className="font-extrabold text-stone-800">{f.q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${open === i ? "bg-mango-grad text-white rotate-180" : "bg-amber-100 text-orange-600"}`}>
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p className="px-6 pb-6 text-sm leading-8 text-stone-600 font-medium">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
