"use client";
import React, { useEffect, useState } from 'react';

// Import the connectToDatabase function
import { connectToDatabase } from '../../app/db';

// Types
interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
}

// Fetching books function
const fetchBooks = async (): Promise<Book[]> => {
    try {
        const db = await connectToDatabase();
        const booksCollection = db.collection(process.env.BOOKS_COLLECTION_NAME);
        const books = await booksCollection.find({}).toArray();
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};

// BooksListAll Component
const BooksListAll: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            const booksList = await fetchBooks();
            setBooks(booksList);
            setLoading(false);
        };

        getBooks();
    }, []);

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (books.length === 0) {
        return <div>No books available</div>;
    }

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>{book.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BooksListAll;
