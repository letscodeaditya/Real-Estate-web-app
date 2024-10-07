import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BungalowManagement = () => {
  const [bungalows, setBungalows] = useState([]);
  const api = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    fetchBungalows();
  }, []);

  const fetchBungalows = async () => {
    try {
      const response = await axios.get(`${api}/api/admin/bungalow`);
      setBungalows(response.data);
    } catch (error) {
      console.error('Error fetching bungalows:', error);
    }
  };

  const deleteBungalow = async (bungalowId) => {
    try {
      await axios.delete(`${api}/api/admin/bungalow/${bungalowId}`);
      fetchBungalows(); // Refresh the bungalow list
    } catch (error) {
      console.error('Error deleting bungalow:', error);
    }
  };

  return (
    <div>
      <h1>Bungalow Management</h1>
      <table className="table table-striped">
        <thead>
          <tr class="table-dark">
            <th>Bungalow ID</th>
            <th>Bungalow Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Posted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bungalows.map(bungalow => (
            <tr key={bungalow.bungalowId}>
              <td class="table-success">{bungalow.bungalowId}</td>
              <td class="table-success">{bungalow.bungalowName}</td>
              <td class="table-success">{bungalow.city}</td>
              <td class="table-success">{bungalow.price}</td>
              <td class="table-success">{bungalow.postedBy}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteBungalow(bungalow.bungalowId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BungalowManagement;
