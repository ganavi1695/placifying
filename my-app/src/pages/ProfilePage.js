import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function ProfilePage({ user, setUser, setIsProfileComplete }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [timelineValue, setTimelineValue] = useState('');
  const [timelineUnit, setTimelineUnit] = useState('months');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setName(user.name || '');
    setDob(user.dob || '');

    if (user.timeline) {
      const value = Number(user.timeline.split(' ')[0]) || '';
      if (user.timeline.includes('year')) {
        setTimelineUnit('years');
        setTimelineValue(value);
      } else {
        setTimelineUnit('months');
        setTimelineValue(value);
      }
    }
  }, [user]);

  const handleSaveProfile = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!dob) newErrors.dob = 'Date of birth is required';
    if (!timelineValue || timelineValue <= 0) newErrors.timeline = 'Valid timeline is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const timelineNumber = Number(timelineValue);
    let months = timelineNumber;
    if (timelineUnit === 'years') {
      months = timelineNumber * 12;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setGeneralError('Please log in again to update your profile.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          name,
          dob,
          timeline: `${months} months`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setGeneralError(data.msg || 'Unable to save profile');
        return;
      }

      setUser(data);
      if (data.timeline) {
        localStorage.setItem('timeline', data.timeline);
      }
      setIsProfileComplete(true);
      setErrors({});
      setGeneralError('');
      navigate('/selection');
    } catch (err) {
      console.error(err);
      setGeneralError('Something went wrong while saving your profile.');
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
      <div className="space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-600 dark:text-teal-300">Profile setup</p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
            Tell us about yourself to personalize your learning path.
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Complete your profile in a few steps and let the app tailor the experience to your goals.
          </p>

          <div className="space-y-4 rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-6 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jessica Parker"
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:bg-slate-700"
            />
            {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>}

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Date of birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:bg-slate-700"
            />
            {errors.dob && <p className="text-sm text-red-600 dark:text-red-400">{errors.dob}</p>}

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Target timeline
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={timelineValue}
                onChange={(e) => setTimelineValue(e.target.value)}
                placeholder="6"
                className="flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:bg-slate-700"
              />
              <select
                value={timelineUnit}
                onChange={(e) => setTimelineUnit(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:bg-slate-700"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            {errors.timeline && <p className="text-sm text-red-600 dark:text-red-400">{errors.timeline}</p>}
            {generalError && <p className="text-sm text-red-600 dark:text-red-400">{generalError}</p>}

            <Button onClick={handleSaveProfile} className="w-full">
              Save profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}