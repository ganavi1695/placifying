import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function RegisterPage({ setIsRegistered }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Registration failed");
        return;
      }

      alert("Registered successfully 🎉");

      setIsRegistered(true);
      navigate('/login');

    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg">

      <div>
        <h2 className="text-3xl font-semibold">Register</h2>
        <p className="text-gray-600">Create your account</p>
      </div>

      <div className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full border px-4 py-3 rounded"
        />

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

        <Button onClick={handleRegister} className="w-full">
          Register
        </Button>

      </div>
    </div>
  );
}