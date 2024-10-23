import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { GiChessKnight } from "react-icons/gi"; // Knight icon
import { Outlet } from "react-router-dom";

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
          <a href="#home" className="text-lg font-medium hover:text-gray-300">
            Home
          </a>
          <a
            href="#analysis"
            className="text-lg font-medium hover:text-gray-300"
          >
            Analysis
          </a>
        </div>

        {/* Right side: Profile Icon */}
        <div>
          <a href="#profile" className="text-xl hover:text-gray-300">
            <FaUserCircle />
          </a>
        </div>
      </nav>
    </header>
  );
};

const HeaderWrapper = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default HeaderWrapper;
