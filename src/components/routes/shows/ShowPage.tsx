import { Fragment, useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { tvInformationDataSource } from "../../../data/tvinformation";
import TvInformationShow from "../../../data/tvinformation/interfaces/TvInformationShow";
import Page from "../../page/Page";
import PageWallpaper from "../../page/PageWallpaper";
import PageHeader from "../../page/PageHeader";
import ShowFeature from "../../shows/ShowFeature";
import PageFooter from "../../page/PageFooter";
import LoadingDots from "../../LoadingDots";
import PageContainer from "../../page/PageContainer";
import Button from "../../form/Button";

export function getParsedShowId(showId: string | undefined) {
  if(!showId) {
    return null;
  }

  const result = parseInt(showId);

  if(window.isNaN(result)) {
    return null;
  }

  return result;
}

export default function ShowPage() {
  const { showId } = useParams();

  const [ show, setShow ] = useState<TvInformationShow | null>(null);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const parsedShowId = getParsedShowId(showId);

    if(!parsedShowId) {
      setError("You have tried accessing a bad show.");
      
      return;
    }

    tvInformationDataSource.getShow(parsedShowId).then((show) => {
      setShow(show);
    }).catch((reason) => {
      console.warn("Failed to load the show.", { reason });

      setError("Failed to load the show from TV maze.");
    });
  }, [ showId ]);

  return (
    <Page>
      {(show?.image) && (
        <PageWallpaper image={show.image} data-testid="page-wallpaper"/>
      )}

      <PageHeader>
        {(show)?(
          <ShowFeature show={show} showFeatureInformation={false} data-testid="show-feature"/>
        ):(
          (error)?(
            <PageContainer>
              <h2>Something went wrong!</h2>

              <p data-testid="error">{error}</p>

              <a href="/">
                <Button>Go back to the index page</Button>
              </a>
            </PageContainer>
          ):(
            <LoadingDots data-testid="loading"/>
          )
        )}

        <PageFooter/>
      </PageHeader>
    </Page>
  );
}
