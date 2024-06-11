import React from 'react';
import VehicleCard from './VehicleCard';

const VehicleList = ({ vehicles }) => {
  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList;
