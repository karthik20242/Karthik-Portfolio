import React, { useState } from "react";
import { Compass, Mail, Star, Github, Twitter, Linkedin, CheckCircle } from "lucide-react";

export default function FooterAndTestimonials() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const testimonials = [
    {
      quote: "The dual-lens 8K stabilization system on AERIX ONE completely replaced our heavy dolly rigs on location. The AI drone tracks active stunts and mountain athletes with incredible cinematic timing.",
      author: "Marcus Vance",
      role: "Action Cinema Director",
      location: "Chamonix, France",
      rating: 5,
    },
    {
      quote: "In Search & Rescue operations, every second determines lives. The on-board thermal imaging sensors and active path mapping bypass smoke and trees in seconds, overlaying vectors straight to our field units.",
      author: "Sarah Jenkins",
      role: "Rescue Operations Lead",
      location: "Colorado Rockies",
      rating: 5,
    },
    {
      quote: "We map over 800 acres of crops. Prior to AERIX ONE, this took days of manual field scans. Now, we simply launch a pre-programmed mission and receive comprehensive NDVI nitrogen indices in under an hour.",
      author: "Dr. Aris Thorne",
      role: "Precision Agronomist",
      location: "Iowa, USA",
      rating: 5,
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-slate-950 text-white overflow-hidden" id="footer">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.04)_0%,_transparent_70%)] pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.03)_0%,_transparent_60%)] pointer-events-none select-none" />

      {/* ========================================================= */}
      {/* TESTIMONIALS SUBSECTION                                   */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 sm:py-32 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-500">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight mt-3 mb-6 text-white">
            Endorsed by Professionals.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            See how the AERIX autonomous airframe is optimizing workflows, saving critical seconds, and unlocking artistic vectors across diverse global industries.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-white/5 hover:bg-white/[0.08] border border-white/10 p-8 rounded-3xl flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.15)] backdrop-blur-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed italic mb-8 font-serif">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-400/20 shadow-md">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-[10px] text-blue-400 font-mono tracking-wider mt-0.5 uppercase">
                    {t.role} // <span className="text-zinc-500 font-normal">{t.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* NEWSLETTER SIGNUP SUBSECTION                              */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center border-b border-white/5">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-6 shadow-md">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white mb-4">
            Stay Up To Date On Operations
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-10 px-4">
            Subscribe to the AERIX Logbook to receive technical briefings, firmware enhancements, pre-order dispatch schedules, and flight safety recommendations.
          </p>

          {/* Form */}
          {subscribed ? (
            <div className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-500/30 px-6 py-4 rounded-full text-emerald-400 animate-pulse">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Successfully Subscribed to AERIX Logbook!
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-white/5 border border-white/15 rounded-full text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white hover:bg-blue-600 hover:text-white text-slate-950 font-bold text-sm rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0"
              >
                Join List
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* THE LUXURY FOOTER BRAND LINKS                             */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 sm:gap-16 items-start">
          {/* Brand Identity Block */}
          <div className="col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-500 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="font-mono font-black tracking-[0.25em] text-white">AERIX ONE</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
              Next-generation autonomous flight. Armed with active point-cloud mapping, cognitive airframe controls, and lossless cinema-grade dual optics.
            </p>
            {/* Social handles */}
            <div className="flex gap-4 items-center text-zinc-500 mt-2">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h5 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4">Products</h5>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400">
              <li><a href="#hero-section" className="hover:text-white transition-colors">AERIX ONE Air</a></li>
              <li><a href="#exploded-view-section" className="hover:text-white transition-colors">AERIX ONE Pro</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">AERIX ONE Ultra</a></li>
              <li><a href="#camera-section" className="hover:text-white transition-colors">Dual Cine Lens</a></li>
              <li><a href="#applications-section" className="hover:text-white transition-colors">Payload Swaps</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4">Support</h5>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400">
              <li><a href="#faq-section" className="hover:text-white transition-colors">Flight Manuals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care+ Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Activation Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Filing Claims</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Repair Centers</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4">Developers</h5>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Payload SDK</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AERIX Core API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Flight Diagnostics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Point-Cloud Data</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub Repos</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4">Legal</h5>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Shield</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAA Geofencing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">EU Safe Flight</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-500">
          <span>© 2026 AERIX ROBOTICS INC. ALL RIGHTS RESERVED.</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-white">PRIVACY</a>
            <a href="#" className="hover:text-white">TERMS</a>
            <a href="#" className="hover:text-white">FAA COMPLIANT</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
