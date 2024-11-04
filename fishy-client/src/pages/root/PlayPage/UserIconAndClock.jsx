import React from "react";
import { MdTimer } from "react-icons/md";

const UserIconAndClock = ({ userData, timeData, color, position }) => {
  const isActiveTurn = timeData?.currentTurn === color;

  const formattedTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!userData || !timeData || !color) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-between ${
        position === "top" ? "mb-1" : "mt-1"
      }`}
    >
      {/* User Info on the Left */}
      <div className="flex items-center gap-4">
        <img
          src={userData.profileImage || "https://dummyimage.com/50X50"} // default image if none is provided
          alt={userData.playerName}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-medium">{userData.playerName}</span>
      </div>

      {/* Clock on the Right */}
      <div className="flex items-center gap-2">
        <MdTimer
          size={24}
          className={isActiveTurn ? "text-orange-600" : "text-gray-500"}
        />
        <span
          className={`font-mono text-xl font-bold ${
            isActiveTurn ? "text-orange-600" : "text-gray-500"
          }`}
        >
          {formattedTime(timeData[color])}
        </span>
      </div>
    </div>
  );
};

export default UserIconAndClock;
