import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState('home');

  useEffect(() => {
    const authed = localStorage.getItem('trashbotics-auth') === 'true';
    setLoggedIn(authed);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setSection('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <NavBar onNavigate={setSection} loggedIn={loggedIn} />

      {!loggedIn ? (
        <>
          <Hero onGetStarted={() => setSection('auth')} />
          {section === 'auth' && <Auth onSuccess={handleLoginSuccess} />}
        </>
      ) : (
        <>
          <Hero onGetStarted={() => setSection('home')} />
          <Dashboard />
        </>
      )}

      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Trashbotics — Smart, Clean, Rewarding.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-600">Privacy</a>
            <a href="#" className="hover:text-emerald-600">Terms</a>
            <a href="#" className="hover:text-emerald-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
