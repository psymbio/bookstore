import React from 'react';

const HomeInfo = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Explore Your Library.
            <strong className="font-extrabold text-red-700 sm:block"> Discover Books, Users, and Transactions. </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Welcome to your library management system. Browse our extensive collection of books,
            manage users, and keep track of all transactions seamlessly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/books"
            >
              Visit Books
            </a>

            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/users"
            >
              Visit Users
            </a>

            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
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
