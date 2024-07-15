import { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegister }:any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      console.log('Registration successful');
      onRegister(); // Call the onRegister callback
    } catch (error:any) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">Register</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already registered?{' '}
        <button
          onClick={onRegister}
          className="text-indigo-500 hover:underline focus:outline-none"
        >
          Login here
        </button>
      </p>
    </div>
  );
}
