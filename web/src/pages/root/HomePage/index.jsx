import HomePageServerStats from "./components/HomePageStats";
import CreateGameComponent from "./components/game/CreateGameComponent";
import CreateCustomGame from "./components/game/CreateCustomGame";

export default function HomePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start gap-6">
        <CreateGameComponent />

        <div className="w-full md:w-1/4 flex flex-col md:gap-6">
          <CreateCustomGame />
          <HomePageServerStats />
        </div>
      </div>
    </div>
  );
}
