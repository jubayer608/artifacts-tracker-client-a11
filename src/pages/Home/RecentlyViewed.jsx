import React, { useEffect, useState } from "react";
import ArtifactCard from "../Shared/ArtifactCard";

const RecentlyViewed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }, []);

  if (!items.length) return null;

  return (
    <section className="bg-base-100 py-16 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">Recently Viewed</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((artifact) => (
            <ArtifactCard key={artifact._id} artifact={artifact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
