import { useState } from 'react';
import { login } from '../api/reqres';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in'); // email valid untuk reqres
  const [password, setPassword] = useState('cityslicka');   // password valid
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      navigate('/dashboard'); // ✅ redirect setelah login
    } catch (err) {
      setError('Login gagal. Periksa email dan password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
