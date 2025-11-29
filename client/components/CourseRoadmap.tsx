import React from "react";
import { Link } from "react-router-dom";

const CourseRoadmap = () => {
    const steps = [
        {
            month: "Month 1",
            label: "Foundation",
            title: "AI & Python Basics",
            desc: "Master AI fundamentals, set up your development environment, and build your first Python applications.",
            icon: "🧠",
            color: "blue",
            gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
            border: "border-blue-200/50",
            badgeBg: "bg-blue-500",
            badgeText: "text-blue-100",
            features: ["AI Fundamentals", "Python Mastery"],
        },
        {
            month: "Month 2",
            label: "Automation",
            title: "AI Tools & Bots",
            desc: "Leverage Python and 50+ AI tools to automate workflows, messaging, and business processes.",
            icon: "🤖",
            color: "purple",
            gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
            border: "border-purple-200/50",
            badgeBg: "bg-purple-500",
            badgeText: "text-purple-100",
            features: ["50+ AI Tools", "Smart Automation"],
        },
        {
            month: "Month 3",
            label: "Data Mastery",
            title: "Excel & Dashboards",
            desc: "Transform raw data into intelligent dashboards, visualizations, and actionable business insights.",
            icon: "📊",
            color: "emerald",
            gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
            border: "border-emerald-200/50",
            badgeBg: "bg-emerald-500",
            badgeText: "text-emerald-100",
            features: ["Data Analytics", "Visual Dashboards"],
        },
        {
            month: "Month 4",
            label: "Portfolio",
            title: "80+ Real Projects",
            desc: "Build production-ready AI assistants, automation systems, games, and portfolio-worthy applications.",
            icon: "🏆",
            color: "amber",
            gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
            border: "border-amber-200/50",
            badgeBg: "bg-amber-500",
            badgeText: "text-amber-100",
            features: ["Portfolio Ready", "Industry Projects"],
        },
    ];

    return (
        <section
            id="program"
            className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-bold">
                            The Skillence Roadmap
                        </p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
                        4‑Month <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Mastery</span> Journey
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        From absolute basics to professional‑grade AI projects.
                    </p>
                </div>

                {/* Timeline Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />

                    {steps.map((item, index) => (
                        <div key={item.month} className="relative group">
                            {/* Card Container */}
                            <div className="h-full bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden">

                                {/* Gradient Overlay on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Border Glow */}
                                <div className={`absolute inset-0 border-2 ${item.border} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Month Badge */}
                                <div className="flex items-center justify-between mb-5 relative z-10">
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${item.badgeBg} shadow-md`}>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${item.badgeText}`}>
                                            {item.month}
                                        </span>
                                    </div>
                                    <span className="text-3xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                                </div>

                                {/* Content */}
                                <div className="mb-5 flex-grow relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                    {item.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] font-semibold px-2.5 py-1 bg-white/80 border border-gray-100 rounded-md text-gray-700 shadow-sm group-hover:border-blue-100 transition-colors"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <Link
                        to="/syllabus"
                        className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        View Detailed Syllabus
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CourseRoadmap;
