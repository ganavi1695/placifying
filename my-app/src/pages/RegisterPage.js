import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function RegisterPage({ setIsRegistered }) {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmed, setConfirmed] = useState(false);
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
    // In a real app, you'd send the OTP to the email here
    console.log('OTP sent to email:', newOtp); // For demo purposes
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }
    if (otp !== correctOtp) {
      setOtpError('Incorrect OTP. Please try again.');
      return;
    }
    setOtpError('');
    setConfirmed(true);
    setIsRegistered(true);
    navigate('/profile');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-teal-600 dark:text-teal-300">Create account</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Register with Gmail and verify your learning profile.</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Simulate a secure signup experience with OTP verification and quick onboarding.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-[1fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-6 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Gmail address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400"
          />
          {emailError && <p className="text-sm text-red-600 dark:text-red-400">{emailError}</p>}
          <Button
            onClick={handleSendOTP}
            disabled={!email}
            className="w-full"
          >
            Send OTP
          </Button>
          {otpSent && (
            <div className="space-y-4 rounded-3xl border border-teal-300 bg-teal-100 p-4 dark:border-slate-600 dark:bg-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300">OTP has been sent to your email. Enter the 6-digit code below to continue.</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Demo OTP: <span className="font-mono font-bold">{correctOtp}</span></p>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder=""
                className="w-full rounded-3xl border border-teal-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
              />
              {otpError && <p className="text-sm text-red-600 dark:text-red-400">{otpError}</p>}
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full"
              >
                Verify OTP
              </Button>
            </div>
          )}
          {confirmed && <p className="rounded-3xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal-900 dark:bg-slate-700 dark:text-teal-200">OTP verified successfully. Redirecting to profile creation...</p>}
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 text-slate-900 dark:from-slate-700 dark:to-slate-700 dark:text-slate-50 shadow-md">
          <h3 className="text-lg font-semibold">Why register?</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li>• Personalized AI roadmap and progress tracking</li>
            <li>• Save study tasks and quiz performance</li>
            <li>• Access domain-specific learning paths</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
