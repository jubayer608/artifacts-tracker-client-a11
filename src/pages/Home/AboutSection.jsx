import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiGlobe, FiShield, FiHeart } from 'react-icons/fi';

const AboutSection = () => {
  const features = [
    {
      icon: FiUsers,
      title: "Community Driven",
      description: "Join thousands of archaeologists, historians, and enthusiasts sharing knowledge and discoveries."
    },
    {
      icon: FiGlobe,
      title: "Global Reach",
      description: "Access artifacts from museums and collections worldwide, all in one comprehensive platform."
    },
    {
      icon: FiShield,
      title: "Verified Sources",
      description: "All artifacts are verified by experts and sourced from reputable institutions and collections."
    },
    {
      icon: FiHeart,
      title: "Preservation Focus",
      description: "Dedicated to preserving and documenting human history for future generations."
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-6 font-serif">
            About Artifacts Tracker
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We are passionate about preserving and sharing the world's cultural heritage. 
            Our platform connects history enthusiasts, researchers, and institutions to 
            document, explore, and celebrate the artifacts that tell the story of human civilization.
          </p>
        </motion.div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl hover:bg-[#fdf6e3]/50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5d4634] text-[#fdf6e3] rounded-full mb-4">
                <feature.icon className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5d4634] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#5d4634] to-[#4b3727] rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
            Join Our Mission
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Help us preserve history by contributing to our growing database of artifacts, 
            sharing your knowledge, and connecting with fellow history enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#fdf6e3] text-[#5d4634] px-8 py-3 rounded-lg font-medium hover:bg-[#f5f0e8] transition-all duration-300">
              Start Exploring
            </button>
            <button className="border-2 border-[#fdf6e3] text-[#fdf6e3] px-8 py-3 rounded-lg font-medium hover:bg-[#fdf6e3] hover:text-[#5d4634] transition-all duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;