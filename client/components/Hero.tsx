import { useState } from "react";
import JoinUsForm from "./JoinUsForm";

export default function Hero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden px-4 py-20">
      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center min-h-screen">
        {/* Main Title */}
        <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl mb-6 text-black leading-tight max-w-5xl">
        Still stuck <span className="text-blue-600">learning</span> Excel and Tally? It’s time to move to AI
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl font-light leading-relaxed">
          Learn. Build. Automate. Master AI Skills.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20 justify-center flex-wrap">
          <button
            onClick={() => setShowForm(true)}
            className="btn-glass btn-light px-8 py-4 text-lg font-semibold hover:-translate-y-1 transform"
          >
            🚀 Join Us
          </button>
        </div>
      </div>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </section>
  );
}
