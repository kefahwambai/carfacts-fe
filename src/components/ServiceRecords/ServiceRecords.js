import React, { useEffect, useState } from 'react';
import './ServiceRecordList.css';

const ServiceRecordList = ({ vehicleId }) => {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vehicles/${vehicleId}/service_records`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(`Expected JSON, but got text: ${text}`);
          });
        }
      })
      .then((data) => setServiceRecords(data))
      .catch((error) => {
        console.error('Error fetching service records:', error);
        setError(error.toString());
      });
  }, [vehicleId]);

  return (
    <div className="service-record-list-container">
      <div className="service-record-list">
        <h2>Service Records</h2>
        {error && <div className="error">{error}</div>}
        <ul>
          {serviceRecords.map((record) => (
            <li key={record.id}>
              {record.date}: {record.description}
              <hr />
            </li>                       
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceRecordList;
