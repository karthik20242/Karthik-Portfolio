import React from "react";
import { Check, ShieldCheck, Flame, Star } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "AERIX ONE Air",
      price: "$1,299",
      desc: "Perfect for lightweight creative exploration and everyday travel creators.",
      features: [
        "4K Cine-Stabilized Camera (Single Sensor)",
        "40 Minutes Total Flight Time",
        "10km O3 Signal Range",
        "Standard Obstacle Sensing (Front/Back)",
        "Smart Follow Me & Orbit Modes",
        "Protective Carrying Pouch",
      ],
      cta: "Pre-Order Air Edition",
      flagship: false,
      badge: "LITE & COMPACT",
    },
    {
      name: "AERIX ONE Ultra",
      price: "$2,499",
      desc: "The absolute flagship. Built for elite professionals, cinematographers, and rescue squads.",
      features: [
        "8K Dual ProRes Cinema Camera (Wide + Zoom)",
        "55 Minutes Total Flight Time",
        "15km Secured O3 Signal Range",
        "Omnidirectional LiDAR Collision Avoidance",
        "Active Cognitive Path-Mapping AI Core",
        "Rugged Carbon-Fiber Weatherproof Chassis",
        "Smart Controller Pro + Rugged Hardcase",
        "Premium 24/7 Priority Support",
      ],
      cta: "Pre-Order Ultra (Flagship)",
      flagship: true,
      badge: "RECOMMENDED FLAGSHIP",
    },
    {
      name: "AERIX ONE Pro",
      price: "$1,899",
      desc: "For advanced creators, surveyors, and commercial operators.",
      features: [
        "4K/120fps CinePro Stabilized Camera",
        "48 Minutes Total Flight Time",
        "12km O3 Signal Range",
        "360° Stereoscopic Obstacle Avoidance",
        "Dynamic 3D Waypoint Path-Planning",
        "Rugged Travel Messenger Bag",
      ],
      cta: "Pre-Order Pro Edition",
      flagship: false,
      badge: "MOST POPULAR FOR CREATORS",
    },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full py-24 sm:py-32 bg-white border-b border-gray-200 overflow-hidden"
    >
      {/* Immersive radial gradient glow behind flagship */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.06)_0%,_transparent_65%)] pointer-events-none select-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            Order Availability
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            Secure Your AERIX ONE.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Select the perfect configuration for your creative or commercial operations. All preorder editions include priority batch dispatching shipping late Fall 2026.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`group relative rounded-[36px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                p.flagship
                  ? "bg-slate-950 text-white border-4 border-blue-600 shadow-[0_24px_50px_rgba(37,99,235,0.15)] md:-translate-y-4 scale-105"
                  : "bg-white/40 backdrop-blur-xl text-gray-800 border border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Flagship decoration badge */}
              {p.flagship && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-sans font-black text-[10px] tracking-widest px-4 py-1.5 rounded-full uppercase shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
                  <span>{p.badge}</span>
                </div>
              )}

              <div>
                {/* Header Row */}
                <div className="flex justify-between items-center mb-6">
                  {!p.flagship && (
                    <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200/50">
                      {p.badge}
                    </span>
                  )}
                  {p.flagship && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />}
                </div>

                {/* Plan Metadata */}
                <h3 className={`text-xl sm:text-2xl font-bold font-sans ${p.flagship ? "text-white" : "text-black"}`}>
                  {p.name}
                </h3>
                <p className={`text-xs mt-2 leading-relaxed ${p.flagship ? "text-gray-400" : "text-gray-500"}`}>
                  {p.desc}
                </p>

                {/* Price Label */}
                <div className="my-8 flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-extrabold font-sans tracking-tight ${p.flagship ? "text-white" : "text-black"}`}>
                    {p.price}
                  </span>
                  <span className={`text-xs font-mono uppercase tracking-wider ${p.flagship ? "text-zinc-500" : "text-gray-400"}`}>
                    USD PREORDER
                  </span>
                </div>

                {/* Divider */}
                <div className={`h-[1px] w-full my-6 ${p.flagship ? "bg-zinc-800" : "bg-gray-200/50"}`} />

                {/* Features list */}
                <ul className="flex flex-col gap-4 text-xs sm:text-sm">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex gap-3 items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.flagship ? "bg-blue-950 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={p.flagship ? "text-zinc-300" : "text-gray-600"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Preorder Button */}
              <button
                className={`w-full py-4 mt-10 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer ${
                  p.flagship
                    ? "bg-white text-black hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95"
                    : "bg-black text-white hover:bg-blue-600 hover:scale-105 active:scale-95"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic Guarantee Badge */}
        <div className="mt-16 sm:mt-24 w-full max-w-3xl mx-auto rounded-3xl bg-white/40 backdrop-blur-xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-5 justify-between shadow-sm">
          <div className="flex gap-4 items-center text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">AERIX Premium Airframe Protection</h4>
              <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                Every pre-order includes 1 year of AERIX Care+ coverage, protecting against accidental collisions or water damage with zero replacement fees.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 uppercase shrink-0">
            INCLUDED COMPLIMENTARY
          </span>
        </div>
      </div>
    </section>
  );
}
