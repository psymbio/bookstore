"use client";

import React, { useEffect, useState } from 'react';
import { API_PATHS } from '../api/config';

// Define an interface for the transaction object
interface Transaction {
  _id: string;
  bookId: string;
  userId: string;
  issueDate: string; // You can change this to Date if you prefer
  returnDate?: string; // Optional, can be undefined
  totalRent?: number;  // Optional, can be undefined
  status: string;
}

const TransactionListAll = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
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
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Transactions</h2>

        {loading && <p className="text-gray-500">Loading transactions...</p>}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}

        {!loading && !error && transactions.length === 0 && (
          <p className="text-gray-500">No transactions found.</p>
        )}

        {!loading && !error && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 border-b">Transaction ID</th>
                  <th className="px-4 py-2 border-b">Book Name</th>
                  <th className="px-4 py-2 border-b">Username</th>
                  <th className="px-4 py-2 border-b">Issue Date</th>
                  <th className="px-4 py-2 border-b">Return Date</th>
                  <th className="px-4 py-2 border-b">Total Rent</th>
                  <th className="px-4 py-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction._id} className="text-gray-600">
                    <td className="px-4 py-2 border-b">{transaction._id}</td>
                    <td className="px-4 py-2 border-b">{transaction.bookId}</td>
                    <td className="px-4 py-2 border-b">{transaction.userId}</td>
                    <td className="px-4 py-2 border-b">{new Date(transaction.issueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b">
                      {transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2 border-b">{transaction.totalRent ? `$${transaction.totalRent}` : 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{transaction.status}</td>
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
