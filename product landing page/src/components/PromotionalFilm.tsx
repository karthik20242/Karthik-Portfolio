import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Expand, RefreshCw, Sparkles, Navigation } from "lucide-react";

export default function PromotionalFilm() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(35); // simulated seek progress
  const videoRef = useRef<HTMLVideoElement>(null);

  // A pristine public looping MP4 drone shot of mountain valleys
  const videoUrl = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02273d0897a9f97d022ec16238b17b0&profile_id=139&oauth2_token_id=57447761";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <section
      id="promotional-film"
      className="relative w-full py-24 sm:py-32 bg-[#F5F5F7] border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            World Premiere
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            AERIX ONE: Intelligence Takes Flight
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Witness the full capabilities of on-board neural pathing and lossless dual-sensor 8K optics. Shot entirely on location in the Swiss Alps, Greek Archipelagos, and Tokyo cityscapes.
          </p>
        </div>

        {/* Premium Glassmorphic Video Player Frame */}
        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-[36px] bg-slate-900/10 border border-white/60 p-3 sm:p-5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] backdrop-blur-md overflow-hidden flex flex-col justify-end">
          {/* Inner Video Container */}
          <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-black shadow-inner">
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover opacity-90 transition-opacity"
            />

            {/* AI HUD Telemetry overlaying active video footage */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none select-none text-white font-mono z-10">
              {/* Top Row: Video States */}
              <div className="flex justify-between items-start text-[8px] sm:text-[10px]">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>PREVIEW STREAM // RESOLUTION: 3840 x 2160 @ 30FPS</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>AUTO PILOT: ENGAGED</span>
                </div>
              </div>

              {/* Dynamic target framing box in middle (Simulated AI Tracking on video) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[180px] sm:w-[240px] h-[120px] sm:h-[160px] border border-emerald-400/35 rounded-xl bg-emerald-400/5 p-2 flex flex-col justify-between animate-pulse">
                  {/* Framing brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

                  <div className="flex justify-between text-[6px] sm:text-[8px] text-emerald-400">
                    <span className="font-extrabold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400 animate-spin" /> SUBJECT TRACK: ACTIVE
                    </span>
                    <span>99.2% LOCK</span>
                  </div>

                  <div className="text-[6px] sm:text-[7px] text-emerald-300 self-end">
                    COORDS: 46.8007° N, 9.8424° E
                  </div>
                </div>
              </div>

              {/* Bottom Row: Drone Stats */}
              <div className="flex justify-between items-end text-[8px] sm:text-[9px]">
                <div className="hidden sm:flex bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex-col">
                  <span className="text-zinc-400 text-[7px] uppercase tracking-wider">Flight telemetry</span>
                  <span className="text-white font-sans font-bold mt-0.5">Alt: 420m // Spd: 32km/h</span>
                </div>
                <div className="hidden sm:flex bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex-col text-right">
                  <span className="text-zinc-400 text-[7px] uppercase tracking-wider">Stabilization</span>
                  <span className="text-white font-sans font-bold mt-0.5">Dual-OIS Gimbal: 100% stable</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive Player Controller Overlay (Fades out when inactive) */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 flex flex-col gap-4">
              {/* Time Seek Bar */}
              <div className="w-full bg-white/20 h-1 sm:h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Player buttons */}
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-slate-900" /> : <Play className="w-4 h-4 fill-slate-900" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 text-white/80 hover:text-white hover:scale-105 transition-all cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="text-[10px] font-mono text-white/70">
                  AERIX FILM SYSTEM // CINEMATIC DEMO
                </div>

                <button className="p-1.5 text-white/80 hover:text-white hover:scale-105 transition-all cursor-not-allowed">
                  <Expand className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
