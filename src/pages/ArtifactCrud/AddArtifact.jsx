import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    type: '',
    historicalContext: '',
    description: '',
    createdAt: '',
    discoveredAt: '',
    discoveredBy: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const artifactData = {
    ...formData,
    adderName: user.displayName,
    adderEmail: user.email,
    likeCount: 0,
  };

  try {
    const token = await user.getIdToken(); 

    const res = await fetch('http://localhost:3000/artifacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(artifactData),
    });

    const data = await res.json();

    if (res.ok && (data.insertedId || data.acknowledged)) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Artifact added successfully!',
        confirmButtonColor: '#5d4634'
      });
      setFormData({
        name: '', image: '', type: '', historicalContext: '',
        description: '', createdAt: '', discoveredAt: '',
        discoveredBy: '', location: ''
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: data.message || 'Failed to add artifact',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Try again.',
    });
  }
};


  return (
    <section className="bg-[#fdf6e3] py-16 px-6 md:px-20 font-serif min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#5d4634] mb-8 text-center">
          Add New Artifact
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Artifact Name" className="input" />
            <input name="image" value={formData.image} onChange={handleChange} required placeholder="Image URL" className="input" />
            <select name="type" value={formData.type} onChange={handleChange} required className="input">
              <option value="">Select Type</option>
              <option>Tools</option>
              <option>Weapons</option>
              <option>Documents</option>
              <option>Writings</option>
            </select>
            <input name="historicalContext" value={formData.historicalContext} onChange={handleChange} required placeholder="Historical Context" className="input" />
            <input name="createdAt" value={formData.createdAt} onChange={handleChange} required placeholder="Created At (e.g., 100 BC)" className="input" />
            <input name="discoveredAt" value={formData.discoveredAt} onChange={handleChange} required placeholder="Discovered At (e.g., 1799)" className="input" />
            <input name="discoveredBy" value={formData.discoveredBy} onChange={handleChange} required placeholder="Discovered By" className="input" />
            <input name="location" value={formData.location} onChange={handleChange} required placeholder="Present Location" className="input" />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Short Description"
            className="input h-28"
          />

          <div className="grid grid-cols-2 gap-4">
            <input value={user.displayName} readOnly className="input bg-gray-100 cursor-not-allowed" />
            <input value={user.email} readOnly className="input bg-gray-100 cursor-not-allowed" />
          </div>

          <button type="submit" className="w-full bg-[#5d4634] text-[#fdf6e3] py-3 rounded-lg hover:bg-[#4b3727] transition">
            Add Artifact
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddArtifact;
