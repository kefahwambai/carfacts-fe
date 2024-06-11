import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OwnerList from '../OwnerList/OwnerList';
import ServiceRecordList from '../ServiceRecords/ServiceRecords';
import AccidentReportList from '../AccidentReport/AccidentReport';
// import './VehicleDetail.css';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/vehicles/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.headers.get('content-type').includes('application/json')) {
          const data = await response.json();
          setVehicle(data);
        } else {
          const text = await response.text();
          throw new Error(`Expected JSON, but got text: ${text}`);
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        setError(error.toString());
      }
    };

    fetchVehicle();
  }, [id]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vehicle-detail">
      <h2>
        {vehicle.make} {vehicle.model} ({vehicle.year})
        <br/>
        Chassis No: {vehicle.vin}
      </h2>
      <OwnerList vehicleId={vehicle.id} />
      <ServiceRecordList vehicleId={vehicle.id} />
      <AccidentReportList vehicleId={vehicle.id} />
    </div>
  );
};

export default VehicleDetail;
