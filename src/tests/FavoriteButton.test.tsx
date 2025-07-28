import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FavoriteButton } from '../components/FavoriteButton';

// Mock the useFavorites hook
const mockIsFavorite = vi.fn();
const mockToggleFavorite = vi.fn();

vi.mock('../hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  }),
}));

describe('FavoriteButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders favorite button correctly', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton characterId="1" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Favorite');
  });

  test('shows correct aria-label when favorited', () => {
    mockIsFavorite.mockReturnValue(true);
    
    render(<FavoriteButton characterId="1" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Unfavorite');
  });

  test('calls toggleFavorite when clicked', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton characterId="1" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  test('stops event propagation when clicked', () => {
    mockIsFavorite.mockReturnValue(false);
    const mockStopPropagation = vi.fn();
    
    render(<FavoriteButton characterId="1" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button, {
      stopPropagation: mockStopPropagation
    });
    
    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
  });

  test('renders small variant by default', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton characterId="1" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-0.5');
    
    const svg = button.querySelector('svg');
    expect(svg).toHaveClass('w-4', 'h-4');
  });

  test('renders large variant correctly', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton characterId="1" variant="large" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2', 'bg-white', 'shadow-lg');
    
    const svg = button.querySelector('svg');
    expect(svg).toHaveClass('w-6', 'h-6');
  });

  test('applies favorite styles when character is favorited', () => {
    mockIsFavorite.mockReturnValue(true);
    
    render(<FavoriteButton characterId="1" />);
    
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveClass('fill-current');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  test('applies unfavorite styles when character is not favorited', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton characterId="1" />);
    
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveClass('text-gray-300');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  test('calls isFavorite with correct character id', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton characterId="test-id" />);
    
    expect(mockIsFavorite).toHaveBeenCalledWith('test-id');
  });
});