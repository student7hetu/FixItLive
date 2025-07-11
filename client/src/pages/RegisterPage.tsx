import { useForm } from 'react-hook-form';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  experienceLevel: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await registerUser(data);
      const { token } = res.data;

      localStorage.setItem('token', token);
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-md mx-auto mt-10 space-y-4 p-6 bg-white rounded-xl shadow'
      >
        <h2 className='text-2xl font-bold text-center'>Register</h2>

        <input
          type='text'
          placeholder='Username'
          {...register('username', { required: 'Username is required' })}
          className='w-full px-4 py-2 border rounded'
        />
        {errors.username && (
          <p className='text-red-500 text-sm'>{errors.username.message}</p>
        )}

        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: 'Email is required' })}
          className='w-full px-4 py-2 border rounded'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <input
          type='password'
          placeholder='Password'
          {...register('password', { required: 'Password is required' })}
          className='w-full px-4 py-2 border rounded'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <select
          {...register('experienceLevel', {
            required: 'Experience level is required',
          })}
          className='w-full px-4 py-2 border rounded'
        >
          <option value=''>Select experience level</option>
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='expert'>Expert</option>
        </select>
        {errors.experienceLevel && (
          <p className='text-red-500 text-sm'>
            {errors.experienceLevel.message}
          </p>
        )}

        <button
          type='submit'
          className='w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
