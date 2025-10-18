import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${id}`, config);
        setReport(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReport();
  }, [id]);

  const handleSummarize = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(`http://localhost:5000/api/reports/summary/${id}`, {}, config);
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{report.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Report Details</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p><strong>Report Type:</strong> {report.reportType}</p>
            <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 inline-block">View Full Report</a>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">AI Summary</h2>
            {report.summary && report.summary.english ? (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">English Summary</h3>
                <p>{report.summary.english}</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Roman Urdu Summary</h3>
                <p>{report.summary.romanUrdu}</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="mb-4">No summary available for this report.</p>
                <button onClick={handleSummarize} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                  {loading ? 'Generating Summary...' : 'Generate AI Summary'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          {report.doctorQuestions && report.doctorQuestions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Questions to Ask Your Doctor</h2>
              <div className="bg-white shadow rounded-lg p-6">
                <ul className="list-disc list-inside">
                  {report.doctorQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </div>
            </div>
          )}

          {report.foodSuggestions && (report.foodSuggestions.toEat.length > 0 || report.foodSuggestions.toAvoid.length > 0) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Food Suggestions</h2>
              <div className="bg-white shadow rounded-lg p-6">
                {report.foodSuggestions.toEat.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mb-2">Foods to Eat</h3>
                    <ul className="list-disc list-inside">
                      {report.foodSuggestions.toEat.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </>
                )}
                {report.foodSuggestions.toAvoid.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mt-4 mb-2">Foods to Avoid</h3>
                    <ul className="list-disc list-inside">
                      {report.foodSuggestions.toAvoid.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}

          {report.homeRemedies && report.homeRemedies.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Home Remedies</h2>
              <div className="bg-white shadow rounded-lg p-6">
                <ul className="list-disc list-inside">
                  {report.homeRemedies.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
