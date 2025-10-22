import React from "react";

const About = () => {
  return (
    <section className="bg-[#fdf6e3] dark:bg-slate-900 py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 dark:text-gray-100 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-[#5d4634] dark:text-[#e5ddca] mb-4">About Artifacts Tracker</h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Artifacts Tracker is a community-driven platform to explore, document, and preserve historical artifacts from around the world.
          Our mission is to make history accessible and engaging by connecting enthusiasts, researchers, and conservators.
        </p>
      </div>
    </section>
  );
};

export default About;
