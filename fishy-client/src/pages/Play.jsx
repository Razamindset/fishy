import { useParams } from "react-router-dom";

export default function PlayPage() {
  const { gameId } = useParams();
  return (
    <div>
      <h1>Play Page {gameId}</h1>
    </div>
  );
}
