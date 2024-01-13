import TvInformationShowDetails from "../../data/tvinformation/interfaces/TvInformationShowDetails"
import Button from "../form/Button";
import PageContainer from "../page/PageContainer";
import "./ShowFeature.css";

type ShowFeatureProps = {
  showDetails: TvInformationShowDetails;
  "data-testid"?: string;
}

export default function ShowFeature({ showDetails, "data-testid": dataTestId }: ShowFeatureProps) {
  return (
    <PageContainer data-testid={dataTestId}>
      <h3 className="show-feature-tag">Featured show</h3>
      
      <div className="show-feature">
        <h1 className="show-feature-name">{showDetails.name}</h1>

        <div className="show-feature-summary" dangerouslySetInnerHTML={{
          __html: showDetails.information.summary ?? `<i>No summary available.</i>` 
        }}/>

        <div className="show-feature-grid">
          <ul className="show-feature-genres">
            {showDetails.information.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>

          <a className="show-feature-button" href={`/shows/${showDetails.id}`}>
            <Button>
              Show more information
            </Button>
          </a>
        </div>
      </div>
    </PageContainer>
  )
}