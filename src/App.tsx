import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import DashboardPage from './pages/DashboardPage';
import QuestsPage from './pages/QuestsPage';
import SkillTreePage from './pages/SkillTreePage';
import TavernPage from './pages/TavernPage';
import TrophiesPage from './pages/TrophiesPage';
import TrialsPage from './pages/TrialsPage';
import LearnPage from './pages/LearnPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import StuckHelpPage from './pages/StuckHelpPage';
import CertificatesPage from './pages/CertificatesPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected App Routes */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/skill-tree" element={<SkillTreePage />} />
            <Route path="/tavern" element={<TavernPage />} />
            <Route path="/trophies" element={<TrophiesPage />} />
            <Route path="/trials" element={<TrialsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:id" element={<VideoPlayerPage />} />
            <Route path="/stuck" element={<StuckHelpPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
