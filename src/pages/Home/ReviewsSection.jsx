import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Archaeologist",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "This platform has revolutionized how we document and share archaeological findings. The community features are outstanding!",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Museum Curator",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment: "The artifact tracking system is incredibly detailed and user-friendly. It's become an essential tool for our museum.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "History Enthusiast",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "I love discovering new artifacts and learning about their history. The search functionality is amazing!",
  },
  {
    id: 4,
    name: "Prof. David Kim",
    role: "Art History Professor",
    image: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    comment: "The educational value of this platform is incredible. My students use it regularly for research projects.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Collector",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment: "Finally, a platform that connects collectors and researchers. The community is knowledgeable and helpful.",
  },
  {
    id: 6,
    name: "Dr. Ahmed Hassan",
    role: "Conservator",
    image: "https://i.pravatar.cc/150?img=6",
    rating: 5,
    comment: "The restoration tracking features help us document our work and share best practices with colleagues worldwide.",
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Hear from archaeologists, curators, and history enthusiasts who use our platform to explore and preserve history.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#fdf6e3] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-[#5d4634]">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-[#5d4634] text-2xl mb-2 opacity-30" />
                <p className="text-gray-700 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-[#5d4634] text-[#fdf6e3] rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
            <p className="text-lg mb-6">
              Over 10,000+ professionals and enthusiasts trust Artifacts Tracker for their historical research and documentation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="btn bg-[#fdf6e3] text-[#5d4634] hover:bg-[#e5ddca] font-semibold px-6 py-3 rounded-lg transition-all duration-200 border-0"
              >
                Join Now
              </a>
              <a
                href="/artifacts"
                className="btn btn-outline border-[#fdf6e3] text-[#fdf6e3] hover:bg-[#fdf6e3] hover:text-[#5d4634] font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Explore Artifacts
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;