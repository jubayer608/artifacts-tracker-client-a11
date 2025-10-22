import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaUsers, FaGlobe, FaHeart } from 'react-icons/fa';

const stats = [
  {
    icon: <FaGem className="w-8 h-8" />,
    number: "15,000+",
    label: "Artifacts Documented",
    description: "Historical treasures from around the world"
  },
  {
    icon: <FaUsers className="w-8 h-8" />,
    number: "10,000+",
    label: "Active Users",
    description: "Researchers, curators, and enthusiasts"
  },
  {
    icon: <FaGlobe className="w-8 h-8" />,
    number: "50+",
    label: "Countries",
    description: "Global community of artifact lovers"
  },
  {
    icon: <FaHeart className="w-8 h-8" />,
    number: "100,000+",
    label: "Favorites",
    description: "Artifacts saved by our community"
  }
];

const StatsSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#5d4634] to-[#4b3727] py-20 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#fdf6e3] mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-[#e5ddca] text-lg max-w-2xl mx-auto">
            Discover the scale of our community's contribution to preserving and documenting historical artifacts worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-[#fdf6e3] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-[#5d4634] mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-2"
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-xl font-bold text-[#5d4634] mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-[#fdf6e3] rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#5d4634] mb-4">
              Be Part of Our Growing Community
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Join thousands of professionals and enthusiasts who are making history accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] font-semibold px-8 py-3 rounded-lg transition-all duration-200 border-0">
              >
                Start Your Journey
              </a>
              <a
                href="/about"
                className="btn btn-outline border-[#5d4634] text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3] font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;