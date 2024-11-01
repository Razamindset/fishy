import { FaUserCircle } from "react-icons/fa";
import { GiChessKnight } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b p-4 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side: Knight Icon and Fishy */}
        <div className="flex items-center space-x-2">
          <GiChessKnight className="text-2xl" />
          <span className="text-lg font-bold">Fishy</span>
        </div>

        {/* Middle: Navigation links */}
        <div className="space-x-6">
          <Link to="/" className="text-lg font-medium hover:text-gray-300">
            Home
          </Link>
          <Link
            to="/analysis"
            className="text-lg font-medium hover:text-gray-300"
          >
            Analysis
          </Link>
        </div>

        {/* Right side: Profile Icon */}
        <div>
          <Link to="/profile" className="text-xl hover:text-gray-300">
            <FaUserCircle />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
