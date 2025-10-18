import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Timeline = () => {
  const [timelineItems, setTimelineItems] = useState([]);

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
        const vitalsRes = await axios.get('http://localhost:5000/api/vitals', config);

        const reports = reportsRes.data.map(item => ({ ...item, type: 'report' }));
        const vitals = vitalsRes.data.map(item => ({ ...item, type: 'vital' }));

        const allItems = [...reports, ...vitals];
        allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setTimelineItems(allItems);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Medical Timeline</h1>
      <div className="flow-root">
        <ul className="-mb-8">
          {timelineItems.map((item, itemIdx) => (
            <li key={item._id}>
              <div className="relative pb-8">
                {itemIdx !== timelineItems.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${item.type === 'report' ? 'bg-blue-500' : 'bg-green-500'}`}>
                      {item.type === 'report' ? (
                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm2 6a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    {item.type === 'report' ? (
                      <div>
                        <p className="text-sm text-gray-500">Report uploaded <Link to={`/report/${item._id}`} className="font-medium text-gray-900">{item.title}</Link></p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500">Vitals added</p>
                        <div className="mt-2 text-sm text-gray-700">
                          {item.bloodPressure && <p>BP: {item.bloodPressure}</p>}
                          {item.bloodSugar && <p>Sugar: {item.bloodSugar}</p>}
                          {item.weight && <p>Weight: {item.weight} kg</p>}
                        </div>
                      </div>
                    )}
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
