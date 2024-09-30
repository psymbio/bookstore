// Base API URL
// const BASE_API_URL = 'http://localhost:3000';
const BASE_API_URL = 'https://2262db71800f16a6510d94d92782ad93.serveo.net';
// API Endpoints
const API_PATHS = {
  BOOKS: `${BASE_API_URL}/books`,
  BOOKS_SEARCH: (searchTerm: string) =>
    `${BASE_API_URL}/books/search?name=${encodeURIComponent(searchTerm)}`,  
  BOOKS_GLOBAL_SEARCH: (category: string, name: string, minRent: string, maxRent: string) =>
    `${BASE_API_URL}/books/search?category=${encodeURIComponent(category)}&name=${encodeURIComponent(name)}&minRent=${encodeURIComponent(minRent)}&maxRent=${encodeURIComponent(maxRent)}`,
  BOOKS_RENT_RANGE: (minRent: string, maxRent: string) =>
    `${BASE_API_URL}/books/rent-range?minRent=${encodeURIComponent(minRent)}&maxRent=${encodeURIComponent(maxRent)}`,
  USERS: `${BASE_API_URL}/users`,
  TRANSACTIONS: `${BASE_API_URL}/transactions`,
  TRANSACTION_ISSUE: `${BASE_API_URL}/transactions/issue`,
};

export { BASE_API_URL, API_PATHS };
