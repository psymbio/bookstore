"use client";

import React, { useState } from "react";
import { Book } from '../models/Book'; // Adjust the path if necessary

const BookRentRange = () => {
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await fetch(`http://localhost:3000/books/rent-range?minRent=${encodeURIComponent(minRent)}&maxRent=${encodeURIComponent(maxRent)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data: Book[] = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Books by Rent Range</h2>

        <form onSubmit={handleSearch} className="flex space-x-4 mb-6">
          <input
            type="number"
            placeholder="Min Rent"
            className="flex-1 rounded-lg border-gray-200 p-3 text-sm"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Max Rent"
            className="flex-1 rounded-lg border-gray-200 p-3 text-sm"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-teal-600 px-5 py-3 font-medium text-white transition hover:bg-teal-700"
          >
            Search
          </button>
        </form>

        {loading && <div className="text-center">Loading...</div>}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {searchResults.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {searchResults.map((book) => (
              <li key={book._id} className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{book.name}</h3>
                <p className="text-gray-600">Category: {book.category}</p>
                <p className="text-gray-500">Rent Per Day: ${book.rentPerDay}</p>
              </li>
            ))}
          </ul>
        )}

        {searchResults.length === 0 && !loading && !error && (
          <div className="text-center">No books found in the specified rent range.</div>
        )}
      </div>
    </section>
  );
};

export default BookRentRange;
