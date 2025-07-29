import React, { useState, useEffect } from "react";
import { useComments } from "../hooks/useComments";

interface Props {
  characterId: string;
}

export const CommentBox: React.FC<Props> = ({ characterId }) => {
  const { comment, setComment, deleteComment } = useComments(characterId);
  const [editing, setEditing] = useState(!comment);
  const [tempComment, setTempComment] = useState("");
  
  useEffect(() => {
    setEditing(!comment);
    setTempComment(comment || "");
  }, [characterId, comment]);
  
  const handleSave = () => {
    setComment(tempComment);
    setEditing(false);
  };
  
  const handleCancel = () => {
    setTempComment(comment || "");
    setEditing(false);
  };
  
  const handleEdit = () => {
    setTempComment(comment || "");
    setEditing(true);
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Comments</span>
      </div>
      {editing ? (
        <div className="space-y-3">
          <textarea
            className="border-2 border-gray-200 rounded-xl w-full min-h-[80px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
            style={{'--tw-ring-color': 'var(--primary-600)'} as React.CSSProperties}
            value={tempComment}
            onChange={e => setTempComment(e.target.value)}
            autoFocus
            placeholder="Share your thoughts about this character..."
          />
          <div className="flex items-center justify-end gap-3">
            <button
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-700 transition-colors duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{backgroundColor: 'var(--primary-600)'} as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-700)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
              onClick={handleSave}
            >
              Save Comment
            </button>
          </div>
        </div>
      ) : comment ? (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <div className="whitespace-pre-line text-gray-900 mb-3 leading-relaxed">{comment}</div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
            <button
              className="flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-white"
              style={{color: 'var(--primary-600)'} as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
              onClick={handleEdit}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              className="flex items-center px-3 py-1.5 text-xs font-semibold text-red-500 hover:text-red-600 rounded-lg transition-all duration-200 hover:bg-red-50"
              onClick={deleteComment}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <button
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border-2 border-dashed border-gray-300 rounded-xl transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
          style={{color: 'var(--primary-600)'} as React.CSSProperties}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary-700)';
            e.currentTarget.style.borderColor = 'var(--primary-300)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--primary-600)';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onClick={handleEdit}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add a comment
        </button>
      )}
    </div>
  );
};
