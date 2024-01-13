// Comment.js
import React, { useState } from 'react';
import { useCreateCommentMutation } from '../../store/api';

const Comment = ({ postId }) => {
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [addComment, { isLoading }] = useCreateCommentMutation();
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ body: { name: userName, comment: userMessage }, id: postId })
    setUserName('');
    setUserMessage('');
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-bold mb-2">Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor={`commentName_${postId}`} className="block text-gray-700 font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id={`commentName_${postId}`}
            name={`commentName_${postId}`}
            value={userName}
            onChange={handleNameChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor={`commentMessage_${postId}`} className="block text-gray-700 font-semibold mb-2">
            Your Comment
          </label>
          <textarea
            id={`commentMessage_${postId}`}
            name={`commentMessage_${postId}`}
            value={userMessage}
            onChange={handleMessageChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;
