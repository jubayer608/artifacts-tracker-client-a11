import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiGlobe, FiShield, FiHeart, FiAward, FiTarget } from 'react-icons/fi';

const AboutPage = () => {
  const stats = [
    { number: '10,000+', label: 'Artifacts Catalogued' },
    { number: '500+', label: 'Active Researchers' },
    { number: '50+', label: 'Partner Museums' },
    { number: '25+', label: 'Countries Represented' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Archaeologist',
      bio: 'Leading expert in ancient civilizations with 20+ years of field experience.',
      avatar: '👩‍🔬'
    },
    {
      name: 'Prof. James Wilson',
      role: 'Art Historian',
      bio: 'Specialist in medieval art and cultural preservation.',
      avatar: '👨‍🏫'
    },
    {
      name: 'Emma Thompson',
      role: 'Digital Curator',
      bio: 'Expert in digital preservation and museum technology.',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Conservation Specialist',
      bio: 'Master conservator with expertise in artifact restoration.',
      avatar: '👨‍🔧'
    }
  ];

  const values = [
    {
      icon: FiShield,
      title: 'Authenticity',
      description: 'We ensure all artifacts are verified by experts and sourced from reputable institutions.'
    },
    {
      icon: FiHeart,
      title: 'Preservation',
      description: 'Our mission is to preserve and document human history for future generations.'
    },
    {
      icon: FiUsers,
      title: 'Community',
      description: 'We foster a global community of researchers, enthusiasts, and cultural institutions.'
    },
    {
      icon: FiGlobe,
      title: 'Accessibility',
      description: 'Making cultural heritage accessible to everyone, everywhere in the world.'
    }
  ];

  return (
    <div className="bg-[#fdf6e3] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#5d4634] to-[#4b3727] py-20 px-6 md:px-20 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
              About Artifacts Tracker
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Preserving History, One Artifact at a Time
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto leading-relaxed">
              We are passionate about preserving and sharing the world's cultural heritage. 
              Our platform connects history enthusiasts, researchers, and institutions to 
              document, explore, and celebrate the artifacts that tell the story of human civilization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5d4634] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#5d4634] mb-6 font-serif">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              To create a comprehensive, accessible, and collaborative platform that preserves 
              and shares the world's cultural heritage, making it available to researchers, 
              educators, and history enthusiasts worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5d4634] text-[#fdf6e3] rounded-full mb-4">
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#5d4634] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#5d4634] mb-6 font-serif">
              Our Team
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Meet the experts and professionals who make our mission possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-[#5d4634] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#5d4634] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-[#5d4634] to-[#4b3727] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 font-serif">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Help us preserve history by contributing to our growing database of artifacts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#fdf6e3] text-[#5d4634] px-8 py-3 rounded-lg font-medium hover:bg-[#f5f0e8] transition-all duration-300">
                Start Exploring
              </button>
              <button className="border-2 border-[#fdf6e3] text-[#fdf6e3] px-8 py-3 rounded-lg font-medium hover:bg-[#fdf6e3] hover:text-[#5d4634] transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;