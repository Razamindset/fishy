import ClientStatsComponent from "./stats/ClientStats";
import ServerStatsComponent from "./stats/ServerStatsComponent";

const HomePageServerStats = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mt-4">
      <ServerStatsComponent />
      <ClientStatsComponent />
    </div>
  );
};

export default HomePageServerStats;
