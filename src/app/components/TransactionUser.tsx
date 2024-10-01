"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config'; // Adjust the path according to your project structure

// Define the type for the issued books
type IssuedBook = {
  bookName: string;
  issueDate: string;
  returnDate: string | null;
  status: string;
};

// Define the type for the user transaction response
type UserTransactions = {
  user: {
    username: string;
  };
  issuedBooks: IssuedBook[];
};

const TransactionUser = () => {
  const [userIdOrName, setUserIdOrName] = useState(''); // User ID or Name input
  const [userTransactions, setUserTransactions] = useState<UserTransactions | null>(null); // Stores transaction results
  const [error, setError] = useState<string | null>(null); // Error handling
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_PATHS.TRANSACTIONS}/user/${encodeURIComponent(userIdOrName)}`);
      if (!response.ok) {
        throw new Error('User not found or an error occurred');
      }
      const data: UserTransactions = await response.json();
      setUserTransactions(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setUserTransactions(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Books Issued to User</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={userIdOrName}
          onChange={(e) => setUserIdOrName(e.target.value)}
          placeholder="Enter user name or user ID"
          className="flex-grow p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-teal-600">Loading...</p>}

      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {userTransactions && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-teal-700">User: {userTransactions.user.username}</h2>

          {userTransactions.issuedBooks.length === 0 ? (
            <p className="mt-4 text-gray-600">No books have been issued to this user.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {userTransactions.issuedBooks.map((book, index) => (
                <li
                  key={index}
                  className="border-l-4 border-teal-500 p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-semibold text-teal-700">Book Name: {book.bookName}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Return Date:</strong> {book.returnDate ? new Date(book.returnDate).toLocaleDateString() : 'Not returned yet'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong> {book.status}
                  </p>
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
