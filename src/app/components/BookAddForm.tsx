"use client";

import React, { useState } from "react";

export default function BookAddForm() {
  const [formData, setFormData] = useState({
    bookName: "",
    category: "",
    rentPerDay: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can add your form submission logic here
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
    </section>
  );
}
