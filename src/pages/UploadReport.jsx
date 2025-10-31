import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const UploadReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    reportType: '',
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const { title, reportType } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('title', title);
    data.append('reportType', reportType);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await api.post('/reports', data, config);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upload Report</h1>
      <div className="bg-white shadow rounded-lg p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <div className="mt-1">
              <input id="title" name="title" type="text" required value={title} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">Report Type</label>
            <div className="mt-1">
              <input id="reportType" name="reportType" type="text" required value={reportType} onChange={onChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
            <div className="mt-1">
              <input id="file" name="file" type="file" required onChange={onFileChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;
