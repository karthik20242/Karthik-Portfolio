import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import aerixAirImg from "../assets/images/aerix_air_drone_1783680686857.jpg";
import aerixProImg from "../assets/images/aerix_pro_drone_1783680700215.jpg";
import aerixCinemaImg from "../assets/images/aerix_cinema_drone_1783680712483.jpg";
import aerixExplorerImg from "../assets/images/aerix_explorer_drone_1783680725793.jpg";
import aerixEnterpriseImg from "../assets/images/aerix_enterprise_drone_1783680736618.jpg";
import { 
  Cpu, 
  Wind, 
  Compass, 
  Sliders, 
  Maximize2, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Battery, 
  Gauge, 
  Eye, 
  Signal, 
  Shield, 
  Video, 
  AlertCircle,
  TrendingUp,
  Volume2,
  Navigation
} from "lucide-react";

// Drone series specifications dataset
interface DroneSpec {
  weight: string;
  flightTime: string;
  maxSpeed: string;
  maxRange: string;
  aiPower: string;
  camera: string;
  windResistance: string;
  protectionRating: string;
}

interface DroneData {
  id: "air" | "pro" | "cinema" | "explorer" | "enterprise";
  name: string;
  tagline: string;
  desc: string;
  appearance: {
    colorTheme: string;
    bodyStyle: string;
    propColor: string;
    ledColor: string;
    cameraStyle: string;
    rotorCount: number;
    armStyle: string;
  };
  features: string[];
  specs: DroneSpec;
  scenery: {
    name: string;
    gradient: string;
    coordinates: string;
    hudText: string;
    altitude: string;
    pressure: string;
  };
  entryDir: { x: number; y: number; rotate: number };
  exitDir: { x: number; y: number; rotate: number };
}

const DRONES_DATA: DroneData[] = [
  {
    id: "air",
    name: "AERIX AIR",
    tagline: "Ultra Light. Incredibly Smart.",
    desc: "The lightest AI drone for everyday creators. Engineered under 249g to bypass regulatory permits while delivering flagship intelligent flight mechanics.",
    appearance: {
      colorTheme: "#f8fafc", // Matte ceramic white
      bodyStyle: "slim-aerodynamic",
      propColor: "#1e293b",
      ledColor: "#3b82f6", // Blue glow
      cameraStyle: "compact-ai",
      rotorCount: 4,
      armStyle: "foldable-slim",
    },
    features: [
      "Ultra-lightweight 249g chassis",
      "Matte white ceramic composite skin",
      "Foldable carbon fiber rotors",
      "Blue LED dynamic flight indicators"
    ],
    specs: {
      weight: "249 g",
      flightTime: "38 min",
      maxSpeed: "35 mph",
      maxRange: "10 km",
      aiPower: "45 TOPS",
      camera: "4K ProRes HDR // 1/1.3\" CMOS",
      windResistance: "Level 5 (24 mph)",
      protectionRating: "IP43 Weatherproof"
    },
    scenery: {
      name: "Metropolis Grid // Tokyo",
      gradient: "from-[#0f172a] via-[#1e1b4b] to-[#0f172a]",
      coordinates: "35.6762° N, 139.6503° E",
      hudText: "URBAN METRO NAVIGATION // AUTO-ROUTING ACTIVE",
      altitude: "120m AGL",
      pressure: "1013.2 hPa"
    },
    entryDir: { x: -600, y: -200, rotate: -45 },
    exitDir: { x: 600, y: 200, rotate: 15 }
  },
  {
    id: "pro",
    name: "AERIX PRO",
    tagline: "Every Frame. Perfect.",
    desc: "Professional AI drone for cinematic photographers and commercial filmmakers. Integrates a custom 3-axis stabilized Hasselblad dual optical core.",
    appearance: {
      colorTheme: "#cbd5e1", // Silver aluminum
      bodyStyle: "premium-sculpted",
      propColor: "#0f172a",
      ledColor: "#22c55e", // Green blinkers
      cameraStyle: "stabilized-3axis",
      rotorCount: 4,
      armStyle: "solid-carbon",
    },
    features: [
      "Hasselblad dual optical module",
      "3-axis active stabilization",
      "Premium aluminum anodized finish",
      "Multi-directional LiDAR matrix"
    ],
    specs: {
      weight: "890 g",
      flightTime: "46 min",
      maxSpeed: "50 mph",
      maxRange: "15 km",
      aiPower: "150 TOPS",
      camera: "6K Pro-Res Cine // 1-inch CMOS",
      windResistance: "Level 7 (36 mph)",
      protectionRating: "IP54 Dust & Water"
    },
    scenery: {
      name: "Alpine Peak // Swiss Alps",
      gradient: "from-[#0a0f1d] via-[#0f243a] to-[#0d1424]",
      coordinates: "46.0207° N, 7.7491° E",
      hudText: "MOUNTAIN VECTOR TELEMETRY // ALTITUDE KEEP ENFORCED",
      altitude: "3,150m MSL",
      pressure: "690.4 hPa"
    },
    entryDir: { x: 0, y: -600, rotate: 0 },
    exitDir: { x: -600, y: 300, rotate: -30 }
  },
  {
    id: "cinema",
    name: "AERIX CINEMA",
    tagline: "Hollywood in the Sky.",
    desc: "Flagship cinema drone for high-end professional productions. Equipped with an oversized modular triple-camera gimbal, active focus radar, and dual raw transmission feeds.",
    appearance: {
      colorTheme: "#1e293b", // Stealth charcoal
      bodyStyle: "oversized-cinema",
      propColor: "#020617",
      ledColor: "#ef4444", // Red threat lamps
      cameraStyle: "massive-triple-lens",
      rotorCount: 4,
      armStyle: "reinforced-truss",
    },
    features: [
      "Modular 8K RED-compatible gimbal",
      "Active high-frequency focus radar",
      "Stealth structural anti-reflective finish",
      "Triple-redundant emergency battery cells"
    ],
    specs: {
      weight: "1.85 kg",
      flightTime: "40 min",
      maxSpeed: "55 mph",
      maxRange: "12 km",
      aiPower: "275 TOPS",
      camera: "8K Cinema-Grade Dual Raw // Full Frame",
      windResistance: "Level 8 (42 mph)",
      protectionRating: "IP55 Professional Shield"
    },
    scenery: {
      name: "Golden Coastline // Greek Islands",
      gradient: "from-[#111827] via-[#0b2545] to-[#041122]",
      coordinates: "37.4467° N, 25.3289° E",
      hudText: "CINEMATIC CURVE TRACKING // WATER RETRIEVAL ON",
      altitude: "45m AGL",
      pressure: "1011.8 hPa"
    },
    entryDir: { x: 600, y: -100, rotate: 30 },
    exitDir: { x: 0, y: 600, rotate: -15 }
  },
  {
    id: "explorer",
    name: "AERIX EXPLORER",
    tagline: "Go Beyond Every Horizon.",
    desc: "Engineered for back-country exploration and extreme travel. Feature-packed with dual stereo antennas, reinforced travel-folding arms, and bright adventure safety accents.",
    appearance: {
      colorTheme: "#f97316", // Adventure Orange
      bodyStyle: "rugged-adventure",
      propColor: "#1e293b",
      ledColor: "#f59e0b", // Orange warning glow
      cameraStyle: "waterproof-dual",
      rotorCount: 4,
      armStyle: "impact-reinforced-foldable",
    },
    features: [
      "Heavy-duty impact armor bumpers",
      "Dual long-range helical antennas",
      "High-contrast adventure orange design",
      "Full waterproof submersible finish"
    ],
    specs: {
      weight: "680 g",
      flightTime: "42 min",
      maxSpeed: "42 mph",
      maxRange: "20 km",
      aiPower: "110 TOPS",
      camera: "4K HDR Adventure Lens // 1/1.7\" CMOS",
      windResistance: "Level 6 (31 mph)",
      protectionRating: "IP67 Submersible Waterproof"
    },
    scenery: {
      name: "Deep Wilderness // Rocky Mountains",
      gradient: "from-[#0f172a] via-[#14532d] to-[#022c22]",
      coordinates: "43.7904° N, 110.6818° W",
      hudText: "DENSE FOREST PENETRATION // HELICAL SIGNAL REBOUND",
      altitude: "2,200m MSL",
      pressure: "780.5 hPa"
    },
    entryDir: { x: -600, y: 400, rotate: -60 },
    exitDir: { x: 600, y: -400, rotate: 45 }
  },
  {
    id: "enterprise",
    name: "AERIX ENTERPRISE",
    tagline: "Built for Critical Missions.",
    desc: "Industrial inspection and public safety workhorse. Boasts a six-arm heavy payload hexacopter structure, integrated radiometric thermal scanner, and 3D LiDAR mapper.",
    appearance: {
      colorTheme: "#0f172a", // Industrial matte titanium
      bodyStyle: "hexacopter-heavy",
      propColor: "#020617",
      ledColor: "#a855f7", // Purple UV indicators
      cameraStyle: "radiometric-dual-sensor",
      rotorCount: 6,
      armStyle: "six-arm-hex-array",
    },
    features: [
      "Radiometric FLIR Thermal Scanner",
      "Six-arm dual-prop thrust redundancy",
      "Integrated searchlight / megaphone unit",
      "Real-time RTK sub-centimeter mapping"
    ],
    specs: {
      weight: "3.25 kg",
      flightTime: "52 min",
      maxSpeed: "40 mph",
      maxRange: "15 km",
      aiPower: "220 TOPS",
      camera: "FLIR Radiometric thermal + 4K Zoom Dual Sensor",
      windResistance: "Level 8+ (46 mph)",
      protectionRating: "IP66 Heavy Industrial Dust & Water"
    },
    scenery: {
      name: "Smart Factory Array // Industrial Complex",
      gradient: "from-[#020617] via-[#311042] to-[#0f0417]",
      coordinates: "41.8781° N, 87.6298° W",
      hudText: "RADIOMETRIC THERMAL SCANS // SUB-ZERO CELL ALERT",
      altitude: "85m AGL",
      pressure: "1009.5 hPa"
    },
    entryDir: { x: 0, y: 600, rotate: 15 },
    exitDir: { x: -600, y: -200, rotate: -45 }
  }
];

export default function DroneSeriesLineup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoSpin, setAutoSpin] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Custom rotation stage interaction state (drag-to-rotate)
  const [pitch, setPitch] = useState(10);
  const [yaw, setYaw] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const autoSpinRef = useRef<number | null>(null);

  const activeDrone = DRONES_DATA[activeIndex];

  // Rotate drone automatically when not dragging and autoSpin is true
  useEffect(() => {
    if (autoSpin && !isDragging) {
      let lastTime = performance.now();
      const tick = (time: number) => {
        const delta = time - lastTime;
        lastTime = time;
        setYaw((prev) => (prev + delta * 0.025) % 360);
        autoSpinRef.current = requestAnimationFrame(tick);
      };
      autoSpinRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (autoSpinRef.current) cancelAnimationFrame(autoSpinRef.current);
    };
  }, [autoSpin, isDragging]);

  // Autoplay cycle logic for changing active drone models
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setPitch(10); // Reset pitch back to aesthetic neutral on transition
      setActiveIndex((prev) => (prev + 1) % DRONES_DATA.length);
    }, 8500); // Drone showcase displays for 8.5 seconds before next flies in

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Mouse drag handlers to orbit the active drone model
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoSpin(false);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };

    setYaw((prev) => (prev + deltaX * 0.6) % 360);
    setPitch((prev) => Math.max(-30, Math.min(45, prev - deltaY * 0.6)));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile swipe and orbit
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setAutoSpin(false);
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setYaw((prev) => (prev + deltaX * 0.8) % 360);
    setPitch((prev) => Math.max(-30, Math.min(45, prev - deltaY * 0.8)));
  };

  // Manual model selection
  const handleSelectModel = (index: number) => {
    setIsPlaying(false); // Pause autoplay when user explicitly selects a drone
    setPitch(10); // Reset pitch
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setPitch(10);
    setActiveIndex((prev) => (prev - 1 + DRONES_DATA.length) % DRONES_DATA.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setPitch(10);
    setActiveIndex((prev) => (prev + 1) % DRONES_DATA.length);
  };

  // Render the real drone image inside a highly interactive, 3D tilted HUD card
  const renderDroneImage = useMemo(() => {
    const getDroneImg = () => {
      switch (activeDrone.id) {
        case "air": return aerixAirImg;
        case "pro": return aerixProImg;
        case "cinema": return aerixCinemaImg;
        case "explorer": return aerixExplorerImg;
        case "enterprise": return aerixEnterpriseImg;
        default: return aerixAirImg;
      }
    };

    return (
      <div 
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${pitch * 0.4}deg) rotateY(${yaw * 0.4}deg) scale(1.05)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)",
        }}
      >
        {/* Dynamic Shadow underneath the holographic pod */}
        <div 
          className="absolute bottom-[-15px] w-[260px] h-[32px] bg-black/45 blur-xl rounded-full opacity-80"
          style={{
            transform: "rotateX(90deg) translateZ(-100px)",
          }}
        />

        {/* Matte metallic housing for the drone projection */}
        <div 
          className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md"
          style={{
            transform: "translateZ(15px)",
          }}
        >
          {/* Neon corner bracket designs for military specs scan vibe */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 opacity-55 border-white" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 opacity-55 border-white" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 opacity-55 border-white" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 opacity-55 border-white" />

          {/* Glowing accent border */}
          <div className={`absolute inset-0 border rounded-[32px] pointer-events-none opacity-40 ${
            activeDrone.id === "air" ? "border-blue-500 shadow-[inset_0_0_25px_rgba(59,130,246,0.25)]" :
            activeDrone.id === "pro" ? "border-emerald-500 shadow-[inset_0_0_25px_rgba(34,197,94,0.25)]" :
            activeDrone.id === "cinema" ? "border-red-500 shadow-[inset_0_0_25px_rgba(239,68,68,0.25)]" :
            activeDrone.id === "explorer" ? "border-orange-500 shadow-[inset_0_0_25px_rgba(249,115,22,0.25)]" :
            "border-purple-500 shadow-[inset_0_0_25px_rgba(168,85,247,0.25)]"
          }`} />

          {/* Real Photo with high rendering quality */}
          <img 
            src={getDroneImg()}
            alt={activeDrone.name}
            className="w-full h-full object-cover select-none pointer-events-none transform scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Dark telemetry atmospheric vignetting */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Futuristic laser scope scanning overlay */}
          <div className={`absolute left-0 w-full h-[2px] pointer-events-none animate-scan opacity-60 ${
            activeDrone.id === "air" ? "bg-blue-400 shadow-[0_0_12px_#3b82f6]" :
            activeDrone.id === "pro" ? "bg-emerald-400 shadow-[0_0_12px_#10b981]" :
            activeDrone.id === "cinema" ? "bg-red-400 shadow-[0_0_12px_#ef4444]" :
            activeDrone.id === "explorer" ? "bg-orange-400 shadow-[0_0_12px_#f97316]" :
            "bg-purple-400 shadow-[0_0_12px_#a855f7]"
          }`} />
        </div>
      </div>
    );
  }, [activeDrone, pitch, yaw, isDragging]);

  // Legacy SVG parts (kept for reference, not rendered)
  const renderDroneSVG = null;

  const renderLegacySVGUnused = () => {
    const isEnterprise = activeDrone.id === "enterprise";
    const isExplorer = activeDrone.id === "explorer";
    const isCinema = activeDrone.id === "cinema";
    const isPro = activeDrone.id === "pro";
    const isAir = activeDrone.id === "air";

    const blinkStyle = "animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)]";

    return (
      <div 
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${pitch}deg) rotateY(${yaw}deg) scale(1.1)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)",
        }}
      >
        {/* Shadow Overlay */}
        <div 
          className="absolute bottom-[-10px] w-[240px] h-[30px] bg-black/25 blur-xl rounded-full opacity-60"
          style={{
            transform: "rotateX(90deg) translateZ(-160px)",
          }}
        />

        {/* 1. Quadcopter / Hexacopter Structural Arms */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(-20px)" }}>
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" className="drop-shadow-lg">
            {isEnterprise ? (
              // Six Arms for Hexacopter
              <>
                <path d="M170 170 L70 110" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
                <path d="M170 170 L70 110" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                <path d="M170 170 L270 110" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
                <path d="M170 170 L270 110" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                
                <path d="M170 170 L60 170" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
                <path d="M170 170 L60 170" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                <path d="M170 170 L280 170" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
                <path d="M170 170 L280 170" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />

                <path d="M170 170 L70 230" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
                <path d="M170 170 L70 230" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                <path d="M170 170 L270 230" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
                <path d="M170 170 L270 230" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />

                {/* Heavy motor mounts */}
                <circle cx="70" cy="110" r="16" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <circle cx="270" cy="110" r="16" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <circle cx="60" cy="170" r="16" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <circle cx="280" cy="170" r="16" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <circle cx="70" cy="230" r="16" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <circle cx="270" cy="230" r="16" fill="#0f172a" stroke="#475569" strokeWidth="2" />

                {/* LED Nodes */}
                <circle cx="70" cy="110" r="4" fill="#a855f7" className={blinkStyle} />
                <circle cx="270" cy="110" r="4" fill="#a855f7" className={blinkStyle} />
                <circle cx="70" cy="230" r="4" fill="#a855f7" className={blinkStyle} />
                <circle cx="270" cy="230" r="4" fill="#a855f7" className={blinkStyle} />
              </>
            ) : (
              // Four standard quadcopter arms
              <>
                {/* Rear Arms */}
                <path d="M170 170 L60 260" stroke={isExplorer ? "#f97316" : isCinema ? "#334155" : "#94a3b8"} strokeWidth={isCinema ? "16" : "12"} strokeLinecap="round" />
                <path d="M170 170 L60 260" stroke="#0f172a" strokeWidth={isCinema ? "10" : "7"} strokeLinecap="round" />
                
                <path d="M170 170 L280 260" stroke={isExplorer ? "#f97316" : isCinema ? "#334155" : "#94a3b8"} strokeWidth={isCinema ? "16" : "12"} strokeLinecap="round" />
                <path d="M170 170 L280 260" stroke="#0f172a" strokeWidth={isCinema ? "10" : "7"} strokeLinecap="round" />

                {/* Front Arms */}
                <path d="M170 170 L50 80" stroke={isExplorer ? "#f97316" : isCinema ? "#334155" : "#e2e8f0"} strokeWidth={isCinema ? "18" : "14"} strokeLinecap="round" />
                <path d="M170 170 L50 80" stroke={isExplorer ? "#1e293b" : "#475569"} strokeWidth={isCinema ? "11" : "8"} strokeLinecap="round" />
                
                <path d="M170 170 L290 80" stroke={isExplorer ? "#f97316" : isCinema ? "#334155" : "#e2e8f0"} strokeWidth={isCinema ? "18" : "14"} strokeLinecap="round" />
                <path d="M170 170 L290 80" stroke={isExplorer ? "#1e293b" : "#475569"} strokeWidth={isCinema ? "11" : "8"} strokeLinecap="round" />

                {/* Motor Mount Rings */}
                <circle cx="50" cy="80" r={isCinema ? "20" : "15"} fill="#020617" stroke="#64748b" strokeWidth="2" />
                <circle cx="290" cy="80" r={isCinema ? "20" : "15"} fill="#020617" stroke="#64748b" strokeWidth="2" />
                <circle cx="60" cy="260" r={isCinema ? "20" : "15"} fill="#020617" stroke="#64748b" strokeWidth="2" />
                <circle cx="280" cy="260" r={isCinema ? "20" : "15"} fill="#020617" stroke="#64748b" strokeWidth="2" />

                {/* Dynamic customized LEDs depending on active drone model */}
                <circle cx="50" cy="80" r="4" fill={activeDrone.appearance.ledColor} className="animate-ping" />
                <circle cx="290" cy="80" r="4" fill={activeDrone.appearance.ledColor} className="animate-ping" />
                <circle cx="60" cy="260" r="4.5" fill={isAir ? "#3b82f6" : isPro ? "#22c55e" : isCinema ? "#ef4444" : "#f59e0b"} className={blinkStyle} />
                <circle cx="280" cy="260" r="4.5" fill={isAir ? "#3b82f6" : isPro ? "#22c55e" : isCinema ? "#ef4444" : "#f59e0b"} className={blinkStyle} />
              </>
            )}
          </svg>
        </div>

        {/* 2. Propellers spinning on top of the arms */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(10px)" }}>
          {isEnterprise ? (
            // Six Propellers Spinning
            <>
              {[
                { x: 70, y: 110 },
                { x: 270, y: 110 },
                { x: 60, y: 170 },
                { x: 280, y: 170 },
                { x: 70, y: 230 },
                { x: 270, y: 230 }
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${pos.x - 40}px`,
                    top: `${pos.y - 5}px`,
                  }}
                >
                  <div className="animate-[spin_0.25s_linear_infinite] origin-center w-[80px] h-[10px] flex items-center justify-between">
                    <div className="w-[36px] h-[4px] bg-zinc-900/35 rounded-full blur-[0.5px]" />
                    <div className="w-[8px] h-[8px] bg-slate-800 border border-purple-400 rounded-full z-10" />
                    <div className="w-[36px] h-[4px] bg-zinc-900/35 rounded-full blur-[0.5px]" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Four Propellers Spinning
            <>
              {/* LF */}
              <div className="absolute" style={{ left: "10px", top: "75px" }}>
                <div className="animate-[spin_0.2s_linear_infinite] origin-center w-[80px] h-[10px] flex items-center justify-between">
                  <div className="w-[35px] h-[5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                  <div className="w-[10px] h-[10px] bg-zinc-900 border border-white/50 rounded-full z-10" />
                  <div className="w-[35px] h-[5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                </div>
              </div>
              {/* RF */}
              <div className="absolute" style={{ left: "250px", top: "75px" }}>
                <div className="animate-[spin_0.2s_linear_infinite] origin-center w-[80px] h-[10px] flex items-center justify-between">
                  <div className="w-[35px] h-[5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                  <div className="w-[10px] h-[10px] bg-zinc-900 border border-white/50 rounded-full z-10" />
                  <div className="w-[35px] h-[5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                </div>
              </div>
              {/* LR */}
              <div className="absolute" style={{ left: "20px", top: "255px" }}>
                <div className="animate-[spin_0.22s_linear_infinite] origin-center w-[80px] h-[10px] flex items-center justify-between">
                  <div className="w-[35px] h-[4.5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                  <div className="w-[10px] h-[10px] bg-zinc-900 border border-white/50 rounded-full z-10" />
                  <div className="w-[35px] h-[4.5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                </div>
              </div>
              {/* RR */}
              <div className="absolute" style={{ left: "240px", top: "255px" }}>
                <div className="animate-[spin_0.22s_linear_infinite] origin-center w-[80px] h-[10px] flex items-center justify-between">
                  <div className="w-[35px] h-[4.5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                  <div className="w-[10px] h-[10px] bg-zinc-900 border border-white/50 rounded-full z-10" />
                  <div className="w-[35px] h-[4.5px] bg-slate-900/40 rounded-full blur-[0.5px]" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* 3. Central Cockpit Fuselage Body */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(25px)" }}>
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-2xl">
            {/* Core chassis gradient and shadows */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isAir ? "#ffffff" : isPro ? "#cbd5e1" : isCinema ? "#1e293b" : isExplorer ? "#f97316" : "#334155"} />
                <stop offset="60%" stopColor={isAir ? "#f1f5f9" : isPro ? "#94a3b8" : isCinema ? "#0f172a" : isExplorer ? "#ea580c" : "#0f172a"} />
                <stop offset="100%" stopColor={isAir ? "#cbd5e1" : isPro ? "#64748b" : isCinema ? "#020617" : isExplorer ? "#9a3412" : "#020617"} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {isEnterprise ? (
              // Six-arm hexacopter industrial chassis
              <path
                d="M100 45 L145 65 L155 110 L145 155 L100 175 L55 155 L45 110 L55 65 Z"
                fill="url(#bodyGradient)"
                stroke="#475569"
                strokeWidth="2.5"
              />
            ) : isExplorer ? (
              // Rugged rectangular adventure chassis with guards
              <>
                <rect x="65" y="55" width="70" height="95" rx="16" fill="url(#bodyGradient)" stroke="#1e293b" strokeWidth="2.5" />
                {/* Rollbars */}
                <path d="M55 50 L145 50 M55 150 L145 150" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="50" r="6" fill="#1e293b" />
              </>
            ) : isCinema ? (
              // Aggressive bulkier diamond layout
              <path
                d="M100 35 C115 35, 145 65, 145 110 C145 155, 115 175, 100 175 C85 175, 55 155, 55 110 C55 65, 85 35, 100 35 Z"
                fill="url(#bodyGradient)"
                stroke="#475569"
                strokeWidth="3"
              />
            ) : (
              // Aerodynamic standard cockpit
              <path
                d="M75 60 C75 60, 100 40, 125 60 C140 70, 140 130, 125 140 C100 155, 75 155, 75 140 C60 130, 60 70, 75 60 Z"
                fill="url(#bodyGradient)"
                stroke={isAir ? "#e2e8f0" : "#94a3b8"}
                strokeWidth="2"
              />
            )}

            {/* Ventilation vents & details */}
            <path d="M85 80 L115 80 M85 90 L115 90" stroke={isCinema ? "#475569" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />

            {/* Glowing branding line or display screen on nose */}
            {isAir && (
              <path d="M90 55 L110 55" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" className="animate-pulse" filter="url(#glow)" />
            )}
            {isPro && (
              <path d="M85 52 L115 52" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" className="animate-pulse" filter="url(#glow)" />
            )}
            {isCinema && (
              <circle cx="100" cy="55" r="7" fill="#dc2626" className="animate-ping" />
            )}
            {isExplorer && (
              <rect x="80" y="65" width="40" height="20" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
            )}
            {isEnterprise && (
              <circle cx="100" cy="110" r="14" fill="#120224" stroke="#a855f7" strokeWidth="2" className="animate-pulse" />
            )}
          </svg>
        </div>

        {/* 4. Front Facing Cameras and Active Gimbal Sensors */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(50px)" }}>
          {isAir && (
            // Small sleek lens under nose
            <div className="w-10 h-10 bg-zinc-900 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)] translate-y-[-40px]">
              <div className="w-4 h-4 rounded-full bg-blue-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              </div>
            </div>
          )}

          {isPro && (
            // Professional 3-axis silver gimbal
            <div className="w-16 h-16 bg-zinc-950 border-2 border-emerald-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] translate-y-[-10px] translate-x-[15px]">
              <div className="text-[5px] text-emerald-400 font-mono tracking-tighter">HASSELBLAD</div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mt-1">
                <div className="w-4 h-4 rounded-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/30 rounded-full" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-800" />
                </div>
              </div>
            </div>
          )}

          {isCinema && (
            // Giant cinematic triple lens gimbal pod
            <div className="w-24 h-24 bg-zinc-950 border-2 border-red-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.6)] translate-y-[35px]">
              <div className="text-[6px] text-red-500 font-mono font-bold tracking-widest mb-1">8K TRIPLE-GIMBAL</div>
              <div className="flex gap-1">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                </div>
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white/40 rounded-full" />
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-800" />
                </div>
                <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                </div>
              </div>
            </div>
          )}

          {isExplorer && (
            // Adventure dual stereo waterproof optics + Orange protective bars
            <div className="w-16 h-12 bg-zinc-900 border-2 border-orange-500 rounded-xl flex items-center justify-around px-2 shadow-[0_0_15px_rgba(249,115,22,0.5)] translate-y-[-50px]">
              <div className="w-5 h-5 rounded-full bg-zinc-950 border border-orange-600/50 flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-cyan-700" />
              </div>
              <div className="w-5 h-5 rounded-full bg-zinc-950 border border-orange-600/50 flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-cyan-700" />
              </div>
            </div>
          )}

          {isEnterprise && (
            // Radiometric FLIR Thermal dual pod + carbon landing gear bars
            <div className="w-22 h-16 bg-zinc-950 border-2 border-purple-500 rounded-lg flex flex-col justify-center items-center shadow-[0_0_25px_rgba(168,85,247,0.5)] translate-y-[45px]">
              <span className="text-[6px] text-purple-400 font-mono font-bold tracking-widest">FLIR RADIOMETRIC</span>
              <div className="flex gap-2 mt-1">
                {/* Thermal payload */}
                <div className="w-6 h-6 bg-purple-900/60 rounded border border-purple-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                </div>
                {/* Optical payload */}
                <div className="w-6 h-6 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-800" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Extra accessories (such as long range dual antennas for Explorer, heavy gear for Enterprise) */}
        {isExplorer && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(-40px)" }}>
            {/* Extended Antennas pointing backward */}
            <svg width="340" height="340" viewBox="0 0 340 340" className="opacity-80">
              <path d="M140 220 L110 310" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
              <path d="M200 220 L230 310" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
              <circle cx="110" cy="310" r="4" fill="#1e293b" />
              <circle cx="230" cy="310" r="4" fill="#1e293b" />
            </svg>
          </div>
        )}

        {isEnterprise && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
            {/* Landing Gears */}
            <svg width="340" height="340" viewBox="0 0 340 340" className="opacity-95">
              {/* Left and Right carbon landing struts */}
              <path d="M130 180 L130 250 L80 250" stroke="#475569" strokeWidth="5" strokeLinecap="round" strokeJoin="round" />
              <path d="M210 180 L210 250 L260 250" stroke="#475569" strokeWidth="5" strokeLinecap="round" strokeJoin="round" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      id="aerix-series" 
      className="relative w-full py-24 md:py-32 bg-slate-950 text-white overflow-hidden border-b border-white/5"
    >
      {/* Dynamic Animated Environment Overlay Backdrop */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {/* Dynamic environmental gradient backing */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeDrone.scenery.gradient} opacity-90 transition-all duration-1000`} />
        
        {/* Grid lines and telemetry elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay" />
        
        {/* Environment-specific atmospheric particles / noise overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent opacity-70 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* Section Headline (Keynote style) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.3em] text-blue-500">
            AERIX Series Fleet
          </span>
          <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight mt-3 mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            AERIX Drone Collection.
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Five highly specialized autonomous airframes crafted for distinct operations. Discover the perfect fusion of custom aerospace engineering and on-edge deep neural processors.
          </p>
        </div>

        {/* ----------------- CORE SHOWCASE LAYOUT ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[620px]">
          
          {/* LEFT COLUMN: SPECIFICATIONS PANEL & DETAILS (transitions on activeDrone) */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrone.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Active Drone Name & Tagline */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase rounded tracking-wider ${
                    activeDrone.id === "air" ? "bg-blue-900/40 text-blue-300 border border-blue-500/20" :
                    activeDrone.id === "pro" ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/20" :
                    activeDrone.id === "cinema" ? "bg-red-900/40 text-red-300 border border-red-500/20" :
                    activeDrone.id === "explorer" ? "bg-orange-900/40 text-orange-300 border border-orange-500/20" :
                    "bg-purple-900/40 text-purple-300 border border-purple-500/20"
                  }`}>
                    MODEL 0{DRONES_DATA.findIndex(d => d.id === activeDrone.id) + 1}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">CLASS // AUTONOMOUS_AI</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mb-2">
                  {activeDrone.name}
                </h3>
                
                <p className="text-md font-mono font-bold text-blue-400 uppercase tracking-wider mb-5">
                  {activeDrone.tagline}
                </p>
                
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8">
                  {activeDrone.desc}
                </p>

                {/* Bullet Points Highlights */}
                <div className="flex flex-col gap-3.5 mb-10">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Key Configurations</h4>
                  {activeDrone.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        activeDrone.id === "air" ? "bg-blue-400" :
                        activeDrone.id === "pro" ? "bg-emerald-400" :
                        activeDrone.id === "cinema" ? "bg-red-400" :
                        activeDrone.id === "explorer" ? "bg-orange-400" :
                        "bg-purple-400"
                      }`} />
                      <span className="text-xs text-zinc-300 font-sans font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Primary Button */}
                <div className="flex gap-4">
                  <button className="flex-1 py-3.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wider transition-all shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:scale-105 hover:shadow-[0_4px_30px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer">
                    Configure This Airframe
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER COLUMN: THE MAIN INTERACTIVE 3D FLY-IN FLY-AWAY STAGE */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center h-[380px] md:h-[480px] order-1 lg:order-2 relative">
            
            {/* Dynamic Scenery HUD Card HUD Backdrop (representing mountain peaks, modern city, night factory...) */}
            <div className="absolute inset-0 bg-slate-900/10 rounded-[32px] border border-white/5 shadow-inner overflow-hidden pointer-events-none select-none">
              {/* Radar sweep lines simulating autonomous locking */}
              <div className="absolute top-4 left-4 flex flex-col font-mono text-[9px] text-slate-500/80 gap-1">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  GPS LOCK: SECURE
                </span>
                <span>HUD COORDINATES: {activeDrone.scenery.coordinates}</span>
                <span>ENVIRONMENT: {activeDrone.scenery.name}</span>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col text-right font-mono text-[9px] text-slate-500/80 gap-1">
                <span>ALTITUDE: {activeDrone.scenery.altitude}</span>
                <span>ATMOSPHERE: {activeDrone.scenery.pressure}</span>
              </div>

              {/* Scope overlays */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/10" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-white/10" />
            </div>

            {/* Cinematic Drone Stage with drag interaction */}
            <div 
              id="drone-stage-container"
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing group overflow-visible"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUpOrLeave}
            >
              {/* Animated Floating, rotating and Swooping Drone Wrapper */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDrone.id}
                  initial={{ 
                    x: activeDrone.entryDir.x, 
                    y: activeDrone.entryDir.y, 
                    scale: 0.4, 
                    opacity: 0,
                    rotateZ: activeDrone.entryDir.rotate
                  }}
                  animate={{ 
                    x: 0, 
                    y: 0, 
                    scale: 1, 
                    opacity: 1,
                    rotateZ: 0
                  }}
                  exit={{ 
                    x: activeDrone.exitDir.x, 
                    y: activeDrone.exitDir.y, 
                    scale: 0.3, 
                    opacity: 0,
                    rotateZ: activeDrone.exitDir.rotate
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 18, 
                    mass: 1.1 
                  }}
                  className="w-full h-full flex items-center justify-center relative overflow-visible"
                >
                  {/* Natural hover floating bounce applied on top of rotation transforms */}
                  <div className="w-full h-full flex items-center justify-center animate-[bounce_4.5s_ease-in-out_infinite] overflow-visible">
                    {renderDroneImage}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Orbit Guide Tip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[8px] font-mono text-zinc-400 flex items-center gap-1.5 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Sliders className="w-3 h-3 text-blue-400" />
                <span>DRAG TO ORBIT OR EXAMINATE CAD</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TECHNICAL SPECIFICATIONS COMPASS & SPECS ROW */}
          <div className="lg:col-span-3 flex flex-col justify-center order-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Cpu className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">System Avionics</span>
                </div>

                <div className="flex flex-col gap-5">
                  {[
                    { label: "Empty Weight", value: activeDrone.specs.weight, icon: Gauge },
                    { label: "Flight Time", value: activeDrone.specs.flightTime, icon: Battery },
                    { label: "Max Flight Speed", value: activeDrone.specs.maxSpeed, icon: Wind },
                    { label: "Max Range Limit", value: activeDrone.specs.maxRange, icon: Signal },
                    { label: "AI Neural Power", value: activeDrone.specs.aiPower, icon: Cpu },
                    { label: "Optics Setup", value: activeDrone.specs.camera, icon: Video },
                    { label: "Wind Safety", value: activeDrone.specs.windResistance, icon: Sliders },
                    { label: "Weather Shield", value: activeDrone.specs.protectionRating, icon: Shield }
                  ].map((s, idx) => (
                    <div key={idx} className="flex flex-col pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono tracking-wider uppercase mb-1">
                        <s.icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{s.label}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white font-sans leading-tight">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ----------------- INTERACTIVE CONTROL SYSTEM ----------------- */}
        <div className="mt-16 border-t border-white/5 pt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Play/Pause controls and pagination */}
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-110 active:scale-95 cursor-pointer"
              title={isPlaying ? "Pause autoplay presentation" : "Resume autoplay presentation"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-zinc-300" /> : <Play className="w-4 h-4 fill-white text-zinc-300" />}
            </button>

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>
                <strong className="text-white">0{activeIndex + 1}</strong> / 0{DRONES_DATA.length}
              </span>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model thumbnails / navigation tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 order-1 sm:order-2">
            {DRONES_DATA.map((d, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelectModel(index)}
                  className={`group px-5 py-3 rounded-2xl border transition-all flex items-center gap-2.5 text-left text-xs font-bold cursor-pointer relative overflow-hidden ${
                    isActive 
                      ? "bg-white text-slate-950 border-white shadow-xl hover:scale-105" 
                      : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {/* Little custom colored indicator */}
                  <div className={`w-2 h-2 rounded-full ${
                    d.id === "air" ? "bg-blue-400" :
                    d.id === "pro" ? "bg-emerald-400" :
                    d.id === "cinema" ? "bg-red-400" :
                    d.id === "explorer" ? "bg-orange-400" :
                    "bg-purple-400"
                  }`} />
                  
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-mono tracking-tight font-medium ${isActive ? "text-slate-600" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                      0{index + 1} // MODEL
                    </span>
                    <span className="font-sans font-bold tracking-tight">{d.name.split(" ")[1]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
