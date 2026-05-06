import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function LoginPage({ setUser, setIsProfileComplete }) {
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

      if (!data.token) {
        setError("Login succeeded but no token returned.");
        return;
      }

      localStorage.setItem("token", data.token);

      let loggedInUser = data.user;
      if (!loggedInUser) {
        const profileRes = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: data.token }
        });
        if (!profileRes.ok) {
          setError("Unable to load profile after login.");
          return;
        }
        loggedInUser = await profileRes.json();
      }

      setUser(loggedInUser);
      if (loggedInUser.timeline) {
        localStorage.setItem('timeline', loggedInUser.timeline);
      }
      setIsProfileComplete(Boolean(loggedInUser.dob && loggedInUser.timeline));

      if (!loggedInUser.dob || !loggedInUser.timeline) {
        navigate('/profile');
      } else {
        navigate('/selection');
      }

    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
      
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Login</h2>
        <p className="text-gray-600 dark:text-slate-400">Enter your email and password</p>
      </div>

      <div className="space-y-4">

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 rounded text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:border-teal-500 dark:focus:border-teal-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 rounded text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:border-teal-500 dark:focus:border-teal-400"
        />

        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>

      </div>
    </div>
  );
}