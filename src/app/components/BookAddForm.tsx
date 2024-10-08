"use client";

import React, { useState } from "react";
import { API_PATHS } from "../api/config";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function BookAddForm() {
  const [formData, setFormData] = useState({
    bookName: "",
    category: "",
    rentPerDay: "",
  });

  const [popupOpen, setPopupOpen] = useState(false); // State to manage popup visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    // Prepare the data to be sent to the server
    const bookData = {
      name: formData.bookName,
      category: formData.category,
      rentPerDay: Number(formData.rentPerDay), // Ensure rentPerDay is a number
    };

    try {
      const response = await fetch(API_PATHS.BOOKS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        setPopupOpen(true);
        throw new Error("Failed to add book");
      }

      const result = await response.json();
      console.log("Book added successfully:", result);

      // Show the popup
      setPopupOpen(true);

      // Optionally, clear the form after submission
      setFormData({
        bookName: "",
        category: "",
        rentPerDay: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a New Book</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Book Name */}
            <div>
              <label htmlFor="bookName" className="sr-only">
                Book Name
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Book Name"
                type="text"
                id="bookName"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <select
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
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

            {/* Rent Per Day */}
            <div>
              <label htmlFor="rentPerDay" className="sr-only">
                Rent Per Day
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Rent Per Day"
                type="number"
                id="rentPerDay"
                name="rentPerDay"
                value={formData.rentPerDay}
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
                Add Book
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
            <h3 className="text-xl font-semibold mb-4">Book Added Successfully</h3>
          </div>
        </div>
      )}
    </section>
  );
}
