import React, { useEffect, useState } from 'react';
import ArtifactCard from '../Shared/ArtifactCard';
import { Link } from 'react-router';
import LoadingSpinner from '../../components/LoadingSpinner';

const FeaturedArtifactsSection = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('https://artifacts-tracker-server-one.vercel.app/featured-artifacts');
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const data = await res.json();
        setArtifacts(data);
      } catch (err) {
        console.error("Error fetching featured artifacts:", err.message);
        setError("Failed to load featured artifacts.");
        setArtifacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="bg-[#fdf6e3] py-20 mt-14 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-4">
            Featured Artifacts
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Discover the most admired historical treasures, loved by the community.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading featured artifacts..." />
        ) : artifacts.length > 0 ? (
          <>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {artifacts.map((artifact) => (
                <ArtifactCard key={artifact._id} artifact={artifact} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/artifacts">
                <button className="bg-[#5d4634] text-[#fdf6e3] px-6 py-3 rounded-lg hover:bg-[#4b3727] transition-all text-lg font-medium">
                  See All Artifacts
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No featured artifacts found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtifactsSection;
