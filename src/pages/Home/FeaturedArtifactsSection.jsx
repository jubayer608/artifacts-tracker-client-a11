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
    <section className="bg-base-100 py-20 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Featured Artifacts
          </h2>
          <p className="opacity-80 text-lg max-w-2xl mx-auto">
            Discover the most admired historical treasures, loved by the community.
          </p>
        </div>

        {loading ? (
          <div className="text-center"><span className="loading loading-spinner loading-lg" aria-label="Loading" /></div>
        ) : artifacts.length > 0 ? (
          <>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {artifacts.map((artifact) => (
                <ArtifactCard key={artifact._id} artifact={artifact} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/artifacts" className="btn btn-primary text-lg">See All Artifacts</Link>
            </div>
          </>
        ) : (
          <p className="text-center opacity-70">No featured artifacts found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtifactsSection;
