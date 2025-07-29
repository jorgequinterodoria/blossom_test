import React from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  onFilterClick: () => void;
  onMobileFilterClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterClick,
  onMobileFilterClick
}) => {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search or filter results"
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
          style={{'--tw-ring-color': 'var(--primary-600)'} as React.CSSProperties}
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <button 
          className="hidden md:block absolute right-3 top-3 p-1 transition-colors"
          style={{color: 'var(--primary-600)'} as React.CSSProperties}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
          onClick={onFilterClick}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
      </div>
      <button
        onClick={onMobileFilterClick}
        className="md:hidden p-3 border border-gray-300 rounded-lg bg-white"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;