import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import LoginForm from './components/Auth/LoginForm';
import Landing from './pages/Landing';
import FarmerDashboard from './pages/FarmerDashboard';
import DealerMarketplace from './pages/DealerMarketplace';
import Traceability from './pages/Traceability';
import Profile from './pages/Profile';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isSignUp, setIsSignUp] = React.useState(false);

  if (!isAuthenticated) {
    return <LoginForm onToggleMode={() => setIsSignUp(!isSignUp)} isSignUp={isSignUp} />;
  }

  return (
    <div className="min-h-screen bg-neutral-white font-inter">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/dashboard" 
            element={user?.role === 'farmer' ? <FarmerDashboard /> : <DealerMarketplace />} 
          />
          <Route 
            path="/marketplace" 
            element={user?.role === 'dealer' ? <DealerMarketplace /> : <FarmerDashboard />} 
          />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;