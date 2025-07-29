import React, { useState, useCallback, useEffect, useRef } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { useFavorites } from "../hooks/useFavorites";
import { useDeletedCharacters } from "../hooks/useDeletedCharacters";
import type { Character } from "../types";
import { CharacterDetail } from "../components/CharacterDetail";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import MobileFilterOverlay from "../components/MobileFilterOverlay";
import MobileDetailOverlay from "../components/MobileDetailOverlay";
import CharacterListSection from "../components/CharacterListSection";

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
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
      setIsMobileDetailOpen(true);
    }
  }, [characters]);

  const handleBackToList = useCallback(() => {
    setIsMobileDetailOpen(false);
    setSelectedCharacter(null);
  }, []);

  const handleBackToMain = useCallback(() => {
    setIsMobileFilterOpen(false);
  }, []);

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
      {/* Mobile Filter Overlay */}
      <MobileFilterOverlay
        isOpen={isMobileFilterOpen}
        onClose={handleBackToMain}
        characterFilter={characterFilter}
        speciesFilter={speciesFilter}
        statusFilter={statusFilter}
        genderFilter={genderFilter}
        onCharacterFilterChange={setCharacterFilter}
        onSpeciesFilterChange={setSpeciesFilter}
        onStatusFilterChange={setStatusFilter}
        onGenderFilterChange={setGenderFilter}
      />

      {/* Mobile Detail Overlay */}
      <MobileDetailOverlay
        isOpen={isMobileDetailOpen}
        character={selectedCharacter}
        onClose={handleBackToList}
      />

      {/* Desktop/Mobile List View */}
      <div className={`${isMobileDetailOpen ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Rick and Morty list</h1>
          </div>
        </div>
        
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="relative" ref={dropdownRef}>
            <SearchBar
              onSearch={handleSearch}
              onFilterClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              onMobileFilterClick={() => setIsMobileFilterOpen(true)}
            />
            
            <FilterDropdown
              isOpen={isFilterDropdownOpen}
              onClose={() => setIsFilterDropdownOpen(false)}
              characterFilter={characterFilter}
              speciesFilter={speciesFilter}
              statusFilter={statusFilter}
              genderFilter={genderFilter}
              onCharacterFilterChange={setCharacterFilter}
              onSpeciesFilterChange={setSpeciesFilter}
              onStatusFilterChange={setStatusFilter}
              onGenderFilterChange={setGenderFilter}
            />
          </div>
          
          <select
             value={sortOrder}
             onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
             className="hidden md:block w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:border-transparent mt-4"
             style={{'--tw-ring-color': 'var(--primary-600)'} as React.CSSProperties}
           >
             <option value="asc">Name A-Z</option>
             <option value="desc">Name Z-A</option>
           </select>
        </div>
        
        <CharacterListSection
           favoriteCharacters={favoriteCharacters}
           regularCharacters={regularCharacters}
           selectedCharacter={selectedCharacter}
           onCharacterClick={handleCharacterClick}
           loading={loading}
           error={!!error}
         />
      </div>

      <div className={`${isMobileDetailOpen ? 'hidden' : 'hidden'} md:flex flex-1 items-center justify-center bg-gray-50`}>
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
