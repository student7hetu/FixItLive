import { Link } from 'react-router-dom';

type HelpRequestProps = {
  _id: string;
  title: string;
  category: string;
  experienceLevel: string;
  status: string;
  createdBy: { username: string };
};

const HelpCard = ({
  _id,
  title,
  category,
  experienceLevel,
  status,
  createdBy,
}: HelpRequestProps) => {
  return (
    <Link to={`/request/${_id}`}>
      <div className="p-4 border rounded-lg shadow bg-white space-y-2 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">Category: {category}</p>
        <p className="text-sm text-gray-600">Level: {experienceLevel}</p>
        <p className="text-sm text-gray-600">Status: {status}</p>
        <p className="text-sm text-gray-500">Posted by: {createdBy.username}</p>
      </div>
    </Link>
  );
};

export default HelpCard;
