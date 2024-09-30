"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config'; // Adjust the import path according to your project structure

// Define the structure of the current status and past issuers
interface CurrentStatus {
  status: string;
  user?: {
    userId: string;
    username: string;
  };
}

interface PastIssuer {
  userId: string;
  issueDate: string;
  returnDate: string | null; // Can be null if not returned
  status: string;
}

// Define the structure of the API response
interface TransactionHistoryResponse {
  totalIssuedCount: number;
  pastIssuers: PastIssuer[];
  currentStatus: CurrentStatus;
}

const TransactionHistory = () => {
  const [bookName, setBookName] = useState<string>('');
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${API_PATHS.TRANSACTIONS}/book/${encodeURIComponent(bookName)}`);
      if (!response.ok) {
        throw new Error('Book not found or an error occurred');
      }
      const data: TransactionHistoryResponse = await response.json();
      setTransactionHistory(data);
    } catch (err) {
      // Type assertion to handle unknown error type
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setTransactionHistory(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter book name"
            className="flex-grow p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {transactionHistory && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Results</h2>
          <p className="mt-2">Total Issued Count: {transactionHistory.totalIssuedCount}</p>

          {transactionHistory.currentStatus.status === 'currently issued' ? (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
              <h3 className="font-bold">Current Status:</h3>
              <p>{transactionHistory.currentStatus.status}</p>
              {transactionHistory.currentStatus.user && (
                <p>User: {transactionHistory.currentStatus.user.username}</p>
              )}
            </div>
          ) : (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
              <h3 className="font-bold">Current Status:</h3>
              <p>{transactionHistory.currentStatus.status}</p>
            </div>
          )}

          <h3 className="mt-4 font-semibold">Past Issuers:</h3>
          <ul className="list-disc pl-6">
            {transactionHistory.pastIssuers.map((issuer, index) => (
              <li key={index} className="my-2">
                User ID: {issuer.userId}, Issue Date: {new Date(issuer.issueDate).toLocaleDateString()}, Return Date: {issuer.returnDate ? new Date(issuer.returnDate).toLocaleDateString() : 'Not returned'}, Status: {issuer.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
