"use client";

import React, { useState } from "react";
import { API_PATHS } from "../api/config"; // Adjust the import path according to your project structure

// Define the types for the issued book data
type IssuedBook = {
  bookName: string;
  username: string;
  issueDate: string;
  status: string;
};

const TransactionDateRange = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]); // Use the IssuedBook type here
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIssuedBooks([]);

    if (!startDate || !endDate) {
      setError("Both start date and end date are required.");
      return;
    }

    try {
      const response = await fetch(
        `${API_PATHS.TRANSACTIONS}/issued?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Error fetching issued books data.");
      }
      const data: { issuedBooks: IssuedBook[] } = await response.json(); // Type the response data
      setIssuedBooks(data.issuedBooks);
    } catch (err: unknown) { // Use 'unknown' instead of 'any'
      if (err instanceof Error) {
        setError(err.message || "An error occurred while fetching data.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Transaction History by Date Range</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="font-medium text-gray-700">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="endDate" className="font-medium text-gray-700">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {issuedBooks.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">Issued Books</h2>
          <ul className="space-y-4">
            {issuedBooks.map((book, index) => (
              <li key={index} className="p-4 border-l-4 border-teal-500 bg-gray-50 rounded-md shadow-sm">
                <p className="text-lg font-bold text-teal-700">Book: {book.bookName}</p>
                <p className="text-gray-600">User: {book.username}</p>
                <p className="text-gray-600">
                  Issue Date: {new Date(book.issueDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Status: {book.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {issuedBooks.length === 0 && !error && (
        <p className="mt-6 text-gray-500 text-center">No books issued in this date range.</p>
      )}
    </div>
  );
};

export default TransactionDateRange;
