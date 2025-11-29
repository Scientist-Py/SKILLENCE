import { useEffect } from "react";
import Navigation from "../components/Navigation";
import TimelineMonth from "../components/TimelineMonth";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function Syllabus() {
  // Always start this page from the top when user clicks "Full syllabus"
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Navigation />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 max-w-5xl text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Full Course Syllabus
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore everything you&apos;ll learn in our 4‑month AI, Python, and
            Automation program &mdash; from foundations to 80+ real‑world
            projects.
          </p>
        </section>

        {/* Detailed Modules from start (Month 1 → Month 4) */}
        <div className="space-y-2">
          <TimelineMonth monthNumber={1} isDark={false} />
          <TimelineMonth monthNumber={2} isDark={false} />
          <TimelineMonth monthNumber={3} isDark={false} />
          <TimelineMonth monthNumber={4} isDark={false} />
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}



