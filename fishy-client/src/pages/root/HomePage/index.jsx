import { FaPlus } from "react-icons/fa";
import HomePageServerStats from "./components/ServerStats";
import CreateGameComponent from "./components/CreateGameComponent";

export default function HomePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start gap-6">
        <CreateGameComponent />

        <div className="w-full md:w-1/4 flex flex-col md:gap-6">
          <div className="buttons w-full space-y-4">
            <button className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 rounded-lg font-semibold text-lg">
              <FaPlus className="h-5 w-5" />
              CREATE A GAME
            </button>
            <button className="w-full h-14 border border-gray-600 text-gray-100 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-700 font-semibold text-md">
              PLAY A FRIEND
            </button>
            <button className="w-full h-14 border border-gray-600 text-gray-100 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-700 font-semibold text-md">
              PLAY THE COMPUTER
            </button>
          </div>

          <HomePageServerStats />
        </div>
      </div>
    </div>
  );
}
