import { useEffect, useState } from 'react';
import { getAcceptedHelpRequests } from '../api/helpApi';
import HelpCard from '../components/HelpCard';

const AcceptedRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await getAcceptedHelpRequests(token);
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching accepted requests:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">🤝 Help Requests I Accepted</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">You haven’t accepted any requests yet.</p>
      ) : (
        requests.map((req: any) => <HelpCard key={req._id} {...req} />)
      )}
    </div>
  );
};

export default AcceptedRequestsPage;
