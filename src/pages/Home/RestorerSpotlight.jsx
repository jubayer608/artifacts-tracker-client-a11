import React from "react";
import ChromeGrid from "./ChromeGrid";

const restorers = [
  {
    image: "https://i.pravatar.cc/300?img=21",
    title: "Emily Carter",
    subtitle: "Artifact Conservator",
    handle: "@emilycarter",
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #000)",
    url: "https://linkedin.com/in/emilycarter",
  },
  {
    image: "https://i.pravatar.cc/300?img=34",
    title: "James Foster",
    subtitle: "Restoration Specialist",
    handle: "@jamesfoster",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(210deg, #3B82F6, #000)",
    url: "https://github.com/jamesfoster",
  },
  {
    image: "https://i.pravatar.cc/300?img=45",
    title: "Sophia Lee",
    subtitle: "Historical Researcher",
    handle: "@sophialee",
    borderColor: "#10B981",
    gradient: "linear-gradient(165deg, #10B981, #000)",
    url: "https://dribbble.com/sophialee",
  },
  {
    image: "https://i.pravatar.cc/300?img=56",
    title: "Michael Brown",
    subtitle: "Artifact Technician",
    handle: "@michaelbrown",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(195deg, #F59E0B, #000)",
    url: "https://kaggle.com/michaelbrown",
  },
];

const RestorerSpotlight = () => {
  return (
    <section className="bg-[#fdf6e3] py-20 px-6 md:px-20 font-serif overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-[#5d4634] dark:text-[#d4a017] mb-4">
          Restorers Spotlight
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Meet the skilled individuals working tirelessly to preserve our
          historical artifacts. Their dedication helps bring ancient wonders
          back to life.
        </p>
      </div>

      <div className="relative  w-full">
        <div className="w-full">
          <ChromeGrid items={restorers} />
        </div>
      </div>
    </section>
  );
};

export default RestorerSpotlight;
