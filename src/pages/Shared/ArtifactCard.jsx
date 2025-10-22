import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const ArtifactCard = ({ artifact, viewMode = 'grid' }) => {
  if (!artifact) return null;

  const {
    _id,
    name,
    image,
    description,
    likeCount: initialLikeCount = 0,
  } = artifact;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const toggleLike = async () => {
    if (!user?.email) {
      alert("Please log in to like artifacts.");
      return;
    }

    if (!_id) {
      alert("Invalid artifact ID");
      return;
    }

    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => prev + (newLiked ? 1 : -1));
    setLoading(true);

    try {
      const res = await fetch(
        `https://artifacts-tracker-server-one.vercel.app/artifacts/${_id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ liked: newLiked }),
        }
      );

      if (!res.ok) throw new Error("Failed to update like count");

      const url = newLiked
        ? "https://artifacts-tracker-server-one.vercel.app/liked-artifacts"
        : "https://artifacts-tracker-server-one.vercel.app/liked-artifacts/unlike";

      const likeRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          artifactId: _id,
          userEmail: user.email,
        }),
      });

      if (!likeRes.ok) {
        throw new Error(newLiked ? "Failed to like artifact" : "Failed to unlike artifact");
      }
    } catch (err) {
      // Rollback UI changes
      setLiked(!newLiked);
      setLikeCount((prev) => prev - (newLiked ? 1 : -1));
      alert(err.message || "Error while updating like status");
    } finally {
      setLoading(false);
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-base-100 dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl cursor-pointer group"
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-48 md:h-40 overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-6 font-serif flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-base-content dark:text-gray-100 mb-2">
                {name}
              </h2>
              <p className="text-base-content/70 dark:text-gray-300 mb-4">
                {description?.length > 200
                  ? description.slice(0, 200) + "..."
                  : description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                  liked ? "text-red-600" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <FaHeart className="text-base" />
                <span>{likeCount}</span>
              </button>

              <div className="flex gap-2">
                <Link to="/compare">
                  <button 
                    className="px-3 py-2 text-sm rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                    title="Add to comparison"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={`/artifacts/${_id}`}>
                  <button className="px-6 py-2 text-sm rounded-lg btn btn-primary transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative w-full h-60 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 font-serif flex flex-col justify-between h-[280px]">
        <h2 className="text-xl md:text-2xl font-bold text-[#5d4634] dark:text-[#e5ddca] mb-2">
          {name}
        </h2>
        <p className="text-sm text-base-content/70 dark:text-gray-300 flex-1">
          {description?.length > 100 ? `${description.slice(0, 100)}...` : description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={toggleLike}
            disabled={loading}
            className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              liked ? "text-red-600" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <FaHeart className="text-base" />
            <span>{likeCount}</span>
          </button>

          <div className="flex gap-2">
            <Link to="/compare">
              <button 
                className="px-3 py-1.5 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
                title="Add to comparison"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </Link>
            <Link to={`/artifacts/${_id}`}>
              <button className="px-4 py-1.5 text-sm rounded-md btn btn-primary transition">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtifactCard;
