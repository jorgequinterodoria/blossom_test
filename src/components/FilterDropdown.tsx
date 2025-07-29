import React from 'react';

interface FilterDropdownProps {
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

const FilterDropdown: React.FC<FilterDropdownProps> = ({
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
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
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
    <div className="hidden md:block absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Character</h3>
          {renderFilterButtons(
            ['All', 'Starred', 'Others', 'Deleted'],
            characterFilter,
            onCharacterFilterChange
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Species</h3>
          {renderFilterButtons(
            ['All', 'Human', 'Alien'],
            speciesFilter,
            onSpeciesFilterChange
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
          {renderFilterButtons(
            ['All', 'Alive', 'Dead', 'unknown'],
            statusFilter,
            onStatusFilterChange
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Gender</h3>
          {renderFilterButtons(
            ['All', 'Male', 'Female', 'Genderless', 'unknown'],
            genderFilter,
            onGenderFilterChange
          )}
        </div>
        
        <button 
          onClick={onClose}
          className="w-full text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
          style={{backgroundColor: 'var(--primary-600)'} as React.CSSProperties}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-700)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;