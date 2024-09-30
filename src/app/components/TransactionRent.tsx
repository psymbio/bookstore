"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config';

const TransactionRent = () => {
  const [bookName, setBookName] = useState('');
  const [totalRent, setTotalRent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch total rent for the book
  const fetchTotalRent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTotalRent(null);

    try {
      const response = await fetch(`${API_PATHS.TRANSACTION_BOOK_RENT}?bookName=${encodeURIComponent(bookName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch total rent');
      }
      const data = await response.json();
      setTotalRent(data.totalRent);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Calculate Book Rent</h2>
      <form onSubmit={fetchTotalRent} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="border border-gray-300 p-2 rounded-l-md"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-700">
            Calculate Rent
          </button>
        </div>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {totalRent !== null && (
        <div className="mt-4 p-4 border rounded-md bg-white">
          <h3 className="text-lg font-semibold">Total Rent for &quot;{bookName}&quot;:</h3>
          <p>${totalRent.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionRent;
