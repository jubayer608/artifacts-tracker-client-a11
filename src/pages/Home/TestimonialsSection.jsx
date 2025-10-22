import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Archaeologist",
      content: "This platform has revolutionized how we document and share archaeological discoveries. The community-driven approach brings together experts and enthusiasts like never before.",
      rating: 5,
      avatar: "👩‍🔬"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Museum Curator",
      content: "The artifact tracking system is incredibly detailed and user-friendly. It's become an essential tool for our museum's digital collection management.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "History Student",
      content: "As a student, I love how accessible this platform makes historical artifacts. The detailed descriptions and high-quality images bring history to life!",
      rating: 5,
      avatar: "👩‍🎓"
    },
    {
      id: 4,
      name: "Prof. James Wilson",
      role: "Art Historian",
      content: "The restoration tracking feature is brilliant. Being able to follow the journey of an artifact from discovery to restoration is invaluable for research.",
      rating: 5,
      avatar: "👨‍🏫"
    }
  ];

  return (
    <section className="bg-[#f5f0e8] py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-4 font-serif">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from archaeologists, curators, students, and history enthusiasts who use our platform.
          </p>
        </motion.div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-[#5d4634]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-[#5d4634]/20 text-2xl mb-2" />
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;