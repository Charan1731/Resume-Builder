
import { Link } from 'react-router-dom';
import { FileText, Brain, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
                <FileText className="h-6 w-6" />
                <span>ResuMate</span>
              </Link>
            </motion.div>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to="/"
                  className="relative flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                >
                  <Home className="h-5 w-5 mr-1" />
                  <span>Home</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to="/builder"
                  className="relative flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                >
                  <FileText className="h-5 w-5 mr-1" />
                  <span>Resume Builder</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to="/ai-analysis"
                  className="relative flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                >
                  <Brain className="h-5 w-5 mr-1" />
                  <span>AI Analysis</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;