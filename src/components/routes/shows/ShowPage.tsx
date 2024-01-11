import { useParams } from "react-router-dom";

export default function ShowPage() {
  const { showId } = useParams();

  return (
    <div>
      Show (showId: {showId})
    </div>
  );
}
