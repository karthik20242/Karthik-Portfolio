import React from "react";
import { User, RefreshCw, Compass, Eye, ShieldAlert, FastForward, Navigation, Disc3, Layers, Compass as MissionIcon } from "lucide-react";

interface FlightMode {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  icon: any;
  difficulty: "AUTO" | "PRO" | "CREATIVE";
}

export default function InteractiveFlightModes() {
  const flightModes: FlightMode[] = [
    {
      id: "follow",
      name: "Smart Follow Me",
      tagline: "True AI target locking",
      desc: "Locks onto subject profiles, predicting movement vectors and maintaining optimal distance even behind foliage.",
      icon: User,
      difficulty: "AUTO",
    },
    {
      id: "orbit",
      name: "Point of Interest Orbit",
      tagline: "Perfect circles in any breeze",
      desc: "Flies flawless orbits around coordinates, adjusting gimbal tilt continuously for clean cinematic compositions.",
      icon: RefreshCw,
      difficulty: "CREATIVE",
    },
    {
      id: "waypoint",
      name: "3D Waypoint Pathing",
      tagline: "Repeatable flight matrices",
      desc: "Plot highly complex trajectories in 3D space, saving coordinates to repeat scans or shoots months apart.",
      icon: Compass,
      difficulty: "PRO",
    },
    {
      id: "panorama",
      name: "180° Megapixel Panorama",
      tagline: "Automated stitching core",
      desc: "Automatically captures, aligns, and stitches 24 individual high-res images for breathtaking wide frames.",
      icon: Eye,
      difficulty: "AUTO",
    },
    {
      id: "hover",
      name: "LiDAR Precision Hover",
      tagline: "Sub-centimeter stability",
      desc: "Uses continuous LiDAR sweeps to maintain a rock-solid, drift-free hover indoors or outdoors without GPS coordinates.",
      icon: ShieldAlert,
      difficulty: "AUTO",
    },
    {
      id: "hyperlapse",
      name: "AI Cinematic Hyperlapse",
      tagline: "Time compressed in motion",
      desc: "Compresses space and time, moving along custom rails slowly while capturing lossless RAW images.",
      icon: FastForward,
      difficulty: "CREATIVE",
    },
    {
      id: "active-track",
      name: "Active Track 360",
      tagline: "Predictive path locks",
      desc: "Select a vehicle, runner, or animal. The drone pilots ahead or alongside, filming entirely hands-free.",
      icon: Disc3,
      difficulty: "AUTO",
    },
    {
      id: "gesture",
      name: "Gesture Magic Selfie",
      tagline: "Wave and capture",
      desc: "Launch, frame, snap a picture, and land using simple hand movements and wave triggers. No controller required.",
      icon: Navigation,
      difficulty: "AUTO",
    },
    {
      id: "indoor",
      name: "Indoor Navigation Matrix",
      tagline: "Tactical collision avoidance",
      desc: "Engages low-altitude optical and LiDAR arrays to glide through warehouses, venues, or close quarters safely.",
      icon: Layers,
      difficulty: "PRO",
    },
    {
      id: "mission",
      name: "AI Autonomous Mission",
      tagline: "Pre-planned scan sweeps",
      desc: "Pre-program entire takeoffs, inspections, mapping grids, and returns. Execute full operations with one touch.",
      icon: MissionIcon,
      difficulty: "PRO",
    },
  ];

  return (
    <section
      id="flight-modes"
      className="relative w-full py-24 sm:py-32 bg-[#F5F5F7] border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            Intelligent Autonomy
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            Interactive Flight Modes. <br />
            Select Your Perspective.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Unleash cinema-quality sweeps, loops, and tracking runs with single-tap flight modes. Let the AERIX ONE pilot itself while you focus entirely on your creative vision.
          </p>
        </div>

        {/* Horizontal scrollable / grid list of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {flightModes.map((m) => (
            <div
              key={m.id}
              className="group relative bg-white/40 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card top */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    <m.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[8px] font-mono font-extrabold tracking-wider px-2 py-0.5 rounded-full border ${
                      m.difficulty === "AUTO"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : m.difficulty === "CREATIVE"
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : "bg-purple-50 text-purple-600 border-purple-100"
                    }`}
                  >
                    {m.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-black mb-1 group-hover:text-blue-600 transition-colors">
                  {m.name}
                </h3>
                <p className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider mb-3">
                  {m.tagline}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {m.desc}
                </p>
              </div>

              {/* Decorative flight indicator at card bottom */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[8px] font-mono text-gray-400">
                <span>RADAR_LOCK // AUTONOMOUS</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
