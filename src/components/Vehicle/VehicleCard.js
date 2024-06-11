import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.make} {vehicle.model}</h3>
      <p>{vehicle.year}</p>
      <Link to={`/vehicles/${vehicle.id}`}>View Details</Link>
    </div>
  );
};

export default VehicleCard;
