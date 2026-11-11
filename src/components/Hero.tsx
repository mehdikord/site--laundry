"use client";
import { motion } from "framer-motion";
import { Bike, MessageCircle, ShieldCheck, Clock, Star, ArrowDown, Sparkles, Truck, BadgeCheck } from "lucide-react";

/* ---------- 3D Washing Machine (CSS 3D) ---------- */
function WashingMachine3D() {
  return (
    <div className="perspective-1200 relative mx-auto w-full max-w-[420px]">
      {/* Bubbles */}
      <div className="absolute inset-0 overflow-visible pointer-events-none z-20">
        <span className="bubble" style={{ width: 22, height: 22, right: "12%", bottom: "18%", animationDuration: "5s", animationDelay: "0s" }} />
        <span className="bubble" style={{ width: 14, height: 14, right: "22%", bottom: "10%", animationDuration: "6s", animationDelay: "1.2s" }} />
        <span className="bubble" style={{ width: 30, height: 30, right: "6%", bottom: "30%", animationDuration: "7s", animationDelay: "0.6s" }} />
        <span className="bubble" style={{ width: 12, height: 12, left: "10%", bottom: "22%", animationDuration: "5.5s", animationDelay: "2s" }} />
        <span className="bubble" style={{ width: 18, height: 18, left: "18%", bottom: "8%", animationDuration: "6.5s", animationDelay: "0.9s" }} />
        <span className="bubble" style={{ width: 10, height: 10, right: "38%", bottom: "5%", animationDuration: "4.8s", animationDelay: "1.7s" }} />
      </div>

      {/* Machine body with 3D tilt */}
      <motion.div
        initial={{ rotateY: -14, rotateX: 6, y: 30, opacity: 0 }}
        animate={{ rotateY: -8, rotateX: 4, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ rotateY: 4, rotateX: 2, scale: 1.02 }}
        className="preserve-3d relative mx-auto w-[300px] sm:w-[340px] rounded-[36px] bg-gradient-to-b from-white via-amber-50 to-amber-100 p-4 shadow-[0_40px_90px_-20px_rgba(255,106,0,0.45)] border border-white"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top panel */}
        <div className="rounded-[24px] bg-[#1c1206] px-4 py-3 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb800] animate-pulse" />
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <div className="rounded-lg bg-black/60 border border-white/10 px-3 py-1 text-center">
            <p className="text-[10px] text-amber-300 font-bold tracking-widest">ARMAN LAUNDRY</p>
            <p className="text-sm font-black text-white leading-none mt-0.5">48h <span className="text-[10px] font-medium text-amber-200">تحویل</span></p>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-mango-grad text-white">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Door */}
        <div className="relative mx-auto mt-4 grid place-items-center">
          <div className="relative h-[220px] w-[220px] sm:h-[250px] sm:w-[250px] rounded-full bg-gradient-to-br from-stone-800 via-stone-900 to-black p-3 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8),0_20px_40px_-10px_rgba(0,0,0,0.4)]">
            {/* Glass */}
            <div className="relative h-full w-full rounded-full overflow-hidden bg-[radial-gradient(circle_at_35%_30%,#3a2a12,#120b02_65%)]">
              {/* Rotating drum */}
              <div className="drum-spin absolute inset-3 rounded-full" style={{ background: "conic-gradient(from 0deg, #ffb800, #ff6a00, #ff8a3d, #ffd166, #ff6a00, #ffb800)" }}>
                <div className="absolute inset-3 rounded-full bg-[#1c1206]/85" />
                {/* Clothes blobs */}
                <div className="absolute inset-0">
                  <span className="absolute top-[18%] right-[22%] h-12 w-16 rounded-full bg-amber-300/90 blur-[1px]" />
                  <span className="absolute bottom-[20%] left-[18%] h-14 w-14 rounded-full bg-orange-400/90 blur-[1px]" />
                  <span className="absolute top-[42%] left-[38%] h-10 w-16 rounded-full bg-white/85 blur-[1px]" />
                  <span className="absolute bottom-[30%] right-[30%] h-9 w-12 rounded-full bg-yellow-200/90 blur-[1px]" />
                </div>
              </div>
              {/* Drum holes ring */}
              <div className="drum-spin-rev absolute inset-0 rounded-full border-[10px] border-dashed border-white/15" />
              {/* Glass reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/25" />
              <div className="absolute top-4 left-6 h-16 w-8 rounded-full bg-white/25 blur-md -rotate-12" />
            </div>
            {/* Rim highlight */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 pointer-events-none" />
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow">
          <span className="flex items-center gap-1.5 text-xs font-extrabold text-stone-700">
            <ShieldCheck className="h-4 w-4 text-orange-500" /> ضمانت سلامت لباس
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-black text-orange-600">پیک رایگان</span>
        </div>

        {/* 3D side glow */}
        <div className="absolute -z-10 inset-4 translate-x-6 translate-y-6 rounded-[36px] bg-gradient-to-br from-[#ffb800] to-[#ff4d00] opacity-30 blur-2xl" />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -right-2 sm:right-0 top-6 z-30 animate-floaty"
      >
        <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl border border-orange-100">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-mango-grad text-white"><Bike className="h-5 w-5" /></span>
          <div className="leading-tight">
            <p className="text-xs font-black">پیک موتوری رایگان</p>
            <p className="text-[10px] text-stone-500 font-medium">درب منزل، بدون هزینه</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute -left-2 sm:left-0 top-[42%] z-30 animate-floaty2"
      >
        <div className="flex items-center gap-2 rounded-2xl bg-[#1c1206] px-3.5 py-2.5 shadow-xl text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffb800] text-[#1c1206]"><MessageCircle className="h-5 w-5" /></span>
          <div className="leading-tight">
            <p className="text-xs font-black">پیامک لحظه‌ای</p>
            <p className="text-[10px] text-amber-200 font-medium">وضعیت سفارش + فاکتور</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute right-4 -bottom-4 z-30 animate-bob"
      >
        <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl border border-orange-100">
          <span className="flex text-[#ffb800]">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
          </span>
          <p className="text-xs font-black">۴.۹ از ۵ <span className="font-medium text-stone-500">(+۲,۴۰۰ نظر)</span></p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[110px] pb-16 sm:pt-[130px] sm:pb-24">
      {/* Background decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#ffb800]/25 blur-3xl" />
        <div className="absolute top-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#ff6a00]/20 blur-3xl" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">
          {/* Copy */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-extrabold text-orange-600 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
              </span>
              پیک رایگان امروز فعال است — تا ساعت ۲۱:۰۰
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-[42px] sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight"
            >
              لباس و مبلت رو
              <br />
              <span className="text-mango-grad">تمیز و نو</span> تحویل بگیر
              <br />
              <span className="text-[0.55em] font-extrabold text-stone-700">بدون اینکه از خونه بیرون بری</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg leading-8 text-stone-600 font-medium max-w-xl mx-auto lg:mx-0"
            >
              <strong className="text-stone-900">آرمان لاندری</strong> با پیک موتوری رایگان، لباس‌ها و مبل‌هات رو درب منزل تحویل می‌گیره،
              با دقت و امنیت کامل می‌شوره و <strong className="text-orange-600">پیامک لحظه‌ای</strong> وضعیت سفارش و فاکتور رو برات می‌فرسته.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <a href="#order" className="shine-wrap w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-mango-grad px-8 py-4 text-base font-black text-white shadow-xl shadow-orange-500/35 transition hover:scale-[1.03] active:scale-95">
                <Bike className="h-5 w-5" />
                درخواست پیک رایگان
              </a>
              <a href="#track" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-stone-800 border-2 border-stone-900/10 transition hover:border-orange-400 hover:text-orange-600">
                <Truck className="h-5 w-5" />
                پیگیری سفارش
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm font-bold text-stone-600"
            >
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-orange-500" /> ضمانت سلامت وسایل</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-orange-500" /> تحویل ۴۸ ساعته</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-orange-500" /> شوینده‌های اصل</span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-10 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { n: "+۱۲,۰۰۰", l: "سفارش موفق" },
                { n: "۴۸ ساعت", l: "تحویل تضمینی" },
                { n: "۰ تومان", l: "هزینه پیک" },
              ].map((s) => (
                <div key={s.l} className="rounded-3xl bg-white/80 backdrop-blur border border-orange-100 px-3 py-4 text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-black text-mango-grad">{s.n}</p>
                  <p className="mt-1 text-[11px] sm:text-xs font-bold text-stone-500">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Machine */}
          <div className="relative">
            <WashingMachine3D />
            <div className="mt-10 flex justify-center">
              <a href="#services" className="flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:gap-3 transition-all">
                مشاهده خدمات <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-16 -rotate-1 bg-[#1c1206] py-3.5 overflow-hidden shadow-xl">
        <div className="marquee-track gap-0" dir="ltr">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-8 px-4" dir="rtl">
              {["خشکشویی لباس", "مبل‌شویی در محل", "پیک رایگان درب منزل", "پیامک لحظه‌ای", "فاکتور آنلاین", "تحویل ۴۸ ساعته", "اتوکشی حرفه‌ای", "شستشوی فرش و موکت"].map((t) => (
                <span key={t} className="flex items-center gap-8 text-sm font-extrabold text-white whitespace-nowrap">
                  {t} <Sparkles className="h-4 w-4 text-[#ffb800]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
