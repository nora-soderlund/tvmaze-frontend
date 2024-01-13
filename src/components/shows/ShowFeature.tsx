import TvInformationShow from "../../data/tvinformation/interfaces/TvInformationShow"
import Button from "../form/Button";
import PageContainer from "../page/PageContainer";
import "./ShowFeature.css";

type ShowFeatureProps = {
  show: TvInformationShow;
  showFeatureInformation?: boolean;
  "data-testid"?: string;
}

export default function ShowFeature({ show, showFeatureInformation = true, "data-testid": dataTestId }: ShowFeatureProps) {
  return (
    <PageContainer data-testid={dataTestId}>
      {(showFeatureInformation) && (
        <h3 className="show-feature-tag">Featured show</h3>
      )}
      
      <div className="show-feature">
        <h1 className="show-feature-name">{show.name}</h1>

        <div className="show-feature-summary" dangerouslySetInnerHTML={{
          __html: show.information.summary ?? "<i>No summary available.</i>"
        }}/>

        <div className="show-feature-grid">
          <ul className="show-feature-genres">
            {show.information.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>

          {(showFeatureInformation) && (
            <a className="show-feature-button" href={`/shows/${show.id}`}>
              <Button>
                Show more information
              </Button>
            </a>
          )}
        </div>
      </div>
    </PageContainer>
  )
}