import { Check } from 'lucide-react';

export default function MethodSection() {
  return (
    <section id="method" className="relative w-full py-16 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50/30">
      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-4xl md:text-5xl text-black mb-4 tracking-tight leading-tight">
            Our Method
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            We believe in a hands-on, project-based approach to learning.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 premium-shadow hover:premium-shadow-lg">
            <h3 className="font-bold text-2xl text-black mb-4 tracking-tight">Become a Fully Smart Student</h3>
            <p className="text-gray-600 mb-4">Our program will help you to become a fully smart student. You will learn how to use AI to do your homework, research, and much more.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Get ahead in school</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Impress your teachers</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 premium-shadow hover:premium-shadow-lg">
            <h3 className="font-bold text-2xl text-black mb-4 tracking-tight">Hands-on Approach</h3>
            <p className="text-gray-600 mb-4">We focus on practical skills that you can apply immediately in the real world. You'll learn by doing, not by watching.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>24/7 support from mentors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Personalized feedback</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
