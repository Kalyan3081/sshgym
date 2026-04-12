import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Membership from "./components/Membership";
import OwnerQuote from "./components/OwnerQuote";
import Programs from "./components/Programs";


export default function HomePage() {
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