import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6e3] to-[#f5f0e8] font-serif">
      <div className="text-center max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl md:text-9xl font-bold text-[#5d4634] mb-6 opacity-20">
            404
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The artifact you're looking for seems to have been lost in time. 
            Don't worry, our archaeological team is on it!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              <FiHome className="text-lg" />
              Go Home
            </Link>
            <Link
              to="/artifacts"
              className="btn btn-outline border-[#5d4634] text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3] px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              <FiSearch className="text-lg" />
              Browse Artifacts
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-ghost text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3] px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              <FiArrowLeft className="text-lg" />
              Go Back
            </button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            <p>If you believe this is an error, please contact our support team.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;