import React, { useEffect, useState } from "react";
import ArtifactCard from "../Shared/ArtifactCard";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/artifacts?search=${query}`)
      .then((res) => res.json())
      .then((data) => setArtifacts(data))
      .catch(() => setArtifacts([]));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  return (
    <div className="bg-[#fdf6e3] py-16 px-6 md:px-20 font-serif min-h-screen">
      <h1 className="text-4xl text-[#5d4634] font-bold mb-8 text-center">
        All Artifacts
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-10 max-w-xl mx-auto flex items-center gap-3"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by artifact name..."
          className="w-full px-4 py-2 rounded-lg border border-[#c8b8a5] focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
        />
        <button
          type="submit"
          className="bg-[#5d4634] text-[#fdf6e3] px-5 py-2 rounded-lg hover:bg-[#4b3727] transition"
        >
          Search
        </button>
      </form>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {artifacts.length > 0 ? (
          artifacts.map((artifact) => (
            <ArtifactCard key={artifact._id} artifact={artifact} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No artifacts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllArtifacts;
