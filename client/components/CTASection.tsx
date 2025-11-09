import { useState } from "react";
import JoinUsForm from "./JoinUsForm";

export default function CTASection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="relative w-full flex items-center justify-center overflow-hidden px-4 py-20 md:py-28 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Main Content */}
        <div className="relative z-10 container mx-auto text-center max-w-4xl">
          {/* Main Headline */}
          <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight tracking-tight">
            AI isn't the future — it's your next skill
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
            Join thousands of students who are mastering AI. The time to start is now.
          </p>

          {/* Main CTA Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-black px-10 md:px-16 py-5 md:py-7 rounded-2xl text-xl md:text-2xl font-bold transition-all duration-300 hover:bg-gray-100 shadow-2xl mb-8 inline-block hover:scale-105 active:scale-95 hover:-translate-y-1 tracking-wide"
          >
            Enroll Now →
          </button>
        </div>
      </section>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </>
  );
}
