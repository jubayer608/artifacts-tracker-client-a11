import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';

const ArtifactComparison = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxArtifacts] = useState(4);

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://artifacts-tracker-server-one.vercel.app/artifacts');
      const data = await response.json();
      setArtifacts(data);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToComparison = (artifact) => {
    if (selectedArtifacts.length < maxArtifacts && !selectedArtifacts.find(a => a._id === artifact._id)) {
      setSelectedArtifacts([...selectedArtifacts, artifact]);
    }
  };

  const removeFromComparison = (artifactId) => {
    setSelectedArtifacts(selectedArtifacts.filter(a => a._id !== artifactId));
  };

  const clearComparison = () => {
    setSelectedArtifacts([]);
  };

  const filteredArtifacts = artifacts.filter(artifact =>
    artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedArtifacts.find(a => a._id === artifact._id)
  );

  const comparisonFields = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'material', label: 'Material' },
    { key: 'origin', label: 'Origin' },
    { key: 'condition', label: 'Condition' },
    { key: 'likeCount', label: 'Likes' },
    { key: 'createdAt', label: 'Date Added' }
  ];

  return (
    <div className="bg-[#fdf6e3] py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl text-[#5d4634] font-bold mb-4">
            Artifact Comparison Tool
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare up to {maxArtifacts} artifacts side by side to analyze their similarities and differences
          </p>
        </div>

        {/* Search and Add Artifacts */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#5d4634] mb-4 flex items-center gap-2">
            <FiSearch className="text-lg" />
            Add Artifacts to Compare
          </h3>
          
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artifacts to add to comparison..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
            />
          </div>

          {loading ? (
            <LoadingSpinner text="Loading artifacts..." />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-60 overflow-y-auto">
              {filteredArtifacts.slice(0, 12).map((artifact) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => addToComparison(artifact)}
                >
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#5d4634] truncate">
                      {artifact.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {artifact.category || 'Unknown Category'}
                    </p>
                  </div>
                  <FiPlus className="text-[#5d4634] text-lg" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Artifacts */}
        {selectedArtifacts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#5d4634]">
                Selected for Comparison ({selectedArtifacts.length}/{maxArtifacts})
              </h3>
              <button
                onClick={clearComparison}
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm"
              >
                <FiTrash2 className="text-sm mr-1" />
                Clear All
              </button>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {selectedArtifacts.map((artifact) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative border border-gray-200 rounded-lg p-4"
                >
                  <button
                    onClick={() => removeFromComparison(artifact._id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
                  >
                    <FiX className="text-sm" />
                  </button>
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-medium text-[#5d4634] text-sm truncate">
                    {artifact.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedArtifacts.length > 1 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#5d4634]">
                Detailed Comparison
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    {selectedArtifacts.map((artifact) => (
                      <th key={artifact._id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <img
                            src={artifact.image}
                            alt={artifact.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span className="truncate max-w-24">{artifact.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonFields.map((field) => (
                    <tr key={field.key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field.label}
                      </td>
                      {selectedArtifacts.map((artifact) => (
                        <td key={artifact._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {field.key === 'likeCount' 
                            ? artifact.likeCount || 0
                            : field.key === 'createdAt'
                            ? new Date(artifact.createdAt).toLocaleDateString()
                            : artifact[field.key] || 'N/A'
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedArtifacts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Artifacts Selected</h3>
            <p className="text-gray-500">Add at least 2 artifacts to start comparing them</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtifactComparison;