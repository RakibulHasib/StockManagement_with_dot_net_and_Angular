import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500">
      <div className="container mx-auto px-4 py-2 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Stock Management
          </Link>
          <button
            type="button"
            className="text-gray-400 md:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className="heroicon-ui" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="md:flex items-center mt-4 md:mt-0">
          <Link
            to="/"
            className="block text-white font-medium md:inline-block md:mt-0 md:ml-6 mt-3"
          >
            Front Page
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
