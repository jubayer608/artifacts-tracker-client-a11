import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const ArtifactCard = ({ artifact }) => {
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

  const { user } = useContext(AuthContext);

  const toggleLike = () => {
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

    fetch(`http://localhost:3000/artifacts/${_id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: newLiked }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            (await res.json()).message || "Failed to update like"
          );
        }

        if (newLiked) {
          return fetch("http://localhost:3000/liked-artifacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              artifactId: _id,
              userEmail: user.email,
            }),
          });
        } else {
          // Optional: handle unlike case with DELETE (if backend supports)
        }
      })
      .then((res) => {
        if (res && !res.ok) {
          throw new Error("Failed to save to liked_artifacts");
        }
      })
      .catch((err) => {
        setLiked(liked); // revert state
        setLikeCount((prev) => prev - (newLiked ? 1 : -1));
        alert(err.message || "Error while liking artifact");
      });
  };
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl cursor-pointer group"
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
        <h2 className="text-xl md:text-2xl font-bold text-[#5d4634] mb-2">
          {name}
        </h2>
        <p className="text-sm text-gray-600 flex-1">
          {description?.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              liked ? "text-red-600" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <FaHeart className="text-base" />
            <span>{likeCount}</span>
          </button>

          <Link to={`/artifacts/${_id}`}>
            <button className="px-4 py-1.5 text-sm rounded-md bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtifactCard;
