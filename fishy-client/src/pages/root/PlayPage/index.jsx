import { useParams, useSearchParams } from "react-router-dom";
import GameComponent from "./GameComponent";

export default function PlayPage() {
  const { gameId } = useParams();

  return (
    <div>
      <h1>Play Page {gameId}</h1>
      <GameComponent gameId={gameId} />
    </div>
  );
}
