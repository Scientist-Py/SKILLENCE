import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ModuleCardProps {
  icon: string;
  title: string;
  topics: string[];
  isDark?: boolean;
}

export default function ModuleCard({
  icon,
  title,
  topics,
  isDark = false,
}: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`p-6 rounded-lg cursor-pointer module-card-hover group ${
        isDark
          ? "bg-gray-800 text-white border border-gray-700 hover:border-gray-600 hover:bg-gray-750"
          : "bg-white text-black border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Module Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-4xl">{icon}</span>
          <div className="flex-1">
            <h3
              className={`font-semibold text-lg ${isDark ? "text-white" : "text-black"}`}
            >
              {title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
          size={20}
        />
      </div>

      {/* Topics List - Expandable */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div
          className={`pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <ul className="space-y-2">
            {topics.map((topic, idx) => (
              <li
                key={idx}
                className={`text-sm flex items-start gap-2 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <span className="mt-1">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
