import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import DroneSeriesLineup from "./components/DroneSeriesLineup";
import ExplodedViewSection from "./components/ExplodedViewSection";
import AIBrainSection from "./components/AIBrainSection";
import GallerySection from "./components/GallerySection";
import RealLifeApplications from "./components/RealLifeApplications";
import InteractiveFlightModes from "./components/InteractiveFlightModes";
import ThreeSixtyViewer from "./components/ThreeSixtyViewer";
import PerformanceDashboard from "./components/PerformanceDashboard";
import PromotionalFilm from "./components/PromotionalFilm";
import FAQSection from "./components/FAQSection";
import PricingSection from "./components/PricingSection";
import FooterAndTestimonials from "./components/FooterAndTestimonials";
import { Compass, Menu, X, ArrowUp } from "lucide-react";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor window scrolling to update cinematic positions
  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      setScrollY(curY);

      // Compute scroll percentage of first viewport
      const windowHeight = window.innerHeight || 800;
      const progress = Math.min(1, curY / windowHeight);
      setScrollProgress(progress);

      // Show scroll-to-top button
      setShowScrollTop(curY > 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-800 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden font-sans">
      {/* ========================================================= */}
      {/* GLOBAL PREMIUM HEADER & NAV                               */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrollY > 30
            ? "bg-slate-950/95 backdrop-blur-md border-slate-800/60 py-3 sm:py-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] text-white"
            : "bg-slate-900/90 backdrop-blur-md border-slate-800/40 py-4 sm:py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Brand */}
          <div
            onClick={() => scrollToSection("hero-section")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <Compass className="w-5.5 h-5.5 text-blue-500 group-hover:rotate-180 transition-transform duration-700 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="font-mono font-black tracking-[0.25em] text-white text-sm sm:text-base">
              AERIX ONE
            </span>
          </div>

          {/* Desktop Links (Premium Sci-Fi Minimalism) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-300 uppercase">
            <button
              onClick={() => scrollToSection("aerix-series")}
              className="hover:text-blue-400 transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Series
            </button>
            <button
              onClick={() => scrollToSection("exploded-view-section")}
              className="hover:text-blue-400 transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Blueprint
            </button>
            <button
              onClick={() => scrollToSection("ai-brain-section")}
              className="hover:text-blue-400 transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              AI Brain
            </button>
            <button
              onClick={() => scrollToSection("captured-gallery")}
              className="hover:text-blue-400 transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("360-viewer")}
              className="hover:text-blue-400 transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              360° View
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-blue-400 transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Specs
            </button>
          </nav>

          {/* Action Pre-Order Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(59,130,246,0.45)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Pre-Order Now
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full inset-x-0 bg-slate-950/98 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl animate-[fadeIn_0.3s_ease-out] text-xs font-bold tracking-wider text-slate-300 uppercase">
            <button onClick={() => scrollToSection("aerix-series")} className="text-left py-2 hover:text-blue-400 border-b border-slate-900/50">
              Series Collection
            </button>
            <button onClick={() => scrollToSection("exploded-view-section")} className="text-left py-2 hover:text-blue-400 border-b border-slate-900/50">
              Blueprint Specs
            </button>
            <button onClick={() => scrollToSection("ai-brain-section")} className="text-left py-2 hover:text-blue-400 border-b border-slate-900/50">
              AI Brain System
            </button>
            <button onClick={() => scrollToSection("captured-gallery")} className="text-left py-2 hover:text-blue-400 border-b border-slate-900/50">
              Captured Gallery
            </button>
            <button onClick={() => scrollToSection("360-viewer")} className="text-left py-2 hover:text-blue-400 border-b border-slate-900/50">
              Interactive 360°
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-left py-2 hover:text-blue-400 border-b border-slate-900/50">
              Pricing Options
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="w-full text-center py-3.5 mt-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold tracking-wider"
            >
              Pre-Order Now
            </button>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* CINEMATIC SECTIONS CORNERSTONE                            */}
      {/* ========================================================= */}
      <main>
        {/* 1. Opening hero stage */}
        <HeroSection scrollProgress={scrollProgress} />

        {/* 2. AERIX Series interactive drone lineup */}
        <DroneSeriesLineup />

        {/* 3. Interactive exploded internal layout */}
        <ExplodedViewSection />

        {/* 3. bento block features showing AI brains */}
        <AIBrainSection />

        {/* 5. showcase aerial photographic gallery */}
        <GallerySection />

        {/* 6. workflow telemetries */}
        <RealLifeApplications />

        {/* 7. autonomous flight mode modules */}
        <InteractiveFlightModes />

        {/* 8. mouse rotate 360 viewer */}
        <ThreeSixtyViewer />

        {/* 9. circular indicators */}
        <PerformanceDashboard />

        {/* 10. immersive player */}
        <PromotionalFilm />

        {/* 11. preorder cards */}
        <PricingSection />

        {/* 12. accordions */}
        <FAQSection />

        {/* 13. testimonies, signup and luxury footer */}
        <FooterAndTestimonials />
      </main>

      {/* ========================================================= */}
      {/* PREMIUM SCROLL-TO-TOP BUTTON                              */}
      {/* ========================================================= */}
      {showScrollTop && (
        <button
          onClick={() => scrollToSection("hero-section")}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/30 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer animate-[fadeIn_0.4s_ease-out]"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
