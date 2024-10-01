"use client";

import React, { useEffect, useState } from 'react';
import { API_PATHS } from '../api/config';

// Define an interface for the transaction object
interface Transaction {
  _id: string;
  bookId: string;         // Keep for reference, but will display bookName instead
  userId: string;         // Keep for reference, but will display username instead
  bookName: string;       // New field for book name
  username: string;       // New field for username
  issueDate: string;      // You can change this to Date if you prefer
  returnDate?: string;    // Optional, can be undefined
  totalRent?: number;     // Optional, can be undefined
  status: string;
}

const TransactionListAll = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [returnError] = useState('');

  // Function to fetch transactions
  const fetchTransactions = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(API_PATHS.TRANSACTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Use useEffect to fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to handle book return
  const handleReturn = async (transactionId: string) => {
    const returnDate = new Date().toISOString(); // Set returnDate to now for this example
    try {
      const response = await fetch(API_PATHS.TRANSACTION_RETURN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId, returnDate }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to return the book');
      }

      alert(data.message); // Alert for success
      fetchTransactions(); // Reload transactions after returning a book
    } catch (error) {
      alert((error as Error).message); // Alert error
    }
  };

  // Function to handle reload button click
  const handleReload = () => {
    fetchTransactions(); // Call fetchTransactions to reload data
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Transactions</h2>
          <button 
            onClick={handleReload} 
            className="text-white bg-green-500 hover:bg-teal-600 px-4 py-2 rounded"
          >
            Reload
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading transactions...</p>}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
        {returnError && <p className="mt-4 text-red-600">Return Error: {returnError}</p>}

        {!loading && !error && transactions.length === 0 && (
          <p className="text-gray-500">No transactions found.</p>
        )}

        {!loading && !error && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  {/* <th className="px-4 py-2 border-b">Transaction ID</th> */}
                  <th className="px-4 py-2 border-b">Book Name</th>
                  <th className="px-4 py-2 border-b">Username</th>
                  <th className="px-4 py-2 border-b">Issue Date</th>
                  <th className="px-4 py-2 border-b">Return Date</th>
                  <th className="px-4 py-2 border-b">Total Rent</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Action</th> {/* Add Action Column */}
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction._id} className="text-gray-600">
                    {/* <td className="px-4 py-2 border-b">{transaction._id}</td> */}
                    <td className="px-4 py-2 border-b">{transaction.bookName}</td>
                    <td className="px-4 py-2 border-b">{transaction.username}</td>
                    <td className="px-4 py-2 border-b">{new Date(transaction.issueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b">
                      {transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2 border-b">{transaction.totalRent ? `$${transaction.totalRent}` : 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{transaction.status}</td>
                    <td className="px-4 py-2 border-b">
                      {transaction.status === 'issued' && (
                        <button 
                          onClick={() => handleReturn(transaction._id)} 
                          className="text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded"
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionListAll;
