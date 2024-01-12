import React, { useState } from 'react';
import { useNamePostMutation } from '../../store/api';
import { useNavigate } from 'react-router';

const NameEntry = () => {
  const [name, setName] = useState('');
  const [addName, { isLading }] = useNamePostMutation()
  const navigate = useNavigate();

  const handleNameSubmit = () => {
    addName({ name: name })
      .then((res) => {
        localStorage.setItem("access", res.data.token)
        navigate('/new-post')
      })
      .catch((err) => console.log(err))
  };

  return (
    <div className="flex justify-center items-center h-screen fixed top-0 bottom-0 right-0 left-0 bg-gray-100">
      <div className="w-[500px] h-96 flex justify-center items-center flex-col p-8 rounded-lg shadow-xl bg-white">
        <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleNameSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NameEntry;