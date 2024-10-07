import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const api = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/api/admin/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (email) => {
    try {
      await axios.delete(`${api}/api/admin/users/${email}`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <table className="table table-striped">
        <thead>
          <tr class="table-dark">
            <th>Name</th>
            <th>phone no.</th>
            <th>city</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td class="table-success">{user.name}</td>
              <td class="table-success">{user.phone}</td>
              <td class="table-success">{user.city}</td>
              <td class="table-success">{user.email}</td>
              <td class="table-success">
                <button className="btn btn-danger" onClick={() => deleteUser(user.email)}>
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

export default UserManagement;
