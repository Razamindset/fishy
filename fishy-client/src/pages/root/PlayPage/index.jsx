import { useParams, useSearchParams } from "react-router-dom";
import GameComponent from "./GameComponent";

export default function PlayPage() {
  const { gameId } = useParams();
  const params = useSearchParams();
  const color = params[0].get("color");
  console.log(color);

  return (
    <div>
      <h1>Play Page {gameId}</h1>
      <GameComponent gameId={gameId} color={color} />
    </div>
  );
}
