import React, { useEffect, useState } from 'react';
import './AccidentReportList.css';

const AccidentReportList = ({ vehicleId }) => {
  const [accidentReports, setAccidentReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vehicles/${vehicleId}/accident_reports`, {
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
      .then((data) => setAccidentReports(data))
      .catch((error) => {
        console.error('Error fetching accident reports:', error);
        setError(error.toString());
      });
  }, [vehicleId]);

  return (
    <div className='accident-report-component'>
      <div className="accident-report-list">
      <h2>Accident Reports</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {accidentReports.map((report) => (
          <li key={report.id}>
            {report.date}: {report.description}
            <hr />
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

export default AccidentReportList;
