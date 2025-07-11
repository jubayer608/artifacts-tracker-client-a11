import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const MyArtifactsPage = () => {
  const { user } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchArtifacts = async () => {
    if (!user?.email || !user?.accessToken) return;

    try {
      const res = await fetch(`http://localhost:3000/my-artifacts/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setArtifacts(data);
    } catch (err) {
      console.error("Failed to fetch artifacts", err);
      setArtifacts([]);
    }
  };

  fetchArtifacts();
}, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this artifact!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/artifacts/${id}`, {
          method: 'DELETE',
          headers: {
          Authorization: `Bearer ${user.accessToken}`,
  }
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your artifact has been deleted.', 'success');
              setArtifacts(prev => prev.filter(item => item._id !== id));
              navigate('/artifacts');
            }
          });
      }
    });
  };

  return (
    <div className="py-16 px-6 md:px-20 bg-[#fdf6e3] min-h-screen font-serif">
      <h2 className="text-4xl font-bold text-[#5d4634] text-center mb-10">My Artifacts</h2>

      {artifacts.length === 0 ? (
        <motion.p
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You haven’t added any artifacts yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artifacts.map((artifact, index) => (
            <motion.div
              key={artifact._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-[#5d4634]">{artifact.name}</h3>
                <p className="text-sm text-gray-600">
                  {artifact.description?.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center pt-2">
                  <Link
                    to={`/update-artifact/${artifact._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(artifact._id)}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtifactsPage;