import { useState } from "react";
import { Link } from "react-router-dom";
import JoinUsForm from "./JoinUsForm";

export default function Hero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative w-full flex items-center justify-center bg-white overflow-hidden px-4 py-12 md:py-16">
      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center py-8">
        {/* Main Title */}
        <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl mb-6 text-black leading-[1.1] max-w-5xl tracking-tight">
        Still stuck <span className="text-blue-600 font-extrabold">learning</span> Excel and Tally? It's time to move to AI
        </h1>

        {/* Subtitle with SEO keywords */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl font-normal leading-relaxed tracking-wide">
          Learn <strong>Python Programming</strong>, <strong>Data Science</strong>, <strong>Data Analytics</strong>, and <strong>AI Tools</strong>. Build. Automate. Master <strong>Coding</strong> Skills at Skillence - Best AI Coaching Center in Baghpat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center flex-wrap">
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            🚀 Join Us
          </button>
          <Link
            to="/syllabus"
            className="px-8 py-4 border border-gray-300 text-lg font-semibold rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            View full syllabus
          </Link>
        </div>
      </div>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </section>
  );
}
