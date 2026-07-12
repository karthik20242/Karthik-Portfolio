import React, { useEffect, useState, useRef } from "react";
import { Gauge, Zap, Wind, Wifi, ShieldCheck, Timer } from "lucide-react";

interface PerformanceStat {
  label: string;
  value: string;
  suffix: string;
  targetPercent: number;
  color: string;
  desc: string;
  icon: any;
}

export default function PerformanceDashboard() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: PerformanceStat[] = [
    {
      label: "Flight Duration",
      value: "55",
      suffix: "mins",
      targetPercent: 92,
      color: "stroke-emerald-500 text-emerald-500",
      desc: "Super-conduction graphene cells prolong operations twice as long as traditional LiPo equivalents.",
      icon: Timer,
    },
    {
      label: "AI Processing",
      value: "275",
      suffix: "TOPS",
      targetPercent: 96,
      color: "stroke-blue-600 text-blue-600",
      desc: "Local deep networks map terrains, detect obstacles, and control tracking fully on edge.",
      icon: Zap,
    },
    {
      label: "Wind Stability",
      value: "45",
      suffix: "mph",
      targetPercent: 88,
      color: "stroke-indigo-600 text-indigo-600",
      desc: "Active counter-thrust gyro vector algorithms keep footage flat even in heavy mountain squalls.",
      icon: Wind,
    },
    {
      label: "O3 Signal Strength",
      value: "15",
      suffix: "km",
      targetPercent: 90,
      color: "stroke-purple-600 text-purple-600",
      desc: "Secure encrypted video and control link bridges channels dynamically to escape frequency jamming.",
      icon: Wifi,
    },
    {
      label: "Airframe Health",
      value: "100",
      suffix: "%",
      targetPercent: 100,
      color: "stroke-teal-600 text-teal-600",
      desc: "Self-diagnostic firmware checks sensors, motor temperatures, and propeller integrity prior to takeoff.",
      icon: ShieldCheck,
    },
    {
      label: "Sensor Accuracy",
      value: "99.9",
      suffix: "%",
      targetPercent: 99,
      color: "stroke-blue-500 text-blue-500",
      desc: "LiDAR and stereoscopic optical sensors build sub-centimeter depth grids for safe proximity navigation.",
      icon: Gauge,
    },
  ];

  // Animated numbers when entering viewport
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Animate progress smoothly over 1.5 seconds
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const update = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(1, elapsed / duration);
            setAnimationProgress(progress);
            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance-dashboard"
      className="relative w-full py-24 sm:py-32 bg-white border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            Avionics Telemetry
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            Flight Dashboard. <br />
            Enterprise Performance.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Monitor real-time system metrics, flight dynamics, and payload health. The AERIX ONE features on-board self-analysis routines keeping systems running at 100% capacity.
          </p>
        </div>

        {/* Circular Progress Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {stats.map((s, i) => {
            // Circle calculations
            const radius = 60;
            const strokeWidth = 8;
            const circumference = 2 * Math.PI * radius;
            const currentPercent = inView ? s.targetPercent * animationProgress : 0;
            const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

            return (
              <div
                key={i}
                className="group relative bg-white/40 backdrop-blur-xl border border-gray-200 p-6 sm:p-8 rounded-[32px] flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Visual Radial Circle */}
                <div className="relative w-[150px] h-[150px] shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background Ring */}
                    <circle
                      cx="75"
                      cy="75"
                      r={radius}
                      stroke="#f1f5f9"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                    />
                    {/* Progress Ring */}
                    <circle
                      cx="75"
                      cy="75"
                      r={radius}
                      className={`transition-all duration-100 ease-out ${s.color}`}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  {/* Centered Numbers */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <s.icon className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-2xl font-bold font-sans text-black tracking-tight">
                      {Math.round(parseFloat(s.value) * (inView ? animationProgress : 0) * 10) / 10}
                      <span className="text-[10px] font-semibold text-gray-500 ml-0.5">{s.suffix}</span>
                    </span>
                    <span className="text-[7px] font-mono tracking-widest text-gray-400 uppercase mt-0.5">
                      {s.label.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Stat Explanatory Copy */}
                <div className="flex-1 flex flex-col text-center sm:text-left justify-center">
                  <h3 className="text-sm font-bold text-black mb-1.5 group-hover:text-blue-600 transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
