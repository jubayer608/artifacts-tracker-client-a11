import React from "react";

const reviews = [
  { name: "Ava R.", text: "A treasure trove for history lovers!", rating: 5 },
  { name: "Noah T.", text: "Beautiful UI and informative content.", rating: 4 },
  { name: "Mia K.", text: "Love the featured artifacts section!", rating: 5 },
];

const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#F59E0B" : "none"}
    stroke="#F59E0B"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.286 3.957c.3.922-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.176 0l-3.37 2.449c-.784.57-1.838-.196-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.02 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
    />
  </svg>
);

const Reviews = () => {
  return (
    <section className="bg-[#fdf6e3] dark:bg-slate-900 py-16 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5d4634] dark:text-[#e5ddca] mb-8">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <p className="text-gray-700 dark:text-gray-300 mb-4">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#5d4634] dark:text-[#e5ddca]">{r.name}</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} filled={i <= r.rating} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
