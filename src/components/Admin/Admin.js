import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles');
        setVehicles(response.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchVehicles();
    fetchUsers();
  }, []);

  const handleDeleteVehicle = async (id) => {
    try {
      await api.delete(`/vehicles/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      <p>Manage vehicles, users, and reports.</p>
      
      {error && <div className="error">{error.message}</div>}

      <section>
        <h3>Vehicles</h3>
        <ul>
          {vehicles.map(vehicle => (
            <li key={vehicle.id}>
              {vehicle.make} {vehicle.model} ({vehicle.year})
              <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.email} ({user.role})
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
      
      {/* Add more sections for managing reports or other admin functionalities here */}
    </div>
  );
};

export default Admin;
