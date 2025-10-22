import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#5d4634] to-[#4b3727] py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#fdf6e3]/10 rounded-full">
              <FiMail className="text-4xl text-[#fdf6e3]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#fdf6e3] mb-4 font-serif">
            Stay Updated with New Discoveries
          </h2>
          <p className="text-lg text-[#fdf6e3]/90 mb-8 max-w-2xl mx-auto">
            Get the latest updates on newly discovered artifacts, restoration projects, 
            and archaeological breakthroughs delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#fdf6e3] text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-[#fdf6e3] text-[#5d4634] px-6 py-3 rounded-lg font-medium hover:bg-[#f5f0e8] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiSend className="text-lg" />
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </form>

          {isSubscribed && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-[#fdf6e3] font-medium"
            >
              Thank you for subscribing! 🎉
            </motion.p>
          )}

          <p className="text-sm text-[#fdf6e3]/70 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;