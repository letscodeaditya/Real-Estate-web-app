import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlatManagement = () => {
  const [flats, setFlats] = useState([]);
  const api = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    try {
      const response = await axios.get(`${api}/api/admin/flat`);
      setFlats(response.data);
    } catch (error) {
      console.error('Error fetching flats:', error);
    }
  };

  const deleteFlat = async (flatId) => {
    try {
      await axios.delete(`${api}/api/admin/flat/${flatId}`);
      fetchFlats(); // Refresh the flat list
    } catch (error) {
      console.error('Error deleting flat:', error);
    }
  };

  return (
    <div>
      <h1>Flat Management</h1>
      <table className="table table-striped">
        <thead>
          <tr class="table-dark">
            <th>Flat ID</th>
            <th>Flat Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Posted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flats.map(flat => (
            <tr key={flat.flatId}>
              <td class="table-success">{flat.flatId}</td>
              <td class="table-success">{flat.apartmentName}</td>
              <td class="table-success">{flat.city}</td>
              <td class="table-success">{flat.price}</td>
              <td class="table-success">{flat.postedBy}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteFlat(flat.flatId)}>
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

export default FlatManagement;
