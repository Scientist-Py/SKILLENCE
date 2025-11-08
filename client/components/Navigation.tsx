import { useState } from "react";
import { Menu, X } from "lucide-react";
import JoinUsForm from "./JoinUsForm";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navItems = [
    { label: "Program", href: "#program" },
    { label: "Projects", href: "#projects" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "Method", href: "#method" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="font-semibold text-xl text-black hover:text-gray-600 transition-colors duration-300 cursor-pointer">
            Skillence
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={item.label === 'Pricing' ? undefined : handleNavClick}
                className="nav-link text-gray-600 hover:text-black font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-300 text-sm hover:scale-105 active:scale-95"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block text-gray-600 hover:text-black font-medium transition-all duration-300 text-sm hover:translate-x-2"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setShowForm(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-300 text-sm hover:scale-105 active:scale-95"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </nav>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </>
  );
}
