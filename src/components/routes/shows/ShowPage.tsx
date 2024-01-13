import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { tvmazeDataSource } from "../../../data/tvinformation";
import TvInformationShow from "../../../data/tvinformation/interfaces/TvInformationShow";
import Page from "../../page/Page";
import PageWallpaper from "../../page/PageWallpaper";
import PageHeader from "../../page/PageHeader";
import ShowFeature from "../../shows/ShowFeature";
import PageFooter from "../../page/PageFooter";

function getParsedShowId(showId: string | undefined) {
  try {
    if(!showId) {
      return null;
    }

    return parseInt(showId);
  }
  catch {
    return null;
  }
}

export default function ShowPage() {
  const { showId } = useParams();

  const [ show, setShow ] = useState<TvInformationShow | null>(null);

  useEffect(() => {
    const parsedShowId = getParsedShowId(showId);

    if(!parsedShowId) {
      redirect("/404");

      return;
    }

    tvmazeDataSource.getShow(parsedShowId).then((show) => {
      setShow(show);
    })
  }, [ showId ]);

  return (
    <Page>
      {(show?.image) && (
        <PageWallpaper image={show.image} data-testid="page-wallpaper"/>
      )}

      <PageHeader>
        {(show) && (
          <ShowFeature show={show} showFeatureInformation={false} data-testid="show-feature"/>
        )}

        <PageFooter/>
      </PageHeader>
    </Page>
  );
}
