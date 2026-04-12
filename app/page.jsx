import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Membership from "./components/Membership";
import OwnerQuote from "./components/OwnerQuote";
import Programs from "./components/Programs";

export default function HomePage() {
  // 👇 THIS IS THE MAGIC LINE TO BUST THE CACHE 👇
  console.log("Forcing Vercel to rebuild Tailwind CSS!");

  return (
    <main>
      <Hero />
      <Programs />
      <OwnerQuote />
      <Membership />
      <CTABanner />
      <Location />
      <Footer />
    </main>
  );
}