import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 px-4 font-serif">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</div>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-error/10 rounded-full">
              <FiAlertTriangle className="w-12 h-12 text-error" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-base-content/70 mb-8"
        >
          The page you're looking for might have been moved, deleted, or doesn't exist.
          Let's get you back on track!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="btn bg-primary text-primary-content hover:bg-primary/90 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FiHome className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to="/artifacts"
            className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-secondary-content px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FiSearch className="w-4 h-4" />
            Browse Artifacts
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 p-6 bg-base-200 rounded-2xl"
        >
          <h3 className="text-lg font-bold text-primary mb-3">Popular Pages</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/" className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content">
              Home
            </Link>
            <Link to="/artifacts" className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content">
              All Artifacts
            </Link>
            <Link to="/about" className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content">
              About
            </Link>
            <Link to="/search" className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content">
              Search
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;