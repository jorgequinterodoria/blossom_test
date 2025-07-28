import React, { useState, useCallback, useEffect, useRef } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { useFavorites } from "../hooks/useFavorites";
import { useDeletedCharacters } from "../hooks/useDeletedCharacters";
import type { Character } from "../types";
import { CharacterCard } from "../components/CharacterCard";
import { CharacterDetail } from "../components/CharacterDetail";

type Filters = { name?: string; status?: string; species?: string; gender?: string; };

export const Home: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characterFilter, setCharacterFilter] = useState<'All' | 'Starred' | 'Others' | 'Deleted'>('All');
  const [speciesFilter, setSpeciesFilter] = useState<'All' | 'Human' | 'Alien'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Alive' | 'Dead' | 'unknown'>('All');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female' | 'Genderless' | 'unknown'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDeleted } = useDeletedCharacters();

  // Construir filtros para la API
  const apiFilters = React.useMemo(() => {
    const result: Filters = { ...filters };
    
    if (statusFilter !== 'All') {
      result.status = statusFilter;
    }
    
    if (genderFilter !== 'All') {
      result.gender = genderFilter;
    }
    
    // Para species, solo enviamos a la API si es un valor específico
    if (speciesFilter === 'Human') {
      result.species = 'Human';
    } else if (speciesFilter === 'Alien') {
      // Para 'Alien', no enviamos filtro de species a la API ya que filtraremos localmente
      delete result.species;
    }
    
    return result;
  }, [filters, statusFilter, genderFilter, speciesFilter]);
  
  const { characters, loading, error } = useCharacters(apiFilters, page);
  const { isFavorite } = useFavorites();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, name: query }));
    setPage(1);
  }, []);

  const handleCharacterClick = useCallback((id: string) => {
    const character = characters?.find(c => c.id === id);
    if (character) {
      setSelectedCharacter(character);
    }
  }, [characters]);

  const filteredCharacters = React.useMemo(() => {
    if (!characters) return [];
    
    let filtered = characters;
    
    // Filtrar por estado de eliminación
    if (characterFilter === 'Deleted') {
      filtered = filtered.filter(char => isDeleted(char.id));
    } else {
      // Por defecto, excluir personajes eliminados
      filtered = filtered.filter(char => !isDeleted(char.id));
      
      if (characterFilter === 'Starred') {
        filtered = filtered.filter(char => isFavorite(char.id));
      } else if (characterFilter === 'Others') {
        filtered = filtered.filter(char => !isFavorite(char.id));
      }
    }
    
    if (speciesFilter === 'Human') {
      filtered = filtered.filter(char => char.species === 'Human');
    } else if (speciesFilter === 'Alien') {
      filtered = filtered.filter(char => char.species !== 'Human');
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(char => char.status === statusFilter);
    }
    
    if (genderFilter !== 'All') {
      filtered = filtered.filter(char => char.gender === genderFilter);
    }
    
    // Ordenamiento por nombre (crear copia para evitar mutación)
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    return sorted;
  }, [characters, characterFilter, speciesFilter, statusFilter, genderFilter, sortOrder, isFavorite, isDeleted]);

  const favoriteCharacters = filteredCharacters.filter(character => isFavorite(character.id));
  const regularCharacters = filteredCharacters.filter(character => !isFavorite(character.id));

  return (
    <div className="flex h-screen bg-white">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Rick and Morty list</h1>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search or filter results"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{'--tw-ring-color': 'var(--primary-600)'} as React.CSSProperties}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
            <button 
              className="absolute right-3 top-3 p-1 transition-colors"
              style={{color: 'var(--primary-600)'} as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
            
            {isFilterDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Character</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Starred', 'Others', 'Deleted'].map((option) => (
                        <button
                           key={option}
                           onClick={() => setCharacterFilter(option as 'All' | 'Starred' | 'Others' | 'Deleted')}
                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                             characterFilter === option
                               ? 'border-gray-200 hover:bg-gray-200'
                               : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                           }`}
                           style={characterFilter === option ? {
                             backgroundColor: 'var(--primary-100)',
                             color: 'var(--primary-700)',
                             borderColor: 'var(--primary-600)'
                           } : {}}
                         >
                           {option}
                         </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Species</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Human', 'Alien'].map((option) => (
                        <button
                           key={option}
                           onClick={() => setSpeciesFilter(option as 'All' | 'Human' | 'Alien')}
                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                             speciesFilter === option
                               ? 'border-gray-200 hover:bg-gray-200'
                               : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                           }`}
                           style={speciesFilter === option ? {
                             backgroundColor: 'var(--primary-100)',
                             color: 'var(--primary-700)',
                             borderColor: 'var(--primary-600)'
                           } : {}}
                         >
                           {option}
                         </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Alive', 'Dead', 'unknown'].map((option) => (
                        <button
                           key={option}
                           onClick={() => setStatusFilter(option as 'All' | 'Alive' | 'Dead' | 'unknown')}
                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                             statusFilter === option
                               ? 'border-gray-200 hover:bg-gray-200'
                               : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                           }`}
                           style={statusFilter === option ? {
                             backgroundColor: 'var(--primary-100)',
                             color: 'var(--primary-700)',
                             borderColor: 'var(--primary-600)'
                           } : {}}
                         >
                           {option}
                         </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Gender</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Male', 'Female', 'Genderless', 'unknown'].map((option) => (
                        <button
                           key={option}
                           onClick={() => setGenderFilter(option as 'All' | 'Male' | 'Female' | 'Genderless' | 'unknown')}
                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                             genderFilter === option
                               ? 'border-gray-200 hover:bg-gray-200'
                               : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                           }`}
                           style={genderFilter === option ? {
                             backgroundColor: 'var(--primary-100)',
                             color: 'var(--primary-700)',
                             borderColor: 'var(--primary-600)'
                           } : {}}
                         >
                           {option}
                         </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                     onClick={() => setIsFilterDropdownOpen(false)}
                     className="w-full text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
                     style={{backgroundColor: 'var(--primary-600)'} as React.CSSProperties}
                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-700)')}
                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
                   >
                     Filter
                   </button>
                </div>
              </div>
            )}
          </div>
          
          <select
             value={sortOrder}
             onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
             className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:border-transparent mt-4"
             style={{'--tw-ring-color': 'var(--primary-600)'} as React.CSSProperties}
           >
             <option value="asc">Name A-Z</option>
             <option value="desc">Name Z-A</option>
           </select>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {favoriteCharacters.length > 0 && (
              <div>
                <div className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STARRED CHARACTERS ({favoriteCharacters.length})
                </div>
                <div className="space-y-1">
                  {favoriteCharacters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      onClick={() => handleCharacterClick(character.id)}
                      isSelected={selectedCharacter?.id === character.id}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <div className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                CHARACTERS ({regularCharacters.length})
              </div>
              <div className="space-y-1">
                {regularCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={() => handleCharacterClick(character.id)}
                    isSelected={selectedCharacter?.id === character.id}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {loading && <div className="p-6 text-center text-gray-500">Loading…</div>}
          {error && <div className="p-6 text-center text-red-500">Error loading characters.</div>}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50">
        {selectedCharacter ? (
          <CharacterDetail character={selectedCharacter} />
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">Select a character to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};
