/*
Build a complete modern ReactJS frontend application for an AI-based learning platform.

Requirements:

1. Tech Stack:
- React (with functional components)
- React Router for navigation
- Tailwind CSS for styling (modern UI, gradients, cards, shadows)
- Use component-based architecture

2. Pages to Create:

A. Authentication Flow:
- Landing Page (Start screen with CTA button)
- User Registration Page (Gmail + OTP UI simulation)
- Profile Creation Page (Name, DOB, Goal Timeline form)

B. Main App Flow:
- Main Dashboard Page (central navigation hub)

C. Fundamentals Section:
- Fundamentals Page
- Subjects Page (DBMS, OS, CN, SE cards)
- Topics & Certificate Suggestions Page

D. Role Specific Section:
- Domain Selection Page (cards for domains like AI, Web Dev, etc.)
- Chatbot Exploration Page (UI only, mock chat interface)

E. Learning Flow:
- Assessment Quiz Page (MCQ UI)
- AI Roadmap Page (timeline / stepper UI)
- Daily Learning Tasks Page (task checklist UI)
- Dynamic Roadmap Update Page (progress-based updates)

F. Final Dashboard:
- Progress Tracking Dashboard (progress bars, streaks, stats)

3. UI Requirements:
- Clean modern UI similar to SaaS dashboards
- Use cards, gradients, icons, and smooth spacing
- Responsive design (mobile + desktop)
- Use consistent color themes (blue, teal, purple like flowchart)
- Add hover effects and transitions

4. Components:
- Navbar
- Sidebar (for dashboard navigation)
- Reusable Card component
- Progress Bar component
- Button component

5. Routing Structure:
- Use React Router with proper routes for all pages

6. Folder Structure:
- /components
- /pages
- /routes
- /assets

7. Extra:
- Add dummy data where needed
- Use clean and readable code
- Use best UI/UX practices

Goal:
Generate all pages and components so the app visually represents the entire flow from user registration → learning → progress dashboard.

*/
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
              <Route
                path="/"
                element={
                  <LandingPage
                    isRegistered={isRegistered}
                    isProfileComplete={isProfileComplete}
                    isPathSelected={isPathSelected}
                  />
                }
              />
              <Route path="/register" element={<RegisterPage setIsRegistered={setIsRegistered} />} />
              <Route path="/profile" element={isRegistered ? <ProfilePage setIsProfileComplete={setIsProfileComplete} /> : <Navigate to="/register" replace />} />
              <Route path="/selection" element={isProfileComplete ? <SelectionPage setIsPathSelected={setIsPathSelected} /> : <Navigate to="/profile" replace />} />
              <Route path="/dashboard" element={isPathSelected ? <DashboardPage /> : <Navigate to="/selection" replace />} />
              <Route path="/fundamentals" element={isPathSelected ? <FundamentalsPage /> : <Navigate to="/selection" replace />} />
              <Route path="/topics" element={isPathSelected ? <TopicsPage /> : <Navigate to="/selection" replace />} />
              <Route path="/domains" element={isPathSelected ? <DomainsPage /> : <Navigate to="/selection" replace />} />
              <Route path="/chatbot" element={isPathSelected ? <ChatbotPage /> : <Navigate to="/selection" replace />} />
              <Route path="/quiz" element={isPathSelected ? <QuizPage /> : <Navigate to="/selection" replace />} />
              <Route path="/roadmap" element={isPathSelected ? <RoadmapPage /> : <Navigate to="/selection" replace />} />
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


