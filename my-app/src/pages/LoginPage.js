import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function LoginPage({ setIsRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Login failed");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);

      setIsRegistered(true);
      navigate('/DashboardPage');

    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg">
      
      <div>
        <h2 className="text-3xl font-semibold">Login</h2>
        <p className="text-gray-600">Enter your email and password</p>
      </div>

      <div className="space-y-4">

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border px-4 py-3 rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border px-4 py-3 rounded"
        />

        {error && <p className="text-red-600">{error}</p>}

        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>

      </div>
    </div>
  );
}