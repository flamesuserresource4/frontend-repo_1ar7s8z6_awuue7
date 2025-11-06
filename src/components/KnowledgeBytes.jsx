import React, { useEffect, useRef, useState } from 'react';
import { Quote, Share2 } from 'lucide-react';

const defaultFacts = [
  'Recycling one aluminum can saves enough energy to run a TV for three hours.',
  'Composting food scraps can reduce household waste by up to 30%.',
  'Plastic can take up to 500 years to decompose — reduce and reuse whenever possible.',
  'Glass is 100% recyclable and can be recycled endlessly without loss in quality.',
  'Turning off the tap while brushing can save up to 8 gallons of water a day.'
];

const FactCard = ({ text }) => {
  const share = async () => {
    const shareText = `Eco Fact: ${text} — via Trashbotics 🌿`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Trashbotics', text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Copied to clipboard');
      }
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 grid place-items-center text-white shrink-0">
          <Quote size={18} />
        </div>
        <div className="flex-1">
          <p className="text-neutral-700 dark:text-neutral-200">{text}</p>
          <button onClick={share} className="mt-3 inline-flex items-center gap-2 text-emerald-600 hover:underline">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

const KnowledgeBytes = () => {
  const [facts, setFacts] = useState(defaultFacts);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [facts.length]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Knowledge Bytes</h2>
      <div className="grid md:grid-cols-2 gap-5">
        <FactCard text={facts[index]} />
        <FactCard text={facts[(index + 1) % facts.length]} />
      </div>
    </section>
  );
};

export default KnowledgeBytes;
