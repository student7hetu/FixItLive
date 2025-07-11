import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getHelpRequestById, acceptHelpRequest } from '../api/helpApi';


const RequestDetailPage = () => {

    const { id } = useParams();
const [request, setRequest] = useState<any>(null);
const navigate = useNavigate();


useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getHelpRequestById(id!);
      setRequest(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [id]);

const handleAccept = async () => {
  const token = localStorage.getItem('token');
  if (!token) return alert('You must be logged in');

  try {
    await acceptHelpRequest(id!, token);
    alert('Request accepted!');
    navigate('/');
  } catch (error: any) {
    alert(error.response?.data?.message || 'Could not accept request');
  }
};

  if (!request) return <p>Loading...</p>;

return (
  <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
    <h1 className="text-3xl font-bold">{request.title}</h1>
    <p className="text-gray-600">{request.description}</p>

    <div className="flex flex-col gap-1 text-sm text-gray-700">
      <span>📂 Category: {request.category}</span>
      <span>🎯 Level: {request.experienceLevel}</span>
      <span>📌 Status: {request.status}</span>
      <span>👤 Created by: {request.createdBy.username}</span>
    </div>

    {request.status === 'open' && (
      <button
        onClick={handleAccept}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ✅ Accept Request
      </button>
    )}
  </div>
);

}

export default RequestDetailPage
