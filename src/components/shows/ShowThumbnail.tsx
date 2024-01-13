import { MouseEventHandler } from "react";
import TvInformationShow from "../../data/tvinformation/interfaces/TvInformationShow"
import "./ShowThumbnail.css";

type ShowThumbnailProps = {
  show: TvInformationShow;
  onClick?: MouseEventHandler;
  "data-testid"?: string;
}

export default function ShowThumbnail({ show, onClick, "data-testid": dataTestId }: ShowThumbnailProps) {
  return (
    <div className="show-thumbnail" onClick={onClick} data-testid={dataTestId}>
      <img className="show-thumbnail-image" alt={`${show.name}`} src={show.image}/>
    </div>
  )
}