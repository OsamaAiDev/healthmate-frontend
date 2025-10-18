import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVitals = () => {
  const [formData, setFormData] = useState({
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    notes: '',
  });
  const navigate = useNavigate();

  const { bloodPressure, bloodSugar, weight, notes } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post('http://localhost:5000/api/vitals', formData, config);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Manual Vitals</h1>
      <div className="bg-white shadow rounded-lg p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">Blood Pressure (e.g., 120/80)</label>
            <div className="mt-1">
              <input id="bloodPressure" name="bloodPressure" type="text" value={bloodPressure} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="bloodSugar" className="block text-sm font-medium text-gray-700">Blood Sugar (e.g., 90 mg/dL)</label>
            <div className="mt-1">
              <input id="bloodSugar" name="bloodSugar" type="text" value={bloodSugar} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <div className="mt-1">
              <input id="weight" name="weight" type="text" value={weight} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <div className="mt-1">
              <textarea id="notes" name="notes" rows="3" value={notes} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Vitals</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVitals;
