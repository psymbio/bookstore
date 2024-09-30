"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config';

const TransactionUser = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [booksIssued, setBooksIssued] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch books issued to the user
  const fetchUserBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooksIssued([]);

    const query = userId ? `userId=${encodeURIComponent(userId)}` : `username=${encodeURIComponent(username)}`;

    try {
      const response = await fetch(`${API_PATHS.TRANSACTION_USER_BOOKS}?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user books');
      }
      const data = await response.json();
      setBooksIssued(data.booksIssued);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Fetch User Books</h2>
      <form onSubmit={fetchUserBooks} className="mb-4">
        <div className="mb-4">
          <label className="block mb-1">User ID:</label>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setUsername(''); // Clear username when userId changes
            }}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUserId(''); // Clear userId when username changes
            }}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
          Fetch Books
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {booksIssued.length > 0 && (
        <div className="mt-4 p-4 border rounded-md bg-white">
          <h3 className="text-lg font-semibold">Books Issued:</h3>
          <ul className="list-disc pl-5">
            {booksIssued.map((book, index) => (
              <li key={index} className="text-gray-700">{book}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionUser;
