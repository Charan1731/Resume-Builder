
import { Link } from 'react-router-dom';
import { FileText, Brain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white via-indigo-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-indigo-200 to-pink-200 rounded-full opacity-30 blur-3xl -z-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-20 blur-3xl -z-10 animate-blob animation-delay-4000"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="block"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Build Your Perfect Resume
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Powered by AI
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Create professional resumes and get AI-powered suggestions to match your dream job requirements.
          </motion.p>
          
          <motion.div 
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link
              to="/builder"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:text-lg transition transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                icon: FileText,
                title: "Resume Builder",
                description: "Build your professional resume with our easy-to-use builder. Choose from various sections and customize your content."
              },
              {
                icon: Brain,
                title: "AI Analysis",
                description: "Get AI-powered suggestions to improve your resume based on job descriptions and identify missing keywords."
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="pt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2 + (index * 0.2) 
                }}
              >
                <div className="flow-root bg-gradient-to-br from-white to-indigo-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-lg transform transition hover:scale-110">
                        <feature.icon className="h-8 w-8 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;