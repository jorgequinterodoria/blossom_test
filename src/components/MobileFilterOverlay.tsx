import React from 'react';

interface MobileFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  characterFilter: 'All' | 'Starred' | 'Others' | 'Deleted';
  speciesFilter: 'All' | 'Human' | 'Alien';
  statusFilter: 'All' | 'Alive' | 'Dead' | 'unknown';
  genderFilter: 'All' | 'Male' | 'Female' | 'Genderless' | 'unknown';
  onCharacterFilterChange: (filter: 'All' | 'Starred' | 'Others' | 'Deleted') => void;
  onSpeciesFilterChange: (filter: 'All' | 'Human' | 'Alien') => void;
  onStatusFilterChange: (filter: 'All' | 'Alive' | 'Dead' | 'unknown') => void;
  onGenderFilterChange: (filter: 'All' | 'Male' | 'Female' | 'Genderless' | 'unknown') => void;
}

const MobileFilterOverlay: React.FC<MobileFilterOverlayProps> = ({
  isOpen,
  onClose,
  characterFilter,
  speciesFilter,
  statusFilter,
  genderFilter,
  onCharacterFilterChange,
  onSpeciesFilterChange,
  onStatusFilterChange,
  onGenderFilterChange
}) => {
  if (!isOpen) return null;

  const renderFilterButtons = <T extends string>(
    options: T[],
    currentFilter: T,
    onChange: (filter: T) => void
  ) => (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
            currentFilter === option
              ? 'border-gray-200 hover:bg-gray-200'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
          }`}
          style={currentFilter === option ? {
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-700)',
            borderColor: 'var(--primary-600)'
          } : {}}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b border-gray-200">
          <button onClick={onClose} className="p-2 mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Characters</h3>
            {renderFilterButtons(
              ['All', 'Starred', 'Others'] as const,
              characterFilter,
              onCharacterFilterChange
            )}
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Species</h3>
            {renderFilterButtons(
              ['All', 'Human', 'Alien'] as const,
              speciesFilter,
              onSpeciesFilterChange
            )}
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Status</h3>
            {renderFilterButtons(
              ['All', 'Alive', 'Dead', 'unknown'] as const,
              statusFilter,
              onStatusFilterChange
            )}
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Gender</h3>
            {renderFilterButtons(
              ['All', 'Male', 'Female', 'Genderless', 'unknown'] as const,
              genderFilter,
              onGenderFilterChange
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="w-full text-white py-3 px-4 rounded-lg text-base font-medium transition-colors"
            style={{backgroundColor: 'var(--primary-600)'} as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterOverlay;