import React from "react";
import { Cpu, Compass, MapPin, CloudSun, Home, Mic, Eye, Sliders, Play, ShieldAlert, Zap } from "lucide-react";

export default function AIBrainSection() {
  const aiFeatures = [
    {
      title: "Autonomous Flight Core",
      desc: "Zero pilot intervention. Deep Reinforcement Learning algorithms calculate drift, drag, and air density instantly.",
      icon: Cpu,
      badge: "Quantum OS",
    },
    {
      title: "Active Terrain Mapping",
      desc: "Simultaneously maps landscapes using stereoscopic neural depth-sensors to construct localized, real-time 3D models.",
      icon: MapPin,
      badge: "SLAM V3",
    },
    {
      title: "Weather Intelligence",
      desc: "Monitors gust trends, ambient moisture, and barometric drops, proactively warning or adjusting rotor trim.",
      icon: CloudSun,
      badge: "Real-time AI",
    },
    {
      title: "Predictive Return-Home",
      desc: "Intelligently calculates optimal energy curves, plotting backtracks around new obstacles, not just linear routes.",
      icon: Home,
      badge: "Smart Pathing",
    },
    {
      title: "Voice & Gesture Control",
      desc: "Perform flawless orbits, hand-launches, or high-definition snapshots using simple voice queues or hand signs.",
      icon: Mic,
      badge: "Neural NLP",
    },
    {
      title: "Dynamic Mission Planning",
      desc: "Draw complex multi-point surveys, loops, or custom inspection maps on your tablet. AI optimizes fuel and camera tilt.",
      icon: Compass,
      badge: "Geo-Fence",
    },
    {
      title: "AI Cinematic Flight",
      desc: "Simulates professional crane and jib movements with active tracking, keeping objects locked in cinematic rule-of-thirds.",
      icon: Play,
      badge: "CineCore",
    },
    {
      title: "Active Obstacle Avoidance",
      desc: "Detects wires, twigs, glass panels, and birds from all angles up to 45mph, recalculating vector paths in milliseconds.",
      icon: ShieldAlert,
      badge: "Zero Collision",
    },
    {
      title: "Live Edge Decisioning",
      desc: "If signal is lost completely, the drone continues executing its tracking mission or returns, completely self-sustained.",
      icon: Zap,
      badge: "Offline Safe",
    },
  ];

  return (
    <section
      id="ai-brain-section"
      className="relative w-full py-24 sm:py-32 bg-[#F5F5F7] border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            Cognitive Flight System
          </span>
          <h2 className="text-3xl sm:text-6xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            AERIX Quantum Core. <br />
            The AI Brain That Redefines Flight.
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg leading-relaxed max-w-3xl">
            Flight shouldn't require cognitive overload. Armed with custom deep learning silicon and robust edge computing, AERIX ONE translates complex environments into pure cinematic simplicity. It doesn't just pilot; it thinks.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {aiFeatures.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-500/30 hover:bg-white/80 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/50 flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                    <f.icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-full border border-blue-100/30">
                    {f.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                  {f.desc}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-gray-400 group-hover:text-black transition-colors">
                <span>SYSTEM PARAMETER ACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
