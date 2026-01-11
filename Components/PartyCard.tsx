
import React from 'react';
import { Party } from '../types';

interface PartyCardProps {
  party: Party;
  isSelected: boolean;
  onToggle: (id: number) => void;
  disabled: boolean;
}

const PartyCard: React.FC<PartyCardProps> = ({ party, isSelected, onToggle, disabled }) => {
  return (
    <button
      onClick={() => onToggle(party.id)}
      disabled={disabled && !isSelected}
      className={`relative group p-6 rounded-2xl transition-all duration-300 transform ${
        isSelected 
          ? 'bg-gradient-to-br from-white/10 to-white/5 border-2 border-emerald-400 scale-105 shadow-[0_0_30px_rgba(52,211,153,0.3)]' 
          : 'glass hover:border-white/20 border-transparent hover:scale-102 opacity-80 hover:opacity-100'
      } ${disabled && !isSelected ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-inner transition-transform group-hover:rotate-12 ${
          isSelected ? 'bg-emerald-500/20' : 'bg-white/5'
        }`}>
          {party.icon}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-1">{party.name}</h3>
          <p className="text-xs text-white/50 uppercase tracking-widest">{party.symbol}</p>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default PartyCard;
