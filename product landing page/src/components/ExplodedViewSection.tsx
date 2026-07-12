import React, { useState, useEffect, useRef } from "react";
import DroneModel from "./DroneModel";
import { 
  Hammer, 
  Cpu, 
  Layers, 
  Disc3, 
  Settings, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  RefreshCw
} from "lucide-react";

// Import drone images for full-view representations on the card fronts
import aerixAirImg from "../assets/images/aerix_air_drone_1783680686857.jpg";
import aerixProImg from "../assets/images/aerix_pro_drone_1783680700215.jpg";
import aerixCinemaImg from "../assets/images/aerix_cinema_drone_1783680712483.jpg";
import aerixExplorerImg from "../assets/images/aerix_explorer_drone_1783680725793.jpg";
import aerixEnterpriseImg from "../assets/images/aerix_enterprise_drone_1783680736618.jpg";

const DRONE_DESIGNS = ["air", "pro", "cinema", "explorer", "enterprise"];

export default function ExplodedViewSection() {
  const [isExploded, setIsExploded] = useState(true);
  const [activePartId, setActivePartId] = useState<string>("lidar");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-cycle the exploded state to showcase both forms on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => {
            setIsExploded(true);
          }, 600);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const partDetails: Record<string, { 
    title: string; 
    subtitle: string; 
    spec: string; 
    details: string; 
    icon: any; 
    droneId: string; 
    droneLabel: string;
    hudCode: string;
  }> = {
    lidar: {
      title: "LiDAR Spatial Array",
      subtitle: "360° Real-time Point-Cloud Mapping",
      spec: "120m Range | 0.5cm Precision",
      details: "Emits 240,000 laser pulses per second to generate a continuous, sub-centimeter accurate point-cloud of the drone's environment. Enables complete safety in dense forests, urban canyons, or indoor spaces without GPS.",
      icon: Layers,
      droneId: "air",
      droneLabel: "AERIX ONE Air Edition",
      hudCode: "LDR_SPATIAL_A1",
    },
    canopy: {
      title: "Polycarbonate Aero-Shell",
      subtitle: "Impact-Resistant Micro-Canopy",
      spec: "IP67 Certified | Ultra-lite Composite",
      details: "Molded from lightweight crystalline polycarbonate, the canopy protects critical avionics from heavy rain, sand, and minor collisions, while offering zero electromagnetic interference with internal antenna arrays.",
      icon: Hammer,
      droneId: "pro",
      droneLabel: "AERIX ONE Pro Edition",
      hudCode: "CNP_AERO_COMP",
    },
    brain: {
      title: "AERIX Quantum Core AI",
      subtitle: "Cognitive Flight Processor",
      spec: "275 TOPS | 5G Network Ready",
      details: "The literal mastermind of the drone. Runs localized real-time neural networks for spatial navigation, dynamic object tracking, predictive wind correction, and automatic cinematographic path selection.",
      icon: Cpu,
      droneId: "cinema",
      droneLabel: "AERIX ONE Cinema Edition",
      hudCode: "QTM_CORE_V8.4",
    },
    gimbal: {
      title: "8K Pro-Res Cine Gimbal",
      subtitle: "3-Axis Active Stabilization",
      spec: "Dual 1\" CMOS | 4K/120fps & 8K/30fps",
      details: "Equipped with custom high-speed brushless gimbal motors counterbalancing wind-induced vibrations up to 45mph. Includes dual high-dynamic range lenses for extreme detail in both cinematic wide angles and lossless telephoto zooms.",
      icon: Disc3,
      droneId: "explorer",
      droneLabel: "AERIX ONE Explorer Edition",
      hudCode: "GMB_CINE_8K",
    },
    battery: {
      title: "Lithium-Graphene Cell",
      subtitle: "Super-Conducted Smart Battery",
      spec: "12000mAh | 55 Mins Flight Time",
      details: "Utilizes advanced graphene-enhanced anode chemistry for extremely high energy density and cooler operation under extreme loads. Built-in battery controller balances individual cells and tracks health metrics.",
      icon: Layers,
      droneId: "enterprise",
      droneLabel: "AERIX ONE Enterprise Edition",
      hudCode: "BAT_GRAPH_CELL",
    },
    motors: {
      title: "High-Torque Flux Motors",
      subtitle: "Brushless Hyper-Efficient Thruster",
      spec: "8400 RPM | Regenerative Braking",
      details: "Engineered with rare-earth magnets and precision-balanced multi-pole windings. Delivers instant thrust responses and utilizes regenerative braking to capture kinetic energy and feedback power into the battery core.",
      icon: Settings,
      droneId: "air",
      droneLabel: "AERIX ONE Air Edition",
      hudCode: "MTR_FLUX_PROP",
    }
  };

  const partKeys = Object.keys(partDetails);
  
  // State for card deck stack index
  const [stackIndex, setStackIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [isHoveringStack, setIsHoveringStack] = useState(false);
  const [isFlippedManual, setIsFlippedManual] = useState<string | null>(null);

  // Active drone is driven purely by the active card's metadata in real-time
  const activePartKey = partKeys[stackIndex];
  const activePart = partDetails[activePartKey] || partDetails["lidar"];
  const droneId = activePart.droneId;

  const getPartDroneImg = (id: string) => {
    switch (id) {
      case "air": return aerixAirImg;
      case "pro": return aerixProImg;
      case "cinema": return aerixCinemaImg;
      case "explorer": return aerixExplorerImg;
      case "enterprise": return aerixEnterpriseImg;
      default: return aerixAirImg;
    }
  };

  // Sync active part in main view with the top card of the stack
  useEffect(() => {
    const currentKey = partKeys[stackIndex];
    if (currentKey) {
      setActivePartId(currentKey);
    }
  }, [stackIndex]);

  // Synchronize top card stack index if activePartId is changed from outside (e.g. clicking on the model)
  useEffect(() => {
    if (activePartId) {
      const idx = partKeys.indexOf(activePartId);
      if (idx !== -1 && idx !== stackIndex) {
        setStackIndex(idx);
      }
    }
  }, [activePartId]);

  // Slowly cycle the card deck "one by one forward" if auto-cycling and not hovered
  useEffect(() => {
    if (!isAutoCycling || isHoveringStack) return;

    const interval = setInterval(() => {
      setStackIndex((prev) => (prev + 1) % partKeys.length);
      setIsFlippedManual(null); // Clear manual flips on cycle
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoCycling, isHoveringStack]);

  const handleNext = () => {
    setIsAutoCycling(false);
    setStackIndex((prev) => (prev + 1) % partKeys.length);
    setIsFlippedManual(null);
  };

  const handlePrev = () => {
    setIsAutoCycling(false);
    setStackIndex((prev) => (prev - 1 + partKeys.length) % partKeys.length);
    setIsFlippedManual(null);
  };

  const handleCardClick = (partKey: string) => {
    // Toggle manual flip state for the active card
    if (isFlippedManual === partKey) {
      setIsFlippedManual(null);
    } else {
      setIsFlippedManual(partKey);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="exploded-view-section"
      className="relative w-full min-h-screen py-24 bg-white flex flex-col items-center justify-center overflow-hidden border-b border-slate-100"
    >
      {/* 3D Flip Card CSS Utility Injector */}
      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Decorative Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            Precision Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            Engineered From the Inside Out
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Every millimeter of the <strong className="text-black font-semibold">AERIX ONE</strong> is structured for optimal aerodynamics, weight ratio, and modularity. Hover or tap the interactive cards below to flip them and inspect detailed part blueprints.
          </p>

          {/* Interactive Toggle Control */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-gray-100 border border-gray-200 mt-8 shadow-inner">
            <button
              onClick={() => setIsExploded(false)}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                !isExploded
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Assembled Flight Mode
            </button>
            <button
              onClick={() => setIsExploded(true)}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isExploded
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Exploded Architecture
            </button>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          {/* Left Panel: Stunning 3D Card Stack Box */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 h-full">
            <div className="flex flex-col items-center">
              
              {/* Stack Box Container */}
              <div 
                className="relative w-full max-w-[340px] h-[390px] md:h-[420px] perspective-1000 mb-6"
                onMouseEnter={() => setIsHoveringStack(true)}
                onMouseLeave={() => {
                  setIsHoveringStack(false);
                  setIsFlippedManual(null); // Return to front on mouse leave
                }}
              >
                {partKeys.map((key, index) => {
                  const part = partDetails[key];
                  const diff = (index - stackIndex + partKeys.length) % partKeys.length;
                  const isActive = diff === 0;
                  const isSecond = diff === 1;
                  const isThird = diff === 2;
                  const isFlipped = isActive && (isHoveringStack || isFlippedManual === key);

                  // Calculate the swiped-off card right before the active card in cycle
                  const isPrevious = index === (stackIndex - 1 + partKeys.length) % partKeys.length;

                  // Calculate 3D card layout placement variables for the Tinder-swipe "disappearing" loop
                  let translateStyle = "";
                  let opacity = 0;
                  let zIndex = 0;
                  let pointerEvents: "auto" | "none" = "none";

                  if (isActive) {
                    translateStyle = "translate3d(0, 0, 0) scale(1) rotateX(0deg) rotateZ(0deg)";
                    opacity = 1;
                    zIndex = 30;
                    pointerEvents = "auto";
                  } else if (isSecond) {
                    translateStyle = "translate3d(24px, 24px, -24px) scale(0.93) rotateX(-2deg) rotateZ(1deg)";
                    opacity = 0.85;
                    zIndex = 20;
                  } else if (isThird) {
                    translateStyle = "translate3d(48px, 48px, -48px) scale(0.86) rotateX(-4deg) rotateZ(2deg)";
                    opacity = 0.55;
                    zIndex = 10;
                  } else if (isPrevious) {
                    // Slides left off the stack and fades out cleanly ("slightly disappear one after another")
                    translateStyle = "translate3d(-135%, 40px, 0px) scale(0.9) rotateX(8deg) rotateZ(-12deg)";
                    opacity = 0;
                    zIndex = 40;
                  } else {
                    translateStyle = "translate3d(60px, 60px, -60px) scale(0.8) rotateX(-6deg)";
                    opacity = 0;
                    zIndex = 0;
                  }

                  const IconComponent = part.icon;

                  return (
                    <div
                      key={key}
                      onClick={() => isActive && handleCardClick(key)}
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: translateStyle,
                        opacity: opacity,
                        zIndex: zIndex,
                        pointerEvents: pointerEvents,
                      }}
                    >
                      {/* Flipping Inner Container */}
                      <div 
                        className={`w-full h-full preserve-3d transition-transform duration-700 cursor-pointer shadow-xl rounded-3xl border border-slate-200/80 ${
                          isFlipped ? "rotate-y-180" : ""
                        }`}
                      >
                        {/* ========================================================= */}
                        {/* CARD FRONT: FULL-VIEW GORGEOUS DRONE GRAPHIC               */}
                        {/* ========================================================= */}
                        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden bg-slate-950 flex flex-col justify-between p-6 border border-white/10 select-none">
                          {/* HUD Decor elements */}
                          <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 tracking-wider">
                            <span>{part.hudCode} // ACTIVE_STAGE</span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              ON BOARD SECURE
                            </span>
                          </div>

                          {/* Full bleed drone design image container */}
                          <div className="flex-1 w-full flex items-center justify-center py-4 relative group">
                            {/* Ambient backing glow matching the drone */}
                            <div className="absolute w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700" />
                            <img 
                              src={getPartDroneImg(part.droneId)}
                              alt={part.title}
                              className="w-[90%] h-[90%] object-contain select-none pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform scale-105 group-hover:scale-110 transition-transform duration-700 filter contrast-110 brightness-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info overlay bar on Front */}
                          <div className="flex flex-col border-t border-white/10 pt-4 mt-2">
                            <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-bold">
                              {part.droneLabel}
                            </span>
                            <div className="flex items-center justify-between mt-1">
                              <h3 className="text-base font-sans font-black text-white tracking-wide">
                                {part.title}
                              </h3>
                              <div className="p-1.5 bg-white/10 rounded-lg text-slate-300">
                                <IconComponent className="w-4 h-4 text-blue-400" />
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-slate-500">
                              <span>HOVER OR TAP TO FLIP</span>
                              <span>SPECS // 01</span>
                            </div>
                          </div>
                        </div>

                        {/* ========================================================= */}
                        {/* CARD BACK: TECHNICAL BLUEPRINT SPECIFICATIONS             */}
                        {/* ========================================================= */}
                        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden rotate-y-180 bg-slate-900 border border-blue-500/30 flex flex-col justify-between p-6 sm:p-8 select-none">
                          {/* Blueprint HUD grid back */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none rounded-3xl" />
                          
                          <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-md">
                                  <IconComponent className="w-5 h-5 text-blue-400 animate-pulse" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-mono text-slate-400 tracking-wider uppercase">
                                    {part.hudCode} // DIAGNOSTIC
                                  </h4>
                                  <h3 className="text-lg font-sans font-extrabold text-white">
                                    {part.title}
                                  </h3>
                                </div>
                              </div>

                              <div className="mb-4 inline-block px-3 py-1 bg-blue-950/40 text-blue-400 rounded-md font-mono text-[10px] font-bold border border-blue-500/20">
                                {part.spec}
                              </div>

                              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans mt-2">
                                {part.details}
                              </p>
                            </div>

                            <div className="border-t border-slate-800 pt-4 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                              <span>TAP TO RETURN</span>
                              <span className="text-blue-400">AERIX DIAGNOSTICS // COMP_OK</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stack Control Panel */}
              <div className="w-full max-w-[340px] bg-slate-950/95 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-xl relative z-40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsAutoCycling(!isAutoCycling)}
                      className={`p-1.5 rounded-lg transition-all border cursor-pointer ${
                        isAutoCycling
                          ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                          : "bg-slate-900 text-slate-400 border-transparent hover:text-white"
                      }`}
                      title={isAutoCycling ? "Pause Autoplay" : "Start Autoplay"}
                    >
                      {isAutoCycling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      {isAutoCycling ? "Auto-Cycling Active" : "Cycle Paused"}
                    </span>
                  </div>

                  {/* Micro Indicators / Pagination Dots */}
                  <div className="flex gap-1">
                    {partKeys.map((key, i) => (
                      <button
                        key={key}
                        onClick={() => {
                          setIsAutoCycling(false);
                          setStackIndex(i);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                          stackIndex === i
                            ? "bg-blue-500 w-3"
                            : "bg-slate-700 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Main Arrows for Forward Navigation */}
                <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> PREV PART
                  </button>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    0{stackIndex + 1} / 0{partKeys.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    NEXT PART <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Center Stage: The Interactive Drone Canvas (Upgraded to Dark Slate Tactical HUD Cage for Maximum Exploded View Visibility) */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-[480px] sm:h-[620px] flex items-center justify-center relative bg-slate-950 rounded-3xl border border-slate-800/80 overflow-hidden shadow-[inset_0_4px_30px_rgba(0,0,0,0.8)]">
            
            {/* Highly Visible Tech Grid Backing */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-75 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:15px_15px] opacity-15 pointer-events-none" />

            {/* Exploded HUD borders */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-400 select-none tracking-widest">
              DIAGNOSTIC CORE // SYSTEM_REV_4.12
            </div>
            <div className="absolute top-4 right-4 font-mono text-[9px] text-emerald-500 animate-pulse select-none flex items-center gap-1.5 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> FEED: ACTIVE
            </div>

            <DroneModel
              droneId={droneId}
              isExploded={isExploded}
              hovering={!isExploded}
              pitch={isExploded ? 25 : 5}
              yaw={isExploded ? -30 : 0}
              roll={0}
              scale={isExploded ? 0.95 : 1.15}
              activePartId={activePartId}
              onPartClick={(partId) => {
                setIsExploded(true);
                setActivePartId(partId);
              }}
            />

            {/* Active airframe slow auto-cycling selector */}
            <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 border border-slate-800/80 text-white px-4 py-3 rounded-2xl backdrop-blur-md z-30 shadow-2xl">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[8px] font-mono font-bold text-blue-400 uppercase tracking-wider">ACTIVE SPECIFICATION ARCHITECTURE</span>
                <span className="text-[11px] font-mono font-black text-white">
                  AERIX {droneId.toUpperCase()} // STATUS: DIAGNOSTIC_OK
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  { id: "air", label: "Air", targetIdx: 0 },
                  { id: "pro", label: "Pro", targetIdx: 1 },
                  { id: "cinema", label: "Cine", targetIdx: 2 },
                  { id: "explorer", label: "Explorer", targetIdx: 3 },
                  { id: "enterprise", label: "Enterprise", targetIdx: 4 },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setIsAutoCycling(false);
                      setStackIndex(d.targetIdx);
                      setIsFlippedManual(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      droneId === d.id
                        ? "bg-blue-600 text-white border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                        : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
