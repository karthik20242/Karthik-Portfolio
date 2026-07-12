import React, { useState } from "react";
import { Camera, Compass, MapPin, ZoomIn } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "all" | "nature" | "ocean" | "urban" | "lifestyle";
  title: string;
  location: string;
  url: string;
  aspect: string;
  photographer: string;
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "nature" | "ocean" | "urban" | "lifestyle">("all");

  const categories = [
    { id: "all", label: "All Masterworks" },
    { id: "nature", label: "Nature & Wilderness" },
    { id: "ocean", label: "Ocean & Coasts" },
    { id: "urban", label: "Urban & Architecture" },
    { id: "lifestyle", label: "Action & Lifestyle" },
  ];

  // Highly curated cinematic drone photographs with perfect Unsplash coordinates
  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      category: "nature",
      title: "Alpine Golden Sunrise",
      location: "Dolomites, Italy",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      aspect: "col-span-1 md:col-span-2 row-span-1 h-[300px] md:h-[400px]",
      photographer: "Elena Rostova",
    },
    {
      id: "2",
      category: "ocean",
      title: "Turquoise Shorelines",
      location: "Zakynthos, Greece",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      aspect: "col-span-1 md:col-span-1 row-span-1 h-[300px]",
      photographer: "Lucas K.",
    },
    {
      id: "3",
      category: "urban",
      title: "Cyberpunk Metropolis",
      location: "Shibuya, Tokyo",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
      aspect: "col-span-1 md:col-span-1 row-span-1 h-[300px] md:h-[400px]",
      photographer: "Takahiro S.",
    },
    {
      id: "4",
      category: "lifestyle",
      title: "Surfers on the Edge",
      location: "Bells Beach, Australia",
      url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
      aspect: "col-span-1 md:col-span-2 row-span-1 h-[300px]",
      photographer: "Sandy Shores",
    },
    {
      id: "5",
      category: "nature",
      title: "Volcanic Ridge Path",
      location: "Fagradalsfjall, Iceland",
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      aspect: "col-span-1 md:col-span-1 row-span-1 h-[300px]",
      photographer: "Ari G.",
    },
    {
      id: "6",
      category: "urban",
      title: "Suspended In Fog",
      location: "Golden Gate, San Francisco",
      url: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
      aspect: "col-span-1 md:col-span-2 row-span-1 h-[300px] md:h-[400px]",
      photographer: "Matt Peterson",
    },
  ];

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="captured-gallery"
      className="relative w-full py-24 sm:py-32 bg-[#F5F5F7] border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
              Exquisite Galleries
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
              Captured Through AERIX ONE.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Experience the world from unprecedented heights. These award-winning photographs were shot entirely with the stock dual lens sensor module of AERIX ONE.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                    : "bg-white/70 text-gray-600 border-gray-200 hover:bg-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl border border-gray-200/30 bg-black shadow-sm hover:shadow-md transition-all duration-700 ${item.aspect}`}
            >
              {/* Image with zoom and soft blur entry */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out select-none opacity-85 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

              {/* Floating Lens Info Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>

              {/* Captions */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-none select-none text-white">
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-blue-400 mb-2 uppercase">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-sans font-bold tracking-tight mb-1 group-hover:translate-x-1 transition-transform duration-500">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 mt-2">
                  <span>CAMERA: 8K PRORES // ISO 100</span>
                  <span>BY {item.photographer.toUpperCase()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
