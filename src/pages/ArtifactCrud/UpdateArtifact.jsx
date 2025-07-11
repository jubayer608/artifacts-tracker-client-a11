import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateArtifact = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/artifacts/${id}`)
      .then(res => res.json())
      .then(data => setArtifact(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      image: form.image.value,
      type: form.type.value,
      historicalContext: form.historicalContext.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      location: form.location.value,
    };

    fetch(`http://localhost:3000/artifacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire('Updated!', 'Artifact updated successfully.', 'success');
          navigate('/my-artifacts');
        }
      });
  };

  if (!artifact) return <p>Loading...</p>;

  return (
    <div className="px-6 md:px-20 py-14 bg-[#fdf6e3] min-h-screen">
      <h2 className="text-3xl font-bold text-[#5d4634] mb-6 text-center">Update Artifact</h2>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-5">
        <input type="text" name="name" defaultValue={artifact.name} placeholder="Artifact Name" required className="input" />
        <input type="url" name="image" defaultValue={artifact.image} placeholder="Image URL" required className="input" />
        <select name="type" defaultValue={artifact.type} className="input">
          <option>Tools</option>
          <option>Weapons</option>
          <option>Documents</option>
          <option>Writings</option>
        </select>
        <input type="text" name="historicalContext" defaultValue={artifact.historicalContext} placeholder="Historical Context" className="input" />
        <input type="text" name="createdAt" defaultValue={artifact.createdAt} placeholder="Created At (e.g., 100 BC)" className="input" />
        <input type="text" name="discoveredAt" defaultValue={artifact.discoveredAt} placeholder="Discovered At" className="input" />
        <input type="text" name="discoveredBy" defaultValue={artifact.discoveredBy} placeholder="Discovered By" className="input" />
        <input type="text" name="location" defaultValue={artifact.location} placeholder="Present Location" className="input" />
        <button type="submit" className="bg-[#5d4634] text-[#fdf6e3] py-2 px-6 rounded hover:bg-[#4b3727]">Update Artifact</button>
      </form>
    </div>
  );
};

export default UpdateArtifact;

