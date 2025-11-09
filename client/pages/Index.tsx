import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import TimelineMonth from "../components/TimelineMonth";
import ProjectsGallery from "../components/ProjectsGallery";
import ResultsSection from "../components/ResultsSection";
import MethodSection from "../components/MethodSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function Index() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Program Overview - 4 Modules */}
        <div id="program">
          <TimelineMonth monthNumber={1} isDark={false} />
          <TimelineMonth monthNumber={2} isDark={false} />
          <TimelineMonth monthNumber={3} isDark={false} />
          <TimelineMonth monthNumber={4} isDark={false} />
        </div>

        {/* Projects Gallery */}
        <div id="projects">
          <ProjectsGallery />
        </div>

        {/* Results Section */}
        <div id="outcomes">
          <ResultsSection />
        </div>

        {/* Method Section */}
        <div id="method">
          <MethodSection />
        </div>

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
