import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Play, Compass } from "lucide-react";
import aerixHeroImg from "../assets/images/aerix_hero_1783680672014.jpg";

interface HeroSectionProps {
  scrollProgress: number;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content with a beautiful staggered transition quickly
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Full-bleed Majestic Alpine Drone Backdrop Cover */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
        style={{
          transform: `translateY(${scrollProgress * 180}px) scale(1.02)`,
          opacity: Math.max(0, 1 - scrollProgress * 1.8),
        }}
      >
        <img 
          src={aerixHeroImg} 
          alt="AERIX ONE flying above snowy alpine peaks" 
          className="w-full h-full object-cover select-none pointer-events-none opacity-85 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Dynamic high-contrast atmospheric masking */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,_transparent_20%,_rgba(2,6,23,0.85)_90%)" />
      </div>

      {/* Floating ambient telemetry overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none border border-white/5 m-4 rounded-[24px]">
        {/* Telemetry frame indicators */}
        <div className="absolute top-6 left-6 font-mono text-[9px] text-white/40 tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AERIX_SYS_ONLINE
        </div>
        <div className="absolute top-6 right-6 font-mono text-[9px] text-white/40 tracking-wider">
          LAT_89.043 // LON_-12.943
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/30 tracking-wider">
          REC_MODE_8K_PRORES
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-white/30 tracking-wider">
          ROLL_0.0° // PIT_12.5°
        </div>
      </div>

      {/* Hero Content (Sequenced Fade-up after flight in) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center mt-[40px] select-none pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={showContent ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Logo / Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md mb-6 hover:bg-white/10 transition-all cursor-pointer">
            <Compass className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-white">AERIX <span className="text-blue-400">ONE</span></span>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500/10 text-[8px] font-sans font-bold text-blue-400">AI PILOT</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-extrabold text-white tracking-tight leading-[1.05] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 italic">
            Intelligence Takes Flight.
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/75 leading-relaxed font-sans mb-10 px-4">
            The world's first fully autonomous AI drone for creators.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-sm shadow-lg shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Pre-Order Now</span>
            </a>
            <a
              href="#promotional-film"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch Product Film</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating features ticker at the bottom */}
      <div className="absolute bottom-12 w-full max-w-5xl px-6 flex justify-between items-center z-20 pointer-events-none select-none text-slate-400">
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 0.8 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col text-left"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">AIRFRAME WEIGHT</span>
          <span className="text-base font-bold text-white font-sans">440g Ultralight</span>
        </motion.div>
        
        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="flex flex-col items-center gap-1.5 cursor-pointer pointer-events-auto"
          onClick={() => {
            const nextSec = document.getElementById("exploded-view-section");
            if (nextSec) nextSec.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">EXPLORE</span>
          <ArrowDown className="w-4 h-4 text-slate-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 0.8 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col text-right"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">MAX RANGE</span>
          <span className="text-base font-bold text-white font-sans">15km Secure O3</span>
        </motion.div>
      </div>
    </section>
  );
}
