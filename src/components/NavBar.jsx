import React, { useEffect, useState } from 'react';
import { Home, Award, Leaf, Bell, User, Sun, Moon } from 'lucide-react';

const NavBar = ({ onNavigate, loggedIn }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme-dark');
    if (stored === 'true') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme-dark', String(dark));
  }, [dark]);

  const items = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'summary', label: 'Weekly Summary' },
    { key: 'rewards', label: 'Rewards' },
    { key: 'knowledge', label: 'Knowledge Bytes' },
    { key: 'calculator', label: 'Carbon Calculator' },
    { key: 'game', label: 'Eco Game' },
    { key: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 grid place-items-center text-white shadow">
            <Leaf size={20} />
          </div>
          <span className="font-semibold text-lg tracking-tight">Trashbotics</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onNavigate?.(it.key)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((v) => !v)}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="relative p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>
          </button>
          <div className="ml-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-sm flex items-center gap-2">
            <User size={16} />
            <span>{loggedIn ? 'You' : 'Guest'}</span>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3 flex flex-wrap gap-3">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onNavigate?.(it.key)}
            className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
          >
            {it.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
