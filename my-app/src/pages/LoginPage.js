import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function LoginPage({ setIsRegistered }) {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [correctOtp, setCorrectOtp] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    const newOtp = generateOTP();
    setCorrectOtp(newOtp);
    setOtpSent(true);

    console.log('Login OTP:', newOtp); // demo
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }

    if (otp !== correctOtp) {
      setOtpError('Incorrect OTP');
      return;
    }

    setOtpError('');
    setIsRegistered(true);

    // 🔥 Redirect to home page
    navigate('/DashboardPage');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
      
      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-teal-600 dark:text-teal-300">
          Welcome back
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Login to continue your learning journey
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Enter your registered email and verify with OTP.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-[1fr_0.8fr]">
        
        {/* Left */}
        <div className="space-y-4 rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-6 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800">

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          />

          {emailError && <p className="text-sm text-red-600">{emailError}</p>}

          <Button onClick={handleSendOTP} className="w-full">
            Send OTP
          </Button>

          {otpSent && (
            <div className="space-y-4 rounded-3xl border border-teal-300 bg-teal-100 p-4 dark:bg-slate-700">
              
              <p className="text-sm">
                Enter the OTP sent to your email
              </p>

              <p className="text-xs">
                Demo OTP: <span className="font-bold">{correctOtp}</span>
              </p>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-3xl border px-4 py-3"
              />

              {otpError && <p className="text-sm text-red-600">{otpError}</p>}

              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-md">
          <h3 className="text-lg font-semibold">Why login?</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>• Continue your learning streak</li>
            <li>• Access your dashboard</li>
            <li>• Track your progress</li>
          </ul>
        </div>

      </div>
    </div>
  );
}