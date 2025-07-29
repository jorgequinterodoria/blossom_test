import React from 'react';
import { CharacterDetail } from './CharacterDetail';
import type { Character } from '../types';

interface MobileDetailOverlayProps {
  isOpen: boolean;
  character: Character | null;
  onClose: () => void;
}

const MobileDetailOverlay: React.FC<MobileDetailOverlayProps> = ({
  isOpen,
  character,
  onClose
}) => {
  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b border-gray-200">
          <button onClick={onClose} className="p-2 mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <CharacterDetail character={character} />
        </div>
      </div>
    </div>
  );
};

export default MobileDetailOverlay;