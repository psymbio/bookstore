"use client";

import React, { useState } from "react";
import { Book } from '../models/Book';
import { API_PATHS } from "../api/config";

const BookGlobalSearch = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
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
      const response = await fetch(
        API_PATHS.BOOKS_GLOBAL_SEARCH(category, name, minRent, maxRent)
      );

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data: Book[] = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Book Search</h2>

        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          {/* Category Selection */}
          <div>
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Classic">Classic</option>
              <option value="Adventure">Adventure</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Historical">Historical</option>
              <option value="Philosophical">Philosophical</option>
              <option value="Epic">Epic</option>
              <option value="Horror">Horror</option>
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="sr-only">
              Book Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Book Name"
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Rent Range Inputs */}
          <div className="flex space-x-4">
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
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-teal-600 px-5 py-3 font-medium text-white transition hover:bg-teal-700 sm:w-auto"
            >
              Search
            </button>
          </div>
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
          <div className="text-center">No books found matching the criteria.</div>
        )}
      </div>
    </section>
  );
};

export default BookGlobalSearch;
