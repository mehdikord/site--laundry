import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "آرمان لاندری | خشکشویی و مبل‌شویی با پیک رایگان درب منزل",
  description: "خشکشویی و مبل‌شویی آرمان — پیک رایگان با پیک موتوری، پیامک لحظه‌ای وضعیت سفارش، فاکتور آنلاین و تحویل تمیز و امن درب منزل.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
