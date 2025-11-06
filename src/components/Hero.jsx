import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Play } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/OG17yM2eUIs8MUmA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-xl rounded-2xl backdrop-blur bg-white/70 dark:bg-neutral-900/70 p-6 shadow-lg">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Smart AI Dustbin Monitoring & Eco-Rewards
          </h1>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            Track bin fill levels in real-time, earn rewards, and play eco games. Join Trashbotics to build cleaner, greener cities.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={onGetStarted} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow hover:brightness-110">
              <Rocket size={18} /> Get Started
            </button>
            <a href="#about" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 backdrop-blur bg-white/70 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200">
              <Play size={16} /> Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-neutral-950 opacity-80" />
    </section>
  );
};

export default Hero;
