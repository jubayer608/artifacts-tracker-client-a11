import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="bg-[#5d4634] py-20 px-6 md:px-20 font-serif">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#fdf6e3] rounded-full">
              <FiMail className="w-8 h-8 text-[#5d4634]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#fdf6e3] mb-4">
            Stay Updated
          </h2>
          <p className="text-[#e5ddca] text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on new artifacts, restoration projects, and historical discoveries delivered to your inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-[#e5ddca] focus:border-[#fdf6e3] bg-white text-gray-800 focus:outline-none"
                    required
                  />
                  <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="btn bg-[#fdf6e3] text-[#5d4634] hover:bg-[#e5ddca] font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border-0"
                >
                  <FiSend className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#fdf6e3] text-[#5d4634] px-6 py-4 rounded-lg font-semibold"
            >
              Thank you for subscribing! 🎉
            </motion.div>
          )}

          <p className="text-[#e5ddca] text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;