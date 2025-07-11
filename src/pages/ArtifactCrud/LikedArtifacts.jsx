import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import ArtifactCard from '../Shared/ArtifactCard';

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      if (!user?.email || !user?.accessToken) return;

      try {
        const res = await fetch(`http://localhost:3000/liked-artifacts/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });

        if (!res.ok) {
          throw new Error('Unauthorized or Error fetching liked artifacts');
        }

        const data = await res.json();
        setLiked(data);
      } catch (error) {
        setLiked([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user]);

  if (loading) {
    return <p className="text-center py-20 text-gray-600">Loading liked artifacts...</p>;
  }

  return (
    <div className="bg-[#fdf6e3] min-h-screen py-16 px-6 md:px-20 font-serif">
      <h2 className="text-3xl text-[#5d4634] font-bold mb-10 text-center">
        My Liked Artifacts
      </h2>
      {liked.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {liked.map(artifact => (
            <ArtifactCard key={artifact._id} artifact={artifact} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          You haven't liked any artifacts yet. Start exploring!
        </p>
      )}
    </div>
  );
};

export default LikedArtifacts;
