import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Decks from "@/sections/Decks";
import Progress from "@/sections/Progress";
import SRS from "@/sections/SRS";
import CTA from "@/sections/Download";
import Footer from "@/sections/Footer";
import CookieBanner from "@/app/components/CookieBanner";
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Features />
      <Decks />
      <Progress />
      <SRS />
      <CTA />
      <Footer />
      <CookieBanner />
    </main>
  );
}