"use client";

import React, { useState } from "react";
import { API_PATHS } from "../api/config";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function UserAddForm() {
  const [formData, setFormData] = useState({
    userName: "",
  });
  const [popupOpen, setPopupOpen] = useState(false); // State to manage popup visibility
  const [userDetails, setUserDetails] = useState({}); // State to store added user details

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    // Prepare the data to be sent to the server
    const userData = {
      name: formData.userName,
    };

    try {
      const response = await fetch(API_PATHS.USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      console.log("User added successfully:", result);

      // Show the popup with user details
      setUserDetails(result);
      setPopupOpen(true);

      // Optionally, clear the form after submission
      setFormData({
        userName: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Function to close the popup
  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a New User</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Name */}
            <div>
              <label htmlFor="userName" className="sr-only">
                User Name
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="User Name"
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-teal-600 px-5 py-3 font-medium text-white transition hover:bg-teal-700 sm:w-auto"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup/Modal */}
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-md w-full">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <CloseRoundedIcon />
            </button>
            <h3 className="text-xl font-semibold mb-4">User Added Successfully</h3>
          </div>
        </div>
      )}
    </section>
  );
}
