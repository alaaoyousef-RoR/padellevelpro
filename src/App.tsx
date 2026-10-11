import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { LevelTestPage } from './pages/LevelTestPage';
import { TestResultPage } from './pages/TestResultPage';
import { TrainingProgramPage } from './pages/TrainingProgramPage';
import { LearnPadelPage } from './pages/LearnPadelPage';
import { VideoTutorialsPage } from './pages/VideoTutorialsPage';
import { ProgressTrackerPage } from './pages/ProgressTrackerPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'level-test':
        return <LevelTestPage />;
      case 'test-result':
        return <TestResultPage />;
      case 'my-training-program':
        return <TrainingProgramPage />;
      case 'learn-padel':
      case 'technique-detail':
        return <LearnPadelPage />;
      case 'video-tutorials':
        return <VideoTutorialsPage />;
      case 'progress-tracker':
        return <ProgressTrackerPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0b0c0d] text-[#f8f9fa] font-sans">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Area with independent scroll */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto min-h-screen">
        <main className="flex-1 p-4 sm:p-8 lg:p-12 max-w-7xl w-full mx-auto">
          {renderCurrentPage()}
        </main>
        <Footer />
      </div>

      {/* Authentication Dialog */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
