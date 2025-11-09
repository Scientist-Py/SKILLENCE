export default function ResultsSection() {
  const outcomes = [
    {
      icon: "🏆",
      title: "10x Smarter",
      description:
        "After this course, you will be 10x smarter than other students and you will stand out of the crowd",
    },
    {
      icon: "💼",
      title: "Build Portfolio-Ready Projects",
      description:
        "Create 80+ real projects that showcase your skills",
    },
    {
      icon: "🤖",
      title: "Learn Python, AI & Automation",
      description:
        "Master AI fundamentals, automation workflows, and become a proficient developer",
    },
    {
      icon: "🌍",
      title: "Launch Freelancing Career",
      description:
        "Have the skills to land high-paying freelance projects in the AI and automation space",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-20 px-4 bg-white">
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-bold text-4xl md:text-5xl text-black mb-4 tracking-tight leading-tight">
            What You'll Achieve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            By the end of the program, you'll have the skills and
            portfolio to compete in the AI revolution
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] group cursor-pointer premium-shadow hover:premium-shadow-lg"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {outcome.icon}
              </div>
              <h3 className="font-bold text-2xl text-black mb-3 group-hover:text-gray-800 transition-colors duration-300 tracking-tight">
                {outcome.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-normal">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10">
          <div className="text-center p-5 md:p-7 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 group cursor-pointer premium-shadow hover:premium-shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300 tracking-tight">80+</div>
            <p className="text-sm md:text-base text-gray-600 font-semibold group-hover:text-gray-700 transition-colors duration-300">Real Projects</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md hover:bg-gray-50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <div className="text-3xl md:text-4xl font-semibold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">4</div>
            <p className="text-sm md:text-base text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">Modules</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md hover:bg-gray-50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <div className="text-3xl md:text-4xl font-semibold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">50+</div>
            <p className="text-sm md:text-base text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">Technologies and Tools</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md hover:bg-gray-50 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <div className="text-3xl md:text-4xl font-semibold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">24/7</div>
            <p className="text-sm md::text-base text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
