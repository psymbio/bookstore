"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config'; // Adjust the path according to your project structure

const TransactionUser = () => {
  const [userIdOrName, setUserIdOrName] = useState(''); // User ID or Name input
  const [userTransactions, setUserTransactions] = useState(null); // Stores transaction results
  const [error, setError] = useState(''); // Error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch(`${API_PATHS.TRANSACTIONS}/user/${encodeURIComponent(userIdOrName)}`);
      if (!response.ok) {
        throw new Error('User not found or an error occurred');
      }
      const data = await response.json();
      setUserTransactions(data); // Store the retrieved transaction details
    } catch (err) {
      setError(err.message);
      setUserTransactions(null); // Reset transactions if error occurs
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books Issued to User</h1>

      {/* Form to input user name or user ID */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userIdOrName}
            onChange={(e) => setUserIdOrName(e.target.value)}
            placeholder="Enter user name or user ID"
            className="flex-grow p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      </form>

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Transaction History Display */}
      {userTransactions && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">User: {userTransactions.user.username}</h2>
          <h3 className="mt-2">Issued Books:</h3>

          {/* Check if any books have been issued */}
          {userTransactions.issuedBooks.length === 0 ? (
            <p>No books have been issued to this user.</p>
          ) : (
            <ul className="list-disc pl-6">
              {userTransactions.issuedBooks.map((book, index) => (
                <li key={index} className="my-2">
                  <p><strong>Book Name:</strong> {book.bookName}</p>
                  <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
                  <p><strong>Return Date:</strong> {book.returnDate ? new Date(book.returnDate).toLocaleDateString() : 'Not returned yet'}</p>
                  <p><strong>Status:</strong> {book.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionUser;
