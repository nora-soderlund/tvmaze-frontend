import { MouseEventHandler } from "react";
import TvInformationShowDetails from "../../data/tvinformation/interfaces/TvInformationShowDetails"
import "./ShowThumbnail.css";

type ShowThumbnailProps = {
  showDetails: TvInformationShowDetails;
  onClick: MouseEventHandler;
  "data-testid"?: string;
}

export default function ShowThumbnail({ showDetails, onClick, "data-testid": dataTestId }: ShowThumbnailProps) {
  return (
    <div className="show-thumbnail" onClick={onClick} data-testid={dataTestId}>
      <img className="show-thumbnail-image" src={showDetails.image}/>
    </div>
  )
}