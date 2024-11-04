const Buttons = ({ gameState }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-2 w-full">
      <button className="w-full border border-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:border-orange-500">
        Resign
      </button>
      <button className="w-full border border-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:border-orange-500">
        Draw
      </button>
    </div>
  );
};

export default Buttons;
