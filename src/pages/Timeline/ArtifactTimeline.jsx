import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiUser, FiEdit3, FiCamera, FiHeart } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';

const ArtifactTimeline = ({ artifactId }) => {
  const [artifact, setArtifact] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (artifactId) {
      fetchArtifactDetails();
      fetchTimeline();
    }
  }, [artifactId]);

  const fetchArtifactDetails = async () => {
    try {
      const response = await fetch(`https://artifacts-tracker-server-one.vercel.app/artifacts/${artifactId}`);
      const data = await response.json();
      setArtifact(data);
    } catch (error) {
      console.error('Error fetching artifact:', error);
    }
  };

  const fetchTimeline = async () => {
    try {
      const response = await fetch(`https://artifacts-tracker-server-one.vercel.app/artifacts/${artifactId}/timeline`);
      const data = await response.json();
      setTimeline(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      // Mock timeline data for demonstration
      setTimeline([
        {
          id: 1,
          type: 'discovery',
          title: 'Artifact Discovered',
          description: 'Initial discovery and documentation of the artifact',
          date: '2024-01-15',
          location: 'Archaeological Site Alpha',
          user: 'Dr. Sarah Chen',
          status: 'completed'
        },
        {
          id: 2,
          type: 'analysis',
          title: 'Initial Analysis',
          description: 'Preliminary examination and dating of the artifact',
          date: '2024-01-20',
          location: 'Research Laboratory',
          user: 'Prof. James Wilson',
          status: 'completed'
        },
        {
          id: 3,
          type: 'restoration',
          title: 'Restoration Started',
          description: 'Beginning of conservation and restoration process',
          date: '2024-02-01',
          location: 'Conservation Center',
          user: 'Emma Thompson',
          status: 'in_progress'
        },
        {
          id: 4,
          type: 'exhibition',
          title: 'Public Exhibition',
          description: 'Artifact prepared for public display',
          date: '2024-03-15',
          location: 'Museum Gallery',
          user: 'Marcus Rodriguez',
          status: 'planned'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'discovery':
        return <FiCamera className="text-lg" />;
      case 'analysis':
        return <FiEdit3 className="text-lg" />;
      case 'restoration':
        return <FiEdit3 className="text-lg" />;
      case 'exhibition':
        return <FiMapPin className="text-lg" />;
      case 'like':
        return <FiHeart className="text-lg" />;
      default:
        return <FiClock className="text-lg" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading artifact timeline..." />;
  }

  if (!artifact) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Artifact Not Found</h3>
        <p className="text-gray-500">The requested artifact could not be found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fdf6e3] py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Artifact Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-start gap-6">
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#5d4634] mb-2">
                {artifact.name}
              </h1>
              <p className="text-gray-600 mb-4">
                {artifact.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Category: {artifact.category || 'Unknown'}</span>
                <span>Material: {artifact.material || 'Unknown'}</span>
                <span>Origin: {artifact.origin || 'Unknown'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#5d4634] mb-6 flex items-center gap-2">
            <FiClock className="text-xl" />
            Artifact Timeline
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {timeline.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start gap-6 mb-8 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-[#5d4634] text-[#fdf6e3] rounded-full">
                  {getTimelineIcon(event.type)}
                </div>

                {/* Event Content */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#5d4634]">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiClock className="text-xs" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <FiMapPin className="text-xs" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.user && (
                      <div className="flex items-center gap-1">
                        <FiUser className="text-xs" />
                        <span>{event.user}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {timeline.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Timeline Events</h3>
              <p className="text-gray-500">No timeline events have been recorded for this artifact yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactTimeline;