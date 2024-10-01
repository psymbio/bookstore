"use client";

import React, { useState } from "react";
import { API_PATHS } from "../api/config";

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
  returnDate: string | null;
  status: string;
}

// Define the structure of the API response
interface TransactionHistoryResponse {
  totalIssuedCount: number;
  pastIssuers: PastIssuer[];
  currentStatus: CurrentStatus;
}

const TransactionHistory = () => {
  const [bookName, setBookName] = useState<string>("");
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_PATHS.TRANSACTIONS}/book/${encodeURIComponent(bookName)}`);
      if (!response.ok) {
        throw new Error("Book not found or an error occurred");
      }
      const data: TransactionHistoryResponse = await response.json();
      setTransactionHistory(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setTransactionHistory(null);
    }
  };

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Transaction History</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
          className="flex-grow p-3 rounded-lg border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {transactionHistory && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Results</h2>
          <p className="text-lg text-gray-700">
            <strong>Total Issued Count:</strong> {transactionHistory.totalIssuedCount}
          </p>

          {/* Current Status */}
          {transactionHistory.currentStatus.status === "currently issued" ? (
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Current Status</h3>
              <p className="text-green-800">{transactionHistory.currentStatus.status}</p>
              {transactionHistory.currentStatus.user && (
                <p className="text-green-800">User: {transactionHistory.currentStatus.user.username}</p>
              )}
            </div>
          ) : (
            <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900">Current Status</h3>
              <p className="text-red-800">{transactionHistory.currentStatus.status}</p>
            </div>
          )}

          {/* Past Issuers */}
          <h3 className="mt-6 text-xl font-semibold text-gray-900">Past Issuers</h3>
          <ul className="mt-4 space-y-3">
            {transactionHistory.pastIssuers.map((issuer, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 border-l-4 border-teal-500 rounded-lg shadow-sm"
              >
                <p className="text-gray-700">
                  <strong>User ID:</strong> {issuer.userId}
                </p>
                <p className="text-gray-700">
                  <strong>Issue Date:</strong> {new Date(issuer.issueDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Return Date:</strong> {issuer.returnDate ? new Date(issuer.returnDate).toLocaleDateString() : "Not returned"}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {issuer.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
