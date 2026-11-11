"use client";
import { Sparkles, Phone, MapPin, Clock, Camera, Send, Bike, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#1c1206] text-white overflow-hidden">
      <div className="absolute -top-20 right-1/3 h-56 w-56 rounded-full bg-[#ffb800]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mango-grad text-white rotate-3"><Sparkles className="h-6 w-6" /></span>
              <div>
                <p className="text-xl font-black">آرمان <span className="text-mango-grad">لاندری</span></p>
                <p className="text-xs font-medium text-stone-400">خشکشویی • مبل‌شویی • پیک رایگان درب منزل</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-8 text-stone-300 font-medium">
              اعتماد کلاسیک، راحتی مدرن. لباس و مبلت رو درب منزل تحویل می‌گیریم، تمیز و امن برمی‌گردونیم و وضعیت سفارش رو لحظه‌ای پیامک می‌کنیم.
            </p>
            <div className="mt-6 flex gap-2">
              {[Camera, Send, MessageCircle].map((Icon, i) => (
                <a key={i} href="#top" aria-label="شبکه اجتماعی" className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 border border-white/10 transition hover:bg-mango-grad hover:border-transparent">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-amber-300">دسترسی سریع</h4>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-stone-300">
              {[
                ["#services", "خدمات"],
                ["#order", "ثبت سفارش"],
                ["#track", "پیگیری سفارش"],
                ["#pricing", "تعرفه‌ها"],
                ["#faq", "سوالات متداول"],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:text-[#ffb800] transition">{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-amber-300">تماس و ساعت کاری</h4>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-stone-300">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#ffb800]" /><span dir="ltr">0912 000 0000</span></li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb800]" /> تهران، خیابان اصلی، پلاک ۱۲ — پیک به همه مناطق</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#ffb800]" /> هر روز ۸ صبح تا ۹ شب</li>
              <li className="flex items-center gap-2"><Bike className="h-4 w-4 text-[#ffb800]" /> پیک رایگان: همه روزها</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs font-bold text-stone-400">
          <p>© ۱۴۰۵ آرمان لاندری — نسخه دمو (استاتیک، بدون دیتابیس)</p>
          <p>ساخته‌شده با 💛 برای مشتری‌های تمیزپسند</p>
        </div>
      </div>

      {/* Floating call button */}
      <a href="tel:09120000000" className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-mango-grad px-5 py-3.5 font-black text-white shadow-2xl shadow-orange-500/40 animate-pulse-ring hover:scale-105 transition">
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline text-sm">تماس با آرمان</span>
      </a>
    </footer>
  );
}
