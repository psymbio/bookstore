"use client";

import React, { useEffect, useState } from "react";
import { User } from "../models/User";
import { API_PATHS } from "../api/config";

export default function UserListAll() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data function
  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await fetch(API_PATHS.USERS);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false); // Always stop loading after fetch
    }
  };

  // Polling with useEffect
  useEffect(() => {
    fetchUsers(); // Fetch users on component mount

    // Polling every 30 seconds (can adjust this interval)
    const intervalId = setInterval(() => {
      fetchUsers();
    }, 30000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Manual Reload Button
  const handleReload = () => {
    fetchUsers();
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User List</h2>
          {/* Manual Reload Button */}
          <button
            onClick={handleReload}
            className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            Reload Users
          </button>
        </div>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="bg-white p-4 rounded-lg shadow">
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
