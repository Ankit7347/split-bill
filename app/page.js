"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import FeatureSection from "@/components/homepage/FeatureSection";
import HowItsWork from "@/components/homepage/HowItsWork";
import BenefitsTestimonialSection from "@/components/homepage/BenefitsTestimonialSection";
import LoginBenefitsSection from "@/components/homepage/LoginBenefitsSection";
import CallToActonSection from "@/components/homepage/CallToActonSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* How It Works Section */}
        <HowItsWork />

        {/* Benefits / Testimonials Section */}
        <BenefitsTestimonialSection />

        {/* With Login Benefits Section */}
        <LoginBenefitsSection />

        {/* Call to Action Section */}
        <CallToActonSection />
      </main>
      <Footer />
    </>
  );
}
