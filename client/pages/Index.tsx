import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import ProjectsGallery from "../components/ProjectsGallery";
import ResultsSection from "../components/ResultsSection";
import MethodSection from "../components/MethodSection";
import CTASection from "../components/CTASection";
import LocationSection from "../components/LocationSection";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Program Overview - Premium 4-step journey */}
        <section
          id="program"
          className="py-16 md:py-24 bg-white text-gray-900 relative overflow-hidden"
        >
          {/* Premium background effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 blur-[120px] rounded-full" />
          </div>

          <div className="relative container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-16">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-blue-600 mb-4 font-bold">
                The Skillence Roadmap
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
                4‑Month AI Mastery Journey
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We take you step‑by‑step from absolute basics to building
                professional‑grade AI and automation projects that you can
                show in your portfolio. Learn <strong>Python programming</strong>, <strong>Data Science</strong>, <strong>Data Analytics</strong>, and <strong>AI tools</strong> at the best <strong>AI coaching center in Baghpat</strong>.
              </p>
              
              {/* Premium Outcome Badge */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 px-6 py-4 shadow-lg">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-md">
                  🚀
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Final Outcome</p>
                  <p className="text-base font-bold text-gray-900">
                    80+ Portfolio Projects
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Timeline Cards */}
            <div className="relative">
              {/* Elegant connecting line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
              </div>

              <div className="grid gap-6 md:gap-8 lg:grid-cols-4 relative">
                {[
                  {
                    month: "Month 1",
                    label: "Foundation",
                    title: "AI & Python Basics",
                    desc: "Master AI fundamentals, set up your development environment, and build your first Python applications.",
                    icon: "🧠",
                    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
                    glowGradient: "from-blue-400 to-blue-600",
                    dotBg: "bg-blue-500",
                    dotShadow: "shadow-blue-500/50",
                    badgeGradient: "from-blue-50 to-blue-100/50",
                    badgeBorder: "border-blue-200/50",
                    monthBg: "bg-blue-500",
                    labelText: "text-blue-700",
                    iconGradient: "from-blue-100 to-blue-50",
                    iconBorder: "border-blue-200/50",
                    featureBg: "bg-blue-50/50",
                    featureBorder: "border-blue-100",
                    featureText: "text-blue-700",
                    features: ["AI Fundamentals", "Python Mastery"],
                  },
                  {
                    month: "Month 2",
                    label: "Automation",
                    title: "AI Tools & Bots",
                    desc: "Leverage Python and 50+ AI tools to automate workflows, messaging, and business processes.",
                    icon: "🤖",
                    gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
                    glowGradient: "from-purple-400 to-purple-600",
                    dotBg: "bg-purple-500",
                    dotShadow: "shadow-purple-500/50",
                    badgeGradient: "from-purple-50 to-purple-100/50",
                    badgeBorder: "border-purple-200/50",
                    monthBg: "bg-purple-500",
                    labelText: "text-purple-700",
                    iconGradient: "from-purple-100 to-purple-50",
                    iconBorder: "border-purple-200/50",
                    featureBg: "bg-purple-50/50",
                    featureBorder: "border-purple-100",
                    featureText: "text-purple-700",
                    features: ["50+ AI Tools", "Smart Automation"],
                  },
                  {
                    month: "Month 3",
                    label: "Data Mastery",
                    title: "Excel & Dashboards",
                    desc: "Transform raw data into intelligent dashboards, visualizations, and actionable business insights.",
                    icon: "📊",
                    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
                    glowGradient: "from-emerald-400 to-emerald-600",
                    dotBg: "bg-emerald-500",
                    dotShadow: "shadow-emerald-500/50",
                    badgeGradient: "from-emerald-50 to-emerald-100/50",
                    badgeBorder: "border-emerald-200/50",
                    monthBg: "bg-emerald-500",
                    labelText: "text-emerald-700",
                    iconGradient: "from-emerald-100 to-emerald-50",
                    iconBorder: "border-emerald-200/50",
                    featureBg: "bg-emerald-50/50",
                    featureBorder: "border-emerald-100",
                    featureText: "text-emerald-700",
                    features: ["Data Analytics", "Visual Dashboards"],
                  },
                  {
                    month: "Month 4",
                    label: "Portfolio",
                    title: "80+ Real Projects",
                    desc: "Build production-ready AI assistants, automation systems, games, and portfolio-worthy applications.",
                    icon: "🏆",
                    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
                    glowGradient: "from-amber-400 to-amber-600",
                    dotBg: "bg-amber-500",
                    dotShadow: "shadow-amber-500/50",
                    badgeGradient: "from-amber-50 to-amber-100/50",
                    badgeBorder: "border-amber-200/50",
                    monthBg: "bg-amber-500",
                    labelText: "text-amber-700",
                    iconGradient: "from-amber-100 to-amber-50",
                    iconBorder: "border-amber-200/50",
                    featureBg: "bg-amber-50/50",
                    featureBorder: "border-amber-100",
                    featureText: "text-amber-700",
                    features: ["Portfolio Ready", "Industry Projects"],
                  },
                ].map((item, index) => (
                  <div
                    key={item.month}
                    className="relative group"
                  >
                    {/* Premium Card */}
                    <div className="relative h-full rounded-3xl bg-white border border-gray-200/80 p-6 md:p-7 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                      {/* Subtle gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Premium glow effect */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.glowGradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                      {/* Connector dot for desktop */}
                      <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className={`h-4 w-4 rounded-full ${item.dotBg} shadow-lg ${item.dotShadow}`} />
                      </div>

                      <div className="relative z-10">
                        {/* Premium Badge */}
                        <div className="mb-5">
                          <div className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r ${item.badgeGradient} border ${item.badgeBorder} px-4 py-1.5`}>
                            <span className={`${item.monthBg} text-white rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] font-bold`}>
                              {item.month}
                            </span>
                            <span className={`${item.labelText} text-xs font-bold`}>{item.label}</span>
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="mb-4">
                          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconGradient} border-2 ${item.iconBorder} text-3xl shadow-md`}>
                            <span>{item.icon}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="mb-6">
                          <h3 className="text-lg md:text-xl font-bold leading-tight text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {/* Premium Features */}
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center px-3 py-1 rounded-lg ${item.featureBg} border ${item.featureBorder} text-xs font-semibold ${item.featureText}`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-16 text-center">
              <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
                Every month culminates with a{" "}
                <span className="font-bold text-blue-600">
                  capstone project
                </span>{" "}
                — ensuring you don&apos;t just learn concepts, but actually build
                real, portfolio-worthy applications.
              </p>
              <Link
                to="/syllabus"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                View Detailed Syllabus
                <span className="text-xl leading-none">→</span>
              </Link>
            </div>
          </div>
        </section>

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
