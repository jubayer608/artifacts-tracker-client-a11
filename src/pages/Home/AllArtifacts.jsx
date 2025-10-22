import React, { useEffect, useState } from "react";
import ArtifactCard from "../Shared/ArtifactCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvancedSearch from "../../components/AdvancedSearch";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`https://artifacts-tracker-server-one.vercel.app/artifacts?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setArtifacts(data);
        setFilteredArtifacts(data);
        setLoading(false);
      })
      .catch(() => {
        setArtifacts([]);
        setFilteredArtifacts([]);
        setLoading(false);
      });
=======
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtifacts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://artifacts-tracker-server-one.vercel.app/artifacts?search=${query}`
        );
        if (!res.ok) {
          throw new Error(`Server Error: ${res.status}`);
        }
        const data = await res.json();
        setArtifacts(data);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setArtifacts([]);
        setError("Failed to load artifacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
>>>>>>> 9ffdaac (changes code)
  }, [query]);

  useEffect(() => {
    applyFilters();
  }, [artifacts, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    let filtered = [...artifacts];

    if (filters.category) {
      filtered = filtered.filter(artifact => 
        artifact.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.material) {
      filtered = filtered.filter(artifact => 
        artifact.material?.toLowerCase().includes(filters.material.toLowerCase())
      );
    }

    if (filters.condition) {
      filtered = filtered.filter(artifact => 
        artifact.condition?.toLowerCase().includes(filters.condition.toLowerCase())
      );
    }

    if (filters.origin) {
      filtered = filtered.filter(artifact => 
        artifact.origin?.toLowerCase().includes(filters.origin.toLowerCase())
      );
    }

    if (filters.minLikes) {
      filtered = filtered.filter(artifact => 
        (artifact.likeCount || 0) >= parseInt(filters.minLikes)
      );
    }

    if (filters.maxLikes) {
      filtered = filtered.filter(artifact => 
        (artifact.likeCount || 0) <= parseInt(filters.maxLikes)
      );
    }

    setFilteredArtifacts(filtered);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedArtifacts = [...filteredArtifacts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "likeCount") {
      aValue = a.likeCount || 0;
      bValue = b.likeCount || 0;
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-[#fdf6e3] py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-[#5d4634] font-bold mb-8 text-center">
          All Artifacts
        </h1>

        <div className="mb-10 space-y-6">
          <form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto flex items-center gap-3"
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

<<<<<<< HEAD
          <AdvancedSearch 
            onFilter={handleFilter}
            loading={loading}
          />

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#5d4634] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded border border-[#c8b8a5] focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
              >
                <option value="name">Name</option>
                <option value="likeCount">Popularity</option>
                <option value="createdAt">Date Added</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-1 bg-[#5d4634] text-[#fdf6e3] rounded hover:bg-[#4b3727] transition"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {sortedArtifacts.length} artifact{sortedArtifacts.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading artifacts..." />
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedArtifacts.length > 0 ? (
              sortedArtifacts.map((artifact) => (
                <ArtifactCard key={artifact._id} artifact={artifact} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏺</div>
                <p className="text-xl text-gray-600 mb-4">No artifacts found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
=======
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : artifacts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact._id} artifact={artifact} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No artifacts found.</p>
      )}
>>>>>>> 9ffdaac (changes code)
    </div>
  );
};

export default AllArtifacts;
