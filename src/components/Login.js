import { Link } from 'react-router-dom';

const LoginPage = () => (
  <div className='flex flex-col'>
    <div className='bg-yellow-300 flex text-center shadow-md'>
      <div className='max-w-screen-md text-white font-bold text-5xl flex items-center w-full justify-center mx-auto'>
        Login to your account
      </div>
    </div>

    
      <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:max-w-screen-md mx-auto py-10'>
        <div className='max-w-screen-sm'>
          <form className='flex flex-col'>
            <label className='font-bold mb-2'>Username</label>
            <input type='text' className='border p-2 mb-4' placeholder='Enter your username' />

            <label className='font-bold mb-2'>Password</label>
            <input type='password' className='border p-2 mb-4' placeholder='Enter your password' />

            <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
              Login
            </button>
          </form>

          <p className='mt-4'>
            Don't have an account? <Link to="/register" className='underline'>Sign up</Link>.
          </p>
        </div>
      </div>
    
  </div>
);

export default LoginPage;
