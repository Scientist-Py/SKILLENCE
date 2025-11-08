import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  icon: string;
  title: string;
  topics: string[];
  completed?: boolean;
}

interface TimelineMonthProps {
  monthNumber: number;
  isDark?: boolean;
}

const monthData = {
  1: {
    title: "Introduction to Artificial Intelligence",
    subtitle: "Build strong conceptual foundation",
    modules: [
      {
        icon: "🧩",
        title: "The AI Revolution",
        topics: [
          "Understanding Artificial Intelligence Fundamentals",
          "Machine Learning vs Deep Learning vs AI",
          "Real-World Applications Across Industries",
          "Understanding the Societal Impact of AI",
          "The Future of Intelligent Systems",
        ],
      },

      {
        icon: "✍️",
        title: "AI in Your Study & Homework",
        topics: [
          "Using AI to do your homework",
          "AI for research and learning",
          "Impress your teachers with AI",
          "Get ahead in school with AI",
        ],
      },
      {
        icon: "⚙️",
        title: "Crafting Your AI Workspace",
        topics: [
          "Setting Up Python Development Environment",
          "Jupyter Notebook & Interactive Coding",
          "Choosing the Right IDE for Your Workflow",
          "Python Fundamentals & First Scripts",
          "Debugging & Error Handling Mastery",
          "AI-Powered Coding Assistants",
          "Automating Your Development Process",
        ],
      },
      {
        icon: "💻",
        title: "Python Programming Essentials",
        topics: [
          "Data Types & Variable Management",
          "Input/Output & User Interaction",
          "Mathematical Operations & Expressions",
          "Conditional Logic & Decision Making",
          "Loops & Iteration Techniques",
          "Data Structures: Lists, Tuples & Dictionaries",
        ],
      },
      {
        icon: "🚀",
        title: "Your First AI Projects",
        topics: [
          "Interactive Quiz Master",
          "Smart Calculator",
          "Strategic Tic-Tac-Toe",
        ],
      },
      {
        icon: "🛠️",
        title: "Tools and Technologies",
        topics: [
          "GitHub",
          "Python",
          "50+ AI Tools",
          "Automation",
          "And more...",
        ],
      },
    ],
  },
  2: {
    title: "Advanced Python & AI Integration",
    subtitle: "Level up your Python skills",
    modules: [
      {
        icon: "🧩",
        title: "Advanced Python Foundations",
        topics: [
          "Functions with Parameters & Return Values",
          "Importing Libraries Efficiently",
          "Error Handling Like a Pro",
          "Working with JSON and Data Structures",
          "Using APIs in Python",
          "GET and POST Requests",
        ],
      },
      {
        icon: "🤖",
        title: "Smart Automation with Python",
        topics: [
          "Automating WhatsApp & Telegram Messaging",
          "Automating Emails Using Python",
          "Scheduling Tasks with Python",
          "Auto WhatsApp Message Sender",
          "Email Automation Bot",
          "Task Scheduler",
        ],
      },
      {
        icon: "🧱",
        title: "No-Code and Low-Code AI Development",
        topics: [
          "Why 'No-Code' Coding Vibes Matter",
          "Exploring One-Click Website Creator Tools",
          "Creating a Simple AI-Powered Website or Dashboard",
        ],
      },
      {
        icon: "🎨",
        title: "Creative AI Tools & Prompt Engineering",
        topics: [
          "Using ChatGPT & Other 50+ AI Tools",
          "Prompt Engineering Basics",
          "Using AI Tools for Image, Poster, and Card Generation",
          "Creating Infographic and Visual Content",
        ],
      },
      {
        icon: "🌐",
        title: "Python Meets the Web",
        topics: [
          "Converting Python Automation Scripts into Websites",
          "Connecting APIs to Websites or Dashboards",
          "Managing Projects, Tasks, Assignments, and Deadlines",
          "Building a Simple E-Commerce Website",
        ],
      },
    ],
  },
  3: {
    title: "Data Analytics & Visualization with Excel",
    subtitle: "Transform data into insights",
    modules: [
      {
        icon: "🧠",
        title: "Excel Fundamentals & Smart Formulas",
        topics: [
          "Why AI in Excel?",
          "Excel Interface Overview",
          "Entering & Formatting Data",
          "Basic Formulas (MIN, MAX, VLOOKUP, HLOOKUP, SUM, AVERAGE)",
          "Managing Rows & Columns",
        ],
      },
      {
        icon: "🧹",
        title: "Data Cleaning & Preparation",
        topics: [
          "Sorting & Filtering Datasets",
          "Removing Duplicates",
          "Handling Missing or Incorrect Data",
          "Conditional Formatting for Visual Insights",
        ],
      },
      {
        icon: "📈",
        title: "Data Visualization with Charts",
        topics: [
          "Creating Bar, Pie, and Column Charts",
          "Customizing Charts",
          "Visualizing Trends in Datasets",
          "Introduction to Dynamic Charts",
        ],
      },
      {
        icon: "📊",
        title: "Pivot Tables & Advanced Analysis",
        topics: [
          "Pivot Tables – Grouping Data & Summarizing Information",
          "Pivot Charts for Visual Analysis",
          "Calculations in Pivot Tables",
        ],
      },
      {
        icon: "🚀",
        title: "Dashboard Design & Python Integration",
        topics: [
          "Designing Interactive Dashboards",
          "Combining Pivot Tables & Charts",
          "Applying Slicers for Data Filters",
          "Exporting Clean Datasets to CSV",
          "Python Integration with Excel",
        ],
      },
    ],
  },
  4: {
    title: "AI & Automation Project Mastery",
    subtitle: "100% Applied Learning Month",
    modules: [
      {
        icon: "🧠",
        title: "Personal & Functional AI Projects",
        topics: [
          "Personal AI Assistant",
          "AI Notes Maker",
          "AI Quiz Generator",
          "AI Career Suggestion System",
          "Expense Tracker",
          "Reminder App with Voice Alerts",
          "Weather & News API Assistant",
        ],
      },
      {
        icon: "⚙️",
        title: "Automation & No-Code AI Systems",
        topics: [
          "Auto Message Sender (WhatsApp / Telegram)",
          "AI Customer Support Chatbot (No-Code)",
          "College Event Registration System",
          "Admission Registration System",
          "Social Media Post Scheduler",
          "AI Lead Management Dashboard",
        ],
      },
      {
        icon: "👁️‍🗨️",
        title: "Computer Vision & Face-Based Projects",
        topics: [
          "Face Detection and Recognition System",
          "Face Attendance System",
          "Hand Gesture Volume Control",
          "Eye Blink Detector (Anti Sleep System)",
          "Virtual Painter using Hand Gestures",
          "Smart Security Cam (Face-Based Alerts)",
        ],
      },
      {
        icon: "🗣️",
        title: "Voice AI & Conversational Projects",
        topics: [
          "Voice AI Assistant (Jarvis)",
          "Speech-to-Text Note Maker",
          "Voice-Controlled YouTube / System Apps",
          "AI Chatbot with Memory",
          "Voice Reminder System",
          "News & Weather Reader (API Integration)",
        ],
      },
      {
        icon: "🕹️",
        title: "AI Games & Fun Applications",
        topics: [
          "Rock–Paper–Scissors (Vision)",
          "Snake Game (with Hand Gestures)",
          "Flappy Bird Game",
          "AI Quiz Game",
          "Gesture-Based Drawing App",
          "Tic Tac Toe (AI vs Human)",
        ],
      },
      {
        icon: "🌐",
        title: "No-Code Website & System Builders",
        topics: [
          "Portfolio Website",
          "Business Landing Page",
          "Library Management System (No-Code)",
          "Hospital Management System (No-Code)",
          "Student Attendance Portal",
          "Restaurant Order Dashboard",
          "E-Commerce Product Catalog",
        ],
      },
    ],
  },
};

const getModuleDescription = (title: string, topics: string[]): string => {
  // Simple description generator based on module content
  const firstTopic = topics[0]?.toLowerCase() || '';
  if (firstTopic.includes('introduction') || firstTopic.includes('fundamentals')) {
    return 'Learn the core concepts and build a strong foundation';
  } else if (firstTopic.includes('workspace') || firstTopic.includes('setup')) {
    return 'Set up your development environment and essential tools';
  } else if (firstTopic.includes('programming') || firstTopic.includes('python')) {
    return 'Master essential programming concepts and techniques';
  } else if (firstTopic.includes('automation') || firstTopic.includes('smart')) {
    return 'Create intelligent automation solutions';
  } else if (firstTopic.includes('project') || firstTopic.includes('build')) {
    return 'Hands-on projects to apply your knowledge';
  } else if (firstTopic.includes('data') || firstTopic.includes('analysis')) {
    return 'Work with data and extract meaningful insights';
  } else if (firstTopic.includes('visualization') || firstTopic.includes('charts')) {
    return 'Create compelling data visualizations';
  } else if (firstTopic.includes('dashboard') || firstTopic.includes('report')) {
    return 'Build interactive dashboards and reports';
  } else if (firstTopic.includes('api') || firstTopic.includes('integration')) {
    return 'Connect and integrate with external services';
  }
  return 'Practical skills and real-world applications';
};

const ModuleCard = ({ module, index, isDark }: { module: Module; index: number; isDark: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className={cn(
        "rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 active:scale-[0.99]",
        isDark ? "bg-gray-900 border-gray-800" : "bg-white shadow-sm active:shadow-md"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        className={cn(
          "w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left active:bg-opacity-50",
          isDark ? "active:bg-gray-800/50" : "active:bg-gray-50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <div className={cn(
            "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl",
            isDark ? "bg-gray-800" : "bg-blue-50 text-blue-600"
          )}>
            {module.icon}
          </div>
          <div>
            <h3 className={cn("font-semibold text-base sm:text-lg leading-tight", isDark ? "text-white" : "text-gray-900")}>
              {module.title}
            </h3>
            <p className={cn("text-xs sm:text-sm mt-0.5 line-clamp-2 leading-tight", isDark ? "text-gray-400" : "text-gray-600")}>
              {getModuleDescription(module.title, module.topics)}
            </p>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className={cn("h-5 w-5", isDark ? "text-gray-400" : "text-gray-500")} />
          ) : (
            <ChevronDown className={cn("h-5 w-5", isDark ? "text-gray-400" : "text-gray-500")} />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("overflow-hidden", isDark ? "bg-gray-900" : "bg-white")}
          >
            <div className={cn("px-4 sm:px-6 pb-5 sm:pb-6 pt-1.5 border-t", isDark ? "border-gray-800" : "border-gray-100")}>
              <ul className="space-y-3">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-start py-1">
                    <span className={cn("text-blue-500 font-bold mr-2 text-xs sm:text-sm")}>•</span>
                    <span className={cn("text-xs sm:text-sm leading-relaxed", isDark ? "text-gray-300" : "text-gray-700")}>
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function TimelineMonth({ monthNumber, isDark = false }: TimelineMonthProps) {
  const data = monthData[monthNumber as keyof typeof monthData];
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  if (!data) return null;

  // Add completion status to modules
  const modulesWithStatus = data.modules.map((module, index) => ({
    ...module,
    completed: completedModules.includes(index)
  }));

  const toggleModuleCompletion = (index: number) => {
    if (completedModules.includes(index)) {
      setCompletedModules(completedModules.filter(i => i !== index));
    } else {
      setCompletedModules([...completedModules, index]);
    }
  };

  const progress = modulesWithStatus.length > 0 
    ? (modulesWithStatus.filter(m => m.completed).length / modulesWithStatus.length) * 100 
    : 0;

  return (
    <section className={cn("relative w-full py-8 px-3 sm:py-12 md:py-16 md:px-4 lg:py-20", isDark ? "bg-gray-950 text-white" : "bg-white text-black")}>
      <div className="relative z-10 container mx-auto max-w-6xl px-2 sm:px-4">
        {/* Month Header */}
        <div className="mb-12 text-center">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              {data.title}
            </h2>
            <div className={cn(
              "inline-flex items-center justify-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base",
              isDark ? "bg-blue-900/20 text-blue-300" : "bg-blue-50 text-blue-600"
            )}>
              <span className="font-medium">
                Month {monthNumber}
              </span>
            </div>
          </div>
          <p className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
            {data.subtitle}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
          {modulesWithStatus.map((module, index) => (
            <ModuleCard 
              key={index} 
              module={module} 
              index={index} 
              isDark={isDark} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
