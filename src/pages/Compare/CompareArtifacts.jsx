import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';

const CompareArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const filteredArtifacts = artifacts.filter(artifact =>
    artifact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artifact.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToComparison = (artifact) => {
    if (selectedArtifacts.length >= 4) {
      alert('You can compare up to 4 artifacts at once');
      return;
    }
    if (!selectedArtifacts.find(item => item._id === artifact._id)) {
      setSelectedArtifacts([...selectedArtifacts, artifact]);
    }
  };

  const removeFromComparison = (artifactId) => {
    setSelectedArtifacts(selectedArtifacts.filter(item => item._id !== artifactId));
  };

  const clearComparison = () => {
    setSelectedArtifacts([]);
  };

  const comparisonFields = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'category', label: 'Category' },
    { key: 'timePeriod', label: 'Time Period' },
    { key: 'region', label: 'Region' },
    { key: 'likeCount', label: 'Likes' },
    { key: 'date', label: 'Date Added' }
  ];

  return (
    <div className="bg-base-100 min-h-screen py-16 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Artifact Comparison Tool
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Compare up to 4 artifacts side by side to analyze their similarities and differences.
          </p>
        </motion.div>

        {/* Selected Artifacts */}
        {selectedArtifacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-base-200 rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">
                Selected for Comparison ({selectedArtifacts.length}/4)
              </h3>
              <button
                onClick={clearComparison}
                className="btn btn-sm btn-outline text-error border-error hover:bg-error hover:text-white"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedArtifacts.map((artifact, index) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative bg-base-100 rounded-lg p-4 shadow-md"
                >
                  <button
                    onClick={() => removeFromComparison(artifact._id)}
                    className="absolute -top-2 -right-2 btn btn-sm btn-circle btn-error text-white"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-bold text-sm text-primary truncate">
                    {artifact.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Add Artifacts */}
        <div className="bg-base-200 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-primary">Add Artifacts to Compare</h3>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
            >
              <FiSearch className="w-4 h-4 mr-2" />
              {showSearch ? 'Hide Search' : 'Search Artifacts'}
            </button>
          </div>

          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search artifacts to add to comparison..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-base-300 focus:border-primary focus:outline-none text-lg bg-base-100"
                />
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="loading loading-spinner loading-lg text-primary"></div>
              <p className="text-base-content/70 mt-4">Loading artifacts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {filteredArtifacts.map((artifact) => {
                const isSelected = selectedArtifacts.find(item => item._id === artifact._id);
                const canAdd = selectedArtifacts.length < 4 && !isSelected;
                
                return (
                  <motion.div
                    key={artifact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`relative bg-base-100 rounded-lg p-4 shadow-md transition-all duration-200 ${
                      isSelected ? 'ring-2 ring-primary' : canAdd ? 'hover:shadow-lg cursor-pointer' : 'opacity-50'
                    }`}
                    onClick={() => canAdd && addToComparison(artifact)}
                  >
                    <img
                      src={artifact.image}
                      alt={artifact.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-bold text-sm text-primary truncate mb-1">
                      {artifact.name}
                    </h4>
                    <p className="text-xs text-base-content/70 line-clamp-2">
                      {artifact.description}
                    </p>
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-primary font-bold">Selected</span>
                      </div>
                    )}
                    {!canAdd && !isSelected && (
                      <div className="absolute inset-0 bg-base-content/20 rounded-lg flex items-center justify-center">
                        <span className="text-base-content font-bold">Max Reached</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {selectedArtifacts.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-base-200 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-6 text-center">
              Comparison Results
            </h3>
            
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-primary font-bold">Property</th>
                    {selectedArtifacts.map((artifact, index) => (
                      <th key={artifact._id} className="text-primary font-bold">
                        <div className="flex flex-col items-center">
                          <img
                            src={artifact.image}
                            alt={artifact.name}
                            className="w-16 h-16 object-cover rounded-lg mb-2"
                          />
                          <span className="text-sm">{artifact.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field) => (
                    <tr key={field.key}>
                      <td className="font-semibold text-primary">{field.label}</td>
                      {selectedArtifacts.map((artifact) => (
                        <td key={artifact._id} className="text-base-content/80">
                          {artifact[field.key] || 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => window.print()}
                className="btn bg-primary text-primary-content hover:bg-primary/90 mr-4"
              >
                Print Comparison
              </button>
              <button
                onClick={clearComparison}
                className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
              >
                Start New Comparison
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {selectedArtifacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-base-content/70 mb-2">
              No artifacts selected for comparison
            </h3>
            <p className="text-base-content/50 mb-6">
              Select 2-4 artifacts to start comparing their properties and features.
            </p>
            <button
              onClick={() => setShowSearch(true)}
              className="btn bg-primary text-primary-content hover:bg-primary/90"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Artifacts
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CompareArtifacts;