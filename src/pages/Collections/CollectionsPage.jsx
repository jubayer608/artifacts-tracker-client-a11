import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { FiPlus, FiFolder, FiHeart, FiEdit3, FiTrash2, FiEye } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';

const CollectionsPage = () => {
  const { user } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    isPublic: false
  });

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://artifacts-tracker-server-one.vercel.app/collections?userEmail=${user?.email}`, {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`
        }
      });
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://artifacts-tracker-server-one.vercel.app/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify({
          ...newCollection,
          userEmail: user?.email,
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setNewCollection({ name: '', description: '', isPublic: false });
        setShowCreateForm(false);
        fetchCollections();
      }
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        const response = await fetch(`https://artifacts-tracker-server-one.vercel.app/collections/${collectionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.accessToken}`
          }
        });

        if (response.ok) {
          fetchCollections();
        }
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your collections..." />;
  }

  return (
    <div className="bg-[#fdf6e3] py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl text-[#5d4634] font-bold mb-2">
              My Collections
            </h1>
            <p className="text-gray-600">
              Organize your favorite artifacts into personalized collections
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] flex items-center gap-2"
          >
            <FiPlus className="text-lg" />
            New Collection
          </button>
        </div>

        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-[#5d4634] mb-4">Create New Collection</h3>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
                  rows="3"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newCollection.isPublic}
                  onChange={(e) => setNewCollection({...newCollection, isPublic: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  Make this collection public
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]"
                >
                  Create Collection
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Collections Yet</h3>
            <p className="text-gray-500 mb-6">Create your first collection to organize your favorite artifacts</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]"
            >
              Create Collection
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <motion.div
                key={collection._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#5d4634] text-[#fdf6e3] rounded-lg">
                        <FiFolder className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#5d4634]">
                          {collection.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{collection.artifactCount || 0} artifacts</span>
                          {collection.isPublic && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Public
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1 text-gray-400 hover:text-[#5d4634]">
                        <FiEye className="text-sm" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-[#5d4634]">
                        <FiEdit3 className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCollection(collection._id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {collection.description || 'No description provided'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Created {new Date(collection.createdAt).toLocaleDateString()}
                    </span>
                    <button className="text-[#5d4634] text-sm font-medium hover:underline">
                      View Collection →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;