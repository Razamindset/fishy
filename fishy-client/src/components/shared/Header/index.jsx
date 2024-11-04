import { FaUserCircle } from "react-icons/fa";
import { GiChessKnight } from "react-icons/gi";
import { MdHome, MdAnalytics } from "react-icons/md"; // Adding icons for Home and Analysis
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-20 h-full border-r border-gray-400 flex flex-col items-center py-6 space-y-8">
      {/* Knight Icon at the top */}
      <Link to="/">
        <GiChessKnight className="text-4xl text-orange-500 mb-6" />
      </Link>
      {/* Navigation icons */}
      <nav className="flex flex-col items-center space-y-6">
        <Link to="/" className="text-2xl text-gray-400 hover:text-orange-400">
          <MdHome />
        </Link>
        <Link
          to="/analysis"
          className="text-2xl text-gray-400 hover:text-orange-400"
        >
          <MdAnalytics />
        </Link>
      </nav>
      {/* Profile Icon at the bottom */}
      <div className="mt-auto">
        <Link
          to="/profile"
          className="text-2xl text-gray-400 hover:text-orange-400"
        >
          <FaUserCircle />
        </Link>
      </div>
    </header>
  );
};

export default Header;
