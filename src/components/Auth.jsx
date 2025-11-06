import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

const Auth = ({ onSuccess }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth success
    setTimeout(() => {
      localStorage.setItem('trashbotics-auth', 'true');
      setLoading(false);
      onSuccess?.();
    }, 800);
  };

  const googleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('trashbotics-auth', 'true');
      setLoading(false);
      onSuccess?.();
    }, 600);
  };

  return (
    <section className="min-h-[70vh] grid place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 grid place-items-center text-white">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
            <p className="text-xs text-neutral-500">Trashbotics — Eco monitoring & rewards</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 pl-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 pl-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow hover:brightness-110 disabled:opacity-60"
          >
            <LogIn size={18} /> {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign up'}
          </button>
        </form>

        <div className="my-4 grid grid-cols-3 items-center gap-3">
          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="text-xs text-neutral-500 text-center">or</div>
          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <button
          onClick={googleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Continue with Google
        </button>

        <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 text-center">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button className="text-emerald-600 hover:underline" onClick={() => setMode('signup')}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="text-emerald-600 hover:underline" onClick={() => setMode('login')}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
