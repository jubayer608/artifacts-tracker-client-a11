import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import ArtifactCard from '../Shared/ArtifactCard';
import { FiHeart, FiSearch, FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState([]);
  const [filteredLiked, setFilteredLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      if (!user?.email || !user?.accessToken) return;

      try {
        const res = await fetch(`https://artifacts-tracker-server-one.vercel.app/liked-artifacts/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });

        if (!res.ok) {
          throw new Error('Unauthorized or Error fetching liked artifacts');
        }

        const data = await res.json();
        setLiked(data);
        setFilteredLiked(data);
      } catch (error) {
        setLiked([]);
        setFilteredLiked([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user]);

  useEffect(() => {
    let filtered = [...liked];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(artifact =>
        artifact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || '';
      let bValue = b[sortBy] || '';

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLiked(filtered);
  }, [liked, searchTerm, sortBy, sortOrder]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="bg-base-100 min-h-screen py-16 px-6 md:px-20 font-serif">
        <div className="max-w-7xl mx-auto text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-base-content/70 mt-4">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen py-16 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <FiHeart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl text-primary font-bold mb-4">
            My Favorites
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Your personal collection of beloved artifacts. Organize, search, and rediscover your favorites.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="bg-base-200 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your favorites..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-base-300 focus:border-primary focus:outline-none text-lg bg-base-100"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered bg-base-100 border-base-300 focus:border-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
                <option value="likes">Sort by Likes</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/70">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`btn btn-sm ${viewMode === 'grid' ? 'bg-primary text-primary-content' : 'btn-outline border-primary text-primary'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn btn-sm ${viewMode === 'list' ? 'bg-primary text-primary-content' : 'btn-outline border-primary text-primary'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredLiked.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-base-content/70">
                {filteredLiked.length} of {liked.length} favorite{liked.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

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
              {filteredLiked.map((artifact, index) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ArtifactCard artifact={artifact} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-bold text-base-content/70 mb-2">
              {searchTerm ? 'No matching favorites found' : 'No favorites yet'}
            </h3>
            <p className="text-base-content/50 mb-6">
              {searchTerm 
                ? `No artifacts match "${searchTerm}". Try a different search term.`
                : 'Start exploring artifacts and add them to your favorites!'
              }
            </p>
            {searchTerm ? (
              <button
                onClick={clearSearch}
                className="btn bg-primary text-primary-content hover:bg-primary/90"
              >
                Clear Search
              </button>
            ) : (
              <a
                href="/artifacts"
                className="btn bg-primary text-primary-content hover:bg-primary/90"
              >
                Explore Artifacts
              </a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LikedArtifacts;
