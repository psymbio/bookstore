"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config';

const TransactionDateRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [booksIssued, setBooksIssued] = useState<{ bookName: string; issuedTo: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch books issued in the date range
  const fetchBooksInDateRange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooksIssued([]);

    try {
      const response = await fetch(`${API_PATHS.TRANSACTION_DATE_RANGE}?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setBooksIssued(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Fetch Transactions by Date Range</h2>
      <form onSubmit={fetchBooksInDateRange} className="mb-4">
        <div className="mb-4">
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
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
              <li key={index} className="text-gray-700">
                {book.bookName} - Issued to: {book.issuedTo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionDateRange;
