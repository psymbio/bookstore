"use client";

import { useEffect, useState } from 'react';
import { Book } from '../models/Book';
import { API_PATHS } from '../api/config';

const BookListAll = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch(API_PATHS.BOOKS);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data: Book[] = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  // Fetch books on component mount and set up polling
  useEffect(() => {
    fetchBooks();

    // Poll every 30 seconds (adjust time as needed)
    const interval = setInterval(() => {
      fetchBooks();
    }, 30000); // 30000 ms = 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Manual reload function for the button
  const handleReload = () => {
    setLoading(true);
    setError(null);
    fetchBooks();
  };

  if (loading) {
    return <div className="text-center text-lg">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">List of Books</h1>

      {/* Reload button */}
      <button 
        onClick={handleReload} 
        className="mb-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Reload Books
      </button>

      {/* Adjust the grid to show 4 books per row on large screens */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white">
        {books.map((book) => (
          <li key={book.name} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-600">Category: {book.category}</p>
            <p className="text-gray-500">Rent Per Day: ${book.rentPerDay}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookListAll;
