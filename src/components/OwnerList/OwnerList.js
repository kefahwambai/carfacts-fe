import React, { useEffect, useState } from 'react';
import './OwnerList.css';

const OwnerList = ({ vehicleId }) => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vehicles/${vehicleId}/owners`)
      .then((response) => {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Expected JSON, but got text: ${text}`);
          });
        }
      })
      .then((data) => {
        setOwners(data);
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setError(error.toString());
      });
  }, [vehicleId]);

  return (
    <div className='owner-list-component'>
      <div className="owner-list">
      <h2>Owners</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {owners.map((owner) => (
          <li key={owner.id}>{owner.name}</li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

export default OwnerList;
