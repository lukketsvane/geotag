import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tapet from '../public/tapet.png'; // Adjust this path as necessary

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to map if already logged in
    if (session) {
      router.replace('/map');
    }
  }, [session, router]);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (result?.error) {
      setLoginError('Login failed. Please check your credentials and try again.');
    } else {
      // Assuming '/map' is the route for your map page
      router.replace('/map');
    }
  };

  // Prevent the login form from being displayed while checking for an active session
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="mb-4 w-full px-3 py-2 border rounded-md text-gray-700"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="mb-4 w-full px-3 py-2 border rounded-md text-gray-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Log In
          </button>
        </form>
      </div>
      <div className="flex-1 relative">
        <Image src={tapet} alt="Background" fill className="object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
