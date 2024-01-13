// NewPost.js
import React, { useState } from 'react';
import Comment from './Comment';
import { useCreatePostMutation, useGetPostsQuery } from '../../store/api';

const NewPost = () => {
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  // const [posts, setPosts] = useState([]);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { data: posts, usLoading: postLoading } = useGetPostsQuery()
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    createPost({
      name: "ganit",
      userMessage: userMessage,
    })
    setUserMessage('');
  };

  const addComment = (postId, newComment) => {
    const updatedPosts = [...posts];

    const postIndex = updatedPosts.findIndex((post) => post.userName === postId);

    updatedPosts[postIndex].comments.push(newComment);

    setPosts(updatedPosts);
  };

  return (
    <div className="my-8 mx-auto max-w-md p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            disabled
            onChange={handleNameChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userMessage" className="block text-gray-700 font-semibold mb-2">
            Your Message
          </label>
          <textarea
            id="userMessage"
            name="userMessage"
            value={userMessage}
            onChange={handleMessageChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Create Post
        </button>
      </form>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Posts</h3>
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-3 mb-4 rounded">
            <p className="font-semibold">{post.userName}</p>
            <p>{post.userMessage}</p>

            {/* Displaying comments */}
            {post.comments.map((comment, commentIndex) => (
              <div key={commentIndex} className="bg-gray-200 p-2 mt-2 rounded">
                <p className="font-semibold">{comment.userName}</p>
                <p>{comment.userMessage}</p>
              </div>
            ))}

            {/* Adding comments */}
            <Comment postId={post.userName} addComment={addComment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPost;
