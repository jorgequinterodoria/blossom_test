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
      <div className="font-medium text-sm text-gray-700 mb-2">Comments</div>
      {editing ? (
        <div>
          <textarea
            className="border border-gray-300 rounded-lg w-full min-h-[60px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent mb-2"
            style={{'--tw-ring-color': 'var(--primary-600)'} as React.CSSProperties}
            value={tempComment}
            onChange={e => setTempComment(e.target.value)}
            autoFocus
            placeholder="Add your comment..."
          />
          <div className="flex items-center gap-3">
            <button
              className="text-xs font-medium transition-colors"
              style={{color: 'var(--primary-600)'} as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-xs text-gray-500 hover:text-gray-600 font-medium"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : comment ? (
        <div className="bg-gray-50 rounded-lg p-3 text-sm">
          <div className="whitespace-pre-line text-gray-900 mb-2">{comment}</div>
          <div className="flex items-center gap-3">
            <button
              className="text-xs font-medium transition-colors"
              style={{color: 'var(--primary-600)'} as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-xs text-red-500 hover:text-red-600 font-medium"
              onClick={deleteComment}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-sm font-medium transition-colors"
          style={{color: 'var(--primary-600)'} as React.CSSProperties}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-700)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
          onClick={handleEdit}
        >
          Add a comment
        </button>
      )}
    </div>
  );
};
