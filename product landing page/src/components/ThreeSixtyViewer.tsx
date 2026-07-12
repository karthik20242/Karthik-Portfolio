import React, { useState, useEffect, useRef } from "react";
import DroneModel from "./DroneModel";
import { Rotate3d, Sliders, Play, Pause } from "lucide-react";

export default function ThreeSixtyViewer() {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);
  const [activeDroneId, setActiveDroneId] = useState("air");

  const startX = useRef(0);
  const startY = useRef(0);
  const startYaw = useRef(0);
  const startPitch = useRef(15);
  const velocity = useRef(0.5); // Inertia velocity
  const lastTime = useRef(0);
  const dragTimeout = useRef<any>(null);

  // Auto-Spin Loop
  useEffect(() => {
    let frameId: number;

    const animate = (time: number) => {
      if (!isDragging) {
        if (autoSpin) {
          // Slowly rotate the drone
          setYaw((prev) => (prev + 0.3) % 360);
        } else {
          // Apply inertia if not dragging and not auto-spinning
          if (Math.abs(velocity.current) > 0.05) {
            setYaw((prev) => (prev + velocity.current) % 360);
            velocity.current *= 0.95; // Friction/decay
          }
        }
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, autoSpin]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoSpin(false);
    startX.current = e.clientX;
    startY.current = e.clientY;
    startYaw.current = yaw;
    startPitch.current = pitch;
    velocity.current = 0;
    lastTime.current = performance.now();

    if (dragTimeout.current) clearTimeout(dragTimeout.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    // Convert mouse movement to degrees
    const sensitivity = 0.5;
    const nextYaw = (startYaw.current + deltaX * sensitivity) % 360;
    const nextPitch = Math.max(-30, Math.min(60, startPitch.current - deltaY * sensitivity));

    setYaw(nextYaw);
    setPitch(nextPitch);

    // Calculate drag velocity for inertia on release
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (deltaX * sensitivity) / (dt * 0.1);
    }
    lastTime.current = now;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Trigger auto-spin resumption if idle for 6 seconds
      dragTimeout.current = setTimeout(() => {
        setAutoSpin(true);
      }, 5000);
    }
  };

  // Touch Drag Handlers (Mobile Support)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    setAutoSpin(false);
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startYaw.current = yaw;
    startPitch.current = pitch;
    velocity.current = 0;
    lastTime.current = performance.now();

    if (dragTimeout.current) clearTimeout(dragTimeout.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;

    const deltaX = e.touches[0].clientX - startX.current;
    const deltaY = e.touches[0].clientY - startY.current;

    const sensitivity = 0.6;
    const nextYaw = (startYaw.current + deltaX * sensitivity) % 360;
    const nextPitch = Math.max(-30, Math.min(60, startPitch.current - deltaY * sensitivity));

    setYaw(nextYaw);
    setPitch(nextPitch);

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (deltaX * sensitivity) / (dt * 0.1);
    }
    lastTime.current = now;
  };

  return (
    <section
      id="360-viewer"
      className="relative w-full py-24 bg-white border-b border-gray-200 overflow-hidden"
    >
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none select-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Panel: Content descriptions */}
          <div className="lg:col-span-4 flex flex-col">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
              Omnidirectional CAD
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
              Interactive 360° Studio.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10">
              Inspect the airframe from every angle. Drag anywhere on the stage to rotate, tilt, or glide the drone. Watch the dual cameras, active LED lights, and rotors react in real time.
            </p>

            {/* Interactive controller card */}
            <div className="bg-white/40 backdrop-blur-xl border border-gray-200 p-6 rounded-3xl flex flex-col gap-5 shadow-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-black">Viewer Parameters</span>
                <span className="font-mono text-[10px] text-gray-400">STATE: LIVE</span>
              </div>

              {/* Model selection */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Select Active Airframe</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "air", name: "AERIX Air" },
                    { id: "pro", name: "AERIX Pro" },
                    { id: "cinema", name: "AERIX Cine" },
                    { id: "explorer", name: "AERIX Explorer" },
                    { id: "enterprise", name: "AERIX Enterprise" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setActiveDroneId(d.id)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold uppercase border transition-all text-left flex items-center justify-between cursor-pointer ${
                        activeDroneId === d.id
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm animate-pulse"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`}
                    >
                      <span>{d.name.split(" ")[1]}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${activeDroneId === d.id ? "bg-white" : "bg-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Angles telemetry */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col">
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wide">Yaw rotation</span>
                  <span className="text-sm font-bold text-black mt-1 font-mono">{Math.round(yaw)}°</span>
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col">
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wide">Pitch angle</span>
                  <span className="text-sm font-bold text-black mt-1 font-mono">{Math.round(pitch)}°</span>
                </div>
              </div>

              {/* Play/Pause Auto-spin controls */}
              <button
                onClick={() => setAutoSpin(!autoSpin)}
                className={`w-full py-3 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  autoSpin
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 rounded-full"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 rounded-full"
                }`}
              >
                {autoSpin ? <Pause className="w-4 h-4 fill-white text-white" /> : <Play className="w-4 h-4 fill-gray-700 text-gray-700" />}
                <span>{autoSpin ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: The actual dragging stage */}
          <div
            className="lg:col-span-8 h-[400px] sm:h-[550px] bg-slate-950 rounded-3xl border border-slate-800/80 relative flex items-center justify-center cursor-grab active:cursor-grabbing group overflow-hidden shadow-2xl"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
          >
            {/* Pristine high-contrast HUD grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.15)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Visual guide HUD overlay */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-500 select-none tracking-widest z-20">
              STUDIO INTERACTION CORE // INPUT_POINTER_ACTIVE
            </div>

            {/* Active HD Model Prototype Name Display */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 select-none font-mono z-20 pointer-events-none">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.25em] animate-pulse">HD MODEL PROTOTYPE</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase">
                {activeDroneId === "air" ? "AERIX ONE Air" :
                 activeDroneId === "pro" ? "AERIX ONE Pro" :
                 activeDroneId === "cinema" ? "AERIX ONE Cinema" :
                 activeDroneId === "explorer" ? "AERIX ONE Explorer" :
                 activeDroneId === "enterprise" ? "AERIX ONE Enterprise" : "AERIX ONE Air"}
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                {activeDroneId === "air" ? "SYS_SPEC: ULTRALIGHT_CORE_S1" :
                 activeDroneId === "pro" ? "SYS_SPEC: HI_COMPOSITE_REINFORCED" :
                 activeDroneId === "cinema" ? "SYS_SPEC: 8K_SPECTRAL_CINE" :
                 activeDroneId === "explorer" ? "SYS_SPEC: EXP_RECONNAISSANCE" :
                 activeDroneId === "enterprise" ? "SYS_SPEC: FLUX_THERMAL_LIDAR" : "SYS_SPEC: CORE_SPEC_DEFAULT"}
              </span>
            </div>
            
            <div className="absolute bottom-6 flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 text-[9px] font-mono text-slate-300 select-none z-20">
              <Rotate3d className="w-3.5 h-3.5 text-blue-400" />
              <span>DRAG OR SWIPE TO ROTATE 360° ORBIT</span>
            </div>

            {/* Drone Canvas wrapper */}
            <div className="pointer-events-none scale-110">
              <DroneModel
                droneId={activeDroneId}
                isExploded={false}
                hovering={!isDragging}
                pitch={pitch}
                yaw={yaw}
                roll={0}
                scale={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
