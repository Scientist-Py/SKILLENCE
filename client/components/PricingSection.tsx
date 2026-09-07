import { useState } from "react";
import { Check, Sparkles, Home } from "lucide-react";
import JoinUsForm from "./JoinUsForm";

export default function PricingSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section id="pricing" className="relative w-full py-16 md:py-24 px-4 bg-white">
        <div className="relative z-10 container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-14 text-center">
            <div className="inline-block mb-4">
              <span className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg">
                Simple & Affordable Fees
              </span>
            </div>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-black mb-4 tracking-tight leading-tight">
              Invest in High-Income AI & Tech Skills
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Complete 5-Month practical curriculum with 120+ projects, 1-on-1 mentorship, and verified certification.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full">
                    Flexible Monthly
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Monthly Plan</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Pay month-by-month as you learn. No long-term lock-in.
                </p>

                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-black">₹1,500</span>
                  <span className="text-gray-500 font-medium">/ month</span>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-gray-100 mb-8">
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>5 Months comprehensive program</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Access to 120+ real-world AI & coding projects</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Live 1-on-1 doubt solving & practical assignments</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Pay ₹1,500 per month for 5 months</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="w-full py-3.5 px-6 rounded-xl border-2 border-black text-black font-semibold hover:bg-gray-100 transition-all duration-200 text-center"
              >
                Enroll Monthly →
              </button>
            </div>

            {/* Complete 5-Month Master Plan (Featured) */}
            <div className="bg-black text-white p-8 md:p-10 rounded-3xl shadow-2xl relative flex flex-col justify-between transform md:-translate-y-2 border border-gray-800">
              {/* Badge */}
              <div className="absolute -top-4 right-8 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
                Best Value — Save ₹2,901
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-300 bg-white/10 px-3.5 py-1.5 rounded-full">
                    Complete 5-Month Program
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Full Program Plan</h3>
                <p className="text-sm text-gray-300 mb-6">
                  One-time payment for the full 5-month journey with maximum savings.
                </p>

                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-white">₹4,599</span>
                  <span className="text-gray-400 line-through text-lg">₹7,500</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded ml-2">
                    One-time
                  </span>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-gray-800 mb-8">
                  <div className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">Full 5-Month All-Inclusive Access</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>120+ Real Projects (Agents, Vision, RAG, CRM, POS, E-Challan)</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Personal GitHub portfolio building & code reviews</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Industry Recognized Course Completion Certificate</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Priority 1-on-1 mentorship & interview preparation</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 px-6 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-center"
              >
                Get Full 5-Month Pass →
              </button>
            </div>
          </div>

          {/* Location & Home Tuition Notice Banner */}
          <div className="mt-12 max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-xl flex-shrink-0">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-black mb-1">
                  🏠 Personal 1-on-1 Home Tuition Available (Only in Baghpat)
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Want the mentor to teach in person at your home? Home tuition slots are available exclusively for students residing in <strong className="text-black">Baghpat</strong>. Live interactive online batches are available everywhere else.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all text-sm whitespace-nowrap"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      </section>

      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </>
  );
}
