import { useState } from "react";
import JoinUsForm from "./JoinUsForm";

export default function CTASection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-24 bg-black">
        {/* Main Content */}
        <div className="relative z-10 container mx-auto text-center max-w-4xl">
          {/* Main Headline */}
          <h2 className="font-semibold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
            AI isn't the future — it's your next skill
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of students who are mastering AI in just 4 months. The time to start is now.
          </p>

          {/* Main CTA Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-black px-8 md:px-16 py-5 md:py-7 rounded-lg text-xl md:text-2xl font-semibold transition-all duration-300 hover:bg-gray-100 shadow-md mb-8 inline-block hover:scale-105 active:scale-95 hover:-translate-y-1"
          >
            Enroll Now →
          </button>
        </div>
      </section>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </>
  );
}
