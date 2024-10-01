"use client";

import React, { useState } from "react";
import { API_PATHS } from "../api/config"; // Adjust the path to your config file

const TransactionRent = () => {
  const [bookName, setBookName] = useState<string>("");
  const [totalRent, setTotalRent] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTotalRent(null);

    try {
      const response = await fetch(
        `${API_PATHS.TRANSACTIONS}/rent/${encodeURIComponent(bookName)}`
      );
      if (!response.ok) {
        throw new Error("Book not found or an error occurred");
      }

      const data = await response.json();
      setTotalRent(data.totalRent);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Total Rent Generated</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
          className="flex-grow p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
        >
          Get Total Rent
        </button>
      </form>

      {loading && <p className="text-center text-teal-600">Loading...</p>}

      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {totalRent !== null && (
        <div className="mt-6 p-6 bg-white border-l-4 border-teal-500 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-teal-700">
            Total Rent for &quot;{bookName}&quot;:
          </h3>
          <p className="text-lg text-gray-800 mt-2">${totalRent}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionRent;
