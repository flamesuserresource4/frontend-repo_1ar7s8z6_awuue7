import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Clock, Gift, Recycle, Gauge } from 'lucide-react';

const Progress = ({ value }) => {
  const color = value < 50 ? 'bg-emerald-500' : value < 80 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div className="w-full h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div
        className={`h-full ${color} transition-[width] duration-700`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

const BinCard = ({ type, color, fill, lastCollected, points }) => {
  const status = fill < 30 ? 'Empty' : fill < 70 ? 'Half-filled' : 'Full';
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (fill >= 80) {
      setShowAlert(true);
      // voice alert
      try {
        const msg = new SpeechSynthesisUtterance(`${type} bin nearing full capacity`);
        msg.rate = 1.05;
        window.speechSynthesis.speak(msg);
      } catch (e) {
        // ignore if not supported
      }
    } else {
      setShowAlert(false);
    }
  }, [fill, type]);

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl grid place-items-center text-white ${color}`}>
            <Recycle size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{type}</h3>
            <p className="text-xs text-neutral-500">Live status: {status}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-neutral-500">Reward Points</div>
          <div className="font-bold">{points}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-neutral-600 dark:text-neutral-300">Fill level</span>
          <span className="font-semibold">{fill}%</span>
        </div>
        <Progress value={fill} />
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <Clock size={16} /> Last collected: {lastCollected}
      </div>

      {showAlert && (
        <div className="mt-4 flex items-center gap-2 text-rose-600 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-3">
          <AlertTriangle size={18} />
          <span>Non-biodegradable bin nearing full capacity!</span>
        </div>
      )}
    </div>
  );
};

const WeeklyMini = () => (
  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center text-white">
        <Gauge size={18} />
      </div>
      <div>
        <h3 className="font-semibold">This Week</h3>
        <p className="text-xs text-neutral-500">At-a-glance</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 text-center">
      <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <div className="text-xs text-neutral-500">Avg Fill</div>
        <div className="font-bold">54%</div>
      </div>
      <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <div className="text-xs text-neutral-500">Collections</div>
        <div className="font-bold">23</div>
      </div>
      <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <div className="text-xs text-neutral-500">Rewards</div>
        <div className="font-bold">+320</div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [bins] = useState(() => {
    // demo data
    return [
      {
        type: 'Biodegradable Bin',
        color: 'bg-emerald-500',
        fill: 42,
        lastCollected: new Date(Date.now() - 1000 * 60 * 60 * 6).toLocaleString(),
        points: 120,
      },
      {
        type: 'Non-Biodegradable Bin',
        color: 'bg-rose-500',
        fill: 86,
        lastCollected: new Date(Date.now() - 1000 * 60 * 60 * 30).toLocaleString(),
        points: 210,
      },
    ];
  });

  const totalPoints = useMemo(() => bins.reduce((a, b) => a + b.points, 0), [bins]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
        {bins.map((b, idx) => (
          <BinCard key={idx} {...b} />
        ))}
      </div>

      <div className="space-y-6">
        <WeeklyMini />
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-white">
              <Gift size={18} />
            </div>
            <div>
              <h3 className="font-semibold">Rewards Wallet</h3>
              <p className="text-xs text-neutral-500">Convert 1000 pts = ₹50</p>
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-4">{totalPoints} pts</div>
          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow hover:brightness-110">Redeem via UPI</button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
