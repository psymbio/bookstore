"use client";

import React, { useState } from 'react';
import { API_PATHS } from '../api/config';

const TransactionIssue = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    username: '', // Changed from userID to username
    issueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(API_PATHS.TRANSACTION_ISSUE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to issue book');
      }

      const result = await response.json();
      setMessage(`Book issued successfully! Transaction ID: ${result.transactionId}`);
      setFormData({
        bookName: '',
        username: '', // Reset to empty
        issueDate: '',
      });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Issue a Book</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Name */}
          <div>
            <label htmlFor="bookName" className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username" // Changed from userID to username
              name="username" // Changed from userID to username
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Issue Date */}
          <div>
            <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
              Issue Date
            </label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`inline-block w-full rounded-lg bg-teal-600 px-5 py-3 font-medium text-white transition hover:bg-teal-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Issuing...' : 'Issue Book'}
            </button>
          </div>
        </form>

        {/* Messages */}
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      </div>
    </section>
  );
};

export default TransactionIssue;
