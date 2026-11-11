"use client";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Sparkles, Bike } from "lucide-react";

const links = [
  { href: "#services", label: "خدمات" },
  { href: "#steps", label: "مراحل سفارش" },
  { href: "#order", label: "ثبت سفارش" },
  { href: "#track", label: "پیگیری سفارش" },
  { href: "#pricing", label: "تعرفه‌ها" },
  { href: "#why", label: "چرا آرمان؟" },
  { href: "#faq", label: "سوالات متداول" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_10px_40px_-12px_rgba(255,106,0,0.25)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-mango-grad text-white shadow-lg shadow-orange-500/30 rotate-3">
              <Sparkles className="h-6 w-6" />
              <span className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-[#ffb800] border-2 border-white animate-pulse-ring" />
            </div>
            <div className="leading-tight">
              <p className="text-xl font-black tracking-tight">
                آرمان <span className="text-mango-grad">لاندری</span>
              </p>
              <p className="text-[11px] font-medium text-stone-500">خشکشویی • مبل‌شویی • پیک رایگان</p>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-stone-700 transition hover:bg-amber-100 hover:text-orange-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:09120000000"
              className="hidden md:flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2.5 text-sm font-bold text-stone-800 transition hover:border-orange-400"
            >
              <Phone className="h-4 w-4 text-orange-500" />
              <span dir="ltr">0912 000 0000</span>
            </a>
            <a
              href="#order"
              className="shine-wrap hidden sm:flex items-center gap-2 rounded-full bg-mango-grad px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.03] active:scale-95"
            >
              <Bike className="h-4 w-4" />
              درخواست پیک رایگان
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-xl bg-white border border-orange-100 shadow"
              aria-label="منو"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden animate-slide-down pb-4">
            <div className="rounded-3xl bg-white p-3 shadow-xl border border-orange-100">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-bold text-stone-700 hover:bg-amber-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-mango-grad px-4 py-3.5 text-sm font-extrabold text-white"
              >
                <Bike className="h-4 w-4" /> درخواست پیک رایگان
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
