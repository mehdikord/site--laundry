import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OrderSection from "@/components/OrderSection";
import Footer from "@/components/Footer";
import { Services, Steps, Pricing, WhyUs, Testimonials, Faq } from "@/components/InfoSections";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Steps />
      {/* Order + Tracker + SMS panel (tracker anchor lives inside OrderSection) */}
      <div id="track" className="scroll-mt-24">
        <OrderSection />
      </div>
      <Pricing />
      <WhyUs />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
