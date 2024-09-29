import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo or Home Icon */}
        <a className="flex items-center text-teal-600 hover:text-teal-700" href="/">
          <span className="sr-only">Home</span>
          <HomeRoundedIcon fontSize="large" />
        </a>
        
        {/* Navigation Links */}
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-8 text-lg font-medium">
            <li>
              <a
                className="text-gray-600 transition hover:text-teal-600"
                href="/books"
              >
                Books
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 transition hover:text-teal-600"
                href="/users"
              >
                Users
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 transition hover:text-teal-600"
                href="/transactions"
              >
                Transactions
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
