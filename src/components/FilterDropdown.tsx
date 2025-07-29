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
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border transform hover:scale-105 ${
            currentFilter === option
              ? 'shadow-md hover:shadow-lg'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
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
    <div className="hidden md:block absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-10 animate-fade-in">
      <div className="p-5 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Character
          </h3>
          {renderFilterButtons(
            ['All', 'Starred', 'Others', 'Deleted'],
            characterFilter,
            onCharacterFilterChange
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Species
          </h3>
          {renderFilterButtons(
            ['All', 'Human', 'Alien'],
            speciesFilter,
            onSpeciesFilterChange
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Status
          </h3>
          {renderFilterButtons(
            ['All', 'Alive', 'Dead', 'unknown'],
            statusFilter,
            onStatusFilterChange
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Gender
          </h3>
          {renderFilterButtons(
            ['All', 'Male', 'Female', 'Genderless', 'unknown'],
            genderFilter,
            onGenderFilterChange
          )}
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <button 
            onClick={onClose}
            className="w-full text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            style={{backgroundColor: 'var(--primary-600)'} as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;