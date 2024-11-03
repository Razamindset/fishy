import { FaPlus } from "react-icons/fa";

const CreateCustomGame = () => {
  return (
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
  );
};

export default CreateCustomGame;
