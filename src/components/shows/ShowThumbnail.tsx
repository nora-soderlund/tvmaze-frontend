import { MouseEventHandler } from "react";
import TvInformationShowDetails from "../../data/tvinformation/interfaces/TvInformationShowDetails"
import "./ShowThumbnail.css";

type ShowThumbnailProps = {
  showDetails: TvInformationShowDetails;
  onClick: MouseEventHandler;
}

export default function ShowThumbnail({ showDetails, onClick }: ShowThumbnailProps) {
  return (
    <div className="show-thumbnail" onClick={onClick}>
      <img className="show-thumbnail-image" src={showDetails.image}/>
    </div>
  )
}