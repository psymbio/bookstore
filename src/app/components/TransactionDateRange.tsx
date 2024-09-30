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
    } catch (err: unknown) {  // Use 'unknown' instead of 'any'
      if (err instanceof Error) {
        setError(err.message || "An error occurred while fetching data.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History by Date Range</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="font-semibold">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDate" className="font-semibold">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {issuedBooks.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Issued Books</h2>
          <ul className="list-disc pl-6">
            {issuedBooks.map((book, index) => (
              <li key={index} className="my-2">
                <p className="font-semibold">Book: {book.bookName}</p>
                <p>User: {book.username}</p>
                <p>Issue Date: {new Date(book.issueDate).toLocaleDateString()}</p>
                <p>Status: {book.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {issuedBooks.length === 0 && !error && (
        <p className="mt-6 text-gray-500">No books issued in this date range.</p>
      )}
    </div>
  );
};

export default TransactionDateRange;
