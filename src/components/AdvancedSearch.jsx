import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX, FiCalendar, FiTag } from 'react-icons/fi';

const AdvancedSearch = ({ onSearch, onFilter, loading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: '',
    origin: '',
    material: '',
    condition: '',
    minLikes: '',
    maxLikes: ''
  });

  const categories = [
    'All Categories',
    'Pottery & Ceramics',
    'Metalwork',
    'Stone & Sculpture',
    'Textiles',
    'Jewelry',
    'Tools & Weapons',
    'Manuscripts',
    'Coins & Currency',
    'Architectural Elements'
  ];

  const materials = [
    'All Materials',
    'Clay',
    'Bronze',
    'Gold',
    'Silver',
    'Stone',
    'Wood',
    'Textile',
    'Paper',
    'Glass',
    'Iron'
  ];

  const conditions = [
    'All Conditions',
    'Excellent',
    'Good',
    'Fair',
    'Poor',
    'Fragmented'
  ];

  const dateRanges = [
    'All Periods',
    'Prehistoric (Before 3000 BCE)',
    'Ancient (3000 BCE - 500 CE)',
    'Medieval (500 - 1500 CE)',
    'Renaissance (1400 - 1600 CE)',
    'Modern (1600 - 1900 CE)',
    'Contemporary (1900 - Present)'
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      dateRange: '',
      origin: '',
      material: '',
      condition: '',
      minLikes: '',
      maxLikes: ''
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#5d4634] flex items-center gap-2">
          <FiSearch className="text-lg" />
          Advanced Search & Filters
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-outline btn-sm border-[#5d4634] text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3]"
        >
          <FiFilter className="text-sm" />
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiTag className="inline mr-1" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All Categories' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material
            </label>
            <select
              value={filters.material}
              onChange={(e) => handleFilterChange('material', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
            >
              {materials.map(material => (
                <option key={material} value={material === 'All Materials' ? '' : material}>
                  {material}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <select
              value={filters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition === 'All Conditions' ? '' : condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="inline mr-1" />
              Time Period
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
            >
              {dateRanges.map(range => (
                <option key={range} value={range === 'All Periods' ? '' : range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Origin Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origin/Region
            </label>
            <input
              type="text"
              value={filters.origin}
              onChange={(e) => handleFilterChange('origin', e.target.value)}
              placeholder="e.g., Egypt, Greece, China"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
            />
          </div>

          {/* Likes Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Likes Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minLikes}
                onChange={(e) => handleFilterChange('minLikes', e.target.value)}
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
              />
              <input
                type="number"
                value={filters.maxLikes}
                onChange={(e) => handleFilterChange('maxLikes', e.target.value)}
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d4634]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="btn bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] disabled:opacity-50"
            >
              {loading ? 'Applying...' : 'Apply Filters'}
            </button>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <FiX className="text-sm mr-1" />
                Clear All
              </button>
            )}
          </div>
          
          {hasActiveFilters && (
            <div className="text-sm text-gray-600">
              {Object.values(filters).filter(value => value !== '').length} filter(s) active
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedSearch;