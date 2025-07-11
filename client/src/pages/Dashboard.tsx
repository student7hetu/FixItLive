import { useEffect, useState } from 'react';
import { getHelpRequests } from '../api/helpApi';
import HelpCard from '../components/HelpCard';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHelpRequests();
      setRequests(res.data.requests);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-4">📋 All Help Requests</h1>
      {requests.length === 0 ? (
        <p>No help requests yet.</p>
      ) : (
        requests.map((req: any) => <HelpCard key={req._id} {...req} />)
      )}
    </div>
  );
};

export default Dashboard;
