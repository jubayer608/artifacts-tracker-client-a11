import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#fdf6e3] min-h-screen py-16 px-6 md:px-20 font-serif">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#5d4634] mb-6">
            About Artifacts Tracker
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover, document, and preserve the wonders of human history through our comprehensive artifact tracking platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-[#5d4634] mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Artifacts Tracker is dedicated to preserving and sharing the rich tapestry of human history. 
              We provide a platform where enthusiasts, researchers, and collectors can document, explore, 
              and learn about artifacts from around the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our community-driven approach ensures that every artifact tells its story, connecting us 
              to our past and inspiring future generations to appreciate the cultural heritage that 
              shapes our world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-[#5d4634] mb-4">What We Do</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-[#5d4634] text-xl">🏺</span>
                <span>Document and catalog historical artifacts with detailed information</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#5d4634] text-xl">🔍</span>
                <span>Provide advanced search and filtering capabilities</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#5d4634] text-xl">❤️</span>
                <span>Enable users to create personal collections and favorites</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#5d4634] text-xl">🤝</span>
                <span>Foster a community of artifact enthusiasts and experts</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-[#5d4634] mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you're a seasoned collector, a history enthusiast, or simply curious about the past, 
            Artifacts Tracker welcomes you to explore, learn, and contribute to our growing database of 
            historical treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] transition-all duration-200"
            >
              Get Started
            </a>
            <a
              href="/artifacts"
              className="btn btn-outline border-[#5d4634] text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3] transition-all duration-200"
            >
              Explore Artifacts
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;