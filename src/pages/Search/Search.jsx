import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtifactCard from '../Shared/ArtifactCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const Search = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    timePeriod: '',
    region: '',
    sortBy: 'name'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() || Object.values(filters).some(filter => filter !== '')) {
      performSearch();
    }
  }, [searchTerm, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm.trim()) queryParams.append('search', searchTerm.trim());
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.timePeriod) queryParams.append('timePeriod', filters.timePeriod);
      if (filters.region) queryParams.append('region', filters.region);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

      const response = await fetch(`https://artifacts-tracker-server-one.vercel.app/artifacts?${queryParams}`);
      const data = await response.json();
      setArtifacts(data);
    } catch (error) {
      console.error('Search error:', error);
      setArtifacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      timePeriod: '',
      region: '',
      sortBy: 'name'
    });
    setSearchTerm('');
  };

  return (
    <div className="bg-[#fdf6e3] min-h-screen py-16 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5d4634] mb-4">
            Advanced Search
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find the perfect artifacts using our comprehensive search and filtering system.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search artifacts by name, description, or keywords..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#e5ddca] focus:border-[#5d4634] focus:outline-none text-lg"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-outline btn-sm border-[#5d4634] text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3]"
            >
              <FiFilter className="w-4 h-4 mr-1" />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#5d4634]">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="btn btn-sm btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                <FiX className="w-4 h-4 mr-1" />
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#e5ddca] focus:border-[#5d4634] focus:outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="pottery">Pottery</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="tools">Tools</option>
                  <option value="weapons">Weapons</option>
                  <option value="art">Art</option>
                  <option value="coins">Coins</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={filters.timePeriod}
                  onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#e5ddca] focus:border-[#5d4634] focus:outline-none"
                >
                  <option value="">All Periods</option>
                  <option value="ancient">Ancient (Before 500 AD)</option>
                  <option value="medieval">Medieval (500-1500 AD)</option>
                  <option value="renaissance">Renaissance (1400-1600 AD)</option>
                  <option value="modern">Modern (1600+ AD)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#e5ddca] focus:border-[#5d4634] focus:outline-none"
                >
                  <option value="">All Regions</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="africa">Africa</option>
                  <option value="americas">Americas</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#e5ddca] focus:border-[#5d4634] focus:outline-none"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                  <option value="date">Date (Oldest First)</option>
                  <option value="dateDesc">Date (Newest First)</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="loading loading-spinner loading-lg text-[#5d4634]"></div>
              <p className="text-gray-600 mt-4">Searching artifacts...</p>
            </div>
          ) : artifacts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                  Found {artifacts.length} artifact{artifacts.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {artifacts.map((artifact) => (
                  <ArtifactCard key={artifact._id} artifact={artifact} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No artifacts found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]"
              >
                Clear Search
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Search;