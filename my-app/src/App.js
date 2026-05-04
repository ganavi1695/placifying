import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import SelectionPage from './pages/SelectionPage';
import DashboardPage from './pages/DashboardPage';
import FundamentalsPage from './pages/FundamentalsPage';
import TopicsPage from './pages/TopicsPage';
import DomainsPage from './pages/DomainsPage';
import ChatbotPage from './pages/ChatbotPage';
import QuizPage from './pages/QuizPage';
import RoadmapPage from './pages/RoadmapPage';
import TasksPage from './pages/TasksPage';
import RoadmapUpdatePage from './pages/RoadmapUpdatePage';
import ProgressPage from './pages/ProgressPage';

function App() {
  const [user, setUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isPathSelected, setIsPathSelected] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthChecked(true);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: token
          }
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          setUser(null);
          setIsProfileComplete(false);
          setAuthChecked(true);
          return;
        }

        const data = await res.json();
        setUser(data);
        setIsProfileComplete(Boolean(data.dob && data.timeline));
      } catch (err) {
        console.error(err);
      } finally {
        setAuthChecked(true);
      }
    };

    loadUser();
  }, []);

  const isRegistered = Boolean(user);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 text-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-slate-50">

        {isPathSelected && <Navbar user={user} setUser={setUser} setIsPathSelected={setIsPathSelected} />}

        <div className="md:flex md:items-start">
          {isPathSelected && <Sidebar />}

          <main className="flex-1 p-6 md:p-8 xl:px-10 xl:py-9">
            <Routes>

              <Route path="/" element={
                <LandingPage
                  isRegistered={isRegistered}
                  isProfileComplete={isProfileComplete}
                  isPathSelected={isPathSelected}
                />
              } />
              <Route path="/register" element={<RegisterPage setUser={setUser} />} />
              <Route path="/login" element={<LoginPage setUser={setUser} setIsProfileComplete={setIsProfileComplete} />} />
              <Route path="/profile" element={
                !authChecked
                  ? <div className="py-16 text-center text-lg text-slate-500">Loading profile…</div>
                  : isRegistered
                    ? <ProfilePage user={user} setUser={setUser} setIsProfileComplete={setIsProfileComplete} />
                    : <Navigate to="/register" replace />
              } />
              <Route path="/user-profile" element={
                !authChecked
                  ? <div className="py-16 text-center text-lg text-slate-500">Loading profile…</div>
                  : isRegistered
                    ? <UserProfilePage user={user} />
                    : <Navigate to="/login" replace />
              } />

              <Route path="/selection" element={
                !authChecked
                  ? <div className="py-16 text-center text-lg text-slate-500">Loading…</div>
                  : isRegistered && isProfileComplete
                    ? <SelectionPage setIsPathSelected={setIsPathSelected} />
                    : <Navigate to="/profile" replace />
              } />

              <Route path="/quiz" element={
                !authChecked
                  ? <div className="py-16 text-center text-lg text-slate-500">Loading…</div>
                  : isRegistered && isProfileComplete
                    ? <QuizPage />
                    : <Navigate to="/profile" replace />
              } />

              <Route path="/dashboard" element={isRegistered && isPathSelected ? <DashboardPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/fundamentals" element={isRegistered && isPathSelected ? <FundamentalsPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/topics" element={isRegistered && isPathSelected ? <TopicsPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/domains" element={isRegistered && isPathSelected ? <DomainsPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/chatbot" element={isRegistered && isPathSelected ? <ChatbotPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/roadmap" element={isRegistered && isPathSelected ? <RoadmapPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/roadmap/:name" element={isRegistered && isPathSelected ? <RoadmapPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/tasks" element={isRegistered && isPathSelected ? <TasksPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/roadmap-update" element={isRegistered && isPathSelected ? <RoadmapUpdatePage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />
              <Route path="/progress" element={isRegistered && isPathSelected ? <ProgressPage /> : !isRegistered ? <Navigate to="/login" replace /> : <Navigate to="/selection" replace />} />

              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;