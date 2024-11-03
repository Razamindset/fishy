import { useParams, useSearchParams } from "react-router-dom";
import GameComponent from "./GameComponent";

export default function PlayPage() {
  const { gameId } = useParams();

  return (
    <div>
      <GameComponent gameId={gameId} />
    </div>
  );
}
