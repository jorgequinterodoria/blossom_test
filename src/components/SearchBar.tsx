import React, { useState } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <div className={`relative transition-all duration-200 ${
          isFocused ? 'transform scale-[1.02]' : ''
        }`}>
          <input
            type="text"
            value={searchValue}
            placeholder="Search or filter results"
            className={`w-full pl-11 pr-20 py-3.5 border rounded-xl text-sm transition-all duration-200 bg-white ${
              isFocused 
                ? 'border-purple-300 shadow-lg ring-4 ring-purple-100' 
                : 'border-gray-200 hover:border-gray-300 shadow-sm'
            } focus:outline-none`}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* Search icon */}
          <div className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? 'text-purple-500' : 'text-gray-400'
          }`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Clear button */}
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Filter button - Desktop */}
          <button 
            className="hidden md:block absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all duration-200 hover:bg-purple-50"
            style={{color: 'var(--primary-600)'} as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
            onClick={onFilterClick}
            type="button"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Filter button - Mobile */}
      <button
        onClick={onMobileFilterClick}
        className="md:hidden p-3.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
        type="button"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;