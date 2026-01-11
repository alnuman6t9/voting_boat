
import React, { useState, useMemo, useEffect } from 'react';
import { PARTIES, VOTE_LIMIT, BOAT_ID } from './constants';
import PartyCard from './components/PartyCard';
import ElectionAssistant from './components/ElectionAssistant';

const App: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const isBoatSelected = useMemo(() => selectedIds.includes(BOAT_ID), [selectedIds]);
  const selectionFull = selectedIds.length >= VOTE_LIMIT;

  // Hide warning if user eventually selects the boat
  useEffect(() => {
    if (isBoatSelected) {
      setShowWarning(false);
    }
  }, [isBoatSelected]);

  const toggleParty = (id: number) => {
    setShowWarning(false); // Clear warning on interaction
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (!selectionFull) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleVote = () => {
    if (selectedIds.length === 0) return;

    if (isBoatSelected) {
      setHasVoted(true);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const resetVote = () => {
    setSelectedIds([]);
    setHasVoted(false);
    setShowWarning(false);
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="glass p-12 rounded-[2rem] max-w-lg w-full border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)] animate-in fade-in zoom-in duration-500">
          <div className="text-6xl mb-6">🗳️</div>
          <h1 className="text-4xl font-bold text-emerald-400 mb-4">ভোট সফল হয়েছে!</h1>
          <p className="text-slate-300 mb-8 font-light">গণতন্ত্রে অংশ নেয়ার জন্য ধন্যবাদ। আপনার পছন্দ রেকর্ড করা হয়েছে।</p>
          <button 
            onClick={resetVote}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white border border-white/10"
          >
            আবার শুরু করুন
          </button>
          <div className="mt-12 pt-8 border-t border-white/5 text-slate-500 text-sm">
            Developed by <span className="text-slate-300 font-semibold">Abdullah Al Numan</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-playfair font-black text-white tracking-tight">
          জাতীয় নির্বাচন <span className="text-blue-500">২০২৬</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-light">
          আপনার মূল্যবান ৩টি ভোট প্রদান করুন
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {PARTIES.map(party => (
          <PartyCard
            key={party.id}
            party={party}
            isSelected={selectedIds.includes(party.id)}
            onToggle={toggleParty}
            disabled={selectionFull}
          />
        ))}
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {showWarning && !isBoatSelected && (
          <div className="glass p-8 rounded-2xl border-rose-500/50 bg-rose-500/10 text-center transform animate-in zoom-in slide-in-from-top-4 duration-500 shadow-[0_0_40px_rgba(244,63,94,0.2)]">
            <h2 className="no-boat-text text-4xl md:text-5xl font-playfair font-black text-rose-500 italic mb-3">
              "No Boat No vote"
            </h2>
            <p className="text-rose-400/90 text-base font-medium">
              আপনার ভোট নিশ্চিত করতে অবশ্যই নৌকা (⛵) নির্বাচন করতে হবে।
            </p>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleVote}
            disabled={selectedIds.length === 0}
            className={`w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl ${
              selectedIds.length > 0 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 active:scale-95' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            {selectedIds.length === 0 
              ? 'প্রার্থী নির্বাচন করুন' 
              : `ভোট নিশ্চিত করুন (${selectedIds.length}/${VOTE_LIMIT})`}
          </button>
          
          <div className="text-slate-500 text-sm flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            সিস্টেম অনলাইনে রয়েছে
          </div>
        </div>

        <ElectionAssistant />

        <footer className="pt-12 pb-6 text-center">
          <div className="text-slate-500 text-sm tracking-widest uppercase">
            Created by <span className="text-slate-300 font-bold border-b border-blue-500/30">Abdullah Al Numan</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
