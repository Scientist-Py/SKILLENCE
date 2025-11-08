import { Check } from 'lucide-react';

export default function MethodSection() {
  return (
    <section id="method" className="relative w-full py-24 px-4 bg-white">
      <div className="relative z-10 container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-semibold text-4xl md:text-5xl text-black mb-4">
            Our Method
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in a hands-on, project-based approach to learning.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-2xl text-black mb-4">Become a Fully Smart Student</h3>
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
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-2xl text-black mb-4">Hands-on Approach</h3>
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
