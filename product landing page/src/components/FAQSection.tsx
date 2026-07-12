import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Do I need a special license or certification to pilot the AERIX ONE?",
      answer: "No! Because of its active autonomous flight core (Quantum Core AI), the drone handles all stabilization, navigation, and regulatory geofencing internally. If you wish to pilot manually in the US, standard FAA recreational guidelines apply, and because the drone weighs 440g, you will simply register it online in minutes via FAA DroneZone. We have built-in tutorials guiding you through absolute safety.",
    },
    {
      question: "How does the autonomous flight system react to sudden high wind gusts?",
      answer: "The AERIX ONE is equipped with a real-time wind sensor array and on-board inertial gyros. In milliseconds, the flight system calculates dynamic counter-thrust vectors on each brushless motor. It has been flight-tested in sustained winds up to 35mph and heavy mountain wind gusts up to 45mph with zero displacement drift.",
    },
    {
      question: "Can I pre-program specific surveying grids or custom cinematic tracking lines?",
      answer: "Yes, completely! Using the AERIX Companion App on your tablet or smartphone, you can design full 3D waypoint paths, survey grids, or precise circular orbit grids. The drone will execute the takeoff, track the route at a selected speed and altitude while keeping the camera locked on your subject, and return to base autonomously.",
    },
    {
      question: "How does the active LiDAR obstacle avoidance differ from normal optical systems?",
      answer: "Traditional drones rely solely on camera sensors, which fail in low-light, dense trees, or against glass buildings. The AERIX ONE features active top-mounted LiDAR arrays emitting 240,000 laser points per second. This constructs a real-time, high-density point cloud mapping every obstacle (including twigs, power cables, and wires) fully offline in low-light, fog, or smoke.",
    },
    {
      question: "What happens if the communication link between the drone and the controller is broken?",
      answer: "Safety is our absolute highest priority. If the secure encrypted O3 connection is broken for more than 5 seconds, the drone locks its position, hovering safely using its LiDAR stability core. If the connection cannot be re-established after 30 seconds, it initiates a 'Smart Return-Home' procedure, recalculating paths to avoid new obstacles and land at its exact takeoff coordinates.",
    },
    {
      question: "Is the camera gimbal module interchangeable for other payloads?",
      answer: "Yes! The AERIX ONE features a quick-release locking clamp mechanism underneath the nose. You can hot-swap the default dual 8K cinematic lens gimbal for multispectral agricultural sensors, thermal search-and-rescue payloads, or heavy-duty inspection zoom rigs in under 10 seconds.",
    },
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-section"
      className="relative w-full py-24 sm:py-32 bg-[#F5F5F7] border-b border-gray-200 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-black tracking-tight mt-3 mb-6">
            Frequently Asked Questions.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Need clarifications regarding flight parameters, battery care, or preorder dispatches? Browse our comprehensive operational FAQ list.
          </p>
        </div>

        {/* Accordions List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:border-blue-500/30"
              >
                {/* Header Toggle Clickable Area */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left px-6 py-5 sm:py-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-black transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border border-gray-250 flex items-center justify-center shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600 border-blue-200 bg-blue-50" : ""}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-gray-100" : "max-h-0"
                  }`}
                >
                  <div className="p-6 text-xs sm:text-sm text-gray-500 leading-relaxed bg-[#fafafa]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
