"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config';

const TransactionBookStatus = () => {
  const [bookName, setBookName] = useState('');
  const [status, setStatus] = useState<{ totalIssuedCount: number; currentStatus: string | { person: string; status: string } } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch book status
  const fetchBookStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus(null);

    try {
      const response = await fetch(`${API_PATHS.TRANSACTION_BOOK_STATUS}?bookName=${encodeURIComponent(bookName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book status');
      }
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Check Book Status</h2>
      <form onSubmit={fetchBookStatus} className="mb-4">
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
            Check Status
          </button>
        </div>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {status && (
        <div className="mt-4 p-4 border rounded-md bg-white">
          <h3 className="text-lg font-semibold">Book Status:</h3>
          <p>Total Issued Count: {status.totalIssuedCount}</p>
          <p>
            Current Status: {typeof status.currentStatus === 'string' ? status.currentStatus : `${status.currentStatus.person} (${status.currentStatus.status})`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionBookStatus;
