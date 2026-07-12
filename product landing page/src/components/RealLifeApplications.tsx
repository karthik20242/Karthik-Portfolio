import React, { useState } from "react";
import { Film, ShieldAlert, Leaf, Hammer, HeartPulse, ShieldCheck, HelpCircle } from "lucide-react";

interface AppScenario {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  icon: any;
  metric: string;
  metricLabel: string;
  telemetryText: string;
  imageUrl: string;
}

export default function RealLifeApplications() {
  const [activeId, setActiveId] = useState("cinema");

  const scenarios: AppScenario[] = [
    {
      id: "cinema",
      name: "Wedding & Film Production",
      tagline: "Dynamic Crane Simulations",
      desc: "Simulate Hollywood jibs, dollies, and complex multi-axis cablecam sweeps completely solo. AI directors lock onto subject glances to time sweeping cinematic frames perfectly.",
      icon: Film,
      metric: "8K 4:2:2",
      metricLabel: "MASTER ProRes FORMAT",
      telemetryText: "TRACK_TARGET_LOCK: ACTIVE // INERTIA: 0.12s",
      imageUrl: "https://images.unsplash.com/photo-1537944569735-52ac702c71ba?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "rescue",
      name: "Search & Rescue Ops",
      tagline: "Infrared Heat Signature Location",
      desc: "Deploy in critical storms or sub-zero environments. Thermal sensors bypass foliage or smoke, overlaying coordinates directly onto active responders' tablets.",
      icon: HeartPulse,
      metric: "0.1°C RES",
      metricLabel: "THERMAL SENSITIVITY",
      telemetryText: "SIG_HEAT_DETECTION: ON // RESCUE_GRID_SEC: C3",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "agriculture",
      name: "Precision Agriculture",
      tagline: "NDVI Foliage Nutrient Analysis",
      desc: "Autonomously survey hundreds of acres of crops daily. Advanced multispectral sensors map nitrogen levels, chlorophyll concentration, and moisture indices instantly.",
      icon: Leaf,
      metric: "98.7%",
      metricLabel: "SURVEY ACCURACY",
      telemetryText: "CROP_CHLOROPHYLL_SCAN: TRUE // IRRIGATION: OPTIMAL",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "inspection",
      name: "Infrastructure & Inspection",
      tagline: "Millimeter Defect Identification",
      desc: "Inspect wind turbine blades, bridges, and high-voltage transmission lines safely. Optical AI detects stress fractures, rust, or bolt wear with pinpoint accuracy.",
      icon: Hammer,
      metric: "0.5mm",
      metricLabel: "CRACK IDENTIFICATION",
      telemetryText: "STRUCTURAL_WEAR_INDEX: 0.02% // VOLTAGE_SAFE",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const activeScenario = scenarios.find((s) => s.id === activeId) || scenarios[0];

  return (
    <section
      id="applications-section"
      className="relative w-full py-24 sm:py-32 bg-white border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Application Selection Column */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
              Limitless Scenarios
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6 leading-tight">
              One Intelligent Airframe. <br />
              Infinite Workflows.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10">
              By separating the flight controller logic from workflow applications, AERIX ONE acts as a versatile robotic platform. Click each vertical tab to inspect real-world integration telemetry.
            </p>

            {/* Vertical list tabs */}
            <div className="flex flex-col gap-4">
              {scenarios.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={`text-left p-5 rounded-2xl border transition-all flex gap-4 items-center ${
                      isActive
                        ? "bg-blue-50/70 border-blue-200 shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-50/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold transition-colors ${isActive ? "text-blue-600" : "text-black"}`}>{s.name}</h4>
                      <p className="text-xs text-gray-400 font-mono tracking-tight mt-0.5">{s.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Immersive Telemetry Tablet View */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[600px] bg-zinc-950 border-4 border-zinc-900 rounded-[32px] p-4 shadow-[0_24px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden aspect-[4/3]">
              {/* Screen Header */}
              <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-800/40 text-[8px] font-mono text-zinc-500 z-10 select-none">
                <span>AERIX_FLIGHT_DECK_APP_V5.4</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> CONNECTED // 5G LATENCY: 2ms
                </span>
              </div>

              {/* Main Feed Viewport */}
              <div className="relative flex-1 mt-3 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-inner">
                <img
                  src={activeScenario.imageUrl}
                  alt={activeScenario.name}
                  className="w-full h-full object-cover opacity-60 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Grid HUD Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

                {/* Diagnostic Labels */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none text-white font-mono select-none">
                  {/* Top HUD Row */}
                  <div className="flex justify-between items-start text-[8px]">
                    <div className="bg-zinc-950/70 p-2 rounded-lg border border-zinc-800 backdrop-blur-md">
                      <div>CAMERA_FEED: STREAMING</div>
                      <div className="text-[7px] text-zinc-400 mt-0.5">8K PRORES @ 24.00 FPS</div>
                    </div>
                    <div className="bg-zinc-950/70 p-2 rounded-lg border border-zinc-800 backdrop-blur-md text-right">
                      <div>BATTERY_REMAINING: 88%</div>
                      <div className="text-[7px] text-emerald-400 mt-0.5">EST: 44 MINS LEFT</div>
                    </div>
                  </div>

                  {/* Middle Crosshair HUD */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    </div>
                    {/* Bounding bracket lines */}
                    <div className="absolute w-[240px] h-[160px] border border-blue-400/30 rounded-lg" />
                  </div>

                  {/* Bottom Telemetry HUD Row */}
                  <div className="flex justify-between items-end text-[8px] z-10">
                    <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800 backdrop-blur-md">
                      <div className="text-[7px] text-zinc-400 tracking-wider">ACTIVE SCENARIO</div>
                      <div className="text-xs font-bold text-blue-400 font-sans mt-0.5">{activeScenario.name}</div>
                      <div className="text-[7px] text-zinc-500 font-mono mt-1">{activeScenario.telemetryText}</div>
                    </div>

                    <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800 backdrop-blur-md text-right min-w-[100px]">
                      <div className="text-[7px] text-zinc-400 tracking-wider uppercase">{activeScenario.metricLabel}</div>
                      <div className="text-sm font-bold text-white font-sans mt-0.5">{activeScenario.metric}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
