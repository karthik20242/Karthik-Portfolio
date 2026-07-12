import React, { useMemo, useState, useEffect } from "react";
import aerixAirImg from "../assets/images/aerix_air_drone_1783680686857.jpg";
import aerixProImg from "../assets/images/aerix_pro_drone_1783680700215.jpg";
import aerixCinemaImg from "../assets/images/aerix_cinema_drone_1783680712483.jpg";
import aerixExplorerImg from "../assets/images/aerix_explorer_drone_1783680725793.jpg";
import aerixEnterpriseImg from "../assets/images/aerix_enterprise_drone_1783680736618.jpg";
import { 
  Cpu, 
  Layers, 
  Disc3, 
  Gauge, 
  ShieldAlert, 
  Eye, 
  Compass, 
  Settings, 
  Activity, 
  Hammer 
} from "lucide-react";

interface DroneModelProps {
  isExploded?: boolean;
  hovering?: boolean;
  pitch?: number; // X-axis rotation
  yaw?: number;   // Y-axis rotation
  roll?: number;  // Z-axis rotation
  scale?: number;
  activePartId?: string | null;
  onPartClick?: (partId: string) => void;
  droneId?: string; // High-resolution drone ID selector
}

export default function DroneModel({
  isExploded = false,
  hovering = true,
  pitch = 0,
  yaw = 0,
  roll = 0,
  scale = 1,
  activePartId = null,
  onPartClick,
  droneId = "air",
}: DroneModelProps) {
  // Real-time fluctuating telemetry values
  const [telemetry, setTelemetry] = useState({
    cpuLoad: 42,
    batteryTemp: 34.2,
    lidarPoints: 240100,
    gimbalTilt: 12.4,
    motorRpm: 8200,
  });

  // Slowly fluctuate telemetry to simulate real-time live active drone
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        cpuLoad: Math.round(38 + Math.random() * 10),
        batteryTemp: parseFloat((33.5 + Math.random() * 1.5).toFixed(1)),
        lidarPoints: Math.round(239800 + Math.random() * 600),
        gimbalTilt: parseFloat((11.8 + Math.random() * 1.2).toFixed(1)),
        motorRpm: Math.round(8100 + Math.random() * 200),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getDroneImg = () => {
    switch (droneId) {
      case "air": return aerixAirImg;
      case "pro": return aerixProImg;
      case "cinema": return aerixCinemaImg;
      case "explorer": return aerixExplorerImg;
      case "enterprise": return aerixEnterpriseImg;
      default: return aerixAirImg;
    }
  };

  const getAccentColor = () => {
    switch (droneId) {
      case "air": return "blue";
      case "pro": return "emerald";
      case "cinema": return "red";
      case "explorer": return "orange";
      default: return "purple";
    }
  };

  const accent = getAccentColor();

  // Coordinates and details of the exploded parts for visual lines and dots
  const parts = useMemo(() => [
    {
      id: "lidar",
      name: "LiDAR Spatial Scanner",
      desc: "Real-time 3D terrain mapping & obstacle avoidance.",
      pos: { x: 0, y: -120, z: 0 },
      color: "from-sky-400 to-blue-500",
      icon: Layers,
      statName: "POINT-CLOUD",
      statValue: `${telemetry.lidarPoints.toLocaleString()} pts/s`,
    },
    {
      id: "canopy",
      name: "Polycarbonate Canopy",
      desc: "Impact-resistant glassmorphic composite shell protection.",
      pos: { x: 0, y: -70, z: -10 },
      color: "from-slate-300 to-slate-200",
      icon: Hammer,
      statName: "SHELL SHIELD",
      statValue: "IP67 CERTIFIED",
    },
    {
      id: "brain",
      name: "AERIX Quantum AI Core",
      desc: "High-performance cognitive flight processor & path generator.",
      pos: { x: 0, y: -30, z: 0 },
      color: "from-indigo-500 to-purple-600",
      icon: Cpu,
      statName: "CORE LOAD",
      statValue: `${telemetry.cpuLoad}% CAPACITY`,
    },
    {
      id: "gimbal",
      name: "8K Pro-Res Cine Gimbal",
      desc: "3-axis high-speed active lens stabilization.",
      pos: { x: 30, y: 70, z: 20 },
      color: "from-amber-400 to-amber-500",
      icon: Disc3,
      statName: "GIMBAL ROLL",
      statValue: `P_TILT: ${telemetry.gimbalTilt}°`,
    },
    {
      id: "battery",
      name: "Graphene-Lithium Cell",
      desc: "Intelligent high-density structural battery.",
      pos: { x: -80, y: 15, z: -10 },
      color: "from-emerald-400 to-teal-500",
      icon: Compass,
      statName: "THERMALS",
      statValue: `${telemetry.batteryTemp}°C STABLE`,
    },
    {
      id: "motors",
      name: "High-Torque Flux Motors",
      desc: "Brushless, hyper-efficient motors with dynamic braking.",
      pos: { x: 0, y: 25, z: 0 },
      color: "from-rose-500 to-red-600",
      icon: Settings,
      statName: "MOTOR VELOCITY",
      statValue: `${telemetry.motorRpm} RPM`,
    }
  ], [telemetry]);

  // Compute transform style for the outer 3D wrapper
  const transformStyle = {
    transform: `perspective(1000px) rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg) scale(${scale})`,
    transition: "transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1)",
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" id="drone-3d-stage">
      {/* Dynamic Drop Shadow below the drone */}
      <div
        className={`absolute bottom-[10%] w-[240px] h-[32px] bg-black/15 blur-xl rounded-full transition-all duration-700 ${
          hovering && !isExploded ? "animate-[bounce_3s_ease-in-out_infinite] scale-95 opacity-80" : "scale-110 opacity-40"
        } ${isExploded ? "scale-150 opacity-20 blur-2xl" : ""}`}
        style={{
          transform: `scale(${1 - pitch / 120}) translateX(${roll * 1.5}px)`,
        }}
      />

      {/* Floating Wrapper */}
      <div
        className={`relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center ${
          hovering && !isExploded ? "animate-[bounce_4s_ease-in-out_infinite]" : ""
        }`}
        style={transformStyle}
      >
        {/* ========================================================= */}
        {/* REAL DRONE HIGH-RESOLUTION CAD REPRESENTATION             */}
        {/* ========================================================= */}
        {!isExploded ? (
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center transition-all duration-500">
            {/* Real Drone Photo with zero cutoff */}
            <img 
              src={getDroneImg()}
              alt={`AERIX Drone ${droneId}`}
              className="w-[90%] h-[90%] object-contain select-none pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)] filter contrast-105"
              referrerPolicy="no-referrer"
            />

            {/* Floating scanner lasers over the transparent drone */}
            <div className={`absolute left-0 w-full h-[2px] pointer-events-none animate-scan opacity-45 ${
              accent === "blue" ? "bg-blue-400 shadow-[0_0_12px_#3b82f6]" :
              accent === "emerald" ? "bg-emerald-400 shadow-[0_0_12px_#10b981]" :
              accent === "red" ? "bg-red-400 shadow-[0_0_12px_#ef4444]" :
              accent === "orange" ? "bg-orange-400 shadow-[0_0_12px_#f97316]" :
              "bg-purple-400 shadow-[0_0_12px_#a855f7]"
            }`} />
          </div>
        ) : (
          /* Exploded layout with central high-res core plus outer real parts cards */
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central real drone image serving as the physical anchor chassis */}
            <div className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] relative flex items-center justify-center">
              <img 
                src={getDroneImg()}
                alt="AERIX Central Core"
                className="w-full h-full object-contain select-none pointer-events-none opacity-100 scale-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)] filter contrast-110 brightness-105 saturate-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-[spin_60s_linear_infinite]" />
              
              {/* Central laser core diagnostic ring */}
              <div className="absolute inset-[-16px] rounded-full border-2 border-blue-500/30 animate-pulse pointer-events-none" />
            </div>

            {/* Holographic glowing anchor targets on the actual core */}
            {parts.map((p) => {
              const active = activePartId === p.id;
              let anchorX = 0;
              let anchorY = 0;

              // Match coordinates to where the components sit on the drone
              if (p.id === "lidar") { anchorX = 0; anchorY = -60; }
              else if (p.id === "canopy") { anchorX = 0; anchorY = -25; }
              else if (p.id === "brain") { anchorX = 0; anchorY = 5; }
              else if (p.id === "gimbal") { anchorX = 25; anchorY = 55; }
              else if (p.id === "battery") { anchorX = -55; anchorY = 15; }
              else if (p.id === "motors") { anchorX = -65; anchorY = 65; }

              return (
                <div
                  key={`anchor-${p.id}`}
                  className="absolute transition-all duration-500 z-30"
                  style={{
                    transform: `translate(${anchorX}px, ${anchorY}px)`,
                  }}
                >
                  {active ? (
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-12 h-12 rounded-full border-2 border-blue-500/80 animate-ping" />
                      <span className="absolute w-6 h-6 rounded-full border border-blue-400 bg-blue-500/20 animate-pulse" />
                      <span className="relative inline-flex rounded-full h-4.5 w-4.5 border-2 border-white bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,1)]" />
                      
                      {/* Diagnostic location sub-tag */}
                      <div className="absolute top-6 whitespace-nowrap bg-blue-600/90 backdrop-blur-md text-white font-mono text-[7px] font-black px-1.5 py-0.5 rounded border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)] uppercase tracking-wider">
                        {p.id} core
                      </div>
                    </div>
                  ) : (
                    <span className="absolute -translate-x-1/2 -translate-y-1/2 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 bg-slate-400"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 border border-slate-700 bg-slate-500"></span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* REAL INTERACTIVE PARTS HUD CARDS CONNECTING TO THE DRONE  */}
        {/* ========================================================= */}
        {isExploded && (
          <div className="absolute inset-0 pointer-events-none z-30" id="exploded-annotations">
            {parts.map((p) => {
              const active = activePartId === p.id;
              let labelSide = "right"; 
              let labelX = 0;
              let labelY = 0;

              // Placement map matching original structural guidelines
              if (p.id === "lidar") {
                labelSide = "right";
                labelX = 135;
                labelY = -155;
              } else if (p.id === "canopy") {
                labelSide = "left";
                labelX = -150;
                labelY = -105;
              } else if (p.id === "brain") {
                labelSide = "right";
                labelX = 135;
                labelY = -40;
              } else if (p.id === "gimbal") {
                labelSide = "right";
                labelX = 135;
                labelY = 105;
              } else if (p.id === "battery") {
                labelSide = "left";
                labelX = -185;
                labelY = 15;
              } else if (p.id === "motors") {
                labelSide = "left";
                labelX = -165;
                labelY = 75;
              }

              const IconComponent = p.icon;

              return (
                <div
                  key={p.id}
                  onClick={() => onPartClick && onPartClick(p.id)}
                  className={`absolute pointer-events-auto cursor-pointer transition-all duration-500 hover:scale-102 ${
                    active 
                      ? "opacity-100 scale-102 z-40" 
                      : activePartId 
                        ? "opacity-60 scale-95" 
                        : "opacity-95 hover:opacity-100"
                  }`}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(${labelX}px, ${labelY}px)`,
                  }}
                >
                  {labelSide === "left" ? (
                    <div className="flex items-center gap-2">
                      {/* Interactive Sleek Dark HUD Part Card */}
                      <div className={`p-3 rounded-2xl bg-slate-900/95 text-slate-100 border transition-all duration-300 w-[170px] md:w-[210px] text-right shadow-xl flex flex-col gap-1.5 ${
                        active 
                          ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.35)] bg-slate-950/95" 
                          : "border-slate-800/80 hover:border-slate-700 hover:bg-slate-950/50"
                      }`}>
                        {/* Real-time physical part image thumbnail viewport */}
                        <div className="w-full h-14 rounded-xl overflow-hidden relative border border-slate-800 mb-1 bg-slate-950 flex items-center justify-center">
                          <img 
                            src={getDroneImg()}
                            alt={p.name}
                            className="w-[110%] h-[110%] object-contain select-none pointer-events-none transition-transform duration-500 hover:scale-125 filter contrast-115 brightness-110"
                            style={{
                              objectPosition: p.id === "lidar" ? "50% 15%" :
                                             p.id === "canopy" ? "50% 35%" :
                                             p.id === "brain" ? "50% 50%" :
                                             p.id === "gimbal" ? "50% 85%" :
                                             p.id === "battery" ? "25% 50%" :
                                             "75% 50%" // motors
                            }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute top-1 left-1.5 font-mono text-[6px] text-blue-400 tracking-wider">HUD_DET_L</span>
                        </div>

                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-[10px] font-bold text-white tracking-wide">{p.name}</span>
                          <div className={`p-1 rounded-lg ${active ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-normal block text-right font-medium">
                          {p.desc}
                        </p>
                        <div className="flex items-center justify-between border-t border-slate-800 pt-1 mt-0.5 text-[7px] font-mono">
                          <span className="text-slate-500">{p.statName}</span>
                          <span className={`font-bold ${active ? "text-blue-400" : "text-slate-400"}`}>
                            {p.statValue}
                          </span>
                        </div>
                      </div>

                      {/* Diagnostic Dot Anchor */}
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                        active ? "border-blue-500 bg-white shadow-[0_0_12px_rgba(59,130,246,0.8)]" : "border-slate-600 bg-slate-800"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-blue-500" : "bg-slate-400"}`} />
                      </div>

                      {/* Laser Connection Line */}
                      <div className={`h-[2px] w-6 md:w-12 border-t-2 border-dashed transition-all ${
                        active ? "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "border-slate-800"
                      }`} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* Laser Connection Line */}
                      <div className={`h-[2px] w-6 md:w-12 border-t-2 border-dashed transition-all ${
                        active ? "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "border-slate-800"
                      }`} />

                      {/* Diagnostic Dot Anchor */}
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                        active ? "border-blue-500 bg-white shadow-[0_0_12px_rgba(59,130,246,0.8)]" : "border-slate-600 bg-slate-800"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-blue-500" : "bg-slate-400"}`} />
                      </div>

                      {/* Interactive Sleek Dark HUD Part Card */}
                      <div className={`p-3 rounded-2xl bg-slate-900/95 text-slate-100 border transition-all duration-300 w-[170px] md:w-[210px] text-left shadow-xl flex flex-col gap-1.5 ${
                        active 
                          ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.35)] bg-slate-950/95" 
                          : "border-slate-800/80 hover:border-slate-700 hover:bg-slate-950/50"
                      }`}>
                        {/* Real-time physical part image thumbnail viewport */}
                        <div className="w-full h-14 rounded-xl overflow-hidden relative border border-slate-800 mb-1 bg-slate-950 flex items-center justify-center">
                          <img 
                            src={getDroneImg()}
                            alt={p.name}
                            className="w-[110%] h-[110%] object-contain select-none pointer-events-none transition-transform duration-500 hover:scale-125 filter contrast-115 brightness-110"
                            style={{
                              objectPosition: p.id === "lidar" ? "50% 15%" :
                                             p.id === "canopy" ? "50% 35%" :
                                             p.id === "brain" ? "50% 50%" :
                                             p.id === "gimbal" ? "50% 85%" :
                                             p.id === "battery" ? "25% 50%" :
                                             "75% 50%" // motors
                            }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute top-1 right-1.5 font-mono text-[6px] text-blue-400 tracking-wider">HUD_DET_R</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className={`p-1 rounded-lg ${active ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-white tracking-wide">{p.name}</span>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-normal block text-left font-medium">
                          {p.desc}
                        </p>
                        <div className="flex items-center justify-between border-t border-slate-800 pt-1 mt-0.5 text-[7px] font-mono">
                          <span className="text-slate-500">{p.statName}</span>
                          <span className={`font-bold ${active ? "text-blue-400" : "text-slate-400"}`}>
                            {p.statValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
