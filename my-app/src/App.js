import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isPathSelected, setIsPathSelected] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 text-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-slate-50">

        {isPathSelected && <Navbar />}

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
              <Route path="/register" element={<RegisterPage setIsRegistered={setIsRegistered} />} />
              <Route path="/login" element={<LoginPage setIsRegistered={setIsRegistered} />} />
              <Route path="/profile" element={
                isRegistered
                  ? <ProfilePage setIsProfileComplete={setIsProfileComplete} />
                  : <Navigate to="/register" replace />
              } />

              <Route path="/selection" element={
                isProfileComplete
                  ? <SelectionPage setIsPathSelected={setIsPathSelected} />
                  : <Navigate to="/profile" replace />
              } />

              <Route path="/quiz" element={
                isProfileComplete
                  ? <QuizPage />
                  : <Navigate to="/profile" replace />
              } />

              <Route path="/dashboard" element={isPathSelected ? <DashboardPage /> : <Navigate to="/selection" replace />} />
              <Route path="/fundamentals" element={isPathSelected ? <FundamentalsPage /> : <Navigate to="/selection" replace />} />
              <Route path="/topics" element={isPathSelected ? <TopicsPage /> : <Navigate to="/selection" replace />} />
              <Route path="/domains" element={isPathSelected ? <DomainsPage /> : <Navigate to="/selection" replace />} />
              <Route path="/chatbot" element={isPathSelected ? <ChatbotPage /> : <Navigate to="/selection" replace />} />

              {/* ✅ FIX: add both routes */}
              <Route path="/roadmap" element={isPathSelected ? <RoadmapPage /> : <Navigate to="/selection" replace />} />
              <Route path="/roadmap/:name" element={isPathSelected ? <RoadmapPage /> : <Navigate to="/selection" replace />} />

              <Route path="/tasks" element={isPathSelected ? <TasksPage /> : <Navigate to="/selection" replace />} />
              <Route path="/roadmap-update" element={isPathSelected ? <RoadmapUpdatePage /> : <Navigate to="/selection" replace />} />
              <Route path="/progress" element={isPathSelected ? <ProgressPage /> : <Navigate to="/selection" replace />} />

              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;