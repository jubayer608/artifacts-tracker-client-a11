import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaHeart } from 'react-icons/fa';

const ArtifactDetails = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/artifacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtifact(data);
        setLikeCount(data.likeCount || 0);
      });
  }, [id]);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => prev + (newLiked ? 1 : -1));

    fetch(`http://localhost:3000/artifacts/${id}/like`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liked: newLiked })
    }).then(async res => {
      if (!res.ok) {
        setLiked(!newLiked);
        setLikeCount(prev => prev - (newLiked ? 1 : -1));
        const error = await res.json();
        alert(error.message || 'Failed to update like count');
      }
    }).catch(() => {
      setLiked(!newLiked);
      setLikeCount(prev => prev - (newLiked ? 1 : -1));
      alert('Network error');
    });
  };

  if (!artifact) return <div className="text-center p-10"><span className="loading loading-spinner text-warning"></span>
<span className="loading loading-spinner text-error"></span></div>;

  const {
    name, image, description, historicalContext,
    createdAt, discoveredAt, discoveredBy, location, type
  } = artifact;

  return (
    <div className="bg-[#fdf6e3] min-h-screen py-10 px-6 md:px-20 font-serif">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold text-[#5d4634] mb-4">{name}</h1>
        <p className="text-gray-700 mb-4">{description}</p>

        <ul className="text-gray-800 mb-6 space-y-1">
          <li><strong>Type:</strong> {type}</li>
          <li><strong>Created At:</strong> {createdAt}</li>
          <li><strong>Discovered At:</strong> {discoveredAt}</li>
          <li><strong>Discovered By:</strong> {discoveredBy}</li>
          <li><strong>Location:</strong> {location}</li>
          <li><strong>Historical Context:</strong> {historicalContext}</li>
        </ul>

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
            liked ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <FaHeart className="text-lg" />
          {likeCount}
        </button>
      </div>
    </div>
  );
};

export default ArtifactDetails;
