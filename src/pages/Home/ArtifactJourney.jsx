import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const timeline = [
  {
    title: "Discovery",
    description:
      "The artifact was discovered during a rural excavation in the Middle East.",
    icon: <FaMapMarkerAlt className="text-3xl text-[#5d4634] mb-2" />,
  },
  {
    title: "Dating & Analysis",
    description:
      "Carbon dating placed the artifact at around 1200 BCE, indicating Bronze Age origins.",
    icon: <FaClock className="text-3xl text-[#5d4634] mb-2" />,
  },
  {
    title: "Restoration",
    description:
      "A meticulous process of cleaning, reconstruction, and preservation was carried out.",
    icon: <FaCheckCircle className="text-3xl text-[#5d4634] mb-2" />,
  },
  {
    title: "Exhibition",
    description:
      "Now displayed in the National Historical Museum, drawing thousands of visitors.",
    icon: <FaCheckCircle className="text-3xl text-[#5d4634] mb-2" />,
  },
];

const ArtifactJourney = () => {
  return (
    <section className="bg-[#fdf6e3] my-14 py-20 px-6 md:px-20 font-serif">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#5d4634] dark:text-[#d4a017] mb-4">
          Journey of a Historical Artifact
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Follow the timeline of how an ancient artifact moves from excavation to exhibition.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-2">
        {timeline.map((step, idx) => (
          <motion.div
            key={idx}
            className="p-6 bg-base-100 border-l-4 border-primary rounded-lg shadow-md hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="flex flex-col items-start text-left">
              {step.icon}
              <h3 className="text-xl font-bold text-[#5d4634] dark:text-[#d4a017] mb-1">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ArtifactJourney;