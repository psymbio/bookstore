"use client";

import { useEffect, useState } from 'react';
import { Book } from '../models/Book';

const BookListAll = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books'); // Make sure this URL matches your backend
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data: Book[] = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">List of Books</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
