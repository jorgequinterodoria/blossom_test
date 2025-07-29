import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { CommentBox } from '../components/CommentBox';

// Mock the useComments hook
const mockSetComment = vi.fn();
const mockDeleteComment = vi.fn();
let mockComment: string | null = null;

vi.mock('../hooks/useComments', () => ({
  useComments: () => ({
    comment: mockComment,
    setComment: mockSetComment,
    deleteComment: mockDeleteComment,
  }),
}));

describe('CommentBox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockComment = null;
  });

  test('renders comment box with title', () => {
    render(<CommentBox characterId="1" />);
    
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  test('shows textarea immediately when no comment exists', () => {
    mockComment = null;
    
    render(<CommentBox characterId="1" />);
    
    const textarea = screen.getByPlaceholderText('Add your comment...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveFocus();
  });

  test('shows "Add a comment" button when not editing and no comment', () => {
    mockComment = null;
    
    render(<CommentBox characterId="1" />);
    
    // First, it should show textarea (editing mode)
    const textarea = screen.getByPlaceholderText('Add your comment...');
    expect(textarea).toBeInTheDocument();
    
    // Simulate blur to exit editing mode
    fireEvent.blur(textarea);
    
    // Now it should show "Add a comment" button
    const addButton = screen.getByText('Add a comment');
    expect(addButton).toBeInTheDocument();
    expect(addButton.tagName).toBe('BUTTON');
  });

  test('displays existing comment with edit and delete buttons', () => {
    mockComment = 'This is a test comment';
    
    render(<CommentBox characterId="1" />);
    
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('enters editing mode when clicking Edit button', () => {
    mockComment = 'Existing comment';
    
    render(<CommentBox characterId="1" />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    const textarea = screen.getByDisplayValue('Existing comment');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveFocus();
  });

  test('calls setComment when typing in textarea', () => {
    mockComment = null;
    
    render(<CommentBox characterId="1" />);
    
    const textarea = screen.getByPlaceholderText('Add your comment...');
    fireEvent.change(textarea, { target: { value: 'New comment text' } });
    
    expect(mockSetComment).toHaveBeenCalledWith('New comment text');
  });

  test('exits editing mode when textarea loses focus', async () => {
    mockComment = 'Existing comment';
    
    render(<CommentBox characterId="1" />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    const textarea = screen.getByDisplayValue('Existing comment');
    fireEvent.blur(textarea);
    
    // Should exit editing mode and show the comment again
    await waitFor(() => {
      expect(screen.getByText('Existing comment')).toBeInTheDocument();
    });
  });

  test('calls deleteComment when clicking Delete button', () => {
    mockComment = 'Comment to delete';
    
    render(<CommentBox characterId="1" />);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockDeleteComment).toHaveBeenCalledTimes(1);
  });

  test('preserves whitespace and line breaks in comment display', () => {
    mockComment = 'Line 1\nLine 2\n\nLine 4';
    
    render(<CommentBox characterId="1" />);
    
    const commentDiv = screen.getByText((content, element) => {
      return element?.textContent === 'Line 1\nLine 2\n\nLine 4';
    });
    expect(commentDiv).toHaveClass('whitespace-pre-line');
  });

  test('starts in editing mode when no comment exists', () => {
    mockComment = null;
    
    render(<CommentBox characterId="1" />);
    
    // Should show textarea immediately when no comment exists
    const textarea = screen.getByPlaceholderText('Add your comment...');
    expect(textarea).toBeInTheDocument();
  });

  test('does not start in editing mode when comment exists', () => {
    mockComment = 'Existing comment';
    
    render(<CommentBox characterId="1" />);
    
    // Should show the comment, not the textarea
    expect(screen.getByText('Existing comment')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Add your comment...')).not.toBeInTheDocument();
  });

  test('textarea has correct styling and attributes', () => {
    mockComment = null;
    
    render(<CommentBox characterId="1" />);
    
    const textarea = screen.getByPlaceholderText('Add your comment...');
    expect(textarea).toHaveClass('border', 'border-gray-300', 'rounded-lg', 'w-full');
    expect(textarea).toHaveAttribute('placeholder', 'Add your comment...');
  });
});