import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { CharacterList } from '../components/CharacterList';
import type { Character } from '../types';

const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' }
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive', 
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Earth (Replacement Dimension)' }
  }
];

const mockOnCharacterClick = vi.fn();

describe('CharacterList', () => {
  test('renders character list correctly', () => {
    render(
      <CharacterList 
        characters={mockCharacters} 
        onCharacterClick={mockOnCharacterClick}
      />
    );
    
    // Check if character names are displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    
    // Check if character images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  test('displays character details', () => {
    render(
      <CharacterList 
        characters={mockCharacters} 
        onCharacterClick={mockOnCharacterClick}
      />
    );
    
    // Check if character species is displayed
    const humanElements = screen.getAllByText('Human');
    expect(humanElements.length).toBeGreaterThan(0);
  });

  test('handles empty character list', () => {
    render(
      <CharacterList 
        characters={[]} 
        onCharacterClick={mockOnCharacterClick}
      />
    );
    
    // Check if the characters section header is displayed
    expect(screen.getByText('CHARACTERS (0)')).toBeInTheDocument();
  });

  test('handles character selection', () => {
    render(
      <CharacterList 
        characters={mockCharacters} 
        onCharacterClick={mockOnCharacterClick}
      />
    );
    
    const firstCharacter = screen.getByText('Rick Sanchez').closest('div');
    if (firstCharacter) {
      fireEvent.click(firstCharacter);
      expect(mockOnCharacterClick).toHaveBeenCalledWith('1');
    }
  });
});
