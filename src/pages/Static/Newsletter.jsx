import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-[#fdf6e3] dark:bg-slate-900 py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 dark:text-gray-100 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-[#5d4634] dark:text-[#e5ddca] mb-3">Join Our Newsletter</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Get monthly highlights of artifacts and restoration stories.</p>
        {submitted ? (
          <p className="text-green-700 dark:text-green-400">Thanks for subscribing! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 items-center justify-center">
            <input
              className="px-4 py-2 rounded-lg border border-[#c8b8a5] bg-white dark:bg-slate-700 dark:text-gray-100 w-full max-w-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="px-5 py-2 rounded-lg bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
