// NewPost.js
import React, { useState } from 'react';
import Comment from './Comment';
import { useCreatePostMutation, useGetPostsQuery } from '../../store/api';
import { decodeToken } from "react-jwt";
import NotFound from '../NotFound'
import { logOut } from '../../utils';
import useDebounce from '../../utils/debounce';
const NewPost = () => {
  const [userMessage, setUserMessage] = useState('');
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { name } = decodeToken(localStorage.getItem("access"))
  const [search, setSearch] = useState();
  const debouncedValue = useDebounce({ inputValue: search, delay: 300 });
  const { data: posts, isLoading: postLoading, isFetching } = useGetPostsQuery({
    search: debouncedValue || undefined,
  })

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost({
      name: name,
      userMessage: userMessage,
    })
    setUserMessage('');
  };
  if (!name) {
    return <NotFound />
  }
  return (
    <div className="my-8 mx-auto max-w-md p-4 bg-white shadow-md border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className='bg-gray-50 border border-black p-4 rounded-lg'>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={name}
            disabled
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
        <div className="relative py-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            <span role="img" aria-label="Search" className="text-gray-500">
              🔍
            </span>
          </div>
          <input
            className="w-full p-2 pl-10 border border-gray-300 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        {postLoading || isFetching ? <div className='h-40 w-full flex justify-center items-center'>Searching...</div> :
          !search && posts?.length === 0 ? <div className='h-40 w-full flex justify-center items-center'>Create a Post</div> :
            search && posts?.length === 0 ? <div className='h-40 w-full flex justify-center items-center'>No Result</div> : (
              posts?.map((post, index) => (
                <div key={index} className="bg-gray-100 p-3 mb-4 rounded">
                  <p className="font-semibold text-xl">{post?.name}</p>
                  <textarea value={post?.userMessage} disabled className='border bg-white h-40 w-full mt-4'></textarea>
                  <p className='py-4 text-xl font-bold flex justify-start'>Comments</p>
                  <div className='border p-4 border-black rounded-lg'>
                    <Comment postId={post?.id} />
                  </div>
                  {post?.comments?.length > 0 &&
                    <div className='border p-4 border-black rounded-lg mt-4'>
                      {post?.comments?.map((comment, commentIndex) => (
                        <div key={commentIndex} className="bg-gray-200 p-2 mt-2 rounded">
                          <p className="font-semibold text-xl">{comment?.name}</p>
                          <textarea value={comment?.comment} disabled className='border bg-white h-14 w-full mt-4'></textarea>
                        </div>
                      ))}
                    </div>}
                </div>
              )))}
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue" onClick={logOut}
      > Exit User</button>
    </div >
  );
};

export default NewPost;
