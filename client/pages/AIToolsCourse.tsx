import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Code, Brain, Database, Bot, Image, MessageSquare, Video } from 'lucide-react';
import JoinUsForm from '../components/JoinUsForm';


type AITool = {
  name: string;
  category: string;
  description: string;
  icon: JSX.Element;
};

const categories = [
  { name: 'AI Coding', icon: <Code className="w-5 h-5" /> },
  { name: 'Machine Learning', icon: <Brain className="w-5 h-5" /> },
  { name: 'Data Analysis', icon: <Database className="w-5 h-5" /> },
  { name: 'Chat & Text', icon: <MessageSquare className="w-5 h-5" /> },
  { name: 'Image Generation', icon: <Image className="w-5 h-5" /> },
  { name: 'Video & Audio', icon: <Video className="w-5 h-5" /> },
];

const tools: AITool[] = [
  // AI Coding Tools
  { name: 'GitHub Copilot', category: 'AI Coding', description: 'AI pair programmer that helps you write better code', icon: <Code /> },
  { name: 'Amazon CodeWhisperer', category: 'AI Coding', description: 'AI coding companion that generates code suggestions', icon: <Code /> },
  
  // Machine Learning
  { name: 'Google Colab', category: 'Machine Learning', description: 'Cloud-based Jupyter notebook environment', icon: <Brain /> },
  { name: 'Kaggle', category: 'Machine Learning', description: 'Platform for data science competitions and datasets', icon: <Brain /> },
  
  // Data Analysis
  { name: 'Tableau', category: 'Data Analysis', description: 'Data visualization and business intelligence tool', icon: <Database /> },
  { name: 'Power BI', category: 'Data Analysis', description: 'Business analytics service by Microsoft', icon: <Database /> },
  
  // Chat & Text
  { name: 'ChatGPT', category: 'Chat & Text', description: 'Advanced conversational AI by OpenAI', icon: <MessageSquare /> },
  { name: 'Claude', category: 'Chat & Text', description: 'AI assistant focused on helpful, honest, and harmless responses', icon: <MessageSquare /> },
  
  // Image Generation
  { name: 'DALL-E', category: 'Image Generation', description: 'AI system that creates realistic images from text', icon: <Image /> },
  { name: 'Midjourney', category: 'Image Generation', description: 'AI program that generates images from natural language descriptions', icon: <Image /> },
  
  // Video & Audio
  { name: 'Runway ML', category: 'Video & Audio', description: 'AI tools for video and image generation', icon: <Video /> },
  { name: 'Synthesia', category: 'Video & Audio', description: 'AI video generation platform', icon: <Video /> },
];

export default function AIToolsCourse() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Still stuck learning Excel and Tally?</h1>
          <p className="text-2xl md:text-3xl mb-8 font-semibold">It's time to move to AI</p>
          <p className="text-xl md:text-2xl mb-8 bg-white/10 inline-block px-6 py-3 rounded-full">Learn. Build. Automate. Master AI Skills.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl font-bold">80+</div>
              <div className="text-sm">Real Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm">Modules</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm">AI Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Industry Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categoryTools = tools.filter(tool => tool.category === category.name);
            return (
              <motion.div 
                key={category.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                  
                  <ul className="space-y-3 mt-4">
                    {categoryTools.map((tool) => (
                      <li key={tool.name} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-medium">{tool.name}</span>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {categoryTools.length < 3 && (
                    <div className="mt-4 text-sm text-gray-500">
                      + {10 - categoryTools.length} more tools in this category
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Course Outcomes Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Course Outcomes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">What You'll Achieve</h3>
              <p className="text-gray-600">By the end of the program, you'll have the skills and portfolio to compete in the AI revolution.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">10x Smarter</h3>
              <p className="text-gray-600">After this course, you will be 10x smarter than other students and you will stand out of the crowd.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Build Portfolio-Ready Projects</h3>
              <p className="text-gray-600">Create 80+ real projects that showcase your skills.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Learn Python, AI & Automation</h3>
              <p className="text-gray-600">Master AI fundamentals, automation workflows, and become a proficient developer.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Launch Freelancing Career</h3>
              <p className="text-gray-600">Have the skills to land high-paying freelance projects in the AI and automation space.</p>
            </div>
          </div>
        </div>
      </div>



      {/* Course Details Section */}
      <div id="course-details" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Course Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Hands-on Learning</h3>
                <p className="text-gray-600">Work on real-world projects using the latest AI tools and technologies.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Expert Mentorship</h3>
                <p className="text-gray-600">Learn from industry experts with years of experience in AI and machine learning.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Career Support</h3>
                <p className="text-gray-600">Get assistance with resume building, interview preparation, and job placement.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
                <p className="text-gray-600">Access course materials online and learn at your own pace with lifetime access.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">5x Smarter</h3>
                <p className="text-gray-600">Our program is designed to make you 5x smarter than your peers.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Stand Out</h3>
                <p className="text-gray-600">With our expert guidance, you will stand out from the crowd and get your dream job.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Master AI Tools?</h2>
          <p className="text-xl mb-8">Join our comprehensive program and get hands-on experience with 50+ AI tools</p>
          <div className="space-x-4 mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg ml-4"
            >
              🚀 Join Us
            </motion.button>
          </div>
        </div>
      </div>
      {showForm && <JoinUsForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

