import React from "react";

const HomeInfo = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          {/* Main Heading */}
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Explore Your Library.
            <strong className="block font-extrabold text-teal-700 sm:inline">
              Discover Books, Users, and Transactions.
            </strong>
          </h1>

          {/* Subheading */}
          <p className="mt-4 sm:text-xl">
            Welcome to your library management system. Browse our extensive collection of books, 
            manage users, and keep track of all transactions seamlessly.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-500 active:bg-teal-500 sm:w-auto"
              href="/books"
            >
              Visit Books
            </a>

            <a
              className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-500 active:bg-teal-500 sm:w-auto"
              href="/users"
            >
              Visit Users
            </a>

            <a
              className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-500 active:bg-teal-500 sm:w-auto"
              href="/transactions"
            >
              Visit Transactions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeInfo;
