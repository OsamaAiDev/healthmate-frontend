import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const reportsRes = await axios.get('http://localhost:5000/api/reports', config);
        setReports(reportsRes.data);

        const vitalsRes = await axios.get('http://localhost:5000/api/vitals', config);
        setVitals(vitalsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">My Reports</h2>
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report._id} className="px-6 py-4">
                  <Link to={`/report/${report._id}`} className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-blue-600 hover:text-blue-800">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.reportType}</p>
                    </div>
                    <p className="text-sm text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">My Vitals</h2>
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {vitals.map((vital) => (
                <li key={vital._id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      {vital.bloodPressure && <p className="text-md">BP: {vital.bloodPressure}</p>}
                      {vital.bloodSugar && <p className="text-md">Sugar: {vital.bloodSugar}</p>}
                      {vital.weight && <p className="text-md">Weight: {vital.weight} kg</p>}
                      {vital.notes && <p className="text-sm text-gray-500">{vital.notes}</p>}
                    </div>
                    <p className="text-sm text-gray-500">{new Date(vital.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
