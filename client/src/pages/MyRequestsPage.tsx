import { useEffect, useState } from 'react';
import { getMyHelpRequests } from '../api/helpApi';
import HelpCard from '../components/HelpCard';

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await getMyHelpRequests(token);
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching my requests:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">📌 My Help Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests created yet.</p>
      ) : (
        requests.map((req: any) => <HelpCard key={req._id} {...req} />)
      )}
    </div>
  );
};

export default MyRequestsPage;
