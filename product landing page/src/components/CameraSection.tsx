import React, { useState } from "react";
import { Camera, Eye, Zap, Layers, Video, ShieldAlert, Sparkles } from "lucide-react";

export default function CameraSection() {
  const [activeMode, setActiveMode] = useState<"standard" | "thermal" | "ai">("standard");

  const cameraSpecs = [
    { title: "8K Recording", desc: "Shoot in ultra-sharp 8K ProRes at 30fps or 4K at 120fps with absolute precision.", icon: Video },
    { title: "Dual 1\" CMOS", desc: "Paired Wide-Angle and 3x Telephoto lenses resolve 48 megapixels of color depth.", icon: Layers },
    { title: "Extreme Low Light", desc: "State-of-the-art dual native ISO & night vision models reveal daylight details in dark.", icon: Eye },
    { title: "AI Auto Framing", desc: "Tracks human, animal, and vehicular subjects with adaptive digital focal zooming.", icon: Sparkles },
  ];

  // Simulated visual overlay based on the mode selected by the user
  const getSimulatedImage = () => {
    switch (activeMode) {
      case "thermal":
        return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80&sat=-100&contrast=150&hue=180"; // thermal-like look
      case "ai":
        return "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80"; // tracking/framing green overlay
      case "standard":
      default:
        return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"; // pristine aerial beach
    }
  };

  return (
    <section
      id="camera-section"
      className="relative w-full py-24 sm:py-32 bg-white border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Beautiful Lens Animation & Optical HUD */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* The Lens Container */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-[40px] bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-8 shadow-[0_24px_50px_rgba(0,0,0,0.2)] flex flex-col justify-between items-center overflow-hidden">
              {/* Dynamic HUD Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.85)_95%)] pointer-events-none" />
              <div className="absolute top-6 left-6 font-mono text-[8px] text-zinc-500 tracking-widest select-none">
                OPTICS STATE: READY // FOV 120°
              </div>
              <div className="absolute top-6 right-6 font-mono text-[8px] text-blue-500 tracking-widest select-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> 8K PRORES
              </div>

              {/* Optical Lens Core Ring with Multi-Reflections */}
              <div className="relative w-[240px] h-[240px] rounded-full bg-zinc-900 border-8 border-zinc-800 flex items-center justify-center shadow-inner overflow-hidden my-auto group">
                {/* Simulated Glass Reflection */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-blue-500/10 to-purple-500/15 opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-10 w-[140px] h-[30px] bg-gradient-to-b from-white/10 to-transparent skew-x-12 rounded-full rotate-45 blur-[1px]" />

                {/* Aperture blades */}
                <div className="absolute inset-4 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="absolute inset-8 rounded-full border border-zinc-700/50 [background:conic-gradient(from_45deg,_#111,_#222,_#111)]" />
                </div>

                {/* Primary Lens Core */}
                <div className="absolute w-[100px] h-[100px] rounded-full bg-black border-4 border-zinc-900 shadow-[0_0_35px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_center,_#2563eb_0%,_#09090b_85%)] opacity-80" />
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-zinc-800 shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-red-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                    </div>
                  </div>
                </div>

                {/* Rotating Speed Lines */}
                <div className="absolute inset-0 border border-dashed border-zinc-700/40 rounded-full animate-[spin_40s_linear_infinite]" />
              </div>

              {/* Lens Specs Bottom Labels */}
              <div className="w-full flex justify-between px-2 text-center text-zinc-500 font-mono text-[8px] z-10 select-none">
                <span>LENS A: 24MM f/1.8</span>
                <span>LENS B: 72MM f/2.4</span>
              </div>
            </div>

            {/* Simulated Live Feed Display below lens */}
            <div className="mt-8 w-full max-w-[440px] bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm relative">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  Live Camera Feed Emulator
                </span>
                <div className="flex gap-1">
                  {(["standard", "thermal", "ai"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setActiveMode(m)}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        activeMode === m
                          ? "bg-black text-white"
                          : "bg-gray-200/60 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Frame with overlays */}
              <div className="relative w-full h-[160px] rounded-xl overflow-hidden shadow-inner border border-gray-200 bg-slate-950">
                <img
                  src={getSimulatedImage()}
                  alt="Aerial Emulator Feed"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeMode === "thermal" ? "contrast-150 saturate-[2.0] brightness-90 filter hue-rotate-185" : ""
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* HUD Overlay Elements */}
                <div className="absolute inset-0 p-2.5 flex flex-col justify-between pointer-events-none select-none font-mono text-[8px] text-white/90">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/50 px-1 rounded-sm">ALT: 120m</span>
                    <span className="bg-black/50 px-1 rounded-sm text-red-400 animate-pulse">● REC 00:24</span>
                  </div>
                  {activeMode === "ai" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* AI Crosshairs and lock box */}
                      <div className="border border-emerald-400 w-16 h-16 rounded flex flex-col justify-between p-1 animate-pulse bg-emerald-500/10">
                        <span className="text-[6px] text-emerald-400 leading-none">TARGET LOCKED</span>
                        <span className="text-[6px] text-emerald-300 leading-none self-end">ID_OBJ_3321</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-end">
                    <span className="bg-black/50 px-1 rounded-sm">GIMBAL: ACTIVE</span>
                    <span className="bg-black/50 px-1 rounded-sm">GPS: 37.7749, -122.4194</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Specs and Descriptive copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-blue-600 uppercase">
              Optical System
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6 leading-tight">
              A Complete Cinema Studio. <br className="hidden sm:block" />
              Sized for the Sky.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10">
              Capturing stunning cinematic masterworks shouldn't mean hauling endless cases of tripods, lenses, and heavy cranes. The AERIX ONE features a state-of-the-art dual-lens 8K stabilization rig. Utilizing proprietary optical flow networks, it locks on subjects instantly, making cinema fluid and accessible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {cameraSpecs.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50/50 border border-blue-200/50 flex items-center justify-center text-blue-600 shrink-0">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black mb-1.5">{s.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
