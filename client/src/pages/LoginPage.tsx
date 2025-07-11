import { useForm } from 'react-hook-form';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await loginUser(data);
      const { token } = res.data;

      localStorage.setItem('token', token);
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-md mx-auto mt-10 space-y-4 p-6 bg-white rounded-xl shadow'
      >
        <h2 className='text-2xl font-bold text-center'>Login</h2>

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

        <button
          type='submit'
          className='w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
