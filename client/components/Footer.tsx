import { Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ContactPopup from "./ContactPopup";

export default function Footer() {
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <footer className="relative w-full bg-black border-t border-gray-800 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div>
              <h3 className="font-semibold text-2xl text-white mb-4">
                Skillence
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Master Artificial Intelligence in 4 months with 80+ real-world
                projects and industry-recognized certification.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#program" onClick={handleNavClick} className="footer-link text-gray-400 hover:text-white text-sm inline-block">Program</a>
                </li>
                <li>
                  <a href="#projects" onClick={handleNavClick} className="footer-link text-gray-400 hover:text-white text-sm inline-block">Projects</a>
                </li>
                <li>
                  <p className="text-gray-400 text-sm">Skillence is a leading provider of AI education, helping students to master the latest AI tools and technologies.</p>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#faq" onClick={handleNavClick} className="footer-link text-gray-400 hover:text-white text-sm inline-block">FAQ</a>
                </li>
                <li>
                  <button onClick={() => setShowContactPopup(true)} className="footer-link text-gray-400 hover:text-white text-sm inline-block">Contact</button>
                </li>
                <li>
                  <a href="#program" onClick={handleNavClick} className="footer-link text-gray-400 hover:text-white text-sm inline-block">Program Details</a>
                </li>
              </ul>
            </div>

                      {/* Social Links */}
                      <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Connect</h4>
                        <div className="space-y-3">
                          <a
                            href="mailto:skillence.info@gmail.com"
                            className="footer-link flex items-center gap-3 text-gray-400 hover:text-white text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            skillence.info@gmail.com
                          </a>
                          <a
                            href="https://instagram.com/Skillence.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link flex items-center gap-3 text-gray-400 hover:text-white text-sm"
                          >
                            <Instagram
                              size={18}
                              className="transition-transform duration-300 hover:scale-125"
                            />
                            @Skillence.ai
                          </a>
                        </div>
                      </div>          </div>

          {/* FAQ Section */}
          <div id="faq" className="border-t border-gray-800 pt-12">
            <h2 className="font-semibold text-2xl text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h4 className="font-semibold text-white mb-2">Is Skillence an online or offline coaching center?</h4>
                <p className="text-gray-400 text-sm">Skillence is an offline coaching center. We believe in providing personalized, hands-on learning to our students.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">What is the duration of the program?</h4>
                <p className="text-gray-400 text-sm">The program is 4 months long.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">What will I learn in this program?</h4>
                <p className="text-gray-400 text-sm">You will learn the fundamentals of AI, Python, and automation. You will also master 50+ AI tools and technologies.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">How many projects will I build?</h4>
                <p className="text-gray-400 text-sm">You will build over 80 real-world projects to showcase your skills.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">What kind of support will I get?</h4>
                <p className="text-gray-400 text-sm">We offer 24/7 support from our expert mentors.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Is this program suitable for beginners?</h4>
                <p className="text-gray-400 text-sm">Yes, this program is designed for beginners with no prior experience in AI or programming.</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
              <p>© 2025 Skillence – All Rights Reserved</p>
              <div className="flex gap-6 mt-4 sm:mt-0">
                <Link
                  to="/privacy-policy"
                  className="footer-link text-gray-500 hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="footer-link text-gray-500 hover:text-white"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showContactPopup && <ContactPopup onClose={() => setShowContactPopup(false)} />}
    </>
  );
}

