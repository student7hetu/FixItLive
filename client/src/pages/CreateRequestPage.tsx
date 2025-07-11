import { useForm } from 'react-hook-form';
import { createHelpRequest } from '../api/helpApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type HelpRequestForm = {
  title: string;
  description: string;
  category: string;
  experienceLevel: string;
};

const CreateRequestPage = () => {

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<HelpRequestForm>();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
}, []);

const onSubmit = async (data: HelpRequestForm) => {
  const token = localStorage.getItem('token');

  if (!token) return alert('You must be logged in');

  try {
    await createHelpRequest(data, token);
    alert('Help request created!');
    navigate('/');
  } catch (error: any) {
    alert(error.response?.data?.message || 'Something went wrong');
  }
};


const navigate = useNavigate();

  return (
    <div>
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg space-y-4"
>
  <h2 className="text-2xl font-bold text-center">🆘 Create Help Request</h2>

  <input
    type="text"
    placeholder="Title"
    {...register('title', { required: 'Title is required' })}
    className="w-full border px-4 py-2 rounded"
  />
  {errors.title && <p className="text-red-500">{errors.title.message}</p>}

  <textarea
    placeholder="Description"
    {...register('description', { required: 'Description is required' })}
    className="w-full border px-4 py-2 rounded"
  />
  {errors.description && <p className="text-red-500">{errors.description.message}</p>}

  <select
    {...register('category', { required: 'Category is required' })}
    className="w-full border px-4 py-2 rounded"
  >
    <option value="">Select category</option>
    <option value="bug">Bug</option>
    <option value="mentorship">Mentorship</option>
    <option value="code-review">Code Review</option>
    <option value="project-feedback">Project Feedback</option>
  </select>
  {errors.category && <p className="text-red-500">{errors.category.message}</p>}

  <select
    {...register('experienceLevel', { required: 'Experience level is required' })}
    className="w-full border px-4 py-2 rounded"
  >
    <option value="">Select your level</option>
    <option value="beginner">Beginner</option>
    <option value="intermediate">Intermediate</option>
    <option value="expert">Expert</option>
  </select>
  {errors.experienceLevel && <p className="text-red-500">{errors.experienceLevel.message}</p>}

  <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
    Submit Request
  </button>
</form>

    </div>
  )
}

export default CreateRequestPage
