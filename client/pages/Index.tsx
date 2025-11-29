import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import ProjectsGallery from "../components/ProjectsGallery";
import ResultsSection from "../components/ResultsSection";
import MethodSection from "../components/MethodSection";
import CTASection from "../components/CTASection";
import LocationSection from "../components/LocationSection";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Chatbot from "../components/Chatbot";
import CourseRoadmap from "../components/CourseRoadmap";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="w-full min-h-screen bg-white">
      <SEO
        title="Skillence - AI & Coding Courses in Baghpat | Best Coaching Institute"
        description="Best AI coaching institute in Baghpat. Join Skillence for top-rated AI courses, computer courses, and coding classes in Baghpat. Learn Python, automation, and web development."
        keywords="ai coaching institute in baghpat, ai classes in baghpat, coding classes baghpat, computer courses in baghpat, best computer institute in baghpat, python course baghpat, web development course baghpat, data analytics course baghpat, programming classes baghpat, skillence baghpat"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Skillence",
          "url": "https://skillence.com",
          "description": "Premier AI and coding coaching institute in Baghpat offering professional courses in Python, AI, and Automation.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Baghpat",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "28.9460",
            "longitude": "77.2240"
          },
          "sameAs": [
            "https://www.facebook.com/skillence",
            "https://www.instagram.com/skillence"
          ]
        })}
      />
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Program Overview - Premium 4-step journey */}
        <CourseRoadmap />

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

        {/* Location Section */}
        <LocationSection />

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
