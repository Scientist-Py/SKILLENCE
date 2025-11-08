import { useState } from "react";
import JoinUsForm from "./JoinUsForm";

interface Project {
  title: string;
  icon: string;
}

interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
  projects: Project[];
}

const projectCategories: ProjectCategory[] = [
  {
    id: "personal",
    name: "Foundational Projects",
    icon: "🧠",
    projects: [
      { title: "Personal AI Assistant", icon: "🤖" },
      { title: "AI Notes Maker", icon: "📝" },
      { title: "AI Quiz Generator", icon: "❓" },
      { title: "AI Career Suggestion System", icon: "🎯" },
      { title: "Number Guessing Game", icon: "🎲" },
      { title: "Expense Tracker", icon: "💰" },
      { title: "Password Generator", icon: "🔐" },
      { title: "Keyword-to-Code Generator", icon: "⌨️" },
      { title: "Reminder App with Voice Alerts", icon: "🔔" },
      { title: "Weather & News API Assistant", icon: "🌤️" },
      { title: "Daily Task Voice Notifier", icon: "📢" },
      { title: "File Organizer Automation", icon: "📁" },
      { title: "Personal Finance Dashboard", icon: "💹" },
      { title: "AI Recipe Generator", icon: "🍳" },
      { title: "Fitness Tracker", icon: "🏋️" },
      { title: "Language Learning Assistant", icon: "🌍" },
    ],
  },
  {
    id: "automation",
    name: "Automation Systems",
    icon: "⚙️",
    projects: [
      { title: "Auto Message Sender", icon: "💬" },
      { title: "AI Customer Support Chatbot", icon: "🤖" },
      { title: "College Event Registration", icon: "🎓" },
      { title: "Admission Registration System", icon: "📋" },
      { title: "Auto Email Responder", icon: "📧" },
      { title: "Social Media Post Scheduler", icon: "📱" },
      { title: "AI Poster Creator", icon: "🖼️" },
      { title: "Google Sheet Report Generator", icon: "📊" },
      { title: "AI Lead Management Dashboard", icon: "📈" },
      { title: "Business Workflow Automation", icon: "⚡" },
    ],
  },
  {
    id: "vision",
    name: "Computer Vision",
    icon: "👁️‍🗨️",
    projects: [
      { title: "Face Detection System", icon: "👤" },
      { title: "Face Attendance System", icon: "✅" },
      { title: "Face Login System", icon: "🔓" },
      { title: "Hand Gesture Volume Control", icon: "🎚️" },
      { title: "Eye Blink Detector", icon: "👁️" },
      { title: "Traffic Sign Detector", icon: "🚦" },
      { title: "Virtual Painter", icon: "🎨" },
      { title: "Object Detection", icon: "📦" },
      { title: "Face Landmark AR Mask", icon: "😷" },
      { title: "People Counter", icon: "👥" },
      { title: "Smart Security Cam", icon: "📹" },
      { title: "Gesture Controlled Presentation", icon: "🎬" },
      { title: "Real-time Video Effects", icon: "✨" },
      { title: "Pose Detection System", icon: "🏃" },
    ],
  },
  {
    id: "voice",
    name: "Voice AI",
    icon: "🗣️",
    projects: [
      { title: "Voice AI Assistant (Jarvis)", icon: "🎙️" },
      { title: "Speech-to-Text Note Maker", icon: "📝" },
      { title: "Voice-Controlled YouTube", icon: "▶️" },
      { title: "AI Chatbot with Memory", icon: "💭" },
      { title: "Voice Reminder System", icon: "⏰" },
      { title: "Desktop Voice Automation", icon: "🖥️" },
      { title: "News & Weather Reader", icon: "📡" },
      { title: "Music Player with Voice Commands", icon: "🎵" },
      { title: "Translator AI with Voice", icon: "🌍" },
      { title: "Voice Calculator", icon: "🧮" },
    ],
  },
  {
    id: "games",
    name: "Games Using AI",
    icon: "🕹️",
    projects: [
      { title: "Rock–Paper–Scissors (Vision)", icon: "✊" },
      { title: "Snake Game (Hand Gestures)", icon: "🐍" },
      { title: "Flappy Bird Game", icon: "🐦" },
      { title: "AI Quiz Game", icon: "🎯" },
      { title: "Gesture-Based Drawing", icon: "🖌️" },
      { title: "Tic Tac Toe (AI vs Human)", icon: "⭕" },
      { title: "Puzzle Solver AI", icon: "🧩" },
      { title: "Memory Card Game", icon: "🎴" },
      { title: "AI Guess the Number", icon: "🔢" },
    ],
  },
  {
    id: "nocode",
    name: "No-Code Web/App",
    icon: "🌐",
    projects: [
      { title: "Portfolio Website", icon: "💼" },
      { title: "Business Landing Page", icon: "🏢" },
      { title: "Library Management System", icon: "📚" },
      { title: "Hospital Management System", icon: "🏥" },
      { title: "Student Attendance Portal", icon: "📖" },
      { title: "Course Registration Platform", icon: "🎓" },
      { title: "Restaurant Order Dashboard", icon: "🍔" },
      { title: "Resume Builder Website", icon: "📄" },
      { title: "Appointment Booking System", icon: "📅" },
      { title: "Smart To-Do Dashboard", icon: "✅" },
      { title: "Payment Simulation System", icon: "💳" },
      { title: "E-Commerce Product Catalog", icon: "🛍️" },
      { title: "AI Helpdesk Portal", icon: "🆘" },
      { title: "Feedback Collection System", icon: "📣" },
    ],
  },
];

export default function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("personal");
  const [showForm, setShowForm] = useState(false);
  const selected = projectCategories.find((cat) => cat.id === selectedCategory);

  return (
    <>
      <section className="relative w-full py-24 px-4 bg-gray-50">
        <div className="relative z-10 container mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="font-semibold text-4xl md:text-5xl text-black mb-4">
              80+ Real-World Projects
            </h2>
            <p className="text-lg text-gray-600">
              Build practical, portfolio-ready projects across multiple AI domains
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm hover:scale-105 active:scale-95 ${
                  selectedCategory === category.id
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-black border border-gray-200 hover:border-gray-400 hover:shadow-sm"
                }`}
              >
                <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {selected && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selected.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="project-tile bg-white p-6 rounded-lg border border-gray-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300 inline-block">
                      {project.icon}
                    </span>
                    <h3 className="text-black font-medium text-sm leading-snug group-hover:text-gray-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 rounded-lg text-white bg-black font-semibold border border-gray-300 hover:bg-gray-800 transition-all duration-300"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </section>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </>
  );
}
