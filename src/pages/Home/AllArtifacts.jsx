import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArtifactCard from "../Shared/ArtifactCard";
import { FiSearch, FiFilter, FiArrowUp, FiArrowDown, FiGrid, FiList } from "react-icons/fi";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Initial load: fetch all artifacts; re-run when filters change
  useEffect(() => {
    performSearch();
  }, [query, sortBy, sortOrder]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (query.trim()) queryParams.append('search', query.trim());
      queryParams.append('sortBy', sortBy);
      queryParams.append('sortOrder', sortOrder);

      const response = await fetch(`https://artifacts-tracker-server-one.vercel.app/artifacts?${queryParams.toString()}`);
      const data = await response.json();
      setArtifacts(data);
    } catch (error) {
      console.error('Search error:', error);
      setArtifacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearSearch = () => {
    setSearch("");
    setQuery("");
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="bg-base-100 py-16 px-6 md:px-20 font-serif min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-base-content font-bold mb-4">
            All Artifacts
          </h1>
          <p className="text-base-content/80 text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of historical artifacts from around the world.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8 border border-base-300">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by artifact name, description, or keywords..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-base-300 focus:border-primary focus:outline-none bg-base-100 text-base-content text-lg"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary px-6 py-3 rounded-lg transition-all duration-200"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content px-6 py-3 rounded-lg transition-all duration-200"
              >
                <FiFilter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-base-300 pt-6"
            >
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleSort('name')}
                    className={`btn btn-sm ${sortBy === 'name' ? 'btn-primary text-primary-content' : 'btn-outline border-primary text-primary'} transition-all duration-200`}
                  >
                    {sortBy === 'name' && sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4 mr-1" /> : <FiArrowDown className="w-4 h-4 mr-1" />}
                    Name
                  </button>
                  <button
                    onClick={() => handleSort('date')}
                    className={`btn btn-sm ${sortBy === 'date' ? 'btn-primary text-primary-content' : 'btn-outline border-primary text-primary'} transition-all duration-200`}
                  >
                    {sortBy === 'date' && sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4 mr-1" /> : <FiArrowDown className="w-4 h-4 mr-1" />}
                    Date
                  </button>
                  <button
                    onClick={() => handleSort('likes')}
                    className={`btn btn-sm ${sortBy === 'likes' ? 'btn-primary text-primary-content' : 'btn-outline border-primary text-primary'} transition-all duration-200`}
                  >
                    {sortBy === 'likes' && sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4 mr-1" /> : <FiArrowDown className="w-4 h-4 mr-1" />}
                    Popularity
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-base-content/70">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary text-primary-content' : 'btn-outline border-primary text-primary'} transition-all duration-200`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary text-primary-content' : 'btn-outline border-primary text-primary'} transition-all duration-200`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Header */}
        {artifacts.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-base-content/80">
              Showing {artifacts.length} artifact{artifacts.length !== 1 ? 's' : ''}
              {query && ` for "${query}"`}
            </p>
            {(query || sortBy !== 'name' || sortOrder !== 'asc') && (
              <button
                onClick={clearSearch}
                className="btn btn-sm btn-outline text-error border-error hover:bg-error hover:text-error-content"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
            <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-base-content/70 mt-4">Loading artifacts...</p>
          </div>
        )}

        {/* Artifacts Grid/List */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {artifacts.length > 0 ? (
              artifacts.map((artifact, index) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ArtifactCard artifact={artifact} viewMode={viewMode} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-base-content/70 mb-2">No artifacts found</h3>
                <p className="text-base-content/60 mb-6">
                  {query ? `No results found for "${query}". Try different search terms.` : 'No artifacts available at the moment.'}
                </p>
                {query && (
                  <button
                    onClick={clearSearch}
                    className="btn btn-primary"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AllArtifacts;
